"use client";

import Link from "next/link";
import {
  Code2, Sparkles, Terminal, Layers, Target, ArrowRight,
  CheckCircle2, Bot, Flame, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#191919] text-[#37352F] dark:text-[rgba(255,255,255,0.85)] select-none">
      {/* 1. Hero Section */}
      <section className="pt-20 pb-16 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F7F5] dark:bg-[#252525] border border-[rgba(55,53,47,0.12)] dark:border-[rgba(255,255,255,0.12)] text-xs font-semibold text-[#37352F] dark:text-white mb-6 animate-in fade-in duration-300">
          <Sparkles className="size-3.5 text-[#0066FF]" />
          <span>The Connected Python Learning Workspace</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-6 leading-[1.12]">
          Everything you need to master Python. <br className="hidden sm:inline" />
          In one distraction-free environment.
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          PipLearn combines guided course curricula, an integrated interactive Python sandbox, contextual AI mentorship, and algorithm practice into a cohesive Notion-inspired platform.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-sm mx-auto">
          <Button asChild className="w-full sm:w-auto h-10 px-6 bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold text-xs rounded-xl shadow-sm">
            <Link href="/signup">
              Start Learning Free <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full sm:w-auto h-10 px-6 border-neutral-200 dark:border-[rgba(255,255,255,0.15)] bg-white dark:bg-[#252525] hover:bg-neutral-100 text-xs font-semibold rounded-xl text-neutral-700 dark:text-neutral-200">
            <Link href="/sandbox">
              <Terminal className="mr-2 size-3.5" /> Explore Sandbox
            </Link>
          </Button>
        </div>
      </section>

      {/* 2. Product Story Pillar 1: Structured Learning */}
      <section className="py-16 px-6 border-t border-neutral-100 dark:border-[rgba(255,255,255,0.08)] bg-[#FAFAFA] dark:bg-[#1E1E1E]/50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0066FF] uppercase tracking-wider">
              <Layers className="size-4" /> 01. Structured Curriculum
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Learn step-by-step with progressive modules.
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
              No more jumping between random video tutorials. Our curriculum is carefully organized from fundamental variables and control flow up to object-oriented patterns, async concurrency, FastAPI, and data science.
            </p>
            <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                <span>15 structured modules in the Python Masterclass</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                <span>Specialized tracks for FastAPI, Data Science, Machine Learning, and DevOps</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                <span>Interactive quizzes reinforcing core concepts after each lesson</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-[rgba(255,255,255,0.12)] bg-white dark:bg-[#202020] shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-500 border-b border-neutral-100 dark:border-white/5 pb-3">
              <span>Python Masterclass Syllabus</span>
              <span className="notion-tag notion-tag-green">Core Track</span>
            </div>
            {[
              { id: "01", title: "Variables & Primitive Types", status: "Completed", count: "5 Lessons" },
              { id: "02", title: "Lists, Tuples & Dictionaries", status: "Completed", count: "6 Lessons" },
              { id: "03", title: "Control Flow & Iteration", status: "In Progress", count: "6 Lessons" },
              { id: "04", title: "Functions & Scope Rules", status: "Up Next", count: "5 Lessons" },
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-[#F7F7F5] dark:bg-[#252525] text-xs">
                <div className="flex items-center gap-2.5 font-medium text-neutral-800 dark:text-neutral-200">
                  <span className="font-mono text-neutral-400">{item.id}</span>
                  <span>{item.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-neutral-400 font-mono hidden sm:inline">{item.count}</span>
                  <span className={`notion-tag ${
                    item.status === "Completed" ? "notion-tag-green" :
                    item.status === "In Progress" ? "notion-tag-yellow" : "notion-tag-gray"
                  }`}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Product Story Pillar 2: Interactive Sandbox & Code Runner */}
      <section className="py-16 px-6 border-t border-neutral-100 dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-[#191919]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 p-5 rounded-2xl border border-neutral-200 dark:border-[rgba(255,255,255,0.12)] bg-[#1E1E1E] text-white shadow-sm font-mono text-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-neutral-400 text-[11px]">
              <div className="flex items-center gap-1.5">
                <Code2 className="size-3.5 text-blue-400" />
                <span>two_sum.py</span>
              </div>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="size-3" /> All Tests Passed
              </span>
            </div>
            <pre className="text-neutral-300 leading-5 text-[11px] overflow-x-auto">
              <code>{`def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []`}</code>
            </pre>
            <div className="pt-2 border-t border-white/10 space-y-1 text-[11px] text-neutral-400 font-sans">
              <div className="flex justify-between font-mono text-[10px]">
                <span className="text-neutral-500">&gt; Test 1: nums=[2,7,11,15], target=9</span>
                <span className="text-emerald-400">Output: [0, 1] ✓</span>
              </div>
              <div className="flex justify-between font-mono text-[10px]">
                <span className="text-neutral-500">&gt; Execution Metric:</span>
                <span className="text-blue-300">0.021s • 14.2 MB</span>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0066FF] uppercase tracking-wider">
              <Terminal className="size-4" /> 02. Interactive Code Sandbox
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Write, execute, and debug right in the browser.
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
              No complicated local Python installation or broken dependencies. Write code directly inside our split-pane workspace with live execution feedback, test runners, custom arguments, and line-by-line syntax guidance.
            </p>
            <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                <span>20 curated algorithmic challenges with automated test cases</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                <span>Per-problem local state persistence so your code is never lost</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                <span>Custom input evaluation runner and step-by-step hints</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Product Story Pillar 3: Pip AI Mentor */}
      <section className="py-16 px-6 border-t border-neutral-100 dark:border-[rgba(255,255,255,0.08)] bg-[#FAFAFA] dark:bg-[#1E1E1E]/50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8846C7] uppercase tracking-wider">
              <Sparkles className="size-4" /> 03. 24/7 AI Code Mentor
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Never get stuck on an error or syntax rule again.
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Pip AI acts as your pair-programmer. Ask questions about decorators, async loops, list comprehensions, or type hints. It responds with clean Python snippets and 1-click &ldquo;Run in Sandbox&rdquo; actions.
            </p>
            <div className="pt-2">
              <Button asChild variant="outline" className="h-8.5 px-4 text-xs font-semibold rounded-lg border-neutral-200 dark:border-[rgba(255,255,255,0.12)] bg-white dark:bg-[#252525]">
                <Link href="/ai-mentor">
                  <Bot className="mr-1.5 size-3.5 text-[#8846C7]" /> Chat with Pip AI
                </Link>
              </Button>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-[#8846C7]/20 bg-white dark:bg-[#202020] shadow-sm space-y-3.5 text-xs">
            {/* User Bubble */}
            <div className="flex items-start gap-2.5 justify-end">
              <div className="bg-[#0066FF] text-white p-3 rounded-2xl rounded-tr-xs max-w-xs leading-relaxed text-xs">
                What is the difference between a list and a tuple in Python?
              </div>
            </div>
            {/* AI Bubble */}
            <div className="flex items-start gap-2.5">
              <div className="size-7 rounded-lg bg-[#8846C7] text-white flex items-center justify-center shrink-0">
                <Sparkles className="size-3.5" />
              </div>
              <div className="bg-[#F0EBF9]/80 dark:bg-[#2D1F4E]/60 border border-[#8846C7]/20 p-3.5 rounded-2xl rounded-tl-xs leading-relaxed text-xs text-neutral-800 dark:text-neutral-200 space-y-2">
                <p><strong>Lists</strong> are mutable (can be changed after creation), defined with square brackets <code>[]</code>.</p>
                <p><strong>Tuples</strong> are immutable (read-only), defined with parentheses <code>()</code>, making them faster and hashable as dictionary keys.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Product Story Pillar 4: Progress Tracking & Daily Streaks */}
      <section className="py-16 px-6 border-t border-neutral-100 dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-[#191919]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-[rgba(255,255,255,0.12)] bg-[#F7F7F5] dark:bg-[#202020] space-y-3">
            <div className="size-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
              <Flame className="size-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">Daily Streak Heatmap</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Stay motivated with a 52-week activity contribution grid that records your daily coding streaks and XP milestones.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-[rgba(255,255,255,0.12)] bg-[#F7F7F5] dark:bg-[#202020] space-y-3">
            <div className="size-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
              <Zap className="size-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">XP &amp; Skill Progression</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Earn XP for every lesson completed, quiz passed, and problem solved. Advance from Developer to Python Specialist.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-[rgba(255,255,255,0.12)] bg-[#F7F7F5] dark:bg-[#202020] space-y-3">
            <div className="size-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Target className="size-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">Today&apos;s Focus Checklist</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Bite-sized daily goals guide you on what to learn next so you never feel overwhelmed by large topics.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Bottom CTA */}
      <section className="py-20 px-6 border-t border-neutral-100 dark:border-[rgba(255,255,255,0.08)] bg-[#FAFAFA] dark:bg-[#1E1E1E] text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Ready to master Python the modern way?
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300">
            Join thousands of developers and students building real Python projects in PipLearn today.
          </p>
          <div className="pt-2">
            <Button asChild className="h-11 px-8 bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold text-xs rounded-xl shadow-xs">
              <Link href="/signup">
                Create Free Account <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
