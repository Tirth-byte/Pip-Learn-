"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ArrowRight, 
  Check, 
  Sparkles, 
  Terminal, 
  Code2, 
  Cpu, 
  FileCode2, 
  Play, 
  Search, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Trophy, 
  BookOpen, 
  Bug, 
  CheckCircle2,
  Layers,
  Flame,
  Database,
  Rocket,
  User,
  Bot,
  GraduationCap,
  Workflow,
  FileCheck
} from "lucide-react";
import { NotionAvatarsRow } from "@/components/ui/notion-avatars-row";
import { NotionHeroPill } from "@/components/ui/notion-hero-pill";
import { UniversityMarquee } from "@/components/ui/university-marquee";

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<"exercises" | "sandbox" | "leaderboard" | "docs">("exercises");

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] bg-white text-[#37352F] selection:bg-[#2383E2]/20">
      
      {/* Hero Section */}
      <section className="px-6 pt-12 pb-12 text-center max-w-5xl mx-auto w-full relative">
        
        {/* Overlapping Notion-Style Avatars Row */}
        <NotionAvatarsRow />

        {/* Main Hero Headline customized for PipLearn: Where developers {Pill} Python with AI */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 text-[#000000] leading-[1.18]">
          <span className="inline-flex items-center justify-center flex-wrap gap-x-[0.35em] gap-y-[0.1em]">
            <span>Where developers</span>
            <NotionHeroPill />
            <span>Python with AI.</span>
          </span>
        </h1>

        {/* Subtitle customized for PipLearn */}
        <p className="text-base sm:text-lg md:text-xl text-[rgba(55,53,47,0.7)] mb-8 max-w-2xl mx-auto font-normal leading-relaxed">
          Master Python 3.12, debug tracebacks in real-time, and build autonomous AI agents side-by-side with an intelligent AI tutor.
        </p>

        {/* Hero CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <Button asChild size="lg" className="bg-[#2383E2] hover:bg-[#1D6FBE] text-white h-11 px-6 text-sm font-semibold rounded-md shadow-sm border-none">
            <Link href="/signup">
              Get PipLearn free
            </Link>
          </Button>
          <Button asChild size="lg" variant="ghost" className="bg-[#E8F3F7] hover:bg-[#D3E8F0] text-[#2383E2] h-11 px-6 text-sm font-semibold rounded-md border-none">
            <Link href="/courses">
              Explore Python Courses
            </Link>
          </Button>
        </div>

        {/* Floating Badges Left and Right using Lucide Icons */}
        <div className="hidden lg:block absolute left-8 bottom-32 animate-bounce transition-transform duration-1000">
          <div className="relative">
            <div className="size-12 rounded-xl bg-amber-50 border border-amber-200/80 shadow-md flex items-center justify-center rotate-[-12deg]">
              <Terminal className="size-6 text-amber-600" />
            </div>
            <span className="absolute -bottom-2 -right-2 bg-white rounded-full p-0.5 border border-black/10 shadow-xs">
              <CheckCircle2 className="size-3.5 text-emerald-600" />
            </span>
          </div>
        </div>

        <div className="hidden lg:block absolute right-8 bottom-32 animate-bounce transition-transform duration-1000 delay-500">
          <div className="relative">
            <div className="size-12 rounded-xl bg-purple-50 border border-purple-200/80 shadow-md flex items-center justify-center rotate-[12deg]">
              <Sparkles className="size-6 text-purple-600" />
            </div>
            <span className="absolute -top-2 -right-2 bg-white rounded-full p-0.5 border border-black/10 shadow-xs">
              <Zap className="size-3 text-amber-500 fill-amber-500" />
            </span>
          </div>
        </div>

        {/* Notion-Style Workspace UI Mockup customized for PipLearn */}
        <div className="border border-[rgba(55,53,47,0.16)] rounded-xl bg-white shadow-2xl overflow-hidden text-left max-w-4xl mx-auto">
          {/* macOS Titlebar */}
          <div className="h-10 bg-[#F7F7F5] border-b border-[rgba(55,53,47,0.09)] flex items-center px-4 justify-between select-none">
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
              <div className="size-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
              <div className="size-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
              <div className="ml-4 flex items-center gap-2 text-xs font-semibold text-[#37352F]">
                <span className="text-[11px] px-2 py-0.5 rounded bg-[#EFEFEF] flex items-center gap-1.5 font-mono">
                  <Terminal className="size-3.5 text-amber-500" />
                  PipLearn Workspace — Python 3.12
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-[rgba(55,53,47,0.5)]">
              <span className="flex items-center gap-1 font-medium hover:text-black cursor-pointer">
                <Play className="size-3 text-emerald-600 fill-emerald-600" /> Run Code
              </span>
              <span className="flex items-center gap-1 font-medium hover:text-black cursor-pointer">
                <Bot className="size-3.5 text-purple-600" /> Pip AI
              </span>
              <span className="flex items-center gap-1 font-medium hover:text-black cursor-pointer">
                <Sparkles className="size-3.5 text-amber-500" />
              </span>
              <span>•••</span>
            </div>
          </div>

          {/* Workspace Body */}
          <div className="flex min-h-[380px] bg-white">
            {/* Left Workspace Sidebar */}
            <div className="w-56 bg-[#FBFBFA] border-r border-[rgba(55,53,47,0.09)] p-3 hidden sm:block text-xs">
              <div className="font-semibold text-[11px] text-[rgba(55,53,47,0.45)] uppercase tracking-wider mb-2">Learning Tracks</div>
              <div className="space-y-1.5 mb-6">
                <div className="flex items-center justify-between p-1.5 rounded bg-[#E8F3F7] text-[#1C3B47] font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Code2 className="size-3.5 text-blue-600" />
                    Python 3.12 Mastery
                  </span>
                  <span className="text-[10px] text-blue-700 font-bold">85%</span>
                </div>
                <div className="flex items-center justify-between p-1.5 rounded hover:bg-[#F1F1EF] text-[rgba(55,53,47,0.8)]">
                  <span className="flex items-center gap-1.5">
                    <Zap className="size-3.5 text-amber-600" />
                    AsyncIO & FastAPI
                  </span>
                  <span className="text-[10px] text-[rgba(55,53,47,0.4)]">60%</span>
                </div>
                <div className="flex items-center justify-between p-1.5 rounded hover:bg-[#F1F1EF] text-[rgba(55,53,47,0.8)]">
                  <span className="flex items-center gap-1.5">
                    <Bot className="size-3.5 text-purple-600" />
                    AI Agents & GenAI
                  </span>
                  <span className="text-[10px] text-[rgba(55,53,47,0.4)]">35%</span>
                </div>
              </div>

              <div className="font-semibold text-[11px] text-[rgba(55,53,47,0.45)] uppercase tracking-wider mb-2">AI Assistants</div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 p-1.5 rounded bg-[#F1F1EF] font-semibold text-[#37352F]">
                  <Sparkles className="size-3.5 text-purple-600" />
                  Pip AI Tutor
                </div>
                <div className="flex items-center gap-2 p-1.5 rounded hover:bg-[#F1F1EF] text-[rgba(55,53,47,0.7)]">
                  <Bug className="size-3.5 text-emerald-600" />
                  Traceback Debugger
                </div>
                <div className="flex items-center gap-2 p-1.5 rounded hover:bg-[#F1F1EF] text-[rgba(55,53,47,0.7)]">
                  <FileCheck className="size-3.5 text-blue-600" />
                  PyTest Suite Generator
                </div>
              </div>
            </div>

            {/* Right Main Page Area */}
            <div className="flex-1 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-9 rounded-lg bg-amber-50 flex items-center justify-center border border-amber-200 shadow-xs">
                  <Terminal className="size-5 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#37352F]">Python Interactive Curriculum</h2>
                  <p className="text-xs text-[rgba(55,53,47,0.55)]">Module 4: Asynchronous Programming & Data Structures</p>
                </div>
              </div>

              {/* View Tabs using Lucide Icons */}
              <div className="flex items-center gap-4 border-b border-[rgba(55,53,47,0.09)] pb-2 mb-6 text-xs text-[rgba(55,53,47,0.6)]">
                <button onClick={() => setActiveTab("exercises")} className={`font-semibold pb-2 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${activeTab === "exercises" ? "border-black text-black" : "border-transparent hover:text-black"}`}>
                  <FileCode2 className="size-3.5" /> Practice Exercises
                </button>
                <button onClick={() => setActiveTab("sandbox")} className={`font-semibold pb-2 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${activeTab === "sandbox" ? "border-black text-black" : "border-transparent hover:text-black"}`}>
                  <Terminal className="size-3.5" /> Python Sandbox
                </button>
                <button onClick={() => setActiveTab("leaderboard")} className={`font-semibold pb-2 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${activeTab === "leaderboard" ? "border-black text-black" : "border-transparent hover:text-black"}`}>
                  <Trophy className="size-3.5" /> Leaderboard
                </button>
                <button onClick={() => setActiveTab("docs")} className={`font-semibold pb-2 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${activeTab === "docs" ? "border-black text-black" : "border-transparent hover:text-black"}`}>
                  <BookOpen className="size-3.5" /> PyPI & Docs
                </button>
              </div>

              {/* Exercise Table Preview with Lucide Icons */}
              <div className="border border-[rgba(55,53,47,0.09)] rounded-lg overflow-hidden text-xs">
                <div className="grid grid-cols-12 bg-[#FBFBFA] border-b border-[rgba(55,53,47,0.09)] p-2.5 font-semibold text-[rgba(55,53,47,0.5)]">
                  <div className="col-span-6">Exercise Module</div>
                  <div className="col-span-3">Status</div>
                  <div className="col-span-3">Evaluator</div>
                </div>
                <div className="divide-y divide-[rgba(55,53,47,0.06)]">
                  <div className="grid grid-cols-12 p-2.5 items-center hover:bg-[#FBFBFA]">
                    <div className="col-span-6 font-medium text-[#37352F] flex items-center gap-2">
                      <Bot className="size-4 text-purple-600" />
                      Build an AI Chatbot with Gemini SDK
                    </div>
                    <div className="col-span-3">
                      <span className="notion-tag notion-tag-green">In Progress</span>
                    </div>
                    <div className="col-span-3 text-[rgba(55,53,47,0.7)] flex items-center gap-1.5">
                      <span className="size-4 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-[10px] font-bold text-amber-800">A</span> Alex M.
                    </div>
                  </div>

                  <div className="grid grid-cols-12 p-2.5 items-center hover:bg-[#FBFBFA]">
                    <div className="col-span-6 font-medium text-[#37352F] flex items-center gap-2">
                      <Zap className="size-4 text-amber-600" />
                      AsyncIO Event Loop & Task Groups
                    </div>
                    <div className="col-span-3">
                      <span className="notion-tag notion-tag-blue">Review</span>
                    </div>
                    <div className="col-span-3 text-[rgba(55,53,47,0.7)] flex items-center gap-1.5">
                      <span className="size-4 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center text-[10px] font-bold text-blue-800">S</span> Sarah T.
                    </div>
                  </div>

                  <div className="grid grid-cols-12 p-2.5 items-center hover:bg-[#FBFBFA]">
                    <div className="col-span-6 font-medium text-[#37352F] flex items-center gap-2">
                      <Code2 className="size-4 text-blue-600" />
                      LeetCode Two Sum (Optimized Hash Map)
                    </div>
                    <div className="col-span-3">
                      <span className="notion-tag notion-tag-purple">Passed 100%</span>
                    </div>
                    <div className="col-span-3 text-[rgba(55,53,47,0.7)] flex items-center gap-1.5">
                      <Bot className="size-4 text-purple-600" /> Pip Tutor
                    </div>
                  </div>

                  <div className="grid grid-cols-12 p-2.5 items-center hover:bg-[#FBFBFA]">
                    <div className="col-span-6 font-medium text-[#37352F] flex items-center gap-2">
                      <Workflow className="size-4 text-emerald-600" />
                      FastAPI REST API with Pydantic v2
                    </div>
                    <div className="col-span-3">
                      <span className="notion-tag notion-tag-green">Completed</span>
                    </div>
                    <div className="col-span-3 text-[rgba(55,53,47,0.7)] flex items-center gap-1.5">
                      <CheckCircle2 className="size-4 text-emerald-600" /> Evaluator
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top University Infinite Marquee Bar */}
      <UniversityMarquee />

      {/* Section 2: AI Where You Code Python */}
      <section className="px-6 py-20 bg-white max-w-6xl mx-auto w-full">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#000000] mb-12">
          AI where you code Python.
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Feature Card 1 */}
          <div className="bg-[#F7F7F5] border border-[rgba(55,53,47,0.08)] rounded-2xl p-8 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <span className="text-xs font-semibold text-[rgba(55,53,47,0.5)] mb-2 block">Interactive Learning</span>
              <div className="flex items-start justify-between gap-4 mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-[#37352F] leading-tight">
                  Write code and debug errors side-by-side with Pip AI.
                </h3>
                <Link href="/sandbox" className="size-8 rounded-full bg-black text-white flex items-center justify-center shrink-0 cursor-pointer hover:scale-105 transition-transform">
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            {/* Inner UI Block with Lucide Icons */}
            <div className="bg-white border border-[rgba(55,53,47,0.12)] rounded-xl p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2 font-bold text-base text-[#37352F]">
                <Bug className="size-5 text-purple-600" /> Python Traceback Assistant
              </div>
              <div className="flex items-center gap-2 text-xs text-[rgba(55,53,47,0.5)]">
                <span className="notion-tag notion-tag-purple flex items-center gap-1">
                  <ShieldCheck className="size-3 text-purple-600" /> TypeError
                </span>
                <span className="notion-tag notion-tag-gray flex items-center gap-1">
                  <Code2 className="size-3 text-gray-600" /> line 42
                </span>
              </div>

              <div className="divide-y divide-[rgba(55,53,47,0.06)] text-xs">
                <div className="py-2 flex items-center justify-between">
                  <span className="font-mono text-rose-600">TypeError: 'NoneType' object is not subscriptable</span>
                  <div className="flex gap-1">
                    <span className="notion-tag notion-tag-yellow">Auto Fix</span>
                  </div>
                </div>
                <div className="py-2 flex items-center justify-between">
                  <span className="font-medium text-[rgba(55,53,47,0.7)]">Pip AI: Suggested safeguard using optional chaining or getter guard</span>
                  <div className="flex gap-1">
                    <span className="notion-tag notion-tag-green">Apply Fix</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-[#F7F7F5] border border-[rgba(55,53,47,0.08)] rounded-2xl p-8 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <span className="text-xs font-semibold text-[rgba(55,53,47,0.5)] mb-2 block">Python Docs & PyPI Search</span>
              <div className="flex items-start justify-between gap-4 mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-[#37352F] leading-tight">
                  Instant documentation & PyPI package citations.
                </h3>
                <Link href="/courses" className="size-8 rounded-full bg-black text-white flex items-center justify-center shrink-0 cursor-pointer hover:scale-105 transition-transform">
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            {/* Inner UI Block with Lucide Icons */}
            <div className="bg-white border border-[rgba(55,53,47,0.12)] rounded-xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-base text-[#37352F]">
                  <BookOpen className="size-5 text-emerald-600" /> FastAPI & Pydantic v2 Cheat Sheet
                </div>
                <span className="notion-tag notion-tag-green text-[10px]">Python 3.12 Verified</span>
              </div>

              {/* Code Snippet Simulation */}
              <div className="h-28 bg-[#FAF9F6] border border-[rgba(55,53,47,0.09)] rounded-lg p-3 flex flex-col justify-between text-xs font-mono">
                <div className="text-blue-600">from pydantic import BaseModel, Field</div>
                <div className="text-emerald-700">class UserSchema(BaseModel):</div>
                <div className="text-amber-700 pl-4">email: str = Field(..., pattern=r"^[^@]+@[^@]+\.[^@]+$")</div>
                <div className="text-purple-600 pl-4">is_active: bool = True</div>
              </div>

              <div className="flex items-center gap-2 text-xs text-[rgba(55,53,47,0.6)]">
                <span>Integrated docs:</span>
                <span className="size-5 rounded bg-blue-100 flex items-center justify-center font-bold text-[10px] text-blue-700">Py</span>
                <span className="size-5 rounded bg-emerald-100 flex items-center justify-center font-bold text-[10px] text-emerald-700">FA</span>
                <span className="size-5 rounded bg-purple-100 flex items-center justify-center font-bold text-[10px] text-purple-700">Pd</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Quick-Action Feature Badges with Lucide Icons */}
      <section className="px-6 py-12 max-w-6xl mx-auto w-full">
        <p className="text-xs font-semibold text-[rgba(55,53,47,0.45)] mb-6">See what PipLearn can do for you</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Link href="/sandbox" className="border border-[rgba(55,53,47,0.12)] rounded-xl p-4 bg-white hover:border-black/30 transition-all cursor-pointer group flex flex-col justify-between h-32">
            <div className="size-9 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center">
              <Bug className="size-5 text-rose-600" />
            </div>
            <div className="font-semibold text-xs text-[#37352F] group-hover:underline flex items-center gap-1">
              Debug Python tracebacks <ArrowRight className="size-3" />
            </div>
          </Link>

          <Link href="/courses" className="border border-[rgba(55,53,47,0.12)] rounded-xl p-4 bg-white hover:border-black/30 transition-all cursor-pointer group flex flex-col justify-between h-32">
            <div className="size-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
              <FileCheck className="size-5 text-blue-600" />
            </div>
            <div className="font-semibold text-xs text-[#37352F] group-hover:underline flex items-center gap-1">
              Generate pytest unit tests <ArrowRight className="size-3" />
            </div>
          </Link>

          <Link href="/sandbox" className="border border-[rgba(55,53,47,0.12)] rounded-xl p-4 bg-white hover:border-black/30 transition-all cursor-pointer group flex flex-col justify-between h-32">
            <div className="size-9 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center">
              <Bot className="size-5 text-purple-600" />
            </div>
            <div className="font-semibold text-xs text-[#37352F] group-hover:underline flex items-center gap-1">
              Build Gemini Python agents <ArrowRight className="size-3" />
            </div>
          </Link>

          <Link href="/courses" className="border border-[rgba(55,53,47,0.12)] rounded-xl p-4 bg-white hover:border-black/30 transition-all cursor-pointer group flex flex-col justify-between h-32">
            <div className="size-9 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
              <Code2 className="size-5 text-amber-600" />
            </div>
            <div className="font-semibold text-xs text-[#37352F] group-hover:underline flex items-center gap-1">
              Practice algorithm structures <ArrowRight className="size-3" />
            </div>
          </Link>

          <Link href="/sandbox" className="border border-[rgba(55,53,47,0.12)] rounded-xl p-4 bg-white hover:border-black/30 transition-all cursor-pointer group flex flex-col justify-between h-32">
            <div className="size-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
              <Terminal className="size-5 text-emerald-600" />
            </div>
            <div className="font-semibold text-xs text-[#37352F] group-hover:underline flex items-center gap-1">
              Isolated Python 3 sandbox <ArrowRight className="size-3" />
            </div>
          </Link>
        </div>
      </section>

      {/* Section 4: Trusted By Engineers and Teams with Lucide Avatars */}
      <section className="px-6 py-20 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#000000] mb-12">
          Trusted by developers who ship.
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1 - Dark Crimson */}
          <div className="bg-[#8B2626] text-white rounded-2xl p-8 flex flex-col justify-between min-h-[380px] shadow-lg relative overflow-hidden group">
            <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Code2 className="size-24 text-white" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-8">
                <span className="font-black text-lg tracking-widest uppercase bg-white/10 px-3 py-1 rounded-md border border-white/15">CURSOR</span>
              </div>
              <p className="text-base sm:text-lg font-medium leading-relaxed opacity-95">
                "PipLearn is an incredible AI-native workspace. Our engineers use it to quickly master new Python libraries and build AI tools."
              </p>
            </div>
            <div className="relative z-10 flex items-center gap-3 pt-6 border-t border-white/15">
              <div className="size-9 rounded-full bg-white/15 border border-white/25 flex items-center justify-center">
                <User className="size-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-sm">Michael Truell</div>
                <div className="text-xs opacity-75">Co-founder & CEO, Cursor</div>
              </div>
            </div>
          </div>

          {/* Card 2 - Deep Blue */}
          <div className="bg-[#1B4965] text-white rounded-2xl p-8 flex flex-col justify-between min-h-[380px] shadow-lg relative overflow-hidden group">
            <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Bot className="size-24 text-white" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-8">
                <span className="font-black text-lg tracking-widest uppercase bg-white/10 px-3 py-1 rounded-md border border-white/15">OPENAI</span>
              </div>
              <p className="text-base sm:text-lg font-medium leading-relaxed opacity-95">
                "The real-time code explanations and PyPI documentation integration cut our developers' learning curve in half."
              </p>
            </div>
            <div className="relative z-10 flex items-center gap-3 pt-6 border-t border-white/15">
              <div className="size-9 rounded-full bg-white/15 border border-white/25 flex items-center justify-center">
                <User className="size-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-sm">Sarah Jenkins</div>
                <div className="text-xs opacity-75">Lead AI Developer Advocate</div>
              </div>
            </div>
          </div>

          {/* Card 3 - Warm Amber/Brown */}
          <div className="bg-[#8C5A14] text-white rounded-2xl p-8 flex flex-col justify-between min-h-[380px] shadow-lg relative overflow-hidden group">
            <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Sparkles className="size-24 text-white" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-8">
                <span className="font-black text-lg tracking-widest uppercase bg-white/10 px-3 py-1 rounded-md border border-white/15">RAMP</span>
              </div>
              <p className="text-base sm:text-lg font-medium leading-relaxed opacity-95">
                "PipLearn's AI tutor helps our team write clean Python, test edge cases, and deploy backend microservices smoothly."
              </p>
            </div>
            <div className="relative z-10 flex items-center gap-3 pt-6 border-t border-white/15">
              <div className="size-9 rounded-full bg-white/15 border border-white/25 flex items-center justify-center">
                <User className="size-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-sm">Ben Levick</div>
                <div className="text-xs opacity-75">Head of AI Engineering</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Ticker Row with Lucide Icons */}
      <section className="border-y border-[rgba(55,53,47,0.08)] bg-[#FAF9F6] py-6 px-6 overflow-hidden select-none">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-6 text-xs font-semibold text-[rgba(55,53,47,0.8)]">
          <span className="flex items-center gap-2">
            <Globe className="size-4 text-blue-600" /> 500K+ Python Developers
          </span>
          <span className="flex items-center gap-2">
            <Zap className="size-4 text-amber-500 fill-amber-500" /> 15M+ Code Executions
          </span>
          <span className="flex items-center gap-2">
            <Bot className="size-4 text-purple-600" /> 99.8% AI Bug Correction Rate
          </span>
          <span className="flex items-center gap-2">
            <BookOpen className="size-4 text-emerald-600" /> 120+ Interactive Python Courses
          </span>
          <span className="flex items-center gap-2">
            <Trophy className="size-4 text-amber-600" /> #1 Python AI Workspace on G2
          </span>
        </div>
      </section>

      {/* Section 6: Get Started Today CTA Box */}
      <section className="px-6 py-28 text-center bg-[#F7F7F5] border-t border-[rgba(55,53,47,0.09)]">
        <div className="max-w-xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-6 p-2 rounded-xl bg-white border border-[rgba(55,53,47,0.12)] shadow-xs">
            <Terminal className="size-6 text-amber-500" />
            <Sparkles className="size-6 text-purple-600" />
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-[#000000] tracking-tight mb-8">
            Start learning Python today.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-[#2383E2] hover:bg-[#1D6FBE] text-white h-11 px-7 text-sm font-semibold rounded-md border-none shadow-sm">
              <Link href="/signup">
                Get PipLearn free
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white hover:bg-[#F1F1EF] text-[#37352F] border border-[rgba(55,53,47,0.16)] h-11 px-6 text-sm font-semibold rounded-md">
              <Link href="/demo">
                Request a demo
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}



