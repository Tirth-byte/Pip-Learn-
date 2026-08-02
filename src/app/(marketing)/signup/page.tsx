import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowRight, Code2, CheckCircle2 } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="flex-1 flex min-h-[calc(100vh-3.5rem)] bg-white animate-in fade-in duration-500">
      
      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-16 lg:px-24 xl:px-32 relative">
        <div className="w-full max-w-sm mx-auto space-y-8">
          <div className="space-y-2 text-left">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Create an account</h1>
            <p className="text-neutral-500 text-sm">Join PipLearn to start mastering Python today.</p>
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
              <Label htmlFor="name" className="text-neutral-700 font-medium text-xs uppercase tracking-wider">Full Name</Label>
              <Input id="name" placeholder="Ada Lovelace" required className="h-11 shadow-none rounded border-neutral-200 focus-visible:ring-1 focus-visible:ring-neutral-300 focus-visible:border-neutral-300 bg-[#F7F7F5] hover:bg-white transition-colors text-neutral-900" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-neutral-700 font-medium text-xs uppercase tracking-wider">Email address</Label>
              <Input id="email" type="email" placeholder="ada.lovelace@example.com" required className="h-11 shadow-none rounded border-neutral-200 focus-visible:ring-1 focus-visible:ring-neutral-300 focus-visible:border-neutral-300 bg-[#F7F7F5] hover:bg-white transition-colors text-neutral-900" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-neutral-700 font-medium text-xs uppercase tracking-wider">Password</Label>
              <Input id="password" type="password" required placeholder="••••••••" className="h-11 shadow-none rounded border-neutral-200 focus-visible:ring-1 focus-visible:ring-neutral-300 focus-visible:border-neutral-300 bg-[#F7F7F5] hover:bg-white transition-colors text-neutral-900" />
              <div className="flex gap-1 mt-2">
                <div className="h-1 w-full bg-neutral-900 rounded"></div>
                <div className="h-1 w-full bg-neutral-900 rounded"></div>
                <div className="h-1 w-full bg-neutral-200 rounded"></div>
                <div className="h-1 w-full bg-neutral-200 rounded"></div>
              </div>
              <p className="text-[10px] text-neutral-500 mt-1 uppercase tracking-wider font-semibold">Good password</p>
            </div>
            <Button type="button" className="w-full h-11 shadow-none rounded text-sm bg-black hover:bg-neutral-800 text-white transition-colors" asChild>
              <Link href="/onboarding">Create account</Link>
            </Button>
          </form>

          <div className="text-center text-sm text-neutral-500 pt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-neutral-900 hover:underline font-medium transition-colors">
              Log in <ArrowRight className="inline size-3 ml-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Illustration Side */}
      <div className="hidden lg:flex w-1/2 bg-[#F7F7F5] border-l border-neutral-200 flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="relative z-10 w-full max-w-md space-y-6">
          <div className="bg-white border border-neutral-200 shadow-none rounded p-6">
            <h3 className="font-semibold text-lg text-neutral-900 flex items-center gap-2 mb-4">
              <CheckCircle2 className="size-5 text-neutral-900" /> Start learning
            </h3>
            <ul className="space-y-4 text-sm text-neutral-600">
              <li className="flex items-start gap-3">
                <div className="size-6 rounded bg-[#F7F7F5] border border-neutral-200 flex items-center justify-center text-neutral-900 text-xs font-bold shrink-0">1</div>
                <div>
                  <span className="font-semibold text-neutral-900 block">Interactive curriculum</span>
                  Learn Python step-by-step through bite-sized, practical lessons.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="size-6 rounded bg-[#F7F7F5] border border-neutral-200 flex items-center justify-center text-neutral-900 text-xs font-bold shrink-0">2</div>
                <div>
                  <span className="font-semibold text-neutral-900 block">Built-in sandbox</span>
                  Practice coding directly in your browser with zero setup.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="size-6 rounded bg-[#F7F7F5] border border-neutral-200 flex items-center justify-center text-neutral-900 text-xs font-bold shrink-0">3</div>
                <div>
                  <span className="font-semibold text-neutral-900 block">Real-world projects</span>
                  Build an impressive portfolio of developer tools and scripts.
                </div>
              </li>
            </ul>
          </div>
          
          {/* Decorative floating element */}
          <div className="absolute -left-8 -bottom-8 bg-white border border-neutral-200 shadow-none rounded p-4 flex items-center gap-4 animate-in slide-in-from-left-8 duration-1000">
            <div className="size-10 rounded bg-[#F7F7F5] border border-neutral-200 flex items-center justify-center">
              <Code2 className="size-5 text-neutral-900" />
            </div>
            <div>
              <p className="text-sm font-bold text-neutral-900">Developer ready</p>
              <p className="text-xs text-neutral-500">Zero distractions.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
