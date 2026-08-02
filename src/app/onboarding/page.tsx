import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F5]">
      <div className="h-14 border-b border-neutral-200 bg-white flex items-center px-6">
        <div className="flex items-center gap-2">
          <Logo />
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="w-full max-w-lg space-y-8 bg-white p-10 border border-neutral-200 rounded shadow-none">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">What is your primary goal?</h1>
            <p className="text-neutral-500 text-sm">We'll tailor your experience based on your selection.</p>
          </div>
          
          <div className="grid gap-4">
            <label className="group flex items-start gap-4 p-4 border border-neutral-200 rounded cursor-pointer hover:border-neutral-900 transition-all has-[:checked]:border-neutral-900 has-[:checked]:bg-[#F7F7F5]">
              <input type="radio" name="goal" className="mt-1 accent-neutral-900" defaultChecked />
              <div>
                <h3 className="font-medium text-neutral-900 group-hover:text-black transition-colors">Learn Python from scratch</h3>
                <p className="text-sm text-neutral-500 mt-1">I have little to no programming experience.</p>
              </div>
            </label>
            <label className="group flex items-start gap-4 p-4 border border-neutral-200 rounded cursor-pointer hover:border-neutral-900 transition-all has-[:checked]:border-neutral-900 has-[:checked]:bg-[#F7F7F5]">
              <input type="radio" name="goal" className="mt-1 accent-neutral-900" />
              <div>
                <h3 className="font-medium text-neutral-900 group-hover:text-black transition-colors">Prepare for interviews</h3>
                <p className="text-sm text-neutral-500 mt-1">I want to practice algorithms and data structures.</p>
              </div>
            </label>
            <label className="group flex items-start gap-4 p-4 border border-neutral-200 rounded cursor-pointer hover:border-neutral-900 transition-all has-[:checked]:border-neutral-900 has-[:checked]:bg-[#F7F7F5]">
              <input type="radio" name="goal" className="mt-1 accent-neutral-900" />
              <div>
                <h3 className="font-medium text-neutral-900 group-hover:text-black transition-colors">Build projects</h3>
                <p className="text-sm text-neutral-500 mt-1">I want to learn by building real-world applications.</p>
              </div>
            </label>
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-neutral-100">
            <Button variant="ghost" className="text-neutral-500 hover:text-neutral-900 rounded" asChild>
              <Link href="/dashboard">Skip for now</Link>
            </Button>
            <Button className="shadow-none rounded bg-black hover:bg-neutral-800 text-white" asChild>
              <Link href="/dashboard">
                Continue <Check className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
