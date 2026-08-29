"use client";

import { use } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Code2, ExternalLink, Lightbulb, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type ProjectData = {
  title: string;
  description: string;
  difficulty: string;
  time: string;
  prerequisites: string[];
  tags: string[];
  requirements: string[];
  hints: string[];
  sampleOutput: string;
  sandboxProblemId: string;
};

const projectsData: Record<string, ProjectData> = {
  "task-cli": {
    title: "Task Tracker CLI",
    description: "Build a command line application to manage tasks, utilizing JSON serialization for storage. This project will test your understanding of Python basics, file I/O, error handling, and argument parsing.",
    difficulty: "Beginner",
    time: "45 mins",
    prerequisites: ["Python Basics", "File I/O & JSON", "Command-line Arguments"],
    tags: ["Python", "CLI", "JSON"],
    requirements: [
      "The application should run from the command line using `python main.py` with subcommands.",
      "Users can add a new task with a description (e.g. `python main.py add 'Buy groceries'`).",
      "Users can list all tasks, or filter by status: done, in-progress, or todo.",
      "Users can update a task description or mark it as completed.",
      "Tasks are safely persisted to a `tasks.json` file on disk with automated file creation if missing."
    ],
    hints: [
      "Use Python's built-in `json` module (`json.load` and `json.dump`) to read and write tasks.",
      "Use `sys.argv` or the built-in `argparse` module to process flags and positional arguments."
    ],
    sampleOutput: `$ python main.py list
[ID: 1] [DONE] Setup virtual environment
[ID: 2] [TODO] Write unit tests for task manager
[ID: 3] [IN PROGRESS] Implement JSON serialization`,
    sandboxProblemId: "1"
  },
  "weather-api": {
    title: "Weather Dashboard API",
    description: "Create a RESTful API service that fetches real-time weather data, handles error codes, and caches results in memory to optimize response times and respect rate limits.",
    difficulty: "Intermediate",
    time: "2 hours",
    prerequisites: ["HTTP Requests", "FastAPI / Flask", "Dictionaries & Data Structures"],
    tags: ["FastAPI", "REST API", "Cache"],
    requirements: [
      "Define a `GET /weather/{city}` endpoint that accepts city names.",
      "Fetch live weather metrics (temperature, humidity, condition) from an external weather service.",
      "Implement a TTL (Time-To-Live) cache dictionary storing weather responses for 10 minutes.",
      "Return appropriate HTTP 404 status codes if a requested city is not found."
    ],
    hints: [
      "Use the `httpx` or `requests` library to perform HTTP network calls.",
      "Store timestamps with cached payloads: `cache[city] = (time.time(), data)`."
    ],
    sampleOutput: `{
  "city": "San Francisco",
  "temperature_c": 18.5,
  "condition": "Partly Cloudy",
  "cached": true,
  "cached_at": "2026-08-27T10:00:00Z"
}`,
    sandboxProblemId: "2"
  },
  "data-pandas": {
    title: "Data Analysis with Pandas",
    description: "Analyze a real-world CSV dataset, clean missing values, run aggregate queries, and output summary statistics in a formatted markdown report.",
    difficulty: "Beginner",
    time: "1 hour",
    prerequisites: ["Lists & Dictionaries", "File I/O", "Basic Statistics"],
    tags: ["Data Science", "Pandas", "CSV"],
    requirements: [
      "Load raw CSV files cleanly and inspect schema data types.",
      "Filter out invalid rows or impute missing numerical columns with column medians.",
      "Calculate key summary metrics including mean, median, standard deviation, and group totals.",
      "Export summary results to a formatted Markdown report file on disk."
    ],
    hints: [
      "Use `pandas.read_csv()` to import data and `df.fillna()` for missing values.",
      "Use `df.groupby('category').agg(...)` for grouped statistical summaries."
    ],
    sampleOutput: `| Category | Total Revenue | Avg Transaction | Customer Count |
|----------|---------------|-----------------|----------------|
| Tech     | $48,200       | $241.00         | 200            |
| Books    | $12,450       | $24.90          | 500            |`,
    sandboxProblemId: "5"
  },
  "markdown-blog": {
    title: "Markdown Blog Generator",
    description: "Build a static site engine in Python that reads frontmatter markdown articles, parses metadata, and compiles clean semantic HTML pages with an index feed.",
    difficulty: "Intermediate",
    time: "2.5 hours",
    prerequisites: ["String Processing", "File I/O", "Regular Expressions"],
    tags: ["Python", "Markdown", "HTML Engine"],
    requirements: [
      "Read all `.md` files in a `posts/` directory and parse YAML frontmatter (title, date, tags).",
      "Convert Markdown headings, links, and bold text into valid HTML tags.",
      "Generate an `index.html` listing all posts sorted by date in descending order.",
      "Output individual static HTML pages to a `dist/` directory."
    ],
    hints: [
      "Use Python's `re` regular expressions or the `markdown` package for parsing.",
      "Use a simple string template with `.format()` or Jinja2 to render the final HTML envelope."
    ],
    sampleOutput: `[INFO] Parsed 12 markdown posts from /content
[INFO] Generated /dist/index.html
[INFO] Generated /dist/posts/learning-python.html (2.4 KB)
[SUCCESS] Site build completed in 0.042s`,
    sandboxProblemId: "8"
  },
  "expense-tracker": {
    title: "Personal Expense Tracker",
    description: "Design an interactive CLI and SQLite expense manager with monthly category breakdowns, budget thresholds, and warning alerts.",
    difficulty: "Intermediate",
    time: "3 hours",
    prerequisites: ["SQLite3", "SQL Queries", "Dataclasses"],
    tags: ["SQLite", "Database", "CLI"],
    requirements: [
      "Create an embedded SQLite database table for expenses (id, date, amount, category, note).",
      "Support adding expenses with validation for positive float amounts and valid ISO dates.",
      "Generate a monthly summary report with category percentages and total spending.",
      "Alert the user if monthly spending in any category exceeds a defined budget cap."
    ],
    hints: [
      "Use the standard library `sqlite3` module with parameterized queries to prevent SQL injection.",
      "Use `GROUP BY category` SQL queries to aggregate category totals efficiently."
    ],
    sampleOutput: `=== August 2026 Expense Summary ===
Total Spending: $1,420.50 / $2,000.00 (71% of budget)
- Food & Dining:   $540.00 (38%)
- Housing:         $650.00 (45%)
- Transportation:  $130.50 (9%)
- Entertainment:   $100.00 (7%)`,
    sandboxProblemId: "1"
  },
  "web-scraper": {
    title: "Web Scraper & Summarizer",
    description: "Extract article text from web pages using BeautifulSoup, clean HTML artifacts, compute word frequencies, and generate readability statistics.",
    difficulty: "Advanced",
    time: "3.5 hours",
    prerequisites: ["HTTP Requests", "HTML DOM Parsing", "Collections"],
    tags: ["BeautifulSoup", "Scraping", "NLP"],
    requirements: [
      "Fetch HTML content from a URL with custom User-Agent headers and timeout handling.",
      "Extract main article body text while stripping navigation, ads, and footer elements.",
      "Calculate key text statistics: word count, estimated reading time, and top 10 keywords.",
      "Export structured metadata and clean text as JSON."
    ],
    hints: [
      "Use `bs4.BeautifulSoup(html, 'html.parser')` and target `<article>` or `<main>` tags.",
      "Use `collections.Counter` with a stop-words set to extract meaningful keywords."
    ],
    sampleOutput: `{
  "title": "The Future of Python in 2026",
  "word_count": 1420,
  "reading_time_mins": 6,
  "top_keywords": ["python", "concurrency", "performance", "jit", "typing"]
}`,
    sandboxProblemId: "10"
  }
};

export default function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = projectsData[id] || projectsData["task-cli"];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto pb-20 px-4 select-none">
      <div className="border-b border-neutral-100 dark:border-[rgba(255,255,255,0.09)] pb-4 mt-2">
        <Link href="/projects" className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white flex items-center mb-6 w-fit transition-colors">
          <ArrowLeft className="mr-1.5 size-4" /> Back to Projects Hub
        </Link>
        <div className="flex items-center gap-2 mb-2">
          {project.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="bg-[#F7F7F5] dark:bg-[#252525] text-neutral-700 dark:text-neutral-300 shadow-none font-medium text-[11px] px-2 py-0.5 border border-neutral-200/60 dark:border-white/10 rounded">
              {tag}
            </Badge>
          ))}
          <Badge variant="secondary" className="bg-[#F7F7F5] dark:bg-[#252525] text-neutral-700 dark:text-neutral-300 shadow-none font-medium text-[11px] px-2 py-0.5 border border-neutral-200/60 dark:border-white/10 rounded">
            {project.difficulty}
          </Badge>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-2">{project.title}</h1>
        <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed max-w-2xl">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 border-b border-neutral-100 dark:border-[rgba(255,255,255,0.09)] pb-6">
        <Button className="shadow-xs rounded-lg bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 h-9 px-4 text-xs font-semibold" asChild>
          <Link href={`/sandbox?problem=${project.sandboxProblemId}`}>
            <Code2 className="mr-2 size-4" /> Start Project in Sandbox
          </Link>
        </Button>
        <Button variant="outline" className="shadow-xs rounded-lg border-neutral-200 dark:border-[rgba(255,255,255,0.12)] bg-white dark:bg-[#1E1E1E] hover:bg-neutral-100 dark:hover:bg-[#252525] h-9 px-4 text-xs font-semibold text-neutral-700 dark:text-neutral-200" asChild>
          <Link href="/practice">
            <ExternalLink className="mr-2 size-4" /> Browse Related Problems
          </Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-8 pt-2">
        <div className="md:col-span-2 space-y-8">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white mb-4">Project Requirements</h2>
            <ul className="space-y-3.5">
              {project.requirements.map((req, i) => (
                <li key={i} className="flex gap-3 text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm">
                  <CheckCircle2 className="size-4.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white mb-4">Implementation Hints & Guidance</h2>
            <div className="bg-[#F7F7F5] dark:bg-[#202020] border border-neutral-200 dark:border-[rgba(255,255,255,0.09)] p-5 rounded-xl space-y-3.5 shadow-none">
              {project.hints.map((hint, i) => (
                <div key={i} className="flex gap-3 text-neutral-700 dark:text-neutral-300">
                  <Lightbulb className="size-4.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm leading-relaxed">{hint}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white mb-3">Expected Sample Output</h2>
            <pre className="p-4 bg-[#1E1E1E] text-[#D4D4D4] rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-neutral-800">
              <code>{project.sampleOutput}</code>
            </pre>
          </div>
        </div>

        {/* Sidebar Info Card */}
        <div className="space-y-5 bg-[#F7F7F5] dark:bg-[#202020] border border-neutral-200 dark:border-[rgba(255,255,255,0.09)] p-5 rounded-xl h-fit shadow-none">
          <div>
            <h3 className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Estimated Time</h3>
            <div className="text-neutral-900 dark:text-white text-xs font-semibold flex items-center gap-1.5">
              <Clock className="size-3.5 text-neutral-500" /> {project.time}
            </div>
          </div>
          <div className="h-px bg-neutral-200 dark:bg-white/10" />
          <div>
            <h3 className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Prerequisites</h3>
            <ul className="text-neutral-800 dark:text-neutral-200 text-xs space-y-1.5 font-medium">
              {project.prerequisites.map((p, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="h-px bg-neutral-200 dark:bg-white/10" />
          <div className="pt-1">
            <Button asChild className="w-full h-8.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-semibold rounded-lg shadow-2xs">
              <Link href={`/sandbox?problem=${project.sandboxProblemId}`}>
                Open in Code Editor
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
