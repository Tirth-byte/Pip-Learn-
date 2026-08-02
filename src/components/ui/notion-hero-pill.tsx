"use client";

import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";
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

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function NotionHeroPill() {
  const [index, setIndex] = useState<number>(0);
  const [textWidth, setTextWidth] = useState<number | undefined>(undefined);
  const measureRef = useRef<HTMLSpanElement>(null);

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

  // Dynamically measure the current word's width so the pill resizes smoothly per word
  const updateWidth = useCallback(() => {
    if (measureRef.current) {
      const width = measureRef.current.getBoundingClientRect().width;
      if (width > 0) {
        setTextWidth(Math.ceil(width));
      }
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    updateWidth();
  }, [index, updateWidth]);

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [updateWidth]);

  return (
    <span className="inline-flex items-center relative mx-1 sm:mx-1.5 select-none">
      {/* Hidden element for measuring exact word width */}
      <span
        ref={measureRef}
        aria-hidden="true"
        className="invisible absolute top-[-9999px] left-[-9999px] whitespace-nowrap font-extrabold tracking-tight leading-none pointer-events-none select-none"
      >
        {text}
      </span>

      {/* Outer Pill Container with smooth background color transition */}
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
        className="px-[0.45em] py-[0.15em] inline-flex items-center gap-[0.28em] text-[#000000] font-extrabold tracking-tight leading-none overflow-hidden shadow-xs relative"
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

        {/* Dynamic Word Container with smooth animated width per word & vertical slide-up transition */}
        <motion.span
          animate={{ width: textWidth !== undefined ? textWidth : "auto" }}
          transition={{
            duration: 0.42,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative inline-flex items-center overflow-hidden h-[1.15em] leading-none"
        >
          <AnimatePresence initial={false}>
            <motion.span
              key={text}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{
                duration: 0.42,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute left-0 inset-y-0 flex items-center whitespace-nowrap font-extrabold tracking-tight text-[#000000] leading-none"
            >
              {text}
            </motion.span>
          </AnimatePresence>
        </motion.span>
      </motion.span>
    </span>
  );
}





