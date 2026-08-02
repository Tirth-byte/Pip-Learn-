import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Code2, Globe } from "lucide-react";

export default function PortfolioPage() {
  const completedProjects = [
    {
      id: "personal-blog",
      title: "Personal Blog API",
      description: "A RESTful API built with FastAPI to manage blog posts, comments, and user authentication. Includes rate limiting and PostgreSQL integration.",
      date: "August 2026",
      tags: ["FastAPI", "Python", "SQLAlchemy"],
    },
    {
      id: "data-analyzer",
      title: "CSV Data Analyzer",
      description: "A CLI tool that reads CSV files, performs statistical analysis, and generates a summary report in markdown format.",
      date: "July 2026",
      tags: ["Python", "Pandas", "CLI"],
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-neutral-100 pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 mb-1">John's Portfolio</h1>
          <p className="text-neutral-500 text-sm">Passionate learner building projects in Python and Next.js</p>
          <div className="flex items-center gap-2 mt-4 text-[13px] font-medium text-neutral-500 w-fit">
            <Globe className="size-4 text-neutral-400" />
            <span className="hover:text-neutral-900 transition-colors cursor-pointer border-b border-transparent hover:border-neutral-900">github.com/johndoe</span>
          </div>
        </div>
        <Button variant="outline" className="shadow-none border-neutral-200 h-8 px-3 hover:bg-neutral-100 text-xs font-medium rounded text-neutral-700">
          <ExternalLink className="mr-1.5 size-3" /> Share Portfolio
        </Button>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-neutral-700 mb-4">Completed Projects</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {completedProjects.map((project) => (
            <Card key={project.id} className="shadow-none border-neutral-200 flex flex-col hover:bg-[#F7F7F5] transition-colors rounded-md overflow-hidden bg-white">
              <CardHeader className="p-5 pb-3">
                <div className="flex justify-between items-start mb-1">
                  <div className="text-xs font-medium text-neutral-500">{project.date}</div>
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
              <CardFooter className="p-5 pt-0 flex gap-3 mt-auto">
                <Button variant="outline" className="flex-1 shadow-none border-neutral-200 bg-white hover:bg-neutral-100 h-8 text-xs font-medium rounded text-neutral-700">
                  <Code2 className="mr-1.5 size-3" /> Code
                </Button>
                <Button variant="outline" className="flex-1 shadow-none border-neutral-200 bg-white hover:bg-neutral-100 h-8 text-xs font-medium rounded text-neutral-700">
                  <ExternalLink className="mr-1.5 size-3" /> Demo
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
