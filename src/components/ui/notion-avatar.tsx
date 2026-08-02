"use client";

import React from "react";

interface NotionAvatarProps {
  seed: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  hasShadow?: boolean;
}

const sizeMap = {
  sm: "size-7 border-[2px]",
  md: "size-10 border-[2.5px]",
  lg: "size-12 border-[3px]",
  xl: "size-14 border-[3px]",
  "2xl": "size-20 border-[4px]",
};

function getStickerIndex(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 7;
}

export function NotionAvatar({
  seed,
  size = "md",
  className = "",
  hasShadow = true,
}: NotionAvatarProps) {
  const index = getStickerIndex(seed);
  const sizeClass = sizeMap[size] || sizeMap.md;

  const shadowClass = hasShadow
    ? "shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3.5px_3.5px_0px_0px_rgba(0,0,0,1)]"
    : "";

  const renderStickerSvg = () => {
    switch (index) {
      case 0:
        // 1. Girl Avatar - Blue Ring, White BG
        return (
          <div className={`relative rounded-full border-[#007BFF] bg-white overflow-hidden shrink-0 transition-all duration-200 ${sizeClass} ${shadowClass} ${className}`}>
            <svg viewBox="0 0 80 80" className="size-full">
              <path d="M 18 42 C 16 28 26 16 40 16 C 54 16 64 28 62 42 C 60 58 56 66 54 68 C 50 52 50 48 40 48 C 30 48 30 52 26 68 C 24 66 20 58 18 42 Z" fill="#000000" />
              <ellipse cx="40" cy="47" rx="17" ry="19" fill="#FFFFFF" stroke="#000000" strokeWidth="2.5" />
              <path d="M 23 38 C 28 24 35 22 40 32 C 45 22 52 24 57 38 C 52 30 46 28 40 34 C 34 28 28 30 23 38 Z" fill="#000000" />
              <path d="M 31 46 Q 35 50 37 46" stroke="#000000" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              <path d="M 43 46 Q 45 50 49 46" stroke="#000000" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              <path d="M 29 44 L 31 46" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 51 44 L 49 46" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 40 47 L 39 52 L 41 52" stroke="#000000" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 37 57 Q 40 59 43 57" stroke="#000000" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            </svg>
          </div>
        );

      case 1:
        // 2. Minimalist Face - Black Ring, White BG
        return (
          <div className={`relative rounded-full border-black bg-white overflow-hidden shrink-0 transition-all duration-200 ${sizeClass} ${shadowClass} ${className}`}>
            <svg viewBox="0 0 80 80" className="size-full">
              <path d="M 26 28 Q 33 18 41 24" stroke="#000000" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 48 24 Q 55 18 61 23" stroke="#000000" strokeWidth="3" fill="none" strokeLinecap="round" />
              <circle cx="38" cy="30" r="3.2" fill="#000000" />
              <circle cx="55" cy="27" r="3.2" fill="#000000" />
              <path d="M 41 26 L 31 55 L 43 55" stroke="#000000" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        );

      case 2:
        // 3. Red Signpost Icon - Solid Red BG, Black Ring
        return (
          <div className={`relative rounded-full border-black bg-[#FF3B30] overflow-hidden shrink-0 transition-all duration-200 ${sizeClass} ${shadowClass} ${className}`}>
            <svg viewBox="0 0 80 80" className="size-full">
              <rect x="36" y="42" width="7" height="28" fill="#FFFFFF" stroke="#000000" strokeWidth="2.5" rx="1" />
              <path d="M 18 20 H 52 L 68 32 L 52 44 H 18 Z" fill="#FFFFFF" stroke="#000000" strokeWidth="3" strokeLinejoin="round" />
              <circle cx="32" cy="32" r="3" fill="#000000" />
              <circle cx="42" cy="32" r="3" fill="#000000" />
            </svg>
          </div>
        );

      case 3:
        // 4. Person with Pencil in Hair - Gold Ring, White BG
        return (
          <div className={`relative rounded-full border-[#FFB800] bg-white overflow-hidden shrink-0 transition-all duration-200 ${sizeClass} ${shadowClass} ${className}`}>
            <svg viewBox="0 0 80 80" className="size-full">
              <path d="M 22 42 C 16 32 22 18 36 18 C 42 12 56 16 60 26 C 66 36 62 48 58 56 C 54 52 50 48 46 52 C 40 50 32 50 28 54 C 24 50 22 46 22 42 Z" fill="#000000" />
              <ellipse cx="40" cy="46" rx="16" ry="18" fill="#E5E7EB" stroke="#000000" strokeWidth="2.5" />
              <g transform="rotate(-35 52 30)">
                <rect x="42" y="28" width="18" height="6" fill="#FFC107" stroke="#000000" strokeWidth="1.8" />
                <rect x="60" y="28" width="5" height="6" fill="#E57373" stroke="#000000" strokeWidth="1.8" />
                <polygon points="42,28 36,31 42,34" fill="#000000" />
              </g>
              <ellipse cx="35" cy="44" rx="2.2" ry="3" fill="#000000" />
              <ellipse cx="46" cy="44" rx="2.2" ry="3" fill="#000000" />
              <path d="M 31 39 Q 35 37 38 40" stroke="#000000" strokeWidth="1.8" fill="none" />
              <path d="M 43 40 Q 46 37 50 39" stroke="#000000" strokeWidth="1.8" fill="none" />
              <path d="M 40 45 L 39 49 L 41 49" stroke="#000000" strokeWidth="1.5" fill="none" />
              <path d="M 37 54 Q 40 56 44 54" stroke="#000000" strokeWidth="1.8" fill="none" />
            </svg>
          </div>
        );

      case 4:
        // 5. Minimalist Face 2 - Black Ring, White BG
        return (
          <div className={`relative rounded-full border-black bg-white overflow-hidden shrink-0 transition-all duration-200 ${sizeClass} ${shadowClass} ${className}`}>
            <svg viewBox="0 0 80 80" className="size-full">
              <path d="M 26 30 Q 33 24 40 30" stroke="#000000" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 48 26 Q 54 20 61 26" stroke="#000000" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 27 38 Q 34 42 40 37" stroke="#000000" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 49 34 Q 55 38 61 33" stroke="#000000" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 43 30 L 40 56 L 47 56" stroke="#000000" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        );

      case 5:
        // 6. Blue Folder Icon - Solid Blue BG, Black Ring
        return (
          <div className={`relative rounded-full border-black bg-[#4392F1] overflow-hidden shrink-0 transition-all duration-200 ${sizeClass} ${shadowClass} ${className}`}>
            <svg viewBox="0 0 80 80" className="size-full">
              <path d="M 16 26 C 16 23 18 21 21 21 H 34 C 36 21 38 23 39 25 L 42 28 H 60 C 63 28 65 30 65 33 V 56 C 65 59 63 61 60 61 H 21 C 18 61 16 59 16 56 Z" fill="#FFFFFF" stroke="#000000" strokeWidth="3.2" strokeLinejoin="round" />
              <circle cx="48" cy="43" r="3.2" fill="#000000" />
              <circle cx="58" cy="43" r="3.2" fill="#000000" />
            </svg>
          </div>
        );

      case 6:
      default:
        // 7. Glasses Person - Bright Red Ring, White BG
        return (
          <div className={`relative rounded-full border-[#FF3B30] bg-white overflow-hidden shrink-0 transition-all duration-200 ${sizeClass} ${shadowClass} ${className}`}>
            <svg viewBox="0 0 80 80" className="size-full">
              <path d="M 20 32 C 22 18 36 14 52 16 C 62 18 66 26 64 36 C 62 46 60 52 58 58 C 50 56 46 54 40 56 C 34 54 30 56 22 58 C 20 50 18 40 20 32 Z" fill="#9CA3AF" stroke="#000000" strokeWidth="1.5" />
              <path d="M 26 22 L 32 20 M 36 18 L 44 17 M 48 18 L 56 20 M 24 28 L 30 26" stroke="#000000" strokeWidth="1" opacity="0.6" />
              <ellipse cx="40" cy="46" rx="17" ry="18" fill="#E5E7EB" stroke="#000000" strokeWidth="2.5" />
              <path d="M 22 28 C 30 20 45 18 60 22 C 55 28 45 26 35 30 Z" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
              <rect x="23" y="38" width="16" height="13" rx="3" fill="#FFFFFF" stroke="#000000" strokeWidth="2.5" />
              <rect x="43" y="38" width="16" height="13" rx="3" fill="#FFFFFF" stroke="#000000" strokeWidth="2.5" />
              <line x1="39" y1="43" x2="43" y2="43" stroke="#000000" strokeWidth="2.5" />
              <circle cx="30" cy="44" r="2.2" fill="#000000" />
              <circle cx="50" cy="44" r="2.2" fill="#000000" />
              <path d="M 24 35 Q 31 32 38 35" stroke="#000000" strokeWidth="2" fill="none" />
              <path d="M 44 35 Q 51 32 58 35" stroke="#000000" strokeWidth="2" fill="none" />
              <path d="M 37 56 Q 41 58 45 55" stroke="#000000" strokeWidth="1.8" fill="none" />
            </svg>
          </div>
        );
    }
  };

  return renderStickerSvg();
}
