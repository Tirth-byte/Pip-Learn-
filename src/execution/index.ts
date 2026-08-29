/**
 * PipLearn Python Execution Engine
 * 
 * Public entrypoint for runtime-agnostic Python execution.
 */

export * from "./types";
export * from "./execution-provider.interface";
export * from "./providers/pyodide-worker-provider";
export * from "./providers/mock-provider";

import { ExecutionProvider } from "./execution-provider.interface";
import { PyodideWorkerExecutionProvider, PyodideWorkerProviderOptions } from "./providers/pyodide-worker-provider";
import { MockExecutionProvider, MockScenario } from "./providers/mock-provider";

export type ExecutionProviderType = "pyodide" | "mock";

/**
 * Factory to instantiate an ExecutionProvider
 */
export function createExecutionProvider(
  type: ExecutionProviderType = "pyodide",
  options?: PyodideWorkerProviderOptions | MockScenario
): ExecutionProvider {
  if (type === "mock") {
    return new MockExecutionProvider(options as MockScenario);
  }

  return new PyodideWorkerExecutionProvider(options as PyodideWorkerProviderOptions);
}
