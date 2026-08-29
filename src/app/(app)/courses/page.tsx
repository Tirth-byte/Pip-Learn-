"use client";

import Link from "next/link";
import {
  Sparkles,
  Terminal,
  Target,
  FolderGit2,
  ArrowRight,
  Code2,
  Layers,
  Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CoursesPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto py-8 px-4 select-none text-neutral-900 dark:text-neutral-100">
      {/* Page Header */}
      <div className="border-b border-neutral-100 dark:border-neutral-800 pb-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-1">
          Courses &amp; Learning Paths
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm">
          Master Python through applied software development, real algorithmic challenges, and hands-on projects.
        </p>
      </div>

      {/* Premium Empty / Rebuilding State */}
      <div className="rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#1E1E1E] p-8 sm:p-12 text-center space-y-6 shadow-2xs">
        <div className="size-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-900/80 flex items-center justify-center mx-auto shadow-xs">
          <Sparkles className="size-8 text-[#0066FF] stroke-[1.75]" />
        </div>

        <div className="space-y-2 max-w-md mx-auto">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950/50 text-[#0066FF] border border-blue-200/60 dark:border-blue-900/60">
            <span>PROJECT-FIRST CURRICULUM</span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Curriculum Redesign in Progress
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
            We are designing our project-first learning methodology. You will learn Python by building real tools, engineering APIs, and solving production-grade code challenges.
          </p>
        </div>

        {/* Feature Pillars Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 max-w-2xl mx-auto text-left">
          <div className="p-4 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#252525]/50 space-y-1.5">
            <div className="size-8 rounded-lg bg-white dark:bg-[#1E1E1E] border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-800 dark:text-neutral-200 shadow-2xs">
              <Layers className="size-4 text-[#0066FF]" />
            </div>
            <h3 className="text-xs font-bold text-neutral-900 dark:text-white">Build to Learn</h3>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-normal">
              Every concept is introduced in the context of building a real tool.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#252525]/50 space-y-1.5">
            <div className="size-8 rounded-lg bg-white dark:bg-[#1E1E1E] border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-800 dark:text-neutral-200 shadow-2xs">
              <Terminal className="size-4 text-emerald-600" />
            </div>
            <h3 className="text-xs font-bold text-neutral-900 dark:text-white">Instant Sandbox</h3>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-normal">
              Execute Python directly with real-time output and automated tests.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#252525]/50 space-y-1.5">
            <div className="size-8 rounded-lg bg-white dark:bg-[#1E1E1E] border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-800 dark:text-neutral-200 shadow-2xs">
              <Cpu className="size-4 text-purple-600" />
            </div>
            <h3 className="text-xs font-bold text-neutral-900 dark:text-white">Contextual AI</h3>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-normal">
              Get hints, logic explanations, and code reviews when you need help.
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button asChild className="h-10 px-5 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-100 text-xs font-bold shadow-xs cursor-pointer">
            <Link href="/sandbox" className="flex items-center gap-2">
              <Terminal className="size-4" />
              <span>Explore Sandbox</span>
            </Link>
          </Button>

          <Button asChild variant="outline" className="h-10 px-5 rounded-xl border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-xs font-bold text-neutral-800 dark:text-neutral-200 cursor-pointer">
            <Link href="/practice" className="flex items-center gap-2">
              <Target className="size-4" />
              <span>Practice Problems</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
