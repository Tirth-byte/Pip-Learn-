"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Share,
  Check,
  Star,
  Moon,
  Sun,
  Home,
  BookOpen,
  Target,
  Trophy,
  TrendingUp,
  Folder,
  User,
  Settings,
  MessageSquare,
  LucideIcon
} from "lucide-react";
import Link from "next/link";
import { useAppContext } from "@/context/app-context";
import { NotionAvatar } from "@/components/ui/notion-avatar";

const THEME_KEY = "piplearn_theme";
type ThemeMode = "light" | "dark" | "system";

function PipLearnLogoMark({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <path d="M24 8 L38 16 L24 24 L10 16 Z" fill="#000000" />
      <path d="M10 21 L24 29 L38 21 L38 24.5 L24 32.5 L10 24.5 Z" fill="#0066FF" />
      <path d="M10 29.5 L24 37.5 L38 29.5 L38 33 L24 41 L10 33 Z" fill="#000000" />
    </svg>
  );
}

const iconMap: Record<string, LucideIcon> = {
  dashboard: Home,
  courses: BookOpen,
  practice: Target,
  projects: Folder,
  portfolio: TrendingUp,
  leaderboard: Trophy,
  community: MessageSquare,
  profile: User,
  settings: Settings,
};

const titleMap: Record<string, string> = {
  dashboard: "Home",
  courses: "Courses",
  practice: "Practice",
  projects: "Projects",
  portfolio: "Progress",
  leaderboard: "Leaderboard",
  community: "Community",
  profile: "Profile",
  settings: "Settings",
};

function isDarkActive(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

export function TopNav() {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(p => p);
  const [copied, setCopied] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [isDark, setIsDark] = useState(isDarkActive);
  const { user } = useAppContext();

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(isDarkActive());
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = useCallback(() => {
    const html = document.documentElement;
    const willBeDark = !html.classList.contains("dark");
    html.classList.toggle("dark", willBeDark);
    const newMode: ThemeMode = willBeDark ? "dark" : "light";
    localStorage.setItem(THEME_KEY, newMode);
    setIsDark(willBeDark);
  }, []);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="h-12 border-b border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between px-3.5 sticky top-0 bg-white/95 dark:bg-[#181818]/95 backdrop-blur-sm z-10 text-xs text-neutral-700 dark:text-[rgba(255,255,255,0.85)] select-none transition-colors">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-1.5 overflow-hidden">
        <SidebarTrigger className="text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 p-1.5 rounded-md transition-colors" />
        
        <div className="flex items-center gap-1 text-[13px] text-neutral-800 dark:text-neutral-200 font-normal whitespace-nowrap overflow-hidden text-ellipsis">
          <Link href="/dashboard" className="flex items-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 px-2 py-1 rounded-md transition-colors truncate">
            <PipLearnLogoMark className="size-4 shrink-0" />
            <span className="font-bold text-neutral-900 dark:text-white text-xs">pip learn</span>
          </Link>
          
          {paths.map((path, index) => {
            const isLast = index === paths.length - 1;
            const title = titleMap[path] || (path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' '));
            const href = "/" + paths.slice(0, index + 1).join("/");
            const IconComponent = iconMap[path] || Home;

            return (
              <div key={path} className="flex items-center gap-1">
                <span className="text-neutral-300 dark:text-neutral-600">/</span>
                <Link
                  href={href}
                  className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md transition-colors truncate ${
                    isLast 
                      ? 'font-semibold text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800' 
                      : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  <IconComponent className="size-3.5 text-neutral-400 dark:text-neutral-500 stroke-[1.75] shrink-0" />
                  <span>{title}</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center gap-1.5 flex-shrink-0 text-neutral-500 dark:text-neutral-400">
        <button
          onClick={() => setIsStarred(!isStarred)}
          title={isStarred ? "Remove from Favorites" : "Add to Favorites"}
          className={`p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer ${
            isStarred ? "text-amber-500" : "text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
          }`}
        >
          <Star className={`size-3.5 stroke-[1.75] ${isStarred ? "fill-amber-400" : ""}`} />
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all cursor-pointer"
        >
          <div className="relative size-3.5">
            <Sun className={`size-3.5 stroke-[1.75] absolute inset-0 transition-all duration-300 ${isDark ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}`} />
            <Moon className={`size-3.5 stroke-[1.75] absolute inset-0 transition-all duration-300 ${isDark ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`} />
          </div>
        </button>

        <button
          onClick={handleShare}
          className="px-2.5 py-1 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 rounded-md font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
        >
          {copied ? (
            <>
              <Check className="size-3 stroke-[2]" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Share className="size-3 stroke-[2]" />
              <span>Share</span>
            </>
          )}
        </button>

        <Link href="/profile" className="ml-1">
          <NotionAvatar seed={user.name} avatarIndex={user.avatarIndex} size="xs" hasShadow={false} />
        </Link>
      </div>
    </div>
  );
}
