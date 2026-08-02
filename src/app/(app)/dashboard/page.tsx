"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const [activeView, setActiveView] = useState<"gallery" | "table">("gallery");
  const [toggleScratchpad, setToggleScratchpad] = useState(true);

  return (
    <div className="max-w-4xl mx-auto w-full pb-16 text-[#37352F]">
      
      {/* Notion Page Cover Banner */}
      <div className="h-28 w-full bg-gradient-to-r from-[#FBF3DB] via-[#EDF3EC] to-[#E8F3F7] rounded-b border-b border-[rgba(55,53,47,0.09)] relative mb-6">
        <div className="absolute -bottom-6 left-6 text-5xl select-none bg-white p-1 rounded border border-[rgba(55,53,47,0.09)] shadow-sm">
          🐍
        </div>
      </div>

      <div className="px-6 pt-2">
        {/* Page Title */}
        <h1 className="text-3xl font-bold tracking-tight text-[#37352F] mb-4">
          Ada's Learning Workspace
        </h1>

        {/* Notion Page Properties */}
        <div className="border-y border-[rgba(55,53,47,0.09)] py-3 my-4 space-y-2 text-xs">
          <div className="flex items-center gap-6">
            <div className="w-28 text-[rgba(55,53,47,0.45)] font-medium flex items-center gap-1.5">
              <span>👤</span> Owner
            </div>
            <div className="font-medium text-[#37352F] flex items-center gap-1.5">
              <span className="size-4 rounded-full bg-[#37352F] text-white flex items-center justify-center text-[10px] font-bold">A</span>
              <span>Ada Lovelace</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="w-28 text-[rgba(55,53,47,0.45)] font-medium flex items-center gap-1.5">
              <span>🔥</span> Streak
            </div>
            <div>
              <span className="notion-tag notion-tag-orange font-semibold">12 Days Active</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="w-28 text-[rgba(55,53,47,0.45)] font-medium flex items-center gap-1.5">
              <span>⚡</span> Total XP
            </div>
            <div>
              <span className="notion-tag notion-tag-purple font-semibold">2,450 XP</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="w-28 text-[rgba(55,53,47,0.45)] font-medium flex items-center gap-1.5">
              <span>🎯</span> Current Target
            </div>
            <div>
              <span className="notion-tag notion-tag-blue">Python Control Flow</span>
            </div>
          </div>
        </div>

        {/* Notion Callout Box */}
        <div className="notion-callout notion-callout-yellow mb-6">
          <span className="text-xl">💡</span>
          <div className="text-xs space-y-1">
            <div className="font-semibold text-[#403A2B]">Daily Focus Recommendation</div>
            <div className="opacity-90 leading-relaxed">
              You are 65% through <strong>Control Flow & Loops</strong>. Finish Lesson 5 today to maintain your 12-day streak!
            </div>
          </div>
        </div>

        {/* Notion Database Controls Bar */}
        <div className="mt-8 mb-4 border-b border-[rgba(55,53,47,0.09)] pb-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-sm text-[#37352F] flex items-center gap-1.5">
              <span>📚</span> Curriculum Progress
            </span>
            <div className="flex items-center bg-[#F7F7F5] p-0.5 rounded border border-[rgba(55,53,47,0.09)] text-xs">
              <button
                onClick={() => setActiveView("gallery")}
                className={`px-2 py-0.5 rounded font-medium transition-colors cursor-pointer ${
                  activeView === "gallery" ? "bg-white shadow-xs text-[#37352F]" : "text-[rgba(55,53,47,0.65)] hover:text-[#37352F]"
                }`}
              >
                Gallery View
              </button>
              <button
                onClick={() => setActiveView("table")}
                className={`px-2 py-0.5 rounded font-medium transition-colors cursor-pointer ${
                  activeView === "table" ? "bg-white shadow-xs text-[#37352F]" : "text-[rgba(55,53,47,0.65)] hover:text-[#37352F]"
                }`}
              >
                Table View
              </button>
            </div>
          </div>

          <Link href="/courses" className="text-xs font-medium text-[#2383E2] hover:underline flex items-center gap-1">
            <span>View Full Syllabus</span>
            <ChevronRight className="size-3" />
          </Link>
        </div>

        {/* Database Gallery View */}
        {activeView === "gallery" && (
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="border border-[rgba(55,53,47,0.12)] rounded bg-white p-4 hover:border-[rgba(55,53,47,0.25)] transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="notion-tag notion-tag-green">In Progress</span>
                <span className="text-[11px] text-[rgba(55,53,47,0.45)]">Module 3 of 15</span>
              </div>
              <h3 className="font-bold text-sm text-[#37352F] mb-1">Control Flow & Loops</h3>
              <p className="text-xs text-[rgba(55,53,47,0.65)] mb-4 leading-relaxed">
                Master conditional branching with if/elif/else and iterating with for/while loops.
              </p>
              
              <div className="space-y-2 pt-3 border-t border-[rgba(55,53,47,0.06)]">
                <div className="flex justify-between text-[11px] font-medium text-[rgba(55,53,47,0.6)]">
                  <span>65% Complete</span>
                  <span>4 / 6 Lessons</span>
                </div>
                <div className="h-1.5 w-full bg-[#F1F1EF] rounded-full overflow-hidden">
                  <div className="h-full bg-[#37352F] rounded-full" style={{ width: "65%" }}></div>
                </div>
                <Button asChild size="sm" className="notion-btn-primary w-full mt-3 h-8 text-xs">
                  <Link href="/sandbox?problem=3">
                    <Play className="size-3 mr-1.5 fill-current" /> Resume Lesson
                  </Link>
                </Button>
              </div>
            </div>

            <div className="border border-[rgba(55,53,47,0.12)] rounded bg-white p-4 hover:border-[rgba(55,53,47,0.25)] transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="notion-tag notion-tag-blue">Up Next</span>
                <span className="text-[11px] text-[rgba(55,53,47,0.45)]">Module 4 of 15</span>
              </div>
              <h3 className="font-bold text-sm text-[#37352F] mb-1">Functions & Scope</h3>
              <p className="text-xs text-[rgba(55,53,47,0.65)] mb-4 leading-relaxed">
                Defining functions, return values, default arguments, and variable scoping rules.
              </p>

              <div className="space-y-2 pt-3 border-t border-[rgba(55,53,47,0.06)]">
                <div className="flex justify-between text-[11px] font-medium text-[rgba(55,53,47,0.6)]">
                  <span>0% Complete</span>
                  <span>0 / 5 Lessons</span>
                </div>
                <div className="h-1.5 w-full bg-[#F1F1EF] rounded-full overflow-hidden">
                  <div className="h-full bg-[#37352F] rounded-full" style={{ width: "0%" }}></div>
                </div>
                <Button asChild size="sm" variant="outline" className="notion-btn-secondary w-full mt-3 h-8 text-xs">
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
          <div className="border border-[rgba(55,53,47,0.12)] rounded overflow-hidden mb-8 text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F7F7F5] border-b border-[rgba(55,53,47,0.09)] text-[rgba(55,53,47,0.6)] font-medium">
                  <th className="p-2.5 pl-3">Module Name</th>
                  <th className="p-2.5">Status</th>
                  <th className="p-2.5">Progress</th>
                  <th className="p-2.5 text-right pr-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(55,53,47,0.06)]">
                <tr className="hover:bg-[#FBFBFA]">
                  <td className="p-2.5 pl-3 font-semibold text-[#37352F]">1. Variables & Data Types</td>
                  <td className="p-2.5"><span className="notion-tag notion-tag-green">Completed</span></td>
                  <td className="p-2.5">100%</td>
                  <td className="p-2.5 text-right pr-3">
                    <Link href="/courses" className="text-[#2383E2] hover:underline font-medium">Review</Link>
                  </td>
                </tr>
                <tr className="hover:bg-[#FBFBFA]">
                  <td className="p-2.5 pl-3 font-semibold text-[#37352F]">2. Lists & Tuples</td>
                  <td className="p-2.5"><span className="notion-tag notion-tag-green">Completed</span></td>
                  <td className="p-2.5">100%</td>
                  <td className="p-2.5 text-right pr-3">
                    <Link href="/courses" className="text-[#2383E2] hover:underline font-medium">Review</Link>
                  </td>
                </tr>
                <tr className="hover:bg-[#FBFBFA]">
                  <td className="p-2.5 pl-3 font-semibold text-[#37352F]">3. Control Flow & Loops</td>
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
        <div className="border border-[rgba(55,53,47,0.09)] rounded p-4 bg-[#FBFBFA] mb-6">
          <button
            onClick={() => setToggleScratchpad(!toggleScratchpad)}
            className="flex items-center gap-2 font-semibold text-sm text-[#37352F] w-full text-left cursor-pointer"
          >
            <span className="text-xs text-[rgba(55,53,47,0.45)]">{toggleScratchpad ? "▼" : "▶"}</span>
            <span>📝 Workspace Notes & Scratchpad</span>
          </button>

          {toggleScratchpad && (
            <div className="mt-3 pl-5 space-y-2 text-xs text-[rgba(55,53,47,0.85)] font-mono leading-relaxed border-l-2 border-[rgba(55,53,47,0.12)]">
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
