"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Terminal,
  Sparkles,
  ArrowRight,
  BookOpen,
  Code2,
  FileCode2,
  Cpu,
  Zap,
  Bot
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export function FinalCTASection() {
  return (
    <section className="relative px-6 py-32 sm:py-40 text-center bg-white border-t border-[rgba(55,53,47,0.12)] overflow-hidden select-none">
      {/* 3D Floating Element 1: Top Left - Notebook & Code Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute top-12 left-6 sm:left-14 rotate-[-8deg] hidden lg:block"
      >
        <div className="bg-white border border-[rgba(55,53,47,0.14)] rounded-2xl p-4 shadow-[0_12px_28px_rgba(0,0,0,0.08),0_4px_0_0_rgba(55,53,47,0.12)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.12),0_6px_0_0_rgba(55,53,47,0.18)] hover:-translate-y-1.5 transition-all duration-300 flex items-center gap-3 cursor-pointer group">
          <div className="size-9 rounded-xl bg-[#F7F7F5] border border-[rgba(55,53,47,0.1)] flex items-center justify-center group-hover:scale-110 transition-transform">
            <BookOpen className="size-4.5 text-[#111827]" />
          </div>
          <div className="text-left pr-1">
            <div className="font-extrabold text-xs text-[#111827]">Python 3.12</div>
            <div className="text-[10px] font-mono font-semibold text-[rgba(55,53,47,0.5)]">Curriculum</div>
          </div>
        </div>
      </motion.div>

      {/* 3D Floating Element 2: Bottom Left - PyTest & Sparkles Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute bottom-16 left-8 sm:left-20 rotate-[12deg] hidden lg:block"
      >
        <div className="bg-white border border-[rgba(55,53,47,0.14)] rounded-2xl p-4 shadow-[0_12px_28px_rgba(0,0,0,0.08),0_4px_0_0_rgba(55,53,47,0.12)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.12),0_6px_0_0_rgba(55,53,47,0.18)] hover:-translate-y-1.5 transition-all duration-300 flex items-center gap-3 cursor-pointer group">
          <div className="size-9 rounded-xl bg-[#F7F7F5] border border-[rgba(55,53,47,0.1)] flex items-center justify-center group-hover:scale-110 transition-transform">
            <FileCode2 className="size-4.5 text-[#111827]" />
          </div>
          <div className="text-left pr-1">
            <div className="font-extrabold text-xs text-[#111827]">PyTest Suite</div>
            <div className="text-[10px] font-mono font-semibold text-[rgba(55,53,47,0.5)]">Unit Generator</div>
          </div>
        </div>
      </motion.div>

      {/* 3D Floating Element 3: Top Right - Terminal & Compiler Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="absolute top-14 right-6 sm:right-14 rotate-[8deg] hidden lg:block"
      >
        <div className="bg-white border border-[rgba(55,53,47,0.14)] rounded-2xl p-4 shadow-[0_12px_28px_rgba(0,0,0,0.08),0_4px_0_0_rgba(55,53,47,0.12)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.12),0_6px_0_0_rgba(55,53,47,0.18)] hover:-translate-y-1.5 transition-all duration-300 flex items-center gap-3 cursor-pointer group">
          <div className="size-9 rounded-xl bg-[#F7F7F5] border border-[rgba(55,53,47,0.1)] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Terminal className="size-4.5 text-[#111827]" />
          </div>
          <div className="text-left pr-1">
            <div className="font-extrabold text-xs text-[#111827]">Isolated Sandbox</div>
            <div className="text-[10px] font-mono font-semibold text-[rgba(55,53,47,0.5)]">&gt;_ REPL 3.12</div>
          </div>
        </div>
      </motion.div>

      {/* 3D Floating Element 4: Bottom Right - AI Tutor Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="absolute bottom-14 right-8 sm:right-20 rotate-[-10deg] hidden lg:block"
      >
        <div className="bg-white border border-[rgba(55,53,47,0.14)] rounded-2xl p-4 shadow-[0_12px_28px_rgba(0,0,0,0.08),0_4px_0_0_rgba(55,53,47,0.12)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.12),0_6px_0_0_rgba(55,53,47,0.18)] hover:-translate-y-1.5 transition-all duration-300 flex items-center gap-3 cursor-pointer group">
          <div className="size-9 rounded-xl bg-[#F7F7F5] border border-[rgba(55,53,47,0.1)] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Bot className="size-4.5 text-[#111827]" />
          </div>
          <div className="text-left pr-1">
            <div className="font-extrabold text-xs text-[#111827]">Pip AI Tutor</div>
            <div className="text-[10px] font-mono font-semibold text-[rgba(55,53,47,0.5)]">Tracebacks</div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* 1. Top Badge: Simple white pill with 1px gray border and monochrome icons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-[rgba(55,53,47,0.16)] px-4 py-1.5 rounded-full flex items-center gap-2 text-xs font-semibold text-[#111827] mb-8 select-none shadow-none"
        >
          <Terminal className="size-3.5 text-black" />
          <span className="text-[rgba(55,53,47,0.3)]">|</span>
          <Sparkles className="size-3.5 text-black" />
          <span>AI-Powered Python Workspace</span>
        </motion.div>

        {/* 2. Headline: Massive, solid black, clean sans-serif */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-black tracking-tight mb-6 leading-[1.1]"
        >
          Start learning Python today.
        </motion.h2>

        {/* 3. Subheadline: Clean medium gray, max-w-2xl */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-[rgba(55,53,47,0.6)] max-w-2xl mx-auto font-normal leading-relaxed mb-10"
        >
          Master Python, write clean code, and execute programs side-by-side with an AI tutor.
        </motion.p>

        {/* 4. Flat, Tactile Buttons (Zero Drop Shadow, Sharp 1px Borders) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto"
        >
          {/* Primary Button (Notion Blue) */}
          <Button
            asChild
            size="lg"
            className="bg-[#2383E2] hover:bg-[#1D6FBE] text-white h-12 px-7 text-sm font-semibold rounded-md shadow-sm hover:shadow-md hover:-translate-y-0.5 border-none transition-all group flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Link href="/signup">
              <span>Get PipLearn free</span>
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>

          {/* Secondary Button (Apple Style: Pure White Background, Blue Text) */}
          <Button
            size="lg"
            variant="outline"
            onClick={() => toast("Booking a demo — our team will reach out!")}
            className="bg-white hover:bg-[#FAF9F6] text-[#2383E2] hover:text-[#1D6FBE] border border-[rgba(55,53,47,0.16)] hover:border-[#2383E2]/40 h-12 px-7 text-sm font-semibold rounded-md transition-colors w-full sm:w-auto cursor-pointer"
          >
            Request a demo
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
