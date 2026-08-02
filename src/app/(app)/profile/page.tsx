"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Code2, Globe, CheckCircle2 } from "lucide-react";

export default function ProfilePage() {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [bio, setBio] = useState("Passionate learner building projects in Python and Next.js");
  const [website, setWebsite] = useState("https://johndoe.dev");
  const [github, setGithub] = useState("github.com/johndoe");
  const [savedNotice, setSavedNotice] = useState(false);

  const initials = `${firstName.charAt(0) || "J"}${lastName.charAt(0) || "D"}`.toUpperCase();

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-3xl mx-auto pb-10">
      <div className="border-b border-neutral-100 pb-4 mt-4">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 mb-1">Profile</h1>
        <p className="text-neutral-500 text-sm">Manage your public profile and personal information.</p>
      </div>

      <Card className="shadow-none border-neutral-200 rounded-md overflow-hidden bg-white">
        <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Avatar className="size-20 rounded border border-neutral-200">
            <AvatarFallback className="text-xl font-medium bg-[#F7F7F5] text-neutral-900 rounded">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-3 flex-1 mt-1">
            <div>
              <h2 className="text-xl font-bold text-neutral-900 tracking-tight">{firstName} {lastName}</h2>
              <p className="text-neutral-500 text-sm mt-1 leading-relaxed max-w-md">{bio}</p>
            </div>
            <Button variant="outline" size="sm" className="h-8 px-3 border-neutral-200 hover:bg-neutral-100 shadow-none text-xs font-medium rounded text-neutral-700">
              Change Avatar
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        <Card className="shadow-none border-neutral-200 rounded-md overflow-hidden bg-white">
          <CardHeader className="bg-white border-b border-neutral-100 px-6 py-4">
            <CardTitle className="text-sm font-semibold text-neutral-900">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <Label htmlFor="firstName" className="text-sm font-medium text-neutral-700">First Name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="h-9 shadow-none border-neutral-200 focus-visible:ring-1 focus-visible:ring-neutral-300 focus-visible:border-neutral-300 text-neutral-900 bg-[#F7F7F5] rounded transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lastName" className="text-sm font-medium text-neutral-700">Last Name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="h-9 shadow-none border-neutral-200 focus-visible:ring-1 focus-visible:ring-neutral-300 focus-visible:border-neutral-300 text-neutral-900 bg-[#F7F7F5] rounded transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium text-neutral-700">Email</Label>
              <Input id="email" type="email" defaultValue="john@example.com" disabled className="h-9 shadow-none border-neutral-200 bg-neutral-100 text-neutral-500 cursor-not-allowed rounded" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="bio" className="text-sm font-medium text-neutral-700">Bio</Label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="flex w-full rounded border border-neutral-200 bg-[#F7F7F5] transition-colors px-3 py-2 text-sm shadow-none placeholder:text-neutral-400 focus-visible:outline-none focus-visible:border-neutral-300 focus-visible:ring-1 focus-visible:ring-neutral-300 min-h-[100px] resize-none text-neutral-900 leading-relaxed"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none border-neutral-200 rounded-md overflow-hidden bg-white">
          <CardHeader className="bg-white border-b border-neutral-100 px-6 py-4">
            <CardTitle className="text-sm font-semibold text-neutral-900">Social Links</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="website" className="text-sm font-medium text-neutral-700">Personal Website</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                <Input
                  id="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="h-9 shadow-none border-neutral-200 focus-visible:ring-1 focus-visible:ring-neutral-300 focus-visible:border-neutral-300 pl-9 text-neutral-900 bg-[#F7F7F5] rounded transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="github" className="text-sm font-medium text-neutral-700">GitHub</Label>
              <div className="relative">
                <Code2 className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                <Input
                  id="github"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  className="h-9 shadow-none border-neutral-200 focus-visible:ring-1 focus-visible:ring-neutral-300 focus-visible:border-neutral-300 pl-9 text-neutral-900 bg-[#F7F7F5] rounded transition-colors"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between pt-4">
        {savedNotice ? (
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded">
            <CheckCircle2 className="size-4" /> Profile updated successfully!
          </div>
        ) : <div />}

        <Button onClick={handleSave} className="h-9 px-4 bg-black hover:bg-neutral-800 text-white shadow-none text-sm font-medium rounded transition-colors">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
