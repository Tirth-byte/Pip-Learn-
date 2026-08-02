"use client";

import React from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex-1 flex flex-col">
      {children}
    </div>
  );
}

export function StaggerContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export function AnimatedCard({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`hover:-translate-y-[2px] active:scale-[0.99] transition-all duration-150 cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
}
