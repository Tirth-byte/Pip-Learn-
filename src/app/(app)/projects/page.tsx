"use client";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Terminal, CloudSun, LineChart, FileText, Wallet, Search, FolderKanban } from "lucide-react";

export const projectsList = [
  {
    id: "task-cli",
    title: "Task Tracker CLI",
    description: "Build a command line application to manage tasks, utilizing JSON serialization for persistent local storage.",
    difficulty: "Beginner",
    time: "45 mins",
    tags: ["Python", "CLI", "JSON"],
    icon: Terminal,
  },
  {
    id: "weather-api",
    title: "Weather Dashboard API",
    description: "Create a RESTful API with FastAPI that fetches and caches real-time weather data with in-memory TTL caching.",
    difficulty: "Intermediate",
    time: "2 hours",
    tags: ["FastAPI", "REST API", "Cache"],
    icon: CloudSun,
  },
  {
    id: "data-pandas",
    title: "Data Analysis with Pandas",
    description: "Analyze a real-world CSV dataset, clean missing values, run aggregations, and generate formatted markdown reports.",
    difficulty: "Beginner",
    time: "1 hour",
    tags: ["Data Science", "Pandas", "CSV"],
    icon: LineChart,
  },
  {
    id: "markdown-blog",
    title: "Markdown Blog Generator",
    description: "Build a static site engine in Python that parses frontmatter markdown posts and compiles them to HTML pages.",
    difficulty: "Intermediate",
    time: "2.5 hours",
    tags: ["Python", "Markdown", "HTML Engine"],
    icon: FileText,
  },
  {
    id: "expense-tracker",
    title: "Personal Expense Tracker",
    description: "Design an interactive CLI and SQLite expense manager with monthly category breakdowns and budgeting alerts.",
    difficulty: "Intermediate",
    time: "3 hours",
    tags: ["SQLite", "Database", "CLI"],
    icon: Wallet,
  },
  {
    id: "web-scraper",
    title: "Web Scraper & Summarizer",
    description: "Extract article text from news websites with BeautifulSoup and compute word frequencies and reading metrics.",
    difficulty: "Advanced",
    time: "3.5 hours",
    tags: ["BeautifulSoup", "Scraping", "NLP"],
    icon: Search,
  },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-6xl mx-auto pb-16 px-4 select-none">
      <div className="border-b border-neutral-100 dark:border-[rgba(255,255,255,0.09)] pb-4 mt-2">
        <div className="size-11 bg-white dark:bg-[#252525] p-2.5 rounded-xl border border-[rgba(55,53,47,0.12)] dark:border-[rgba(255,255,255,0.12)] shadow-xs flex items-center justify-center mb-3">
          <FolderKanban className="size-6 text-gray-900 dark:text-white stroke-[1.5]" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mb-1">
          Projects Hub
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm">
          Apply your Python skills by building 6 real-world tools, APIs, and data science pipelines.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projectsList.map((project) => {
          const Icon = project.icon;
          return (
            <Card key={project.id} className="shadow-none border-neutral-200 dark:border-[rgba(255,255,255,0.12)] flex flex-col hover:border-neutral-300 dark:hover:border-white/30 hover:shadow-2xs transition-all duration-200 rounded-xl overflow-hidden bg-white dark:bg-[#1E1E1E]">
              <Link href={`/projects/${project.id}`} className="flex flex-col h-full cursor-pointer p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="size-9 rounded-lg flex items-center justify-center border bg-white dark:bg-[#252525] border-neutral-200 dark:border-[rgba(255,255,255,0.12)] shadow-2xs">
                    <Icon className="size-4.5 text-neutral-800 dark:text-white" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-medium text-neutral-400 font-mono">{project.time}</span>
                    <Badge variant="secondary" className="bg-[#F7F7F5] dark:bg-[#252525] text-neutral-700 dark:text-neutral-300 shadow-none font-medium text-[10px] px-1.5 py-0 border border-neutral-200 dark:border-white/10 rounded">
                      {project.difficulty}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-base font-bold tracking-tight text-neutral-900 dark:text-white mb-1.5">{project.title}</CardTitle>
                <CardDescription className="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed mb-4">{project.description}</CardDescription>
                
                <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-neutral-100 dark:border-white/5">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-medium text-neutral-600 dark:text-neutral-400 bg-[#F7F7F5] dark:bg-[#252525] border border-neutral-200/60 dark:border-white/10 px-1.5 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
