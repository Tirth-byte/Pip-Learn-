import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { CheckCircle2, ArrowLeft, PlayCircle, Lock } from "lucide-react";

const modules = [
  {
    id: "basics",
    title: "Python Basics",
    description: "Variables, data types, and basic operators.",
    status: "completed",
    lessons: 5,
  },
  {
    id: "control-flow",
    title: "Control Flow",
    description: "If statements, for loops, and while loops.",
    status: "in-progress",
    lessons: 6,
  },
  {
    id: "functions",
    title: "Functions & Scope",
    description: "Defining functions, arguments, return values, and variable scope.",
    status: "locked",
    lessons: 4,
  },
  {
    id: "data-structures",
    title: "Data Structures",
    description: "Lists, dictionaries, sets, and tuples.",
    status: "locked",
    lessons: 8,
  }
];

export default function PythonCoursePage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-3xl mx-auto py-8">
      <div>
        <Link href="/courses" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 flex items-center mb-6 w-fit transition-colors">
          <ArrowLeft className="mr-1.5 size-4" /> Back to courses
        </Link>
        <div className="flex gap-2 mb-4">
          <Badge variant="secondary" className="bg-neutral-100 text-neutral-600 shadow-none font-medium text-[10px] px-1.5 py-0 border border-neutral-200/60 rounded">Core</Badge>
          <Badge variant="secondary" className="bg-neutral-100 text-neutral-600 shadow-none font-medium text-[10px] px-1.5 py-0 border border-neutral-200/60 rounded">Beginner</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3 text-neutral-900">Python Masterclass</h1>
        <p className="text-neutral-500 text-base leading-relaxed max-w-2xl">
          From variables to advanced data structures and Object Oriented Programming. The most comprehensive guide to Python.
        </p>
      </div>

      <div className="p-6 border border-neutral-200 rounded-md bg-[#F7F7F5] shadow-none flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex-1 w-full space-y-2">
          <div className="flex justify-between text-sm font-medium text-neutral-700">
            <span>Course Progress</span>
            <span>25%</span>
          </div>
          <Progress value={25} className="h-1.5 bg-neutral-200" />
          <p className="text-xs font-medium text-neutral-500">2 of 8 modules completed</p>
        </div>
        <div className="w-full md:w-auto shrink-0">
          <Button asChild className="w-full md:w-auto h-9 shadow-none rounded-md px-4 bg-black text-white hover:bg-neutral-800 text-sm font-medium">
            <Link href="/courses/python/control-flow">Continue Learning</Link>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border-b border-neutral-100 pb-2">
          <h2 className="text-xl font-semibold tracking-tight text-neutral-900">Syllabus</h2>
        </div>
        <div className="flex flex-col gap-2">
          {modules.map((mod, i) => (
            <Link 
              key={mod.id} 
              href={mod.status !== "locked" ? `/courses/python/${mod.id}` : "#"}
              className={`p-4 border rounded-md flex items-start gap-3 transition-colors duration-200 ${
                mod.status === "locked" 
                  ? "border-neutral-100 bg-[#F7F7F5] opacity-70 cursor-not-allowed" 
                  : "border-neutral-200 hover:bg-neutral-50 cursor-pointer bg-white"
              }`}
            >
              <div className="pt-0.5">
                {mod.status === "completed" ? (
                  <CheckCircle2 className="size-4 text-neutral-900" />
                ) : mod.status === "in-progress" ? (
                  <PlayCircle className="size-4 text-neutral-900 fill-neutral-100" />
                ) : (
                  <Lock className="size-4 text-neutral-400" />
                )}
              </div>
              <div className="flex-1">
                <h3 className={`font-medium text-sm mb-1 ${mod.status === 'locked' ? 'text-neutral-500' : 'text-neutral-900'}`}>
                  <span className="text-neutral-400 mr-2">{(i + 1).toString().padStart(2, '0')}</span> 
                  {mod.title}
                </h3>
                <p className="text-neutral-500 text-xs leading-relaxed">{mod.description}</p>
                <div className="mt-2 text-xs text-neutral-400 font-medium">{mod.lessons} Lessons</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
