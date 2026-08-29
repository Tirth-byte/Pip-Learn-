"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check, Sparkles, ChevronDown, ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const plans = [
    {
      id: "free",
      name: "Free Learner",
      description: "Essential tools to start learning Python syntax, control flow, and data structures.",
      priceMonthly: "$0",
      priceAnnual: "$0",
      period: "forever",
      ctaText: "Start Learning Free",
      ctaHref: "/signup",
      popular: false,
      features: [
        "Core Python Masterclass modules",
        "Interactive browser Sandbox",
        "20 algorithmic practice challenges",
        "Basic Pip AI mentor queries",
        "Community feed access",
        "52-week activity heatmap",
      ],
    },
    {
      id: "pro",
      name: "Pro Developer",
      description: "Everything you need to master advanced Python, FastAPI, and real-world projects.",
      priceMonthly: "$12",
      priceAnnual: "$9",
      period: "per month, billed annually ($108/yr)",
      ctaText: "Get Pro Access",
      ctaHref: "/signup",
      popular: true,
      features: [
        "All 8 complete course curriculums",
        "Unlimited 24/7 Pip AI code mentor",
        "6 real-world project assignments",
        "Custom test runner & execution metrics",
        "Verified shareable portfolio showcase",
        "Topic quizzes with detailed solutions",
        "Priority feature updates",
      ],
    },
    {
      id: "team",
      name: "Team & Enterprise",
      description: "For engineering teams, bootcamps, and universities scaling Python skills.",
      priceMonthly: "Custom",
      priceAnnual: "Custom",
      period: "per user / volume discount",
      ctaText: "Request a Demo",
      ctaHref: "/demo",
      popular: false,
      features: [
        "All Pro features for every team member",
        "Centralized Admin dashboard console",
        "Role permissions (Admin, Instructor, Student)",
        "Cohort progress & completion analytics",
        "Team seat reallocation & management",
        "Dedicated onboarding & support SLA",
      ],
    },
  ];

  const faqs = [
    {
      q: "Can I cancel my Pro subscription at any time?",
      a: "Yes. You can cancel your subscription at any time with a single click from your settings page. You will maintain Pro access until the end of your current billing period."
    },
    {
      q: "Do you offer student or academic discounts?",
      a: "Yes! Students with a valid .edu email address receive a 50% discount on the Pro plan. Contact our support team to activate your discount."
    },
    {
      q: "What payment methods do you accept?",
      a: "We support all major credit/debit cards (Visa, Mastercard, American Express), Apple Pay, Google Pay, and invoice billing for enterprise team tiers."
    },
    {
      q: "How does the Team plan onboarding work?",
      a: "Upon signing up for a team plan, your organization administrator receives access to the Admin portal to invite members via email or bulk CSV upload."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#191919] text-[#37352F] dark:text-[rgba(255,255,255,0.85)] select-none">
      {/* 1. Header */}
      <section className="pt-20 pb-12 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F7F5] dark:bg-[#252525] border border-[rgba(55,53,47,0.12)] dark:border-[rgba(255,255,255,0.12)] text-xs font-semibold text-[#37352F] dark:text-white mb-6">
          <Sparkles className="size-3.5 text-[#0066FF]" />
          <span>Simple, Transparent Pricing</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-4">
          Invest in your Python expertise.
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-xl mx-auto leading-relaxed mb-8">
          Start for free and upgrade to unlock advanced frameworks, unlimited AI pair programming, and full project briefs.
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex items-center gap-2 p-1 rounded-xl bg-[#F7F7F5] dark:bg-[#252525] border border-neutral-200 dark:border-[rgba(255,255,255,0.12)] text-xs font-semibold">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              billingCycle === "monthly"
                ? "bg-white dark:bg-[#333333] text-neutral-900 dark:text-white shadow-xs"
                : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              billingCycle === "annual"
                ? "bg-white dark:bg-[#333333] text-neutral-900 dark:text-white shadow-xs"
                : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            <span>Annual</span>
            <span className="notion-tag notion-tag-green text-[10px] py-0 px-1 font-mono">Save 25%</span>
          </button>
        </div>
      </section>

      {/* 2. Pricing Cards */}
      <section className="px-6 max-w-5xl mx-auto w-full pb-16">
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => {
            const price = billingCycle === "annual" ? plan.priceAnnual : plan.priceMonthly;
            return (
              <div
                key={plan.id}
                className={`p-6 rounded-2xl border flex flex-col justify-between transition-all relative ${
                  plan.popular
                    ? "border-[#0066FF] dark:border-[#0066FF] bg-white dark:bg-[#202020] shadow-md ring-1 ring-[#0066FF]/20"
                    : "border-neutral-200 dark:border-[rgba(255,255,255,0.12)] bg-[#FAFAFA] dark:bg-[#1E1E1E]"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0066FF] text-white text-[10px] font-bold uppercase tracking-wider py-0.5 px-3 rounded-full shadow-2xs">
                    Most Popular
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{plan.name}</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed min-h-[32px]">{plan.description}</p>
                  </div>

                  <div className="my-6 pb-6 border-b border-neutral-100 dark:border-white/10">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white">{price}</span>
                      {price !== "Custom" && <span className="text-xs text-neutral-400 font-medium">/mo</span>}
                    </div>
                    <div className="text-[11px] text-neutral-400 font-mono mt-1">
                      {plan.id === "free" ? "No credit card required" : billingCycle === "annual" ? plan.period : "Billed monthly"}
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Included Features</div>
                    <ul className="space-y-2.5 text-xs text-neutral-700 dark:text-neutral-300">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button
                  asChild
                  className={`w-full h-10 text-xs font-semibold rounded-xl shadow-2xs ${
                    plan.popular
                      ? "bg-[#0066FF] hover:bg-[#0052CC] text-white"
                      : "bg-black hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                  }`}
                >
                  <Link href={plan.ctaHref}>
                    {plan.ctaText}
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. FAQ Section */}
      <section className="py-16 px-6 border-t border-neutral-100 dark:border-[rgba(255,255,255,0.08)] bg-[#FAFAFA] dark:bg-[#1E1E1E]/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
              Have questions about our plans or team setup? We have answers.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-neutral-200 dark:border-[rgba(255,255,255,0.12)] bg-white dark:bg-[#202020] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="size-4 text-neutral-400 shrink-0" /> : <ChevronDown className="size-4 text-neutral-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-100 dark:border-white/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
