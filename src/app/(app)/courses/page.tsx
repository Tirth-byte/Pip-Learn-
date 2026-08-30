"use client";

import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Code2,
  Lock,
  Database,
  Layers,
  Network,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const UPCOMING_COURSES = [
  {
    id: "data-science",
    title: "Data Science & Analytics",
    description: "Data wrangling, statistical analysis, and interactive visualization with Pandas and NumPy.",
    icon: Database,
    level: "Intermediate",
    status: "upcoming",
  },
  {
    id: "django",
    title: "Full-Stack Django",
    description: "Production web development with models, views, templates, authentication, and REST APIs.",
    icon: Layers,
    level: "Intermediate",
    status: "upcoming",
  },
  {
    id: "algorithms",
    title: "Algorithms & Data Structures",
    description: "Core computer science algorithms, complexity analysis, trees, graphs, and dynamic programming.",
    icon: Code2,
    level: "Advanced",
    status: "upcoming",
  },
  {
    id: "fastapi",
    title: "FastAPI & Microservices",
    description: "High-performance asynchronous backend services with Pydantic validation and OpenAPI.",
    icon: Network,
    level: "Intermediate",
    status: "upcoming",
  },
];

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

      {/* 1. Featured Active Path: Python Masterclass */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Active Learning Path
          </h2>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="size-3.5" />
            <span>Unit 1 Ready to Build</span>
          </span>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl border-2 border-blue-500/80 dark:border-blue-600 bg-white dark:bg-[#1A1A1A] shadow-md space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 size-40 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-1">
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950/60 text-[#0066FF] border border-blue-200/60 dark:border-blue-900/60">
                  <Sparkles className="size-3" />
                  <span>PROJECT-FIRST CURRICULUM</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                  Active
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                  Python Masterclass
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                  Learn Python by building authentic software tools. Start with Unit 1: Python Fundamentals and construct a complete command-line <strong>Smart Calculator</strong> with real-time test validation.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400 pt-1">
                <span>4 Curriculum Units</span>
                <span>•</span>
                <span className="text-[#0066FF] font-semibold">Primary Project: Smart Calculator</span>
                <span>•</span>
                <span>Pyodide Web Worker Execution</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
              <Button asChild className="h-10 px-5 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white text-xs font-bold shadow-xs">
                <Link href="/courses/python" className="flex items-center justify-center gap-2">
                  <span>Explore Python Track</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>

              <Button asChild variant="outline" className="h-10 px-5 rounded-xl border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-xs font-bold text-neutral-800 dark:text-neutral-200">
                <Link href="/courses/python/basics" className="flex items-center justify-center gap-2">
                  <span>Start Unit 1 Project</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Upcoming Learning Paths */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Upcoming Learning Tracks
          </h2>
          <span className="text-xs text-neutral-400">
            Under Active Authoring
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {UPCOMING_COURSES.map((course) => {
            const Icon = course.icon;
            return (
              <div
                key={course.id}
                className="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#181818]/60 space-y-3 opacity-90 transition-all hover:opacity-100"
              >
                <div className="flex items-center justify-between">
                  <div className="size-9 rounded-xl bg-white dark:bg-[#222222] border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-300 shadow-2xs">
                    <Icon className="size-4.5" />
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-0.5 rounded-full">
                    <Lock className="size-2.5" />
                    <span>Under Construction</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                    {course.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
                    {course.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs border-t border-neutral-200/50 dark:border-neutral-800/50">
                  <span className="text-neutral-400 text-[11px] font-medium">{course.level}</span>
                  <Link
                    href={`/courses/${course.id}`}
                    className="text-[11px] font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                  >
                    View Status →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
