"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PillState {
  text: string;
  color: string;
  bgColor: string;
}

const PILL_STATES: PillState[] = [
  {
    text: "code",
    color: "#0066FF",
    bgColor: "#EBF3FF",
  },
  {
    text: "debug",
    color: "#8B5CF6",
    bgColor: "#F4F0FF",
  },
  {
    text: "ship",
    color: "#16A34A",
    bgColor: "#E6F7EA",
  },
  {
    text: "master",
    color: "#0D9488",
    bgColor: "#E0F8F5",
  },
  {
    text: "build",
    color: "#EA580C",
    bgColor: "#FFEFE5",
  },
  {
    text: "solve",
    color: "#EAB308",
    bgColor: "#FFFBE5",
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

  const { text, color, bgColor } = PILL_STATES[index];

  return (
    <span className="inline-flex items-center justify-center relative mx-1 select-none whitespace-nowrap align-middle shrink-0">
      {/* Outer Pill Container with fixed slot width and smooth background color transition */}
      <motion.span
        animate={{
          backgroundColor: bgColor,
        }}
        transition={{
          backgroundColor: { duration: 0.45, ease: "easeInOut" },
        }}
        style={{
          backgroundColor: bgColor,
          borderRadius: "9999px",
        }}
        className="w-[4.6em] sm:w-[4.8em] h-[1.5em] px-[0.5em] inline-flex items-center justify-center gap-[0.3em] text-[#000000] font-extrabold tracking-tight leading-none overflow-hidden shadow-xs relative whitespace-nowrap select-none align-middle shrink-0"
      >
        {/* Solid Circular Color Dot with smooth color transition */}
        <motion.span
          animate={{
            backgroundColor: color,
          }}
          transition={{
            duration: 0.45,
            ease: "easeInOut",
          }}
          style={{
            backgroundColor: color,
          }}
          className="w-[0.28em] h-[0.28em] min-w-[0.28em] min-h-[0.28em] rounded-full shrink-0"
        />

        {/* Dynamic Word Container using CSS Grid with subpixel padding buffer */}
        <span className="relative inline-grid grid-cols-1 grid-rows-1 items-center justify-center overflow-hidden h-[1.18em] px-[0.04em] leading-none whitespace-nowrap">
          <AnimatePresence initial={false}>
            <motion.span
              key={text}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{
                duration: 0.38,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="col-start-1 row-start-1 whitespace-nowrap font-extrabold tracking-tight text-[#000000] leading-none flex items-center justify-center text-center align-middle px-[0.04em]"
            >
              {text}
            </motion.span>
          </AnimatePresence>
        </span>
      </motion.span>
    </span>
  );
}






