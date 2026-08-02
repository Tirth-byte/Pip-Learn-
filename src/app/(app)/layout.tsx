import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TopNav } from "@/components/layout/top-nav";
import { PageTransition } from "@/components/layout/page-transition";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-white w-full text-neutral-900">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto w-full relative flex flex-col scroll-smooth">
          <TopNav />
          <div className="p-8 max-w-5xl mx-auto w-full flex-1 flex flex-col">
            <PageTransition>{children}</PageTransition>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
