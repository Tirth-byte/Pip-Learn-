"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Play,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Terminal,
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
  const [activeMobileTab, setActiveMobileTab] = useState<"editor" | "instructions" | "terminal">("editor");

  const stdinInputRef = useRef<HTMLInputElement>(null);

  // Pyodide Web Worker Provider
  const [provider] = useState<ExecutionProvider | null>(() => {
    if (typeof window === "undefined") return null;
    return createExecutionProvider("pyodide", {
      workerScriptUrl: "/workers/pyodide-worker.js",
      defaultTimeoutMs: 10000,
    });
  });

  // Notify parent if milestone 1 is already completed
  useEffect(() => {
    if (isMilestonePassed) {
      onMilestoneCompletedChange?.(true);
    }
  }, [isMilestonePassed, onMilestoneCompletedChange]);

  // 2. Warm up Pyodide in background
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

  // 3. Debounced Autosave to Learner State Store
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

  // 4. Run Code (Interactive Exploration — Does NOT mutate progress)
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

  // 5. Send Stdin to Interactive Input()
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

  // 6. Check Milestone (Behavioral Validation Engine)
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

  // 7. Reset to Starter Template
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
    <div className="space-y-6 max-w-6xl mx-auto py-2 select-none text-neutral-900 dark:text-neutral-100">
      {/* Workspace Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-neutral-200/80 dark:border-neutral-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066FF] bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-200/50 dark:border-blue-900/50">
              Milestone 1 of 4
            </span>
            <span className="text-xs text-neutral-400 font-medium">Smart Calculator</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {milestone.title}
          </h1>
        </div>

        {/* Runtime Status & Primer Helper */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={() => setShowPrimerRef(!showPrimerRef)}
            className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white py-1 px-2 rounded-lg border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800 transition-all"
          >
            <HelpCircle className="size-3.5 text-purple-500" />
            <span>Need Help?</span>
            {showPrimerRef ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
          </button>

          <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-900 px-3 py-1.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 text-xs">
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
            <span className="font-medium text-neutral-600 dark:text-neutral-300 text-[11px]">
              {status === "ready"
                ? "Python Ready"
                : status === "initializing"
                ? "Preparing Python…"
                : status === "waiting_for_input"
                ? "Waiting for Input"
                : status === "running"
                ? "Executing…"
                : "Python Ready"}
            </span>
          </div>
        </div>
      </div>

      {/* Collapsible Primer Reference Card */}
      {showPrimerRef && (
        <div className="p-4 rounded-2xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/50 dark:bg-purple-950/20 space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300">
              Quick Reference for Milestone 1
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToPrimer}
              className="h-6 px-2 text-[11px] text-purple-600 hover:text-purple-900 dark:text-purple-400"
            >
              Open Full Primer →
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-white dark:bg-[#1A1A1A] p-2.5 rounded-xl border border-purple-100 dark:border-purple-900/40">
              <span className="font-bold text-neutral-800 dark:text-neutral-200 block mb-1">Print to screen:</span>
              <code className="text-neutral-600 dark:text-neutral-300 font-mono text-[11px]">print(&quot;Welcome to Calculator&quot;)</code>
            </div>
            <div className="bg-white dark:bg-[#1A1A1A] p-2.5 rounded-xl border border-purple-100 dark:border-purple-900/40">
              <span className="font-bold text-neutral-800 dark:text-neutral-200 block mb-1">Ask for name:</span>
              <code className="text-neutral-600 dark:text-neutral-300 font-mono text-[11px]">name = input(&quot;Your name? &quot;)</code>
            </div>
          </div>
        </div>
      )}

      {/* Acceptance Criteria Cards */}
      <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#161616] border border-neutral-200/80 dark:border-neutral-800 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
            Milestone 1 Requirements
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {isMilestonePassed ? "All criteria satisfied" : "Test with 'Check Milestone'"}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1">
          {milestone.criteria.map((c) => (
            <div
              key={c.id}
              className={`flex items-start gap-2 p-2.5 rounded-xl border transition-all text-xs ${
                isMilestonePassed
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-300"
                  : "bg-white dark:bg-[#1E1E1E] border-neutral-200/80 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300"
              }`}
            >
              <CheckCircle2
                className={`size-4 mt-0.5 shrink-0 ${
                  isMilestonePassed ? "text-emerald-500" : "text-neutral-300 dark:text-neutral-600"
                }`}
              />
              <span className="leading-snug">{c.description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="flex lg:hidden rounded-xl bg-neutral-100 dark:bg-neutral-900 p-1 border border-neutral-200/80 dark:border-neutral-800 text-xs font-semibold">
        <button
          onClick={() => setActiveMobileTab("editor")}
          className={`flex-1 py-1.5 rounded-lg transition-all ${
            activeMobileTab === "editor" ? "bg-white dark:bg-[#1C1C1E] text-neutral-900 dark:text-white shadow-xs font-bold" : "text-neutral-500"
          }`}
        >
          Code Editor
        </button>
        <button
          onClick={() => setActiveMobileTab("terminal")}
          className={`flex-1 py-1.5 rounded-lg transition-all ${
            activeMobileTab === "terminal" ? "bg-white dark:bg-[#1C1C1E] text-neutral-900 dark:text-white shadow-xs font-bold" : "text-neutral-500"
          }`}
        >
          Terminal & Checks
        </button>
      </div>

      {/* Main Workspace Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Code Editor & Controls (7 Cols) */}
        <div className={`lg:col-span-7 space-y-3 ${activeMobileTab === "terminal" ? "hidden lg:block" : "block"}`}>
          {/* File Toolbar */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800/80 px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <FileCode className="size-3.5 text-[#0066FF]" />
                <span>calculator.py</span>
              </span>
              <span className="text-[11px] text-neutral-400">{isSaved ? "Saved" : "Saving…"}</span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetCode}
              className="h-7 px-2 text-xs text-neutral-400 hover:text-rose-500"
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
            minHeight="320px"
            maxHeight="520px"
          />

          {/* Action Execution Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Check Milestone Button */}
              <Button
                onClick={handleCheckMilestone}
                disabled={isValidating || status === "running" || status === "waiting_for_input"}
                className="h-10 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-extrabold shadow-sm transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isValidating ? (
                  <>
                    <span className="size-3.5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                    <span>Checking Milestone…</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="size-4 stroke-[2.5]" />
                    <span>Check Milestone</span>
                  </>
                )}
              </Button>

              {/* Interactive Run Code Button */}
              <Button
                onClick={handleRunCode}
                disabled={status === "running" || status === "waiting_for_input" || isValidating}
                className="h-10 px-4 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
              >
                <Play className="size-3.5 fill-current" />
                <span>Run</span>
              </Button>
            </div>

            <span className="text-[11px] text-neutral-400 hidden sm:inline">
              Press <kbd className="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded border border-neutral-300 dark:border-neutral-700 font-mono">Cmd+Enter</kbd> to run
            </span>
          </div>
        </div>

        {/* Right Column: Terminal & Validation Inspection (5 Cols) */}
        <div className={`lg:col-span-5 space-y-4 ${activeMobileTab === "editor" ? "hidden lg:block" : "block"}`}>
          {/* Milestone 1 Completion Celebration Moment */}
          {isMilestonePassed && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/40 text-emerald-950 dark:text-emerald-200 space-y-2 animate-in fade-in duration-300 shadow-sm">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                  Milestone 1 Complete
                </span>
              </div>
              <p className="text-xs leading-relaxed font-medium">
                You made your Python program interact with a real user! It captures their input and delivers a personalized greeting.
              </p>
              <div className="pt-2 border-t border-emerald-200 dark:border-emerald-900/60 flex items-center justify-between text-[11px] text-emerald-800 dark:text-emerald-400">
                <span>Milestone 2 (Addition Engine) coming in next slice</span>
                <span className="font-bold">1 / 4 Complete</span>
              </div>
            </div>
          )}

          {/* Validation Failure Feedback Card */}
          {validationResult && !validationResult.passed && (
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-500/40 text-rose-950 dark:text-rose-200 space-y-2.5 animate-in fade-in duration-200">
              <div className="flex items-center gap-2">
                <AlertCircle className="size-4 text-rose-600 dark:text-rose-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300">
                  Milestone Needs Adjustment
                </span>
              </div>

              <div className="space-y-1.5 text-xs leading-relaxed">
                {validationResult.testCaseResults.map((tc) => (
                  <div key={tc.testCaseId} className="space-y-0.5">
                    {!tc.passed && tc.learnerFeedback && (
                      <p className="text-rose-800 dark:text-rose-300 text-[11px]">
                        • {tc.learnerFeedback}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Terminal Panel */}
          <div className="rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-950 text-neutral-100 overflow-hidden shadow-xl flex flex-col h-[340px]">
            <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900 border-b border-neutral-800 text-xs">
              <div className="flex items-center gap-2">
                <Terminal className="size-3.5 text-neutral-400" />
                <span className="font-mono text-neutral-300 text-[11px]">Terminal Output</span>
              </div>
              <span className="text-[10px] text-neutral-500 font-mono">stdio</span>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 p-4 font-mono text-xs text-neutral-200 overflow-y-auto whitespace-pre-wrap leading-relaxed space-y-2">
              {stdout ? stdout : <span className="text-neutral-600 italic">Click &apos;Run&apos; to execute your program.</span>}
              {stderr && <div className="text-rose-400 font-mono text-xs">{stderr}</div>}

              {/* Real Python Error Display */}
              {lastError && (
                <div className="mt-3 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-rose-400 font-bold">
                    <span>Python Error: {lastError.name}</span>
                    {lastError.line && <span>Line {lastError.line}</span>}
                  </div>
                  <p className="text-rose-200/90">{lastError.message}</p>
                  {lastError.traceback && (
                    <pre className="text-[10px] text-neutral-400 bg-neutral-950/80 p-2 rounded border border-neutral-800 overflow-x-auto whitespace-pre-wrap">
                      {lastError.traceback}
                    </pre>
                  )}
                </div>
              )}

              {/* Interactive Stdin Input Form */}
              {activePrompt !== null && (
                <form
                  onSubmit={handleSendStdin}
                  className="flex items-center gap-2 mt-3 pt-3 border-t border-neutral-800 bg-amber-500/10 p-2 rounded-xl"
                >
                  <span className="text-amber-400 font-bold">{activePrompt || "> "}</span>
                  <input
                    ref={stdinInputRef}
                    type="text"
                    value={stdinInput}
                    onChange={(e) => setStdinInput(e.target.value)}
                    placeholder="Type response and press Enter…"
                    className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="h-7 px-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-lg"
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
