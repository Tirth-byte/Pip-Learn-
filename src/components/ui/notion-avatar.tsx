"use client";

import React, { useState } from "react";

interface NotionAvatarProps {
  seed: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  style?: "notionists" | "open-peeps";
  borderColor?: string;
  hasShadow?: boolean;
}

const sizeMap = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
  xl: "size-14 text-lg",
  "2xl": "size-20 text-xl",
};

export function NotionAvatar({
  seed,
  size = "md",
  className = "",
  style = "notionists",
  borderColor = "border-black",
  hasShadow = true,
}: NotionAvatarProps) {
  const [hasError, setHasError] = useState(false);

  // DiceBear API Endpoint using Notionists illustration style
  const avatarUrl = `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(
    seed
  )}&backgroundColor=ffffff`;

  // Initials fallback
  const getInitials = (name: string) => {
    if (!name) return "P";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const shadowClass = hasShadow
    ? "shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
    : "";

  return (
    <div
      className={`relative rounded-full border-2 ${borderColor} bg-white overflow-hidden shrink-0 transition-all duration-200 ${sizeMap[size]} ${shadowClass} ${className}`}
    >
      {!hasError ? (
        <img
          src={avatarUrl}
          alt={`${seed}'s profile picture`}
          onError={() => setHasError(true)}
          className="size-full object-cover select-none"
        />
      ) : (
        <div className="size-full flex items-center justify-center font-bold text-[#37352F] bg-[#F7F7F5] select-none">
          {getInitials(seed)}
        </div>
      )}
    </div>
  );
}
