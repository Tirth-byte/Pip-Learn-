"use client";

import React from "react";

const UNIVERSITIES = [
  {
    name: "Harvard University",
    location: "Cambridge, MA · Computer Science",
    logo: (
      <svg viewBox="0 0 48 48" className="h-14 w-14 sm:h-16 sm:w-16 shrink-0" fill="none">
        {/* Harvard Outer Gold Rim */}
        <path
          d="M24 2 L4 8.5 V24 C4 35.5 12.8 44.2 24 47.5 C35.2 44.2 44 35.5 44 24 V8.5 L24 2 Z"
          fill="#D4AF37"
        />
        {/* Harvard Crimson Inner Shield */}
        <path
          d="M24 4.5 L6.5 10.5 V23.5 C6.5 33.5 14.2 41.8 24 44.8 C33.8 41.8 41.5 33.5 41.5 23.5 V10.5 L24 4.5 Z"
          fill="#A51C30"
        />
        {/* Top-Left Book - VE */}
        <rect x="11.5" y="13" width="10" height="8" rx="1" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="0.8" />
        <text x="16.5" y="19" fontSize="4.8" fontWeight="900" fontFamily="Georgia, serif" textAnchor="middle" fill="#1A1A1A">VE</text>
        
        {/* Top-Right Book - RI */}
        <rect x="26.5" y="13" width="10" height="8" rx="1" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="0.8" />
        <text x="31.5" y="19" fontSize="4.8" fontWeight="900" fontFamily="Georgia, serif" textAnchor="middle" fill="#1A1A1A">RI</text>

        {/* Bottom-Center Book - TAS */}
        <rect x="19" y="25" width="10" height="8" rx="1" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="0.8" />
        <text x="24" y="31" fontSize="4.2" fontWeight="900" fontFamily="Georgia, serif" textAnchor="middle" fill="#1A1A1A">TAS</text>
      </svg>
    ),
  },
  {
    name: "Stanford University",
    location: "Stanford, CA · AI & Engineering",
    logo: (
      <svg viewBox="0 0 48 48" className="h-14 w-14 sm:h-16 sm:w-16 shrink-0" fill="none">
        {/* Stanford Outer Gold Rim */}
        <path
          d="M24 2 L4 8.5 V24 C4 35.5 12.8 44.2 24 47.5 C35.2 44.2 44 35.5 44 24 V8.5 L24 2 Z"
          fill="#D4AF37"
        />
        {/* Stanford Cardinal Shield Base */}
        <path
          d="M24 4.5 L6.5 10.5 V23.5 C6.5 33.5 14.2 41.8 24 44.8 C33.8 41.8 41.5 33.5 41.5 23.5 V10.5 L24 4.5 Z"
          fill="#8C1515"
        />
        {/* Bold White Block 'S' */}
        <text x="24" y="35" fontSize="29" fontWeight="900" fontFamily="Georgia, serif" textAnchor="middle" fill="#FFFFFF" opacity="0.95">
          S
        </text>
        {/* Palo Alto Redwood Tree Overlay */}
        <path
          d="M24 9 L19.5 17 H22 L17.5 24 H21 L15.5 33 H23.25 V37.5 H24.75 V33 H32.5 L27 24 H30.5 L26 17 H28.5 L24 9 Z"
          fill="#005A36"
          stroke="#FFFFFF"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "MIT",
    location: "Cambridge, MA · EECS & AI",
    logo: (
      <svg viewBox="0 0 48 48" className="h-14 w-14 sm:h-16 sm:w-16 shrink-0" fill="none">
        {/* MIT Red & Gray Block Emblem */}
        <rect x="3" y="6" width="7" height="36" fill="#A31D1D" rx="1" />
        <rect x="14" y="6" width="7" height="24" fill="#A31D1D" rx="1" />
        <rect x="25" y="6" width="7" height="36" fill="#A31D1D" rx="1" />
        <rect x="36" y="6" width="9" height="7" fill="#A31D1D" rx="1" />
        <rect x="38" y="15" width="7" height="27" fill="#8A8B8C" rx="1" />
        <rect x="14" y="35" width="7" height="7" fill="#8A8B8C" rx="1" />
      </svg>
    ),
  },
  {
    name: "University of Oxford",
    location: "Oxford, UK · Software & Systems",
    logo: (
      <svg viewBox="0 0 48 48" className="h-14 w-14 sm:h-16 sm:w-16 shrink-0" fill="none">
        {/* Oxford Outer Gold Rim */}
        <path
          d="M24 2 L4 8.5 V24 C4 35.5 12.8 44.2 24 47.5 C35.2 44.2 44 35.5 44 24 V8.5 L24 2 Z"
          fill="#D4AF37"
        />
        {/* Oxford Navy Blue Shield Base */}
        <path
          d="M24 4.5 L6.5 10.5 V23.5 C6.5 33.5 14.2 41.8 24 44.8 C33.8 41.8 41.5 33.5 41.5 23.5 V10.5 L24 4.5 Z"
          fill="#002147"
        />
        {/* Open Book in Center */}
        <rect x="13" y="13" width="22" height="14" rx="1.5" fill="#FFFFFF" stroke="#FDB515" strokeWidth="1.2" />
        <line x1="24" y1="13" x2="24" y2="27" stroke="#002147" strokeWidth="1" />
        <line x1="16" y1="17" x2="21" y2="17" stroke="#002147" strokeWidth="1" strokeLinecap="round" />
        <line x1="16" y1="21" x2="21" y2="21" stroke="#002147" strokeWidth="1" strokeLinecap="round" />
        <line x1="27" y1="17" x2="32" y2="17" stroke="#002147" strokeWidth="1" strokeLinecap="round" />
        <line x1="27" y1="21" x2="32" y2="21" stroke="#002147" strokeWidth="1" strokeLinecap="round" />
        
        {/* 3 Gold Crowns */}
        <path d="M11 31 L12.5 35 H17.5 L19 31 L15 33 L11 31 Z" fill="#FDB515" stroke="#D4AF37" strokeWidth="0.5" />
        <path d="M29 31 L30.5 35 H35.5 L37 31 L33 33 L29 31 Z" fill="#FDB515" stroke="#D4AF37" strokeWidth="0.5" />
        <path d="M20 38 L21.5 42 H26.5 L28 38 L24 40 L20 38 Z" fill="#FDB515" stroke="#D4AF37" strokeWidth="0.5" />
      </svg>
    ),
  },
  {
    name: "University of Cambridge",
    location: "Cambridge, UK · Advanced Computing",
    logo: (
      <svg viewBox="0 0 48 48" className="h-14 w-14 sm:h-16 sm:w-16 shrink-0" fill="none">
        {/* Cambridge Outer Gold Rim */}
        <path
          d="M24 2 L4 8.5 V24 C4 35.5 12.8 44.2 24 47.5 C35.2 44.2 44 35.5 44 24 V8.5 L24 2 Z"
          fill="#D4AF37"
        />
        {/* Cambridge Crimson Shield */}
        <path
          d="M24 4.5 L6.5 10.5 V23.5 C6.5 33.5 14.2 41.8 24 44.8 C33.8 41.8 41.5 33.5 41.5 23.5 V10.5 L24 4.5 Z"
          fill="#A51C30"
        />
        {/* Gold Cross */}
        <path d="M19.5 4.5 H28.5 V44.8 H19.5 Z" fill="#FDB515" opacity="0.95" />
        <path d="M6.5 19.5 H41.5 V28.5 H6.5 Z" fill="#FDB515" opacity="0.95" />

        {/* Heraldic Lions */}
        <circle cx="13" cy="13" r="2.5" fill="#FFFFFF" />
        <circle cx="35" cy="13" r="2.5" fill="#FFFFFF" />
        <circle cx="13" cy="35" r="2.5" fill="#FFFFFF" />
        <circle cx="35" cy="35" r="2.5" fill="#FFFFFF" />

        {/* Center Book */}
        <rect x="19" y="19" width="10" height="10" rx="1" fill="#FFFFFF" stroke="#A51C30" strokeWidth="1" />
        <line x1="24" y1="19" x2="24" y2="29" stroke="#A51C30" strokeWidth="1" />
      </svg>
    ),
  },
];

export function UniversityMarquee() {
  return (
    <section className="border-t border-[rgba(55,53,47,0.08)] bg-[#FAF9F6] py-20 text-center select-none overflow-hidden group">
      {/* 1. Section Header */}
      <p className="text-xs sm:text-sm font-semibold tracking-widest text-[rgba(55,53,47,0.5)] uppercase mb-12 px-6">
        TRUSTED BY STUDENTS, RESEARCHERS, AND DEVELOPERS AT TOP UNIVERSITIES WORLDWIDE
      </p>

      {/* 2. Infinite Marquee Container */}
      <div className="relative w-full overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex gap-6 sm:gap-8 shrink-0 animate-[marquee_32s_linear_infinite] whitespace-nowrap py-3">
          {/* Loop 1 */}
          {UNIVERSITIES.map((uni, idx) => (
            <div
              key={`u1-${idx}`}
              className="inline-flex items-center gap-5 sm:gap-6 px-8 py-5 sm:px-10 sm:py-6 rounded-2xl border border-[rgba(55,53,47,0.14)] bg-white shadow-sm hover:shadow-lg hover:border-black/25 hover:-translate-y-1 transition-all duration-300 cursor-pointer shrink-0 text-left min-w-[300px] sm:min-w-[340px]"
            >
              {uni.logo}
              <div>
                <div className="font-extrabold text-xl sm:text-2xl text-[#111827] tracking-tight leading-tight">
                  {uni.name}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[rgba(55,53,47,0.55)] tracking-wide font-mono mt-1">
                  {uni.location}
                </div>
              </div>
            </div>
          ))}

          {/* Loop 2 (Duplicate for seamless loop) */}
          {UNIVERSITIES.map((uni, idx) => (
            <div
              key={`u2-${idx}`}
              className="inline-flex items-center gap-5 sm:gap-6 px-8 py-5 sm:px-10 sm:py-6 rounded-2xl border border-[rgba(55,53,47,0.14)] bg-white shadow-sm hover:shadow-lg hover:border-black/25 hover:-translate-y-1 transition-all duration-300 cursor-pointer shrink-0 text-left min-w-[300px] sm:min-w-[340px]"
            >
              {uni.logo}
              <div>
                <div className="font-extrabold text-xl sm:text-2xl text-[#111827] tracking-tight leading-tight">
                  {uni.name}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[rgba(55,53,47,0.55)] tracking-wide font-mono mt-1">
                  {uni.location}
                </div>
              </div>
            </div>
          ))}

          {/* Loop 3 (Triplicate for wide screen coverage) */}
          {UNIVERSITIES.map((uni, idx) => (
            <div
              key={`u3-${idx}`}
              className="inline-flex items-center gap-5 sm:gap-6 px-8 py-5 sm:px-10 sm:py-6 rounded-2xl border border-[rgba(55,53,47,0.14)] bg-white shadow-sm hover:shadow-lg hover:border-black/25 hover:-translate-y-1 transition-all duration-300 cursor-pointer shrink-0 text-left min-w-[300px] sm:min-w-[340px]"
            >
              {uni.logo}
              <div>
                <div className="font-extrabold text-xl sm:text-2xl text-[#111827] tracking-tight leading-tight">
                  {uni.name}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[rgba(55,53,47,0.55)] tracking-wide font-mono mt-1">
                  {uni.location}
                </div>
              </div>
            </div>
          ))}

          {/* Loop 4 */}
          {UNIVERSITIES.map((uni, idx) => (
            <div
              key={`u4-${idx}`}
              className="inline-flex items-center gap-5 sm:gap-6 px-8 py-5 sm:px-10 sm:py-6 rounded-2xl border border-[rgba(55,53,47,0.14)] bg-white shadow-sm hover:shadow-lg hover:border-black/25 hover:-translate-y-1 transition-all duration-300 cursor-pointer shrink-0 text-left min-w-[300px] sm:min-w-[340px]"
            >
              {uni.logo}
              <div>
                <div className="font-extrabold text-xl sm:text-2xl text-[#111827] tracking-tight leading-tight">
                  {uni.name}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[rgba(55,53,47,0.55)] tracking-wide font-mono mt-1">
                  {uni.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
