import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showText?: boolean;
}

export function Logo({ 
  className, 
  iconClassName, 
  textClassName, 
  showText = true 
}: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2 select-none", className)}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={cn("size-5 shrink-0 text-neutral-900", iconClassName)}
      >
        <path d="M12 3L3 8L12 13L21 8L12 3Z" fill="currentColor" />
        <path d="M3 16L12 21L21 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 11.5L12 16.5L21 11.5" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {showText && (
        <span className={cn("font-bold tracking-tight text-neutral-900", textClassName)}>
          PipLearn
        </span>
      )}
    </div>
  );
}
