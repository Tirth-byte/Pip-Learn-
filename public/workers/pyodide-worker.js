/**
 * PipLearn Pyodide Web Worker Runtime
 * 
 * Runs Pyodide in an isolated Web Worker thread with:
 * - Async input() support via AST transformer & JS Promise bridge
 * - Real-time stdout/stderr streaming
 * - Structured Python error extraction (NameError, SyntaxError, etc.)
 * - Isolated per-run globals namespace
 */

/* eslint-disable no-restricted-globals */

let pyodide = null;
let isInitializing = false;
let currentRunId = null;
let activeStdinResolver = null;
let activePromptId = null;

const DEFAULT_PYODIDE_CDN = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";

const PYTHON_RUNNER_BRIDGE = `
import ast
import sys
import traceback
import js

# Support Python 3.8+ top-level await
ALLOW_TOP_LEVEL_AWAIT = getattr(ast, "PyCF_ALLOW_TOP_LEVEL_AWAIT", 0x2000)

class PipLearnInputTransformer(ast.NodeTransformer):
    """
    Transforms synchronous input(...) calls into (await __piplearn_async_input__(...))
    so the Web Worker event loop can pause and resume for interactive stdin.
    """
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
    # Print prompt text to stdout before waiting
    if prompt:
        print(str(prompt), end="", flush=True)
    res = await js.__piplearn_request_stdin__(str(prompt))
    return str(res)

async def __piplearn_run_user_code__(code_str, clean_env=True):
    try:
        tree = ast.parse(code_str, filename="<user_code>")
    except SyntaxError as e:
        return {
            "success": False,
            "error_type": "SyntaxError",
            "message": str(getattr(e, "msg", e)),
            "traceback": traceback.format_exc(),
            "line": getattr(e, "lineno", None),
            "column": getattr(e, "offset", None)
        }
    except Exception as e:
        return {
            "success": False,
            "error_type": type(e).__name__,
            "message": str(e),
            "traceback": traceback.format_exc(),
            "line": None,
            "column": None
        }

    # Transform input() calls to async input
    try:
        transformed_tree = PipLearnInputTransformer().visit(tree)
        ast.fix_missing_locations(transformed_tree)
    except Exception as e:
        # Fall back to original tree if transformation fails
        transformed_tree = tree

    try:
        compiled = compile(transformed_tree, filename="<user_code>", mode="exec", flags=ALLOW_TOP_LEVEL_AWAIT)
    except Exception as e:
        return {
            "success": False,
            "error_type": type(e).__name__,
            "message": str(e),
            "traceback": traceback.format_exc(),
            "line": getattr(e, "lineno", None),
            "column": getattr(e, "offset", None)
        }

    user_globals = {
        "__name__": "__main__",
        "__doc__": None,
        "__piplearn_async_input__": __piplearn_async_input__,
        "input": __piplearn_async_input__,
    }

    try:
        # Check if compiled code contains top-level coroutine
        if bool(compiled.co_flags & 0x80):
            coro = eval(compiled, user_globals)
            await coro
        else:
            exec(compiled, user_globals)
        return {"success": True}
    except Exception as e:
        tb_lines = traceback.format_exception(type(e), e, e.__traceback__)
        # Filter out internal runner frames to keep traceback clean
        cleaned_tb_lines = [
            l for l in tb_lines 
            if "__piplearn_run_user_code__" not in l and "<exec>" not in l and "PipLearnInputTransformer" not in l
        ]
        cleaned_tb = "".join(cleaned_tb_lines)

        lineno = None
        if e.__traceback__:
            cur = e.__traceback__
            while cur:
                if cur.tb_frame.f_code.co_filename == "<user_code>":
                    lineno = cur.tb_lineno
                cur = cur.tb_next

        return {
            "success": False,
            "error_type": type(e).__name__,
            "message": str(e),
            "traceback": cleaned_tb or traceback.format_exc(),
            "line": lineno
        }
`;

async function initPyodideRuntime(indexURL = DEFAULT_PYODIDE_CDN) {
  if (pyodide) return pyodide;
  if (isInitializing) return;
  isInitializing = true;

  self.postMessage({ type: "INITIALIZING" });

  try {
    // Load Pyodide script inside worker
    if (typeof loadPyodide === "undefined") {
      importScripts(`${indexURL}pyodide.js`);
    }

    pyodide = await loadPyodide({
      indexURL,
      stdout: (text) => {
        if (currentRunId) {
          self.postMessage({ type: "STDOUT", runId: currentRunId, chunk: text + "\n" });
        }
      },
      stderr: (text) => {
        if (currentRunId) {
          self.postMessage({ type: "STDERR", runId: currentRunId, chunk: text + "\n" });
        }
      },
    });

    // Expose stdin handler to global scope for Python
    self.__piplearn_request_stdin__ = (promptText) => {
      const promptId = "prompt_" + Math.random().toString(36).substring(2, 9);
      activePromptId = promptId;

      return new Promise((resolve) => {
        activeStdinResolver = resolve;
        self.postMessage({
          type: "WAITING_FOR_INPUT",
          runId: currentRunId,
          promptId,
          prompt: promptText,
        });
      });
    };

    // Load Python bridge runner
    await pyodide.runPythonAsync(PYTHON_RUNNER_BRIDGE);

    isInitializing = false;
    self.postMessage({ type: "READY", version: pyodide.version || "0.26.4" });
    return pyodide;
  } catch (err) {
    isInitializing = false;
    self.postMessage({
      type: "PROVIDER_ERROR",
      message: "Failed to initialize Pyodide worker: " + (err?.message || String(err)),
    });
    throw err;
  }
}

self.onmessage = async (event) => {
  const { type, runId, code, promptId, value, indexURL, cleanEnvironment } = event.data || {};

  switch (type) {
    case "INIT": {
      try {
        await initPyodideRuntime(indexURL || DEFAULT_PYODIDE_CDN);
      } catch (err) {
        // error already emitted
      }
      break;
    }

    case "RUN": {
      const startTime = performance.now();
      currentRunId = runId;

      try {
        if (!pyodide) {
          await initPyodideRuntime(indexURL || DEFAULT_PYODIDE_CDN);
        }

        self.postMessage({ type: "RUNNING", runId });

        // Run user code via Python runner bridge
        const escapedCode = JSON.stringify(code || "");
        const shouldClean = cleanEnvironment !== false;
        const resultPy = await pyodide.runPythonAsync(
          `__piplearn_run_user_code__(${escapedCode}, clean_env=${shouldClean ? "True" : "False"})`
        );

        const result = resultPy.toJs({ depth: 2 });
        const durationMs = Math.round(performance.now() - startTime);

        if (result.success) {
          self.postMessage({
            type: "COMPLETED",
            runId,
            exitCode: 0,
            durationMs,
          });
        } else {
          self.postMessage({
            type: "RUNTIME_ERROR",
            runId,
            error: {
              name: result.error_type || "RuntimeError",
              message: result.message || "An unknown Python error occurred",
              traceback: result.traceback || "",
              line: result.line,
              column: result.column,
            },
            durationMs,
          });
        }
      } catch (err) {
        const durationMs = Math.round(performance.now() - startTime);
        self.postMessage({
          type: "RUNTIME_ERROR",
          runId,
          error: {
            name: err?.type || err?.name || "ExecutionError",
            message: err?.message || String(err),
            traceback: err?.stack || String(err),
          },
          durationMs,
        });
      } finally {
        currentRunId = null;
        activeStdinResolver = null;
        activePromptId = null;
      }
      break;
    }

    case "STDIN_RESPONSE": {
      if (activeStdinResolver && activePromptId === promptId) {
        const resolver = activeStdinResolver;
        activeStdinResolver = null;
        activePromptId = null;
        resolver(value || "");
      }
      break;
    }

    case "RESET_ENV": {
      if (pyodide) {
        try {
          await pyodide.runPythonAsync(`
import gc
gc.collect()
`);
          self.postMessage({ type: "RESET_COMPLETE" });
        } catch {
          // ignore
        }
      }
      break;
    }

    default:
      break;
  }
};
