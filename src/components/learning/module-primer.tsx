"use client";

import React, { useState } from "react";
import { ArrowRight, BookOpen, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ModulePrimerProps {
  onStartBuilding: () => void;
  onBackToMission: () => void;
}

export function ModulePrimer({ onStartBuilding, onBackToMission }: ModulePrimerProps) {
  const [microRunResult, setMicroRunResult] = useState<string | null>(null);

  const handleTestSnippet = () => {
    setMicroRunResult("Welcome to PipLearn, Engineer!\nProgram completed.");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-3xl mx-auto py-6 px-4 select-none text-neutral-900 dark:text-neutral-100">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-900/60">
          <BookOpen className="size-3.5" />
          <span>ESSENTIAL PRIMER · 3 MIN READ</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          How Python Thinks: The Core Loop
        </h1>
        <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed max-w-2xl">
          Everything you need to know to begin Milestone 1. Read these 4 short concepts, then start writing code immediately.
        </p>
      </div>

      {/* Concept Cards Stack */}
      <div className="space-y-4">
        {/* Card 1: The Recipe Model */}
        <div className="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#1A1A1A] space-y-3 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <span className="size-6 rounded-full bg-blue-100 dark:bg-blue-950/80 text-[#0066FF] text-xs font-bold flex items-center justify-center">
              1
            </span>
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              The Recipe Mental Model
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-8">
            Python reads your file like a cooking recipe: <strong>from top to bottom, one instruction at a time</strong>. It will never skip ahead or run line 3 before line 2 has finished.
          </p>
        </div>

        {/* Card 2: Print Statements */}
        <div className="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#1A1A1A] space-y-3 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <span className="size-6 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-600 text-xs font-bold flex items-center justify-center">
              2
            </span>
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              Displaying Text with <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-purple-600 dark:text-purple-300 font-mono">print()</code>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-8">
            To show a message on the terminal screen, pass a text string enclosed in quotes to <code className="font-mono text-xs">print()</code>:
          </p>
          <div className="ml-8 p-3 rounded-xl bg-neutral-950 text-neutral-200 font-mono text-xs overflow-x-auto border border-neutral-800">
            <span className="text-sky-400">print</span>(<span className="text-emerald-400">&quot;=== SMART CALCULATOR ===&quot;</span>)
          </div>
        </div>

        {/* Card 3: Variables */}
        <div className="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#1A1A1A] space-y-3 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <span className="size-6 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-600 text-xs font-bold flex items-center justify-center">
              3
            </span>
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              Storing Data in Variables
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-8">
            A variable is a named label for data in memory. Use <code className="font-mono text-xs">=</code> to store values so your program can use them later:
          </p>
          <div className="ml-8 p-3 rounded-xl bg-neutral-950 text-neutral-200 font-mono text-xs overflow-x-auto border border-neutral-800 space-y-1">
            <p>user_name = <span className="text-emerald-400">&quot;Alex&quot;</span></p>
            <p><span className="text-sky-400">print</span>(<span className="text-emerald-400">&quot;Welcome, &quot;</span> + user_name)</p>
          </div>
        </div>

        {/* Card 4: Interactive Input */}
        <div className="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#1A1A1A] space-y-3 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <span className="size-6 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 text-xs font-bold flex items-center justify-center">
              4
            </span>
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              Asking for User Input with <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-emerald-600 dark:text-emerald-300 font-mono">input()</code>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-8">
            The <code className="font-mono text-xs">input()</code> function prints a prompt and <strong>pauses program execution</strong> until the user types their answer and hits Enter:
          </p>
          <div className="ml-8 p-3 rounded-xl bg-neutral-950 text-neutral-200 font-mono text-xs overflow-x-auto border border-neutral-800 space-y-1">
            <p>user_name = <span className="text-sky-400">input</span>(<span className="text-emerald-400">&quot;What is your name? &quot;</span>)</p>
            <p><span className="text-sky-400">print</span>(<span className="text-emerald-400">&quot;Hello &quot;</span> + user_name)</p>
          </div>
        </div>
      </div>

      {/* Interactive Micro-Check */}
      <div className="p-5 rounded-2xl border border-blue-200/80 dark:border-blue-900/50 bg-blue-50/40 dark:bg-blue-950/20 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-[#0066FF]" />
            <span className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
              Micro-Check: Test the Concept
            </span>
          </div>
          <Button
            size="sm"
            onClick={handleTestSnippet}
            className="h-7 px-3 rounded-lg bg-[#0066FF] hover:bg-blue-600 text-white text-xs font-bold"
          >
            <Play className="size-3 mr-1" />
            <span>Simulate Run</span>
          </Button>
        </div>

        <div className="p-3 rounded-xl bg-neutral-950 text-neutral-200 font-mono text-xs overflow-x-auto border border-neutral-800 space-y-1">
          <p className="text-neutral-500"># Micro-snippet test</p>
          <p>name = <span className="text-emerald-400">&quot;Engineer&quot;</span></p>
          <p><span className="text-sky-400">print</span>(<span className="text-emerald-400">&quot;Welcome to PipLearn, &quot;</span> + name + <span className="text-emerald-400">&quot;!&quot;</span>)</p>
        </div>

        {microRunResult && (
          <div className="p-3 rounded-xl bg-neutral-900 border border-emerald-500/40 text-emerald-300 font-mono text-xs animate-in fade-in duration-200">
            <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Terminal Output:</span>
            {microRunResult}
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-200/80 dark:border-neutral-800">
        <Button
          variant="ghost"
          onClick={onBackToMission}
          className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
        >
          ← Back to Mission
        </Button>

        <Button
          onClick={onStartBuilding}
          className="h-10 px-6 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 text-xs font-bold shadow-md transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <span>Start Building Milestone 1</span>
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
