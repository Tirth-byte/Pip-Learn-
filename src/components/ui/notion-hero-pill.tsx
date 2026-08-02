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
    text: "Think",
    color: "#0066FF",
    bgColor: "#EBF3FF",
  },
  {
    text: "Jam",
    color: "#8B5CF6",
    bgColor: "#F4F0FF",
  },
  {
    text: "Scale",
    color: "#0D9488",
    bgColor: "#E0F8F5",
  },
  {
    text: "Ship",
    color: "#16A34A",
    bgColor: "#E6F7EA",
  },
  {
    text: "Create",
    color: "#EA580C",
    bgColor: "#FFEFE5",
  },
  {
    text: "Build",
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
    <span className="inline-flex items-center relative select-none whitespace-nowrap align-middle mx-[0.3em]">
      {/* Outer Pill Container with smooth layout width & background color transitions */}
      <motion.span
        layout
        animate={{
          backgroundColor: bgColor,
        }}
        transition={{
          layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
          backgroundColor: { duration: 0.45, ease: "easeInOut" },
        }}
        style={{
          backgroundColor: bgColor,
          borderRadius: "9999px",
        }}
        className="px-[0.75em] py-[0.1em] inline-flex items-center gap-[0.4em] text-[#000000] font-extrabold tracking-tight leading-none overflow-hidden shadow-xs relative whitespace-nowrap select-none align-middle"
      >
        {/* Solid Circular Color Dot with smooth color transition & fixed flex-shrink: 0 */}
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
          className="w-[0.45em] h-[0.45em] min-w-[0.45em] min-h-[0.45em] rounded-full shrink-0 flex-shrink-0"
        />

        {/* Dynamic Word Container using CSS Grid with padding to prevent glyph clipping */}
        <span className="relative inline-grid grid-cols-1 grid-rows-1 items-center justify-items-start overflow-hidden h-[1.15em] px-[0.1em] leading-none whitespace-nowrap">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={text}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="col-start-1 row-start-1 whitespace-nowrap font-extrabold tracking-tight text-[#000000] leading-none flex items-center justify-start text-left m-0 align-middle"
            >
              {text}
            </motion.span>
          </AnimatePresence>
        </span>
      </motion.span>
    </span>
  );
}








