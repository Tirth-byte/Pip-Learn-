"use client";

import { useEffect, useRef, useState } from "react";
import {
  createExecutionProvider,
  ExecutionEvent,
  ExecutionProvider,
  ExecutionResult,
  ExecutionStatus,
  PythonRuntimeError,
} from "@/execution";
import {
  validateMilestone,
  ValidationResult,
} from "@/validation";

const EXECUTION_PRESETS = [
  {
    id: "preset_hello",
    label: "Hello World",
    code: `print("Hello, PipLearn")`,
  },
  {
    id: "preset_arithmetic",
    label: "Arithmetic",
    code: `a = 10\nb = 20\nprint("Sum:", a + b)\nprint("Product:", a * b)\nprint("Division:", b / a)`,
  },
  {
    id: "preset_single_input",
    label: "One input()",
    code: `name = input("What is your name? ")\nprint("Hello", name)`,
  },
  {
    id: "preset_multi_input",
    label: "Multiple sequential input()",
    code: `first = input("First number: ")\nsecond = input("Second number: ")\nprint("You entered:", first, "and", second)`,
  },
  {
    id: "preset_calculator_trap",
    label: "Calculator Type Trap & Fix",
    code: `num1 = float(input("Enter first number: "))\nnum2 = float(input("Enter second number: "))\ntotal = num1 + num2\nprint(f"Calculated Sum: {total}")`,
  },
  {
    id: "preset_name_error",
    label: "Runtime NameError",
    code: `print("Starting program...")\nprint(undefined_variable)\nprint("Unreachable")`,
  },
  {
    id: "preset_syntax_error",
    label: "SyntaxError",
    code: `print("Unclosed string`,
  },
  {
    id: "preset_infinite_loop",
    label: "Infinite loop (Test Stop)",
    code: `# Infinite loop — Click 'Stop' to terminate worker\ni = 0\nwhile True:\n    i += 1`,
  },
];

const VALIDATION_MATRIX_PRESETS = [
  {
    id: "matrix_a",
    milestoneId: "milestone-calc-1",
    label: "A. Correct Milestone 1 (Welcome & Greet) → PASS",
    code: `print("=== SMART CALCULATOR ===")\nuser_name = input("What is your name? ")\nprint(f"Welcome, {user_name}! Let's do some math.")`,
    expected: "PASS",
  },
  {
    id: "matrix_b",
    milestoneId: "milestone-calc-1",
    label: "B. Incorrect Milestone 1 (Hardcoded name) → FAIL",
    code: `print("=== SMART CALCULATOR ===")\nname = input("What is your name? ")\nprint("Welcome, Stranger!")`,
    expected: "FAIL",
  },
  {
    id: "matrix_c",
    milestoneId: "milestone-calc-2",
    label: "C. Correct Addition with int() → PASS",
    code: `name = input("Name: ")\nnum1 = int(input("First number: "))\nnum2 = int(input("Second number: "))\nprint("Addition result:", num1 + num2)`,
    expected: "PASS",
  },
  {
    id: "matrix_d",
    milestoneId: "milestone-calc-2",
    label: "D. Correct Addition with float() → PASS",
    code: `name = input("Name: ")\nnum1 = float(input("First number: "))\nnum2 = float(input("Second number: "))\nprint("Sum:", num1 + num2)`,
    expected: "PASS",
  },
  {
    id: "matrix_e",
    milestoneId: "milestone-calc-2",
    label: "E. String Concatenation Trap ('1020') → FAIL",
    code: `name = input("Name: ")\nnum1 = input("First number: ")\nnum2 = input("Second number: ")\nprint("Sum:", num1 + num2)`,
    expected: "FAIL",
  },
  {
    id: "matrix_f",
    milestoneId: "milestone-calc-2",
    label: "F. Custom Variable Names (x, y) → PASS",
    code: `_learner = input("Who is calculating? ")\nx = float(input("x = "))\ny = float(input("y = "))\ntotal_val = x + y\nprint(f"Total value is {total_val}")`,
    expected: "PASS",
  },
  {
    id: "matrix_g",
    milestoneId: "milestone-calc-2",
    label: "G. Alternative Code Structure → PASS",
    code: `def calculate():\n    name = input("Name: ")\n    a = float(input("A: "))\n    b = float(input("B: "))\n    return a + b\n\nprint("Result:", calculate())`,
    expected: "PASS",
  },
  {
    id: "matrix_h",
    milestoneId: "milestone-calc-2",
    label: "H. Wrong Arithmetic Result (Math Error) → FAIL",
    code: `name = input("Name: ")\na = float(input("A: "))\nb = float(input("B: "))\nprint("Sum:", (a + b) * 2)  # Wrong math`,
    expected: "FAIL",
  },
  {
    id: "matrix_i",
    milestoneId: "milestone-calc-2",
    label: "I. SyntaxError → EXECUTION_ERROR",
    code: `name = input("Name: ")\nnum1 = float(input("Enter: ")\nprint(num1)`,
    expected: "EXECUTION_ERROR",
  },
  {
    id: "matrix_j",
    milestoneId: "milestone-calc-2",
    label: "J. NameError → EXECUTION_ERROR",
    code: `name = input("Name: ")\nprint(undefined_calc_variable)`,
    expected: "EXECUTION_ERROR",
  },
  {
    id: "matrix_k",
    milestoneId: "milestone-calc-2",
    label: "K. Infinite Loop → TIMED_OUT",
    code: `name = input("Name: ")\nwhile True:\n    pass`,
    expected: "TIMED_OUT",
  },
  {
    id: "matrix_l",
    milestoneId: "milestone-calc-4",
    label: "L. Correct Final Calculator (Receipt) → PASS",
    code: `name = input("What is your name? ")
num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))

print("==========================================")
print(f"        CALCULATION RECEIPT FOR {name.upper()}")
print("==========================================")
print(f"Addition (+)        : {num1 + num2}")
print(f"Subtraction (-)     : {num1 - num2}")
print(f"Multiplication (*)  : {num1 * num2}")
print(f"Exact Division (/)  : {num1 / num2}")
print(f"Floor Division (//) : {num1 // num2}")
print(f"Remainder (%)       : {num1 % num2}")
print(f"Exponentiation (**) : {num1 ** 2}")
print("==========================================")
print("Thank you for using Smart Calculator!")`,
    expected: "PASS",
  },
  {
    id: "matrix_m",
    milestoneId: "milestone-calc-4",
    label: "M. Valid Custom Calculator Layout → PASS",
    code: `n = input("User: ")
a = float(input("A: "))
b = float(input("B: "))

print(f"--- SUMMARY REPORT FOR {n} ---")
print("1. Add:", a + b)
print("2. Sub:", a - b)
print("3. Mul:", a * b)
print("4. Div:", a / b)
print("5. Floor:", a // b)
print("6. Mod:", a % b)
print("7. Sq:", a ** 2)
print("------------------------------")`,
    expected: "PASS",
  },
];

export default function PythonExecutionDevPage() {
  const [status, setStatus] = useState<ExecutionStatus>("idle");
  const [code, setCode] = useState(EXECUTION_PRESETS[0].code);
  const [selectedMilestone, setSelectedMilestone] = useState("milestone-calc-1");
  const [timeoutMs] = useState(8000);
  const [cleanEnv, setCleanEnv] = useState(true);

  // Runtime streams & events
  const [stdout, setStdout] = useState("");
  const [stderr, setStderr] = useState("");
  const [activePrompt, setActivePrompt] = useState<string | null>(null);
  const [stdinInput, setStdinInput] = useState("");
  const [lastError, setLastError] = useState<PythonRuntimeError | null>(null);

  // Validation state
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);

  // Performance telemetry
  const [lastRunDurationMs, setLastRunDurationMs] = useState<number | null>(null);

  const stdinInputRef = useRef<HTMLInputElement>(null);

  // Initialize Pyodide Web Worker provider lazily in state
  const [provider] = useState<ExecutionProvider | null>(() => {
    if (typeof window === "undefined") return null;
    return createExecutionProvider("pyodide", {
      workerScriptUrl: "/workers/pyodide-worker.js",
      defaultTimeoutMs: 8000,
    });
  });

  useEffect(() => {
    return () => {
      provider?.dispose();
    };
  }, [provider]);

  useEffect(() => {
    if (activePrompt && stdinInputRef.current) {
      stdinInputRef.current.focus();
    }
  }, [activePrompt]);

  const handleWarmup = async () => {
    if (!provider) return;
    setStatus("initializing");
    try {
      await provider.initialize();
      setStatus(provider.getStatus());
    } catch (err: unknown) {
      setStatus("error");
      setStderr((err as Error).message);
    }
  };

  const handleRunCode = async () => {
    if (!provider) return;

    setStdout("");
    setStderr("");
    setActivePrompt(null);
    setLastError(null);
    setValidationResult(null);

    const start = performance.now();
    setStatus("running");

    try {
      await provider.run(
        {
          code,
          timeoutMs,
          cleanEnvironment: cleanEnv,
        },
        (event) => {
          if (event.type === "stdout") {
            setStdout((prev) => prev + event.chunk);
          } else if (event.type === "stderr") {
            setStderr((prev) => prev + event.chunk);
          } else if (event.type === "waiting_for_input") {
            setActivePrompt(event.prompt || "input()");
            setStatus("waiting_for_input");
          } else if (event.type === "runtime_error") {
            setLastError(event.error);
          }
        }
      );

      setLastRunDurationMs(Math.round(performance.now() - start));
      setStatus(provider.getStatus());
    } catch (err: unknown) {
      setStatus("error");
      setStderr((err as Error).message);
    }
  };

  const handleCheckMilestone = async () => {
    if (!provider) return;

    setIsValidating(true);
    setValidationResult(null);
    setStdout("");
    setStderr("");

    try {
      const result = await validateMilestone(
        {
          projectId: "project-smart-calculator",
          milestoneId: selectedMilestone,
          files: { "calculator.py": code },
        },
        provider
      );

      setValidationResult(result);
    } catch (err: unknown) {
      setStderr((err as Error).message);
    } finally {
      setIsValidating(false);
      setStatus(provider.getStatus());
    }
  };

  const handleSendStdin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!provider || activePrompt === null) return;

    const inputToSend = stdinInput;
    setStdinInput("");
    setActivePrompt(null);
    setStatus("running");

    try {
      await provider.provideStdin(inputToSend);
    } catch (err: unknown) {
      setStderr((err as Error).message);
    }
  };

  const handleStop = async () => {
    if (!provider) return;
    await provider.stop();
    setStatus(provider.getStatus());
  };

  const handleReset = async () => {
    if (!provider) return;
    await provider.reset();
    setStdout("");
    setStderr("");
    setActivePrompt(null);
    setLastError(null);
    setValidationResult(null);
    setStatus(provider.getStatus());
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-semibold border border-amber-500/30">
                Dev Harness
              </span>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Python Execution & Behavioral Validation
              </h1>
            </div>
            <p className="text-sm text-neutral-400 mt-1">
              Step 9: Interactive Web Worker runtime with automated stdin fixture validation for Module 1.
            </p>
          </div>

          {/* Runtime Status Pill */}
          <div className="flex items-center gap-3 bg-neutral-900 px-4 py-2 rounded-xl border border-neutral-800">
            <span className="text-xs text-neutral-400">Worker Status:</span>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                status === "ready"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : status === "running"
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 animate-pulse"
                  : status === "waiting_for_input"
                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-bounce"
                  : status === "initializing"
                  ? "bg-purple-500/20 text-purple-400 border border-purple-500/30 animate-pulse"
                  : status === "error"
                  ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                  : "bg-neutral-800 text-neutral-400"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  status === "ready"
                    ? "bg-emerald-400"
                    : status === "running"
                    ? "bg-blue-400"
                    : status === "waiting_for_input"
                    ? "bg-amber-400"
                    : status === "initializing"
                    ? "bg-purple-400"
                    : status === "error"
                    ? "bg-rose-400"
                    : "bg-neutral-500"
                }`}
              />
              {status}
            </span>
          </div>
        </div>

        {/* Validation Matrix Presets Bar */}
        <div className="space-y-2 bg-neutral-900/60 p-4 rounded-xl border border-neutral-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Manual Validation Matrix Presets (A through M)
            </span>
            <span className="text-xs text-neutral-500">1-Click Test Scenarios</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {VALIDATION_MATRIX_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  setCode(preset.code);
                  setSelectedMilestone(preset.milestoneId);
                  setValidationResult(null);
                }}
                className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all ${
                  code === preset.code
                    ? "bg-amber-500/20 border-amber-500/50 text-amber-300 font-medium"
                    : "bg-neutral-800/80 border-neutral-700/60 hover:bg-neutral-700/80 text-neutral-300"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: Code Editor & Execution/Validation Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Code Editor & Controls (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Standard Presets & Settings */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-neutral-400 mr-1">Code Presets:</span>
                {EXECUTION_PRESETS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setCode(p.code);
                      setValidationResult(null);
                    }}
                    className={`text-xs px-2.5 py-1 rounded-md border transition-all ${
                      code === p.code
                        ? "bg-indigo-600/30 border-indigo-500/60 text-indigo-200"
                        : "bg-neutral-900 border-neutral-800 hover:bg-neutral-800 text-neutral-400"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Editor Container */}
            <div className="relative rounded-xl border border-neutral-800 bg-neutral-900/90 overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 bg-neutral-950/50">
                <span className="text-xs font-mono text-neutral-400">calculator.py</span>
                <div className="flex items-center gap-3 text-xs text-neutral-400">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cleanEnv}
                      onChange={(e) => setCleanEnv(e.target.checked)}
                      className="rounded bg-neutral-800 border-neutral-700 text-indigo-600"
                    />
                    <span>Isolated Globals</span>
                  </label>
                  <span>Timeout: {timeoutMs / 1000}s</span>
                </div>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={14}
                className="w-full bg-transparent p-4 font-mono text-sm text-neutral-200 resize-none focus:outline-none focus:ring-0 leading-relaxed"
                placeholder="# Write Python code here..."
                spellCheck={false}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Check Milestone Button */}
              <div className="flex items-center gap-2 bg-neutral-900 p-1.5 rounded-xl border border-neutral-800">
                <select
                  value={selectedMilestone}
                  onChange={(e) => setSelectedMilestone(e.target.value)}
                  className="bg-neutral-950 border border-neutral-700 text-xs text-neutral-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500"
                >
                  <option value="milestone-calc-1">Milestone 1: Welcome & Input</option>
                  <option value="milestone-calc-2">Milestone 2: Addition Engine</option>
                  <option value="milestone-calc-3">Milestone 3: 7 Operations</option>
                  <option value="milestone-calc-4">Milestone 4: Receipt Format</option>
                </select>

                <button
                  onClick={handleCheckMilestone}
                  disabled={isValidating || status === "running" || status === "waiting_for_input"}
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 text-sm font-bold shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
                >
                  {isValidating ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                      Checking...
                    </>
                  ) : (
                    <>✓ Check Milestone</>
                  )}
                </button>
              </div>

              {/* Standard Interactive Run Code */}
              <button
                onClick={handleRunCode}
                disabled={status === "running" || status === "waiting_for_input" || isValidating}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-semibold shadow-lg shadow-indigo-600/20 transition-all"
              >
                Run Code
              </button>

              <button
                onClick={handleStop}
                disabled={status !== "running" && status !== "waiting_for_input"}
                className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white text-sm font-semibold transition-all"
              >
                Stop
              </button>

              <button
                onClick={handleReset}
                className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-sm transition-all"
              >
                Reset
              </button>

              <button
                onClick={handleWarmup}
                disabled={status === "ready" || status === "running"}
                className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-neutral-300 text-sm transition-all"
              >
                Warm Up Pyodide
              </button>
            </div>
          </div>

          {/* Right Column: Terminal & Validation Inspection (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Validation Result Inspection Card (Shown when validation runs) */}
            {validationResult && (
              <div
                className={`p-4 rounded-xl border transition-all ${
                  validationResult.status === "passed"
                    ? "bg-emerald-950/40 border-emerald-500/40"
                    : validationResult.status === "timed_out"
                    ? "bg-orange-950/40 border-orange-500/40"
                    : validationResult.status === "execution_error"
                    ? "bg-purple-950/40 border-purple-500/40"
                    : "bg-rose-950/40 border-rose-500/40"
                }`}
              >
                <div className="flex items-center justify-between border-b pb-3 mb-3 border-neutral-800">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase ${
                        validationResult.status === "passed"
                          ? "bg-emerald-500 text-emerald-950"
                          : validationResult.status === "timed_out"
                          ? "bg-orange-500 text-orange-950"
                          : validationResult.status === "execution_error"
                          ? "bg-purple-500 text-purple-950"
                          : "bg-rose-500 text-rose-950"
                      }`}
                    >
                      {validationResult.status}
                    </span>
                    <span className="text-xs font-semibold text-neutral-200">
                      {validationResult.passedChecks} / {validationResult.totalChecks} Checks Passed
                    </span>
                  </div>
                  <span className="text-xs text-neutral-400 font-mono">
                    {validationResult.durationMs}ms
                  </span>
                </div>

                {/* Criteria / Test Cases List */}
                <div className="space-y-2.5">
                  {validationResult.testCaseResults.map((tc, idx) => (
                    <div
                      key={tc.testCaseId || idx}
                      className="text-xs bg-neutral-900/80 p-2.5 rounded-lg border border-neutral-800/80 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-neutral-200">
                          {tc.passed ? "✅" : "❌"} {tc.name}
                        </span>
                        <span className="text-neutral-500 font-mono">{tc.durationMs}ms</span>
                      </div>
                      {tc.learnerFeedback && (
                        <p className="text-amber-300/90 pl-5 text-[11px] leading-relaxed">
                          ⚠️ {tc.learnerFeedback}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Terminal */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden shadow-2xl flex flex-col h-[340px]">
              <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 bg-neutral-900/50">
                <span className="text-xs font-mono text-neutral-400">Terminal (Interactive)</span>
                {lastRunDurationMs !== null && (
                  <span className="text-xs font-mono text-emerald-400">
                    Execution: {lastRunDurationMs}ms
                  </span>
                )}
              </div>

              {/* Stdout Output Area */}
              <div className="flex-1 p-4 font-mono text-xs text-neutral-200 overflow-y-auto whitespace-pre-wrap leading-relaxed space-y-2">
                {stdout ? stdout : <span className="text-neutral-600 italic">No output yet.</span>}

                {/* Stderr display */}
                {stderr && <div className="text-rose-400 whitespace-pre-wrap">{stderr}</div>}

                {/* Interactive Stdin Prompt & Input */}
                {activePrompt !== null && (
                  <form
                    onSubmit={handleSendStdin}
                    className="flex items-center gap-2 mt-2 pt-2 border-t border-neutral-800 bg-amber-500/10 p-2 rounded-lg"
                  >
                    <span className="text-amber-400 font-bold">{activePrompt || "> "}</span>
                    <input
                      ref={stdinInputRef}
                      type="text"
                      value={stdinInput}
                      onChange={(e) => setStdinInput(e.target.value)}
                      placeholder="Type input and press Enter..."
                      className="flex-1 bg-neutral-900 border border-neutral-700 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                    <button
                      type="submit"
                      className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold rounded text-xs"
                    >
                      Send
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Structured Python Error Card */}
            {lastError && (
              <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/40 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-rose-400 font-bold">
                  <span>Python Error: {lastError.name}</span>
                  {lastError.line && <span>Line: {lastError.line}</span>}
                </div>
                <p className="text-rose-200/90">{lastError.message}</p>
                {lastError.traceback && (
                  <pre className="text-[10px] text-neutral-400 bg-neutral-950/80 p-2 rounded border border-neutral-800 overflow-x-auto whitespace-pre-wrap">
                    {lastError.traceback}
                  </pre>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
