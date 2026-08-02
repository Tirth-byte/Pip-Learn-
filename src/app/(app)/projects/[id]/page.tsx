"use client";

import { use } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Code2, ExternalLink, Lightbulb, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const projectsData: Record<string, {
  title: string;
  description: string;
  difficulty: string;
  time: string;
  prerequisites: string[];
  tags: string[];
  requirements: string[];
  hints: string[];
  sandboxProblemId: string;
}> = {
  "task-cli": {
    title: "Task Tracker CLI",
    description: "Build a command line application to manage tasks, utilizing JSON for storage. This project will test your understanding of Python basics, file I/O, and argument parsing.",
    difficulty: "Beginner",
    time: "45 mins",
    prerequisites: ["Python Basics", "File I/O & JSON"],
    tags: ["Python", "CLI", "JSON"],
    requirements: [
      "The application should run from the command line using `python main.py`.",
      "Users can add a new task with a description.",
      "Users can list all tasks, or filter by status (done / in-progress / todo).",
      "Tasks are persisted to a `tasks.json` file on disk."
    ],
    hints: [
      "Use the built-in `json` module (`json.load` and `json.dump`) to read and write tasks.",
      "Use `sys.argv` or the built-in `argparse` module to process flags like `--add` or `--list`."
    ],
    sandboxProblemId: "1"
  },
  "weather-api": {
    title: "Weather Dashboard API",
    description: "Create a RESTful API service that fetches real-time weather data, handles error codes, and caches results to optimize response times.",
    difficulty: "Intermediate",
    time: "2 hours",
    prerequisites: ["HTTP Requests", "Dictionaries & Data Structures", "API Design"],
    tags: ["FastAPI", "API", "Cache"],
    requirements: [
      "Fetch weather data from an external API or mock endpoint.",
      "Parse JSON responses and format key data (temperature, humidity, condition).",
      "Implement a simple in-memory cache to prevent duplicate external network calls within 5 minutes.",
      "Handle missing cities or network timeouts gracefully with custom error responses."
    ],
    hints: [
      "Use the `requests` or `httpx` package for making async or sync HTTP calls.",
      "Maintain a dictionary storing city names and timestamps for your caching layer."
    ],
    sandboxProblemId: "2"
  },
  "data-pandas": {
    title: "Data Analysis with Pandas",
    description: "Analyze a real-world dataset, clean missing values, run aggregate queries, and output summary statistics in markdown format.",
    difficulty: "Beginner",
    time: "1 hour",
    prerequisites: ["Lists & Dictionaries", "File I/O"],
    tags: ["Data Science", "Pandas", "CSV"],
    requirements: [
      "Load CSV data files cleanly and inspect schema.",
      "Filter out rows containing invalid or empty data points.",
      "Calculate key metrics including mean, median, standard deviation, and group totals.",
      "Export summary results to a formatted Markdown report file."
    ],
    hints: [
      "Use Python's built-in `csv` module or `pandas` DataFrame functionality.",
      "Utilize list comprehensions for fast data filtering and aggregation."
    ],
    sandboxProblemId: "5"
  }
};

export default function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = projectsData[id] || projectsData["task-cli"];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto pb-20">
      <div className="border-b border-neutral-100 pb-4 mt-4">
        <Link href="/projects" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 flex items-center mb-6 w-fit transition-colors">
          <ArrowLeft className="mr-1.5 size-4" /> Back to Projects
        </Link>
        <div className="flex items-center gap-2 mb-2">
          {project.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="bg-[#F7F7F5] text-neutral-600 shadow-none font-medium text-[10px] px-1.5 py-0 border border-neutral-200/60 rounded">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 mb-2">{project.title}</h1>
        <p className="text-neutral-500 text-base leading-relaxed max-w-2xl">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 border-b border-neutral-100 pb-6">
        <Button className="shadow-none rounded-md bg-black text-white hover:bg-neutral-800 h-9 px-4 text-sm font-medium" asChild>
          <Link href={`/sandbox?problem=${project.sandboxProblemId}`}>
            <Code2 className="mr-2 size-4" /> Start Project in Sandbox
          </Link>
        </Button>
        <Button variant="outline" className="shadow-none rounded-md border-neutral-200 bg-white hover:bg-neutral-100 h-9 px-4 text-sm font-medium" asChild>
          <Link href="/sandbox?problem=1">
            <ExternalLink className="mr-2 size-4" /> View Sample Code
          </Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-8 pt-2">
        <div className="md:col-span-2 space-y-10">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-neutral-900 mb-4">Requirements</h2>
            <ul className="space-y-4">
              {project.requirements.map((req, i) => (
                <li key={i} className="flex gap-3 text-neutral-700">
                  <CheckCircle2 className="size-5 text-neutral-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight text-neutral-900 mb-4">Hints & Recommendations</h2>
            <div className="bg-[#F7F7F5] border border-neutral-200 p-5 rounded-md space-y-4 shadow-none">
              {project.hints.map((hint, i) => (
                <div key={i} className="flex gap-3 text-neutral-700">
                  <Lightbulb className="size-5 text-neutral-500 shrink-0 mt-0.5" />
                  <p className="text-sm leading-relaxed">{hint}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6 bg-[#F7F7F5] border border-neutral-200 p-5 rounded-md h-fit shadow-none">
          <div>
            <h3 className="text-xs font-medium text-neutral-500 mb-1">Difficulty</h3>
            <div className="text-neutral-900 text-sm font-medium">{project.difficulty}</div>
          </div>
          <div className="h-px bg-neutral-200"></div>
          <div>
            <h3 className="text-xs font-medium text-neutral-500 mb-2">Prerequisites</h3>
            <ul className="text-neutral-900 text-sm space-y-1.5">
              {project.prerequisites.map((prereq, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-neutral-400"></span> {prereq}
                </li>
              ))}
            </ul>
          </div>
          <div className="h-px bg-neutral-200"></div>
          <div>
            <h3 className="text-xs font-medium text-neutral-500 mb-1">Estimated Time</h3>
            <div className="text-neutral-900 text-sm font-medium flex items-center gap-1.5">
              <Clock className="size-3.5 text-neutral-400" /> {project.time}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
