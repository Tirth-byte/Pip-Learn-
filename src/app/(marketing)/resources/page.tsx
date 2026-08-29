"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen, Search, MessageSquare, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Resource = {
  id: string;
  category: "docs" | "guides" | "blog" | "support";
  title: string;
  description: string;
  readTime?: string;
  tag: string;
  href: string;
  isExternal?: boolean;
};

const resourcesList: Resource[] = [
  // 1. Documentation
  {
    id: "doc-1",
    category: "docs",
    title: "Python 3.12+ Syntax & Core Primitives",
    description: "Complete cheat sheet for variables, dynamic typing, f-strings, walrus operator, and structural pattern matching.",
    readTime: "8 min read",
    tag: "Reference",
    href: "/courses/python/basics",
  },
  {
    id: "doc-2",
    category: "docs",
    title: "PEP 8 Style & Clean Code Conventions",
    description: "Official guidelines for formatting, snake_case variable naming, whitespace rules, and docstring structure.",
    readTime: "6 min read",
    tag: "Best Practices",
    href: "/courses/python/functions",
  },
  {
    id: "doc-3",
    category: "docs",
    title: "Type Annotations & Pydantic v2 Models",
    description: "Deep dive into type hints, generics, Optional, Union, and type validation in modern Python codebases.",
    readTime: "10 min read",
    tag: "Typing",
    href: "/courses/fastapi",
  },

  // 2. Guides
  {
    id: "guide-1",
    category: "guides",
    title: "Mastering AsyncIO & Concurrent Execution",
    description: "Learn how event loops, coroutines, tasks, and asyncio.gather() work under the hood with practical code examples.",
    readTime: "12 min read",
    tag: "Concurrency",
    href: "/courses/python/basics/lesson-4",
  },
  {
    id: "guide-2",
    category: "guides",
    title: "Building Production Microservices with FastAPI",
    description: "Step-by-step architecture guide covering dependency injection, async SQLAlchemy, Alembic, and JWT authentication.",
    readTime: "15 min read",
    tag: "Backend",
    href: "/courses/fastapi",
  },
  {
    id: "guide-3",
    category: "guides",
    title: "Data Wrangling & Statistical Analysis with Pandas",
    description: "Learn how to clean imperfect datasets, handle missing values, and execute group-level aggregations in Pandas.",
    readTime: "14 min read",
    tag: "Data Science",
    href: "/courses/data-science",
  },

  // 3. Blog Articles
  {
    id: "blog-1",
    category: "blog",
    title: "Why Modern Python is Faster and More Ergonomic Than Ever",
    description: "An analysis of the Specialized Adaptive Interpreter, faster CPython optimizations, and Python 3.12+ JIT performance.",
    readTime: "5 min read",
    tag: "Performance",
    href: "/courses/python",
  },
  {
    id: "blog-2",
    category: "blog",
    title: "Top 10 Algorithmic Patterns Every Developer Must Master",
    description: "Two pointers, sliding window, fast/slow pointers, and monotonic stacks explained with intuitive visuals.",
    readTime: "11 min read",
    tag: "Algorithms",
    href: "/practice",
  },

  // 4. Support & FAQs
  {
    id: "sup-1",
    category: "support",
    title: "Getting Started & Workspace Setup FAQ",
    description: "Common questions about browser sandbox compatibility, keyboard shortcuts, XP awards, and progress tracking.",
    readTime: "4 min read",
    tag: "Help Center",
    href: "/dashboard",
  },
  {
    id: "sup-2",
    category: "support",
    title: "Managing Team Licenses & Workspace Roles",
    description: "How administrators can invite members, assign instructor privileges, and review team progress metrics.",
    readTime: "5 min read",
    tag: "Admin",
    href: "/admin",
  }
];

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState<"all" | "docs" | "guides" | "blog" | "support">("all");
  const [search, setSearch] = useState("");

  const filteredResources = resourcesList.filter((r) => {
    const matchesCat = activeCategory === "all" || r.category === activeCategory;
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#191919] text-[#37352F] dark:text-[rgba(255,255,255,0.85)] select-none">
      {/* 1. Header */}
      <section className="pt-20 pb-12 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F7F5] dark:bg-[#252525] border border-[rgba(55,53,47,0.12)] dark:border-[rgba(255,255,255,0.12)] text-xs font-semibold text-[#37352F] dark:text-white mb-6">
          <BookOpen className="size-3.5 text-[#0066FF]" />
          <span>PipLearn Knowledge Hub</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-4">
          Resources, Guides &amp; Documentation
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-xl mx-auto leading-relaxed">
          Curated technical guides, standard library references, and educational articles to accelerate your Python journey.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mt-8">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documentation, guides, and tutorials..."
            className="w-full h-11 pl-10 pr-4 bg-[#F7F7F5] dark:bg-[#252525] border border-[rgba(55,53,47,0.12)] dark:border-[rgba(255,255,255,0.12)] rounded-xl text-xs sm:text-sm text-neutral-900 dark:text-white outline-none focus:border-[#0066FF] transition-all shadow-2xs"
          />
        </div>
      </section>

      {/* 2. Category Filter Navigation */}
      <section className="px-6 max-w-5xl mx-auto w-full mb-8">
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {[
            { id: "all", label: "All Resources" },
            { id: "docs", label: "Documentation" },
            { id: "guides", label: "Guides & Tutorials" },
            { id: "blog", label: "Engineering Blog" },
            { id: "support", label: "Help & Support" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activeCategory === tab.id
                  ? "bg-[#37352F] text-white dark:bg-white dark:text-black shadow-xs"
                  : "bg-[#F7F7F5] dark:bg-[#252525] text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Resource Cards Grid */}
      <section className="px-6 max-w-5xl mx-auto w-full pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="p-5 rounded-2xl border border-neutral-200 dark:border-[rgba(255,255,255,0.12)] bg-white dark:bg-[#202020] hover:border-neutral-300 dark:hover:border-white/30 hover:shadow-sm transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="notion-tag notion-tag-blue font-mono text-[10px]">{item.tag}</span>
                  <span className="text-[11px] font-mono text-neutral-400">{item.readTime}</span>
                </div>
                <h3 className="text-base font-bold tracking-tight text-neutral-900 dark:text-white group-hover:text-[#0066FF] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-white/5 flex items-center justify-between text-xs font-semibold text-[#0066FF]">
                <span>Read guide</span>
                <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* 4. Community & Discord Callout Banner */}
        <div className="mt-12 p-8 rounded-2xl border border-neutral-200 dark:border-[rgba(255,255,255,0.12)] bg-[#F7F7F5] dark:bg-[#202020] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-neutral-500 uppercase tracking-wider">
              <MessageSquare className="size-4 text-[#0066FF]" /> Community Forum
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
              Connect with fellow Python learners
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-md">
              Ask questions, get feedback on projects, and participate in weekly algorithm challenges.
            </p>
          </div>
          <Button asChild className="h-10 px-6 bg-black hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 text-xs font-semibold rounded-xl shrink-0">
            <Link href="/community">
              Open Community Feed <ArrowRight className="ml-2 size-3.5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
