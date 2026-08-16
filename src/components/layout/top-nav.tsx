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
  LayoutDashboard,
  BookOpen,
  Target,
  Terminal,
  Sparkles,
  MessageSquare,
  Trophy,
  Folder,
  User,
  Settings,
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
  dashboard: LayoutDashboard,
  courses: BookOpen,
  practice: Target,
  sandbox: Terminal,
  "ai-mentor": Sparkles,
  community: MessageSquare,
  leaderboard: Trophy,
  projects: Folder,
  profile: User,
  settings: Settings,
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

  // Sync dark state when external changes happen (e.g. settings page toggles class)
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
    <div className="h-11 border-b border-[rgba(55,53,47,0.09)] dark:border-[rgba(255,255,255,0.09)] flex items-center justify-between px-3 sticky top-0 bg-white/95 dark:bg-[#191919]/95 backdrop-blur-sm z-10 text-xs text-[#37352F] dark:text-[rgba(255,255,255,0.81)] select-none transition-colors">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-1 overflow-hidden">
        <SidebarTrigger className="mr-0.5 text-[rgba(55,53,47,0.45)] dark:text-[rgba(255,255,255,0.4)] hover:text-[#37352F] dark:hover:text-white hover:bg-[rgba(55,53,47,0.08)] dark:hover:bg-[rgba(255,255,255,0.08)] p-1 rounded transition-colors" />
        <div className="flex items-center gap-1 text-[13px] text-[#37352F] dark:text-[rgba(255,255,255,0.81)] font-normal whitespace-nowrap overflow-hidden text-ellipsis">
          <Link href="/dashboard" className="flex items-center gap-2 hover:bg-[rgba(55,53,47,0.08)] dark:hover:bg-[rgba(255,255,255,0.08)] px-1.5 py-0.5 rounded transition-colors truncate">
            <PipLearnLogoMark className="size-4 shrink-0" />
            <span className="font-semibold text-[#37352F] dark:text-white">PipLearn Workspace</span>
          </Link>
          
          {paths.map((path, index) => {
            const isLast = index === paths.length - 1;
            const title = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
            const href = "/" + paths.slice(0, index + 1).join("/");
            const IconComponent = iconMap[path] || LayoutDashboard;

            return (
              <div key={path} className="flex items-center gap-1">
                <span className="text-[rgba(55,53,47,0.3)] dark:text-[rgba(255,255,255,0.2)]">/</span>
                <Link
                  href={href}
                  className={`flex items-center gap-1.5 px-1.5 py-0.5 rounded transition-colors truncate ${
                    isLast 
                      ? 'font-medium text-[#37352F] dark:text-white bg-[rgba(55,53,47,0.06)] dark:bg-[rgba(255,255,255,0.06)]' 
                      : 'text-[rgba(55,53,47,0.65)] dark:text-[rgba(255,255,255,0.5)] hover:bg-[rgba(55,53,47,0.08)] dark:hover:bg-[rgba(255,255,255,0.08)] hover:text-[#37352F] dark:hover:text-white'
                  }`}
                >
                  <IconComponent className="size-3.5 text-gray-400 dark:text-gray-500 stroke-[1.5] shrink-0" />
                  <span>{title}</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center gap-1 flex-shrink-0 text-[rgba(55,53,47,0.65)] dark:text-[rgba(255,255,255,0.5)]">
        <button
          onClick={() => setIsStarred(!isStarred)}
          title={isStarred ? "Remove from Favorites" : "Add to Favorites"}
          className={`p-1 rounded hover:bg-[rgba(55,53,47,0.08)] dark:hover:bg-[rgba(255,255,255,0.08)] transition-colors cursor-pointer ${
            isStarred ? "text-amber-500" : "text-[rgba(55,53,47,0.45)] dark:text-[rgba(255,255,255,0.4)] hover:text-[#37352F] dark:hover:text-white"
          }`}
        >
          <Star className={`size-3.5 stroke-[1.5] ${isStarred ? "fill-amber-400" : ""}`} />
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className="p-1 rounded text-[rgba(55,53,47,0.45)] dark:text-[rgba(255,255,255,0.4)] hover:text-[#37352F] dark:hover:text-white hover:bg-[rgba(55,53,47,0.08)] dark:hover:bg-[rgba(255,255,255,0.08)] transition-all cursor-pointer"
        >
          <div className="relative size-3.5">
            <Sun className={`size-3.5 stroke-[1.5] absolute inset-0 transition-all duration-300 ${isDark ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}`} />
            <Moon className={`size-3.5 stroke-[1.5] absolute inset-0 transition-all duration-300 ${isDark ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`} />
          </div>
        </button>

        <button
          onClick={handleShare}
          className="px-2.5 py-1 bg-[#2383E2] hover:bg-[#0070E0] active:bg-[#005FC2] text-white rounded font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="size-3 text-white stroke-[1.5]" />
              <span>Copied Link</span>
            </>
          ) : (
            <>
              <Share className="size-3 text-white stroke-[1.5]" />
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
