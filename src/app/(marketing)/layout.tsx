"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";

function comingSoonToast(label: string) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    toast(`${label} — coming soon`);
  };
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#37352F] font-sans antialiased">
      {/* Notion Top Navigation Bar */}
      <header className="h-14 border-b border-[rgba(55,53,47,0.09)] sticky top-0 bg-white/95 backdrop-blur-md z-50 w-full">
        <div className="flex items-center justify-between px-6 h-full max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/">
            <Logo />
          </Link>
          
          <nav className="hidden lg:flex items-center gap-1 text-xs font-medium text-[rgba(55,53,47,0.75)]">
            <button
              onClick={() => toast("Exploring PipLearn product features...")}
              className="px-2.5 py-1.5 rounded hover:bg-[#F1F1EF] transition-colors flex items-center gap-1 cursor-pointer"
            >
              Product <ChevronDown className="size-3 opacity-60" />
            </button>
            <button
              onClick={() => toast("Loading resources & guides...")}
              className="px-2.5 py-1.5 rounded hover:bg-[#F1F1EF] transition-colors flex items-center gap-1 cursor-pointer"
            >
              Resources <ChevronDown className="size-3 opacity-60" />
            </button>
            <Link href="/courses" className="px-2.5 py-1.5 rounded hover:bg-[#F1F1EF] transition-colors">
              Developers
            </Link>
            <button
              onClick={() => toast("Enterprise plans — coming soon")}
              className="px-2.5 py-1.5 rounded hover:bg-[#F1F1EF] transition-colors cursor-pointer"
            >
              Enterprise
            </button>
            <button
              onClick={() => toast("Loading pricing plans...")}
              className="px-2.5 py-1.5 rounded hover:bg-[#F1F1EF] transition-colors cursor-pointer"
            >
              Pricing
            </button>
            <button
              onClick={() => toast("Booking a demo — our team will reach out!")}
              className="px-2.5 py-1.5 rounded hover:bg-[#F1F1EF] transition-colors cursor-pointer"
            >
              Request a demo
            </button>
          </nav>
        </div>

        <nav className="flex items-center gap-3">
          <Link 
            href="/login" 
            className="text-xs font-medium text-[#37352F] px-3 py-1.5 rounded hover:bg-[#F1F1EF] transition-colors"
          >
            Log in
          </Link>
          <Button asChild size="sm" className="bg-[#2383E2] hover:bg-[#1D6FBE] text-white h-8 px-3.5 text-xs font-semibold rounded-md shadow-xs border-none">
            <Link href="/signup">
              Get PipLearn free
            </Link>
          </Button>
        </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col">{children}</main>

      {/* Notion Style Footer */}
      <footer className="border-t border-[rgba(55,53,47,0.09)] bg-white pt-16 pb-16 px-6 text-xs text-[rgba(55,53,47,0.65)]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 space-y-4">
            <Logo />
            <p className="text-[11px] text-[rgba(55,53,47,0.55)] max-w-xs leading-relaxed">
              PipLearn is the connected workspace for Python developers, students, and engineers. Write, test, and master Python side-by-side with AI.
            </p>
            <div className="pt-2 text-[11px] text-[rgba(55,53,47,0.45)]">
              © {new Date().getFullYear()} PipLearn, Inc. All rights reserved.
            </div>
          </div>

          <div>
            <div className="font-semibold text-[#37352F] mb-3">Company</div>
            <ul className="space-y-2.5 text-[11px]">
              <li><a href="#" onClick={comingSoonToast("About us")} className="hover:underline">About us</a></li>
              <li><a href="#" onClick={comingSoonToast("Careers")} className="hover:underline">Careers</a></li>
              <li><a href="#" onClick={comingSoonToast("Press")} className="hover:underline">Press</a></li>
              <li><a href="#" onClick={comingSoonToast("News")} className="hover:underline">News</a></li>
              <li><a href="#" onClick={comingSoonToast("Media kit")} className="hover:underline">Media kit</a></li>
              <li><a href="#" onClick={comingSoonToast("Contact sales")} className="hover:underline">Contact sales</a></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-[#37352F] mb-3">Download</div>
            <ul className="space-y-2.5 text-[11px]">
              <li><a href="#" onClick={comingSoonToast("iOS & Android app")} className="hover:underline">iOS & Android</a></li>
              <li><a href="#" onClick={comingSoonToast("Mac & Windows desktop")} className="hover:underline">Mac & Windows</a></li>
              <li><a href="#" onClick={comingSoonToast("Web Clipper")} className="hover:underline">Web Clipper</a></li>
              <li><a href="#" onClick={comingSoonToast("VS Code Extension")} className="hover:underline">VS Code Extension</a></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-[#37352F] mb-3">Resources</div>
            <ul className="space-y-2.5 text-[11px]">
              <li><a href="#" onClick={comingSoonToast("Help center")} className="hover:underline">Help center</a></li>
              <li><button onClick={() => toast("Loading pricing plans...")} className="hover:underline cursor-pointer bg-transparent border-none p-0 text-inherit font-inherit">Pricing</button></li>
              <li><a href="#" onClick={comingSoonToast("Template gallery")} className="hover:underline">Template gallery</a></li>
              <li><a href="#" onClick={comingSoonToast("Community")} className="hover:underline">Community</a></li>
              <li><a href="#" onClick={comingSoonToast("Integrations")} className="hover:underline">Integrations</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

