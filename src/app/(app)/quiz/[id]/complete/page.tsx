import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

export default function QuizCompletePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] animate-in zoom-in-95 duration-500">
      <div className="size-20 bg-white rounded-full flex items-center justify-center mb-8 border border-neutral-200 shadow-none">
        <Check className="size-8 text-neutral-900" strokeWidth={2.5} />
      </div>
      <h1 className="text-4xl font-bold tracking-tight mb-3 text-center text-neutral-900">Lesson Completed!</h1>
      <p className="text-neutral-500 text-center max-w-md mb-12 text-lg leading-relaxed">
        You've successfully completed "Introduction to Loops". You've earned <strong>50 XP</strong> and increased your daily streak.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Button variant="outline" className="h-11 px-6 shadow-none text-sm font-medium border-neutral-200 hover:bg-neutral-50 rounded w-full sm:w-auto text-neutral-700" asChild>
          <Link href="/courses/python/control-flow">Back to Module</Link>
        </Button>
        <Button className="h-11 px-6 shadow-none text-sm font-medium rounded bg-black hover:bg-neutral-800 text-white w-full sm:w-auto" asChild>
          <Link href="/courses/python/control-flow/lesson-5">
            Next Lesson <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
