"use client";

import { useState, useMemo } from "react";
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
  Terminal,
  Code2,
  Copy,
  Check,
  Sparkles,
  Bot,
  Trophy,
  CheckSquare,
  Square
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { NotionAvatar } from "@/components/ui/notion-avatar";
import { useAppContext } from "@/context/app-context";

const curriculumModules = [
  { id: "1", title: "Variables & Data Types", status: "Completed" as const, progress: 100, lessons: 5, total: 5 },
  { id: "2", title: "Lists, Tuples & Sets", status: "Completed" as const, progress: 100, lessons: 6, total: 6 },
  { id: "3", title: "Control Flow & Loops", status: "In Progress" as const, progress: 65, lessons: 4, total: 6 },
  { id: "4", title: "Functions & Scope", status: "Up Next" as const, progress: 0, lessons: 0, total: 5 },
  { id: "5", title: "Dictionaries & Hash Maps", status: "Locked" as const, progress: 0, lessons: 0, total: 5 },
  { id: "6", title: "Object-Oriented Programming", status: "Locked" as const, progress: 0, lessons: 0, total: 8 },
  { id: "7", title: "Error Handling & Exceptions", status: "Locked" as const, progress: 0, lessons: 0, total: 4 },
  { id: "8", title: "File I/O & Context Managers", status: "Locked" as const, progress: 0, lessons: 0, total: 4 },
  { id: "9", title: "Comprehensions & Generators", status: "Locked" as const, progress: 0, lessons: 0, total: 5 },
  { id: "10", title: "Decorators & Closures", status: "Locked" as const, progress: 0, lessons: 0, total: 5 },
  { id: "11", title: "Modules & Packages", status: "Locked" as const, progress: 0, lessons: 0, total: 4 },
  { id: "12", title: "AsyncIO & Concurrency", status: "Locked" as const, progress: 0, lessons: 0, total: 6 },
  { id: "13", title: "Type Hints & Dataclasses", status: "Locked" as const, progress: 0, lessons: 0, total: 4 },
  { id: "14", title: "Testing with pytest", status: "Locked" as const, progress: 0, lessons: 0, total: 5 },
  { id: "15", title: "AI Agents with Gemini SDK", status: "Locked" as const, progress: 0, lessons: 0, total: 7 },
];

const statusTag: Record<string, string> = {
  "Completed": "notion-tag-green",
  "In Progress": "notion-tag-yellow",
  "Up Next": "notion-tag-blue",
  "Locked": "notion-tag-gray",
};

const dailyGoals = [
  { id: "g1", label: "Complete Lesson 5 of Control Flow", done: false },
  { id: "g2", label: "Solve 1 Practice Problem", done: false },
  { id: "g3", label: "Ask Pip AI 1 question", done: false },
];

function generateHeatmap(streakDays: number) {
  const today = new Date();
  const cells: { date: string; level: number }[] = [];
  for (let i = 293; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const isInStreak = i < streakDays;
    const level = isInStreak ? (Math.random() > 0.4 ? 2 : 1) : (Math.random() > 0.85 ? 1 : 0);
    cells.push({
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      level,
    });
  }
  return cells;
}

function getMonthLabels() {
  const today = new Date();
  const labels: { label: string; offset: number }[] = [];
  let lastMonth = -1;
  for (let i = 293; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const month = d.getMonth();
    const weekIndex = Math.floor((293 - i) / 7);
    if (month !== lastMonth) {
      labels.push({ label: d.toLocaleDateString("en-US", { month: "short" }), offset: weekIndex });
      lastMonth = month;
    }
  }
  return labels.slice(-7);
}

export default function DashboardPage() {
  const { user, progress } = useAppContext();
  const [activeView, setActiveView] = useState<"gallery" | "table">("gallery");
  const [toggleScratchpad, setToggleScratchpad] = useState(true);
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const [isCodeCopied, setIsCodeCopied] = useState(false);
  const [goals, setGoals] = useState(dailyGoals);

  const heatmap = useMemo(() => generateHeatmap(progress.streak), [progress.streak]);
  const monthLabels = useMemo(() => getMonthLabels(), []);

  const xpToNextLevel = 800;
  const currentLevel = Math.floor(progress.xp / xpToNextLevel) + 1;
  const xpInCurrentLevel = progress.xp % xpToNextLevel;
  const rankName = progress.xp > 3000 ? "Python Architect" : progress.xp > 1500 ? "Python Specialist" : "Python Developer";

  const referenceSolution = `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []`;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(referenceSolution);
      setIsCodeCopied(true);
      toast("Code copied to clipboard");
      setTimeout(() => setIsCodeCopied(false), 2000);
    } catch {
      toast("Couldn't access the clipboard");
    }
  };

  const toggleGoal = (id: string) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, done: !g.done } : g));
  };

  const completedModules = curriculumModules.filter(m => m.status === "Completed").length;

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
          {user.firstName}&apos;s Learning Workspace
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
              <NotionAvatar seed={user.name} avatarIndex={user.avatarIndex} size="sm" hasShadow={false} />
              <span>{user.name}</span>
            </div>
          </div>

          {/* 2. Level & Rank */}
          <div className="flex items-center gap-6">
            <div className="w-32 text-gray-400 font-medium flex items-center gap-2 shrink-0">
              <Sparkles className="size-4 text-gray-400 stroke-[1.5] shrink-0" />
              <span>Level & Rank</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="notion-tag notion-tag-purple font-semibold">
                Level {currentLevel} • {rankName}
              </span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-1.5 bg-[#F1F1EF] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full transition-all duration-700"
                    style={{ width: `${(xpInCurrentLevel / xpToNextLevel) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-gray-400">{xpInCurrentLevel}/{xpToNextLevel} XP</span>
              </div>
            </div>
          </div>

          {/* 3. Streak */}
          <div className="flex items-center gap-6">
            <div className="w-32 text-gray-400 font-medium flex items-center gap-2 shrink-0">
              <Flame className="size-4 text-gray-400 stroke-[1.5] shrink-0" />
              <span>Streak</span>
            </div>
            <div>
              <span className="notion-tag notion-tag-orange font-semibold">{progress.streak} Days Active 🔥</span>
            </div>
          </div>

          {/* 4. Total XP */}
          <div className="flex items-center gap-6">
            <div className="w-32 text-gray-400 font-medium flex items-center gap-2 shrink-0">
              <Zap className="size-4 text-gray-400 stroke-[1.5] shrink-0" />
              <span>Total XP</span>
            </div>
            <div>
              <span className="notion-tag notion-tag-purple font-semibold">{progress.xp.toLocaleString()} XP</span>
            </div>
          </div>

          {/* 5. Current Target */}
          <div className="flex items-center gap-6">
            <div className="w-32 text-gray-400 font-medium flex items-center gap-2 shrink-0">
              <Target className="size-4 text-gray-400 stroke-[1.5] shrink-0" />
              <span>Current Target</span>
            </div>
            <div>
              <span className="notion-tag notion-tag-blue">{progress.currentTarget}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions Row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Link
            href="/sandbox"
            className="flex items-center gap-2 p-3 border border-[rgba(55,53,47,0.12)] rounded-lg hover:border-[#2383E2] hover:bg-[#E8F3F7] transition-all group text-xs font-semibold text-[#37352F]"
          >
            <Play className="size-4 text-emerald-600 stroke-[1.5] group-hover:scale-110 transition-transform" />
            Continue Learning
          </Link>
          <Link
            href="/sandbox"
            className="flex items-center gap-2 p-3 border border-[rgba(55,53,47,0.12)] rounded-lg hover:border-amber-300 hover:bg-amber-50 transition-all group text-xs font-semibold text-[#37352F]"
          >
            <Terminal className="size-4 text-amber-600 stroke-[1.5] group-hover:scale-110 transition-transform" />
            Open Sandbox
          </Link>
          <Link
            href="/ai-mentor"
            className="flex items-center gap-2 p-3 border border-[rgba(55,53,47,0.12)] rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all group text-xs font-semibold text-[#37352F]"
          >
            <Bot className="size-4 text-purple-600 stroke-[1.5] group-hover:scale-110 transition-transform" />
            Ask Pip AI
          </Link>
        </div>

        {/* Today's Goals */}
        <div className="border border-[rgba(55,53,47,0.12)] rounded-xl bg-white p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="size-4 text-amber-500 stroke-[1.5]" />
              <h3 className="font-bold text-xs text-gray-900">Today&apos;s Goals</h3>
            </div>
            <span className="text-[11px] text-gray-400">{goals.filter(g => g.done).length}/{goals.length} done</span>
          </div>
          <div className="space-y-2">
            {goals.map(goal => (
              <button
                key={goal.id}
                onClick={() => toggleGoal(goal.id)}
                className="w-full flex items-center gap-2.5 text-xs text-left hover:bg-[#FBFBFA] p-1.5 rounded transition-colors cursor-pointer"
              >
                {goal.done ? (
                  <CheckSquare className="size-4 text-emerald-600 stroke-[1.5] shrink-0" />
                ) : (
                  <Square className="size-4 text-gray-300 stroke-[1.5] shrink-0" />
                )}
                <span className={goal.done ? "line-through text-gray-400" : "text-[#37352F] font-medium"}>
                  {goal.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 52-Week Learning Activity Contribution Heatmap */}
        <div className="border border-[rgba(55,53,47,0.12)] rounded-xl bg-white p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Flame className="size-4 text-amber-500 stroke-[1.5]" />
              <h3 className="font-bold text-xs text-gray-900">Learning Activity Heatmap</h3>
            </div>
            <span className="text-[11px] text-gray-400 font-mono">{progress.streak} days active in past year</span>
          </div>

          {/* Month Labels */}
          <div className="flex gap-1 mb-1 relative">
            {monthLabels.map((m) => (
              <span
                key={m.label + m.offset}
                className="text-[10px] text-gray-400 absolute"
                style={{ left: `${m.offset * 14}px` }}
              >
                {m.label}
              </span>
            ))}
          </div>

          <div className="flex gap-1 overflow-x-auto pb-1 mt-4">
            {Array.from({ length: 42 }).map((_, weekIdx) => (
              <div key={weekIdx} className="flex flex-col gap-1 shrink-0">
                {Array.from({ length: 7 }).map((_, dayIdx) => {
                  const cell = heatmap[weekIdx * 7 + dayIdx];
                  if (!cell) return null;
                  return (
                    <div
                      key={dayIdx}
                      title={`${cell.date}: ${cell.level === 2 ? "120 XP" : cell.level === 1 ? "50 XP" : "No activity"}`}
                      className={`size-2.5 rounded-[2px] transition-all cursor-pointer hover:ring-1 hover:ring-gray-400 ${
                        cell.level === 2 ? "bg-emerald-600" : cell.level === 1 ? "bg-emerald-400" : "bg-[#EBEDF0] hover:bg-gray-300"
                      }`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end pt-2 text-[10px] text-gray-400 gap-1.5">
            <span>Less</span>
            <span className="size-2 rounded-[1px] bg-[#EBEDF0]"></span>
            <span className="size-2 rounded-[1px] bg-emerald-400"></span>
            <span className="size-2 rounded-[1px] bg-emerald-600"></span>
            <span>More</span>
          </div>
        </div>

        {/* Notion Callout Box */}
        <div className="notion-callout notion-callout-yellow mb-6 flex items-start gap-3 p-4 rounded-lg border border-[rgba(55,53,47,0.09)] bg-[#FBF3DB]">
          <Lightbulb className="size-5 text-amber-600 stroke-[1.5] shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <div className="font-semibold text-[#403A2B]">Daily Focus Recommendation</div>
            <div className="opacity-90 leading-relaxed text-[#403A2B]">
              You are 65% through <strong>Control Flow &amp; Loops</strong>. Finish Lesson 5 today to maintain your {progress.streak}-day streak!
            </div>
          </div>
        </div>

        {/* Notion Database Controls Bar */}
        <div className="mt-8 mb-4 border-b border-[rgba(55,53,47,0.09)] pb-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-bold text-sm text-gray-900 flex items-center gap-2">
              <BookOpen className="size-4 text-gray-400 stroke-[1.5] shrink-0" />
              <span>Curriculum Progress</span>
              <span className="text-[11px] text-gray-400 font-normal font-mono ml-1">{completedModules}/{curriculumModules.length} complete</span>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {curriculumModules.map((mod) => (
              <div
                key={mod.id}
                className={`border rounded-lg bg-white p-4 transition-all ${
                  mod.status === "Locked"
                    ? "border-[rgba(55,53,47,0.08)] opacity-60 cursor-not-allowed"
                    : "border-[rgba(55,53,47,0.12)] hover:border-gray-400"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`notion-tag ${statusTag[mod.status]}`}>{mod.status}</span>
                  <span className="text-[11px] text-gray-400 font-mono">Module {mod.id} of 15</span>
                </div>
                <h3 className="font-bold text-sm text-gray-900 mb-1">{mod.title}</h3>
                <div className="space-y-1.5 pt-2 border-t border-[rgba(55,53,47,0.06)]">
                  <div className="flex justify-between text-[11px] font-medium text-gray-500">
                    <span>{mod.progress}% Complete</span>
                    <span>{mod.lessons} / {mod.total} Lessons</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#F1F1EF] rounded-full overflow-hidden">
                    <div className="h-full bg-gray-900 rounded-full transition-all duration-700" style={{ width: `${mod.progress}%` }}></div>
                  </div>
                  {mod.status === "In Progress" && (
                    <Button asChild size="sm" className="notion-btn-primary w-full mt-2 h-7 text-xs font-semibold">
                      <Link href="/sandbox?problem=3" className="flex items-center justify-center gap-1.5">
                        <Play className="size-3.5 fill-current stroke-[1.5]" />
                        <span>Resume Lesson</span>
                      </Link>
                    </Button>
                  )}
                  {mod.status === "Up Next" && (
                    <Button asChild size="sm" variant="outline" className="notion-btn-secondary w-full mt-2 h-7 text-xs font-semibold">
                      <Link href="/courses">Start Module</Link>
                    </Button>
                  )}
                </div>
              </div>
            ))}
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
                {curriculumModules.map((mod) => (
                  <tr key={mod.id} className={`hover:bg-[#FBFBFA] ${mod.status === "Locked" ? "opacity-60" : ""}`}>
                    <td className="p-2.5 pl-3 font-semibold text-gray-900">{mod.id}. {mod.title}</td>
                    <td className="p-2.5"><span className={`notion-tag ${statusTag[mod.status]}`}>{mod.status}</span></td>
                    <td className="p-2.5 font-mono">{mod.progress}%</td>
                    <td className="p-2.5 text-right pr-3">
                      {mod.status === "In Progress" && (
                        <Link href="/sandbox?problem=3" className="text-[#2383E2] hover:underline font-medium">Resume</Link>
                      )}
                      {mod.status === "Completed" && (
                        <Link href="/courses" className="text-[#2383E2] hover:underline font-medium">Review</Link>
                      )}
                      {mod.status === "Up Next" && (
                        <Link href="/courses" className="text-[#2383E2] hover:underline font-medium">Start</Link>
                      )}
                      {mod.status === "Locked" && (
                        <span className="text-gray-400 font-medium">Locked</span>
                      )}
                    </td>
                  </tr>
                ))}
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
            <span>Workspace Notes &amp; Scratchpad</span>
          </button>

          {toggleScratchpad && (
            <div className="mt-3 pl-6 space-y-2 text-xs text-[rgba(55,53,47,0.85)] font-mono leading-relaxed border-l-2 border-gray-200">
              <p>• Remember: Python dictionaries use curly braces <code>&#123;&#125;</code> for key-value lookups.</p>
              <p>• Practice problem solved today: <strong>Two Sum</strong> using HashMap in O(n) time.</p>
              <p>• Next goal: Review list comprehensions in Module 4.</p>
            </div>
          )}
        </div>

        {/* Show Code - Notion Toggle Block */}
        <div className="border border-[rgba(55,53,47,0.09)] rounded-lg p-4 bg-[#FBFBFA] mb-6">
          <button
            onClick={() => setIsCodeVisible(!isCodeVisible)}
            className="flex items-center gap-2.5 font-semibold text-sm text-gray-900 w-full text-left cursor-pointer group"
          >
            {isCodeVisible ? (
              <ChevronDown className="size-4 text-gray-400 group-hover:text-gray-900 stroke-[1.5] shrink-0" />
            ) : (
              <ChevronRight className="size-4 text-gray-400 group-hover:text-gray-900 stroke-[1.5] shrink-0" />
            )}
            <Code2 className="size-4 text-gray-400 group-hover:text-gray-900 stroke-[1.5] shrink-0" />
            <span>Show Code — Two Sum Reference Solution</span>
          </button>

          {isCodeVisible && (
            <div className="mt-3 ml-6 border border-[rgba(55,53,47,0.12)] rounded-xl bg-[#262626] overflow-hidden animate-in fade-in duration-200">
              <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
                <span className="font-mono text-[11px] text-[rgba(255,255,255,0.55)]">solution.py</span>
                <button
                  onClick={handleCopyCode}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium border transition-colors cursor-pointer ${
                    isCodeCopied
                      ? "bg-emerald-500/15 border-emerald-400/40 text-emerald-300"
                      : "bg-white/5 border-white/15 text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {isCodeCopied ? <Check className="size-3 stroke-[2]" /> : <Copy className="size-3 stroke-[2]" />}
                  {isCodeCopied ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto font-mono text-[11px] leading-6 text-[#D4D4D4] whitespace-pre">
                <code>{referenceSolution}</code>
              </pre>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
