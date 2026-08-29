"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, ArrowRight, ArrowLeft, Sparkles, GraduationCap } from "lucide-react";
import { useAppContext } from "@/context/app-context";
import { InstitutionSelector } from "@/components/institutions/institution-selector";
import { Institution } from "@/lib/institutions";
import { toast } from "sonner";

function PipLearnLogoMark({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <path d="M24 8 L38 16 L24 24 L10 16 Z" fill="#000000" />
      <path d="M10 21 L24 29 L38 21 L38 24.5 L24 32.5 L10 24.5 Z" fill="#0066FF" />
      <path d="M10 29.5 L24 37.5 L38 29.5 L38 33 L24 41 L10 33 Z" fill="#000000" />
    </svg>
  );
}

{/* Notion Circular Sticker Avatar 1: Person with Pencil in Hair */}
function NotionPencilAvatar({ className = "size-11" }: { className?: string }) {
  return (
    <div className={`${className} rounded-full border-[2.5px] border-[#FFB800] bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-xs`}>
      <svg viewBox="0 0 80 80" className="size-full">
        <path d="M 22 42 C 16 32 22 18 36 18 C 42 12 56 16 60 26 C 66 36 62 48 58 56 C 54 52 50 48 46 52 C 40 50 32 50 28 54 C 24 50 22 46 22 42 Z" fill="#000000" />
        <ellipse cx="40" cy="46" rx="16" ry="18" fill="#E5E7EB" stroke="#000000" strokeWidth="2.5" />
        <g transform="rotate(-35 52 30)">
          <rect x="42" y="28" width="18" height="6" fill="#FFC107" stroke="#000000" strokeWidth="1.8" />
          <rect x="60" y="28" width="5" height="6" fill="#E57373" stroke="#000000" strokeWidth="1.8" />
          <polygon points="42,28 36,31 42,34" fill="#000000" />
        </g>
        <ellipse cx="35" cy="44" rx="2.2" ry="3" fill="#000000" />
        <ellipse cx="46" cy="44" rx="2.2" ry="3" fill="#000000" />
        <path d="M 31 39 Q 35 37 38 40" stroke="#000000" strokeWidth="1.8" fill="none" />
        <path d="M 43 40 Q 46 37 50 39" stroke="#000000" strokeWidth="1.8" fill="none" />
        <path d="M 40 45 L 39 49 L 41 49" stroke="#000000" strokeWidth="1.5" fill="none" />
        <path d="M 37 54 Q 40 56 44 54" stroke="#000000" strokeWidth="1.8" fill="none" />
      </svg>
    </div>
  );
}

{/* Notion Circular Sticker Avatar 2: Red Signpost */}
function NotionSignpostAvatar({ className = "size-11" }: { className?: string }) {
  return (
    <div className={`${className} rounded-full border-[2.5px] border-black bg-[#FF3B30] flex items-center justify-center overflow-hidden shrink-0 shadow-[1.5px_2px_0px_0px_rgba(0,0,0,1)]`}>
      <svg viewBox="0 0 80 80" className="size-full">
        <rect x="36" y="42" width="7" height="28" fill="#FFFFFF" stroke="#000000" strokeWidth="2.5" rx="1" />
        <path d="M 18 20 H 52 L 68 32 L 52 44 H 18 Z" fill="#FFFFFF" stroke="#000000" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="32" cy="32" r="3" fill="#000000" />
        <circle cx="42" cy="32" r="3" fill="#000000" />
      </svg>
    </div>
  );
}

{/* Notion Circular Sticker Avatar 3: Blue Folder */}
function NotionFolderAvatar({ className = "size-11" }: { className?: string }) {
  return (
    <div className={`${className} rounded-full border-[2.5px] border-black bg-[#4392F1] flex items-center justify-center overflow-hidden shrink-0 shadow-[1.5px_2px_0px_0px_rgba(0,0,0,1)]`}>
      <svg viewBox="0 0 80 80" className="size-full">
        <path d="M 16 26 C 16 23 18 21 21 21 H 34 C 36 21 38 23 39 25 L 42 28 H 60 C 63 28 65 30 65 33 V 56 C 65 59 63 61 60 61 H 21 C 18 61 16 59 16 56 Z" fill="#FFFFFF" stroke="#000000" strokeWidth="3.2" strokeLinejoin="round" />
        <circle cx="48" cy="43" r="3.2" fill="#000000" />
        <circle cx="58" cy="43" r="3.2" fill="#000000" />
      </svg>
    </div>
  );
}

interface GoalOption {
  id: string;
  title: string;
  subtitle: string;
  avatar: React.ElementType;
}

interface ExperienceOption {
  id: string;
  title: string;
  subtitle: string;
  level: string;
}

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, setInstitution, updateProfile } = useAppContext();

  const stepParam = searchParams.get("step");
  const parsedStep = stepParam ? parseInt(stepParam, 10) : 1;
  const [step, setStep] = useState<number>(parsedStep >= 1 && parsedStep <= 3 ? parsedStep : 1);
  const [selectedGoal, setSelectedGoal] = useState<string>("scratch");
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<string>("beginner");

  const goals: GoalOption[] = [
    {
      id: "scratch",
      title: "Learn Python from scratch",
      subtitle: "I have little to no programming experience.",
      avatar: NotionPencilAvatar,
    },
    {
      id: "interview",
      title: "Prepare for interviews",
      subtitle: "I want to practice algorithms and data structures.",
      avatar: NotionSignpostAvatar,
    },
    {
      id: "projects",
      title: "Build real-world projects",
      subtitle: "I want to learn by building developer tools & applications.",
      avatar: NotionFolderAvatar,
    },
  ];

  const experienceLevels: ExperienceOption[] = [
    {
      id: "beginner",
      title: "Beginner",
      subtitle: "Brand new to Python syntax, variables, and control flow.",
      level: "Starts at Module 1",
    },
    {
      id: "intermediate",
      title: "Intermediate",
      subtitle: "Comfortable with functions, lists, dictionaries, and OOP.",
      level: "Starts at Module 4",
    },
    {
      id: "advanced",
      title: "Advanced",
      subtitle: "Experienced developer diving into AsyncIO, testing, and AI agents.",
      level: "Starts at Module 10",
    },
  ];

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleInstitutionSelect = (institution: Institution | null) => {
    setSelectedInstitution(institution);
    setInstitution(institution ? institution.id : null);
  };

  const handleComplete = () => {
    const roleMapping: Record<string, string> = {
      beginner: "Python Learner",
      intermediate: "Intermediate Developer",
      advanced: "Senior Pythonista",
    };

    updateProfile({
      role: roleMapping[selectedExperience] || "Python Learner",
      institutionId: selectedInstitution ? selectedInstitution.id : user.institutionId || null,
    });

    toast.success("Workspace customized successfully!");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F5] dark:bg-[#191919] font-sans text-[#37352F] dark:text-[rgba(255,255,255,0.85)] select-none transition-colors">
      {/* Top Header Bar */}
      <header className="h-14 border-b border-[rgba(55,53,47,0.1)] dark:border-[rgba(255,255,255,0.1)] bg-white dark:bg-[#202020] flex items-center justify-between px-6 sm:px-10">
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <PipLearnLogoMark className="size-7" />
          <span className="font-extrabold text-base tracking-tight text-black dark:text-white">PipLearn</span>
        </Link>
        <div className="flex items-center gap-3">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="text-xs font-semibold text-gray-500 hover:text-black dark:hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ArrowLeft className="size-3.5" />
              <span>Back</span>
            </button>
          )}
          <span className="text-xs font-mono font-semibold text-[rgba(55,53,47,0.45)] dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md">
            Step {step} of 3
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-xl bg-white dark:bg-[#202020] rounded-2xl p-6 sm:p-10 border border-gray-200 dark:border-gray-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] my-6">
          
          {/* STEP 1: GOAL */}
          {step === 1 && (
            <div className="animate-in fade-in duration-200">
              <div className="text-left mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-1.5">
                  What is your primary goal?
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  We'll tailor your interactive experience based on your selection.
                </p>
              </div>

              {/* Selectable Goal Cards */}
              <div className="space-y-3.5">
                {goals.map((goal) => {
                  const AvatarComponent = goal.avatar;
                  const isSelected = selectedGoal === goal.id;

                  return (
                    <div
                      key={goal.id}
                      onClick={() => setSelectedGoal(goal.id)}
                      className={`flex items-center gap-4 p-4 sm:p-4.5 rounded-xl cursor-pointer transition-all duration-200 ease-out select-none ${
                        isSelected
                          ? "bg-gray-50/80 dark:bg-gray-800/80 border-2 border-black dark:border-white shadow-xs"
                          : "bg-white dark:bg-[#252525] border border-gray-200 dark:border-gray-700 hover:bg-gray-50/60 dark:hover:bg-gray-800/50 hover:border-gray-300"
                      }`}
                    >
                      <AvatarComponent className="size-11 sm:size-12" />

                      <div className="flex-1 text-left">
                        <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white leading-snug">
                          {goal.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 leading-normal">
                          {goal.subtitle}
                        </p>
                      </div>

                      <div
                        className={`size-5 sm:size-5.5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                          isSelected
                            ? "bg-black dark:bg-white border-2 border-black dark:border-white text-white dark:text-black"
                            : "border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-transparent"
                        }`}
                      >
                        {isSelected && <Check className="size-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer Actions */}
              <div className="flex justify-between items-center pt-6 mt-8 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-sm font-medium text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Skip for now
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black rounded-lg px-6 h-11 text-sm font-semibold transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: INSTITUTION */}
          {step === 2 && (
            <div className="animate-in fade-in duration-200">
              <div className="text-left mb-6">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3">
                  <GraduationCap className="size-3.5" />
                  <span>Campus &amp; Social Scope</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-1.5">
                  Where do you study?
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Your institution helps personalize your community and lets you compare progress with learners around you.
                </p>
              </div>

              {/* Shared Searchable Institution Selector */}
              <InstitutionSelector
                selectedInstitutionId={selectedInstitution ? selectedInstitution.id : user.institutionId}
                onSelect={handleInstitutionSelect}
                onSkip={() => setStep(3)}
                showIndependentOption={true}
                showSkipOption={false}
                embedded={true}
              />

              {/* Footer Actions */}
              <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="text-sm font-medium text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Skip for now
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black rounded-lg px-6 h-11 text-sm font-semibold transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: EXPERIENCE LEVEL */}
          {step === 3 && (
            <div className="animate-in fade-in duration-200">
              <div className="text-left mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-1.5">
                  What is your Python experience?
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  We'll start you at the right difficulty level and customize your curriculum path.
                </p>
              </div>

              <div className="space-y-3.5">
                {experienceLevels.map((exp) => {
                  const isSelected = selectedExperience === exp.id;

                  return (
                    <div
                      key={exp.id}
                      onClick={() => setSelectedExperience(exp.id)}
                      className={`flex items-center justify-between p-4 sm:p-4.5 rounded-xl cursor-pointer transition-all duration-200 ease-out select-none ${
                        isSelected
                          ? "bg-gray-50/80 dark:bg-gray-800/80 border-2 border-black dark:border-white shadow-xs"
                          : "bg-white dark:bg-[#252525] border border-gray-200 dark:border-gray-700 hover:bg-gray-50/60 dark:hover:bg-gray-800/50 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white leading-snug">
                            {exp.title}
                          </h3>
                          <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                            {exp.level}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 leading-normal">
                          {exp.subtitle}
                        </p>
                      </div>

                      <div
                        className={`size-5 sm:size-5.5 rounded-full flex items-center justify-center shrink-0 transition-all ml-3 ${
                          isSelected
                            ? "bg-black dark:bg-white border-2 border-black dark:border-white text-white dark:text-black"
                            : "border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-transparent"
                        }`}
                      >
                        {isSelected && <Check className="size-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer Actions */}
              <div className="flex justify-between items-center pt-6 mt-8 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-sm font-medium text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleComplete}
                  className="bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black rounded-lg px-6 h-11 text-sm font-semibold transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <span>Launch Workspace</span>
                  <Sparkles className="size-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F7F7F5] dark:bg-[#191919]" />}>
      <OnboardingContent />
    </Suspense>
  );
}
