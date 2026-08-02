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

  // Accurately measure the text width without causing layout shifts or text scaling distortion
  const updateWidth = useCallback(() => {
    if (measureRef.current) {
      const width = measureRef.current.getBoundingClientRect().width;
      if (width > 0) {
        setTextWidth(width);
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
    <span className="inline-flex items-center align-middle relative mx-1 sm:mx-1.5 select-none">
      {/* Hidden element for measuring exact text width */}
      <span
        ref={measureRef}
        aria-hidden="true"
        className="invisible absolute top-[-9999px] left-[-9999px] whitespace-nowrap font-extrabold tracking-tight pointer-events-none select-none"
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
        className="px-[0.45em] py-[0.08em] inline-flex items-center gap-[0.28em] text-[#000000] font-extrabold tracking-tight overflow-hidden align-middle shadow-xs relative leading-tight"
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

        {/* Dynamic Word Container with smooth width & vertical slide-up transition */}
        <motion.span
          animate={{ width: textWidth !== undefined ? textWidth : "auto" }}
          transition={{
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative inline-block overflow-hidden h-[1.18em] align-middle"
        >
          <AnimatePresence initial={false}>
            <motion.span
              key={text}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute left-0 top-0 whitespace-nowrap font-extrabold tracking-tight text-[#000000] leading-none align-middle"
            >
              {text}
            </motion.span>
          </AnimatePresence>
        </motion.span>
      </motion.span>
    </span>
  );
}


