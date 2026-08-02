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

  return (
    <Sidebar className="border-r border-[rgba(55,53,47,0.09)] bg-[#FBFBFA] text-[#37352F] text-sm select-none">
      {/* Workspace Switcher Header */}
      <div className="p-2 border-b border-[rgba(55,53,47,0.06)]">
        <Link 
          href="/dashboard"
          className="flex items-center justify-between p-1.5 rounded-md hover:bg-[rgba(55,53,47,0.08)] transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="size-6 rounded-md bg-black text-white flex items-center justify-center shrink-0">
              <Terminal className="size-3.5 text-amber-400 stroke-[1.5]" />
            </div>
            <div className="truncate font-semibold text-xs text-[#37352F]">
              PipLearn Workspace
            </div>
          </div>
          <ChevronDown className="size-3.5 text-gray-400 group-hover:text-gray-900 shrink-0 stroke-[1.5]" />
        </Link>

        {/* Quick Search & AI Actions */}
        <div className="mt-1 space-y-0.5">
          <button className="w-full flex items-center justify-between p-1.5 rounded-md text-xs text-gray-600 hover:bg-[rgba(55,53,47,0.08)] hover:text-gray-900 transition-colors cursor-pointer group">
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
            <button className="hover:bg-[rgba(55,53,47,0.1)] p-0.5 rounded text-gray-400 hover:text-gray-900 transition-colors">
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

      {/* Notion New Page Footer */}
      <div className="p-2 border-t border-[rgba(55,53,47,0.06)] mt-auto">
        <Link 
          href="/sandbox" 
          className="flex items-center gap-3 p-1.5 rounded-md text-xs text-gray-600 hover:bg-[rgba(55,53,47,0.08)] hover:text-gray-900 transition-colors cursor-pointer group"
        >
          <Plus className="size-4 text-gray-400 group-hover:text-gray-900 shrink-0 stroke-[1.5]" />
          <span className="font-medium">New Python Page</span>
        </Link>
      </div>
    </Sidebar>
  );
}
