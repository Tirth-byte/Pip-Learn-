"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NotionAvatar } from "@/components/ui/notion-avatar";
import { Code2, Globe, CheckCircle2, GraduationCap, Building2, Plus, ArrowUpRight, X } from "lucide-react";
import { useAppContext } from "@/context/app-context";
import { getInstitutionById, Institution } from "@/lib/institutions";
import { InstitutionBadge } from "@/components/institutions/institution-badge";
import { InstitutionDialog } from "@/components/institutions/institution-dialog";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user, updateProfile, setInstitution } = useAppContext();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [bio, setBio] = useState(user.bio);
  const [website, setWebsite] = useState(user.website);
  const [github, setGithub] = useState(user.github);
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState<number>(user.avatarIndex);
  const [savedNotice, setSavedNotice] = useState(false);
  const [isInstitutionDialogOpen, setIsInstitutionDialogOpen] = useState(false);

  const currentInstitution = getInstitutionById(user.institutionId);

  const handleAvatarChange = (idx: number) => {
    setSelectedAvatarIndex(idx);
    updateProfile({ avatarIndex: idx });
  };

  const handleSave = () => {
    updateProfile({
      firstName,
      lastName,
      bio,
      website,
      github,
      avatarIndex: selectedAvatarIndex,
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleRemoveInstitution = () => {
    setInstitution(null);
    toast.success("Institution removed from profile");
  };

  const fullName = `${firstName} ${lastName}`.trim() || "Tirth Patel";

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
      <div className="border-b border-neutral-100 dark:border-neutral-800 pb-4 mt-4">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mb-1">Profile</h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm">Manage your public profile, institution affiliation, Notion sticker avatar, and personal information.</p>
      </div>

      {/* Main Avatar & User Summary Card */}
      <Card className="shadow-none border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden bg-white dark:bg-[#202020]">
        <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <NotionAvatar seed={fullName} avatarIndex={selectedAvatarIndex} size="2xl" />
          <div className="space-y-3 flex-1 mt-1">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">{fullName}</h2>
                <span className="notion-tag notion-tag-blue font-mono text-[10px]">Sticker #{selectedAvatarIndex + 1}</span>
                {currentInstitution && (
                  <InstitutionBadge institution={currentInstitution} size="sm" onClick={() => setIsInstitutionDialogOpen(true)} />
                )}
              </div>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1 leading-relaxed max-w-md">{bio}</p>
            </div>
            
            {/* Notion Avatar Picker Grid */}
            <div className="pt-2">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-2.5">
                Choose Notion Avatar Sticker:
              </label>
              <div className="flex items-center gap-3.5 overflow-x-auto p-1.5 -ml-1">
                {[0, 1, 2, 3, 4, 5, 6].map((idx) => {
                  const isSelected = selectedAvatarIndex === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAvatarChange(idx)}
                      title={stickerNames[idx]}
                      className={`relative rounded-full transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "ring-2 ring-black dark:ring-white ring-offset-2 scale-110 shadow-xs"
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
        {/* Institution Affiliation Section */}
        <Card className="shadow-none border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden bg-white dark:bg-[#202020]">
          <CardHeader className="bg-white dark:bg-[#202020] border-b border-neutral-100 dark:border-neutral-800 px-6 py-4 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="size-4 text-[#0066FF] stroke-[2]" />
              <CardTitle className="text-sm font-semibold text-neutral-900 dark:text-white">Institution &amp; Campus</CardTitle>
            </div>
            {currentInstitution && (
              <button
                type="button"
                onClick={() => setIsInstitutionDialogOpen(true)}
                className="text-xs font-semibold text-[#0066FF] hover:underline cursor-pointer"
              >
                Change
              </button>
            )}
          </CardHeader>
          <CardContent className="p-6">
            {currentInstitution ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-[#252525]">
                <InstitutionBadge institution={currentInstitution} size="lg" className="border-0 bg-transparent shadow-none p-0" />
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsInstitutionDialogOpen(true)}
                    className="h-8 px-3 text-xs font-semibold rounded-lg bg-white dark:bg-[#1E1E1E] border-gray-200 dark:border-gray-700 hover:bg-gray-50"
                  >
                    Change Institution
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveInstitution}
                    className="h-8 px-2.5 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg"
                    title="Remove affiliation"
                  >
                    <X className="size-3.5" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-dashed border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-[#252525]/50">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-gray-900 dark:text-white">No Institution Affiliation</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Add your university or school to compare scores and connect with classmates.
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => setIsInstitutionDialogOpen(true)}
                  className="h-8 px-3.5 text-xs font-semibold rounded-lg bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 flex items-center gap-1.5 cursor-pointer shadow-2xs shrink-0"
                >
                  <Plus className="size-3.5 stroke-[2]" />
                  <span>Add Institution</span>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="shadow-none border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden bg-white dark:bg-[#202020]">
          <CardHeader className="bg-white dark:bg-[#202020] border-b border-neutral-100 dark:border-neutral-800 px-6 py-4">
            <CardTitle className="text-sm font-semibold text-neutral-900 dark:text-white">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <Label htmlFor="firstName" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">First Name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="h-9 shadow-none border-neutral-200 dark:border-neutral-700 focus-visible:ring-1 focus-visible:ring-neutral-300 text-neutral-900 dark:text-white bg-[#F7F7F5] dark:bg-[#252525] rounded-lg transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lastName" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Last Name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="h-9 shadow-none border-neutral-200 dark:border-neutral-700 focus-visible:ring-1 focus-visible:ring-neutral-300 text-neutral-900 dark:text-white bg-[#F7F7F5] dark:bg-[#252525] rounded-lg transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Email</Label>
              <Input id="email" type="email" value={user.email} disabled className="h-9 shadow-none border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 cursor-not-allowed rounded-lg" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="bio" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Bio</Label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="flex w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-[#F7F7F5] dark:bg-[#252525] transition-colors px-3 py-2 text-sm shadow-none placeholder:text-neutral-400 focus-visible:outline-none focus-visible:border-neutral-300 focus-visible:ring-1 focus-visible:ring-neutral-300 min-h-[100px] resize-none text-neutral-900 dark:text-white leading-relaxed"
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card className="shadow-none border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden bg-white dark:bg-[#202020]">
          <CardHeader className="bg-white dark:bg-[#202020] border-b border-neutral-100 dark:border-neutral-800 px-6 py-4">
            <CardTitle className="text-sm font-semibold text-neutral-900 dark:text-white">Social Links</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="website" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Website</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-2.5 size-4 text-neutral-400 stroke-[1.5]" />
                <Input
                  id="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="h-9 pl-9 shadow-none border-neutral-200 dark:border-neutral-700 focus-visible:ring-1 focus-visible:ring-neutral-300 text-neutral-900 dark:text-white bg-[#F7F7F5] dark:bg-[#252525] rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="github" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">GitHub</Label>
              <div className="relative">
                <Code2 className="absolute left-3 top-2.5 size-4 text-neutral-400 stroke-[1.5]" />
                <Input
                  id="github"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  className="h-9 pl-9 shadow-none border-neutral-200 dark:border-neutral-700 focus-visible:ring-1 focus-visible:ring-neutral-300 text-neutral-900 dark:text-white bg-[#F7F7F5] dark:bg-[#252525] rounded-lg"
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
          <Button onClick={handleSave} className="bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-none h-9 px-4 rounded-lg text-xs font-semibold cursor-pointer">
            Save Changes
          </Button>
        </div>
      </div>

      {/* Institution Selector Modal */}
      <InstitutionDialog
        open={isInstitutionDialogOpen}
        onOpenChange={setIsInstitutionDialogOpen}
      />
    </div>
  );
}
