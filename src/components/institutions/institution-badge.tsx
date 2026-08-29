"use client";

import React from "react";
import { Institution } from "@/lib/institutions";
import { InstitutionLogo } from "./institution-logo";
import { BadgeCheck, MapPin } from "lucide-react";

interface InstitutionBadgeProps {
  institution: Institution;
  size?: "sm" | "md" | "lg";
  showLocation?: boolean;
  showVerified?: boolean;
  className?: string;
  onClick?: () => void;
}

export function InstitutionBadge({
  institution,
  size = "md",
  showLocation = false,
  showVerified = true,
  className = "",
  onClick,
}: InstitutionBadgeProps) {
  const isClickable = !!onClick;

  if (size === "sm") {
    return (
      <div
        onClick={onClick}
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#F7F7F5] dark:bg-[#252525] border border-[rgba(55,53,47,0.1)] dark:border-[rgba(255,255,255,0.1)] text-xs font-medium text-[#37352F] dark:text-[rgba(255,255,255,0.85)] ${
          isClickable ? "cursor-pointer hover:bg-[#EFEFEF] dark:hover:bg-[#2E2E2E] transition-colors" : ""
        } ${className}`}
      >
        <InstitutionLogo institution={institution} size="xs" />
        <span className="truncate max-w-[150px]">{institution.shortName || institution.name}</span>
        {showVerified && institution.verified && (
          <BadgeCheck className="size-3 text-[#0066FF] shrink-0 fill-[#0066FF]/15" />
        )}
      </div>
    );
  }

  if (size === "lg") {
    return (
      <div
        onClick={onClick}
        className={`flex items-center gap-3.5 p-3 rounded-xl bg-white dark:bg-[#202020] border border-[rgba(55,53,47,0.12)] dark:border-[rgba(255,255,255,0.1)] shadow-2xs ${
          isClickable ? "cursor-pointer hover:border-black/30 dark:hover:border-white/30 transition-all" : ""
        } ${className}`}
      >
        <InstitutionLogo institution={institution} size="lg" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-sm text-gray-900 dark:text-white truncate">
              {institution.name}
            </span>
            {showVerified && institution.verified && (
              <BadgeCheck className="size-4 text-[#0066FF] shrink-0 fill-[#0066FF]/15" />
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            <MapPin className="size-3 shrink-0" />
            <span className="truncate">{institution.location}</span>
            <span className="mx-1 text-gray-300 dark:text-gray-600">·</span>
            <span>{institution.memberCount.toLocaleString()} learners</span>
          </div>
        </div>
      </div>
    );
  }

  // Medium (Default)
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#F7F7F5] dark:bg-[#252525] border border-[rgba(55,53,47,0.12)] dark:border-[rgba(255,255,255,0.12)] text-xs font-semibold text-[#37352F] dark:text-white ${
        isClickable ? "cursor-pointer hover:bg-[#EFEFEF] dark:hover:bg-[#2E2E2E] transition-colors" : ""
      } ${className}`}
    >
      <InstitutionLogo institution={institution} size="sm" />
      <span className="truncate max-w-[200px]">{institution.name}</span>
      {showVerified && institution.verified && (
        <BadgeCheck className="size-3.5 text-[#0066FF] shrink-0 fill-[#0066FF]/15" />
      )}
      {showLocation && (
        <span className="text-[11px] text-gray-400 dark:text-gray-500 font-normal truncate">
          ({institution.location})
        </span>
      )}
    </div>
  );
}
