"use client";

import { use } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, PlayCircle, CheckCircle2, Lock } from "lucide-react";

type Lesson = {
  id: string;
  title: string;
  status: "completed" | "in-progress" | "locked";
  duration: string;
};

type ModuleInfo = {
  number: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

const moduleDataMap: Record<string, ModuleInfo> = {
  "basics": {
    number: "Module 01",
    title: "Python Basics",
    description: "Learn fundamental syntax, primitive data types, arithmetic operators, and basic user input/output in Python.",
    lessons: [
      { id: "lesson-1", title: "Welcome to Python & Setup", status: "completed", duration: "5 min" },
      { id: "lesson-2", title: "Variables and Data Types", status: "completed", duration: "8 min" },
      { id: "lesson-3", title: "Strings & String Formatting", status: "completed", duration: "10 min" },
      { id: "lesson-4", title: "Numbers & Mathematical Operations", status: "completed", duration: "7 min" },
      { id: "lesson-5", title: "Module 1 Review & Practice", status: "completed", duration: "12 min" },
    ],
  },
  "control-flow": {
    number: "Module 02",
    title: "Control Flow",
    description: "Learn how to make decisions and repeat actions in your code using conditional logic and loops.",
    lessons: [
      { id: "lesson-1", title: "Introduction to Control Flow", status: "completed", duration: "5 min" },
      { id: "lesson-2", title: "The if Statement", status: "completed", duration: "10 min" },
      { id: "lesson-3", title: "if-else and elif", status: "completed", duration: "12 min" },
      { id: "lesson-4", title: "Introduction to Loops", status: "in-progress", duration: "8 min" },
      { id: "lesson-5", title: "The for Loop", status: "locked", duration: "15 min" },
      { id: "lesson-6", title: "The while Loop", status: "locked", duration: "10 min" },
    ],
  },
  "functions": {
    number: "Module 03",
    title: "Functions & Scope",
    description: "Master reusability with functions, arguments, return values, lambda functions, and variable scope rules.",
    lessons: [
      { id: "lesson-1", title: "Defining and Calling Functions", status: "locked", duration: "10 min" },
      { id: "lesson-2", title: "Parameters & Return Values", status: "locked", duration: "12 min" },
      { id: "lesson-3", title: "Default & Keyword Arguments", status: "locked", duration: "8 min" },
      { id: "lesson-4", title: "Scope: Global vs Local", status: "locked", duration: "15 min" },
    ],
  },
  "data-structures": {
    number: "Module 04",
    title: "Data Structures",
    description: "Deep dive into lists, tuples, dictionaries, sets, and list comprehensions for efficient data handling.",
    lessons: [
      { id: "lesson-1", title: "Lists & Indexing", status: "locked", duration: "10 min" },
      { id: "lesson-2", title: "List Methods & Slicing", status: "locked", duration: "12 min" },
      { id: "lesson-3", title: "Dictionaries & Key-Value Pairs", status: "locked", duration: "15 min" },
      { id: "lesson-4", title: "Tuples & Immutability", status: "locked", duration: "8 min" },
      { id: "lesson-5", title: "Sets & Unique Operations", status: "locked", duration: "10 min" },
      { id: "lesson-6", title: "List Comprehensions", status: "locked", duration: "14 min" },
    ],
  },
};

export default function ModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = use(params);
  const currentModule = moduleDataMap[module] || moduleDataMap["control-flow"];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-3xl mx-auto py-8">
      <div className="border-b border-neutral-100 pb-4">
        <Link href="/courses/python" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 flex items-center mb-6 w-fit transition-colors">
          <ArrowLeft className="mr-1.5 size-4" /> Back to Syllabus
        </Link>
        <div className="inline-flex items-center gap-2 px-2 py-0.5 text-[10px] font-medium text-neutral-600 bg-neutral-100 rounded border border-neutral-200/60 mb-3">
          {currentModule.number}
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-neutral-900">{currentModule.title}</h1>
        <p className="text-neutral-500 text-base max-w-2xl leading-relaxed">{currentModule.description}</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-neutral-900">Lessons</h2>
        <div className="flex flex-col border border-neutral-200 rounded-md overflow-hidden bg-white shadow-none">
          {currentModule.lessons.map((lesson, index) => {
            const isClickable = lesson.status !== "locked";
            const lessonHref = isClickable ? `/courses/python/${module}/${lesson.id}` : "#";

            return (
              <Link
                key={lesson.id}
                href={lessonHref}
                className={`flex items-center justify-between p-4 border-b border-neutral-100 last:border-0 transition-colors duration-200 ${
                  !isClickable
                    ? "bg-[#F7F7F5] opacity-70 cursor-not-allowed"
                    : "hover:bg-neutral-50 cursor-pointer"
                }`}
              >
                <div className="flex items-center gap-3">
                  {lesson.status === "completed" ? (
                    <CheckCircle2 className="size-4 text-neutral-900" />
                  ) : lesson.status === "in-progress" ? (
                    <PlayCircle className="size-4 text-neutral-900 fill-neutral-100" />
                  ) : (
                    <Lock className="size-4 text-neutral-400" />
                  )}
                  <div>
                    <h3 className={`font-medium text-sm ${lesson.status === "locked" ? "text-neutral-500" : "text-neutral-900"}`}>
                      <span className="text-neutral-400 mr-2">{(index + 1).toString().padStart(2, '0')}</span> 
                      {lesson.title}
                    </h3>
                  </div>
                </div>
                <div className="text-xs text-neutral-400 font-medium">
                  {lesson.duration}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      
      <div className="pt-6 flex justify-between border-t border-neutral-100">
        <Button variant="outline" className="shadow-none rounded-md h-9 px-4 border-neutral-200 hover:bg-neutral-100 text-sm font-medium" asChild>
          <Link href="/courses/python">Previous Module</Link>
        </Button>
        <Button className="shadow-none rounded-md h-9 px-4 bg-black text-white hover:bg-neutral-800 text-sm font-medium" asChild>
          <Link href={`/courses/python/${module}/lesson-4`}>Resume Module</Link>
        </Button>
      </div>
    </div>
  );
}
