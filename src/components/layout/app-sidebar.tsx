"use client";

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
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NotionIcon } from "@/components/ui/notion-icon";

const favoritesNav = [
  { title: "Python Sandbox", url: "/sandbox", icon: "code" as const, color: "green" as const },
  { title: "AI Mentor", url: "/ai-mentor", icon: "sparkles" as const, color: "purple" as const },
];

const mainWorkspaceNav = [
  { title: "Dashboard", url: "/dashboard", icon: "document" as const, color: "gray" as const },
  { title: "Course Library", url: "/courses", icon: "book" as const, color: "blue" as const },
  { title: "Practice Problems", url: "/practice", icon: "target" as const, color: "orange" as const },
  { title: "Projects", url: "/projects", icon: "briefcase" as const, color: "yellow" as const },
  { title: "Leaderboard", url: "/leaderboard", icon: "trophy" as const, color: "yellow" as const },
  { title: "Community", url: "/community", icon: "chat" as const, color: "pink" as const },
];

const accountNav = [
  { title: "Profile", url: "/profile", icon: "user" as const, color: "gray" as const },
  { title: "Settings & Members", url: "/settings", icon: "settings" as const, color: "gray" as const },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-[rgba(55,53,47,0.09)] bg-[#FBFBFA] text-[#37352F] text-sm">
      {/* Notion Workspace Switcher Header */}
      <div className="p-2 border-b border-[rgba(55,53,47,0.06)]">
        <Link 
          href="/dashboard"
          className="flex items-center justify-between p-1.5 rounded hover:bg-[rgba(55,53,47,0.08)] transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <NotionIcon name="python" color="yellow" size="sm" className="size-5 p-0.5 border-black/10" />
            <div className="truncate font-semibold text-[13px] text-[#37352F]">
              PipLearn Workspace
            </div>
          </div>
          <ChevronDown className="size-3.5 text-[rgba(55,53,47,0.45)] group-hover:text-[#37352F] shrink-0" />
        </Link>

        {/* Notion Quick Search & AI Actions */}
        <div className="mt-1 space-y-0.5">
          <button className="w-full flex items-center justify-between p-1.5 rounded text-xs text-[rgba(55,53,47,0.65)] hover:bg-[rgba(55,53,47,0.08)] hover:text-[#37352F] transition-colors cursor-pointer">
            <div className="flex items-center gap-2">
              <Search className="size-3.5 text-[rgba(55,53,47,0.45)]" />
              <span>Search</span>
            </div>
            <span className="text-[10px] text-[rgba(55,53,47,0.4)] font-mono bg-[rgba(55,53,47,0.06)] px-1 rounded">⌘K</span>
          </button>

          <Link
            href="/ai-mentor"
            className="w-full flex items-center justify-between p-1.5 rounded text-xs text-[#37352F] font-medium bg-[#F0EBF9]/80 hover:bg-[#E8DEEE] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2 text-[#4D2875]">
              <Sparkles className="size-3.5 text-[#8846C7]" />
              <span>Ask Pip AI</span>
            </div>
            <span className="text-[10px] bg-[#8846C7] text-white px-1 rounded font-semibold">AI</span>
          </Link>
        </div>
      </div>

      <SidebarContent className="px-1.5 py-2">
        {/* Favorites Group */}
        <SidebarGroup className="py-1">
          <SidebarGroupLabel className="text-[11px] font-semibold text-[rgba(55,53,47,0.45)] uppercase tracking-wider px-2 h-6 flex items-center justify-between">
            <span>Favorites</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {favoritesNav.map((item) => {
                const isActive = pathname === item.url || pathname.startsWith(item.url + "/");
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      isActive={isActive}
                      className={`h-7 rounded px-2 text-[13px] transition-colors ${
                        isActive 
                          ? 'font-semibold text-[#37352F] bg-[rgba(55,53,47,0.08)]' 
                          : 'text-[#37352F] hover:bg-[rgba(55,53,47,0.06)]'
                      }`}
                      render={
                        <Link href={item.url} className="flex items-center gap-2 w-full">
                          <NotionIcon name={item.icon} color={item.color} size="sm" className="size-4 p-0.5 border-none bg-transparent" />
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
          <SidebarGroupLabel className="text-[11px] font-semibold text-[rgba(55,53,47,0.45)] uppercase tracking-wider px-2 h-6 flex items-center justify-between">
            <span>Workspace</span>
            <button className="hover:bg-[rgba(55,53,47,0.1)] p-0.5 rounded text-[rgba(55,53,47,0.45)] hover:text-[#37352F]">
              <Plus className="size-3" />
            </button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {mainWorkspaceNav.map((item) => {
                const isActive = pathname === item.url || pathname.startsWith(item.url + "/");
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      isActive={isActive}
                      className={`h-7 rounded px-2 text-[13px] transition-colors ${
                        isActive 
                          ? 'font-semibold text-[#37352F] bg-[rgba(55,53,47,0.08)]' 
                          : 'text-[#37352F] hover:bg-[rgba(55,53,47,0.06)]'
                      }`}
                      render={
                        <Link href={item.url} className="flex items-center gap-2 w-full">
                          <NotionIcon name={item.icon} color={item.color} size="sm" className="size-4 p-0.5 border-none bg-transparent" />
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
          <SidebarGroupLabel className="text-[11px] font-semibold text-[rgba(55,53,47,0.45)] uppercase tracking-wider px-2 h-6 flex items-center justify-between">
            <span>Account</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {accountNav.map((item) => {
                const isActive = pathname === item.url || pathname.startsWith(item.url + "/");
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      isActive={isActive}
                      className={`h-7 rounded px-2 text-[13px] transition-colors ${
                        isActive 
                          ? 'font-semibold text-[#37352F] bg-[rgba(55,53,47,0.08)]' 
                          : 'text-[#37352F] hover:bg-[rgba(55,53,47,0.06)]'
                      }`}
                      render={
                        <Link href={item.url} className="flex items-center gap-2 w-full">
                          <NotionIcon name={item.icon} color={item.color} size="sm" className="size-4 p-0.5 border-none bg-transparent" />
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
          className="flex items-center gap-2 p-1.5 rounded text-xs text-[rgba(55,53,47,0.65)] hover:bg-[rgba(55,53,47,0.08)] hover:text-[#37352F] transition-colors cursor-pointer"
        >
          <Plus className="size-3.5 text-[rgba(55,53,47,0.45)]" />
          <span className="font-medium">New Python Page</span>
        </Link>
      </div>
    </Sidebar>
  );
}

