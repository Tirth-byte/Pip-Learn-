"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const WORDS = ["Think", "Jam", "Scale", "Ship", "Create", "Build"];

export function AnimationProof() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const word = WORDS[index];

  return (
    <div
      style={{
        width: "200px",
        height: "40px",
        overflow: "hidden",
        border: "1px solid #ccc",
        position: "relative",
        display: "inline-block",
        lineHeight: "40px",
        textAlign: "center",
        fontSize: "24px",
        fontWeight: "bold",
      }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={word}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
          }}
        >
          {word}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
