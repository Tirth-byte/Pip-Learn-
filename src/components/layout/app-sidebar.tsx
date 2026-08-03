"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  ChevronDown,
  Search,
  Sparkles,
  Plus,
  LayoutDashboard,
  Bot,
  Terminal,
  BookOpen,
  Target,
  Folder,
  FolderOpen,
  Trophy,
  MessageSquare,
  User,
  Settings,
  LucideIcon
} from "lucide-react";
import { useAppContext } from "@/context/app-context";
import { NotionAvatar } from "@/components/ui/notion-avatar";
import { toast } from "sonner";

function PipLearnLogoMark({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <path d="M24 8 L38 16 L24 24 L10 16 Z" fill="#000000" />
      <path d="M10 21 L24 29 L38 21 L38 24.5 L24 32.5 L10 24.5 Z" fill="#0066FF" />
      <path d="M10 29.5 L24 37.5 L38 29.5 L38 33 L24 41 L10 33 Z" fill="#000000" />
    </svg>
  );
}

interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  activeIcon?: LucideIcon;
}

const favoritesNav: NavItem[] = [
  { title: "Python Sandbox", url: "/sandbox", icon: Terminal },
  { title: "AI Mentor", url: "/ai-mentor", icon: Bot },
];

const mainWorkspaceNav: NavItem[] = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Course Library", url: "/courses", icon: BookOpen },
  { title: "Practice Problems", url: "/practice", icon: Target },
  { title: "Projects", url: "/projects", icon: Folder, activeIcon: FolderOpen },
  { title: "Leaderboard", url: "/leaderboard", icon: Trophy },
  { title: "Community", url: "/community", icon: MessageSquare },
];

const accountNav: NavItem[] = [
  { title: "Profile", url: "/profile", icon: User },
  { title: "Settings & Members", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useAppContext();

  return (
    <Sidebar className="border-r border-[rgba(55,53,47,0.09)] bg-[#FBFBFA] text-[#37352F] text-sm select-none">
      {/* Workspace Switcher Header with Official PipLearn Stacked Layers Logo */}
      <div className="p-2 border-b border-[rgba(55,53,47,0.06)]">
        <Link 
          href="/dashboard"
          className="flex items-center justify-between p-1.5 rounded-md hover:bg-[rgba(55,53,47,0.08)] transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <PipLearnLogoMark className="size-5.5 shrink-0" />
            <div className="truncate font-bold text-xs tracking-tight text-[#37352F]">
              PipLearn Workspace
            </div>
          </div>
          <ChevronDown className="size-3.5 text-gray-400 group-hover:text-gray-900 shrink-0 stroke-[1.5]" />
        </Link>

        {/* Quick Search & AI Actions */}
        <div className="mt-1 space-y-0.5">
          <button
            onClick={() => toast("Opening quick search... Press ⌘K to search anything")}
            className="w-full flex items-center justify-between p-1.5 rounded-md text-xs text-gray-600 hover:bg-[rgba(55,53,47,0.08)] hover:text-gray-900 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <Search className="size-4 text-gray-400 group-hover:text-gray-900 shrink-0 stroke-[1.5]" />
              <span>Search</span>
            </div>
            <span className="text-[10px] text-gray-400 font-mono bg-[rgba(55,53,47,0.06)] px-1 rounded">⌘K</span>
          </button>

          <Link
            href="/ai-mentor"
            className="w-full flex items-center justify-between p-1.5 rounded-md text-xs text-[#37352F] font-medium bg-[#F0EBF9]/80 hover:bg-[#E8DEEE] transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3 text-[#4D2875]">
              <Sparkles className="size-4 text-[#8846C7] shrink-0 stroke-[1.5]" />
              <span>Ask Pip AI</span>
            </div>
            <span className="text-[10px] bg-[#8846C7] text-white px-1.5 rounded font-semibold">AI</span>
          </Link>
        </div>
      </div>

      <SidebarContent className="px-1.5 py-2">
        {/* Favorites Group */}
        <SidebarGroup className="py-1">
          <SidebarGroupLabel className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-2 h-6 flex items-center justify-between">
            <span>Favorites</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {favoritesNav.map((item) => {
                const isActive = pathname === item.url || pathname.startsWith(item.url + "/");
                const IconComponent = isActive && item.activeIcon ? item.activeIcon : item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      isActive={isActive}
                      className={`h-8 rounded-md px-2 text-[13px] transition-colors ${
                        isActive 
                          ? 'font-semibold text-gray-900 bg-[rgba(55,53,47,0.08)]' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-[rgba(55,53,47,0.06)]'
                      }`}
                      render={
                        <Link href={item.url} className="flex items-center gap-3 w-full">
                          <IconComponent className={`size-4 shrink-0 stroke-[1.5] transition-colors ${
                            isActive ? "text-gray-900" : "text-gray-400 group-hover:text-gray-900"
                          }`} />
                          <span className="truncate">{item.title}</span>
                        </Link>
                      }
                    />
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Private Workspace Group */}
        <SidebarGroup className="py-1 mt-1">
          <SidebarGroupLabel className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-2 h-6 flex items-center justify-between">
            <span>Workspace</span>
            <button
              onClick={() => toast("Creating a new workspace...")}
              className="hover:bg-[rgba(55,53,47,0.1)] p-0.5 rounded text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <Plus className="size-3.5 stroke-[1.5]" />
            </button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {mainWorkspaceNav.map((item) => {
                const isActive = pathname === item.url || pathname.startsWith(item.url + "/");
                const IconComponent = isActive && item.activeIcon ? item.activeIcon : item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      isActive={isActive}
                      className={`h-8 rounded-md px-2 text-[13px] transition-colors ${
                        isActive 
                          ? 'font-semibold text-gray-900 bg-[rgba(55,53,47,0.08)]' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-[rgba(55,53,47,0.06)]'
                      }`}
                      render={
                        <Link href={item.url} className="flex items-center gap-3 w-full group">
                          <IconComponent className={`size-4 shrink-0 stroke-[1.5] transition-colors ${
                            isActive ? "text-gray-900" : "text-gray-400 group-hover:text-gray-900"
                          }`} />
                          <span className="truncate">{item.title}</span>
                        </Link>
                      }
                    />
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Account Settings Group */}
        <SidebarGroup className="py-1 mt-2">
          <SidebarGroupLabel className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-2 h-6 flex items-center justify-between">
            <span>Account</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {accountNav.map((item) => {
                const isActive = pathname === item.url || pathname.startsWith(item.url + "/");
                const IconComponent = isActive && item.activeIcon ? item.activeIcon : item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      isActive={isActive}
                      className={`h-8 rounded-md px-2 text-[13px] transition-colors ${
                        isActive 
                          ? 'font-semibold text-gray-900 bg-[rgba(55,53,47,0.08)]' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-[rgba(55,53,47,0.06)]'
                      }`}
                      render={
                        <Link href={item.url} className="flex items-center gap-3 w-full group">
                          <IconComponent className={`size-4 shrink-0 stroke-[1.5] transition-colors ${
                            isActive ? "text-gray-900" : "text-gray-400 group-hover:text-gray-900"
                          }`} />
                          <span className="truncate">{item.title}</span>
                        </Link>
                      }
                    />
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User Profile Footer */}
      <div className="p-2 border-t border-[rgba(55,53,47,0.06)] mt-auto space-y-1">
        <Link
          href="/profile"
          className="flex items-center gap-2.5 p-1.5 rounded-md hover:bg-[rgba(55,53,47,0.08)] transition-colors cursor-pointer group"
        >
          <NotionAvatar seed={user.name} avatarIndex={user.avatarIndex} size="sm" hasShadow={false} />
          <div className="flex flex-col overflow-hidden">
            <span className="text-xs font-bold text-gray-900 truncate">{user.name}</span>
            <span className="text-[10px] text-gray-400 truncate">{user.email}</span>
          </div>
        </Link>
      </div>
    </Sidebar>
  );
}
