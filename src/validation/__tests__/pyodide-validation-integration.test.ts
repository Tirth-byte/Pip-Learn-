/**
 * Behavioral Validation Integration Tests (Real Pyodide Runtime)
 * 
 * Verifies that real Python code running under Pyodide WebAssembly passes or fails
 * behavioral milestone validation suites authentically with real AST input transformation.
 */

import { describe, it, before } from "node:test";
import assert from "node:assert/strict";
import { loadPyodide, type PyodideInterface } from "pyodide";
import { ExecutionProvider } from "@/execution/execution-provider.interface";
import {
  ExecutionEventHandler,
  ExecutionRequest,
  ExecutionResult,
  ExecutionStatus,
} from "@/execution/types";
import { createValidationEngine } from "../index";

/**
 * Node-based Pyodide Execution Provider for integration tests
 */
class NodePyodideExecutionProvider implements ExecutionProvider {
  public readonly id = "node-pyodide";
  public readonly name = "Node Pyodide Runtime";
  private status: ExecutionStatus = "idle";
  private pyodide: PyodideInterface | null = null;
  private currentStdinResolver: ((val: string) => void) | null = null;

  public async initialize(): Promise<void> {
    if (this.pyodide) return;
    this.status = "initializing";
    this.pyodide = await loadPyodide();

    // Register async input bridge
    (globalThis as unknown as Record<string, unknown>).__test_request_stdin__ = (_prompt: string) => {
      return new Promise<string>((resolve) => {
        this.currentStdinResolver = resolve;
      });
    };

    const bridge = `
import ast, sys, traceback, js
ALLOW_TOP_LEVEL_AWAIT = getattr(ast, "PyCF_ALLOW_TOP_LEVEL_AWAIT", 0x2000)

class InputTransformer(ast.NodeTransformer):
    def visit_Call(self, node):
        self.generic_visit(node)
        if isinstance(node.func, ast.Name) and node.func.id == "input":
            new_func = ast.Name(id="__piplearn_async_input__", ctx=ast.Load())
            new_call = ast.Call(func=new_func, args=node.args, keywords=node.keywords)
            ast.copy_location(new_call, node)
            new_await = ast.Await(value=new_call)
            ast.copy_location(new_await, node)
            return new_await
        return node

    def visit_FunctionDef(self, node):
        self.generic_visit(node)
        has_await = any(isinstance(n, ast.Await) for n in ast.walk(node))
        if has_await:
            new_fn = ast.AsyncFunctionDef(
                name=node.name,
                args=node.args,
                body=node.body,
                decorator_list=node.decorator_list,
                returns=node.returns,
                type_comment=getattr(node, "type_comment", None)
            )
            ast.copy_location(new_fn, node)
            return new_fn
        return node

async def __piplearn_async_input__(prompt=""):
    if prompt:
        print(str(prompt), end="", flush=True)
    res = await js.__test_request_stdin__(str(prompt))
    return str(res)

async def __run_code__(code_str):
    tree = ast.parse(code_str, filename="<user_code>")
    tree = InputTransformer().visit(tree)
    ast.fix_missing_locations(tree)
    compiled = compile(tree, filename="<user_code>", mode="exec", flags=ALLOW_TOP_LEVEL_AWAIT)
    g = {"__name__": "__main__", "__piplearn_async_input__": __piplearn_async_input__, "input": __piplearn_async_input__}
    if bool(compiled.co_flags & 0x80):
        await eval(compiled, g)
    else:
        exec(compiled, g)
`;
    await this.pyodide.runPythonAsync(bridge);
    this.status = "ready";
  }

  public getStatus(): ExecutionStatus {
    return this.status;
  }

  public async run(
    request: ExecutionRequest,
    onEvent?: ExecutionEventHandler
  ): Promise<ExecutionResult> {
    await this.initialize();
    this.status = "running";
    const startTime = performance.now();
    let accumulatedStdout = "";

    // Intercept stdout
    this.pyodide!.setStdout({
      batched: (text: string) => {
        accumulatedStdout += text + "\n";
        onEvent?.({ type: "stdout", runId: "r1", chunk: text + "\n" });
      },
    });

    try {
      const escapedCode = JSON.stringify(request.code);
      const runPromise = this.pyodide!.runPythonAsync(`__run_code__(${escapedCode})`);

      // If waiting for input, trigger event
      const checkInputTimer = setInterval(() => {
        if (this.currentStdinResolver) {
          onEvent?.({
            type: "waiting_for_input",
            runId: "r1",
            promptId: "p1",
            prompt: "",
          });
        }
      }, 5);

      await runPromise;
      clearInterval(checkInputTimer);

      this.status = "completed";
      return {
        status: "completed",
        exitCode: 0,
        stdout: accumulatedStdout,
        stderr: "",
        durationMs: Math.round(performance.now() - startTime),
      };
    } catch (err: unknown) {
      const errorMsg = (err as Error).message || String(err);
      this.status = "error";
      return {
        status: "runtime_error",
        exitCode: 1,
        stdout: accumulatedStdout,
        stderr: errorMsg,
        error: {
          name: "PythonError",
          message: errorMsg,
          traceback: errorMsg,
        },
        durationMs: Math.round(performance.now() - startTime),
      };
    }
  }

  public async provideStdin(input: string): Promise<void> {
    if (this.currentStdinResolver) {
      const res = this.currentStdinResolver;
      this.currentStdinResolver = null;
      res(input);
    }
  }

  public async stop(): Promise<void> {
    this.status = "stopped";
  }

  public async reset(): Promise<void> {
    this.status = "ready";
  }

  public async dispose(): Promise<void> {
    this.status = "disposed";
  }
}

describe("Real Pyodide Python Validation Integration", () => {
  let provider: NodePyodideExecutionProvider;

  before(async () => {
    provider = new NodePyodideExecutionProvider();
    await provider.initialize();
  });

  it("should validate a real Python Milestone 1 script (print & input)", async () => {
    const engine = createValidationEngine(provider);
    const learnerCode = `
print("=================================")
print("   PIP LEARN SMART CALCULATOR    ")
print("=================================")
user_name = input("What is your name? ")
print(f"Hello, {user_name}! Ready to calculate.")
`;

    const result = await engine.validateMilestone({
      projectId: "project-smart-calculator",
      milestoneId: "milestone-calc-1",
      files: { "calculator.py": learnerCode },
    });

    assert.equal(result.status, "passed");
    assert.equal(result.passed, true);
    assert.equal(result.passedChecks, 2);
  });

  it("should validate a real Python Milestone 2 script with float casting", async () => {
    const engine = createValidationEngine(provider);
    const learnerCode = `
name = input("Name: ")
num1 = float(input("First: "))
num2 = float(input("Second: "))
total = num1 + num2
print(f"Addition Result: {total}")
`;

    const result = await engine.validateMilestone({
      projectId: "project-smart-calculator",
      milestoneId: "milestone-calc-2",
      files: { "calculator.py": learnerCode },
    });

    assert.equal(result.status, "passed");
    assert.equal(result.passed, true);
    assert.equal(result.passedChecks, 3);
  });

  it("should fail a real Python Milestone 2 script with the string concatenation trap", async () => {
    const engine = createValidationEngine(provider);
    const trappedCode = `
name = input("Name: ")
num1 = input("First: ")
num2 = input("Second: ")
total = num1 + num2
print(f"Addition Result: {total}")
`;

    const result = await engine.validateMilestone({
      projectId: "project-smart-calculator",
      milestoneId: "milestone-calc-2",
      files: { "calculator.py": trappedCode },
    });

    assert.equal(result.status, "failed");
    assert.equal(result.passed, false);
    assert.ok(result.testCaseResults[0]?.learnerFeedback?.includes("joined the text inputs"));
  });

  it("should validate a real Python Milestone 3 script with all 7 operations", async () => {
    const engine = createValidationEngine(provider);
    const fullMathCode = `
name = input("Name: ")
a = float(input("Num1: "))
b = float(input("Num2: "))
print("Addition:", a + b)
print("Subtraction:", a - b)
print("Multiplication:", a * b)
print("Division:", a / b)
print("Floor Div:", a // b)
print("Modulo:", a % b)
print("Power:", a ** 2)
`;

    const result = await engine.validateMilestone({
      projectId: "project-smart-calculator",
      milestoneId: "milestone-calc-3",
      files: { "calculator.py": fullMathCode },
    });

    assert.equal(result.status, "passed");
    assert.equal(result.passed, true);
    assert.equal(result.passedChecks, 2);
  });
});
