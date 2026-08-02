"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Terminal, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export function FinalCTASection() {
  return (
    <section className="relative px-6 py-32 sm:py-40 text-center bg-white border-t border-[rgba(55,53,47,0.12)] overflow-hidden select-none">
      {/* Hand-Drawn Monochrome Line-Art Illustration 1: Top Left - Open Notebook */}
      <div className="absolute top-12 left-6 sm:left-16 rotate-[-8deg] opacity-65 hover:opacity-100 transition-opacity hidden lg:block pointer-events-none">
        <svg viewBox="0 0 64 64" className="w-16 h-16 sm:w-20 sm:h-20" fill="none" stroke="#37352F" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          {/* Notebook Outline */}
          <rect x="8" y="10" width="48" height="44" rx="4" fill="white" />
          {/* Spine Divider */}
          <line x1="32" y1="10" x2="32" y2="54" strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Spiral Binding Rings */}
          <path d="M28 14 H36 M28 22 H36 M28 30 H36 M28 38 H36 M28 46 H36" />
          {/* Page Lines Left */}
          <line x1="14" y1="20" x2="26" y2="20" opacity="0.6" />
          <line x1="14" y1="28" x2="26" y2="28" opacity="0.6" />
          <line x1="14" y1="36" x2="26" y2="36" opacity="0.6" />
          {/* Page Lines Right */}
          <line x1="38" y1="20" x2="50" y2="20" opacity="0.6" />
          <line x1="38" y1="28" x2="50" y2="28" opacity="0.6" />
          <line x1="38" y1="36" x2="50" y2="36" opacity="0.6" />
        </svg>
      </div>

      {/* Hand-Drawn Monochrome Line-Art Illustration 2: Bottom Left - Graphite Pencil */}
      <div className="absolute bottom-16 left-8 sm:left-24 rotate-[14deg] opacity-65 hover:opacity-100 transition-opacity hidden lg:block pointer-events-none">
        <svg viewBox="0 0 64 64" className="w-14 h-14 sm:w-16 sm:h-16" fill="none" stroke="#37352F" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          {/* Pencil Body */}
          <polygon points="12,48 42,18 48,24 18,54" fill="white" />
          {/* Pencil Tip */}
          <polygon points="12,48 18,54 8,56" fill="#37352F" />
          {/* Eraser End */}
          <path d="M42 18 L48 24 L52 20 L46 14 Z" />
          <line x1="40" y1="20" x2="46" y2="26" />
        </svg>
      </div>

      {/* Hand-Drawn Monochrome Line-Art Illustration 3: Top Right - Terminal Window (>_) */}
      <div className="absolute top-14 right-6 sm:right-16 rotate-[6deg] opacity-65 hover:opacity-100 transition-opacity hidden lg:block pointer-events-none">
        <svg viewBox="0 0 64 64" className="w-16 h-16 sm:w-20 sm:h-20" fill="none" stroke="#37352F" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          {/* Terminal Window Frame */}
          <rect x="8" y="12" width="48" height="40" rx="4" fill="white" />
          {/* Window Header Line */}
          <line x1="8" y1="22" x2="56" y2="22" />
          {/* macOS Dots */}
          <circle cx="15" cy="17" r="1.5" fill="#37352F" />
          <circle cx="21" cy="17" r="1.5" fill="#37352F" />
          <circle cx="27" cy="17" r="1.5" fill="#37352F" />
          {/* Command Prompt >_ */}
          <path d="M16 30 L23 35 L16 40" />
          <line x1="27" y1="40" x2="36" y2="40" strokeWidth="2" />
        </svg>
      </div>

      {/* Hand-Drawn Monochrome Line-Art Illustration 4: Bottom Right - Coffee Cup */}
      <div className="absolute bottom-14 right-8 sm:right-24 rotate-[-10deg] opacity-65 hover:opacity-100 transition-opacity hidden lg:block pointer-events-none">
        <svg viewBox="0 0 64 64" className="w-14 h-14 sm:w-16 sm:h-16" fill="none" stroke="#37352F" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          {/* Mug Body */}
          <rect x="16" y="20" width="28" height="32" rx="4" fill="white" />
          {/* Mug Handle */}
          <path d="M44 26 C52 26 52 42 44 42" />
          {/* Steam Swirls */}
          <path d="M22 14 C22 10 24 10 24 6" opacity="0.7" />
          <path d="M30 14 C30 10 32 10 32 6" opacity="0.7" />
          <path d="M38 14 C38 10 40 10 40 6" opacity="0.7" />
        </svg>
      </div>

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
          {/* Primary Button */}
          <Button
            asChild
            size="lg"
            className="bg-black hover:bg-[#2F2F2F] text-white h-12 px-7 text-sm font-semibold rounded-md shadow-none border-none transition-colors group flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Link href="/signup">
              <span>Get PipLearn free</span>
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>

          {/* Secondary Button */}
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-white hover:bg-[#F7F7F5] text-[#37352F] border border-[rgba(55,53,47,0.18)] h-12 px-7 text-sm font-semibold rounded-md shadow-none transition-colors w-full sm:w-auto"
          >
            <Link href="/demo">Request a demo</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
