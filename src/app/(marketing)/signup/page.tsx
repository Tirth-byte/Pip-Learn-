"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Globe } from "lucide-react";

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
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
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

          <Link
            href="/onboarding"
            className="w-full h-11 bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold text-sm rounded-lg flex items-center justify-center transition-colors shadow-xs mt-2"
          >
            Continue
          </Link>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-6">
          <div className="border-t border-[rgba(55,53,47,0.12)] w-full" />
          <span className="bg-white px-3 text-xs font-semibold text-[rgba(55,53,47,0.45)] absolute">
            or continue with
          </span>
        </div>

        {/* 3 OAuth SSO Buttons (as shown in Signup screenshot) */}
        <div className="grid grid-cols-3 gap-2.5">
          {/* 1. Google */}
          <button className="h-14 border border-[rgba(55,53,47,0.14)] rounded-xl py-2 px-1 bg-white hover:bg-[#F7F7F5] flex flex-col items-center justify-center gap-1 text-[11px] font-bold text-[#37352F] transition-colors cursor-pointer shadow-2xs">
            <svg viewBox="0 0 24 24" className="size-5 shrink-0">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Google</span>
          </button>

          {/* 2. Microsoft */}
          <button className="h-14 border border-[rgba(55,53,47,0.14)] rounded-xl py-2 px-1 bg-white hover:bg-[#F7F7F5] flex flex-col items-center justify-center gap-1 text-[11px] font-bold text-[#37352F] transition-colors cursor-pointer shadow-2xs">
            <svg viewBox="0 0 24 24" className="size-5 shrink-0">
              <rect x="2" y="2" width="9.5" height="9.5" fill="#F25022" />
              <rect x="12.5" y="2" width="9.5" height="9.5" fill="#7FBA00" />
              <rect x="2" y="12.5" width="9.5" height="9.5" fill="#00A4EF" />
              <rect x="12.5" y="12.5" width="9.5" height="9.5" fill="#FFB900" />
            </svg>
            <span>Microsoft</span>
          </button>

          {/* 3. ChatGPT / OpenAI */}
          <button className="h-14 border border-[rgba(55,53,47,0.14)] rounded-xl py-2 px-1 bg-white hover:bg-[#F7F7F5] flex flex-col items-center justify-center gap-1 text-[11px] font-bold text-[#37352F] transition-colors cursor-pointer shadow-2xs">
            <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="currentColor">
              <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 19.0193 19.8182a6.0559 6.0559 0 0 0 3.2626-9.9971zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0819 4.7792-2.7582a.791.791 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4954 4.4959zm-9.684-4.8872a4.4755 4.4755 0 0 1-.5346-3.0037l.142.0833 4.7839 2.7582a.791.791 0 0 0 .7854 0l5.8341-3.3688v2.3324a.0807.0807 0 0 1-.0332.0664l-4.8361 2.7937a4.504 4.504 0 0 1-6.1415-1.6615zm-1.0205-10.825a4.4755 4.4755 0 0 1 2.3418-1.9629l.0001.1637v5.5164a.791.791 0 0 0 .3927.6813l5.8341 3.3688-2.02 1.1686a.0758.0758 0 0 1-.0712 0l-4.8361-2.7937a4.504 4.504 0 0 1-1.6414-6.1422zm16.597 3.0037a4.4755 4.4755 0 0 1 .5346 3.0037l-.142-.0833-4.7839-2.7582a.791.791 0 0 0-.7854 0l-5.8341 3.3688v-2.3324a.0807.0807 0 0 1 .0332-.0664l4.8361-2.7937a4.504 4.504 0 0 1 6.1415 1.6615zm1.0205 10.825a4.4755 4.4755 0 0 1-2.3418 1.9629l-.0001-.1637v-5.5164a.791.791 0 0 0-.3927-.6813l-5.8341-3.3688 2.02-1.1686a.0758.0758 0 0 1 .0712 0l4.8361 2.7937a4.504 4.504 0 0 1 1.6414 6.1422zm-12.441-3.3072l2.6738-1.5434 2.6738 1.5434v3.0868l-2.6738 1.5434-2.6738-1.5434z" />
            </svg>
            <span>ChatGPT</span>
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
            <Link href="#" className="underline hover:text-black">Terms & Conditions</Link> and{" "}
            <Link href="#" className="underline hover:text-black">Privacy Policy</Link>.
          </p>
        </div>
      </div>

      {/* Language Selector Footer */}
      <div className="flex items-center gap-1 text-xs font-semibold text-[rgba(55,53,47,0.5)] cursor-pointer hover:text-black transition-colors">
        <Globe className="size-3.5" />
        <span>Language: English (US) ▾</span>
      </div>
    </div>
  );
}
