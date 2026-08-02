"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { MessageSquare, MoreHorizontal, Share, Check, Star, Clock } from "lucide-react";
import Link from "next/link";

const emojiMap: Record<string, string> = {
  dashboard: "📄",
  courses: "📚",
  practice: "⚡",
  sandbox: "💻",
  "ai-mentor": "✨",
  community: "💬",
  leaderboard: "🏆",
  projects: "💼",
  profile: "👤",
  settings: "⚙️",
};

export function TopNav() {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(p => p);
  const [copied, setCopied] = useState(false);
  const [isStarred, setIsStarred] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="h-11 border-b border-[rgba(55,53,47,0.09)] flex items-center justify-between px-3 sticky top-0 bg-white/95 backdrop-blur-sm z-10 text-xs text-[#37352F]">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-1 overflow-hidden">
        <SidebarTrigger className="mr-0.5 text-[rgba(55,53,47,0.45)] hover:text-[#37352F] hover:bg-[rgba(55,53,47,0.08)] p-1 rounded transition-colors" />
        <div className="flex items-center gap-1 text-[13px] text-[#37352F] font-normal whitespace-nowrap overflow-hidden text-ellipsis">
          <Link href="/dashboard" className="flex items-center gap-1.5 hover:bg-[rgba(55,53,47,0.08)] px-1.5 py-0.5 rounded transition-colors truncate">
            <span className="text-xs">🐍</span>
            <span className="font-medium text-[#37352F]">PipLearn Workspace</span>
          </Link>
          
          {paths.map((path, index) => {
            const isLast = index === paths.length - 1;
            const title = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
            const href = "/" + paths.slice(0, index + 1).join("/");
            const emoji = emojiMap[path] || "📄";

            return (
              <div key={path} className="flex items-center gap-1">
                <span className="text-[rgba(55,53,47,0.3)]">/</span>
                <Link
                  href={href}
                  className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition-colors truncate ${
                    isLast 
                      ? 'font-medium text-[#37352F] bg-[rgba(55,53,47,0.06)]' 
                      : 'text-[rgba(55,53,47,0.65)] hover:bg-[rgba(55,53,47,0.08)] hover:text-[#37352F]'
                  }`}
                >
                  <span className="text-xs">{emoji}</span>
                  <span>{title}</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Notion Top Action Bar */}
      <div className="flex items-center gap-1 flex-shrink-0 text-[rgba(55,53,47,0.65)]">
        <button
          onClick={() => setIsStarred(!isStarred)}
          title={isStarred ? "Remove from Favorites" : "Add to Favorites"}
          className={`p-1 rounded hover:bg-[rgba(55,53,47,0.08)] transition-colors cursor-pointer ${
            isStarred ? "text-amber-500" : "text-[rgba(55,53,47,0.45)] hover:text-[#37352F]"
          }`}
        >
          <Star className={`size-3.5 ${isStarred ? "fill-amber-400" : ""}`} />
        </button>

        <button
          onClick={handleShare}
          className="px-2.5 py-1 bg-[#2383E2] hover:bg-[#0070E0] active:bg-[#005FC2] text-white rounded font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="size-3 text-white" />
              <span>Copied Link</span>
            </>
          ) : (
            <>
              <Share className="size-3 text-white" />
              <span>Share</span>
            </>
          )}
        </button>

        <Link
          href="/ai-mentor"
          title="Comments / AI Assistant"
          className="p-1 rounded hover:bg-[rgba(55,53,47,0.08)] text-[rgba(55,53,47,0.65)] hover:text-[#37352F] transition-colors cursor-pointer"
        >
          <MessageSquare className="size-3.5" />
        </Link>

        <button
          title="Page history"
          className="p-1 rounded hover:bg-[rgba(55,53,47,0.08)] text-[rgba(55,53,47,0.65)] hover:text-[#37352F] transition-colors cursor-pointer"
        >
          <Clock className="size-3.5" />
        </button>

        <button
          title="Page settings"
          className="p-1 rounded hover:bg-[rgba(55,53,47,0.08)] text-[rgba(55,53,47,0.65)] hover:text-[#37352F] transition-colors cursor-pointer"
        >
          <MoreHorizontal className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
