"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Lock, Sparkles, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PythonCoursePage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto py-6 px-4 select-none text-neutral-900 dark:text-neutral-100">
      {/* Header */}
      <div>
        <Link
          href="/courses"
          className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1.5 mb-5 w-fit transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Courses</span>
        </Link>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950/50 text-[#0066FF] border border-blue-200/60 dark:border-blue-900/60 mb-3">
          <Sparkles className="size-3" />
          <span>PYTHON PATH · LEVEL 1</span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-neutral-900 dark:text-white">
          Learn Python
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed max-w-2xl">
          Build real programs from your very first day. You'll learn core concepts by creating working projects step by step.
        </p>
      </div>

      {/* Curriculum Roadmap */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            Modules
          </h2>
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
            Unit 1 is ready to build
          </span>
        </div>

        <div className="space-y-3">
          {/* Active Unit 1: Python Fundamentals -> Smart Calculator */}
          <div className="p-5 sm:p-6 rounded-2xl border border-blue-300/80 dark:border-blue-900/60 bg-white dark:bg-[#1A1A1A] shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-neutral-400">Unit 1</span>
                  <span className="text-neutral-300 dark:text-neutral-700">•</span>
                  <span className="text-xs font-semibold text-[#0066FF] flex items-center gap-1">
                    <Terminal className="size-3" />
                    <span>Project: Smart Calculator</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                    Ready
                  </span>
                </div>

                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  Python Fundamentals
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed">
                  Teach your program to talk with users, manage variables in memory, and calculate arithmetic results by building a complete command-line calculator.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end shrink-0 pt-2 sm:pt-0">
                <span className="text-xs text-neutral-400">
                  4 Milestones
                </span>

                <Button asChild className="h-9 px-4 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white text-xs font-bold shadow-xs">
                  <Link href="/courses/python/basics" className="flex items-center gap-1.5">
                    <span>Start Building</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Neutral Future Modules Placeholder */}
          <div className="p-5 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50/50 dark:bg-[#151515] opacity-80 space-y-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-neutral-400">Units 2–8</span>
                  <span className="text-neutral-300 dark:text-neutral-700">•</span>
                  <span className="text-xs text-neutral-400">Upcoming Modules</span>
                </div>

                <h3 className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  More Python units in development
                </h3>

                <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xl leading-relaxed">
                  Upcoming modules will cover decisions and branching, reusable functions, and data structures.
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-xl shrink-0">
                <Lock className="size-3" />
                <span>In Development</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
