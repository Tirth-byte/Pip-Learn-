import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Terminal, CloudSun, LineChart } from "lucide-react";

const projects = [
  {
    id: "task-cli",
    title: "Task Tracker CLI",
    description: "Build a command line application to manage tasks, utilizing JSON for storage.",
    difficulty: "Beginner",
    time: "45 mins",
    tags: ["Python", "CLI", "JSON"],
    icon: Terminal,
  },
  {
    id: "weather-api",
    title: "Weather Dashboard API",
    description: "Create a RESTful API that fetches and caches weather data from a third-party service.",
    difficulty: "Intermediate",
    time: "2 hours",
    tags: ["FastAPI", "API", "Cache"],
    icon: CloudSun,
  },
  {
    id: "data-pandas",
    title: "Data Analysis with Pandas",
    description: "Analyze a real-world dataset, clean missing values, and generate summary statistics.",
    difficulty: "Beginner",
    time: "1 hour",
    tags: ["Data Science", "Pandas", "CSV"],
    icon: LineChart,
  }
];

export default function ProjectsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-6xl mx-auto pb-10">
      <div className="border-b border-neutral-100 pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 mb-1 flex items-center gap-2">
          Projects
        </h1>
        <p className="text-neutral-500 text-sm">Apply what you've learned by building real-world applications.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => {
          const Icon = project.icon;
          return (
            <Card key={project.id} className="shadow-none border-neutral-200 flex flex-col hover:bg-[#F7F7F5] transition-colors duration-200 rounded-md overflow-hidden bg-white">
              <Link href={`/projects/${project.id}`} className="flex flex-col h-full cursor-pointer">
                <CardHeader className="p-5 pb-3">
                  <div className="flex justify-between items-start mb-4">
                    <div className="size-8 rounded flex items-center justify-center border bg-white border-neutral-200 shadow-sm">
                      <Icon className="size-4 text-neutral-700" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-medium text-neutral-500">{project.time}</span>
                      <Badge variant="secondary" className="bg-[#F7F7F5] text-neutral-600 shadow-none font-medium text-[10px] px-1.5 py-0 border border-neutral-200 rounded">
                        {project.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-base font-semibold tracking-tight text-neutral-900 mb-1.5">{project.title}</CardTitle>
                  <CardDescription className="text-neutral-500 text-sm leading-relaxed">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-1.5 mt-auto px-5 pb-5 pt-0">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-medium text-neutral-600 bg-[#F7F7F5] border border-neutral-200/60 px-1.5 py-0 rounded">
                      {tag}
                    </span>
                  ))}
                </CardContent>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
