"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, Target, Hammer, Check, ArrowRight } from "lucide-react";

function PipLearnLogoMark({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <path d="M24 8 L38 16 L24 24 L10 16 Z" fill="#000000" />
      <path d="M10 21 L24 29 L38 21 L38 24.5 L24 32.5 L10 24.5 Z" fill="#0066FF" />
      <path d="M10 29.5 L24 37.5 L38 29.5 L38 33 L24 41 L10 33 Z" fill="#000000" />
    </svg>
  );
}

interface GoalOption {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
}

export default function OnboardingPage() {
  const [selectedGoal, setSelectedGoal] = useState<string>("scratch");

  const goals: GoalOption[] = [
    {
      id: "scratch",
      title: "Learn Python from scratch",
      subtitle: "I have little to no programming experience.",
      icon: BookOpen,
    },
    {
      id: "interview",
      title: "Prepare for interviews",
      subtitle: "I want to practice algorithms and data structures.",
      icon: Target,
    },
    {
      id: "projects",
      title: "Build real-world projects",
      subtitle: "I want to learn by building developer tools & applications.",
      icon: Hammer,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F5] font-sans text-[#37352F] select-none">
      {/* Top Header Bar */}
      <header className="h-14 border-b border-[rgba(55,53,47,0.1)] bg-white flex items-center justify-between px-6 sm:px-10">
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <PipLearnLogoMark className="size-7" />
          <span className="font-extrabold text-base tracking-tight text-black">PipLearn</span>
        </Link>
        <span className="text-xs font-mono font-semibold text-[rgba(55,53,47,0.45)]">
          Step 1 of 3
        </span>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-xl bg-white rounded-2xl p-8 sm:p-10 border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] my-6">
          
          {/* Title & Subtitle Header */}
          <div className="text-left mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-1.5">
              What is your primary goal?
            </h1>
            <p className="text-sm text-gray-500">
              We'll tailor your interactive experience based on your selection.
            </p>
          </div>

          {/* Selectable Custom Option Cards */}
          <div className="space-y-3.5">
            {goals.map((goal) => {
              const Icon = goal.icon;
              const isSelected = selectedGoal === goal.id;

              return (
                <div
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  className={`flex items-center gap-4 p-4 sm:p-4.5 rounded-xl cursor-pointer transition-all duration-200 ease-out select-none ${
                    isSelected
                      ? "bg-gray-50/70 border-2 border-black shadow-xs"
                      : "bg-white border border-gray-200 hover:bg-gray-50/60 hover:border-gray-300"
                  }`}
                >
                  {/* Left Icon */}
                  <div
                    className={`size-10 sm:size-11 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
                      isSelected
                        ? "bg-white text-black border-gray-300 shadow-2xs"
                        : "bg-gray-50 text-gray-400 border-gray-200"
                    }`}
                  >
                    <Icon className="size-5" />
                  </div>

                  {/* Middle Text Content */}
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-sm sm:text-base text-gray-900 leading-snug">
                      {goal.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5 leading-normal">
                      {goal.subtitle}
                    </p>
                  </div>

                  {/* Custom Right-Side Checkmark Circle */}
                  <div
                    className={`size-5 sm:size-5.5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isSelected
                        ? "bg-black border-2 border-black text-white"
                        : "border-2 border-gray-300 bg-white"
                    }`}
                  >
                    {isSelected && <Check className="size-3.5 stroke-[3]" />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Actions */}
          <div className="flex justify-between items-center pt-6 mt-8 border-t border-gray-100">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors"
            >
              Skip for now
            </Link>

            <Link
              href="/dashboard"
              className="bg-black hover:bg-gray-800 text-white rounded-lg px-6 h-11 text-sm font-semibold transition-colors flex items-center gap-2 shadow-xs"
            >
              <span>Continue</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
