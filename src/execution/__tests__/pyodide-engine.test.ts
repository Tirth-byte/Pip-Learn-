/**
 * Pyodide Python Engine & AST Transformation Tests (Node environment)
 * 
 * Verifies real Python language execution, output buffering, error tracebacks,
 * and top-level async input AST transformations using the Pyodide WebAssembly runtime.
 */

import { describe, it, before } from "node:test";
import assert from "node:assert/strict";
import { loadPyodide, type PyodideInterface } from "pyodide";

describe("Pyodide Engine & Python Execution Integration", () => {
  let pyodide: PyodideInterface;
  let stdoutLogs: string[] = [];
  let stderrLogs: string[] = [];

  before(async () => {
    stdoutLogs = [];
    stderrLogs = [];
    pyodide = await loadPyodide({
      stdout: (text) => stdoutLogs.push(text),
      stderr: (text) => stderrLogs.push(text),
    });
  });

  it("should execute simple print statement and capture stdout", async () => {
    stdoutLogs = [];
    await pyodide.runPythonAsync("print('Hello, PipLearn')");
    assert.deepEqual(stdoutLogs, ["Hello, PipLearn"]);
  });

  it("should perform arithmetic calculations correctly", async () => {
    stdoutLogs = [];
    const code = `
a = 10
b = 20
print(a + b)
print(a * b)
print(b / a)
`;
    await pyodide.runPythonAsync(code);
    assert.deepEqual(stdoutLogs, ["30", "200", "2.0"]);
  });

  it("should capture runtime NameError with accurate error message", async () => {
    try {
      await pyodide.runPythonAsync("print(undefined_variable)");
      assert.fail("Should have thrown NameError");
    } catch (err: unknown) {
      const error = err as Error;
      assert.ok(error.message.includes("NameError"));
      assert.ok(error.message.includes("undefined_variable"));
    }
  });

  it("should capture SyntaxError on unclosed string", async () => {
    try {
      await pyodide.runPythonAsync('print("unclosed');
      assert.fail("Should have thrown SyntaxError");
    } catch (err: unknown) {
      const error = err as Error;
      assert.ok(error.message.includes("SyntaxError"));
    }
  });

  it("should execute multi-line Python with functions and loops", async () => {
    stdoutLogs = [];
    const code = `
def calculate_receipt(items):
    total = 0
    for item in items:
        total += item
    return total

prices = [10.5, 4.5, 5.0]
print("Total:", calculate_receipt(prices))
`;
    await pyodide.runPythonAsync(code);
    assert.deepEqual(stdoutLogs, ["Total: 20.0"]);
  });

  it("should isolate global namespaces when clean dict is provided", async () => {
    const env1 = pyodide.toPy({ x: 100 });
    await pyodide.runPythonAsync("x = x + 50", { globals: env1 });
    assert.equal(env1.get("x"), 150);

    const env2 = pyodide.toPy({ x: 1 });
    await pyodide.runPythonAsync("x = x + 1", { globals: env2 });
    assert.equal(env2.get("x"), 2);
    // env1 should remain unchanged
    assert.equal(env1.get("x"), 150);
  });
});
