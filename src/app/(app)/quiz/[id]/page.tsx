"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { X, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

type Question = {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

const quizQuestions: Question[] = [
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
    explanation: "The break statement immediately terminates the loop containing it."
  },
  {
    id: 3,
    question: "What will range(3) produce when iterated over in a for loop?",
    options: ["1, 2, 3", "0, 1, 2", "0, 1, 2, 3", "1, 2"],
    correctIndex: 1,
    explanation: "range(n) starts at 0 and produces integers up to but not including n."
  }
];

export default function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = quizQuestions[currentIndex];
  const progressPercent = ((currentIndex + (isChecked ? 1 : 0)) / quizQuestions.length) * 100;

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
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsChecked(false);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] animate-in fade-in duration-300 max-w-lg mx-auto text-center py-10">
        <div className="size-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 mb-6">
          <CheckCircle2 className="size-8" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 mb-2">Quiz Completed!</h1>
        <p className="text-neutral-500 text-sm mb-6">
          You scored <strong className="text-neutral-900">{score}</strong> out of <strong className="text-neutral-900">{quizQuestions.length}</strong> correctly.
        </p>

        <div className="bg-[#F7F7F5] border border-neutral-200 p-4 rounded-md w-full mb-8 space-y-2 text-left">
          <div className="text-xs font-semibold text-neutral-500 uppercase">Rewards</div>
          <div className="text-sm font-semibold text-neutral-900">+50 XP Earned</div>
          <div className="text-xs text-neutral-500">Streak updated to 15 days</div>
        </div>

        <div className="flex gap-3 w-full">
          <Button variant="outline" className="flex-1 h-10 border-neutral-200" asChild>
            <Link href="/courses/python/control-flow">Back to Module</Link>
          </Button>
          <Button className="flex-1 h-10 bg-black text-white hover:bg-neutral-800" asChild>
            <Link href="/practice">Practice Code</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-6rem)] animate-in fade-in duration-300 max-w-4xl mx-auto w-full pb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 mt-4 border-b border-neutral-100 pb-4">
        <Link
          href="/courses/python/control-flow"
          className="text-neutral-500 hover:text-neutral-900 transition-colors px-2 py-1 -ml-2 rounded hover:bg-neutral-100 flex items-center gap-1.5 text-sm font-medium"
        >
          <X className="size-4" /> Exit Quiz
        </Link>
        <div className="flex-1 max-w-md mx-8 flex items-center gap-4">
          <Progress value={progressPercent} className="h-2 flex-1 bg-neutral-100" />
        </div>
        <div className="text-sm font-medium text-neutral-500 w-12 text-right">
          {currentIndex + 1} / {quizQuestions.length}
        </div>
      </div>

      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full mt-2">
        <h2 className="text-2xl font-bold text-neutral-900 mb-8 tracking-tight">
          {currentQ.question}
        </h2>

        {/* Option Grid */}
        <div className="grid gap-3 w-full">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;

            let borderStyle = "border-neutral-200 bg-white hover:bg-neutral-50";
            if (isSelected) {
              borderStyle = "border-neutral-900 bg-neutral-50 font-semibold";
            }
            if (isChecked) {
              if (isCorrect) {
                borderStyle = "border-emerald-500 bg-emerald-50/60 font-semibold text-emerald-950";
              } else if (isSelected) {
                borderStyle = "border-rose-400 bg-rose-50/60 font-semibold text-rose-950";
              }
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(idx)}
                className={`flex items-center gap-3 p-4 border rounded-md cursor-pointer transition-colors text-left text-sm ${borderStyle}`}
              >
                <div className={`flex items-center justify-center size-4 rounded-full border ${
                  isSelected ? "border-neutral-900 bg-black text-white" : "border-neutral-300 bg-white"
                }`}>
                  {isSelected && <div className="size-1.5 rounded-full bg-white"></div>}
                </div>
                <span className="flex-1">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation Banner */}
        {isChecked && (
          <div className={`mt-6 p-4 rounded-md border text-xs leading-relaxed ${
            selectedOption === currentQ.correctIndex
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : "bg-rose-50 border-rose-200 text-rose-900"
          }`}>
            <div className="font-semibold text-sm mb-1 flex items-center gap-1.5">
              {selectedOption === currentQ.correctIndex ? (
                <>
                  <CheckCircle2 className="size-4 text-emerald-600" /> Correct!
                </>
              ) : (
                <>
                  <AlertCircle className="size-4 text-rose-600" /> Incorrect
                </>
              )}
            </div>
            {currentQ.explanation}
          </div>
        )}

        {/* Action Button */}
        <div className="mt-8 w-full flex justify-end">
          {!isChecked ? (
            <Button
              onClick={handleCheckAnswer}
              disabled={selectedOption === null}
              className="h-9 px-6 shadow-none text-sm font-medium rounded-md bg-black text-white hover:bg-neutral-800 disabled:opacity-40"
            >
              Check Answer
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              className="h-9 px-6 shadow-none text-sm font-medium rounded-md bg-black text-white hover:bg-neutral-800"
            >
              {currentIndex < quizQuestions.length - 1 ? (
                <>
                  Next Question <ArrowRight className="ml-2 size-4" />
                </>
              ) : (
                "Complete Quiz"
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
