"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NotionAvatar } from "@/components/ui/notion-avatar";
import { Code2, Globe, CheckCircle2 } from "lucide-react";

export default function ProfilePage() {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [bio, setBio] = useState("Passionate learner building projects in Python and Next.js");
  const [website, setWebsite] = useState("https://johndoe.dev");
  const [github, setGithub] = useState("github.com/johndoe");
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState<number>(0);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const fullName = `${firstName} ${lastName}`.trim() || "John Doe";

  const stickerNames = [
    "Girl (Blue Ring)",
    "Minimalist L-Nose",
    "Red Signpost",
    "Pencil Boy (Gold)",
    "Minimalist Eyes",
    "Blue Folder",
    "Glasses Man (Red)",
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-3xl mx-auto pb-10 select-none">
      {/* Page Header */}
      <div className="border-b border-neutral-100 pb-4 mt-4">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 mb-1">Profile</h1>
        <p className="text-neutral-500 text-sm">Manage your public profile, Notion sticker avatar, and personal information.</p>
      </div>

      {/* Main Avatar & User Summary Card */}
      <Card className="shadow-none border-neutral-200 rounded-2xl overflow-hidden bg-white">
        <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <NotionAvatar seed={fullName} avatarIndex={selectedAvatarIndex} size="2xl" />
          <div className="space-y-3 flex-1 mt-1">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-neutral-900 tracking-tight">{fullName}</h2>
                <span className="notion-tag notion-tag-blue font-mono text-[10px]">Sticker #{selectedAvatarIndex + 1}</span>
              </div>
              <p className="text-neutral-500 text-sm mt-1 leading-relaxed max-w-md">{bio}</p>
            </div>
            
            {/* Notion Avatar Picker Grid - Refined Spacing & Ring Offset */}
            <div className="pt-2">
              <label className="text-xs font-semibold text-gray-500 block mb-2.5">
                Choose Notion Avatar Sticker:
              </label>
              <div className="flex items-center gap-3.5 overflow-x-auto p-1.5 -ml-1">
                {[0, 1, 2, 3, 4, 5, 6].map((idx) => {
                  const isSelected = selectedAvatarIndex === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedAvatarIndex(idx)}
                      title={stickerNames[idx]}
                      className={`relative rounded-full transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "ring-2 ring-black ring-offset-2 scale-110 shadow-xs"
                          : "opacity-75 hover:opacity-100 hover:scale-105"
                      }`}
                    >
                      <NotionAvatar seed={fullName} avatarIndex={idx} size="sm" hasShadow={false} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Details */}
      <div className="grid gap-6">
        <Card className="shadow-none border-neutral-200 rounded-2xl overflow-hidden bg-white">
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
                  className="h-9 shadow-none border-neutral-200 focus-visible:ring-1 focus-visible:ring-neutral-300 focus-visible:border-neutral-300 text-neutral-900 bg-[#F7F7F5] rounded-lg transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lastName" className="text-sm font-medium text-neutral-700">Last Name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="h-9 shadow-none border-neutral-200 focus-visible:ring-1 focus-visible:ring-neutral-300 focus-visible:border-neutral-300 text-neutral-900 bg-[#F7F7F5] rounded-lg transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium text-neutral-700">Email</Label>
              <Input id="email" type="email" defaultValue="john@example.com" disabled className="h-9 shadow-none border-neutral-200 bg-neutral-100 text-neutral-500 cursor-not-allowed rounded-lg" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="bio" className="text-sm font-medium text-neutral-700">Bio</Label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="flex w-full rounded-lg border border-neutral-200 bg-[#F7F7F5] transition-colors px-3 py-2 text-sm shadow-none placeholder:text-neutral-400 focus-visible:outline-none focus-visible:border-neutral-300 focus-visible:ring-1 focus-visible:ring-neutral-300 min-h-[100px] resize-none text-neutral-900 leading-relaxed"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none border-neutral-200 rounded-2xl overflow-hidden bg-white">
          <CardHeader className="bg-white border-b border-neutral-100 px-6 py-4">
            <CardTitle className="text-sm font-semibold text-neutral-900">Social Links</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="website" className="text-sm font-medium text-neutral-700">Website</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-2.5 size-4 text-neutral-400 stroke-[1.5]" />
                <Input
                  id="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="h-9 pl-9 shadow-none border-neutral-200 focus-visible:ring-1 focus-visible:ring-neutral-300 text-neutral-900 bg-[#F7F7F5] rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="github" className="text-sm font-medium text-neutral-700">GitHub</Label>
              <div className="relative">
                <Code2 className="absolute left-3 top-2.5 size-4 text-neutral-400 stroke-[1.5]" />
                <Input
                  id="github"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  className="h-9 pl-9 shadow-none border-neutral-200 focus-visible:ring-1 focus-visible:ring-neutral-300 text-neutral-900 bg-[#F7F7F5] rounded-lg"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end items-center gap-3 pt-2">
          {savedNotice && (
            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <CheckCircle2 className="size-3.5 stroke-[1.5]" /> Profile saved successfully
            </span>
          )}
          <Button onClick={handleSave} className="bg-black hover:bg-neutral-800 text-white shadow-none h-9 px-4 rounded-lg text-xs font-semibold">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
