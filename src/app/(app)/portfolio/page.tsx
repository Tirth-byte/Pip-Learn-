"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Code2, Globe, Flame, Zap, CheckCircle2, Share2, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAppContext } from "@/context/app-context";
import { NotionAvatar } from "@/components/ui/notion-avatar";
import { toast } from "sonner";

export default function PortfolioPage() {
  const { user, progress } = useAppContext();
  const [copied, setCopied] = useState(false);

  const completedProjects = [
    {
      id: "task-cli",
      title: "Task Tracker CLI",
      description: "A command line application to manage tasks with JSON persistence, priority tags, and automated file creation.",
      date: "August 2026",
      tags: ["Python", "CLI", "JSON"],
      problemId: "1"
    },
    {
      id: "weather-api",
      title: "Weather Dashboard API",
      description: "A RESTful API built with FastAPI that fetches weather metrics from external endpoints with in-memory caching.",
      date: "August 2026",
      tags: ["FastAPI", "REST API", "Cache"],
      problemId: "2"
    },
    {
      id: "data-pandas",
      title: "CSV Data Analyzer",
      description: "A data science script that cleans missing values, computes group statistics, and exports markdown summaries.",
      date: "July 2026",
      tags: ["Python", "Pandas", "CSV"],
      problemId: "5"
    }
  ];

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Portfolio link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl mx-auto pb-16 px-4 select-none">
      {/* Portfolio Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-neutral-100 dark:border-[rgba(255,255,255,0.09)] pb-6 mt-2">
        <div className="flex items-center gap-4">
          <NotionAvatar seed={user.name} avatarIndex={user.avatarIndex} size="xl" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                {user.name}&apos;s Portfolio
              </h1>
              <span className="notion-tag notion-tag-purple text-xs font-semibold">{user.role || "Python Developer"}</span>
            </div>
            <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm mt-1">{user.bio}</p>
            <div className="flex items-center gap-3 mt-2 text-xs font-medium text-neutral-500">
              <span className="flex items-center gap-1 text-neutral-700 dark:text-neutral-300">
                <Globe className="size-3.5 text-neutral-400" />
                {user.github || "github.com/learner"}
              </span>
            </div>
          </div>
        </div>

        <Button
          onClick={handleShare}
          variant="outline"
          className="shadow-xs border-neutral-200 dark:border-[rgba(255,255,255,0.12)] h-9 px-4 hover:bg-neutral-100 dark:hover:bg-white/5 text-xs font-semibold rounded-lg text-neutral-700 dark:text-neutral-200 shrink-0 cursor-pointer"
        >
          {copied ? (
            <><Check className="mr-1.5 size-3.5 text-emerald-600" /> Link Copied</>
          ) : (
            <><Share2 className="mr-1.5 size-3.5" /> Share Portfolio</>
          )}
        </Button>
      </div>

      {/* Stats Overview Banner */}
      <div className="grid grid-cols-3 gap-3.5">
        <div className="p-4 rounded-xl border border-neutral-200 dark:border-[rgba(255,255,255,0.09)] bg-[#F7F7F5] dark:bg-[#202020] flex items-center gap-3">
          <div className="size-9 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
            <Flame className="size-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-neutral-900 dark:text-white leading-tight">{progress.streak} Days</div>
            <div className="text-[11px] text-neutral-500 font-medium">Active Streak</div>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-neutral-200 dark:border-[rgba(255,255,255,0.09)] bg-[#F7F7F5] dark:bg-[#202020] flex items-center gap-3">
          <div className="size-9 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
            <Zap className="size-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-neutral-900 dark:text-white leading-tight">{progress.xp.toLocaleString()} XP</div>
            <div className="text-[11px] text-neutral-500 font-medium">Total Earned</div>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-neutral-200 dark:border-[rgba(255,255,255,0.09)] bg-[#F7F7F5] dark:bg-[#202020] flex items-center gap-3">
          <div className="size-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <CheckCircle2 className="size-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-neutral-900 dark:text-white leading-tight">{progress.solvedProblemIds.length} Solved</div>
            <div className="text-[11px] text-neutral-500 font-medium">Coding Challenges</div>
          </div>
        </div>
      </div>

      {/* Verified Completed Projects Showcase */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-neutral-900 dark:text-white">Featured Project Artifacts</h2>
          <span className="text-xs text-neutral-400 font-medium">{completedProjects.length} Projects</span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {completedProjects.map((project) => (
            <Card key={project.id} className="shadow-none border-neutral-200 dark:border-[rgba(255,255,255,0.12)] flex flex-col hover:border-neutral-300 dark:hover:border-white/20 transition-all rounded-xl overflow-hidden bg-white dark:bg-[#1E1E1E]">
              <CardHeader className="p-5 pb-3">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[11px] font-mono text-neutral-400">{project.date}</span>
                </div>
                <CardTitle className="text-base font-bold tracking-tight text-neutral-900 dark:text-white mb-1.5">{project.title}</CardTitle>
                <CardDescription className="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-1.5 mt-auto px-5 pb-4 pt-0">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-medium text-neutral-600 dark:text-neutral-400 bg-[#F7F7F5] dark:bg-[#252525] border border-neutral-200/60 dark:border-white/10 px-1.5 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </CardContent>
              <CardFooter className="p-5 pt-0 flex gap-2 mt-auto">
                <Button variant="outline" asChild className="flex-1 shadow-none border-neutral-200 dark:border-[rgba(255,255,255,0.12)] bg-white dark:bg-[#252525] hover:bg-neutral-100 text-xs font-semibold rounded-lg text-neutral-700 dark:text-neutral-200 h-8">
                  <Link href={`/sandbox?problem=${project.problemId}`}>
                    <Code2 className="mr-1.5 size-3" /> Code
                  </Link>
                </Button>
                <Button variant="outline" asChild className="flex-1 shadow-none border-neutral-200 dark:border-[rgba(255,255,255,0.12)] bg-white dark:bg-[#252525] hover:bg-neutral-100 text-xs font-semibold rounded-lg text-neutral-700 dark:text-neutral-200 h-8">
                  <Link href={`/projects/${project.id}`}>
                    <ExternalLink className="mr-1.5 size-3" /> Details
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
