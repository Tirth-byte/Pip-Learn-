import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowRight, Code2 } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex-1 flex min-h-[calc(100vh-3.5rem)] bg-white animate-in fade-in duration-500">
      
      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-16 lg:px-24 xl:px-32 relative">
        <div className="w-full max-w-sm mx-auto space-y-8">
          <div className="space-y-2 text-left">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Welcome back</h1>
            <p className="text-neutral-500 text-sm">Enter your credentials to access your workspace.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-11 shadow-none rounded border-neutral-200 hover:bg-neutral-50 transition-colors">
              <Code2 className="size-4 mr-2" /> GitHub
            </Button>
            <Button variant="outline" className="h-11 shadow-none rounded border-neutral-200 hover:bg-neutral-50 transition-colors">
              Google
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-neutral-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-neutral-400 font-medium tracking-wider">Or continue with email</span>
            </div>
          </div>
          
          <form className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-neutral-700 font-medium text-xs uppercase tracking-wider">Email address</Label>
              <Input id="email" type="email" placeholder="ada.lovelace@example.com" required className="h-11 shadow-none rounded border-neutral-200 focus-visible:ring-1 focus-visible:ring-neutral-300 focus-visible:border-neutral-300 bg-[#F7F7F5] hover:bg-white transition-colors text-neutral-900" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-neutral-700 font-medium text-xs uppercase tracking-wider">Password</Label>
                <Link href="#" className="text-xs text-neutral-500 hover:text-neutral-900 hover:underline transition-colors">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" required placeholder="••••••••" className="h-11 shadow-none rounded border-neutral-200 focus-visible:ring-1 focus-visible:ring-neutral-300 focus-visible:border-neutral-300 bg-[#F7F7F5] hover:bg-white transition-colors text-neutral-900" />
            </div>
            <Button type="button" className="w-full h-11 shadow-none rounded text-sm bg-black hover:bg-neutral-800 text-white transition-colors" asChild>
              <Link href="/dashboard">Continue to Dashboard</Link>
            </Button>
          </form>

          <div className="text-center text-sm text-neutral-500 pt-4">
            Don't have an account?{" "}
            <Link href="/signup" className="text-neutral-900 hover:underline font-medium transition-colors">
              Sign up <ArrowRight className="inline size-3 ml-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Illustration Side */}
      <div className="hidden lg:flex w-1/2 bg-[#F7F7F5] border-l border-neutral-200 flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="relative z-10 w-full max-w-md bg-white border border-neutral-200 shadow-none rounded p-6 overflow-hidden">
          <div className="flex items-center gap-2 mb-6 border-b border-neutral-100 pb-4">
            <div className="flex gap-1.5">
              <div className="size-3 rounded-full bg-neutral-200"></div>
              <div className="size-3 rounded-full bg-neutral-200"></div>
              <div className="size-3 rounded-full bg-neutral-200"></div>
            </div>
            <div className="ml-4 text-xs font-mono text-neutral-400 flex items-center gap-1">
              <Code2 className="size-3" /> authenticate.py
            </div>
          </div>
          <pre className="font-mono text-sm leading-relaxed text-neutral-800">
            <code>
              <span className="text-neutral-500">import</span> piplearn<br /><br />
              <span className="text-neutral-500">def</span> <span className="text-neutral-900 font-semibold">login</span>(user_id):<br />
              {"  "}workspace = piplearn.Workspace(user_id)<br />
              {"  "}workspace.load_progress()<br />
              {"  "}<span className="text-neutral-500">return</span> workspace.ready()<br /><br />
              <span className="text-neutral-400 italic"># Welcome back.</span><br />
              session = login(<span className="text-neutral-600">"ada.lovelace"</span>)<br />
              <span className="text-neutral-500">print</span>(<span className="text-neutral-600">"Workspace loaded."</span>)
            </code>
          </pre>
        </div>
      </div>

    </div>
  );
}
