"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TopNav } from "@/components/layout/top-nav";
import { PageTransition } from "@/components/layout/page-transition";
import { useAppContext } from "@/context/app-context";

function SkeletonLoader() {
  // Read dark mode synchronously to avoid flash — lazy initializer avoids setState-in-effect
  const [isDark] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      const theme = localStorage.getItem("piplearn_theme");
      if (theme === "dark") return true;
      if (theme === "system") return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch { /* ignore */ }
    return false;
  });


  return (
    <div className={`min-h-screen flex ${isDark ? "bg-[#191919]" : "bg-[#F7F7F5]"}`}>
      {/* Sidebar Skeleton */}
      <div className={`w-[240px] shrink-0 border-r ${isDark ? "bg-[#202020] border-[rgba(255,255,255,0.06)]" : "bg-[#FBFBFA] border-[rgba(55,53,47,0.09)]"} p-3 space-y-4`}>
        <div className={`h-8 rounded-md ${isDark ? "bg-[rgba(255,255,255,0.06)]" : "bg-[rgba(55,53,47,0.06)]"} animate-pulse`} />
        <div className="space-y-2 mt-6">
          {[75, 90, 68, 82, 72, 85].map((w, i) => (
            <div key={i} className={`h-7 rounded-md ${isDark ? "bg-[rgba(255,255,255,0.04)]" : "bg-[rgba(55,53,47,0.04)]"} animate-pulse`} style={{ width: `${w}%`, animationDelay: `${i * 80}ms` }} />
          ))}
        </div>
        <div className="space-y-2 mt-8">
          {[65, 78, 58].map((w, i) => (
            <div key={i} className={`h-7 rounded-md ${isDark ? "bg-[rgba(255,255,255,0.04)]" : "bg-[rgba(55,53,47,0.04)]"} animate-pulse`} style={{ width: `${w}%`, animationDelay: `${(i + 6) * 80}ms` }} />
          ))}
        </div>
      </div>
      {/* Main Content Skeleton */}
      <div className="flex-1 flex flex-col">
        {/* Top Nav Skeleton */}
        <div className={`h-11 border-b ${isDark ? "bg-[#191919]/95 border-[rgba(255,255,255,0.09)]" : "bg-white/95 border-[rgba(55,53,47,0.09)]"} flex items-center px-3 gap-2`}>
          <div className={`h-5 w-32 rounded ${isDark ? "bg-[rgba(255,255,255,0.06)]" : "bg-[rgba(55,53,47,0.06)]"} animate-pulse`} />
          <div className="flex-1" />
          <div className={`h-6 w-16 rounded ${isDark ? "bg-[rgba(255,255,255,0.06)]" : "bg-[rgba(55,53,47,0.06)]"} animate-pulse`} />
        </div>
        {/* Content Area Skeleton */}
        <div className="p-8 max-w-5xl mx-auto w-full space-y-6">
          <div className={`h-8 w-48 rounded ${isDark ? "bg-[rgba(255,255,255,0.06)]" : "bg-[rgba(55,53,47,0.06)]"} animate-pulse`} />
          <div className={`h-4 w-96 rounded ${isDark ? "bg-[rgba(255,255,255,0.04)]" : "bg-[rgba(55,53,47,0.04)]"} animate-pulse`} style={{ animationDelay: "100ms" }} />
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`h-32 rounded-lg ${isDark ? "bg-[rgba(255,255,255,0.04)]" : "bg-[rgba(55,53,47,0.04)]"} animate-pulse`} style={{ animationDelay: `${(i + 1) * 120}ms` }} />
            ))}
          </div>
          <div className={`h-48 rounded-lg ${isDark ? "bg-[rgba(255,255,255,0.04)]" : "bg-[rgba(55,53,47,0.04)]"} animate-pulse mt-4`} style={{ animationDelay: "400ms" }} />
        </div>
      </div>
    </div>
  );
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAppContext();
  const router = useRouter();
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push("/login");
    }
  }, [mounted, isAuthenticated, router]);

  if (!mounted || !isAuthenticated) {
    return <SkeletonLoader />;
  }

  const isWideRoute = pathname.includes("/courses/python");

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-white dark:bg-[#191919] w-full text-neutral-900 dark:text-[rgba(255,255,255,0.81)] transition-colors">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto w-full relative flex flex-col scroll-smooth">
          <TopNav />
          <div className={`${isWideRoute ? "p-3 sm:p-6 max-w-6xl" : "p-4 sm:p-8 max-w-5xl"} mx-auto w-full flex-1 flex flex-col`}>
            <PageTransition>{children}</PageTransition>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

