"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Share,
  Check,
  Star,
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

export function TopNav() {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(p => p);
  const [copied, setCopied] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const { user } = useAppContext();

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="h-11 border-b border-[rgba(55,53,47,0.09)] flex items-center justify-between px-3 sticky top-0 bg-white/95 backdrop-blur-sm z-10 text-xs text-[#37352F] select-none">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-1 overflow-hidden">
        <SidebarTrigger className="mr-0.5 text-[rgba(55,53,47,0.45)] hover:text-[#37352F] hover:bg-[rgba(55,53,47,0.08)] p-1 rounded transition-colors" />
        <div className="flex items-center gap-1 text-[13px] text-[#37352F] font-normal whitespace-nowrap overflow-hidden text-ellipsis">
          <Link href="/dashboard" className="flex items-center gap-2 hover:bg-[rgba(55,53,47,0.08)] px-1.5 py-0.5 rounded transition-colors truncate">
            <PipLearnLogoMark className="size-4 shrink-0" />
            <span className="font-semibold text-[#37352F]">PipLearn Workspace</span>
          </Link>
          
          {paths.map((path, index) => {
            const isLast = index === paths.length - 1;
            const title = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
            const href = "/" + paths.slice(0, index + 1).join("/");
            const IconComponent = iconMap[path] || LayoutDashboard;

            return (
              <div key={path} className="flex items-center gap-1">
                <span className="text-[rgba(55,53,47,0.3)]">/</span>
                <Link
                  href={href}
                  className={`flex items-center gap-1.5 px-1.5 py-0.5 rounded transition-colors truncate ${
                    isLast 
                      ? 'font-medium text-[#37352F] bg-[rgba(55,53,47,0.06)]' 
                      : 'text-[rgba(55,53,47,0.65)] hover:bg-[rgba(55,53,47,0.08)] hover:text-[#37352F]'
                  }`}
                >
                  <IconComponent className="size-3.5 text-gray-400 stroke-[1.5] shrink-0" />
                  <span>{title}</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center gap-1 flex-shrink-0 text-[rgba(55,53,47,0.65)]">
        <button
          onClick={() => setIsStarred(!isStarred)}
          title={isStarred ? "Remove from Favorites" : "Add to Favorites"}
          className={`p-1 rounded hover:bg-[rgba(55,53,47,0.08)] transition-colors cursor-pointer ${
            isStarred ? "text-amber-500" : "text-[rgba(55,53,47,0.45)] hover:text-[#37352F]"
          }`}
        >
          <Star className={`size-3.5 stroke-[1.5] ${isStarred ? "fill-amber-400" : ""}`} />
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
