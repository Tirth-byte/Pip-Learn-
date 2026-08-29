/**
 * Python Execution Provider Interface Contract
 * 
 * Standard contract for executing Python code across different environments:
 * - Client-side Web Worker (Pyodide)
 * - Headless test mocks (Unit tests & CI)
 * - Future remote container sandboxes (Docker / Firecracker / WebAssembly backend)
 */

import {
  ExecutionStatus,
  ExecutionRequest,
  ExecutionResult,
  ExecutionEventHandler,
} from "./types";

export interface ExecutionProvider {
  /**
   * Unique identifier of the provider implementation (e.g. "pyodide-worker", "mock-runner")
   */
  readonly id: string;

  /**
   * Human-readable name of the execution provider
   */
  readonly name: string;

  /**
   * Returns the current lifecycle status of the runtime provider
   */
  getStatus(): ExecutionStatus;

  /**
   * Initializes the underlying runtime environment (e.g. downloads WASM, warms up worker pool).
   * Lazy initialization is supported if run() is invoked before initialize().
   */
  initialize(): Promise<void>;

  /**
   * Executes a Python script with optional file fixtures and real-time streaming events.
   */
  run(
    request: ExecutionRequest,
    onEvent?: ExecutionEventHandler
  ): Promise<ExecutionResult>;

  /**
   * Supplies standard input (stdin) to a currently suspended Python input() call.
   * Throws an error if the execution is not currently in "waiting_for_input" state.
   */
  provideStdin(input: string): Promise<void>;

  /**
   * Cancels and stops active code execution immediately.
   * For worker-based runtimes, this terminates runaway loops safely without breaking the session.
   */
  stop(): Promise<void>;

  /**
   * Resets the execution environment namespace and reclaims memory.
   */
  reset(): Promise<void>;

  /**
   * Completely tears down the runtime and terminates all active workers and timers.
   */
  dispose(): Promise<void>;
}
