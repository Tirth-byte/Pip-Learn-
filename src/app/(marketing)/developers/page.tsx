"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Code2, Terminal, Cpu, ArrowRight, Copy, Check,
  Braces, BookOpen, GitBranch
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DevelopersPage() {
  const [activeTab, setActiveTab] = useState<"sdk" | "runner" | "ai">("sdk");
  const [copiedCode, setCopiedCode] = useState(false);

  const codeSnippets = {
    sdk: `# Install PipLearn Python SDK
# pip install piplearn-sdk

import piplearn

# Initialize client with your developer token
client = piplearn.Client(api_key="pl_live_9f83a04bc...")

# Run sandboxed Python code with custom assertions
execution = client.sandbox.execute(
    code="""
def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        if target - n in seen:
            return [seen[target - n], i]
        seen[n] = i
    return []
""",
    test_cases=[
        {"input": {"nums": [2, 7, 11, 15], "target": 9}, "expected": [0, 1]},
        {"input": {"nums": [3, 2, 4], "target": 6}, "expected": [1, 2]},
    ]
)

print(f"Status: {execution.status}")
print(f"Runtime: {execution.runtime_ms}ms")
print(f"Memory: {execution.memory_mb}MB")
print(f"All tests passed: {execution.passed}")`,
    runner: `# Automated CI/CD Grading Script (.github/workflows/grade.py)
import sys
from piplearn.grader import evaluate_submission

def main():
    result = evaluate_submission(
        solution_path="student_solution.py",
        problem_id="two-sum-01",
        timeout_seconds=3.0
    )
    
    if not result.success:
        print(f"FAILED: {result.error_message}")
        sys.exit(1)
        
    print(f"PASSED! Awarded {result.xp_earned} XP to student profile.")

if __name__ == "__main__":
    main()`,
    ai: `# Stream Real-Time Pip AI Mentor Guidance
import asyncio
from piplearn.ai import MentorClient

async def ask_mentor():
    mentor = MentorClient(context="python-fastapi-course")
    
    prompt = "Explain how dependency injection works with Depends() in FastAPI."
    
    async for chunk in mentor.stream_explanation(prompt):
        print(chunk, end="", flush=True)

if __name__ == "__main__":
    asyncio.run(ask_mentor())`
  };

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(codeSnippets[activeTab]);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#191919] text-[#37352F] dark:text-[rgba(255,255,255,0.85)] select-none">
      {/* 1. Header */}
      <section className="pt-20 pb-12 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F7F5] dark:bg-[#252525] border border-[rgba(55,53,47,0.12)] dark:border-[rgba(255,255,255,0.12)] text-xs font-semibold text-[#37352F] dark:text-white mb-6">
          <Code2 className="size-3.5 text-[#0066FF]" />
          <span>PipLearn for Developers</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-4">
          Built for engineers. <br className="hidden sm:inline" />
          Powered by modern Python 3.12+.
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          Integrate PipLearn&apos;s code execution engine, structured curriculums, and AI tutoring directly into your automated pipelines, extensions, and learning tools.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-sm mx-auto mt-8">
          <Button asChild className="w-full sm:w-auto h-10 px-6 bg-black hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-semibold text-xs rounded-xl shadow-xs">
            <Link href="/sandbox">
              <Terminal className="mr-2 size-3.5" /> Launch Sandbox IDE
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full sm:w-auto h-10 px-6 border-neutral-200 dark:border-[rgba(255,255,255,0.15)] bg-white dark:bg-[#252525] text-xs font-semibold rounded-xl text-neutral-700 dark:text-neutral-200">
            <Link href="/resources">
              <BookOpen className="mr-2 size-3.5" /> API Documentation
            </Link>
          </Button>
        </div>
      </section>

      {/* 2. Interactive Code Showcase */}
      <section className="px-6 max-w-5xl mx-auto w-full pb-16">
        <div className="rounded-2xl border border-neutral-200 dark:border-[rgba(255,255,255,0.12)] bg-[#1E1E1E] overflow-hidden shadow-sm">
          {/* Tabs Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-2.5 border-b border-white/10 bg-[#181818] gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("sdk")}
                className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors cursor-pointer ${
                  activeTab === "sdk" ? "bg-white/15 text-white" : "text-neutral-400 hover:text-white"
                }`}
              >
                Python SDK
              </button>
              <button
                onClick={() => setActiveTab("runner")}
                className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors cursor-pointer ${
                  activeTab === "runner" ? "bg-white/15 text-white" : "text-neutral-400 hover:text-white"
                }`}
              >
                CI/CD Grader
              </button>
              <button
                onClick={() => setActiveTab("ai")}
                className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors cursor-pointer ${
                  activeTab === "ai" ? "bg-white/15 text-white" : "text-neutral-400 hover:text-white"
                }`}
              >
                AI Mentor Stream
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer self-end sm:self-auto"
            >
              {copiedCode ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
              <span>{copiedCode ? "Copied" : "Copy snippet"}</span>
            </button>
          </div>

          {/* Code Body */}
          <pre className="p-5 font-mono text-xs leading-6 text-[#D4D4D4] overflow-x-auto selection:bg-blue-500/30">
            <code>{codeSnippets[activeTab]}</code>
          </pre>
        </div>
      </section>

      {/* 3. Developer Features 3-Column Grid */}
      <section className="py-16 px-6 border-t border-neutral-100 dark:border-[rgba(255,255,255,0.08)] bg-[#FAFAFA] dark:bg-[#1E1E1E]/50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-[rgba(255,255,255,0.12)] bg-white dark:bg-[#202020] space-y-3">
            <div className="size-10 rounded-xl bg-blue-100 flex items-center justify-center text-[#0066FF]">
              <Cpu className="size-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">Local-First Sandbox</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Execution state persists securely inside your browser session. Rapid feedback loop without heavy server roundtrips.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-[rgba(255,255,255,0.12)] bg-white dark:bg-[#202020] space-y-3">
            <div className="size-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
              <Braces className="size-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">Type-Safe Architectures</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Strict typing patterns taught from day one. Pydantic models, generics, dataclasses, and static analysis workflows.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-[rgba(255,255,255,0.12)] bg-white dark:bg-[#202020] space-y-3">
            <div className="size-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <GitBranch className="size-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">Git &amp; CI/CD Integrations</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Automated grading actions for GitHub classroom, pull-request test runs, and custom challenge deployments.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Bottom CTA */}
      <section className="py-20 px-6 border-t border-neutral-100 dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-[#191919] text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Ready to test algorithms in the Sandbox?
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300">
            Jump into 20 algorithmic challenges with real test cases and instant execution metrics.
          </p>
          <div className="pt-2">
            <Button asChild className="h-11 px-8 bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold text-xs rounded-xl shadow-xs">
              <Link href="/practice">
                Browse Practice Arena <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
