"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModuleStepper, LearningPhase } from "@/components/learning/module-stepper";
import { ModuleMission } from "@/components/learning/module-mission";
import { ModulePrimer } from "@/components/learning/module-primer";
import { MilestoneWorkspace } from "@/components/learning/workspace/milestone-workspace";

export function ModuleClient({ module }: { module: string }) {
  const normalized = (module || "").toLowerCase().trim();
  const isModule1 =
    normalized === "basics" ||
    normalized === "basic" ||
    normalized === "fundamentals" ||
    normalized === "python-fundamentals" ||
    normalized === "module-1" ||
    normalized === "1" ||
    normalized === "smart-calculator";

  const [phase, setPhase] = useState<LearningPhase>("mission");
  const [milestone1Completed, setMilestone1Completed] = useState(false);

  if (!isModule1) {
    const formattedTitle = module
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    return (
      <div className="space-y-8 animate-in fade-in duration-300 max-w-3xl mx-auto py-8 px-4 select-none text-neutral-900 dark:text-neutral-100">
        <div>
          <Link
            href="/courses/python"
            className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1.5 mb-6 w-fit transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Python Masterclass</span>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-900/60 mb-3">
            <span>UPCOMING CURRICULUM</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-neutral-900 dark:text-white">
            {formattedTitle}
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed max-w-2xl">
            This module is being restructured as part of the project-first curriculum.
          </p>
        </div>

        <div className="p-8 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl bg-white dark:bg-[#1E1E1E] text-center space-y-5 shadow-2xs">
          <div className="size-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center mx-auto text-[#0066FF]">
            <Sparkles className="size-6 stroke-[1.75]" />
          </div>
          <div className="space-y-1.5 max-w-md mx-auto">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
              Lessons Under Construction
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              We are preparing project-focused learning modules with automated tests and step-by-step code guidance. Module 1: Python Fundamentals is available now.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <Button asChild className="h-9 px-4 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white text-xs font-bold shadow-xs">
              <Link href="/courses/python/basics" className="flex items-center gap-1.5">
                <span>Start Module 1</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-9 px-4 rounded-xl border-neutral-200 dark:border-neutral-700 text-xs font-bold">
              <Link href="/courses/python" className="flex items-center gap-1.5">
                <ArrowLeft className="size-3.5" />
                <span>Return to Roadmap</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 space-y-6">
      {/* Top Stepper & Navigation */}
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-neutral-200/60 dark:border-neutral-800/60 pb-3">
        <Link
          href="/courses/python"
          className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <ArrowLeft className="size-3.5" />
          <span>Python Path</span>
        </Link>

        <ModuleStepper
          currentPhase={phase}
          onSelectPhase={setPhase}
          milestone1Completed={milestone1Completed}
        />

        <div className="hidden sm:block text-xs font-medium text-neutral-400">
          Module 1 · Unit 1
        </div>
      </div>

      {/* Phase 1: Mission */}
      {phase === "mission" && (
        <ModuleMission
          onContinue={() => setPhase("primer")}
          onSkipToBuild={() => setPhase("workspace")}
        />
      )}

      {/* Phase 2: Primer */}
      {phase === "primer" && (
        <ModulePrimer
          onStartBuilding={() => setPhase("workspace")}
          onBackToMission={() => setPhase("mission")}
        />
      )}

      {/* Phase 3: Milestone 1 Workspace */}
      {phase === "workspace" && (
        <MilestoneWorkspace
          onBackToPrimer={() => setPhase("primer")}
          onMilestoneCompletedChange={setMilestone1Completed}
        />
      )}
    </div>
  );
}
