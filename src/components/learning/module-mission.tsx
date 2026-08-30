"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ModuleMissionProps {
  onContinue: () => void;
  onSkipToBuild: () => void;
}

export function ModuleMission({ onContinue, onSkipToBuild }: ModuleMissionProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-2xl mx-auto py-4 px-4 select-none text-neutral-900 dark:text-neutral-100">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-[#0066FF] border border-blue-200/60 dark:border-blue-900/60">
          <Sparkles className="size-3" />
          <span>PROJECT 1</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Build a Smart Calculator
        </h1>

        <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
          You'll build a Python program that talks to a user, asks for their name and numbers, and prints clean calculation results.
        </p>
      </div>

      {/* Visual Centerpiece: Finished Program Preview */}
      <div className="rounded-2xl border border-neutral-800 bg-[#0F0F11] text-neutral-100 overflow-hidden shadow-xl">
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#18181B] border-b border-neutral-800 text-xs">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-[#FF5F56]" />
              <span className="size-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="size-2.5 rounded-full bg-[#27C93F]" />
            </div>
            <span className="font-mono text-neutral-400 text-[11px] ml-2">What you're building</span>
          </div>
          <span className="text-[11px] font-medium text-emerald-400">Final Outcome</span>
        </div>

        <div className="p-5 font-mono text-xs leading-relaxed space-y-2 text-neutral-300 bg-[#0F0F11]">
          <p className="text-neutral-500">=== SMART CALCULATOR ===</p>
          <p>
            <span className="text-neutral-400">What is your name? </span>
            <span className="text-amber-300 font-semibold underline underline-offset-4 decoration-amber-400/50">Alex</span>
          </p>
          <p className="text-emerald-400">Hello, Alex! Let's do some math.</p>
          <p>
            <span className="text-neutral-400">Enter first number: </span>
            <span className="text-amber-300 font-semibold underline underline-offset-4 decoration-amber-400/50">45</span>
          </p>
          <p>
            <span className="text-neutral-400">Enter second number: </span>
            <span className="text-amber-300 font-semibold underline underline-offset-4 decoration-amber-400/50">6</span>
          </p>
          <div className="pt-2 border-t border-neutral-800/80 text-neutral-300 space-y-1 text-[11px]">
            <p className="text-neutral-500">--- RESULTS FOR ALEX ---</p>
            <p>Addition (+)        : 51.0</p>
            <p>Subtraction (-)     : 39.0</p>
            <p>Multiplication (*)  : 270.0</p>
            <p>Division (/)        : 7.5</p>
            <p className="text-neutral-500">========================</p>
          </div>
        </div>
      </div>

      {/* Quiet Project Highlights */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-500 dark:text-neutral-400 py-1">
        <span>Step 1: Welcome &amp; user name</span>
        <span>•</span>
        <span>Step 2: Number conversion</span>
        <span>•</span>
        <span>Step 3: Math operations</span>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Button
          onClick={onContinue}
          className="h-11 px-6 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 text-xs font-bold shadow-sm transition-all flex items-center gap-2 w-full sm:w-auto justify-center cursor-pointer"
        >
          <span>Read 2-Minute Primer</span>
          <ArrowRight className="size-3.5" />
        </Button>

        <Button
          variant="ghost"
          onClick={onSkipToBuild}
          className="h-11 px-4 text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
        >
          Skip directly to code
        </Button>
      </div>
    </div>
  );
}
