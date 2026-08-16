"use client";

import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, BookOpen, Check, Code2, HelpCircle, Sparkles } from "lucide-react";
import { useAppContext } from "@/context/app-context";
import { toast } from "sonner";

type LessonContent = {
  title: string;
  readTime: string;
  summary: string;
  sections: {
    heading: string;
    body: string;
    codeSnippet?: string;
  }[];
  keyTakeaway: string;
  nextLessonId?: string;
  quizId?: string;
  practiceProblemId?: string;
};

const lessonDetailsMap: Record<string, LessonContent> = {
  "control-flow-lesson-4": {
    title: "Introduction to Loops",
    readTime: "8 min read",
    summary: "In programming, we often need to execute a block of code multiple times. Instead of copying and pasting the same code over and over, we use loops.",
    sections: [
      {
        heading: "Why do we need loops?",
        body: "Imagine you need to print numbers from 1 to 100. Writing `print(1)`, `print(2)`, ..., `print(100)` is tedious and error-prone. Loops allow us to automate repetitive tasks efficiently.",
        codeSnippet: "# Without loops:\nprint(1)\nprint(2)\nprint(3)\n\n# With a loop:\nfor i in range(1, 101):\n    print(i)"
      },
      {
        heading: "Types of Loops in Python",
        body: "Python provides two main types of loops:\n- **for loops:** Used for iterating over a sequence (like a list, tuple, dictionary, set, or string).\n- **while loops:** Used to execute a block of statements repeatedly as long as a condition evaluates to True.",
        codeSnippet: "# Simple for loop example\nfor item in ['apple', 'banana', 'cherry']:\n    print(f'Fruit: {item}')"
      }
    ],
    keyTakeaway: "Loops are the foundation of automation in programming. Mastering them is essential for writing DRY (Don't Repeat Yourself) code.",
    nextLessonId: "lesson-5",
    quizId: "control-flow-quiz-1",
    practiceProblemId: "1"
  },
  "basics-lesson-2": {
    title: "Variables and Data Types",
    readTime: "8 min read",
    summary: "Variables allow us to store data in named memory locations that can be referenced and manipulated throughout a program.",
    sections: [
      {
        heading: "Creating Variables",
        body: "Python is dynamically typed, meaning you do not need to explicitly declare variable types. Assignment happens using the `=` operator.",
        codeSnippet: "user_name = 'Alice'\nage = 25\nis_active = True\npi_value = 3.14159"
      }
    ],
    keyTakeaway: "Choose clear, descriptive variable names using snake_case convention in Python.",
    nextLessonId: "lesson-3",
    quizId: "basics-quiz-1",
    practiceProblemId: "1"
  }
};

export default function LessonPage({ params }: { params: Promise<{ module: string; lesson: string }> }) {
  const { module, lesson } = use(params);
  const { updateProgress } = useAppContext();
  const [isCompleted, setIsCompleted] = useState(false);

  const handleToggleComplete = () => {
    if (!isCompleted) {
      setIsCompleted(true);
      updateProgress(50);
      toast.success("Lesson completed! +50 XP earned 🎉");
    } else {
      setIsCompleted(false);
    }
  };

  const detailKey = `${module}-${lesson}`;
  const lessonData = lessonDetailsMap[detailKey] || {
    title: lesson.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
    readTime: "6 min read",
    summary: `Detailed guide covering ${lesson.replace(/-/g, " ")} in Python. Master concepts with clear code examples and practice problems.`,
    sections: [
      {
        heading: "Core Concepts",
        body: "Understand the syntax and execution rules for this feature in Python.",
        codeSnippet: `# Example for ${lesson}\ndef execute_example():\n    data = [1, 2, 3, 4]\n    return [x * 2 for x in data]\n\nprint(execute_example())`
      }
    ],
    keyTakeaway: "Practice writing code in the interactive sandbox to solidify your understanding of this topic.",
    nextLessonId: "lesson-5",
    quizId: `${module}-quiz-1`,
    practiceProblemId: "1"
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-3xl mx-auto py-8 pb-24">
      <div className="border-b border-neutral-100 pb-4">
        <Link href={`/courses/python/${module}`} className="text-sm font-medium text-neutral-500 hover:text-neutral-900 flex items-center mb-6 w-fit transition-colors">
          <ArrowLeft className="mr-1.5 size-4" /> Back to Module
        </Link>
        <div className="flex items-center gap-2 text-xs font-medium text-neutral-500 mb-2">
          <BookOpen className="size-3.5" />
          <span>{lessonData.readTime}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">{lessonData.title}</h1>
      </div>

      <div className="prose prose-neutral max-w-none text-neutral-700">
        <p className="text-base leading-relaxed mb-6">{lessonData.summary}</p>

        {lessonData.sections.map((sec, idx) => (
          <div key={idx} className="mb-8">
            <h2 className="text-xl font-semibold mt-6 mb-3 pb-2 border-b border-neutral-100 text-neutral-900 tracking-tight">
              {sec.heading}
            </h2>
            <div className="mb-4 text-base leading-relaxed whitespace-pre-line">{sec.body}</div>
            {sec.codeSnippet && (
              <div className="bg-[#F7F7F5] border border-neutral-200 rounded-md p-4 my-4 font-mono text-sm text-neutral-800 shadow-none overflow-x-auto whitespace-pre">
                {sec.codeSnippet}
              </div>
            )}
          </div>
        ))}

        <div className="bg-[#F7F7F5] p-4 rounded-md border border-neutral-200 my-8 flex gap-3 items-start shadow-none">
          <div className="bg-white p-1.5 rounded border border-neutral-200 shadow-none shrink-0 flex items-center justify-center size-7">
            <Sparkles className="size-4 text-neutral-900" />
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900 mb-1 text-sm">Key Takeaway</h3>
            <p className="text-neutral-600 text-sm leading-relaxed m-0">{lessonData.keyTakeaway}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-neutral-100 mt-12">
        <Button
          variant={isCompleted ? "outline" : "default"}
          onClick={handleToggleComplete}
          className={`w-full sm:w-auto h-9 px-4 shadow-none rounded-md text-sm font-medium ${
            isCompleted ? "border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100" : "bg-black text-white hover:bg-neutral-800"
          }`}
        >
          <Check className="mr-2 size-4" />
          {isCompleted ? "Completed!" : "Mark as Completed"}
        </Button>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none h-9 px-4 shadow-none rounded-md border-neutral-200 hover:bg-neutral-100 text-sm font-medium" asChild>
            <Link href={`/quiz/${lessonData.quizId || "1"}`}>
              <HelpCircle className="mr-2 size-4" /> Take Quiz
            </Link>
          </Button>

          <Button variant="outline" className="flex-1 sm:flex-none h-9 px-4 shadow-none rounded-md border-neutral-200 hover:bg-neutral-100 text-sm font-medium" asChild>
            <Link href={`/sandbox?problem=${lessonData.practiceProblemId || "1"}`}>
              <Code2 className="mr-2 size-4" /> Practice Code
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
