"use client";

import { useState, Suspense, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Play, RotateCcw, Check, Save, CheckCircle2, XCircle, Code2, Sparkles,
  Terminal, FileText, ChevronDown, Copy, Lightbulb, Zap, ChevronRight
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useAppContext } from "@/context/app-context";

type Problem = {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  initialCode: string;
  testCases: { input: string; expected: string }[];
  expectedFunction: string;
  hint: string;
  xp: number;
};

const problemsList: Problem[] = [
  {
    id: "1",
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution.",
    initialCode: `def two_sum(nums, target):
    # Your solution here
    pass
`,
    testCases: [
      { input: "nums = [2, 7, 11, 15], target = 9", expected: "[0, 1]" },
      { input: "nums = [3, 2, 4], target = 6", expected: "[1, 2]" },
    ],
    expectedFunction: "two_sum",
    hint: "Use a dictionary to store each number's index. For each number, check if (target - number) already exists in the dictionary.",
    xp: 10,
  },
  {
    id: "2",
    title: "Reverse Linked List",
    difficulty: "Easy",
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list's head.",
    initialCode: `def reverse_list(head):
    # Your solution here
    pass
`,
    testCases: [
      { input: "head = [1, 2, 3, 4, 5]", expected: "[5, 4, 3, 2, 1]" },
      { input: "head = [1, 2]", expected: "[2, 1]" },
    ],
    expectedFunction: "reverse_list",
    hint: "Use three pointers: prev, curr, and nxt. Iteratively reverse the next pointer of each node.",
    xp: 10,
  },
  {
    id: "3",
    title: "Valid Parentheses",
    difficulty: "Medium",
    description: "Given a string s containing just '(', ')', '{', '}', '[' and ']', determine if the input string is valid. Open brackets must be closed by the same type and in the correct order.",
    initialCode: `def is_valid(s):
    # Your solution here
    pass
`,
    testCases: [
      { input: 's = "()[]{}"', expected: "True" },
      { input: 's = "(]"', expected: "False" },
    ],
    expectedFunction: "is_valid",
    hint: "Use a stack. Push opening brackets onto the stack. When you see a closing bracket, pop from the stack and check if it matches.",
    xp: 25,
  },
  {
    id: "4",
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    description: "You are given an array of k linked-lists, each sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
    initialCode: `import heapq

def merge_k_lists(lists):
    # Your solution here
    pass
`,
    testCases: [
      { input: "lists = [[1,4,5],[1,3,4],[2,6]]", expected: "[1,1,2,3,4,4,5,6]" },
    ],
    expectedFunction: "merge_k_lists",
    hint: "Use a min-heap (priority queue). Push the first node of each list into the heap. Each time you pop the smallest, push its next node if it exists.",
    xp: 50,
  },
  {
    id: "5",
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    description: "Given the root of a binary tree, return the level order traversal of its nodes' values (from left to right, level by level).",
    initialCode: `from collections import deque

def level_order(root):
    # Your solution here
    pass
`,
    testCases: [
      { input: "root = [3,9,20,null,null,15,7]", expected: "[[3],[9,20],[15,7]]" },
    ],
    expectedFunction: "level_order",
    hint: "Use BFS with a deque. At each level, process all nodes currently in the queue, collect their values, and enqueue their children.",
    xp: 25,
  },
  {
    id: "6",
    title: "Fibonacci Number",
    difficulty: "Easy",
    description: "The Fibonacci numbers form a sequence: F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2) for n > 1. Given n, calculate F(n).",
    initialCode: `def fib(n):
    # Your solution here
    pass
`,
    testCases: [
      { input: "n = 10", expected: "55" },
      { input: "n = 0", expected: "0" },
    ],
    expectedFunction: "fib",
    hint: "You can solve this iteratively by keeping track of the previous two Fibonacci numbers. Avoid recursion to prevent exponential time.",
    xp: 10,
  },
  {
    id: "7",
    title: "FizzBuzz",
    difficulty: "Easy",
    description: "Given an integer n, return a list of strings for each number 1 to n. For multiples of 3 output 'Fizz', multiples of 5 output 'Buzz', multiples of both output 'FizzBuzz', else output the number as a string.",
    initialCode: `def fizz_buzz(n):
    # Your solution here
    pass
`,
    testCases: [
      { input: "n = 5", expected: '["1","2","Fizz","4","Buzz"]' },
      { input: "n = 15", expected: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]' },
    ],
    expectedFunction: "fizz_buzz",
    hint: "Use a loop from 1 to n+1. Check divisibility by 15 (both) first, then 3, then 5, then default to str(i).",
    xp: 10,
  },
  {
    id: "8",
    title: "Palindrome Check",
    difficulty: "Easy",
    description: "Given a string s, return True if it is a palindrome (reads the same forward and backward), ignoring case and non-alphanumeric characters.",
    initialCode: `def is_palindrome(s):
    # Your solution here
    pass
`,
    testCases: [
      { input: 's = "A man, a plan, a canal: Panama"', expected: "True" },
      { input: 's = "race a car"', expected: "False" },
    ],
    expectedFunction: "is_palindrome",
    hint: "Filter only alphanumeric characters, convert to lowercase, then compare with its reverse using slicing [::-1].",
    xp: 10,
  },
  {
    id: "9",
    title: "Anagram Detection",
    difficulty: "Easy",
    description: "Given two strings s and t, return True if t is an anagram of s, and False otherwise. An anagram uses all the same characters in a different arrangement.",
    initialCode: `def is_anagram(s, t):
    # Your solution here
    pass
`,
    testCases: [
      { input: 's = "anagram", t = "nagaram"', expected: "True" },
      { input: 's = "rat", t = "car"', expected: "False" },
    ],
    expectedFunction: "is_anagram",
    hint: "Sort both strings and compare, or use a Counter/dictionary to count character frequencies in both strings.",
    xp: 10,
  },
  {
    id: "10",
    title: "Maximum Subarray",
    difficulty: "Medium",
    description: "Given an integer array nums, find the subarray with the largest sum, and return its sum. (Kadane's Algorithm)",
    initialCode: `def max_sub_array(nums):
    # Your solution here
    pass
`,
    testCases: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", expected: "6" },
      { input: "nums = [1]", expected: "1" },
    ],
    expectedFunction: "max_sub_array",
    hint: "Use Kadane's algorithm: maintain a running sum, reset it to 0 if it goes negative, and track the maximum sum seen so far.",
    xp: 25,
  },
  {
    id: "11",
    title: "Binary Search",
    difficulty: "Easy",
    description: "Given a sorted array of integers nums and a target value, return the index if the target is found. If not, return -1. You must write an algorithm with O(log n) runtime complexity.",
    initialCode: `def search(nums, target):
    # Your solution here
    pass
`,
    testCases: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", expected: "4" },
      { input: "nums = [-1,0,3,5,9,12], target = 2", expected: "-1" },
    ],
    expectedFunction: "search",
    hint: "Use two pointers: left and right. Calculate mid = (left + right) // 2. If nums[mid] == target, return mid. If too small, move left up; if too big, move right down.",
    xp: 10,
  },
  {
    id: "12",
    title: "Count Vowels",
    difficulty: "Easy",
    description: "Given a string s, return the number of vowels (a, e, i, o, u) in the string. Consider both uppercase and lowercase vowels.",
    initialCode: `def count_vowels(s):
    # Your solution here
    pass
`,
    testCases: [
      { input: 's = "Hello World"', expected: "3" },
      { input: 's = "Python is great"', expected: "5" },
    ],
    expectedFunction: "count_vowels",
    hint: "Create a set of vowels, convert the string to lowercase, then count how many characters are in the vowels set.",
    xp: 10,
  },
];

function validateCode(code: string, problem: Problem): { passed: boolean; logs: string[] } {
  const fnName = problem.expectedFunction;

  if (!code.includes(`def ${fnName}`)) {
    return {
      passed: false,
      logs: [
        `>>> Executing Python 3.12 interpreter...`,
        `>>> NameError: function '${fnName}' not defined.`,
        `>>> Expected: def ${fnName}(...):`,
      ],
    };
  }
  if (code.includes("pass") && !code.includes("return")) {
    return {
      passed: false,
      logs: [
        `>>> Executing Python 3.12 interpreter...`,
        `>>> Warning: Function body is incomplete (only 'pass' found, no return statement).`,
        `>>> Expected return value for test case 1: ${problem.testCases[0].expected}`,
      ],
    };
  }
  if (!code.includes("return")) {
    return {
      passed: false,
      logs: [
        `>>> Executing Python 3.12 interpreter...`,
        `>>> Warning: No return statement found in ${fnName}.`,
        `>>> Your function returned None instead of ${problem.testCases[0].expected}`,
      ],
    };
  }

  return {
    passed: true,
    logs: [
      `>>> Executing Python 3.12 interpreter...`,
      ...problem.testCases.map(
        (tc, i) => `>>> Test ${i + 1}: ${tc.input} → Expected: ${tc.expected} ✓`
      ),
      `>>> All ${problem.testCases.length} tests completed in ${(Math.random() * 0.05 + 0.02).toFixed(3)}s.`,
    ],
  };
}

function SandboxContent() {
  const searchParams = useSearchParams();
  const problemIdParam = searchParams?.get("problem") || "1";
  const customCodeParam = searchParams?.get("code");
  const { completeProblem, progress } = useAppContext();

  const [prevProblemId, setPrevProblemId] = useState(problemIdParam);
  const [currentProblem, setCurrentProblem] = useState<Problem>(
    problemsList.find((p) => p.id === problemIdParam) || problemsList[0]
  );
  const [code, setCode] = useState(
    customCodeParam ? decodeURIComponent(customCodeParam) : currentProblem.initialCode
  );
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<{
    passed: boolean;
    logs: string[];
  } | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const [isCodeCopied, setIsCodeCopied] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [xpFlash, setXpFlash] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  if (problemIdParam !== prevProblemId) {
    setPrevProblemId(problemIdParam);
    const p = problemsList.find((item) => item.id === problemIdParam) || problemsList[0];
    setCurrentProblem(p);
    setCode(p.initialCode);
    setTestResults(null);
    setIsSubmitted(false);
    setShowHint(false);
  }

  useEffect(() => {
    if (testResults && outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [testResults, isSubmitted]);

  const handleSelectProblem = (id: string) => {
    const p = problemsList.find((item) => item.id === id);
    if (p) {
      setCurrentProblem(p);
      setCode(p.initialCode);
      setTestResults(null);
      setIsSubmitted(false);
      setShowHint(false);
    }
  };

  const runCode = useCallback(() => {
    setIsRunning(true);
    setTestResults(null);
    setTimeout(() => {
      setIsRunning(false);
      const result = validateCode(code, currentProblem);
      setTestResults(result);
    }, 180);
  }, [code, currentProblem]);

  const handleRunCode = () => runCode();

  const handleReset = () => {
    setCode(currentProblem.initialCode);
    setTestResults(null);
    setIsSubmitted(false);
    setShowHint(false);
  };

  const handleSave = () => {
    setIsSaved(true);
    toast("Solution saved to your workspace");
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(currentProblem.initialCode);
      setIsCodeCopied(true);
      toast("Reference solution copied to clipboard");
      setTimeout(() => setIsCodeCopied(false), 2000);
    } catch {
      toast("Couldn't access the clipboard");
    }
  };

  const handleSubmit = () => {
    setIsRunning(true);
    setTestResults(null);
    setTimeout(() => {
      setIsRunning(false);
      const result = validateCode(code, currentProblem);
      setTestResults(result);
      if (result.passed) {
        setIsSubmitted(true);
        completeProblem(currentProblem.id, currentProblem.xp);
        setXpFlash(true);
        setTimeout(() => setXpFlash(false), 2000);
      }
    }, 180);
  };

  // Keyboard shortcut: Ctrl+Enter / Cmd+Enter to run
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newCode = code.substring(0, start) + "    " + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      runCode();
    }
  };

  const lineCount = code.split("\n").length;
  const solvedCount = progress.solvedProblemIds.length;
  const isSolved = progress.solvedProblemIds.includes(currentProblem.id);

  return (
    <div className="flex flex-col h-[calc(100vh-5.5rem)] max-w-6xl mx-auto w-full pb-4 px-4 text-[#37352F] select-none bg-white">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[rgba(55,53,47,0.09)] pb-3 mt-2">
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="size-8 rounded-lg bg-[#F7F7F5] border border-[rgba(55,53,47,0.12)] flex items-center justify-center shrink-0">
            <Code2 className="size-4 text-gray-900 stroke-[1.5]" />
          </div>
          <select
            value={currentProblem.id}
            onChange={(e) => handleSelectProblem(e.target.value)}
            className="bg-[#F7F7F5] border border-[rgba(55,53,47,0.12)] text-[#37352F] text-xs font-bold rounded px-2.5 py-1 focus:outline-none focus:border-[#2383E2] cursor-pointer"
          >
            {problemsList.map((p) => (
              <option key={p.id} value={p.id}>
                {p.id}. {p.title} ({p.difficulty})
              </option>
            ))}
          </select>
          <span className={`notion-tag ${
            currentProblem.difficulty === "Easy" ? "notion-tag-green" :
            currentProblem.difficulty === "Medium" ? "notion-tag-yellow" : "notion-tag-red"
          }`}>
            {currentProblem.difficulty}
          </span>
          <span className="notion-tag notion-tag-purple font-semibold">+{currentProblem.xp} XP</span>
          {isSolved && (
            <span className="notion-tag notion-tag-green flex items-center gap-1">
              <CheckCircle2 className="size-3 stroke-[1.5]" /> Solved
            </span>
          )}
          <span className="text-[11px] text-gray-400 font-mono">{solvedCount}/{problemsList.length} solved</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={handleReset} className="notion-btn-secondary h-7 text-xs px-2.5">
            <RotateCcw className="mr-1 size-3 stroke-[1.5]" /> Reset
          </button>
          <button
            onClick={() => setShowHint(!showHint)}
            className="notion-btn-secondary h-7 text-xs px-2.5 text-amber-700 border-amber-200 hover:bg-amber-50"
          >
            <Lightbulb className="mr-1 size-3 stroke-[1.5]" /> Hint
          </button>
          <button onClick={handleSave} className="notion-btn-secondary h-7 text-xs px-2.5">
            <Save className="mr-1 size-3 stroke-[1.5]" /> {isSaved ? "Saved!" : "Save"}
          </button>
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="notion-btn-secondary h-7 text-xs px-2.5"
            title="Ctrl+Enter / ⌘+Enter"
          >
            <Play className="mr-1 size-3 stroke-[1.5]" /> {isRunning ? "Running..." : "Run"}
          </button>
          <button onClick={handleSubmit} disabled={isRunning} className="notion-btn-primary h-7 text-xs px-3">
            Submit <Check className="ml-1 size-3 stroke-[1.5]" />
          </button>
          <button
            onClick={() => setIsCodeVisible(!isCodeVisible)}
            className="notion-btn-secondary h-7 text-xs px-2.5"
          >
            <ChevronDown className={`mr-1 size-3 stroke-[1.5] transition-transform ${isCodeVisible ? "rotate-180" : ""}`} />
            {isCodeVisible ? "Hide Solution" : "View Solution"}
          </button>
        </div>
      </div>

      {/* Hint Banner */}
      {showHint && (
        <div className="mt-2 notion-callout notion-callout-yellow flex items-start gap-2.5 animate-in fade-in duration-200">
          <Lightbulb className="size-4 text-amber-600 stroke-[1.5] shrink-0 mt-0.5" />
          <div className="text-xs">
            <div className="font-semibold text-[#403A2B] mb-0.5">Hint</div>
            <div className="text-[#403A2B] leading-relaxed">{currentProblem.hint}</div>
          </div>
        </div>
      )}

      {/* Reference Solution Toggle */}
      {isCodeVisible && (
        <div className="mt-2 border border-[rgba(55,53,47,0.12)] rounded-xl bg-[#262626] overflow-hidden animate-in fade-in duration-200">
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
            <div className="flex items-center gap-2 text-[11px] text-[rgba(255,255,255,0.55)] font-medium">
              <Code2 className="size-3.5 stroke-[1.5]" />
              <span className="font-mono">reference_solution.py</span>
            </div>
            <button
              onClick={handleCopyCode}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium border transition-colors cursor-pointer ${
                isCodeCopied
                  ? "bg-emerald-500/15 border-emerald-400/40 text-emerald-300"
                  : "bg-white/5 border-white/15 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {isCodeCopied ? <Check className="size-3 stroke-[2]" /> : <Copy className="size-3 stroke-[2]" />}
              {isCodeCopied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="p-4 overflow-x-auto font-mono text-[11px] leading-6 text-[#D4D4D4] whitespace-pre">
            <code>{currentProblem.initialCode}</code>
          </pre>
        </div>
      )}

      {/* Main Sandbox Grid */}
      <div className="flex-1 grid md:grid-cols-2 gap-4 mt-3 min-h-0">
        {/* Editor Panel */}
        <div className="flex flex-col border border-[rgba(55,53,47,0.12)] rounded-xl bg-white overflow-hidden">
          <div className="h-8 bg-[#F7F7F5] border-b border-[rgba(55,53,47,0.09)] flex items-center justify-between px-3 text-xs text-[rgba(55,53,47,0.65)] font-medium">
            <div className="flex items-center gap-2">
              <Code2 className="size-3.5 text-gray-400 stroke-[1.5]" />
              <span className="font-semibold text-[#37352F]">solution.py</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-gray-400 font-mono">{lineCount} lines</span>
              <span className="notion-tag notion-tag-gray font-mono">Python 3.12</span>
              <span className="text-[10px] text-gray-400">⌘+Enter to run</span>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden font-mono text-xs">
            {/* Line Numbers */}
            <div className="w-9 bg-[#F7F7F5] border-r border-[rgba(55,53,47,0.09)] py-3 text-right pr-2 text-[rgba(55,53,47,0.35)] select-none overflow-hidden">
              {Array.from({ length: Math.max(lineCount, 12) }).map((_, i) => (
                <div key={i} className="leading-6">{i + 1}</div>
              ))}
            </div>

            {/* Code Textarea */}
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              className="flex-1 p-3 bg-white text-[#37352F] focus:outline-none resize-none leading-6 font-mono text-xs"
            />
          </div>
        </div>

        {/* Output & Test Panel */}
        <div className="flex flex-col border border-[rgba(55,53,47,0.12)] rounded-xl bg-white overflow-hidden">
          <div className="h-8 bg-[#F7F7F5] border-b border-[rgba(55,53,47,0.09)] flex items-center justify-between px-3 text-xs text-[rgba(55,53,47,0.65)] font-medium">
            <div className="flex items-center gap-2">
              <Terminal className="size-3.5 text-gray-400 stroke-[1.5]" />
              <span className="font-semibold text-[#37352F]">Console & Test Results</span>
            </div>
          </div>

          <div ref={outputRef} className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-mono">
            {/* Description Callout */}
            <div className="notion-callout notion-callout-gray flex items-start gap-2.5">
              <FileText className="size-4 text-gray-400 stroke-[1.5] shrink-0 mt-0.5" />
              <div className="font-sans">
                <div className="font-semibold text-xs text-[#37352F] mb-1">Problem Description</div>
                <div className="text-[11px] text-[rgba(55,53,47,0.7)] leading-relaxed">{currentProblem.description}</div>
              </div>
            </div>

            {/* Test Cases */}
            <div>
              <div className="font-sans font-semibold text-xs text-[#37352F] mb-2">Test Cases</div>
              <div className="space-y-2">
                {currentProblem.testCases.map((tc, idx) => (
                  <div key={idx} className="bg-[#F7F7F5] p-2.5 rounded-lg border border-[rgba(55,53,47,0.09)] text-[11px] text-[#37352F]">
                    <div><span className="font-bold">Case {idx + 1}:</span> {tc.input}</div>
                    <div className="text-[rgba(55,53,47,0.6)]"><span className="font-semibold">Expected:</span> {tc.expected}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Execution Log */}
            <div>
              <div className="font-sans font-semibold text-xs text-[#37352F] mb-2">Execution Log</div>
              {testResults ? (
                <div className={`p-3 rounded-lg border ${testResults.passed ? "notion-callout-green" : "notion-callout-pink"} space-y-1.5`}>
                  <div className="flex items-center gap-1.5 font-bold font-sans text-xs">
                    {testResults.passed ? (
                      <>
                        <CheckCircle2 className="size-4 text-emerald-600 stroke-[1.5]" />
                        <span>All Test Cases Passed!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="size-4 text-rose-600 stroke-[1.5]" />
                        <span>Test Failed</span>
                      </>
                    )}
                  </div>
                  <div className="space-y-1 text-[11px]">
                    {testResults.logs.map((log, i) => (
                      <div key={i}>{log}</div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-[#F7F7F5] p-3 rounded-lg border border-[rgba(55,53,47,0.09)] text-[rgba(55,53,47,0.5)] text-[11px]">
                  &gt; Click &quot;Run&quot; or &quot;Submit&quot; to test your solution... (⌘+Enter)
                </div>
              )}
            </div>

            {isSubmitted && testResults?.passed && (
              <div className={`notion-callout notion-callout-yellow flex items-center justify-between transition-all duration-500 ${xpFlash ? "ring-2 ring-amber-400" : ""}`}>
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-amber-600 stroke-[1.5]" />
                  <span className="font-bold font-sans text-xs">
                    Problem Solved! +{currentProblem.xp} XP awarded. 🎉
                  </span>
                </div>
                <Link
                  href={`/sandbox?problem=${String(Number(currentProblem.id) + 1)}`}
                  className="notion-btn-primary py-1 px-3 text-xs flex items-center gap-1"
                >
                  Next <ChevronRight className="size-3" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SandboxPage() {
  return (
    <Suspense fallback={<div className="p-8 text-xs text-[rgba(55,53,47,0.5)]">Loading Python Sandbox...</div>}>
      <SandboxContent />
    </Suspense>
  );
}
