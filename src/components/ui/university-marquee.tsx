"use client";

import React from "react";

const UNIVERSITIES = [
  {
    name: "MIT",
    logo: (
      <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="none">
        <path d="M2 4h3v16H2V4zm5 0h3v11H7V4zm5 0h3v16h-3V4zm5 0h5v3h-2v13h-3V7h-2V4zM7 17h3v3H7v-3z" fill="#A31D1D" />
      </svg>
    ),
  },
  {
    name: "Stanford University",
    logo: (
      <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="none">
        <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" fill="#8C1515" />
        <path d="M12 5l-2.5 5h2v6h1v-6h2L12 5z" fill="#FFFFFF" />
        <path d="M10.5 16h3v1.5h-3z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: "Harvard",
    logo: (
      <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="none">
        <path d="M12 2L3 6v6c0 6 4 10.5 9 12 5-1.5 9-6 9-12V6l-9-4z" fill="#A51C30" />
        <rect x="6.5" y="7" width="5" height="4" rx="0.5" fill="#FFFFFF" />
        <rect x="12.5" y="7" width="5" height="4" rx="0.5" fill="#FFFFFF" />
        <rect x="9.5" y="12.5" width="5" height="4" rx="0.5" fill="#FFFFFF" />
        <path d="M7.5 8.5h3M13.5 8.5h3M10.5 14h2" stroke="#A51C30" strokeWidth="0.8" />
      </svg>
    ),
  },
  {
    name: "Oxford",
    logo: (
      <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="none">
        <path d="M12 2L4 6v6c0 5.5 3.8 10.5 8 12 4.2-1.5 8-6.5 8-12V6l-8-4z" fill="#002147" />
        <path d="M7.5 8h9v5.5h-9V8z" fill="#FFFFFF" />
        <path d="M9.5 7h5v1h-5V7z" fill="#FDB515" />
        <circle cx="9" cy="16" r="1" fill="#FDB515" />
        <circle cx="12" cy="16" r="1" fill="#FDB515" />
        <circle cx="15" cy="16" r="1" fill="#FDB515" />
      </svg>
    ),
  },
  {
    name: "Cambridge",
    logo: (
      <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="none">
        <path d="M12 2L4 6v6c0 5.5 3.8 10.5 8 12 4.2-1.5 8-6.5 8-12V6l-8-4z" fill="#A51C30" />
        <path d="M12 4v16M4 12h16" stroke="#FDB515" strokeWidth="1.8" />
        <circle cx="8" cy="8" r="1" fill="#FFFFFF" />
        <circle cx="16" cy="8" r="1" fill="#FFFFFF" />
        <circle cx="8" cy="16" r="1" fill="#FFFFFF" />
        <circle cx="16" cy="16" r="1" fill="#FFFFFF" />
      </svg>
    ),
  },
];

export function UniversityMarquee() {
  return (
    <section className="border-t border-[rgba(55,53,47,0.08)] bg-white py-12 text-center select-none overflow-hidden group">
      {/* 1. Section Header */}
      <p className="text-xs font-semibold uppercase tracking-wider text-[rgba(55,53,47,0.45)] mb-8 px-6">
        TRUSTED BY STUDENTS, RESEARCHERS, AND DEVELOPERS AT TOP UNIVERSITIES WORLDWIDE
      </p>

      {/* 2. Marquee Container */}
      <div className="relative w-full overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex gap-6 shrink-0 animate-[marquee_25s_linear_infinite] group-hover:[animation-play-state:paused] whitespace-nowrap py-1">
          {/* Loop 1 */}
          {UNIVERSITIES.map((uni, idx) => (
            <div
              key={`u1-${idx}`}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-gray-200 bg-white shadow-2xs hover:border-gray-400 hover:shadow-xs transition-all cursor-pointer shrink-0"
            >
              {uni.logo}
              <span className="font-bold text-[#37352F] text-sm tracking-tight">{uni.name}</span>
            </div>
          ))}

          {/* Loop 2 (Duplicate for seamless loop) */}
          {UNIVERSITIES.map((uni, idx) => (
            <div
              key={`u2-${idx}`}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-gray-200 bg-white shadow-2xs hover:border-gray-400 hover:shadow-xs transition-all cursor-pointer shrink-0"
            >
              {uni.logo}
              <span className="font-bold text-[#37352F] text-sm tracking-tight">{uni.name}</span>
            </div>
          ))}

          {/* Loop 3 (Triplicate to prevent any whitespace gap on wide screens) */}
          {UNIVERSITIES.map((uni, idx) => (
            <div
              key={`u3-${idx}`}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-gray-200 bg-white shadow-2xs hover:border-gray-400 hover:shadow-xs transition-all cursor-pointer shrink-0"
            >
              {uni.logo}
              <span className="font-bold text-[#37352F] text-sm tracking-tight">{uni.name}</span>
            </div>
          ))}

          {/* Loop 4 */}
          {UNIVERSITIES.map((uni, idx) => (
            <div
              key={`u4-${idx}`}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-gray-200 bg-white shadow-2xs hover:border-gray-400 hover:shadow-xs transition-all cursor-pointer shrink-0"
            >
              {uni.logo}
              <span className="font-bold text-[#37352F] text-sm tracking-tight">{uni.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
