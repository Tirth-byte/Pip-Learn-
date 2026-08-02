"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Terminal, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export function FinalCTASection() {
  return (
    <section className="relative px-6 py-28 sm:py-36 text-center bg-[#FAF9F6] border-t border-[rgba(55,53,47,0.1)] overflow-hidden select-none">
      {/* 1. Dot-Grid Pattern Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.2px,transparent_1.2px)] [background-size:20px_20px] opacity-70 pointer-events-none" />

      {/* Glowing Soft Blurred Gradient Overlay Behind Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-amber-400/20 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* 2. The Animated Gradient Border Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative p-[1.5px] rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500 mb-8 shadow-sm group cursor-default"
        >
          <div className="bg-white px-4 py-1.5 rounded-full flex items-center gap-2 text-xs font-semibold text-[#111827]">
            <Terminal className="size-3.5 text-amber-600" />
            <span className="text-[rgba(55,53,47,0.3)]">|</span>
            <Sparkles className="size-3.5 text-purple-600" />
            <span>AI-Powered Python Workspace</span>
          </div>
        </motion.div>

        {/* 3. Typography & Spacing */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#111827] tracking-tight mb-6 leading-[1.1]"
        >
          Start learning Python today.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-[rgba(55,53,47,0.65)] max-w-2xl mx-auto font-normal leading-relaxed mb-10"
        >
          Master Python, write clean code, and execute programs side-by-side with an AI tutor built for learners and engineers.
        </motion.p>

        {/* 4. High-Fidelity Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto"
        >
          <Button
            asChild
            size="lg"
            className="bg-[#2383E2] hover:bg-[#1D6FBE] text-white h-12 px-7 text-sm font-semibold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all group flex items-center justify-center gap-2 border-none w-full sm:w-auto"
          >
            <Link href="/signup">
              <span>Get PipLearn free</span>
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-white hover:bg-[#F7F7F5] text-[#37352F] border border-[rgba(55,53,47,0.18)] h-12 px-7 text-sm font-semibold rounded-xl shadow-xs hover:border-black/30 transition-all w-full sm:w-auto"
          >
            <Link href="/demo">Request a demo</Link>
          </Button>
        </motion.div>

        {/* 5. Social Proof / Trust Anchor */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3 text-sm text-[rgba(55,53,47,0.7)] font-medium"
        >
          {/* Overlapping User Avatars */}
          <div className="flex items-center -space-x-2.5">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="User"
              className="size-8 rounded-full border-2 border-white object-cover shadow-xs"
            />
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
              alt="User"
              className="size-8 rounded-full border-2 border-white object-cover shadow-xs"
            />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
              alt="User"
              className="size-8 rounded-full border-2 border-white object-cover shadow-xs"
            />
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
              alt="User"
              className="size-8 rounded-full border-2 border-white object-cover shadow-xs"
            />
            <img
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80"
              alt="User"
              className="size-8 rounded-full border-2 border-white object-cover shadow-xs"
            />
          </div>

          {/* Stars & Text */}
          <div className="flex items-center gap-1.5 ml-1">
            <div className="flex text-amber-400 text-sm">★★★★★</div>
            <span className="font-semibold text-xs sm:text-sm text-[rgba(55,53,47,0.8)]">
              Join 500K+ developers
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
