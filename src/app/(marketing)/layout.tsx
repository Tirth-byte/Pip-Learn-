import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { ChevronDown } from "lucide-react";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#37352F] font-sans antialiased">
      {/* Notion Top Navigation Bar */}
      <header className="h-14 border-b border-[rgba(55,53,47,0.09)] flex items-center justify-between px-6 sticky top-0 bg-white/95 backdrop-blur-md z-50 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/">
            <Logo />
          </Link>
          
          <nav className="hidden lg:flex items-center gap-1 text-xs font-medium text-[rgba(55,53,47,0.75)]">
            <button className="px-2.5 py-1.5 rounded hover:bg-[#F1F1EF] transition-colors flex items-center gap-1 cursor-pointer">
              Product <ChevronDown className="size-3 opacity-60" />
            </button>
            <button className="px-2.5 py-1.5 rounded hover:bg-[#F1F1EF] transition-colors flex items-center gap-1 cursor-pointer">
              Resources <ChevronDown className="size-3 opacity-60" />
            </button>
            <Link href="/courses" className="px-2.5 py-1.5 rounded hover:bg-[#F1F1EF] transition-colors">
              Developers
            </Link>
            <Link href="/enterprise" className="px-2.5 py-1.5 rounded hover:bg-[#F1F1EF] transition-colors">
              Enterprise
            </Link>
            <Link href="/pricing" className="px-2.5 py-1.5 rounded hover:bg-[#F1F1EF] transition-colors">
              Pricing
            </Link>
            <Link href="/demo" className="px-2.5 py-1.5 rounded hover:bg-[#F1F1EF] transition-colors">
              Request a demo
            </Link>
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
              <li><a href="#" className="hover:underline">About us</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Press</a></li>
              <li><a href="#" className="hover:underline">News</a></li>
              <li><a href="#" className="hover:underline">Media kit</a></li>
              <li><a href="#" className="hover:underline">Contact sales</a></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-[#37352F] mb-3">Download</div>
            <ul className="space-y-2.5 text-[11px]">
              <li><a href="#" className="hover:underline">iOS & Android</a></li>
              <li><a href="#" className="hover:underline">Mac & Windows</a></li>
              <li><a href="#" className="hover:underline">Web Clipper</a></li>
              <li><a href="#" className="hover:underline">VS Code Extension</a></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-[#37352F] mb-3">Resources</div>
            <ul className="space-y-2.5 text-[11px]">
              <li><a href="#" className="hover:underline">Help center</a></li>
              <li><Link href="/pricing" className="hover:underline">Pricing</Link></li>
              <li><a href="#" className="hover:underline">Template gallery</a></li>
              <li><a href="#" className="hover:underline">Community</a></li>
              <li><a href="#" className="hover:underline">Integrations</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

