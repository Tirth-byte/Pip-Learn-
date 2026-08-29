"use client";

import React from "react";
import { ArrowRight, Terminal, Check, Layers, Cpu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ModuleMissionProps {
  onContinue: () => void;
  onSkipToBuild: () => void;
}

export function ModuleMission({ onContinue, onSkipToBuild }: ModuleMissionProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-3xl mx-auto py-6 px-4 select-none text-neutral-900 dark:text-neutral-100">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-[#0066FF] border border-blue-200/60 dark:border-blue-900/60">
          <Sparkles className="size-3.5" />
          <span>PROJECT MISSION · UNIT 1</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Build a Smart Calculator
        </h1>
        <p className="text-neutral-600 dark:text-neutral-300 text-base leading-relaxed max-w-2xl">
          Instead of memorizing syntax in isolation, you are going to engineer a command-line arithmetic utility from scratch in Python.
        </p>
      </div>

      {/* Value Proposition Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#1A1A1A] space-y-2 shadow-2xs">
          <div className="size-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-[#0066FF] flex items-center justify-center">
            <Terminal className="size-4" />
          </div>
          <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Terminal I/O</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Learn how computer programs interact with real humans using inputs and outputs.
          </p>
        </div>

        <div className="p-4 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#1A1A1A] space-y-2 shadow-2xs">
          <div className="size-8 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Layers className="size-4" />
          </div>
          <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Data & Types</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Understand how memory holds text strings vs numbers and avoid common type traps.
          </p>
        </div>

        <div className="p-4 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#1A1A1A] space-y-2 shadow-2xs">
          <div className="size-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Cpu className="size-4" />
          </div>
          <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Applied Math</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Implement 7 arithmetic operators to produce structured, human-readable calculation receipts.
          </p>
        </div>
      </div>

      {/* Finished Outcome Preview (No source code revealed) */}
      <div className="rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-950 text-neutral-100 overflow-hidden shadow-xl">
        <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900 border-b border-neutral-800 text-xs">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-rose-500/80" />
              <span className="size-2.5 rounded-full bg-amber-500/80" />
              <span className="size-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="font-mono text-neutral-400 ml-2">Preview: Finished Program Behavior</span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-400">Target Outcome</span>
        </div>

        <div className="p-5 font-mono text-xs leading-relaxed space-y-2 text-neutral-200">
          <p className="text-neutral-400">=== PIP LEARN SMART CALCULATOR ===</p>
          <p>
            <span className="text-neutral-400">What is your name? </span>
            <span className="text-amber-300 font-bold">Alex</span>
          </p>
          <p>
            <span className="text-neutral-400">Enter first number: </span>
            <span className="text-amber-300 font-bold">45</span>
          </p>
          <p>
            <span className="text-neutral-400">Enter second number: </span>
            <span className="text-amber-300 font-bold">6</span>
          </p>
          <div className="pt-2 border-t border-neutral-800 text-neutral-300 space-y-1">
            <p className="text-neutral-400">--- CALCULATION SUMMARY FOR ALEX ---</p>
            <p>Addition (+)        : 51.0</p>
            <p>Subtraction (-)     : 39.0</p>
            <p>Multiplication (*)  : 270.0</p>
            <p>Exact Division (/)  : 7.5</p>
            <p>Floor Division (//) : 7</p>
            <p>Remainder (%)       : 3</p>
            <p>45 squared (**)     : 2025.0</p>
            <p className="text-neutral-400">====================================</p>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-200/80 dark:border-neutral-800">
        <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
          <Check className="size-4 text-emerald-500" />
          <span>4 Milestones · Estimated 45 minutes</span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            variant="ghost"
            onClick={onSkipToBuild}
            className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
          >
            Skip to Build
          </Button>

          <Button
            onClick={onContinue}
            className="h-10 px-5 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 text-xs font-bold shadow-sm transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <span>Read Essential Primer</span>
            <ArrowRight className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
