"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ChevronRight, BookOpen, Clock, BarChart2, Filter, Terminal, Globe, Zap, LucideIcon } from "lucide-react";
import { toast } from "sonner";

type Course = {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  modules: number;
  tags: { label: string; colorClass: string }[];
  icon: LucideIcon;
  status: "Completed" | "In Progress" | "Not Started";
};

const coursesList: Course[] = [
  {
    id: "python",
    title: "Python Masterclass",
    description: "From variables & control flow to object-oriented programming & standard library.",
    level: "Beginner",
    duration: "40 hours",
    modules: 15,
    tags: [
      { label: "Core", colorClass: "notion-tag-blue" },
      { label: "Backend", colorClass: "notion-tag-gray" }
    ],
    icon: Terminal,
    status: "In Progress"
  },
  {
    id: "data-science",
    title: "Data Science with Pandas",
    description: "Manipulate, clean, and analyze datasets using Pandas, NumPy, and Matplotlib.",
    level: "Intermediate",
    duration: "25 hours",
    modules: 8,
    tags: [
      { label: "Data", colorClass: "notion-tag-green" },
      { label: "Analytics", colorClass: "notion-tag-purple" }
    ],
    icon: BarChart2,
    status: "Not Started"
  },
  {
    id: "django",
    title: "Web Dev with Django",
    description: "Build robust, production-ready web applications using the Django web framework.",
    level: "Intermediate",
    duration: "30 hours",
    modules: 12,
    tags: [
      { label: "Web", colorClass: "notion-tag-orange" },
      { label: "Backend", colorClass: "notion-tag-gray" }
    ],
    icon: Globe,
    status: "Not Started"
  },
  {
    id: "algorithms",
    title: "Data Structures & Algorithms",
    description: "Master Big-O notation, trees, graphs, heaps, dynamic programming, and interview questions.",
    level: "Advanced",
    duration: "50 hours",
    modules: 20,
    tags: [
      { label: "CS Core", colorClass: "notion-tag-pink" },
      { label: "Interview", colorClass: "notion-tag-yellow" }
    ],
    icon: Zap,
    status: "Not Started"
  }
];

export default function CourseLibraryPage() {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"gallery" | "table">("gallery");

  const filteredCourses = coursesList.filter(c => 
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto w-full pb-16 px-6 text-[#37352F] select-none">
      
      {/* Notion Page Header */}
      <div className="pt-6 pb-4 border-b border-[rgba(55,53,47,0.09)] mb-6">
        <div className="size-11 bg-white p-2.5 rounded-xl border border-[rgba(55,53,47,0.12)] shadow-xs flex items-center justify-center mb-3">
          <BookOpen className="size-6 text-gray-900 stroke-[1.5]" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-[#37352F] mb-1">
          Course Library
        </h1>
        <p className="text-xs text-[rgba(55,53,47,0.65)]">
          Structured Python curriculum organized into interactive Notion-style modules.
        </p>
      </div>

      {/* Notion Database Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#F7F7F5] p-0.5 rounded border border-[rgba(55,53,47,0.09)] text-xs">
            <button
              onClick={() => setViewMode("gallery")}
              className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                viewMode === "gallery" ? "bg-white shadow-xs text-[#37352F]" : "text-[rgba(55,53,47,0.65)] hover:text-[#37352F]"
              }`}
            >
              Gallery View
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                viewMode === "table" ? "bg-white shadow-xs text-[#37352F]" : "text-[rgba(55,53,47,0.65)] hover:text-[#37352F]"
              }`}
            >
              Table View
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-[rgba(55,53,47,0.4)] stroke-[1.5]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="w-full pl-8 pr-3 py-1 bg-[#F7F7F5] border border-[rgba(55,53,47,0.09)] focus:bg-white focus:border-[#2383E2] rounded text-xs text-[#37352F] outline-none transition-all"
          />
        </div>
      </div>

      {/* Gallery View */}
      {viewMode === "gallery" && (
        <div className="grid md:grid-cols-2 gap-4">
          {filteredCourses.map((course) => {
            const IconComponent = course.icon;
            return (
              <div 
                key={course.id}
                className="border border-[rgba(55,53,47,0.12)] rounded-xl bg-white overflow-hidden hover:border-[rgba(55,53,47,0.25)] transition-all flex flex-col group"
              >
                {/* Cover Strip */}
                <div className="h-16 bg-[#F7F7F5] border-b border-[rgba(55,53,47,0.06)] p-3 flex items-end justify-between">
                  <div className="size-9 rounded-lg bg-white border border-[rgba(55,53,47,0.12)] flex items-center justify-center shadow-2xs">
                    <IconComponent className="size-5 text-gray-900 stroke-[1.5]" />
                  </div>
                  <span className={`notion-tag ${
                    course.status === "In Progress" ? "notion-tag-yellow" :
                    course.status === "Completed" ? "notion-tag-green" : "notion-tag-gray"
                  }`}>
                    {course.status}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base text-[#37352F] mb-1 group-hover:text-[#2383E2] transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-xs text-[rgba(55,53,47,0.65)] leading-relaxed mb-4">
                      {course.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[rgba(55,53,47,0.06)] space-y-2">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {course.tags.map(t => (
                        <span key={t.label} className={`notion-tag ${t.colorClass}`}>
                          {t.label}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[rgba(55,53,47,0.5)] font-medium">
                      <span>{course.level} • {course.duration}</span>
                      <span>{course.modules} Modules</span>
                    </div>

                    {course.id === "python" ? (
                      <Link
                        href={`/courses/${course.id}`}
                        className="mt-2 w-full notion-btn-secondary h-8 text-xs font-semibold flex items-center justify-center gap-1.5"
                      >
                        <span>Open Syllabus</span>
                        <ChevronRight className="size-3.5 stroke-[1.5]" />
                      </Link>
                    ) : (
                      <button
                        onClick={() => toast(`${course.title} syllabus — coming soon`)}
                        className="mt-2 w-full notion-btn-secondary h-8 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Open Syllabus</span>
                        <ChevronRight className="size-3.5 stroke-[1.5]" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {viewMode === "table" && (
        <div className="border border-[rgba(55,53,47,0.12)] rounded-xl overflow-hidden text-xs bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F7F7F5] border-b border-[rgba(55,53,47,0.09)] text-[rgba(55,53,47,0.6)] font-medium">
                <th className="p-2.5 pl-3">Course</th>
                <th className="p-2.5">Status</th>
                <th className="p-2.5">Level</th>
                <th className="p-2.5">Tags</th>
                <th className="p-2.5 text-right pr-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(55,53,47,0.06)]">
              {filteredCourses.map((c) => {
                const IconComponent = c.icon;
                return (
                  <tr key={c.id} className="hover:bg-[#FBFBFA]">
                    <td className="p-2.5 pl-3 font-semibold text-[#37352F] flex items-center gap-2.5">
                      <IconComponent className="size-4 text-gray-500 stroke-[1.5] shrink-0" />
                      <span>{c.title}</span>
                    </td>
                    <td className="p-2.5">
                      <span className={`notion-tag ${
                        c.status === "In Progress" ? "notion-tag-yellow" :
                        c.status === "Completed" ? "notion-tag-green" : "notion-tag-gray"
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="p-2.5 text-[rgba(55,53,47,0.7)]">{c.level}</td>
                    <td className="p-2.5">
                      <div className="flex gap-1">
                        {c.tags.map(t => (
                          <span key={t.label} className={`notion-tag ${t.colorClass}`}>{t.label}</span>
                        ))}
                      </div>
                    </td>
                    <td className="p-2.5 text-right pr-3">
                      {c.id === "python" ? (
                        <Link href={`/courses/${c.id}`} className="text-[#2383E2] hover:underline font-medium">Open</Link>
                      ) : (
                        <button
                          onClick={() => toast(`${c.title} syllabus — coming soon`)}
                          className="text-[#2383E2] hover:underline font-medium cursor-pointer bg-transparent border-none p-0 text-inherit"
                        >
                          Open
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
