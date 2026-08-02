"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  Shield,
  Moon,
  Sun,
  Monitor,
  Palette,
  CheckCircle2,
  SlidersHorizontal,
  User,
  KeyRound,
  Download,
  AlertTriangle,
  Lock,
  Smartphone
} from "lucide-react";

export default function SettingsPage() {
  const [theme, setTheme] = useState<"light">("light");
  const [savedPreferenceNotice, setSavedPreferenceNotice] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordNotice, setPasswordNotice] = useState("");

  const handleSavePreferences = () => {
    setSavedPreferenceNotice("Preferences saved successfully!");
    setTimeout(() => setSavedPreferenceNotice(""), 3000);
  };

  const handleUpdatePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordNotice("Error: Please fill in all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordNotice("Error: New passwords do not match.");
      return;
    }
    setPasswordNotice("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordNotice(""), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto w-full pb-16 px-6 text-[#37352F] select-none">
      {/* Page Header */}
      <div className="pt-6 pb-4 border-b border-[rgba(55,53,47,0.09)] mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-1">
          Settings
        </h1>
        <p className="text-sm text-gray-500">
          Manage your account preferences and application settings.
        </p>
      </div>

      {/* Tabs Navigation */}
      <Tabs defaultValue="appearance" className="flex flex-col md:flex-row gap-8">
        <TabsList className="flex flex-col h-auto bg-transparent items-start w-full md:w-56 space-y-1 p-0 border-r-0 md:border-r border-gray-100 pr-0 md:pr-6 shrink-0">
          <TabsTrigger
            value="appearance"
            className="w-full justify-start px-3 py-2.5 data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 text-gray-600 data-[state=active]:font-semibold rounded-lg text-sm transition-colors hover:bg-gray-50 cursor-pointer flex items-center gap-2.5"
          >
            <Palette className="size-4 text-gray-500 stroke-[1.5]" />
            <span>Appearance</span>
          </TabsTrigger>

          <TabsTrigger
            value="account"
            className="w-full justify-start px-3 py-2.5 data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 text-gray-600 data-[state=active]:font-semibold rounded-lg text-sm transition-colors hover:bg-gray-50 cursor-pointer flex items-center gap-2.5"
          >
            <SlidersHorizontal className="size-4 text-gray-500 stroke-[1.5]" />
            <span>Preferences</span>
          </TabsTrigger>

          <TabsTrigger
            value="notifications"
            className="w-full justify-start px-3 py-2.5 data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 text-gray-600 data-[state=active]:font-semibold rounded-lg text-sm transition-colors hover:bg-gray-50 cursor-pointer flex items-center gap-2.5"
          >
            <Bell className="size-4 text-gray-500 stroke-[1.5]" />
            <span>Notifications</span>
          </TabsTrigger>

          <TabsTrigger
            value="security"
            className="w-full justify-start px-3 py-2.5 data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 text-gray-600 data-[state=active]:font-semibold rounded-lg text-sm transition-colors hover:bg-gray-50 cursor-pointer flex items-center gap-2.5"
          >
            <Shield className="size-4 text-gray-500 stroke-[1.5]" />
            <span>Security</span>
          </TabsTrigger>
        </TabsList>

        <div className="flex-1">
          {/* 1. Appearance */}
          <TabsContent value="appearance" className="m-0 space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-gray-900 mb-1">Theme</h2>
              <p className="text-sm text-gray-500 mb-6">Customize the appearance of the application.</p>

              {/* Theme Selection Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg">
                {/* Light Theme Card - Active */}
                <div
                  className="flex flex-col items-center justify-center h-32 p-4 rounded-xl border-2 border-black bg-gray-50/70 shadow-2xs relative select-none cursor-pointer"
                >
                  <Sun className="size-6 text-gray-900 stroke-[1.5] mb-2" />
                  <span className="text-sm font-bold text-gray-900">Light</span>
                </div>

                {/* Dark Theme Card - Disabled with Coming Soon Badge */}
                <div
                  className="flex flex-col items-center justify-center h-32 p-4 rounded-xl border border-gray-200 bg-white opacity-60 relative select-none cursor-not-allowed group"
                >
                  <div className="absolute top-2 right-2">
                    <span className="notion-tag notion-tag-purple text-[10px] font-semibold py-0.5 px-1.5 rounded">
                      Coming Soon
                    </span>
                  </div>
                  <Moon className="size-6 text-gray-400 stroke-[1.5] mb-2" />
                  <span className="text-sm font-medium text-gray-500">Dark</span>
                </div>

                {/* System Theme Card - Disabled with Coming Soon Badge */}
                <div
                  className="flex flex-col items-center justify-center h-32 p-4 rounded-xl border border-gray-200 bg-white opacity-60 relative select-none cursor-not-allowed group"
                >
                  <div className="absolute top-2 right-2">
                    <span className="notion-tag notion-tag-purple text-[10px] font-semibold py-0.5 px-1.5 rounded">
                      Coming Soon
                    </span>
                  </div>
                  <Monitor className="size-6 text-gray-400 stroke-[1.5] mb-2" />
                  <span className="text-sm font-medium text-gray-500">System</span>
                </div>
              </div>
            </div>

            {/* Additional Appearance Settings */}
            <div className="pt-6 border-t border-gray-100 space-y-4">
              <h3 className="text-sm font-bold text-gray-900">Code Editor Theme</h3>
              <div className="grid sm:grid-cols-2 gap-3 max-w-lg">
                <label className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-[#F7F7F5] cursor-pointer">
                  <span className="text-xs font-semibold text-gray-900">Notion Minimal (Default)</span>
                  <input type="radio" name="editorTheme" defaultChecked className="accent-black" />
                </label>
                <label className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-white cursor-pointer opacity-60">
                  <span className="text-xs font-semibold text-gray-500">Monokai Light (Coming Soon)</span>
                  <input type="radio" name="editorTheme" disabled className="accent-black" />
                </label>
              </div>
            </div>
          </TabsContent>

          {/* 2. Workspace Preferences */}
          <TabsContent value="account" className="m-0 space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-gray-900 mb-1">Workspace Preferences</h2>
              <p className="text-sm text-gray-500 mb-6">Configure Python runtime environment and AI defaults.</p>

              <div className="space-y-4 max-w-md">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">Python Interpreter Version</Label>
                  <select className="w-full h-10 px-3 bg-[#F7F7F5] border border-gray-200 rounded-lg text-xs font-medium text-gray-900 outline-none focus:border-black cursor-pointer">
                    <option value="3.12">Python 3.12 (Recommended & Stable)</option>
                    <option value="3.11">Python 3.11</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">Pip AI Assistance Level</Label>
                  <select className="w-full h-10 px-3 bg-[#F7F7F5] border border-gray-200 rounded-lg text-xs font-medium text-gray-900 outline-none focus:border-black cursor-pointer">
                    <option value="tutor">Interactive Tutor Mode (Guided Hints)</option>
                    <option value="direct">Direct Solution Mode</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Export & Data Management */}
            <div className="pt-6 border-t border-gray-100 space-y-4">
              <h3 className="text-sm font-bold text-gray-900">Data Management</h3>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-gray-200 bg-[#F7F7F5]">
                <div>
                  <div className="text-xs font-bold text-gray-900">Export Learning History</div>
                  <div className="text-xs text-gray-500 mt-0.5">Download your solved problems and notes in JSON/Markdown.</div>
                </div>
                <Button variant="outline" size="sm" className="h-8 px-3 text-xs font-semibold rounded-lg bg-white border-gray-200 hover:bg-gray-50 flex items-center gap-1.5">
                  <Download className="size-3.5 stroke-[1.5]" />
                  <span>Export JSON</span>
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* 3. Notifications */}
          <TabsContent value="notifications" className="m-0 space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-gray-900 mb-1">Email Notifications</h2>
              <p className="text-sm text-gray-500 mb-6">Choose what updates and reminders you receive.</p>

              <div className="space-y-4 max-w-lg">
                <label className="flex items-start gap-3.5 p-3.5 rounded-xl border border-gray-200 bg-white cursor-pointer hover:bg-gray-50 transition-colors">
                  <input type="checkbox" className="mt-0.5 size-4 rounded border-gray-300 text-black focus:ring-black accent-black" defaultChecked />
                  <div>
                    <div className="text-sm font-bold text-gray-900">Daily Streak Reminders</div>
                    <div className="text-xs text-gray-500 mt-0.5">Receive a gentle reminder to complete your daily Python lesson.</div>
                  </div>
                </label>

                <label className="flex items-start gap-3.5 p-3.5 rounded-xl border border-gray-200 bg-white cursor-pointer hover:bg-gray-50 transition-colors">
                  <input type="checkbox" className="mt-0.5 size-4 rounded border-gray-300 text-black focus:ring-black accent-black" defaultChecked />
                  <div>
                    <div className="text-sm font-bold text-gray-900">Course & Module Updates</div>
                    <div className="text-xs text-gray-500 mt-0.5">Get notified when new interactive Python courses are added.</div>
                  </div>
                </label>

                <label className="flex items-start gap-3.5 p-3.5 rounded-xl border border-gray-200 bg-white cursor-pointer hover:bg-gray-50 transition-colors">
                  <input type="checkbox" className="mt-0.5 size-4 rounded border-gray-300 text-black focus:ring-black accent-black" />
                  <div>
                    <div className="text-sm font-bold text-gray-900">Community Mentions & Replies</div>
                    <div className="text-xs text-gray-500 mt-0.5">Receive notifications when someone replies to your post or comment.</div>
                  </div>
                </label>
              </div>
            </div>

            {savedPreferenceNotice && (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 p-3 rounded-lg max-w-sm">
                <CheckCircle2 className="size-4 stroke-[1.5]" /> {savedPreferenceNotice}
              </div>
            )}

            <div className="pt-2">
              <Button onClick={handleSavePreferences} className="h-9 px-5 font-semibold bg-black text-white hover:bg-gray-800 text-xs rounded-lg transition-colors shadow-xs">
                Save Preferences
              </Button>
            </div>
          </TabsContent>

          {/* 4. Security */}
          <TabsContent value="security" className="m-0 space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-gray-900 mb-1">Security & Passkey</h2>
              <p className="text-sm text-gray-500 mb-6">Update your credentials and active security sessions.</p>

              <div className="space-y-4 max-w-md">
                <div className="space-y-1.5">
                  <Label htmlFor="current" className="text-xs font-semibold text-gray-700">Current Password</Label>
                  <Input
                    id="current"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="h-10 bg-[#F7F7F5] border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 text-gray-900 rounded-lg text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="new" className="text-xs font-semibold text-gray-700">New Password</Label>
                  <Input
                    id="new"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="h-10 bg-[#F7F7F5] border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 text-gray-900 rounded-lg text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="confirm" className="text-xs font-semibold text-gray-700">Confirm New Password</Label>
                  <Input
                    id="confirm"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-10 bg-[#F7F7F5] border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 text-gray-900 rounded-lg text-xs"
                  />
                </div>

                {passwordNotice && (
                  <div className={`text-xs font-semibold p-3 rounded-lg border ${
                    passwordNotice.startsWith("Error")
                      ? "bg-rose-50 border-rose-200 text-rose-700"
                      : "bg-emerald-50 border-emerald-200 text-emerald-700"
                  }`}>
                    {passwordNotice}
                  </div>
                )}

                <div className="pt-2">
                  <Button onClick={handleUpdatePassword} className="h-9 px-5 font-semibold bg-black text-white hover:bg-gray-800 text-xs w-full sm:w-auto rounded-lg transition-colors shadow-xs">
                    Update Password
                  </Button>
                </div>
              </div>
            </div>

            {/* Passkey Integration Badge */}
            <div className="pt-6 border-t border-gray-100 space-y-4">
              <h3 className="text-sm font-bold text-gray-900">Passkeys & Hardware Keys</h3>
              <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                    <KeyRound className="size-4 text-gray-700 stroke-[1.5]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">FIDO2 Touch ID / Security Key</div>
                    <div className="text-xs text-gray-500">Sign in instantly without passwords.</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="h-8 px-3 text-xs font-semibold rounded-lg border-gray-200 hover:bg-gray-50">
                  Register Key
                </Button>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
