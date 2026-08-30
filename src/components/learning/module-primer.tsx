"use client";

import React from "react";
import { ArrowRight, ArrowLeft, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ModulePrimerProps {
  onStartBuilding: () => void;
  onBackToMission: () => void;
}

export function ModulePrimer({ onStartBuilding, onBackToMission }: ModulePrimerProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-2xl mx-auto py-4 px-4 select-none text-neutral-900 dark:text-neutral-100">
      {/* Header */}
      <div className="space-y-1">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Essential Primer · 2-min read
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          The 4 Tools for Milestone 1
        </h1>
        <p className="text-neutral-600 dark:text-neutral-300 text-sm">
          Everything you need to write your first milestone. Scan these 4 tools, then go code.
        </p>
      </div>

      {/* Scannable Launchpad Sections */}
      <div className="space-y-4 pt-1">
        {/* 1. Top to Bottom */}
        <div className="space-y-1 pb-3 border-b border-neutral-200/60 dark:border-neutral-800/60">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-neutral-400 font-mono">01</span>
            <h2 className="text-sm font-bold text-neutral-900 dark:text-white">
              Python runs line by line
            </h2>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed pl-6">
            Your program executes from top to bottom, one step at a time. It will not jump ahead.
          </p>
        </div>

        {/* 2. print() */}
        <div className="space-y-1.5 pb-3 border-b border-neutral-200/60 dark:border-neutral-800/60">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-neutral-400 font-mono">02</span>
            <h2 className="text-sm font-bold text-neutral-900 dark:text-white">
              Show text with <code className="font-mono text-xs bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-[#0066FF] dark:text-blue-400">print()</code>
            </h2>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed pl-6">
            Put quotes around whatever words or messages you want to display on screen:
          </p>
          <div className="ml-6 px-3 py-2 rounded-xl bg-[#0F0F11] border border-neutral-800 font-mono text-xs text-neutral-200">
            <span className="text-sky-400">print</span>(<span className="text-emerald-400">&quot;=== SMART CALCULATOR ===&quot;</span>)
          </div>
        </div>

        {/* 3. Variables */}
        <div className="space-y-1.5 pb-3 border-b border-neutral-200/60 dark:border-neutral-800/60">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-neutral-400 font-mono">03</span>
            <h2 className="text-sm font-bold text-neutral-900 dark:text-white">
              Save values in variables
            </h2>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed pl-6">
            Use <code className="font-mono text-xs bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-neutral-800 dark:text-neutral-200">=</code> to store values in memory so your program can reuse them:
          </p>
          <div className="ml-6 px-3 py-2 rounded-xl bg-[#0F0F11] border border-neutral-800 font-mono text-xs text-neutral-200 space-y-0.5">
            <p>name = <span className="text-emerald-400">&quot;Alex&quot;</span></p>
            <p><span className="text-sky-400">print</span>(<span className="text-emerald-400">&quot;Hello, &quot;</span> + name)</p>
          </div>
        </div>

        {/* 4. input() */}
        <div className="space-y-1.5 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-neutral-400 font-mono">04</span>
            <h2 className="text-sm font-bold text-neutral-900 dark:text-white">
              Ask for input with <code className="font-mono text-xs bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-[#0066FF] dark:text-blue-400">input()</code>
            </h2>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed pl-6">
            <code className="font-mono text-xs">input(...)</code> displays a prompt and waits for the user to type their response and press Enter:
          </p>
          <div className="ml-6 px-3 py-2 rounded-xl bg-[#0F0F11] border border-neutral-800 font-mono text-xs text-neutral-200 space-y-0.5">
            <p>name = <span className="text-sky-400">input</span>(<span className="text-emerald-400">&quot;What is your name? &quot;</span>)</p>
            <p><span className="text-sky-400">print</span>(<span className="text-emerald-400">&quot;Welcome, &quot;</span> + name)</p>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-neutral-200/60 dark:border-neutral-800/60">
        <Button
          variant="ghost"
          onClick={onBackToMission}
          className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Mission</span>
        </Button>

        <Button
          onClick={onStartBuilding}
          className="h-11 px-6 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 text-xs font-bold shadow-sm transition-all flex items-center gap-2 w-full sm:w-auto justify-center cursor-pointer"
        >
          <Terminal className="size-4" />
          <span>Start Building Milestone 1</span>
          <ArrowRight className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
