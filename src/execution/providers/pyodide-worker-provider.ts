/**
 * Pyodide Web Worker Execution Provider
 * 
 * Implements browser-based Python execution inside an isolated Web Worker thread.
 * Handles lifecycle management, interactive stdin/stdout streaming, timeouts,
 * cancellation, worker crash recovery, and environment resets.
 */

import { getAssetPath } from "@/lib/asset-path";
import { ExecutionProvider } from "../execution-provider.interface";
import {
  ExecutionEvent,
  ExecutionEventHandler,
  ExecutionRequest,
  ExecutionResult,
  ExecutionStatus,
  PythonRuntimeError,
  WorkerInboundMessage,
  WorkerOutboundMessage,
} from "../types";

export interface PyodideWorkerProviderOptions {
  workerScriptUrl?: string;
  pyodideCdnUrl?: string;
  defaultTimeoutMs?: number;
}

export class PyodideWorkerExecutionProvider implements ExecutionProvider {
  public readonly id = "pyodide-worker";
  public readonly name = "Pyodide WebAssembly (Web Worker)";

  private workerScriptUrl: string;
  private pyodideCdnUrl: string;
  private defaultTimeoutMs: number;

  private worker: Worker | null = null;
  private status: ExecutionStatus = "idle";
  private currentRunId: string | null = null;
  private currentPromptId: string | null = null;
  private currentEventHandler: ExecutionEventHandler | null = null;
  private currentRunDeferred: {
    resolve: (res: ExecutionResult) => void;
    reject: (err: unknown) => void;
  } | null = null;

  private initPromise: Promise<void> | null = null;
  private timeoutTimer: ReturnType<typeof setTimeout> | null = null;
  private runStartTime = 0;
  private accumulatedStdout = "";
  private accumulatedStderr = "";
  private lastError: PythonRuntimeError | undefined = undefined;

  constructor(options: PyodideWorkerProviderOptions = {}) {
    this.workerScriptUrl = options.workerScriptUrl || getAssetPath("/workers/pyodide-worker.js");
    this.pyodideCdnUrl = options.pyodideCdnUrl || "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";
    this.defaultTimeoutMs = options.defaultTimeoutMs || 10000;
  }

  public getStatus(): ExecutionStatus {
    return this.status;
  }

  public async initialize(): Promise<void> {
    if (this.status === "ready") return;
    if (this.initPromise) return this.initPromise;

    if (typeof window === "undefined" || typeof Worker === "undefined") {
      throw new Error(
        "PyodideWorkerExecutionProvider requires a browser environment with Web Worker support."
      );
    }

    this.initPromise = new Promise<void>((resolve, reject) => {
      try {
        this.status = "initializing";
        this.emitEvent({ type: "initializing" });

        this.spawnWorker();

        const initTimeout = setTimeout(() => {
          this.status = "error";
          this.initPromise = null;
          reject(new Error("Pyodide worker initialization timed out after 45s"));
        }, 45000);

        const onReadyHandler = (event: MessageEvent<WorkerOutboundMessage>) => {
          if (event.data?.type === "READY") {
            clearTimeout(initTimeout);
            this.worker?.removeEventListener("message", onReadyHandler);
            this.status = "ready";
            this.emitEvent({ type: "ready", runtimeVersion: event.data.version });
            resolve();
          } else if (event.data?.type === "PROVIDER_ERROR") {
            clearTimeout(initTimeout);
            this.worker?.removeEventListener("message", onReadyHandler);
            this.status = "error";
            this.initPromise = null;
            reject(new Error(event.data.message));
          }
        };

        this.worker?.addEventListener("message", onReadyHandler);
        this.postToWorker({ type: "INIT", indexURL: this.pyodideCdnUrl });
      } catch (err) {
        this.status = "error";
        this.initPromise = null;
        reject(err);
      }
    });

    return this.initPromise;
  }

  public async run(
    request: ExecutionRequest,
    onEvent?: ExecutionEventHandler
  ): Promise<ExecutionResult> {
    if (this.status === "disposed") {
      throw new Error("Cannot execute code: execution provider has been disposed.");
    }

    // Lazy initialization if not yet ready
    if (this.status !== "ready") {
      await this.initialize();
    }

    const runId = "run_" + Math.random().toString(36).substring(2, 9);
    const timeoutMs = request.timeoutMs || this.defaultTimeoutMs;

    this.currentRunId = runId;
    this.currentPromptId = null;
    this.currentEventHandler = onEvent || null;
    this.accumulatedStdout = "";
    this.accumulatedStderr = "";
    this.lastError = undefined;
    this.runStartTime = performance.now();
    this.status = "running";

    this.emitEvent({ type: "running", runId });

    return new Promise<ExecutionResult>((resolve, reject) => {
      this.currentRunDeferred = { resolve, reject };

      // Setup timeout safety timer
      this.timeoutTimer = setTimeout(() => {
        this.handleTimeout(runId, timeoutMs);
      }, timeoutMs);

      this.postToWorker({
        type: "RUN",
        runId,
        code: request.code,
        timeoutMs,
        cleanEnvironment: request.cleanEnvironment !== false,
      });
    });
  }

  public async provideStdin(input: string): Promise<void> {
    if (this.status !== "waiting_for_input" || !this.currentPromptId) {
      throw new Error("Cannot provide stdin: runtime is not currently waiting for input.");
    }

    const promptId = this.currentPromptId;
    this.currentPromptId = null;
    this.status = "running";

    // Echo input with newline to stdout stream
    const inputChunk = input + "\n";
    this.accumulatedStdout += inputChunk;
    if (this.currentRunId) {
      this.emitEvent({
        type: "stdout",
        runId: this.currentRunId,
        chunk: inputChunk,
      });
    }

    this.postToWorker({
      type: "STDIN_RESPONSE",
      promptId,
      value: input,
    });
  }

  public async stop(): Promise<void> {
    if (this.status !== "running" && this.status !== "waiting_for_input") {
      return;
    }

    this.clearTimeoutTimer();
    const durationMs = Math.round(performance.now() - this.runStartTime);
    const runId = this.currentRunId || "stopped_run";

    // Hard terminate Web Worker to stop busy runaway loops
    this.terminateAndRespawn();

    this.status = "stopped";
    this.emitEvent({ type: "stopped", runId, durationMs });

    if (this.currentRunDeferred) {
      const result: ExecutionResult = {
        status: "stopped",
        exitCode: 130, // SIGINT
        stdout: this.accumulatedStdout,
        stderr: this.accumulatedStderr,
        durationMs,
      };
      this.currentRunDeferred.resolve(result);
      this.currentRunDeferred = null;
    }

    this.cleanupRunState();
  }

  public async reset(): Promise<void> {
    if (this.status === "disposed") return;

    this.clearTimeoutTimer();
    if (this.worker) {
      this.postToWorker({ type: "RESET_ENV" });
    }
    this.status = "ready";
  }

  public async dispose(): Promise<void> {
    this.clearTimeoutTimer();
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
    this.status = "disposed";
    this.initPromise = null;
    this.cleanupRunState();
  }

  private spawnWorker(): void {
    if (this.worker) {
      try {
        this.worker.terminate();
      } catch {
        // ignore
      }
    }

    this.worker = new Worker(this.workerScriptUrl);
    this.worker.onmessage = this.handleWorkerMessage.bind(this);
    this.worker.onerror = this.handleWorkerError.bind(this);
  }

  private terminateAndRespawn(): void {
    if (this.worker) {
      try {
        this.worker.terminate();
      } catch {
        // ignore
      }
      this.worker = null;
    }

    // Respawn clean worker in background so next run is instant
    this.initPromise = null;
    this.spawnWorker();
    this.postToWorker({ type: "INIT", indexURL: this.pyodideCdnUrl });
    this.status = "ready";
  }

  private handleWorkerMessage(event: MessageEvent<WorkerOutboundMessage>): void {
    const data = event.data;
    if (!data) return;

    switch (data.type) {
      case "INITIALIZING":
        this.status = "initializing";
        this.emitEvent({ type: "initializing" });
        break;

      case "READY":
        this.status = "ready";
        this.emitEvent({ type: "ready", runtimeVersion: data.version });
        break;

      case "RUNNING":
        this.status = "running";
        break;

      case "STDOUT":
        if (data.runId === this.currentRunId) {
          this.accumulatedStdout += data.chunk;
          this.emitEvent({ type: "stdout", runId: data.runId, chunk: data.chunk });
        }
        break;

      case "STDERR":
        if (data.runId === this.currentRunId) {
          this.accumulatedStderr += data.chunk;
          this.emitEvent({ type: "stderr", runId: data.runId, chunk: data.chunk });
        }
        break;

      case "WAITING_FOR_INPUT":
        if (data.runId === this.currentRunId) {
          this.status = "waiting_for_input";
          this.currentPromptId = data.promptId;
          this.emitEvent({
            type: "waiting_for_input",
            runId: data.runId,
            promptId: data.promptId,
            prompt: data.prompt,
          });
        }
        break;

      case "RUNTIME_ERROR":
        if (data.runId === this.currentRunId) {
          this.clearTimeoutTimer();
          this.lastError = data.error;
          this.status = "error";
          this.emitEvent({
            type: "runtime_error",
            runId: data.runId,
            error: data.error,
            durationMs: data.durationMs,
          });

          if (this.currentRunDeferred) {
            this.currentRunDeferred.resolve({
              status: "runtime_error",
              exitCode: 1,
              stdout: this.accumulatedStdout,
              stderr: this.accumulatedStderr,
              error: data.error,
              durationMs: data.durationMs,
            });
            this.currentRunDeferred = null;
          }
          this.cleanupRunState();
        }
        break;

      case "COMPLETED":
        if (data.runId === this.currentRunId) {
          this.clearTimeoutTimer();
          this.status = "completed";
          this.emitEvent({
            type: "completed",
            runId: data.runId,
            exitCode: data.exitCode,
            durationMs: data.durationMs,
          });

          if (this.currentRunDeferred) {
            this.currentRunDeferred.resolve({
              status: "completed",
              exitCode: data.exitCode,
              stdout: this.accumulatedStdout,
              stderr: this.accumulatedStderr,
              durationMs: data.durationMs,
            });
            this.currentRunDeferred = null;
          }
          this.cleanupRunState();
        }
        break;

      case "PROVIDER_ERROR":
        this.emitEvent({ type: "provider_error", message: data.message });
        if (this.currentRunDeferred) {
          this.currentRunDeferred.resolve({
            status: "provider_error",
            exitCode: 1,
            stdout: this.accumulatedStdout,
            stderr: this.accumulatedStderr,
            error: {
              name: "ProviderError",
              message: data.message,
              traceback: data.message,
            },
            durationMs: Math.round(performance.now() - this.runStartTime),
          });
          this.currentRunDeferred = null;
        }
        this.cleanupRunState();
        break;

      default:
        break;
    }
  }

  private handleWorkerError(errorEvent: ErrorEvent): void {
    const errorMsg = errorEvent?.message || "Unhandled Web Worker error occurred";
    this.emitEvent({ type: "provider_error", message: errorMsg });

    if (this.currentRunDeferred) {
      this.currentRunDeferred.resolve({
        status: "provider_error",
        exitCode: 1,
        stdout: this.accumulatedStdout,
        stderr: this.accumulatedStderr,
        error: {
          name: "WorkerError",
          message: errorMsg,
          traceback: errorMsg,
        },
        durationMs: Math.round(performance.now() - this.runStartTime),
      });
      this.currentRunDeferred = null;
    }

    this.terminateAndRespawn();
    this.cleanupRunState();
  }

  private handleTimeout(runId: string, timeoutMs: number): void {
    const durationMs = Math.round(performance.now() - this.runStartTime);

    // Hard terminate runaway worker
    this.terminateAndRespawn();

    this.status = "timed_out";
    this.emitEvent({
      type: "timed_out",
      runId,
      timeoutMs,
      durationMs,
    });

    if (this.currentRunDeferred) {
      this.currentRunDeferred.resolve({
        status: "timed_out",
        exitCode: 124, // Timeout exit code
        stdout: this.accumulatedStdout,
        stderr: this.accumulatedStderr + `\nExecution timed out after ${timeoutMs / 1000}s`,
        durationMs,
      });
      this.currentRunDeferred = null;
    }

    this.cleanupRunState();
  }

  private clearTimeoutTimer(): void {
    if (this.timeoutTimer) {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = null;
    }
  }

  private cleanupRunState(): void {
    this.clearTimeoutTimer();
    this.currentRunId = null;
    this.currentPromptId = null;
    this.currentEventHandler = null;
  }

  private postToWorker(message: WorkerInboundMessage): void {
    if (this.worker) {
      this.worker.postMessage(message);
    }
  }

  private emitEvent(event: ExecutionEvent): void {
    if (this.currentEventHandler) {
      try {
        this.currentEventHandler(event);
      } catch (err) {
        console.error("Execution event handler threw:", err);
      }
    }
  }
}
