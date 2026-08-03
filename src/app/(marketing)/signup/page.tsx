"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Globe, Building2 } from "lucide-react";
import { toast } from "sonner";
import { useAppContext } from "@/context/app-context";

function PipLearnLogoMark({ className = "size-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      {/* Top Layer - Isometric Black Diamond */}
      <path d="M24 8 L38 16 L24 24 L10 16 Z" fill="#000000" />
      {/* Middle Layer - Isometric Electric Blue Chevron */}
      <path d="M10 21 L24 29 L38 21 L38 24.5 L24 32.5 L10 24.5 Z" fill="#0066FF" />
      {/* Bottom Layer - Isometric Black Chevron */}
      <path d="M10 29.5 L24 37.5 L38 29.5 L38 33 L24 41 L10 33 Z" fill="#000000" />
    </svg>
  );
}

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const { login } = useAppContext();
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || undefined);
    toast("Account created! Setting up your workspace...");
    router.push("/onboarding");
  };

  const handleOAuth = (provider: string) => {
    toast(`Connecting to ${provider}...`);
  };

  const handleLegal = (label: string) => {
    return (e: React.MouseEvent) => {
      e.preventDefault();
      toast(`${label} — coming soon`);
    };
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] flex flex-col items-center justify-center p-4 sm:p-6 text-[#37352F] select-none">
      {/* 1. Main Notion-Style Modal Card */}
      <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-[0_16px_40px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.04)] max-w-md w-full border border-[rgba(55,53,47,0.12)] my-8">
        
        {/* Main Header with Official PipLearn Stacked Layers Logo */}
        <div className="flex flex-col items-center mb-6">
          <Link href="/" className="mb-4 hover:scale-105 transition-transform">
            <PipLearnLogoMark className="size-12 sm:size-14" />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#000000] tracking-tight text-center">
            PipLearn: your AI workspace.
          </h1>
          <h2 className="text-lg sm:text-xl font-bold text-[rgba(55,53,47,0.45)] text-center mt-0.5">
            Sign up with your work email
          </h2>
        </div>

        {/* Form Input Section */}
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="text-left space-y-1.5">
            <label htmlFor="email" className="text-xs font-semibold text-[rgba(55,53,47,0.7)] block">
              Work email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              required
              className="w-full h-11 px-3.5 rounded-lg border-2 border-[#0066FF] text-sm font-medium text-black placeholder:text-[rgba(55,53,47,0.35)] outline-none focus:ring-4 focus:ring-[#0066FF]/15 transition-all bg-white"
            />
          </div>

          {/* Notion Gray Tip Box */}
          <div className="bg-[#EFEFEF] rounded-lg p-3.5 text-xs text-[#37352F] text-left leading-relaxed">
            <span className="font-bold">Tip: Use your work email</span> (if you have one) so it's easier for your team to join you on PipLearn
          </div>

          <button
            type="submit"
            className="w-full h-11 bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold text-sm rounded-lg flex items-center justify-center transition-colors shadow-xs mt-2 cursor-pointer"
          >
            Continue
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-6">
          <div className="border-t border-[rgba(55,53,47,0.12)] w-full" />
          <span className="bg-white px-3 text-xs font-semibold text-[rgba(55,53,47,0.45)] absolute">
            or continue with
          </span>
        </div>

        {/* 6 OAuth SSO Buttons (2 rows x 3 columns - identical to Login) */}
        <div className="grid grid-cols-3 gap-3">
          {/* 1. Google */}
          <button onClick={() => handleOAuth("Google")} className="h-16 border border-[rgba(55,53,47,0.14)] rounded-xl py-2.5 px-2 bg-white hover:bg-[#F7F7F5] flex flex-col items-center justify-center gap-1.5 text-xs font-semibold text-[#37352F] transition-all cursor-pointer shadow-2xs">
            <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Google</span>
          </button>

          {/* 2. GitHub */}
          <button onClick={() => handleOAuth("GitHub")} className="h-16 border border-[rgba(55,53,47,0.14)] rounded-xl py-2.5 px-2 bg-white hover:bg-[#F7F7F5] flex flex-col items-center justify-center gap-1.5 text-xs font-semibold text-[#37352F] transition-all cursor-pointer shadow-2xs">
            <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>GitHub</span>
          </button>

          {/* 3. Apple */}
          <button onClick={() => handleOAuth("Apple")} className="h-16 border border-[rgba(55,53,47,0.14)] rounded-xl py-2.5 px-2 bg-white hover:bg-[#F7F7F5] flex flex-col items-center justify-center gap-1.5 text-xs font-semibold text-[#37352F] transition-all cursor-pointer shadow-2xs">
            <svg viewBox="0 0 384 512" className="w-5 h-5 shrink-0" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
            </svg>
            <span>Apple</span>
          </button>

          {/* 4. Microsoft */}
          <button onClick={() => handleOAuth("Microsoft")} className="h-16 border border-[rgba(55,53,47,0.14)] rounded-xl py-2.5 px-2 bg-white hover:bg-[#F7F7F5] flex flex-col items-center justify-center gap-1.5 text-xs font-semibold text-[#37352F] transition-all cursor-pointer shadow-2xs">
            <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
              <rect x="2" y="2" width="9.5" height="9.5" fill="#F25022" />
              <rect x="12.5" y="2" width="9.5" height="9.5" fill="#7FBA00" />
              <rect x="2" y="12.5" width="9.5" height="9.5" fill="#00A4EF" />
              <rect x="12.5" y="12.5" width="9.5" height="9.5" fill="#FFB900" />
            </svg>
            <span>Microsoft</span>
          </button>

          {/* 5. Passkey */}
          <button onClick={() => handleOAuth("Passkey")} className="h-16 border border-[rgba(55,53,47,0.14)] rounded-xl py-2.5 px-2 bg-white hover:bg-[#F7F7F5] flex flex-col items-center justify-center gap-1.5 text-xs font-semibold text-[#37352F] transition-all cursor-pointer shadow-2xs">
            <svg viewBox="0 0 16 16" className="w-5 h-5 shrink-0" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5v-1a2 2 0 0 1 .01-.2 4.49 4.49 0 0 1 1.534-3.693Q8.844 9.002 8 9c-5 0-6 3-6 4m7 0a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1" />
            </svg>
            <span>Passkey</span>
          </button>

          {/* 6. SSO */}
          <button onClick={() => handleOAuth("SSO")} className="h-16 border border-[rgba(55,53,47,0.14)] rounded-xl py-2.5 px-2 bg-white hover:bg-[#F7F7F5] flex flex-col items-center justify-center gap-1.5 text-xs font-semibold text-[#37352F] transition-all cursor-pointer shadow-2xs">
            <Building2 className="w-5 h-5 text-[#37352F] shrink-0" />
            <span>SSO</span>
          </button>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center space-y-4">
          <p className="text-xs font-semibold text-[rgba(55,53,47,0.65)]">
            Existing user?{" "}
            <Link href="/login" className="text-[#37352F] font-extrabold underline hover:text-black">
              Log in
            </Link>
          </p>

          <p className="text-[11px] text-[rgba(55,53,47,0.5)] max-w-xs mx-auto leading-normal">
            By continuing, you acknowledge that you understand and agree to the{" "}
            <Link href="#" onClick={handleLegal("Terms & Conditions")} className="underline hover:text-black">Terms & Conditions</Link> and{" "}
            <Link href="#" onClick={handleLegal("Privacy Policy")} className="underline hover:text-black">Privacy Policy</Link>.
          </p>
        </div>
      </div>

      {/* Language Selector Footer */}
      <div
        onClick={() => toast("Language settings coming soon")}
        className="flex items-center gap-1 text-xs font-semibold text-[rgba(55,53,47,0.5)] cursor-pointer hover:text-black transition-colors"
      >
        <Globe className="size-3.5" />
        <span>Language: English (US) ▾</span>
      </div>
    </div>
  );
}
