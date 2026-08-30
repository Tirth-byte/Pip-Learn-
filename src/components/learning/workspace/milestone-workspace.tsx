"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Play,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  HelpCircle,
  FileCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PythonEditor } from "@/components/editor/python-editor";
import {
  createExecutionProvider,
  ExecutionProvider,
  ExecutionStatus,
  PythonRuntimeError,
} from "@/execution";
import { validateMilestone, ValidationResult } from "@/validation";
import { smartCalculatorMilestones } from "@/curriculum/milestones/smart-calculator";
import {
  initializeLearnerProject,
  completeMilestone,
  updateProjectFile,
} from "@/learning-state/transitions";
import { LocalLearnerStorageAdapter } from "@/learning-state/persistence/local-storage";
import { LearnerProjectState } from "@/learning-state/types";
import { getAssetPath } from "@/lib/asset-path";

interface MilestoneWorkspaceProps {
  onBackToPrimer: () => void;
  onMilestoneCompletedChange?: (completed: boolean) => void;
}

export function MilestoneWorkspace({
  onBackToPrimer,
  onMilestoneCompletedChange,
}: MilestoneWorkspaceProps) {
  const milestone = smartCalculatorMilestones[0];
  const [storage] = useState(() => new LocalLearnerStorageAdapter());

  // Learner State
  const [projectState, setProjectState] = useState<LearnerProjectState | null>(() => {
    if (typeof window === "undefined") return null;
    let state = storage.loadProjectState("project-smart-calculator");
    if (!state) {
      state = initializeLearnerProject("project-smart-calculator");
      storage.saveProjectState(state);
    }
    return state;
  });

  const [code, setCode] = useState<string>(() => {
    if (typeof window === "undefined") return milestone.starterFiles?.["calculator.py"] || "";
    const state = storage.loadProjectState("project-smart-calculator");
    return state?.files["calculator.py"] || milestone.starterFiles?.["calculator.py"] || "";
  });

  const [isSaved, setIsSaved] = useState(false);

  // Execution Provider & State
  const [status, setStatus] = useState<ExecutionStatus>("idle");
  const [stdout, setStdout] = useState("");
  const [stderr, setStderr] = useState("");
  const [activePrompt, setActivePrompt] = useState<string | null>(null);
  const [stdinInput, setStdinInput] = useState("");
  const [lastError, setLastError] = useState<PythonRuntimeError | null>(null);

  // Validation State
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isMilestonePassed, setIsMilestonePassed] = useState(() => {
    if (typeof window === "undefined") return false;
    const state = storage.loadProjectState("project-smart-calculator");
    const passed = state?.milestoneStates[milestone.id]?.status === "completed";
    return Boolean(passed);
  });

  // UI view toggles
  const [showPrimerRef, setShowPrimerRef] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState<"editor" | "terminal" | "instructions">("editor");

  const stdinInputRef = useRef<HTMLInputElement>(null);

  // Pyodide Web Worker Provider
  const [provider] = useState<ExecutionProvider | null>(() => {
    if (typeof window === "undefined") return null;
    return createExecutionProvider("pyodide", {
      workerScriptUrl: getAssetPath("/workers/pyodide-worker.js"),
      defaultTimeoutMs: 10000,
    });
  });

  // Notify parent if milestone 1 is already completed
  useEffect(() => {
    if (isMilestonePassed) {
      onMilestoneCompletedChange?.(true);
    }
  }, [isMilestonePassed, onMilestoneCompletedChange]);

  // Warm up Pyodide in background
  useEffect(() => {
    if (!provider) return;
    provider
      .initialize()
      .then(() => setStatus(provider.getStatus()))
      .catch((err) => {
        setStatus("error");
        setStderr((err as Error).message);
      });

    return () => {
      provider.dispose();
    };
  }, [provider]);

  // Auto-focus stdin when input() is requested
  useEffect(() => {
    if (activePrompt !== null && stdinInputRef.current) {
      stdinInputRef.current.focus();
    }
  }, [activePrompt]);

  // Debounced Autosave to Learner State Store
  const handleCodeChange = useCallback(
    (newCode: string) => {
      setCode(newCode);
      setIsSaved(false);

      if (projectState) {
        const updated = updateProjectFile(projectState, "calculator.py", newCode);
        setProjectState(updated);
        storage.saveProjectState(updated);
        setIsSaved(true);
      }
    },
    [projectState, storage]
  );

  // Run Code (Primary interactive exploration action)
  const handleRunCode = async () => {
    if (!provider) return;

    setStdout("");
    setStderr("");
    setActivePrompt(null);
    setLastError(null);
    setValidationResult(null);
    setActiveMobileTab("terminal");
    setStatus("running");

    try {
      await provider.run(
        {
          code,
          timeoutMs: 10000,
          cleanEnvironment: true,
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
      setStatus(provider.getStatus());
    } catch (err: unknown) {
      setStatus("error");
      setStderr((err as Error).message);
    }
  };

  // Send Stdin to Interactive Input()
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

  // Check Milestone (Secondary validation action)
  const handleCheckMilestone = async () => {
    if (!provider || !projectState) return;

    setIsValidating(true);
    setValidationResult(null);
    setStdout("");
    setStderr("");
    setActiveMobileTab("terminal");

    try {
      const result = await validateMilestone(
        {
          projectId: "project-smart-calculator",
          milestoneId: milestone.id,
          files: { "calculator.py": code },
        },
        provider
      );

      setValidationResult(result);

      if (result.passed) {
        // Transition learner milestone state to completed
        const { state: updatedState } = completeMilestone(projectState, milestone.id);
        setProjectState(updatedState);
        storage.saveProjectState(updatedState);
        setIsMilestonePassed(true);
        onMilestoneCompletedChange?.(true);
      }
    } catch (err: unknown) {
      setStderr((err as Error).message);
    } finally {
      setIsValidating(false);
      setStatus(provider.getStatus());
    }
  };

  // Reset to Starter Template
  const handleResetCode = () => {
    const starter = milestone.starterFiles?.["calculator.py"] || "";
    handleCodeChange(starter);
    setStdout("");
    setStderr("");
    setActivePrompt(null);
    setLastError(null);
    setValidationResult(null);
  };

  return (
    <div className="space-y-4 max-w-6xl mx-auto py-1 select-none text-neutral-900 dark:text-neutral-100">
      {/* 1. Header & Status Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-neutral-200/70 dark:border-neutral-800/70 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066FF] bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full border border-blue-200/50 dark:border-blue-900/50">
              Milestone 1 of 4
            </span>
            <span className="text-xs text-neutral-400">Smart Calculator</span>
          </div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {milestone.title}
          </h1>
        </div>

        {/* Runtime Status & Quick Reference */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={() => setShowPrimerRef(!showPrimerRef)}
            className="flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white py-1 px-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <HelpCircle className="size-3.5 text-blue-500" />
            <span>Reference</span>
            {showPrimerRef ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
          </button>

          <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-900 px-2.5 py-1 rounded-lg border border-neutral-200/60 dark:border-neutral-800 text-xs">
            <span
              className={`size-2 rounded-full ${
                status === "ready"
                  ? "bg-emerald-500"
                  : status === "running" || status === "waiting_for_input"
                  ? "bg-blue-500 animate-ping"
                  : status === "initializing"
                  ? "bg-amber-500 animate-pulse"
                  : "bg-neutral-400"
              }`}
            />
            <span className="font-medium text-neutral-600 dark:text-neutral-400 text-[11px]">
              {status === "ready"
                ? "Python Ready"
                : status === "initializing"
                ? "Starting Python…"
                : status === "waiting_for_input"
                ? "Waiting for Input"
                : status === "running"
                ? "Running…"
                : "Python Ready"}
            </span>
          </div>
        </div>
      </div>

      {/* Collapsible Primer Reference */}
      {showPrimerRef && (
        <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#181818] space-y-2.5 animate-in fade-in duration-150">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-neutral-800 dark:text-neutral-200">
              Quick Syntax Reminder
            </span>
            <button
              onClick={onBackToPrimer}
              className="text-[11px] font-semibold text-[#0066FF] hover:underline cursor-pointer"
            >
              Open Full Primer →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            <div className="bg-white dark:bg-[#202022] p-2 rounded-lg border border-neutral-200/60 dark:border-neutral-800 text-[11px]">
              <span className="text-neutral-400 block font-sans text-[10px] mb-0.5">Print:</span>
              <span className="text-sky-400">print</span>(<span className="text-emerald-400">&quot;=== SMART CALCULATOR ===&quot;</span>)
            </div>
            <div className="bg-white dark:bg-[#202022] p-2 rounded-lg border border-neutral-200/60 dark:border-neutral-800 text-[11px]">
              <span className="text-neutral-400 block font-sans text-[10px] mb-0.5">Input &amp; variable:</span>
              name = <span className="text-sky-400">input</span>(<span className="text-emerald-400">&quot;What is your name? &quot;</span>)
            </div>
          </div>
        </div>
      )}

      {/* 2. Compact Milestone Brief & Checklist */}
      <div className="p-3 sm:p-3.5 rounded-xl bg-neutral-50/80 dark:bg-[#161618] border border-neutral-200/70 dark:border-neutral-800 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
            Milestone Goal
          </span>
          <span className="text-[11px] font-medium text-neutral-400">
            {isMilestonePassed ? "Completed ✓" : "Build & Run to test"}
          </span>
        </div>

        <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-normal">
          Print the calculator welcome header, prompt the user for their name, and greet them personally.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
          {milestone.criteria.map((c) => (
            <div
              key={c.id}
              className={`flex items-center gap-1.5 p-2 rounded-lg text-xs transition-colors ${
                isMilestonePassed
                  ? "bg-emerald-500/10 text-emerald-900 dark:text-emerald-300 font-medium"
                  : "bg-white dark:bg-[#1E1E20] border border-neutral-200/60 dark:border-neutral-800/80 text-neutral-600 dark:text-neutral-400"
              }`}
            >
              <CheckCircle2
                className={`size-3.5 shrink-0 ${
                  isMilestonePassed ? "text-emerald-500" : "text-neutral-300 dark:text-neutral-600"
                }`}
              />
              <span className="truncate text-[11px]">{c.description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="flex lg:hidden rounded-xl bg-neutral-100 dark:bg-neutral-900 p-1 border border-neutral-200/80 dark:border-neutral-800 text-xs font-semibold">
        <button
          onClick={() => setActiveMobileTab("editor")}
          className={`flex-1 py-1.5 rounded-lg transition-all ${
            activeMobileTab === "editor"
              ? "bg-white dark:bg-[#1C1C1E] text-neutral-900 dark:text-white shadow-xs font-bold"
              : "text-neutral-500"
          }`}
        >
          Code
        </button>
        <button
          onClick={() => setActiveMobileTab("terminal")}
          className={`flex-1 py-1.5 rounded-lg transition-all ${
            activeMobileTab === "terminal"
              ? "bg-white dark:bg-[#1C1C1E] text-neutral-900 dark:text-white shadow-xs font-bold"
              : "text-neutral-500"
          }`}
        >
          Terminal
        </button>
      </div>

      {/* 3. Main Split Workspace (Editor + Output) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Code Editor (7 Cols) */}
        <div className={`lg:col-span-7 space-y-3 ${activeMobileTab === "terminal" ? "hidden lg:block" : "block"}`}>
          {/* File Toolbar */}
          <div className="flex items-center justify-between px-0.5">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-md border border-neutral-200 dark:border-neutral-700">
                <FileCode className="size-3 text-[#0066FF]" />
                <span>calculator.py</span>
              </span>
              <span className="text-[11px] text-neutral-400">{isSaved ? "Saved" : "Saving…"}</span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetCode}
              className="h-6 px-2 text-[11px] text-neutral-400 hover:text-rose-500 cursor-pointer"
            >
              <RotateCcw className="size-3 mr-1" />
              <span>Reset Starter</span>
            </Button>
          </div>

          {/* Code Editor */}
          <PythonEditor
            value={code}
            onChange={handleCodeChange}
            onRun={handleRunCode}
            minHeight="360px"
            maxHeight="540px"
          />

          {/* Action Toolbar: RUN (Primary) & CHECK (Secondary) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2.5">
              {/* PRIMARY: Run Code Button */}
              <Button
                onClick={handleRunCode}
                disabled={status === "running" || status === "waiting_for_input" || isValidating}
                className="h-10 px-6 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 text-xs font-bold shadow-sm transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                <Play className="size-3.5 fill-current" />
                <span>Run Code</span>
              </Button>

              {/* SECONDARY: Check Milestone Button */}
              <Button
                variant="outline"
                onClick={handleCheckMilestone}
                disabled={isValidating || status === "running" || status === "waiting_for_input"}
                className="h-10 px-4 rounded-xl border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
              >
                {isValidating ? (
                  <>
                    <span className="size-3 border-2 border-neutral-700 dark:border-neutral-300 border-t-transparent rounded-full animate-spin" />
                    <span>Checking…</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="size-3.5 stroke-[2]" />
                    <span>Check Milestone</span>
                  </>
                )}
              </Button>
            </div>

            <span className="text-[11px] text-neutral-400 hidden sm:inline">
              <kbd className="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded border border-neutral-300 dark:border-neutral-700 font-mono text-[10px]">
                Cmd+Enter
              </kbd>{" "}
              to run
            </span>
          </div>
        </div>

        {/* Right Column: Terminal & Feedback (5 Cols) */}
        <div className={`lg:col-span-5 space-y-3 ${activeMobileTab === "editor" ? "hidden lg:block" : "block"}`}>
          {/* Milestone 1 Completion Card (Restrained & Honest) */}
          {isMilestonePassed && (
            <div className="p-3.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-500/40 text-emerald-950 dark:text-emerald-200 space-y-1.5 animate-in fade-in duration-200">
              <div className="flex items-center gap-1.5">
                <Sparkles className="size-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                  Milestone 1 Complete
                </span>
              </div>
              <p className="text-xs leading-relaxed">
                You made your Python program talk to the user and remember their input!
              </p>
              <div className="pt-1.5 border-t border-emerald-200/60 dark:border-emerald-900/60 flex items-center justify-between text-[11px] text-emerald-800 dark:text-emerald-400 font-medium">
                <span>Milestone 2 is in development</span>
                <span>Your code is saved</span>
              </div>
            </div>
          )}

          {/* Validation Feedback (Constructive & Calm) */}
          {validationResult && !validationResult.passed && (
            <div className="p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-500/40 text-amber-950 dark:text-amber-200 space-y-1.5 animate-in fade-in duration-200">
              <div className="flex items-center gap-1.5">
                <AlertCircle className="size-4 text-amber-600 dark:text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                  Almost there
                </span>
              </div>

              <div className="space-y-1 text-xs leading-relaxed">
                {validationResult.testCaseResults.map((tc) => (
                  <div key={tc.testCaseId}>
                    {!tc.passed && tc.learnerFeedback && (
                      <p className="text-amber-900 dark:text-amber-300 text-[11px]">
                        • {tc.learnerFeedback}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Terminal Window */}
          <div className="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-[#0F0F11] text-neutral-100 overflow-hidden shadow-sm flex flex-col h-[360px]">
            <div className="flex items-center justify-between px-3.5 py-2 bg-[#18181B] border-b border-neutral-800 text-xs">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <span className="size-2 rounded-full bg-[#FF5F56]" />
                  <span className="size-2 rounded-full bg-[#FFBD2E]" />
                  <span className="size-2 rounded-full bg-[#27C93F]" />
                </div>
                <span className="font-mono text-neutral-400 text-[11px] ml-1">Terminal Output</span>
              </div>
              <span className="text-[10px] text-neutral-500 font-mono">python3</span>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 p-3.5 font-mono text-xs text-neutral-200 overflow-y-auto whitespace-pre-wrap leading-relaxed space-y-2">
              {stdout ? (
                stdout
              ) : (
                <span className="text-neutral-600 italic">Click &apos;Run Code&apos; to execute your program.</span>
              )}
              {stderr && <div className="text-rose-400 font-mono text-xs">{stderr}</div>}

              {/* Calm Python Error Display */}
              {lastError && (
                <div className="mt-2 p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/30 text-xs space-y-1">
                  <div className="flex items-center justify-between text-rose-300 font-bold text-[11px]">
                    <span>Your program hit a Python error: {lastError.name}</span>
                    {lastError.line && <span>Line {lastError.line}</span>}
                  </div>
                  <p className="text-rose-200/80 text-[11px]">{lastError.message}</p>
                  {lastError.traceback && (
                    <pre className="text-[10px] text-neutral-400 bg-black/40 p-1.5 rounded border border-neutral-800 overflow-x-auto whitespace-pre-wrap">
                      {lastError.traceback}
                    </pre>
                  )}
                </div>
              )}

              {/* Interactive Stdin Input Form */}
              {activePrompt !== null && (
                <form
                  onSubmit={handleSendStdin}
                  className="flex items-center gap-2 mt-2 pt-2 border-t border-neutral-800 bg-amber-500/10 p-2 rounded-lg"
                >
                  <span className="text-amber-400 font-bold text-xs">{activePrompt || "> "}</span>
                  <input
                    ref={stdinInputRef}
                    type="text"
                    value={stdinInput}
                    onChange={(e) => setStdinInput(e.target.value)}
                    placeholder="Type response and press Enter…"
                    className="flex-1 bg-neutral-900 border border-neutral-700 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="h-6 px-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded"
                  >
                    Enter
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
