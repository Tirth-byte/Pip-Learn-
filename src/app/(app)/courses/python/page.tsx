"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Lock, Terminal, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const MODULES = [
  {
    id: "basics",
    unit: 1,
    title: "Python Fundamentals",
    tagline: "Build a Smart Calculator from scratch using Python fundamentals.",
    project: "Smart Calculator",
    milestonesCount: 4,
    estimatedMinutes: 45,
    status: "active", // First real vertical slice is active!
  },
  {
    id: "control-flow",
    unit: 2,
    title: "Control Flow & Decision Logic",
    tagline: "Build an Adventure Game Engine using branching and conditional execution.",
    project: "Adventure Game Engine",
    milestonesCount: 4,
    estimatedMinutes: 55,
    status: "upcoming",
  },
  {
    id: "functions",
    unit: 3,
    title: "Functions & Modular Architecture",
    tagline: "Build a Personal Finance Analyzer using reusable functions.",
    project: "Finance Analyzer",
    milestonesCount: 4,
    estimatedMinutes: 60,
    status: "upcoming",
  },
  {
    id: "data-structures",
    unit: 4,
    title: "Data Structures & State",
    tagline: "Build an Inventory Management System using lists and dictionaries.",
    project: "Inventory Tracker",
    milestonesCount: 5,
    estimatedMinutes: 70,
    status: "upcoming",
  },
];

export default function PythonCoursePage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto py-8 px-4 select-none text-neutral-900 dark:text-neutral-100">
      {/* Header */}
      <div>
        <Link
          href="/courses"
          className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1.5 mb-6 w-fit transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Courses</span>
        </Link>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950/50 text-[#0066FF] border border-blue-200/60 dark:border-blue-900/60 mb-3">
          <Sparkles className="size-3" />
          <span>LEARNING PATH · LEVEL 1</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-neutral-900 dark:text-white">
          Python Masterclass
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed max-w-2xl">
          Project-first engineering curriculum. Learn Python by building authentic CLI utilities, algorithmic pipelines, and real applications.
        </p>
      </div>

      {/* Modules Roadmap */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Curriculum Units
          </h2>
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
            Unit 1 Ready to Build
          </span>
        </div>

        <div className="space-y-3">
          {MODULES.map((mod) => {
            const isActive = mod.status === "active";

            return (
              <div
                key={mod.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isActive
                    ? "bg-white dark:bg-[#1A1A1A] border-blue-300/80 dark:border-blue-900/60 shadow-sm hover:shadow-md"
                    : "bg-neutral-50/50 dark:bg-[#151515] border-neutral-200/60 dark:border-neutral-800/60 opacity-80"
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-neutral-500">Unit {mod.unit}</span>
                      <span className="text-neutral-300 dark:text-neutral-700">•</span>
                      <span className="text-xs font-semibold text-[#0066FF]">{mod.project}</span>
                      {isActive && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                          Active Slice
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed">
                      {mod.tagline}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end shrink-0 pt-2 sm:pt-0">
                    <span className="text-xs text-neutral-400">
                      {mod.milestonesCount} Milestones · ~{mod.estimatedMinutes}m
                    </span>

                    {isActive ? (
                      <Button asChild className="h-9 px-4 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white text-xs font-bold shadow-xs">
                        <Link href={`/courses/python/${mod.id}`} className="flex items-center gap-1.5">
                          <span>Start Project</span>
                          <ArrowRight className="size-3.5" />
                        </Link>
                      </Button>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-xl">
                        <Lock className="size-3" />
                        <span>Under Construction</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
