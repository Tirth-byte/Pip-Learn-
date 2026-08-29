"use client";

import { useState, use } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { X, CheckCircle2, AlertCircle, ArrowRight, Trophy, Sparkles } from "lucide-react";
import { useAppContext } from "@/context/app-context";
import { toast } from "sonner";

type Question = {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

const quizQuestionBanks: Record<string, { title: string; questions: Question[] }> = {
  "basics-quiz-1": {
    title: "Python Basics & Syntax Quiz",
    questions: [
      {
        id: 1,
        question: "Which of the following is an immutable data type in Python?",
        options: ["list", "tuple", "dict", "set"],
        correctIndex: 1,
        explanation: "Tuples cannot be modified after creation, making them immutable. Lists, dicts, and sets are mutable."
      },
      {
        id: 2,
        question: "What is the output of type(5 / 2) in Python 3?",
        options: ["<class 'int'>", "<class 'float'>", "<class 'double'>", "<class 'number'>"],
        correctIndex: 1,
        explanation: "In Python 3, the standard division operator / always produces a float (2.5). Use // for integer floor division."
      },
      {
        id: 3,
        question: "What is the recommended naming convention for variables and functions in PEP 8?",
        options: ["camelCase", "PascalCase", "snake_case", "kebab-case"],
        correctIndex: 2,
        explanation: "PEP 8 specifies lowercase words separated by underscores (snake_case) for function and variable names."
      },
      {
        id: 4,
        question: "What does the bool() function return for the empty string \"\"?",
        options: ["True", "False", "None", "TypeError"],
        correctIndex: 1,
        explanation: "Empty sequences, collections, 0, None, and False evaluate to False in boolean contexts."
      }
    ]
  },
  "control-flow-quiz-1": {
    title: "Control Flow & Loops Quiz",
    questions: [
      {
        id: 1,
        question: "Which loop is best used when you know exactly how many times you need to iterate?",
        options: ["while loop", "do-while loop", "for loop", "infinite loop"],
        correctIndex: 2,
        explanation: "A for loop in Python iterates over a sequence or range of known length, making it ideal when the iteration count is predetermined."
      },
      {
        id: 2,
        question: "What keyword is used to exit a loop prematurely in Python?",
        options: ["exit", "stop", "break", "continue"],
        correctIndex: 2,
        explanation: "The break statement immediately terminates the innermost enclosing loop."
      },
      {
        id: 3,
        question: "What will range(3) produce when iterated over in a for loop?",
        options: ["1, 2, 3", "0, 1, 2", "0, 1, 2, 3", "1, 2"],
        correctIndex: 1,
        explanation: "range(n) starts at index 0 and produces integers up to but not including n (i.e. 0, 1, 2)."
      },
      {
        id: 4,
        question: "What does the continue statement do inside a loop?",
        options: ["Exits the program", "Skips to the next iteration", "Restarts the loop from 0", "Pauses execution"],
        correctIndex: 1,
        explanation: "continue skips the remainder of the current loop body and advances directly to the next iteration."
      }
    ]
  },
  "functions-quiz-1": {
    title: "Functions & Scope Quiz",
    questions: [
      {
        id: 1,
        question: "What keyword is used to define anonymous, one-line functions in Python?",
        options: ["def", "fn", "lambda", "func"],
        correctIndex: 2,
        explanation: "The lambda keyword creates small anonymous functions on a single line (e.g. lambda x: x * 2)."
      },
      {
        id: 2,
        question: "How do you accept an arbitrary number of keyword arguments in a function?",
        options: ["*args", "**kwargs", "&args", "...kwargs"],
        correctIndex: 1,
        explanation: "**kwargs unpacks excess named arguments into a dictionary inside the function."
      },
      {
        id: 3,
        question: "What happens if you modify a global variable inside a function without the 'global' keyword?",
        options: ["It modifies the global variable", "UnboundLocalError / local shadow", "SyntaxError", "It crashes the OS"],
        correctIndex: 1,
        explanation: "Assigning to a variable inside a function creates a local variable unless explicitly declared with global or nonlocal."
      }
    ]
  },
  "data-structures-quiz-1": {
    title: "Data Structures Quiz",
    questions: [
      {
        id: 1,
        question: "What is the average time complexity for searching a key in a Python dict?",
        options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"],
        correctIndex: 2,
        explanation: "Python dictionaries are implemented as hash tables, providing O(1) constant average lookup time."
      },
      {
        id: 2,
        question: "Which collection type automatically removes duplicate items?",
        options: ["list", "tuple", "set", "array"],
        correctIndex: 2,
        explanation: "Sets in Python only store unique, hashable elements and eliminate duplicate values."
      },
      {
        id: 3,
        question: "What is the syntax for a list comprehension squaring even numbers up to 10?",
        options: [
          "[x^2 for x in range(10) if x % 2 == 0]",
          "[x**2 for x in range(10) if x % 2 == 0]",
          "list(map(lambda x: x*2, 10))",
          "{x**2 for x in range(10)}"
        ],
        correctIndex: 1,
        explanation: "In Python, exponentiation uses the ** operator, so [x**2 for x in range(10) if x % 2 == 0] is correct."
      }
    ]
  },
  "oop-quiz-1": {
    title: "Object-Oriented Programming Quiz",
    questions: [
      {
        id: 1,
        question: "What special method acts as the constructor / initializer in Python classes?",
        options: ["__create__()", "__new__()", "__init__()", "constructor()"],
        correctIndex: 2,
        explanation: "__init__() initializes an instance after creation and receives self as the first parameter."
      },
      {
        id: 2,
        question: "How do you call a method from a parent class in Python 3?",
        options: ["parent.method()", "super().method()", "this.parent()", "base.method()"],
        correctIndex: 1,
        explanation: "super().method() delegates the call to the next class in the Method Resolution Order (MRO)."
      }
    ]
  },
  "async-quiz-1": {
    title: "AsyncIO & Concurrency Quiz",
    questions: [
      {
        id: 1,
        question: "Which function is used to run multiple async coroutines concurrently?",
        options: ["asyncio.run_all()", "asyncio.gather()", "asyncio.parallel()", "thread.start()"],
        correctIndex: 1,
        explanation: "asyncio.gather(*tasks) schedules multiple coroutines on the event loop and awaits all results concurrently."
      },
      {
        id: 2,
        question: "What keyword is required inside an async def function before calling a coroutine?",
        options: ["wait", "yield", "await", "defer"],
        correctIndex: 2,
        explanation: "The await keyword pauses execution of the current coroutine until the awaited task completes."
      }
    ]
  }
};

export default function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { updateProgress, progress } = useAppContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const quizData = quizQuestionBanks[id] || quizQuestionBanks["control-flow-quiz-1"];
  const currentQ = quizData.questions[currentIndex];
  const progressPercent = ((currentIndex + (isChecked ? 1 : 0)) / quizData.questions.length) * 100;

  const handleSelectOption = (index: number) => {
    if (isChecked) return;
    setSelectedOption(index);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setIsChecked(true);
    if (selectedOption === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < quizData.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsChecked(false);
    } else {
      setIsFinished(true);
      updateProgress(50);
      toast.success("Quiz complete! +50 XP awarded 🎉");
    }
  };

  if (isFinished) {
    const isPassing = score >= Math.ceil(quizData.questions.length * 0.7);
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] animate-in fade-in duration-300 max-w-lg mx-auto text-center py-10 px-4 select-none">
        <div className={`size-16 rounded-full flex items-center justify-center mb-6 border ${
          isPassing ? "bg-emerald-100 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300" : "bg-amber-100 dark:bg-amber-950/50 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300"
        }`}>
          {isPassing ? <CheckCircle2 className="size-8" /> : <Trophy className="size-8" />}
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mb-2">
          {isPassing ? "Quiz Mastered!" : "Quiz Completed"}
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-6">
          You scored <strong className="text-neutral-900 dark:text-white font-bold">{score}</strong> out of <strong className="text-neutral-900 dark:text-white font-bold">{quizData.questions.length}</strong> questions correctly ({Math.round((score / quizData.questions.length) * 100)}%).
        </p>

        <div className="bg-[#F7F7F5] dark:bg-[#202020] border border-neutral-200 dark:border-[rgba(255,255,255,0.09)] p-4 rounded-xl w-full mb-8 space-y-2 text-left">
          <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Rewards Earned</div>
          <div className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
            <Sparkles className="size-4 text-amber-500" /> +50 XP Added to Profile
          </div>
          <div className="text-xs text-neutral-500">Current Daily Streak: {progress.streak} days 🔥</div>
        </div>

        <div className="flex gap-3 w-full">
          <Button variant="outline" className="flex-1 h-10 border-neutral-200 dark:border-[rgba(255,255,255,0.12)] text-xs font-semibold" asChild>
            <Link href="/courses/python">Back to Course</Link>
          </Button>
          <Button className="flex-1 h-10 bg-black hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 text-xs font-semibold" asChild>
            <Link href="/practice">Solve Practice Problems</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-6rem)] animate-in fade-in duration-300 max-w-4xl mx-auto w-full pb-10 px-4 select-none">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-8 mt-2 border-b border-neutral-100 dark:border-[rgba(255,255,255,0.09)] pb-4">
        <Link
          href="/courses/python"
          className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors px-2 py-1 -ml-2 rounded hover:bg-neutral-100 dark:hover:bg-white/5 flex items-center gap-1.5 text-xs font-semibold"
        >
          <X className="size-4" /> Exit Quiz
        </Link>
        <div className="flex-1 max-w-md mx-8 flex items-center gap-4">
          <Progress value={progressPercent} className="h-2 flex-1 bg-neutral-100 dark:bg-white/10" />
        </div>
        <div className="text-xs font-mono font-semibold text-neutral-500 w-16 text-right">
          {currentIndex + 1} / {quizData.questions.length}
        </div>
      </div>

      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full mt-2">
        <div className="text-xs font-semibold text-[#0066FF] mb-2 uppercase tracking-wider">{quizData.title}</div>
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-6 tracking-tight">
          {currentQ.question}
        </h2>

        {/* Option Grid */}
        <div className="grid gap-3 w-full">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;

            let borderStyle = "border-neutral-200 dark:border-[rgba(255,255,255,0.12)] bg-white dark:bg-[#1E1E1E] hover:bg-neutral-50 dark:hover:bg-[#252525]";
            if (isSelected) {
              borderStyle = "border-neutral-900 dark:border-white bg-neutral-50 dark:bg-white/5 font-semibold";
            }
            if (isChecked) {
              if (isCorrect) {
                borderStyle = "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 font-semibold text-emerald-950 dark:text-emerald-200";
              } else if (isSelected) {
                borderStyle = "border-rose-400 bg-rose-50/60 dark:bg-rose-950/40 font-semibold text-rose-950 dark:text-rose-200";
              }
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(idx)}
                className={`p-4 rounded-xl border text-left text-sm transition-all flex items-center justify-between cursor-pointer ${borderStyle}`}
              >
                <span>{opt}</span>
                {isChecked && isCorrect && <CheckCircle2 className="size-4 text-emerald-600 shrink-0 ml-2" />}
                {isChecked && !isCorrect && isSelected && <AlertCircle className="size-4 text-rose-600 shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>

        {/* Explanation Card */}
        {isChecked && (
          <div className="mt-6 p-4 rounded-xl bg-[#F7F7F5] dark:bg-[#202020] border border-neutral-200 dark:border-[rgba(255,255,255,0.09)] animate-in fade-in duration-200">
            <div className="text-xs font-bold text-neutral-800 dark:text-white mb-1">Explanation:</div>
            <div className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">{currentQ.explanation}</div>
          </div>
        )}

        {/* Action Controls */}
        <div className="mt-8 pt-4 border-t border-neutral-100 dark:border-[rgba(255,255,255,0.09)] flex justify-end">
          {!isChecked ? (
            <Button
              onClick={handleCheckAnswer}
              disabled={selectedOption === null}
              className="h-10 px-6 bg-black hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 text-xs font-semibold rounded-lg"
            >
              Check Answer
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              className="h-10 px-6 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
            >
              {currentIndex < quizData.questions.length - 1 ? (
                <>Next Question <ArrowRight className="size-4" /></>
              ) : (
                <>Complete Quiz <CheckCircle2 className="size-4" /></>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
