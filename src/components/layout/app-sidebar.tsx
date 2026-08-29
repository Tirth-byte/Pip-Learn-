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
  Home,
  BookOpen,
  Target,
  Folder,
  FolderOpen,
  Trophy,
  TrendingUp,
  MessageSquare,
  User,
  Settings,
  Flame,
  Zap,
  LucideIcon
} from "lucide-react";
import { useAppContext } from "@/context/app-context";
import { getInstitutionById } from "@/lib/institutions";
import { NotionAvatar } from "@/components/ui/notion-avatar";

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

const learnNav: NavItem[] = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Courses", url: "/courses", icon: BookOpen },
  { title: "Practice", url: "/practice", icon: Target },
  { title: "Projects", url: "/projects", icon: Folder, activeIcon: FolderOpen },
];

const progressNav: NavItem[] = [
  { title: "Progress", url: "/portfolio", icon: TrendingUp },
  { title: "Leaderboard", url: "/leaderboard", icon: Trophy },
];

const communityNav: NavItem[] = [
  { title: "Community", url: "/community", icon: MessageSquare },
];

const personalNav: NavItem[] = [
  { title: "Profile", url: "/profile", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { user, progress } = useAppContext();
  const userInstitution = getInstitutionById(user.institutionId);

  return (
    <Sidebar className="border-r border-neutral-200/80 dark:border-neutral-800 bg-[#FBFBFA] dark:bg-[#1A1A1A] text-[#37352F] dark:text-[rgba(255,255,255,0.85)] text-sm select-none transition-colors">
      {/* Brand Header */}
      <div className="p-3 border-b border-neutral-100 dark:border-neutral-800/80">
        <Link 
          href="/dashboard"
          className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group"
        >
          <PipLearnLogoMark className="size-6 shrink-0" />
          <div className="flex flex-col overflow-hidden">
            <span className="font-extrabold text-sm tracking-tight text-neutral-900 dark:text-white leading-tight">
              pip learn
            </span>
            <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium">
              Python Platform
            </span>
          </div>
        </Link>
      </div>

      <SidebarContent className="px-2 py-3 space-y-4">
        {/* 1. LEARN GROUP */}
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider px-2.5 h-6 flex items-center">
            Learn
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {learnNav.map((item) => {
                const isActive = pathname === item.url || (item.url !== "/dashboard" && pathname.startsWith(item.url + "/"));
                const IconComponent = isActive && item.activeIcon ? item.activeIcon : item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      isActive={isActive}
                      className={`h-8.5 rounded-lg px-2.5 text-[13px] font-medium transition-all ${
                        isActive 
                          ? 'font-semibold text-neutral-900 dark:text-white bg-neutral-200/60 dark:bg-neutral-800 shadow-2xs' 
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
                      }`}
                      render={
                        <Link href={item.url} className="flex items-center gap-2.5 w-full">
                          <IconComponent className={`size-4 shrink-0 stroke-[1.75] transition-colors ${
                            isActive ? "text-[#0066FF] dark:text-[#3B82F6]" : "text-neutral-400 dark:text-neutral-500"
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

        {/* 2. PROGRESS GROUP */}
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider px-2.5 h-6 flex items-center">
            Progress
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {progressNav.map((item) => {
                const isActive = pathname === item.url || pathname.startsWith(item.url + "/");
                const IconComponent = isActive && item.activeIcon ? item.activeIcon : item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      isActive={isActive}
                      className={`h-8.5 rounded-lg px-2.5 text-[13px] font-medium transition-all ${
                        isActive 
                          ? 'font-semibold text-neutral-900 dark:text-white bg-neutral-200/60 dark:bg-neutral-800 shadow-2xs' 
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
                      }`}
                      render={
                        <Link href={item.url} className="flex items-center gap-2.5 w-full">
                          <IconComponent className={`size-4 shrink-0 stroke-[1.75] transition-colors ${
                            isActive ? "text-[#0066FF] dark:text-[#3B82F6]" : "text-neutral-400 dark:text-neutral-500"
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

        {/* 3. COMMUNITY GROUP */}
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider px-2.5 h-6 flex items-center">
            Community
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {communityNav.map((item) => {
                const isActive = pathname === item.url || pathname.startsWith(item.url + "/");
                const IconComponent = isActive && item.activeIcon ? item.activeIcon : item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      isActive={isActive}
                      className={`h-8.5 rounded-lg px-2.5 text-[13px] font-medium transition-all ${
                        isActive 
                          ? 'font-semibold text-neutral-900 dark:text-white bg-neutral-200/60 dark:bg-neutral-800 shadow-2xs' 
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
                      }`}
                      render={
                        <Link href={item.url} className="flex items-center gap-2.5 w-full">
                          <IconComponent className={`size-4 shrink-0 stroke-[1.75] transition-colors ${
                            isActive ? "text-[#0066FF] dark:text-[#3B82F6]" : "text-neutral-400 dark:text-neutral-500"
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

        {/* 4. PERSONAL GROUP */}
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider px-2.5 h-6 flex items-center">
            Personal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {personalNav.map((item) => {
                const isActive = pathname === item.url || pathname.startsWith(item.url + "/");
                const IconComponent = isActive && item.activeIcon ? item.activeIcon : item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      isActive={isActive}
                      className={`h-8.5 rounded-lg px-2.5 text-[13px] font-medium transition-all ${
                        isActive 
                          ? 'font-semibold text-neutral-900 dark:text-white bg-neutral-200/60 dark:bg-neutral-800 shadow-2xs' 
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
                      }`}
                      render={
                        <Link href={item.url} className="flex items-center gap-2.5 w-full">
                          <IconComponent className={`size-4 shrink-0 stroke-[1.75] transition-colors ${
                            isActive ? "text-[#0066FF] dark:text-[#3B82F6]" : "text-neutral-400 dark:text-neutral-500"
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

      {/* Learner Profile Footer with Streak & XP */}
      <div className="p-2 border-t border-neutral-100 dark:border-neutral-800 mt-auto space-y-1 bg-[#F5F5F3] dark:bg-[#181818]">
        <Link
          href="/profile"
          className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors group"
        >
          <NotionAvatar seed={user.name} avatarIndex={user.avatarIndex} size="sm" hasShadow={false} />
          <div className="flex flex-col overflow-hidden">
            <span className="text-xs font-bold text-neutral-900 dark:text-white truncate">{user.name}</span>
            <span className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
              {userInstitution?.shortName || userInstitution?.name || "Independent Learner"}
            </span>
          </div>
        </Link>

        {/* Motivation Streak & XP Micro-Pills */}
        <div className="flex items-center justify-between px-1.5 py-1">
          <div className="flex items-center gap-1 text-[10px] text-neutral-600 dark:text-neutral-400 font-semibold">
            <Flame className="size-3 text-orange-500 shrink-0 fill-orange-500/20" />
            <span>{progress.streak}d streak</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-neutral-600 dark:text-neutral-400 font-semibold">
            <Zap className="size-3 text-amber-500 shrink-0 fill-amber-500/20" />
            <span>{progress.xp.toLocaleString()} XP</span>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
