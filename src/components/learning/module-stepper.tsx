"use client";

import React from "react";
import { Compass, BookOpen, Hammer, CheckCircle2 } from "lucide-react";

export type LearningPhase = "mission" | "primer" | "workspace";

interface ModuleStepperProps {
  currentPhase: LearningPhase;
  onSelectPhase: (phase: LearningPhase) => void;
  milestone1Completed?: boolean;
}

export function ModuleStepper({
  currentPhase,
  onSelectPhase,
  milestone1Completed = false,
}: ModuleStepperProps) {
  const steps: { id: LearningPhase; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "mission", label: "Mission & Outcome", icon: Compass },
    { id: "primer", label: "Essential Primer", icon: BookOpen },
    { id: "workspace", label: "Build Milestone 1", icon: Hammer },
  ];

  return (
    <nav aria-label="Learning Progress Stepper" className="w-full">
      <div className="flex items-center justify-between gap-2 p-1.5 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 text-xs font-semibold max-w-xl mx-auto shadow-2xs">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = currentPhase === step.id;
          const isCompleted =
            (step.id === "mission" && currentPhase !== "mission") ||
            (step.id === "primer" && currentPhase === "workspace") ||
            (step.id === "workspace" && milestone1Completed);

          return (
            <button
              key={step.id}
              onClick={() => onSelectPhase(step.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl transition-all ${
                isActive
                  ? "bg-white dark:bg-[#1C1C1E] text-neutral-900 dark:text-white shadow-xs font-bold"
                  : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
              }`}
            >
              <span className="flex items-center gap-1.5">
                {isCompleted && !isActive ? (
                  <CheckCircle2 className="size-3.5 text-emerald-500 stroke-[2.2]" />
                ) : (
                  <Icon className={`size-3.5 ${isActive ? "text-[#0066FF]" : "text-neutral-400"}`} />
                )}
                <span className="hidden sm:inline">{step.label}</span>
                <span className="sm:hidden">{idx + 1}. {step.id}</span>
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
