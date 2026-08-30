"use client";

import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Lock,
  Database,
  Layers,
  Network,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const UPCOMING_PATHS = [
  {
    id: "data-science",
    title: "Data Science",
    description: "Work with real datasets, analyze statistics, and visualize trends.",
    icon: Database,
    level: "Intermediate",
  },
  {
    id: "django",
    title: "Web Apps with Django",
    description: "Build complete web applications with databases, user logins, and APIs.",
    icon: Layers,
    level: "Intermediate",
  },
  {
    id: "algorithms",
    title: "Algorithms & Logic",
    description: "Tackle classic problem-solving patterns, recursion, and data structures.",
    icon: Code2,
    level: "Advanced",
  },
  {
    id: "fastapi",
    title: "FastAPI & Services",
    description: "Create fast, modern backend APIs and connected services in Python.",
    icon: Network,
    level: "Intermediate",
  },
];

export default function CoursesPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto py-6 px-4 select-none text-neutral-900 dark:text-neutral-100">
      {/* Header */}
      <div className="space-y-1.5 border-b border-neutral-100 dark:border-neutral-800/80 pb-5">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Learn by Building
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm">
          Pick a language or topic. You'll write real code and construct working projects step by step.
        </p>
      </div>

      {/* Featured Primary Track: Learn Python */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            Available Now
          </span>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            Unit 1: Smart Calculator is ready
          </span>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#1C1C1E] shadow-sm space-y-6 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-[#0066FF] border border-blue-200/60 dark:border-blue-900/60">
                <Sparkles className="size-3" />
                <span>START HERE</span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                  Learn Python
                </h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1.5 leading-relaxed">
                  Start from zero and learn Python by building real things. You'll begin with Python Fundamentals and create a friendly, interactive <strong>Smart Calculator</strong> from scratch.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 dark:text-neutral-500 pt-1">
                <span>Beginner friendly</span>
                <span>•</span>
                <span>In-browser code runner</span>
                <span>•</span>
                <span>No setup required</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
              <Button asChild className="h-10 px-5 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-100 text-xs font-bold shadow-xs">
                <Link href="/courses/python" className="flex items-center justify-center gap-2">
                  <span>Start Learning Python</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>

              <Button asChild variant="outline" className="h-10 px-5 rounded-xl border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                <Link href="/courses/python/basics" className="flex items-center justify-center gap-2">
                  <span>Open Smart Calculator</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Paths */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            More Paths Coming Soon
          </span>
          <span className="text-xs text-neutral-400">
            In development
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {UPCOMING_PATHS.map((path) => {
            const Icon = path.icon;
            return (
              <div
                key={path.id}
                className="p-5 rounded-2xl border border-neutral-200/70 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-[#181818]/60 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="size-8 rounded-lg bg-white dark:bg-[#222222] border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-300 shadow-2xs">
                    <Icon className="size-4" />
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-medium text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-800/80 px-2.5 py-0.5 rounded-full">
                    <Lock className="size-2.5" />
                    <span>Coming soon</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                    {path.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
                    {path.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs border-t border-neutral-200/40 dark:border-neutral-800/40">
                  <span className="text-neutral-400 text-[11px]">{path.level}</span>
                  <Link
                    href={`/courses/${path.id}`}
                    className="text-[11px] font-semibold text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
                  >
                    Details →
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
