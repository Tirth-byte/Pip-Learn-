/**
 * Python Execution Abstraction Layer — Types & Contracts
 * 
 * Defines runtime-agnostic domain interfaces, execution events, and result models
 * allowing the learning UI and validation runners to execute Python without coupling
 * directly to Pyodide, Web Workers, or any specific backend sandbox.
 */

export type ExecutionStatus =
  | "idle"
  | "initializing"
  | "ready"
  | "running"
  | "waiting_for_input"
  | "completed"
  | "stopped"
  | "timed_out"
  | "error"
  | "disposed";

export interface PythonRuntimeError {
  name: string; // e.g. "NameError", "TypeError", "SyntaxError", "ZeroDivisionError"
  message: string;
  traceback: string;
  line?: number;
  column?: number;
}

export interface ExecutionRequest {
  code: string;
  files?: Record<string, string>;
  entrypoint?: string; // Default: main.py / calculator.py
  timeoutMs?: number; // Configurable timeout in milliseconds (default: 10,000ms)
  cleanEnvironment?: boolean; // If true, wipes global variables before execution (default: true)
}

export interface ExecutionResult {
  status: "completed" | "stopped" | "timed_out" | "runtime_error" | "provider_error";
  exitCode: number;
  stdout: string;
  stderr: string;
  error?: PythonRuntimeError;
  durationMs: number;
}

export type ExecutionEvent =
  | { type: "initializing" }
  | { type: "ready"; runtimeVersion?: string }
  | { type: "running"; runId: string }
  | { type: "waiting_for_input"; runId: string; promptId: string; prompt: string }
  | { type: "stdout"; runId: string; chunk: string }
  | { type: "stderr"; runId: string; chunk: string }
  | { type: "runtime_error"; runId: string; error: PythonRuntimeError; durationMs: number }
  | { type: "completed"; runId: string; exitCode: number; durationMs: number }
  | { type: "stopped"; runId: string; durationMs: number }
  | { type: "timed_out"; runId: string; timeoutMs: number; durationMs: number }
  | { type: "provider_error"; message: string };

export type ExecutionEventHandler = (event: ExecutionEvent) => void;

/**
 * Internal Worker Message Protocol
 */
export type WorkerInboundMessage =
  | { type: "INIT"; indexURL?: string }
  | { type: "RUN"; runId: string; code: string; timeoutMs?: number; cleanEnvironment?: boolean }
  | { type: "STDIN_RESPONSE"; promptId: string; value: string }
  | { type: "RESET_ENV" };

export type WorkerOutboundMessage =
  | { type: "INITIALIZING" }
  | { type: "READY"; version?: string }
  | { type: "RUNNING"; runId: string }
  | { type: "STDOUT"; runId: string; chunk: string }
  | { type: "STDERR"; runId: string; chunk: string }
  | { type: "WAITING_FOR_INPUT"; runId: string; promptId: string; prompt: string }
  | { type: "RUNTIME_ERROR"; runId: string; error: PythonRuntimeError; durationMs: number }
  | { type: "COMPLETED"; runId: string; exitCode: number; durationMs: number }
  | { type: "RESET_COMPLETE" }
  | { type: "PROVIDER_ERROR"; message: string };
