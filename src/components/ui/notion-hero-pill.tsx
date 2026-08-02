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
  const [maxTextWidth, setMaxTextWidth] = useState<number | undefined>(undefined);
  const measureContainerRef = useRef<HTMLSpanElement>(null);

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

  // Measure the maximum word width across all PILL_STATES for a consistent pill size
  const updateMaxWidth = useCallback(() => {
    if (measureContainerRef.current) {
      const wordElements = measureContainerRef.current.querySelectorAll<HTMLSpanElement>("span");
      let maxW = 0;
      wordElements.forEach((el) => {
        const w = el.getBoundingClientRect().width;
        if (w > maxW) maxW = w;
      });
      if (maxW > 0) {
        // Add tiny subpixel buffer (0.5px) for consistent crisp rendering
        setMaxTextWidth(Math.ceil(maxW + 0.5));
      }
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    updateMaxWidth();
  }, [updateMaxWidth]);

  useEffect(() => {
    window.addEventListener("resize", updateMaxWidth);
    return () => window.removeEventListener("resize", updateMaxWidth);
  }, [updateMaxWidth]);

  return (
    <span className="inline-flex items-center align-middle relative mx-1 sm:mx-1.5 select-none">
      {/* Hidden elements for measuring max word width */}
      <span
        ref={measureContainerRef}
        aria-hidden="true"
        className="invisible absolute top-[-9999px] left-[-9999px] whitespace-nowrap font-extrabold tracking-tight pointer-events-none select-none"
      >
        {PILL_STATES.map((s) => (
          <span key={s.text} className="inline-block">
            {s.text}
          </span>
        ))}
      </span>

      {/* Outer Pill Container with smooth background color transition & consistent height/padding */}
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
        className="px-[0.55em] py-[0.1em] inline-flex items-center gap-[0.3em] text-[#000000] font-extrabold tracking-tight overflow-hidden align-middle shadow-xs relative leading-tight"
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

        {/* Dynamic Word Container with consistent fixed width & vertical slide-up transition */}
        <span
          style={{ width: maxTextWidth !== undefined ? `${maxTextWidth}px` : "auto" }}
          className="relative inline-flex items-center justify-center overflow-hidden h-[1.18em] align-middle"
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
              className="absolute left-0 right-0 top-0 text-center whitespace-nowrap font-extrabold tracking-tight text-[#000000] leading-none align-middle"
            >
              {text}
            </motion.span>
          </AnimatePresence>
        </span>
      </motion.span>
    </span>
  );
}



