"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Play,
  ChevronRight,
  ChevronDown,
  User,
  Flame,
  Zap,
  Target,
  Lightbulb,
  BookOpen,
  FileText,
  Terminal
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const [activeView, setActiveView] = useState<"gallery" | "table">("gallery");
  const [toggleScratchpad, setToggleScratchpad] = useState(true);

  return (
    <div className="max-w-4xl mx-auto w-full pb-16 text-[#37352F] select-none">
      
      {/* Notion Page Cover Banner */}
      <div className="h-28 w-full bg-gradient-to-r from-[#FBF3DB] via-[#EDF3EC] to-[#E8F3F7] rounded-b border-b border-[rgba(55,53,47,0.09)] relative mb-6">
        <div className="absolute -bottom-6 left-6 size-12 bg-white p-2 rounded-xl border border-[rgba(55,53,47,0.12)] shadow-sm flex items-center justify-center">
          <Terminal className="size-6 text-gray-900 stroke-[1.5]" />
        </div>
      </div>

      <div className="px-6 pt-2">
        {/* Page Title */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
          Ada's Learning Workspace
        </h1>

        {/* Notion Page Properties */}
        <div className="border-y border-[rgba(55,53,47,0.09)] py-3 my-4 space-y-2 text-xs">
          {/* 1. Owner */}
          <div className="flex items-center gap-6">
            <div className="w-32 text-gray-400 font-medium flex items-center gap-2 shrink-0">
              <User className="size-4 text-gray-400 stroke-[1.5] shrink-0" />
              <span>Owner</span>
            </div>
            <div className="font-medium text-[#37352F] flex items-center gap-2">
              <span className="size-4 rounded-full bg-[#37352F] text-white flex items-center justify-center text-[10px] font-bold">A</span>
              <span>Ada Lovelace</span>
            </div>
          </div>

          {/* 2. Streak */}
          <div className="flex items-center gap-6">
            <div className="w-32 text-gray-400 font-medium flex items-center gap-2 shrink-0">
              <Flame className="size-4 text-gray-400 stroke-[1.5] shrink-0" />
              <span>Streak</span>
            </div>
            <div>
              <span className="notion-tag notion-tag-orange font-semibold">12 Days Active</span>
            </div>
          </div>

          {/* 3. Total XP */}
          <div className="flex items-center gap-6">
            <div className="w-32 text-gray-400 font-medium flex items-center gap-2 shrink-0">
              <Zap className="size-4 text-gray-400 stroke-[1.5] shrink-0" />
              <span>Total XP</span>
            </div>
            <div>
              <span className="notion-tag notion-tag-purple font-semibold">2,450 XP</span>
            </div>
          </div>

          {/* 4. Current Target */}
          <div className="flex items-center gap-6">
            <div className="w-32 text-gray-400 font-medium flex items-center gap-2 shrink-0">
              <Target className="size-4 text-gray-400 stroke-[1.5] shrink-0" />
              <span>Current Target</span>
            </div>
            <div>
              <span className="notion-tag notion-tag-blue">Python Control Flow</span>
            </div>
          </div>
        </div>

        {/* Notion Callout Box */}
        <div className="notion-callout notion-callout-yellow mb-6 flex items-start gap-3 p-4 rounded-lg border border-[rgba(55,53,47,0.09)] bg-[#FBF3DB]">
          <Lightbulb className="size-5 text-amber-600 stroke-[1.5] shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <div className="font-semibold text-[#403A2B]">Daily Focus Recommendation</div>
            <div className="opacity-90 leading-relaxed text-[#403A2B]">
              You are 65% through <strong>Control Flow & Loops</strong>. Finish Lesson 5 today to maintain your 12-day streak!
            </div>
          </div>
        </div>

        {/* Notion Database Controls Bar */}
        <div className="mt-8 mb-4 border-b border-[rgba(55,53,47,0.09)] pb-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-bold text-sm text-gray-900 flex items-center gap-2">
              <BookOpen className="size-4 text-gray-400 stroke-[1.5] shrink-0" />
              <span>Curriculum Progress</span>
            </span>
            <div className="flex items-center bg-[#F7F7F5] p-0.5 rounded border border-[rgba(55,53,47,0.09)] text-xs">
              <button
                onClick={() => setActiveView("gallery")}
                className={`px-2 py-0.5 rounded font-medium transition-colors cursor-pointer ${
                  activeView === "gallery" ? "bg-white shadow-xs text-gray-900" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Gallery View
              </button>
              <button
                onClick={() => setActiveView("table")}
                className={`px-2 py-0.5 rounded font-medium transition-colors cursor-pointer ${
                  activeView === "table" ? "bg-white shadow-xs text-gray-900" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Table View
              </button>
            </div>
          </div>

          <Link href="/courses" className="text-xs font-medium text-[#2383E2] hover:underline flex items-center gap-1">
            <span>View Full Syllabus</span>
            <ChevronRight className="size-3.5 stroke-[1.5]" />
          </Link>
        </div>

        {/* Database Gallery View */}
        {activeView === "gallery" && (
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="border border-[rgba(55,53,47,0.12)] rounded-lg bg-white p-4 hover:border-gray-400 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="notion-tag notion-tag-green">In Progress</span>
                <span className="text-[11px] text-gray-400 font-mono">Module 3 of 15</span>
              </div>
              <h3 className="font-bold text-sm text-gray-900 mb-1">Control Flow & Loops</h3>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                Master conditional branching with if/elif/else and iterating with for/while loops.
              </p>
              
              <div className="space-y-2 pt-3 border-t border-[rgba(55,53,47,0.06)]">
                <div className="flex justify-between text-[11px] font-medium text-gray-500">
                  <span>65% Complete</span>
                  <span>4 / 6 Lessons</span>
                </div>
                <div className="h-1.5 w-full bg-[#F1F1EF] rounded-full overflow-hidden">
                  <div className="h-full bg-gray-900 rounded-full" style={{ width: "65%" }}></div>
                </div>
                <Button asChild size="sm" className="notion-btn-primary w-full mt-3 h-8 text-xs font-semibold">
                  <Link href="/sandbox?problem=3" className="flex items-center justify-center gap-2">
                    <Play className="size-3.5 fill-current stroke-[1.5]" />
                    <span>Resume Lesson</span>
                  </Link>
                </Button>
              </div>
            </div>

            <div className="border border-[rgba(55,53,47,0.12)] rounded-lg bg-white p-4 hover:border-gray-400 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="notion-tag notion-tag-blue">Up Next</span>
                <span className="text-[11px] text-gray-400 font-mono">Module 4 of 15</span>
              </div>
              <h3 className="font-bold text-sm text-gray-900 mb-1">Functions & Scope</h3>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                Defining functions, return values, default arguments, and variable scoping rules.
              </p>

              <div className="space-y-2 pt-3 border-t border-[rgba(55,53,47,0.06)]">
                <div className="flex justify-between text-[11px] font-medium text-gray-500">
                  <span>0% Complete</span>
                  <span>0 / 5 Lessons</span>
                </div>
                <div className="h-1.5 w-full bg-[#F1F1EF] rounded-full overflow-hidden">
                  <div className="h-full bg-gray-900 rounded-full" style={{ width: "0%" }}></div>
                </div>
                <Button asChild size="sm" variant="outline" className="notion-btn-secondary w-full mt-3 h-8 text-xs font-semibold">
                  <Link href="/courses">
                    Start Module
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Database Table View */}
        {activeView === "table" && (
          <div className="border border-[rgba(55,53,47,0.12)] rounded-lg overflow-hidden mb-8 text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F7F7F5] border-b border-[rgba(55,53,47,0.09)] text-gray-500 font-medium">
                  <th className="p-2.5 pl-3">Module Name</th>
                  <th className="p-2.5">Status</th>
                  <th className="p-2.5">Progress</th>
                  <th className="p-2.5 text-right pr-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(55,53,47,0.06)]">
                <tr className="hover:bg-[#FBFBFA]">
                  <td className="p-2.5 pl-3 font-semibold text-gray-900">1. Variables & Data Types</td>
                  <td className="p-2.5"><span className="notion-tag notion-tag-green">Completed</span></td>
                  <td className="p-2.5">100%</td>
                  <td className="p-2.5 text-right pr-3">
                    <Link href="/courses" className="text-[#2383E2] hover:underline font-medium">Review</Link>
                  </td>
                </tr>
                <tr className="hover:bg-[#FBFBFA]">
                  <td className="p-2.5 pl-3 font-semibold text-gray-900">2. Lists & Tuples</td>
                  <td className="p-2.5"><span className="notion-tag notion-tag-green">Completed</span></td>
                  <td className="p-2.5">100%</td>
                  <td className="p-2.5 text-right pr-3">
                    <Link href="/courses" className="text-[#2383E2] hover:underline font-medium">Review</Link>
                  </td>
                </tr>
                <tr className="hover:bg-[#FBFBFA]">
                  <td className="p-2.5 pl-3 font-semibold text-gray-900">3. Control Flow & Loops</td>
                  <td className="p-2.5"><span className="notion-tag notion-tag-yellow">In Progress</span></td>
                  <td className="p-2.5">65%</td>
                  <td className="p-2.5 text-right pr-3">
                    <Link href="/sandbox?problem=3" className="text-[#2383E2] hover:underline font-medium">Resume</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Notion Toggle List Block */}
        <div className="border border-[rgba(55,53,47,0.09)] rounded-lg p-4 bg-[#FBFBFA] mb-6">
          <button
            onClick={() => setToggleScratchpad(!toggleScratchpad)}
            className="flex items-center gap-2.5 font-semibold text-sm text-gray-900 w-full text-left cursor-pointer group"
          >
            {toggleScratchpad ? (
              <ChevronDown className="size-4 text-gray-400 group-hover:text-gray-900 stroke-[1.5] shrink-0" />
            ) : (
              <ChevronRight className="size-4 text-gray-400 group-hover:text-gray-900 stroke-[1.5] shrink-0" />
            )}
            <FileText className="size-4 text-gray-400 group-hover:text-gray-900 stroke-[1.5] shrink-0" />
            <span>Workspace Notes & Scratchpad</span>
          </button>

          {toggleScratchpad && (
            <div className="mt-3 pl-6 space-y-2 text-xs text-[rgba(55,53,47,0.85)] font-mono leading-relaxed border-l-2 border-gray-200">
              <p>• Remember: Python dictionaries use curly braces <code>&#123;&#125;</code> for key-value lookups.</p>
              <p>• Practice problem solved today: <strong>Two Sum</strong> using HashMap in O(n) time.</p>
              <p>• Next goal: Review list comprehensions in Module 4.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
