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

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % PILL_STATES.length);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  const { text, color, bgColor } = PILL_STATES[index];

  return (
    <span className="inline-flex items-center align-middle relative mx-1 sm:mx-1.5">
      {/* Outer Pill Container with smooth layout width & background transition */}
      <motion.span
        layout
        animate={{
          backgroundColor: bgColor,
        }}
        transition={{
          layout: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
          backgroundColor: { duration: 0.45, ease: "easeInOut" },
        }}
        style={{
          backgroundColor: bgColor,
          borderRadius: "9999px",
        }}
        className="px-[0.45em] py-[0.08em] inline-flex items-center gap-[0.28em] text-[#000000] font-extrabold tracking-tight select-none overflow-hidden align-middle shadow-xs relative leading-tight"
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
          className="w-[0.28em] h-[0.28em] min-w-[0.28em] min-h-[0.28em] rounded-full inline-block shrink-0 align-middle"
        />

        {/* Dynamic Word Container with Vertical Slide-Up & Opacity Fade Animation */}
        <span className="relative inline-grid grid-cols-1 grid-rows-1 items-center overflow-hidden h-[1.12em] align-middle">
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
              className="col-start-1 row-start-1 inline-block text-left font-extrabold tracking-tight text-[#000000] whitespace-nowrap leading-none align-middle"
            >
              {text}
            </motion.span>
          </AnimatePresence>
        </span>
      </motion.span>
    </span>
  );
}

