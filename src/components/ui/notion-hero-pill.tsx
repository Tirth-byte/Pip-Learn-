"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PillState {
  text: string;
  color: string;
  bgColor: string;
  width: string;
}

const PILL_STATES: PillState[] = [
  {
    text: "code",
    color: "#0066FF",
    bgColor: "#EBF3FF",
    width: "4.1em",
  },
  {
    text: "debug",
    color: "#8B5CF6",
    bgColor: "#F4F0FF",
    width: "4.8em",
  },
  {
    text: "ship",
    color: "#16A34A",
    bgColor: "#E6F7EA",
    width: "4.0em",
  },
  {
    text: "master",
    color: "#0D9488",
    bgColor: "#E0F8F5",
    width: "5.5em",
  },
  {
    text: "build",
    color: "#EA580C",
    bgColor: "#FFEFE5",
    width: "4.6em",
  },
  {
    text: "solve",
    color: "#EAB308",
    bgColor: "#FFFBE5",
    width: "4.6em",
  },
];

export function NotionHeroPill() {
  const [index, setIndex] = useState<number>(0);

  // Timer interval to cycle through PILL_STATES every 2500ms
  useEffect(() => {
    const timer = setInterval(() => {
      if (typeof document === "undefined" || document.visibilityState === "visible") {
        setIndex((prev) => (prev + 1) % PILL_STATES.length);
      }
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  const { text, color, bgColor, width } = PILL_STATES[index];

  return (
    <span className="inline-flex items-center justify-center relative mx-1 select-none whitespace-nowrap align-middle shrink-0">
      {/* Outer Pill Container: Fixed left-to-right flex alignment (justify-start) with continuous 60fps width morphing */}
      <motion.span
        animate={{
          backgroundColor: bgColor,
          width: width,
        }}
        transition={{
          width: {
            duration: 0.48,
            ease: [0.16, 1, 0.3, 1],
          },
          backgroundColor: { duration: 0.48, ease: [0.16, 1, 0.3, 1] },
        }}
        style={{
          backgroundColor: bgColor,
          borderRadius: "9999px",
        }}
        className="h-[1.5em] pl-[0.55em] pr-[0.5em] inline-flex items-center justify-start gap-[0.32em] text-[#000000] font-extrabold tracking-tight leading-none overflow-hidden shadow-xs relative whitespace-nowrap select-none align-middle transform-gpu shrink-0"
      >
        {/* Solid Circular Color Dot: Permanently pinned at x = 0.55em from left edge */}
        <motion.span
          animate={{
            backgroundColor: color,
          }}
          transition={{
            duration: 0.48,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            backgroundColor: color,
          }}
          className="w-[0.28em] h-[0.28em] min-w-[0.28em] min-h-[0.28em] rounded-full shrink-0"
        />

        {/* Dynamic Word Container: Left-aligned with comfortable padding buffer to prevent text clipping */}
        <span className="relative inline-grid grid-cols-1 grid-rows-1 items-center justify-start overflow-hidden h-[1.22em] px-[0.06em] leading-none whitespace-nowrap">
          <AnimatePresence initial={false}>
            <motion.span
              key={text}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{
                y: {
                  duration: 0.42,
                  ease: [0.16, 1, 0.3, 1],
                },
                opacity: { duration: 0.28 },
              }}
              className="col-start-1 row-start-1 whitespace-nowrap font-extrabold tracking-tight text-[#000000] leading-none flex items-center justify-start text-left align-middle px-[0.04em]"
            >
              {text}
            </motion.span>
          </AnimatePresence>
        </span>
      </motion.span>
    </span>
  );
}
