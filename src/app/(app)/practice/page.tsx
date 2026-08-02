"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, CheckCircle2, Circle, Target } from "lucide-react";

type Problem = {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  status: "Solved" | "Unsolved";
};

const initialProblems: Problem[] = [
  { id: "1", title: "Two Sum", difficulty: "Easy", category: "Arrays", status: "Solved" },
  { id: "2", title: "Reverse Linked List", difficulty: "Easy", category: "Linked Lists", status: "Unsolved" },
  { id: "3", title: "Valid Parentheses", difficulty: "Medium", category: "Stacks", status: "Unsolved" },
  { id: "4", title: "Merge K Sorted Lists", difficulty: "Hard", category: "Heaps", status: "Unsolved" },
  { id: "5", title: "Binary Tree Level Order Traversal", difficulty: "Medium", category: "Trees", status: "Solved" },
];

const categories = ["All", "Arrays", "Linked Lists", "Stacks", "Heaps", "Trees"];

export default function PracticePage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const filteredProblems = initialProblems.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || p.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

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
          Notion-style problem database. Filter by difficulty, category, or status.
        </p>
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
                onClick={() => setSelectedCategory(cat)}
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

        {/* Filter & Search */}
        <div className="flex items-center gap-2">
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
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
              <th className="p-2.5 text-right pr-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(55,53,47,0.06)]">
            {filteredProblems.length > 0 ? (
              filteredProblems.map((p) => (
                <tr key={p.id} className="hover:bg-[#FBFBFA] transition-colors">
                  <td className="p-2.5 pl-4">
                    {p.status === "Solved" ? (
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
                  <td className="p-2.5 text-right pr-4">
                    <Link
                      href={`/sandbox?problem=${p.id}`}
                      className="notion-btn-secondary py-1 px-3 text-xs"
                    >
                      Solve
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-[rgba(55,53,47,0.5)]">
                  No problems match your current search query.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
