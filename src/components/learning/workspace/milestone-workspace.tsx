"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
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
  ArrowRight,
  X,
  Lock,
  Lightbulb,
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
  advanceToNextMilestone,
  updateProjectFile,
} from "@/learning-state/transitions";
import { LocalLearnerStorageAdapter } from "@/learning-state/persistence/local-storage";
import { LearnerProjectState } from "@/learning-state/types";
import { getAssetPath } from "@/lib/asset-path";
import { useAppContext } from "@/context/app-context";

interface MilestoneWorkspaceProps {
  onBackToPrimer: () => void;
  onMilestoneCompletedChange?: (completed: boolean, count: number) => void;
}

export function MilestoneWorkspace({
  onBackToPrimer,
  onMilestoneCompletedChange,
}: MilestoneWorkspaceProps) {
  const [storage] = useState(() => new LocalLearnerStorageAdapter());
  const { completeMilestoneReward } = useAppContext();

  // 1. Learner Project State
  const [projectState, setProjectState] = useState<LearnerProjectState | null>(() => {
    if (typeof window === "undefined") return null;
    let state = storage.loadProjectState("project-smart-calculator");
    if (!state) {
      state = initializeLearnerProject("project-smart-calculator");
      storage.saveProjectState(state);
    }
    return state;
  });

  // Active milestone ID (defaults to project's currentMilestoneId or M1)
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>(() => {
    if (typeof window === "undefined") return "milestone-calc-1";
    const state = storage.loadProjectState("project-smart-calculator");
    return state?.currentMilestoneId || "milestone-calc-1";
  });

  const milestone =
    smartCalculatorMilestones.find((m) => m.id === activeMilestoneId) ||
    smartCalculatorMilestones[0];

  // 2. Cumulative Code in calculator.py
  const [code, setCode] = useState<string>(() => {
    if (typeof window === "undefined") return milestone.starterFiles?.["calculator.py"] || "";
    const state = storage.loadProjectState("project-smart-calculator");
    return state?.files["calculator.py"] || milestone.starterFiles?.["calculator.py"] || "";
  });

  const [isSaved, setIsSaved] = useState(false);

  // 3. Execution Provider & State
  const [status, setStatus] = useState<ExecutionStatus>("idle");
  const [stdout, setStdout] = useState("");
  const [stderr, setStderr] = useState("");
  const [activePrompt, setActivePrompt] = useState<string | null>(null);
  const [stdinInput, setStdinInput] = useState("");
  const [lastError, setLastError] = useState<PythonRuntimeError | null>(null);

  // 4. Validation & Feedback State
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);

  // Status for current active milestone
  const isCurrentMilestonePassed =
    projectState?.milestoneStates[activeMilestoneId]?.status === "completed";

  // Total completed milestones count
  const completedCount = projectState
    ? Object.values(projectState.milestoneStates).filter((m) => m.status === "completed").length
    : 0;

  // 5. Gamification & Completion Flow State
  const [justAwardedXP, setJustAwardedXP] = useState<number | null>(null);
  const [showNextMilestoneModal, setShowNextMilestoneModal] = useState(false);

  // 6. UI View Toggles
  const [showPrimerRef, setShowPrimerRef] = useState(false);
  const [showTypeHelper, setShowTypeHelper] = useState(false);
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

  // Notify parent of milestone completions
  useEffect(() => {
    if (projectState) {
      const count = Object.values(projectState.milestoneStates).filter(
        (m) => m.status === "completed"
      ).length;
      onMilestoneCompletedChange?.(count > 0, count);
    }
  }, [projectState, onMilestoneCompletedChange]);

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

  // Auto-focus stdin input when prompt is active
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
        const { state: updatedState, isFirstCompletion } = completeMilestone(projectState, milestone.id);
        setProjectState(updatedState);
        storage.saveProjectState(updatedState);

        const newCompletedCount = Object.values(updatedState.milestoneStates).filter(
          (m) => m.status === "completed"
        ).length;
        onMilestoneCompletedChange?.(true, newCompletedCount);

        // Award XP strictly once via existing global state
        if (isFirstCompletion) {
          const awarded = completeMilestoneReward(milestone.id, 25);
          if (awarded) {
            setJustAwardedXP(25);
          }
        }
      }
    } catch (err: unknown) {
      setStderr((err as Error).message);
    } finally {
      setIsValidating(false);
      setStatus(provider.getStatus());
    }
  };

  // Advance from Milestone 1 to Milestone 2 (Preserving cumulative code)
  const handleAdvanceToNextMilestone = () => {
    if (!projectState) return;

    try {
      const updatedState = advanceToNextMilestone(projectState);
      setProjectState(updatedState);
      storage.saveProjectState(updatedState);

      setActiveMilestoneId("milestone-calc-2");
      setStdout("");
      setStderr("");
      setActivePrompt(null);
      setLastError(null);
      setValidationResult(null);
      setJustAwardedXP(null);
    } catch (err) {
      console.error("Failed to advance milestone:", err);
    }
  };

  // Switch between milestones
  const handleSelectMilestone = (mId: string) => {
    if (!projectState) return;

    // Check if target milestone is accessible (M1 is always accessible; M2 accessible if M1 is completed)
    if (mId === "milestone-calc-2") {
      const m1Completed = projectState.milestoneStates["milestone-calc-1"]?.status === "completed";
      if (!m1Completed) return;

      // If M2 was not started, advance to it
      if (projectState.milestoneStates["milestone-calc-2"]?.status === "not_started") {
        const updated = advanceToNextMilestone(projectState);
        setProjectState(updated);
        storage.saveProjectState(updated);
      }
    }

    setActiveMilestoneId(mId);
    setStdout("");
    setStderr("");
    setActivePrompt(null);
    setLastError(null);
    setValidationResult(null);
    setJustAwardedXP(null);
  };

  // Reset to Starter Template (for current milestone)
  const handleResetCode = () => {
    const starter = milestone.starterFiles?.["calculator.py"] || "";
    handleCodeChange(starter);
    setStdout("");
    setStderr("");
    setActivePrompt(null);
    setLastError(null);
    setValidationResult(null);
  };

  const isM1 = activeMilestoneId === "milestone-calc-1";
  const isM2 = activeMilestoneId === "milestone-calc-2";

  return (
    <div className="space-y-4 max-w-6xl mx-auto py-1 select-none text-neutral-900 dark:text-neutral-100">
      {/* 1. Header & Milestone Selector Bar */}
      <div className="space-y-2 border-b border-neutral-200/70 dark:border-neutral-800/70 pb-3">
        {/* Milestone Navigation Segment Control */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {smartCalculatorMilestones.map((m, idx) => {
            const mState = projectState?.milestoneStates[m.id];
            const isCompleted = mState?.status === "completed";
            const isActive = m.id === activeMilestoneId;
            const isAccessible =
              idx === 0 ||
              projectState?.milestoneStates[smartCalculatorMilestones[idx - 1].id]?.status === "completed";

            return (
              <button
                key={m.id}
                onClick={() => isAccessible && handleSelectMilestone(m.id)}
                disabled={!isAccessible}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? "bg-black dark:bg-white text-white dark:text-black font-bold shadow-xs"
                    : isCompleted
                    ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 font-semibold border border-emerald-200 dark:border-emerald-800/60"
                    : isAccessible
                    ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 font-medium"
                    : "bg-neutral-100/50 dark:bg-neutral-900/50 text-neutral-400 dark:text-neutral-600 opacity-60 cursor-not-allowed"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className={`size-3.5 ${isActive ? "text-emerald-300 dark:text-emerald-700 stroke-[2.5]" : "text-emerald-500 stroke-[2.2]"}`} />
                ) : !isAccessible ? (
                  <Lock className="size-3 text-neutral-400" />
                ) : (
                  <span className={`text-[11px] font-bold ${isActive ? "text-blue-300 dark:text-blue-700" : "text-neutral-500"}`}>{idx + 1}</span>
                )}
                <span>M{idx + 1}: {m.order === 1 ? "Welcome" : m.order === 2 ? "Addition Engine" : m.order === 3 ? "Math Suite" : "Receipt"}</span>
              </button>
            );
          })}
        </div>

        {/* Milestone Title & Runtime Status */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-1">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-300/60 dark:border-emerald-800/60">
                {completedCount} of 4 Milestones Complete
              </span>
              <span className="text-xs text-neutral-400">Smart Calculator</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Milestone {milestone.order}: {milestone.title}
            </h1>
          </div>

          {/* Quick Syntax Reference & Python Runtime Indicator */}
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
            Milestone {milestone.order} Objective
          </span>
          <span className="text-[11px] font-medium text-neutral-400">
            {isCurrentMilestonePassed ? "Completed ✓" : "Build & Run to test"}
          </span>
        </div>

        <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-normal">
          {milestone.objective}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
          {milestone.criteria.map((c) => (
            <div
              key={c.id}
              className={`flex items-center gap-1.5 p-2 rounded-lg text-xs transition-colors ${
                isCurrentMilestonePassed
                  ? "bg-emerald-500/10 text-emerald-900 dark:text-emerald-300 font-medium"
                  : "bg-white dark:bg-[#1E1E20] border border-neutral-200/60 dark:border-neutral-800/80 text-neutral-600 dark:text-neutral-400"
              }`}
            >
              <CheckCircle2
                className={`size-3.5 shrink-0 ${
                  isCurrentMilestonePassed ? "text-emerald-500 stroke-[2.2]" : "text-neutral-300 dark:text-neutral-600"
                }`}
              />
              <span className="truncate text-[11px]">{c.description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Milestone 2 Contextual Concept Helper: Strings vs Numbers */}
      {isM2 && (
        <div className="rounded-xl border border-amber-300/70 dark:border-amber-900/60 bg-amber-50/60 dark:bg-amber-950/20 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowTypeHelper(!showTypeHelper)}
              className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-300 hover:text-amber-950 dark:hover:text-amber-200 cursor-pointer"
            >
              <Lightbulb className="size-3.5 text-amber-600 dark:text-amber-400" />
              <span>Something surprising with 10 + 20? (Strings vs. Numbers)</span>
              {showTypeHelper ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
            </button>

            <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              Concept Note
            </span>
          </div>

          {showTypeHelper && (
            <div className="space-y-2 text-xs text-amber-950 dark:text-amber-200/90 pt-1 border-t border-amber-200 dark:border-amber-900/50 leading-relaxed animate-in fade-in duration-150">
              <p>
                In Python, <code className="font-mono bg-amber-100 dark:bg-amber-900/60 px-1 py-0.5 rounded">input()</code> always returns <strong>text (a string)</strong>, even when the user types digits.
              </p>
              <p>
                When you use <code className="font-mono bg-amber-100 dark:bg-amber-900/60 px-1 py-0.5 rounded">+</code> between two strings, Python glues them together (<code className="font-mono bg-amber-100 dark:bg-amber-900/60 px-1 py-0.5 rounded">&quot;10&quot; + &quot;20&quot; = &quot;1020&quot;</code>).
              </p>
              <p>
                To perform real arithmetic, convert the text into numbers:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px] pt-0.5">
                <div className="p-2 rounded-lg bg-white dark:bg-[#1C1C1E] border border-amber-200 dark:border-amber-900/60">
                  <span className="font-sans font-bold text-neutral-500 block text-[10px] mb-0.5">Whole numbers:</span>
                  num = <span className="text-sky-500">int</span>(<span className="text-emerald-500">&quot;10&quot;</span>)
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-[#1C1C1E] border border-amber-200 dark:border-amber-900/60">
                  <span className="font-sans font-bold text-neutral-500 block text-[10px] mb-0.5">Numbers with decimals:</span>
                  num = <span className="text-sky-500">float</span>(<span className="text-emerald-500">&quot;10.5&quot;</span>)
                </div>
              </div>
            </div>
          )}
        </div>
      )}

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
          Terminal &amp; Status
        </button>
      </div>

      {/* 4. Main Split Workspace (Editor + Output) */}
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
              <span>Reset Template</span>
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
          {/* Milestone Completion Card */}
          {isCurrentMilestonePassed && (
            <div className="p-4 rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-500/40 text-emerald-950 dark:text-emerald-200 space-y-3 animate-in fade-in duration-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                    Milestone {milestone.order} Complete
                  </span>
                </div>

                {justAwardedXP !== null ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-200/80 dark:bg-emerald-900/80 text-emerald-900 dark:text-emerald-100 border border-emerald-300 dark:border-emerald-700 shadow-2xs">
                    <Sparkles className="size-3 text-emerald-600 dark:text-emerald-300" />
                    <span>+{justAwardedXP} XP</span>
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-900/40 px-2 py-0.5 rounded-full">
                    +25 XP earned
                  </span>
                )}
              </div>

              <p className="text-xs leading-relaxed text-emerald-900 dark:text-emerald-200">
                {isM1
                  ? "You taught your calculator to interact with its user! It captures their name and greets them personally."
                  : "Your calculator now treats user input as numbers and can perform real addition."}
              </p>

              <div className="pt-2 border-t border-emerald-200/70 dark:border-emerald-900/60 flex items-center justify-between text-[11px] text-emerald-800 dark:text-emerald-400 font-medium">
                <span>{completedCount} of 4 milestones complete</span>
                <span>Work saved</span>
              </div>

              {/* Action CTAs */}
              <div className="flex items-center gap-2 pt-1">
                {isM1 ? (
                  <Button
                    onClick={handleAdvanceToNextMilestone}
                    className="h-9 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 flex-1 justify-center cursor-pointer"
                  >
                    <span>Continue to Milestone 2</span>
                    <ArrowRight className="size-3.5" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => setShowNextMilestoneModal(true)}
                    className="h-9 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 flex-1 justify-center cursor-pointer"
                  >
                    <span>Next Milestone</span>
                    <ArrowRight className="size-3.5" />
                  </Button>
                )}

                <Button
                  variant="outline"
                  onClick={() => setActiveMobileTab("editor")}
                  className="h-9 px-3 rounded-xl border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100/50 dark:hover:bg-emerald-900/40 text-emerald-900 dark:text-emerald-200 text-xs font-medium cursor-pointer"
                >
                  <span>Review code</span>
                </Button>
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
                    className="h-6 px-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded cursor-pointer"
                  >
                    Enter
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Honest In-Development Dialog for Milestone 3 */}
      {showNextMilestoneModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div className="bg-white dark:bg-[#1E1E20] border border-neutral-200 dark:border-neutral-800 p-6 rounded-2xl max-w-md w-full space-y-4 shadow-2xl animate-in zoom-in-95 duration-150 text-neutral-900 dark:text-neutral-100 relative">
            <button
              onClick={() => setShowNextMilestoneModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="size-4" />
            </button>

            <div className="size-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="size-6 stroke-[2.2]" />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-neutral-400">Smart Calculator</span>
                <span className="text-neutral-300 dark:text-neutral-700">•</span>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">2 of 4 Complete</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Milestone 3 is in development
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                You&apos;ve completed Milestone 2! The next build step (Multi-Operator Arithmetic Suite with subtraction, multiplication, division, modulo, and powers) is being prepared. Your code and progress have been saved safely.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <Button
                variant="outline"
                onClick={() => setShowNextMilestoneModal(false)}
                className="w-full sm:w-auto h-9 px-4 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Review Calculator Code
              </Button>

              <Button
                asChild
                className="w-full sm:w-auto h-9 px-4 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 text-xs font-bold cursor-pointer"
              >
                <Link href="/courses/python">
                  <span>Return to Python Path</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
