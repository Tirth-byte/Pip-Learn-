"use client";

import React from "react";

const UNIVERSITIES = [
  {
    name: "Harvard University",
    logo: (
      <svg viewBox="0 0 48 48" className="h-10 w-10 sm:h-11 sm:w-11 shrink-0" fill="none">
        {/* Harvard Crimson Shield Base */}
        <path
          d="M24 3.5 L6 9.5 V24 C6 34.5 13.8 42.5 24 45.5 C34.2 42.5 42 34.5 42 24 V9.5 L24 3.5 Z"
          fill="#A51C30"
          stroke="#7A1322"
          strokeWidth="1.5"
        />
        <path
          d="M24 6 L8.5 11 V23.5 C8.5 32.5 15.2 39.8 24 42.5 C32.8 39.8 39.5 32.5 39.5 23.5 V11 L24 6 Z"
          stroke="#FFD700"
          strokeWidth="0.75"
          fill="none"
          opacity="0.8"
        />
        {/* Top-Left Book - VE */}
        <rect x="12" y="13" width="9.5" height="7.5" rx="1" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="0.8" />
        <text x="16.75" y="18.5" fontSize="4.5" fontWeight="900" fontFamily="serif" textAnchor="middle" fill="#1A1A1A">VE</text>
        
        {/* Top-Right Book - RI */}
        <rect x="26.5" y="13" width="9.5" height="7.5" rx="1" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="0.8" />
        <text x="31.25" y="18.5" fontSize="4.5" fontWeight="900" fontFamily="serif" textAnchor="middle" fill="#1A1A1A">RI</text>

        {/* Bottom-Center Book - TAS */}
        <rect x="19.25" y="24.5" width="9.5" height="7.5" rx="1" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="0.8" />
        <text x="24" y="30" fontSize="4" fontWeight="900" fontFamily="serif" textAnchor="middle" fill="#1A1A1A">TAS</text>
      </svg>
    ),
  },
  {
    name: "Stanford University",
    logo: (
      <svg viewBox="0 0 48 48" className="h-10 w-10 sm:h-11 sm:w-11 shrink-0" fill="none">
        {/* Stanford Cardinal Shield Base */}
        <path
          d="M24 3.5 L6 9.5 V24 C6 34.5 13.8 42.5 24 45.5 C34.2 42.5 42 34.5 42 24 V9.5 L24 3.5 Z"
          fill="#8C1515"
          stroke="#600D0D"
          strokeWidth="1.5"
        />
        {/* Bold Stanford Block 'S' */}
        <text x="24" y="34" fontSize="28" fontWeight="900" fontFamily="serif" textAnchor="middle" fill="#FFFFFF" opacity="0.9">
          S
        </text>
        {/* Palo Alto Redwood Tree Overlay */}
        <path
          d="M24 10 L20 18 H22 L18 25 H21 L16 33 H23.25 V37 H24.75 V33 H32 L27 25 H30 L26 18 H28 L24 10 Z"
          fill="#005A36"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "MIT",
    logo: (
      <svg viewBox="0 0 48 48" className="h-10 w-10 sm:h-11 sm:w-11 shrink-0" fill="none">
        {/* MIT Red & Gray Geometric Monogram */}
        <rect x="4" y="8" width="6" height="32" fill="#A31D1D" rx="1" />
        <rect x="14" y="8" width="6" height="22" fill="#A31D1D" rx="1" />
        <rect x="24" y="8" width="6" height="32" fill="#A31D1D" rx="1" />
        <rect x="34" y="8" width="10" height="6" fill="#A31D1D" rx="1" />
        <rect x="38" y="14" width="6" height="26" fill="#8A8B8C" rx="1" />
        <rect x="14" y="34" width="6" height="6" fill="#8A8B8C" rx="1" />
      </svg>
    ),
  },
  {
    name: "University of Oxford",
    logo: (
      <svg viewBox="0 0 48 48" className="h-10 w-10 sm:h-11 sm:w-11 shrink-0" fill="none">
        {/* Oxford Dark Blue Shield */}
        <path
          d="M24 3.5 L6 9.5 V24 C6 34.5 13.8 42.5 24 45.5 C34.2 42.5 42 34.5 42 24 V9.5 L24 3.5 Z"
          fill="#002147"
          stroke="#00142C"
          strokeWidth="1.5"
        />
        {/* Open Book in Center */}
        <rect x="14" y="13" width="20" height="13" rx="1.5" fill="#FFFFFF" stroke="#FDB515" strokeWidth="1.2" />
        <line x1="24" y1="13" x2="24" y2="26" stroke="#002147" strokeWidth="1" />
        {/* Book Clasps / Text simulation */}
        <line x1="17" y1="17" x2="21" y2="17" stroke="#002147" strokeWidth="1" strokeLinecap="round" />
        <line x1="17" y1="20" x2="21" y2="20" stroke="#002147" strokeWidth="1" strokeLinecap="round" />
        <line x1="27" y1="17" x2="31" y2="17" stroke="#002147" strokeWidth="1" strokeLinecap="round" />
        <line x1="27" y1="20" x2="31" y2="20" stroke="#002147" strokeWidth="1" strokeLinecap="round" />
        
        {/* 3 Gold Crowns (2 top, 1 bottom) */}
        {/* Top-Left Crown */}
        <path d="M12 30 L13.5 34 H18.5 L20 30 L16 32 L12 30 Z" fill="#FDB515" stroke="#D4AF37" strokeWidth="0.5" />
        {/* Top-Right Crown */}
        <path d="M28 30 L29.5 34 H34.5 L36 30 L32 32 L28 30 Z" fill="#FDB515" stroke="#D4AF37" strokeWidth="0.5" />
        {/* Bottom Crown */}
        <path d="M20 37 L21.5 41 H26.5 L28 37 L24 39 L20 37 Z" fill="#FDB515" stroke="#D4AF37" strokeWidth="0.5" />
      </svg>
    ),
  },
  {
    name: "University of Cambridge",
    logo: (
      <svg viewBox="0 0 48 48" className="h-10 w-10 sm:h-11 sm:w-11 shrink-0" fill="none">
        {/* Cambridge Red Shield */}
        <path
          d="M24 3.5 L6 9.5 V24 C6 34.5 13.8 42.5 24 45.5 C34.2 42.5 42 34.5 42 24 V9.5 L24 3.5 Z"
          fill="#A51C30"
          stroke="#7A1322"
          strokeWidth="1.5"
        />
        {/* Gold Cross */}
        <path d="M20 4.5 H28 V44.5 H20 Z" fill="#FDB515" opacity="0.95" />
        <path d="M4.5 20 H43.5 V28 H4.5 Z" fill="#FDB515" opacity="0.95" />

        {/* 4 Gold Lions in Quarters */}
        <path d="M10 11 C13 11 15 13 14 16 H10 Z" fill="#FFFFFF" />
        <path d="M34 11 C37 11 39 13 38 16 H34 Z" fill="#FFFFFF" />
        <path d="M10 32 C13 32 15 34 14 37 H10 Z" fill="#FFFFFF" />
        <path d="M34 32 C37 32 39 34 38 37 H34 Z" fill="#FFFFFF" />

        {/* Center Academic Book */}
        <rect x="19.5" y="19.5" width="9" height="9" rx="1" fill="#FFFFFF" stroke="#A51C30" strokeWidth="1" />
        <line x1="24" y1="19.5" x2="24" y2="28.5" stroke="#A51C30" strokeWidth="0.8" />
      </svg>
    ),
  },
];

export function UniversityMarquee() {
  return (
    <section className="border-t border-[rgba(55,53,47,0.08)] bg-white py-16 text-center select-none overflow-hidden group">
      {/* 1. Section Header */}
      <p className="text-sm font-medium tracking-widest text-gray-400 uppercase mb-10 px-6">
        TRUSTED BY STUDENTS, RESEARCHERS, AND DEVELOPERS AT TOP UNIVERSITIES WORLDWIDE
      </p>

      {/* 2. Infinite Marquee Container */}
      <div className="relative w-full overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex gap-8 shrink-0 animate-[marquee_30s_linear_infinite] group-hover:[animation-play-state:paused] whitespace-nowrap py-2">
          {/* Loop 1 */}
          {UNIVERSITIES.map((uni, idx) => (
            <div
              key={`u1-${idx}`}
              className="inline-flex items-center gap-4 px-8 py-3.5 rounded-full border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 cursor-pointer shrink-0"
            >
              {uni.logo}
              <span className="text-lg font-bold text-gray-900 tracking-tight">{uni.name}</span>
            </div>
          ))}

          {/* Loop 2 (Duplicate for seamless loop) */}
          {UNIVERSITIES.map((uni, idx) => (
            <div
              key={`u2-${idx}`}
              className="inline-flex items-center gap-4 px-8 py-3.5 rounded-full border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 cursor-pointer shrink-0"
            >
              {uni.logo}
              <span className="text-lg font-bold text-gray-900 tracking-tight">{uni.name}</span>
            </div>
          ))}

          {/* Loop 3 (Triplicate to cover ultra-wide monitors) */}
          {UNIVERSITIES.map((uni, idx) => (
            <div
              key={`u3-${idx}`}
              className="inline-flex items-center gap-4 px-8 py-3.5 rounded-full border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 cursor-pointer shrink-0"
            >
              {uni.logo}
              <span className="text-lg font-bold text-gray-900 tracking-tight">{uni.name}</span>
            </div>
          ))}

          {/* Loop 4 */}
          {UNIVERSITIES.map((uni, idx) => (
            <div
              key={`u4-${idx}`}
              className="inline-flex items-center gap-4 px-8 py-3.5 rounded-full border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 cursor-pointer shrink-0"
            >
              {uni.logo}
              <span className="text-lg font-bold text-gray-900 tracking-tight">{uni.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
