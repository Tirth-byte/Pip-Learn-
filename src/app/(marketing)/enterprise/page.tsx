"use client";

import Link from "next/link";
import {
  Building2, ShieldCheck, Users, BarChart3, Lock,
  Headphones, ArrowRight, Terminal
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EnterprisePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#191919] text-[#37352F] dark:text-[rgba(255,255,255,0.85)] select-none">
      {/* 1. Header */}
      <section className="pt-20 pb-16 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F7F5] dark:bg-[#252525] border border-[rgba(55,53,47,0.12)] dark:border-[rgba(255,255,255,0.12)] text-xs font-semibold text-[#37352F] dark:text-white mb-6">
          <Building2 className="size-3.5 text-[#0066FF]" />
          <span>PipLearn for Teams &amp; Organizations</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-6 leading-tight">
          Scale Python engineering excellence across your organization.
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Provide your engineers and technical teams with structured learning pathways, browser-based sandboxes, centralized progress analytics, and dedicated support.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-sm mx-auto">
          <Button asChild className="w-full sm:w-auto h-10 px-6 bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold text-xs rounded-xl shadow-xs">
            <Link href="/demo">
              Request a Demo <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full sm:w-auto h-10 px-6 border-neutral-200 dark:border-[rgba(255,255,255,0.15)] bg-white dark:bg-[#252525] text-xs font-semibold rounded-xl text-neutral-700 dark:text-neutral-200">
            <Link href="/pricing">
              View Team Pricing
            </Link>
          </Button>
        </div>
      </section>

      {/* 2. Enterprise Pillars 6-Card Grid */}
      <section className="py-16 px-6 border-t border-neutral-100 dark:border-[rgba(255,255,255,0.08)] bg-[#FAFAFA] dark:bg-[#1E1E1E]/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mb-3">
              Designed for team upskilling, onboarding &amp; administration
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
              PipLearn delivers administrative controls, unified curriculums, and enterprise security standards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Card 1: Centralized Learning */}
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-[rgba(255,255,255,0.12)] bg-white dark:bg-[#202020] space-y-3">
              <div className="size-10 rounded-xl bg-blue-100 flex items-center justify-center text-[#0066FF]">
                <Users className="size-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">Centralized Onboarding</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Standardize technical onboarding with standardized tracks across Python fundamentals, async services, and data analysis.
              </p>
            </div>

            {/* Card 2: Admin Controls */}
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-[rgba(255,255,255,0.12)] bg-white dark:bg-[#202020] space-y-3">
              <div className="size-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                <ShieldCheck className="size-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">Role &amp; Member Management</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Easily invite engineers, assign Instructor and Admin privileges, and reallocate unused seats anytime from the Admin console.
              </p>
            </div>

            {/* Card 3: Analytics */}
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-[rgba(255,255,255,0.12)] bg-white dark:bg-[#202020] space-y-3">
              <div className="size-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                <BarChart3 className="size-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">Engagement &amp; Skill Metrics</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Track curriculum completion percentages, quiz scores, and algorithm challenge mastery across engineering departments.
              </p>
            </div>

            {/* Card 4: Security */}
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-[rgba(255,255,255,0.12)] bg-white dark:bg-[#202020] space-y-3">
              <div className="size-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                <Lock className="size-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">Security &amp; Privacy First</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Code submitted in browser sessions runs in isolated memory spaces. No proprietary code is stored or used for model training.
              </p>
            </div>

            {/* Card 5: Scalability */}
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-[rgba(255,255,255,0.12)] bg-white dark:bg-[#202020] space-y-3">
              <div className="size-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600">
                <Terminal className="size-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">Zero Setup Overhead</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Instant browser access with zero local configuration. Works across macOS, Windows, Linux, and web browsers seamlessly.
              </p>
            </div>

            {/* Card 6: Support */}
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-[rgba(255,255,255,0.12)] bg-white dark:bg-[#202020] space-y-3">
              <div className="size-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600">
                <Headphones className="size-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">Dedicated Support SLA</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Direct access to engineering support, onboarding walkthroughs, and custom curriculum planning for team leaders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Bottom CTA Section */}
      <section className="py-20 px-6 border-t border-neutral-100 dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-[#191919] text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Schedule a personalized walkthrough
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300">
            Let our team demonstrate how PipLearn can elevate Python proficiency across your engineering cohorts.
          </p>
          <div className="pt-2">
            <Button asChild className="h-11 px-8 bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold text-xs rounded-xl shadow-xs">
              <Link href="/demo">
                Book a 30-Min Demo <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
