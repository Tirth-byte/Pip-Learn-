"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Flame,
  Trophy,
  Sparkles,
  GraduationCap,
  Calendar,
  Code2,
  Terminal,
  Target,
  Layers
} from "lucide-react";
import { useAppContext } from "@/context/app-context";
import { getInstitutionById } from "@/lib/institutions";
import { InstitutionLogo } from "@/components/institutions/institution-logo";

export default function HomePage() {
  const { user, progress } = useAppContext();
  const currentInstitution = getInstitutionById(user.institutionId);

  // Dynamic date formatting
  const todayFormatted = useMemo(() => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  }, []);

  // 7-Day Weekly Streak Rhythm
  const weekDays = useMemo(() => {
    const days = ["M", "T", "W", "T", "F", "S", "S"];
    const todayIndex = (new Date().getDay() + 6) % 7; // Monday = 0
    return days.map((day, idx) => {
      const isPastOrToday = idx <= todayIndex;
      const isActive = isPastOrToday && (idx === todayIndex || idx >= todayIndex - Math.min(progress.streak, 6));
      const isToday = idx === todayIndex;
      return {
        label: day,
        isActive,
        isToday,
      };
    });
  }, [progress.streak]);

  return (
    <div className="max-w-4xl mx-auto w-full pb-16 px-4 sm:px-6 text-neutral-900 dark:text-neutral-100 select-none animate-in fade-in duration-300">
      
      {/* 1. GREETING & CONTEXT HEADER */}
      <header className="pt-6 pb-6 border-b border-neutral-100 dark:border-neutral-800/80 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
              <Calendar className="size-3.5" />
              <span>{todayFormatted}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Welcome back, {user.firstName || "Learner"}
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {progress.streak > 1 
                ? `You're on a ${progress.streak}-day streak. Ready for today's coding session?`
                : "Welcome to pip learn. Let's start coding in Python."}
            </p>
          </div>

          {/* Micro Affiliation / Streak Header Badges */}
          <div className="flex items-center gap-2 self-start sm:self-center">
            {currentInstitution ? (
              <Link
                href="/leaderboard"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors text-xs font-semibold text-neutral-700 dark:text-neutral-300"
              >
                <InstitutionLogo institution={currentInstitution} size="xs" />
                <span className="truncate max-w-[120px] sm:max-w-[160px]">{currentInstitution.shortName || currentInstitution.name}</span>
              </Link>
            ) : (
              <Link
                href="/settings"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors text-xs font-medium text-neutral-500 dark:text-neutral-400"
              >
                <GraduationCap className="size-3.5" />
                <span>Add Institution</span>
              </Link>
            )}

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/40 border border-orange-200/60 dark:border-orange-900/60 text-orange-700 dark:text-orange-300 text-xs font-bold">
              <Flame className="size-3.5 text-orange-500 fill-orange-500" />
              <span>{progress.streak}d</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. PRIMARY HERO: NEUTRAL LEARNING-FIRST STATE */}
      <section aria-labelledby="primary-action-heading" className="mb-10">
        <h2 id="primary-action-heading" className="sr-only">Learning Path</h2>

        <div className="relative rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#1E1E1E] p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] dark:shadow-none overflow-hidden">
          {/* Subtle brand ambient glow */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 size-48 rounded-full bg-gradient-to-br from-blue-500/10 to-indigo-500/0 blur-2xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-1">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold tracking-wide">
                <Sparkles className="size-3.5 text-[#0066FF]" />
                <span>PROJECT-FIRST LEARNING</span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                  Your new learning journey is being prepared
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1.5 leading-relaxed">
                  We are building a hands-on, build-to-learn curriculum centered around real-world Python engineering, applied problem solving, and portfolio-ready software.
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs text-neutral-400 dark:text-neutral-500 pt-1">
                <span className="flex items-center gap-1.5">
                  <Terminal className="size-3.5" />
                  <span>Interactive Python Sandbox ready</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Code2 className="size-3.5" />
                  <span>Practice challenges active</span>
                </span>
              </div>
            </div>

            {/* Direct Actions */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
              <Link
                href="/sandbox"
                className="h-12 px-7 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-100 font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-sm hover:shadow-md cursor-pointer group/btn"
              >
                <Terminal className="size-4" />
                <span>Open Sandbox</span>
                <ArrowRight className="size-4 group-hover/btn:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/practice"
                className="h-10 px-5 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 font-semibold text-xs text-neutral-800 dark:text-neutral-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Target className="size-3.5" />
                <span>Browse Practice Problems</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TODAY'S TARGET & WEEKLY MOMENTUM */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        
        {/* Daily Target */}
        <div className="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#1E1E1E] shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="size-4 text-[#0066FF] stroke-[2]" />
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">Daily Target</h3>
            </div>
            <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
              Active Session
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="w-full h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: "100%" }} />
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Maintain your daily habit by solving algorithms or testing scripts in the sandbox.
            </p>
          </div>
        </div>

        {/* Weekly Streak Rhythm */}
        <div className="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#1E1E1E] shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="size-4 text-orange-500 stroke-[2] fill-orange-500/20" />
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">Weekly Momentum</h3>
            </div>
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
              {progress.streak} Day Streak
            </span>
          </div>

          {/* 7-Day Dots */}
          <div className="flex items-center justify-between gap-1.5 pt-1">
            {weekDays.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
                <div
                  className={`size-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    d.isActive
                      ? "bg-orange-500 text-white shadow-xs"
                      : d.isToday
                      ? "border-2 border-dashed border-orange-400 text-neutral-700 dark:text-neutral-300 bg-orange-50/50 dark:bg-orange-950/20"
                      : "bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600"
                  }`}
                >
                  {d.isActive ? (
                    <Flame className="size-3.5 fill-current" />
                  ) : (
                    <span>{d.label}</span>
                  )}
                </div>
                <span className="text-[10px] font-semibold text-neutral-400 dark:text-neutral-500">
                  {d.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PRACTICE CHALLENGE & CAMPUS LEADERBOARD PREVIEW */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Quick Practice Problem */}
        <div className="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#1E1E1E] shadow-2xs flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
                <Code2 className="size-3.5" />
                <span>Daily Practice Challenge</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                +20 XP
              </span>
            </div>

            <h3 className="font-bold text-base text-neutral-900 dark:text-white">
              Two Sum Algorithm
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
              Find two numbers in an array that add up to a specific target sum using hash maps.
            </p>
          </div>

          <Link
            href="/practice"
            className="w-full h-9 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/80 text-xs font-bold text-neutral-900 dark:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Solve in Sandbox</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {/* Campus & Leaderboard Preview */}
        <div className="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#1E1E1E] shadow-2xs flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
                <Trophy className="size-3.5 text-amber-500" />
                <span>Leaderboard Standing</span>
              </span>
              <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                Rank #3
              </span>
            </div>

            {currentInstitution ? (
              <>
                <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
                  <span>{currentInstitution.name}</span>
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                  You are in the top 5% of learners at {currentInstitution.shortName || currentInstitution.name} this week.
                </p>
              </>
            ) : (
              <>
                <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                  Global Community
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                  Add your university to see how you rank with peers on campus.
                </p>
              </>
            )}
          </div>

          <Link
            href="/leaderboard"
            className="w-full h-9 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/80 text-xs font-bold text-neutral-900 dark:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>View Rankings</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

      </section>

    </div>
  );
}
