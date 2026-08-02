"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type NotionIconColor = "yellow" | "blue" | "green" | "purple" | "pink" | "orange" | "gray" | "red" | "none";

interface NotionIconProps {
  name: 
    | "python" 
    | "book" 
    | "code" 
    | "ai" 
    | "target" 
    | "flame" 
    | "chat" 
    | "trophy" 
    | "briefcase" 
    | "user" 
    | "settings" 
    | "sparkles" 
    | "terminal" 
    | "rocket" 
    | "search" 
    | "lightbulb" 
    | "document" 
    | "database" 
    | "folder" 
    | "star" 
    | "clock" 
    | "check"
    | "layers"
    | "cpu"
    | "shield"
    | "bug"
    | "test"
    | "fileCode"
    | "zap"
    | "globe";
  color?: NotionIconColor;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const colorMap: Record<NotionIconColor, string> = {
  yellow: "bg-[#FBF3DB] text-[#403A2B] border-[#F1E5BC]",
  blue: "bg-[#E8F3F7] text-[#1C3B47] border-[#C2E0EA]",
  green: "bg-[#EDF3EC] text-[#1C3829] border-[#C5E0C2]",
  purple: "bg-[#F3E8FF] text-[#3D2252] border-[#E0C7FA]",
  pink: "bg-[#FDEBEC] text-[#4C232B] border-[#F7C8CC]",
  orange: "bg-[#FDECC8] text-[#49290E] border-[#F7D899]",
  gray: "bg-[#F1F1EF] text-[#37352F] border-[#E3E3E0]",
  red: "bg-[#FDEBEC] text-[#5C1D24] border-[#F7C8CC]",
  none: "bg-transparent text-[#37352F] border-transparent",
};

const sizeMap = {
  sm: "size-6 p-1 text-xs rounded",
  md: "size-8 p-1.5 text-sm rounded-md",
  lg: "size-10 p-2 text-base rounded-md",
  xl: "size-12 p-2.5 text-lg rounded-lg",
};

export function NotionIcon({ name, color = "gray", size = "md", className }: NotionIconProps) {
  const colorClass = colorMap[color] || colorMap.gray;
  const sizeClass = sizeMap[size] || sizeMap.md;

  const renderSvg = () => {
    switch (name) {
      case "python":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-full">
            <path d="M12 2C6.5 2 6 4 6 6v2h6v1H5C3 9 2 11 2 13.5S3.5 18 6 18h2v-2.5C8 13 9.5 11.5 12 11.5h4c1.5 0 2.5-.5 2.5-2V6c0-2-.5-4-6.5-4zM9 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
            <path d="M12 22c5.5 0 6-2 6-4v-2h-6v-1h7c2 0 3-2 3-4.5S20.5 6 18 6h-2v2.5c0 2.5-1.5 4-4 4H8c-1.5 0-2.5.5-2.5 2v3.5c0 2 .5 4 6.5 4zm3-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
        );
      case "ai":
      case "sparkles":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-full">
            <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z" />
            <path d="M5 3v4M3 5h4M19 17v4M17 19h4" />
          </svg>
        );
      case "book":
      case "document":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-full">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            <line x1="8" y1="7" x2="16" y2="7" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        );
      case "code":
      case "terminal":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-full">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        );
      case "fileCode":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-full">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <path d="m10 13-2 2 2 2" />
            <path d="m14 13 2 2-2 2" />
          </svg>
        );
      case "bug":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-full">
            <rect width="8" height="14" x="8" y="6" rx="4" />
            <path d="m19 7-3 2" />
            <path d="m5 7 3 2" />
            <path d="m19 19-3-2" />
            <path d="m5 19 3-2" />
            <path d="M20 13h-4" />
            <path d="M4 13h4" />
            <path d="m10 4 1-2" />
            <path d="m14 4-1-2" />
          </svg>
        );
      case "test":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-full">
            <path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5h0c-1.4 0-2.5-1.1-2.5-2.5V2" />
            <path d="M8.5 2h7" />
            <path d="M14.5 16h-5" />
          </svg>
        );
      case "target":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-full">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </svg>
        );
      case "flame":
      case "zap":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-full">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        );
      case "chat":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-full">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        );
      case "trophy":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-full">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
          </svg>
        );
      case "star":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-full">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      case "check":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="size-full">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        );
      case "globe":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-full">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        );
      case "rocket":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-full">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
          </svg>
        );
      case "lightbulb":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-full">
            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.6 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
            <path d="M9 18h6" />
            <path d="M10 22h4" />
          </svg>
        );
      case "database":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-full">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          </svg>
        );
      case "layers":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-full">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        );
      case "cpu":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-full">
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <rect x="9" y="9" width="6" height="6" />
            <line x1="9" y1="1" x2="9" y2="4" />
            <line x1="15" y1="1" x2="15" y2="4" />
            <line x1="9" y1="20" x2="9" y2="23" />
            <line x1="15" y1="20" x2="15" y2="23" />
            <line x1="20" y1="9" x2="23" y2="9" />
            <line x1="20" y1="15" x2="23" y2="15" />
            <line x1="1" y1="9" x2="4" y2="9" />
            <line x1="1" y1="15" x2="4" y2="15" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-full">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        );
    }
  };

  return (
    <div className={cn("inline-flex items-center justify-center border shrink-0 transition-transform hover:scale-105", colorClass, sizeClass, className)}>
      {renderSvg()}
    </div>
  );
}
