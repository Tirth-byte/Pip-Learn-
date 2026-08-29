"use client";

import React from "react";
import { Institution } from "@/lib/institutions";

interface InstitutionLogoProps {
  institution?: Institution | null;
  logoKey?: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  xs: "size-4 text-[9px]",
  sm: "size-6 text-xs",
  md: "size-9 text-sm",
  lg: "size-12 text-base",
  xl: "size-16 text-lg",
};

export function InstitutionLogo({
  institution,
  logoKey,
  name,
  size = "md",
  className = "",
}: InstitutionLogoProps) {
  const key = logoKey || institution?.logoKey || institution?.id || "";
  const instName = name || institution?.name || "Institution";

  // Dedicated SVG emblems for recognized global institutions
  if (key === "harvard") {
    return (
      <div className={`${sizeClasses[size]} shrink-0 flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 48 48" className="size-full" fill="none">
          <path d="M24 2 L4 8.5 V24 C4 35.5 12.8 44.2 24 47.5 C35.2 44.2 44 35.5 44 24 V8.5 L24 2 Z" fill="#D4AF37" />
          <path d="M24 4.5 L6.5 10.5 V23.5 C6.5 33.5 14.2 41.8 24 44.8 C33.8 41.8 41.5 33.5 41.5 23.5 V10.5 L24 4.5 Z" fill="#A51C30" />
          <rect x="11.5" y="13" width="10" height="8" rx="1" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="0.8" />
          <text x="16.5" y="19" fontSize="4.8" fontWeight="900" fontFamily="Georgia, serif" textAnchor="middle" fill="#1A1A1A">VE</text>
          <rect x="26.5" y="13" width="10" height="8" rx="1" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="0.8" />
          <text x="31.5" y="19" fontSize="4.8" fontWeight="900" fontFamily="Georgia, serif" textAnchor="middle" fill="#1A1A1A">RI</text>
          <rect x="19" y="25" width="10" height="8" rx="1" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="0.8" />
          <text x="24" y="31" fontSize="4.2" fontWeight="900" fontFamily="Georgia, serif" textAnchor="middle" fill="#1A1A1A">TAS</text>
        </svg>
      </div>
    );
  }

  if (key === "stanford") {
    return (
      <div className={`${sizeClasses[size]} shrink-0 flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 48 48" className="size-full" fill="none">
          <path d="M24 2 L4 8.5 V24 C4 35.5 12.8 44.2 24 47.5 C35.2 44.2 44 35.5 44 24 V8.5 L24 2 Z" fill="#D4AF37" />
          <path d="M24 4.5 L6.5 10.5 V23.5 C6.5 33.5 14.2 41.8 24 44.8 C33.8 41.8 41.5 33.5 41.5 23.5 V10.5 L24 4.5 Z" fill="#8C1515" />
          <text x="24" y="35" fontSize="29" fontWeight="900" fontFamily="Georgia, serif" textAnchor="middle" fill="#FFFFFF" opacity="0.95">S</text>
          <path d="M24 9 L19.5 17 H22 L17.5 24 H21 L15.5 33 H23.25 V37.5 H24.75 V33 H32.5 L27 24 H30.5 L26 17 H28.5 L24 9 Z" fill="#005A36" stroke="#FFFFFF" strokeWidth="1.25" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }

  if (key === "mit") {
    return (
      <div className={`${sizeClasses[size]} shrink-0 flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 48 48" className="size-full" fill="none">
          <rect x="3" y="6" width="7" height="36" fill="#A31D1D" rx="1" />
          <rect x="14" y="6" width="7" height="24" fill="#A31D1D" rx="1" />
          <rect x="25" y="6" width="7" height="36" fill="#A31D1D" rx="1" />
          <rect x="36" y="6" width="9" height="7" fill="#A31D1D" rx="1" />
          <rect x="38" y="15" width="7" height="27" fill="#8A8B8C" rx="1" />
          <rect x="14" y="35" width="7" height="7" fill="#8A8B8C" rx="1" />
        </svg>
      </div>
    );
  }

  if (key === "oxford") {
    return (
      <div className={`${sizeClasses[size]} shrink-0 flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 48 48" className="size-full" fill="none">
          <path d="M24 2 L4 8.5 V24 C4 35.5 12.8 44.2 24 47.5 C35.2 44.2 44 35.5 44 24 V8.5 L24 2 Z" fill="#D4AF37" />
          <path d="M24 4.5 L6.5 10.5 V23.5 C6.5 33.5 14.2 41.8 24 44.8 C33.8 41.8 41.5 33.5 41.5 23.5 V10.5 L24 4.5 Z" fill="#002147" />
          <rect x="13" y="13" width="22" height="14" rx="1.5" fill="#FFFFFF" stroke="#FDB515" strokeWidth="1.2" />
          <line x1="24" y1="13" x2="24" y2="27" stroke="#002147" strokeWidth="1" />
          <line x1="16" y1="17" x2="21" y2="17" stroke="#002147" strokeWidth="1" strokeLinecap="round" />
          <line x1="16" y1="21" x2="21" y2="21" stroke="#002147" strokeWidth="1" strokeLinecap="round" />
          <line x1="27" y1="17" x2="32" y2="17" stroke="#002147" strokeWidth="1" strokeLinecap="round" />
          <line x1="27" y1="21" x2="32" y2="21" stroke="#002147" strokeWidth="1" strokeLinecap="round" />
          <path d="M11 31 L12.5 35 H17.5 L19 31 L15 33 L11 31 Z" fill="#FDB515" stroke="#D4AF37" strokeWidth="0.5" />
          <path d="M29 31 L30.5 35 H35.5 L37 31 L33 33 L29 31 Z" fill="#FDB515" stroke="#D4AF37" strokeWidth="0.5" />
          <path d="M20 38 L21.5 42 H26.5 L28 38 L24 40 L20 38 Z" fill="#FDB515" stroke="#D4AF37" strokeWidth="0.5" />
        </svg>
      </div>
    );
  }

  if (key === "cambridge") {
    return (
      <div className={`${sizeClasses[size]} shrink-0 flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 48 48" className="size-full" fill="none">
          <path d="M24 2 L4 8.5 V24 C4 35.5 12.8 44.2 24 47.5 C35.2 44.2 44 35.5 44 24 V8.5 L24 2 Z" fill="#D4AF37" />
          <path d="M24 4.5 L6.5 10.5 V23.5 C6.5 33.5 14.2 41.8 24 44.8 C33.8 41.8 41.5 33.5 41.5 23.5 V10.5 L24 4.5 Z" fill="#A51C30" />
          <path d="M19.5 4.5 H28.5 V44.8 H19.5 Z" fill="#FDB515" opacity="0.95" />
          <path d="M6.5 19.5 H41.5 V28.5 H6.5 Z" fill="#FDB515" opacity="0.95" />
          <circle cx="13" cy="13" r="2.5" fill="#FFFFFF" />
          <circle cx="35" cy="13" r="2.5" fill="#FFFFFF" />
          <circle cx="13" cy="35" r="2.5" fill="#FFFFFF" />
          <circle cx="35" cy="35" r="2.5" fill="#FFFFFF" />
          <rect x="19" y="19" width="10" height="10" rx="1" fill="#FFFFFF" stroke="#A51C30" strokeWidth="1" />
          <line x1="24" y1="19" x2="24" y2="29" stroke="#A51C30" strokeWidth="1" />
        </svg>
      </div>
    );
  }

  if (key === "berkeley") {
    return (
      <div className={`${sizeClasses[size]} shrink-0 flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 48 48" className="size-full" fill="none">
          <circle cx="24" cy="24" r="22" fill="#003262" stroke="#FDB515" strokeWidth="2.5" />
          <text x="24" y="32" fontSize="22" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#FDB515">
            Cal
          </text>
        </svg>
      </div>
    );
  }

  if (key === "cmu") {
    return (
      <div className={`${sizeClasses[size]} shrink-0 flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 48 48" className="size-full" fill="none">
          <rect x="4" y="4" width="40" height="40" rx="8" fill="#C41230" />
          <text x="24" y="30" fontSize="15" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#FFFFFF">
            CMU
          </text>
        </svg>
      </div>
    );
  }

  if (key === "42" || key === "42-school") {
    return (
      <div className={`${sizeClasses[size]} shrink-0 flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 48 48" className="size-full" fill="none">
          <rect x="4" y="4" width="40" height="40" rx="8" fill="#000000" />
          <text x="24" y="32" fontSize="22" fontWeight="900" fontFamily="monospace" textAnchor="middle" fill="#00FFC2">
            42
          </text>
        </svg>
      </div>
    );
  }

  // Consistent dynamic monogram & color hash for any other institution
  const words = instName.split(" ").filter(Boolean);
  const initials = words.length >= 2 
    ? (words[0][0] + words[1][0]).toUpperCase()
    : instName.slice(0, 2).toUpperCase();

  const paletteIndex = Math.abs(
    instName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  ) % 6;

  const colorPalettes = [
    { bg: "bg-blue-50 dark:bg-blue-950/50", border: "border-blue-200 dark:border-blue-800/60", text: "text-blue-700 dark:text-blue-300" },
    { bg: "bg-emerald-50 dark:bg-emerald-950/50", border: "border-emerald-200 dark:border-emerald-800/60", text: "text-emerald-700 dark:text-emerald-300" },
    { bg: "bg-purple-50 dark:bg-purple-950/50", border: "border-purple-200 dark:border-purple-800/60", text: "text-purple-700 dark:text-purple-300" },
    { bg: "bg-amber-50 dark:bg-amber-950/50", border: "border-amber-200 dark:border-amber-800/60", text: "text-amber-700 dark:text-amber-300" },
    { bg: "bg-rose-50 dark:bg-rose-950/50", border: "border-rose-200 dark:border-rose-800/60", text: "text-rose-700 dark:text-rose-300" },
    { bg: "bg-indigo-50 dark:bg-indigo-950/50", border: "border-indigo-200 dark:border-indigo-800/60", text: "text-indigo-700 dark:text-indigo-300" },
  ];

  const palette = colorPalettes[paletteIndex];

  return (
    <div
      className={`${sizeClasses[size]} rounded-xl border flex items-center justify-center font-bold tracking-tight shrink-0 shadow-2xs ${palette.bg} ${palette.border} ${palette.text} ${className}`}
      title={instName}
    >
      <span>{initials}</span>
    </div>
  );
}
