"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles, Terminal, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PythonCoursePage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-3xl mx-auto py-8 px-4 select-none text-neutral-900 dark:text-neutral-100">
      <div>
        <Link
          href="/courses"
          className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1.5 mb-6 w-fit transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Courses</span>
        </Link>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950/50 text-[#0066FF] border border-blue-200/60 dark:border-blue-900/60 mb-3">
          <span>FOUNDATION PATH</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-neutral-900 dark:text-white">
          Python Masterclass
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed max-w-2xl">
          The core Python learning path is being redesigned for project-first engineering and applied problem solving.
        </p>
      </div>

      <div className="p-8 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl bg-white dark:bg-[#1E1E1E] text-center space-y-5 shadow-2xs">
        <div className="size-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center mx-auto text-[#0066FF]">
          <Sparkles className="size-6 stroke-[1.75]" />
        </div>
        <div className="space-y-1.5 max-w-md mx-auto">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
            Curriculum Redesign in Progress
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
            The future Python curriculum will guide you through building real CLI utilities, web APIs, and algorithmic pipelines.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Button asChild className="h-9 px-4 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 text-xs font-bold shadow-xs">
            <Link href="/sandbox" className="flex items-center gap-1.5">
              <Terminal className="size-3.5" />
              <span>Open Sandbox</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-9 px-4 rounded-xl border-neutral-200 dark:border-neutral-700 text-xs font-bold">
            <Link href="/practice" className="flex items-center gap-1.5">
              <Target className="size-3.5" />
              <span>Practice Problems</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
