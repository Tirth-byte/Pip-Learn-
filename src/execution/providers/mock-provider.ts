/**
 * Mock Execution Provider
 * 
 * Provides a deterministic, headless execution provider for automated unit tests,
 * CI pipelines, and simulated interaction testing without requiring Web Workers or WASM.
 */

import { ExecutionProvider } from "../execution-provider.interface";
import {
  ExecutionEvent,
  ExecutionEventHandler,
  ExecutionRequest,
  ExecutionResult,
  ExecutionStatus,
  PythonRuntimeError,
} from "../types";

export interface MockScenario {
  stdoutChunks?: string[];
  stderrChunks?: string[];
  inputPrompts?: { prompt: string; expectedInput?: string }[];
  promptCount?: number;
  dynamicHandler?: (inputs: string[]) => { stdout?: string; error?: PythonRuntimeError; timedOut?: boolean };
  error?: PythonRuntimeError;
  delayMs?: number;
  hangForever?: boolean;
}

export class MockExecutionProvider implements ExecutionProvider {
  public readonly id = "mock-runner";
  public readonly name = "Mock Python Runner (Headless Unit Tests)";

  private status: ExecutionStatus = "idle";
  private currentEventHandler: ExecutionEventHandler | null = null;
  private currentPromptId: string | null = null;
  private activeStdinResolver: ((value: string) => void) | null = null;
  private activeRunTimer: ReturnType<typeof setTimeout> | null = null;
  private activeScenario: MockScenario | null = null;
  private emittedEvents: ExecutionEvent[] = [];

  constructor(private defaultScenario?: MockScenario) {}

  public setScenario(scenario: MockScenario): void {
    this.activeScenario = scenario;
  }

  public getEmittedEvents(): ExecutionEvent[] {
    return [...this.emittedEvents];
  }

  public getStatus(): ExecutionStatus {
    return this.status;
  }

  public async initialize(): Promise<void> {
    this.status = "initializing";
    this.emitEvent({ type: "initializing" });
    this.status = "ready";
    this.emitEvent({ type: "ready", runtimeVersion: "mock-3.12" });
  }

  public async run(
    request: ExecutionRequest,
    onEvent?: ExecutionEventHandler
  ): Promise<ExecutionResult> {
    if (this.status === "disposed") {
      throw new Error("Cannot execute code: provider is disposed");
    }

    this.currentEventHandler = onEvent || null;
    this.status = "running";
    const runId = "mock_run_" + Math.random().toString(36).substring(2, 7);
    this.emitEvent({ type: "running", runId });

    const scenario = this.activeScenario || this.defaultScenario || {};
    const startTime = Date.now();
    let accumulatedStdout = "";
    let accumulatedStderr = "";

    return new Promise<ExecutionResult>((resolve) => {
      const executeSequence = async () => {
        // 1. Check for infinite hang scenario
        if (scenario.hangForever) {
          // Will wait until stop() or timeout
          return;
        }

        // 2. Interactive input prompts
        const capturedInputs: string[] = [];
        const numPrompts = scenario.promptCount ?? scenario.inputPrompts?.length ?? (scenario.dynamicHandler ? 3 : 0);

        if (numPrompts > 0) {
          for (let i = 0; i < numPrompts; i++) {
            const promptItem = scenario.inputPrompts?.[i];
            const promptText = promptItem?.prompt || "";
            const promptId = `prompt_${i + 1}`;
            this.currentPromptId = promptId;
            this.status = "waiting_for_input";

            // Emit prompt stdout
            if (promptText) {
              accumulatedStdout += promptText;
              this.emitEvent({ type: "stdout", runId, chunk: promptText });
            }

            // Prepare stdin promise before emitting event to allow synchronous handler resolution
            const inputPromise = new Promise<string>((res) => {
              this.activeStdinResolver = res;
            });

            this.emitEvent({
              type: "waiting_for_input",
              runId,
              promptId,
              prompt: promptText,
            });

            // Wait for provideStdin to resolve
            const learnerInput = await inputPromise;

            // Stdin was provided
            capturedInputs.push(learnerInput);
            accumulatedStdout += learnerInput + "\n";
            this.status = "running";
          }
        }

        // 3. Run dynamic handler if provided
        if (scenario.dynamicHandler) {
          const dynamicRes = scenario.dynamicHandler(capturedInputs);
          if (dynamicRes.timedOut) {
            this.status = "timed_out";
            resolve({
              status: "timed_out",
              exitCode: 124,
              stdout: accumulatedStdout + (dynamicRes.stdout || ""),
              stderr: "Execution timed out",
              durationMs: Date.now() - startTime,
            });
            return;
          }
          if (dynamicRes.error) {
            this.status = "error";
            resolve({
              status: "runtime_error",
              exitCode: 1,
              stdout: accumulatedStdout + (dynamicRes.stdout || ""),
              stderr: dynamicRes.error.message,
              error: dynamicRes.error,
              durationMs: Date.now() - startTime,
            });
            return;
          }
          if (dynamicRes.stdout) {
            accumulatedStdout += dynamicRes.stdout;
            this.emitEvent({ type: "stdout", runId, chunk: dynamicRes.stdout });
          }
        }

        // 4. Emit stdout chunks
        if (scenario.stdoutChunks) {
          for (const chunk of scenario.stdoutChunks) {
            accumulatedStdout += chunk;
            this.emitEvent({ type: "stdout", runId, chunk });
          }
        }

        // 5. Emit stderr chunks
        if (scenario.stderrChunks) {
          for (const chunk of scenario.stderrChunks) {
            accumulatedStderr += chunk;
            this.emitEvent({ type: "stderr", runId, chunk });
          }
        }

        const durationMs = Date.now() - startTime;

        // 6. Handle simulated error
        if (scenario.error) {
          this.status = "error";
          this.emitEvent({
            type: "runtime_error",
            runId,
            error: scenario.error,
            durationMs,
          });

          resolve({
            status: "runtime_error",
            exitCode: 1,
            stdout: accumulatedStdout,
            stderr: accumulatedStderr,
            error: scenario.error,
            durationMs,
          });
          return;
        }

        // 7. Handle completed
        this.status = "completed";
        this.emitEvent({
          type: "completed",
          runId,
          exitCode: 0,
          durationMs,
        });

        resolve({
          status: "completed",
          exitCode: 0,
          stdout: accumulatedStdout,
          stderr: accumulatedStderr,
          durationMs,
        });
      };

      if (scenario.delayMs) {
        this.activeRunTimer = setTimeout(executeSequence, scenario.delayMs);
      } else {
        executeSequence();
      }
    });
  }

  public async provideStdin(input: string): Promise<void> {
    if (this.status !== "waiting_for_input" || !this.activeStdinResolver) {
      throw new Error("Cannot provide stdin: runtime is not currently waiting for input.");
    }

    const resolver = this.activeStdinResolver;
    this.activeStdinResolver = null;
    this.currentPromptId = null;
    resolver(input);
  }

  public async stop(): Promise<void> {
    if (this.activeRunTimer) {
      clearTimeout(this.activeRunTimer);
      this.activeRunTimer = null;
    }

    this.status = "stopped";
    this.emitEvent({ type: "stopped", runId: "mock_stopped", durationMs: 5 });
    if (this.activeStdinResolver) {
      this.activeStdinResolver = null;
    }
  }

  public async reset(): Promise<void> {
    this.status = "ready";
    this.currentPromptId = null;
    this.activeStdinResolver = null;
  }

  public async dispose(): Promise<void> {
    this.status = "disposed";
    this.currentEventHandler = null;
    this.activeStdinResolver = null;
  }

  private emitEvent(event: ExecutionEvent): void {
    this.emittedEvents.push(event);
    if (this.currentEventHandler) {
      this.currentEventHandler(event);
    }
  }
}
