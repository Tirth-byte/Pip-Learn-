"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, CheckCircle2, Circle, Target, Shuffle, Zap, Trophy, BarChart3 } from "lucide-react";
import { useAppContext } from "@/context/app-context";

type Problem = {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  xp: number;
};

const XP_MAP = { Easy: 10, Medium: 25, Hard: 50 } as const;

const allProblems: Problem[] = [
  { id: "1", title: "Two Sum", difficulty: "Easy", category: "Arrays", xp: XP_MAP.Easy },
  { id: "2", title: "Reverse Linked List", difficulty: "Easy", category: "Linked Lists", xp: XP_MAP.Easy },
  { id: "3", title: "Valid Parentheses", difficulty: "Medium", category: "Stacks", xp: XP_MAP.Medium },
  { id: "4", title: "Merge K Sorted Lists", difficulty: "Hard", category: "Heaps", xp: XP_MAP.Hard },
  { id: "5", title: "Binary Tree Level Order Traversal", difficulty: "Medium", category: "Trees", xp: XP_MAP.Medium },
  { id: "6", title: "Maximum Subarray", difficulty: "Medium", category: "Dynamic Programming", xp: XP_MAP.Medium },
  { id: "7", title: "Fibonacci Number", difficulty: "Easy", category: "Recursion", xp: XP_MAP.Easy },
  { id: "8", title: "FizzBuzz", difficulty: "Easy", category: "Strings", xp: XP_MAP.Easy },
  { id: "9", title: "Palindrome Check", difficulty: "Easy", category: "Strings", xp: XP_MAP.Easy },
  { id: "10", title: "Anagram Detection", difficulty: "Easy", category: "Strings", xp: XP_MAP.Easy },
  { id: "11", title: "Binary Search", difficulty: "Easy", category: "Arrays", xp: XP_MAP.Easy },
  { id: "12", title: "Count Vowels", difficulty: "Easy", category: "Strings", xp: XP_MAP.Easy },
  { id: "13", title: "Longest Common Prefix", difficulty: "Medium", category: "Strings", xp: XP_MAP.Medium },
  { id: "14", title: "Merge Sort", difficulty: "Medium", category: "Sorting", xp: XP_MAP.Medium },
  { id: "15", title: "Depth-First Search", difficulty: "Medium", category: "Graphs", xp: XP_MAP.Medium },
  { id: "16", title: "Climbing Stairs", difficulty: "Easy", category: "Dynamic Programming", xp: XP_MAP.Easy },
  { id: "17", title: "Valid BST", difficulty: "Medium", category: "Trees", xp: XP_MAP.Medium },
  { id: "18", title: "Min Stack", difficulty: "Medium", category: "Stacks", xp: XP_MAP.Medium },
  { id: "19", title: "Course Schedule (Topological Sort)", difficulty: "Hard", category: "Graphs", xp: XP_MAP.Hard },
  { id: "20", title: "Longest Increasing Subsequence", difficulty: "Hard", category: "Dynamic Programming", xp: XP_MAP.Hard },
];

const categories = [
  "All",
  "Arrays",
  "Strings",
  "Linked Lists",
  "Stacks",
  "Trees",
  "Heaps",
  "Dynamic Programming",
  "Sorting",
  "Graphs",
  "Recursion",
];

export default function PracticePage() {
  const { progress } = useAppContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read initial filter state from URL params
  const initialCategory = searchParams.get("category") || "All";
  const initialDifficulty = searchParams.get("difficulty") || "All";

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedDifficulty, setSelectedDifficulty] = useState(initialDifficulty);

  // Persist filters to URL
  const updateFilters = useCallback(
    (cat: string, diff: string) => {
      const params = new URLSearchParams();
      if (cat !== "All") params.set("category", cat);
      if (diff !== "All") params.set("difficulty", diff);
      const qs = params.toString();
      router.replace(`/practice${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [router]
  );

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    updateFilters(cat, selectedDifficulty);
  };

  const handleDifficultyChange = (diff: string) => {
    setSelectedDifficulty(diff);
    updateFilters(selectedCategory, diff);
  };

  const filteredProblems = allProblems.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || p.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Stats
  const solvedCount = allProblems.filter((p) => progress.solvedProblemIds.includes(p.id)).length;
  const totalXpEarned = allProblems
    .filter((p) => progress.solvedProblemIds.includes(p.id))
    .reduce((sum, p) => sum + p.xp, 0);
  const remainingCount = allProblems.length - solvedCount;

  // Random problem
  const unsolvedProblems = useMemo(
    () => allProblems.filter((p) => !progress.solvedProblemIds.includes(p.id)),
    [progress.solvedProblemIds]
  );

  const handleRandomProblem = () => {
    const pool = unsolvedProblems.length > 0 ? unsolvedProblems : allProblems;
    const random = pool[Math.floor(Math.random() * pool.length)];
    router.push(`/sandbox?problem=${random.id}`);
  };

  return (
    <div className="max-w-5xl mx-auto w-full pb-16 px-6 text-[#37352F] select-none">
      
      {/* Notion Page Header */}
      <div className="pt-6 pb-4 border-b border-[rgba(55,53,47,0.09)] mb-6">
        <div className="size-11 bg-white p-2.5 rounded-xl border border-[rgba(55,53,47,0.12)] shadow-xs flex items-center justify-center mb-3">
          <Target className="size-6 text-gray-900 stroke-[1.5]" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-[#37352F] mb-1">
          Practice Problems
        </h1>
        <p className="text-xs text-[rgba(55,53,47,0.65)]">
          Sharpen your skills with {allProblems.length} curated problems. Filter by category, difficulty, or status.
        </p>
      </div>

      {/* Progress Stats Banner */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="flex items-center gap-3 p-3.5 rounded-xl border border-[rgba(55,53,47,0.09)] bg-[#F7F7F5]">
          <div className="size-9 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
            <Trophy className="size-4 text-emerald-700 stroke-[1.5]" />
          </div>
          <div>
            <div className="text-lg font-bold text-[#37352F] leading-tight">{solvedCount}</div>
            <div className="text-[11px] text-[rgba(55,53,47,0.5)] font-medium">Solved</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3.5 rounded-xl border border-[rgba(55,53,47,0.09)] bg-[#F7F7F5]">
          <div className="size-9 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
            <BarChart3 className="size-4 text-amber-700 stroke-[1.5]" />
          </div>
          <div>
            <div className="text-lg font-bold text-[#37352F] leading-tight">{remainingCount}</div>
            <div className="text-[11px] text-[rgba(55,53,47,0.5)] font-medium">Remaining</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3.5 rounded-xl border border-[rgba(55,53,47,0.09)] bg-[#F7F7F5]">
          <div className="size-9 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
            <Zap className="size-4 text-blue-700 stroke-[1.5]" />
          </div>
          <div>
            <div className="text-lg font-bold text-[#37352F] leading-tight">{totalXpEarned}</div>
            <div className="text-[11px] text-[rgba(55,53,47,0.5)] font-medium">XP Earned</div>
          </div>
        </div>
      </div>

      {/* Notion Database Toolbar Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? "bg-[#37352F] text-white"
                    : "bg-[#F7F7F5] text-[rgba(55,53,47,0.7)] hover:bg-[#EFEFEF] hover:text-[#37352F]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Filter, Search & Random */}
        <div className="flex items-center gap-2">
          <select
            value={selectedDifficulty}
            onChange={(e) => handleDifficultyChange(e.target.value)}
            className="h-8 bg-[#F7F7F5] border border-[rgba(55,53,47,0.12)] rounded px-2 text-xs font-medium text-[#37352F] focus:outline-none cursor-pointer"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <div className="relative w-full sm:w-48">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-[rgba(55,53,47,0.4)] stroke-[1.5]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full pl-8 pr-3 py-1 bg-[#F7F7F5] border border-[rgba(55,53,47,0.12)] focus:bg-white focus:border-[#2383E2] rounded text-xs text-[#37352F] outline-none transition-all"
            />
          </div>

          <button
            onClick={handleRandomProblem}
            title="Pick a random unsolved problem"
            className="h-8 px-3 bg-[#F7F7F5] border border-[rgba(55,53,47,0.12)] rounded text-xs font-medium text-[#37352F] hover:bg-[#EFEFEF] transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
          >
            <Shuffle className="size-3.5 stroke-[1.5]" />
            <span className="hidden sm:inline">Random</span>
          </button>
        </div>
      </div>

      {/* Notion Database Table View */}
      <div className="border border-[rgba(55,53,47,0.12)] rounded-xl overflow-hidden text-xs bg-white shadow-none">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F7F7F5] border-b border-[rgba(55,53,47,0.09)] text-[rgba(55,53,47,0.6)] font-medium">
              <th className="p-2.5 pl-4 w-12">Status</th>
              <th className="p-2.5">Problem Title</th>
              <th className="p-2.5">Category</th>
              <th className="p-2.5">Difficulty</th>
              <th className="p-2.5 text-center">Reward</th>
              <th className="p-2.5 text-right pr-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(55,53,47,0.06)]">
            {filteredProblems.length > 0 ? (
              filteredProblems.map((p) => {
                const isSolved = progress.solvedProblemIds.includes(p.id);
                return (
                  <tr key={p.id} className={`hover:bg-[#FBFBFA] transition-colors ${isSolved ? "bg-[#F7FFF7]" : ""}`}>
                    <td className="p-2.5 pl-4">
                      {isSolved ? (
                        <CheckCircle2 className="size-4 text-emerald-600 stroke-[1.5]" />
                      ) : (
                        <Circle className="size-4 text-[rgba(55,53,47,0.25)] stroke-[1.5]" />
                      )}
                    </td>
                    <td className="p-2.5 font-semibold text-[#37352F]">
                      {p.title}
                    </td>
                    <td className="p-2.5">
                      <span className="notion-tag notion-tag-gray">{p.category}</span>
                    </td>
                    <td className="p-2.5">
                      <span className={`notion-tag ${
                        p.difficulty === "Easy" ? "notion-tag-green" :
                        p.difficulty === "Medium" ? "notion-tag-yellow" : "notion-tag-red"
                      }`}>
                        {p.difficulty}
                      </span>
                    </td>
                    <td className="p-2.5 text-center">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700">
                        <Zap className="size-3 stroke-[2]" />
                        {p.xp} XP
                      </span>
                    </td>
                    <td className="p-2.5 text-right pr-4">
                      <Link
                        href={`/sandbox?problem=${p.id}`}
                        className="notion-btn-secondary py-1 px-3 text-xs"
                      >
                        {isSolved ? "Review" : "Solve"}
                      </Link>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="p-8 text-center text-[rgba(55,53,47,0.5)]">
                  No problems match your current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Stats */}
      <div className="mt-3 text-[11px] text-[rgba(55,53,47,0.45)] font-medium text-right">
        Showing {filteredProblems.length} of {allProblems.length} problems
      </div>

    </div>
  );
}
