"use client";

import React from "react";
import { motion } from "motion/react";
import { Globe, Zap, Bot, BookOpen, Trophy } from "lucide-react";

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const STATS: StatItem[] = [
  {
    icon: <Globe className="size-6 text-gray-400 group-hover:text-[#111827] transition-colors duration-300" />,
    value: "500K+",
    label: "PYTHON DEVELOPERS",
  },
  {
    icon: <Zap className="size-6 text-gray-400 group-hover:text-[#111827] transition-colors duration-300" />,
    value: "15M+",
    label: "CODE EXECUTIONS",
  },
  {
    icon: <Bot className="size-6 text-gray-400 group-hover:text-[#111827] transition-colors duration-300" />,
    value: "99.8%",
    label: "BUG CORRECTION RATE",
  },
  {
    icon: <BookOpen className="size-6 text-gray-400 group-hover:text-[#111827] transition-colors duration-300" />,
    value: "120+",
    label: "INTERACTIVE COURSES",
  },
  {
    icon: <Trophy className="size-6 text-gray-400 group-hover:text-[#111827] transition-colors duration-300" />,
    value: "#1",
    label: "AI WORKSPACE ON G2",
  },
];

export function StatsBanner() {
  return (
    <section className="border-y border-[rgba(55,53,47,0.12)] bg-[#FAF9F6] py-8 sm:py-12 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-[rgba(55,53,47,0.12)]">
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`flex flex-col items-center text-center py-8 px-4 group hover:bg-white/60 transition-colors duration-300 cursor-default rounded-xl md:rounded-none ${
                idx === STATS.length - 1 ? "col-span-2 md:col-span-1" : ""
              }`}
            >
              {/* Minimalist Monochrome SVG Icon */}
              <div className="mb-3 transform group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>

              {/* Massive Bold Number */}
              <div className="text-4xl sm:text-5xl font-extrabold text-[#111827] tracking-tight leading-none">
                {stat.value}
              </div>

              {/* Spaced Small Uppercase Label */}
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[rgba(55,53,47,0.5)] mt-3 font-mono">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
