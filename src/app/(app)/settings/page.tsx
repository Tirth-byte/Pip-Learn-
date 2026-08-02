"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Shield, Moon, Sun, Monitor, Palette, CheckCircle2 } from "lucide-react";

export default function SettingsPage() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  const [savedPreferenceNotice, setSavedPreferenceNotice] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordNotice, setPasswordNotice] = useState("");

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

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
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto pb-10">
      <div className="border-b border-neutral-100 pb-4 mt-4">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 mb-1">Settings</h1>
        <p className="text-neutral-500 text-sm">Manage your account preferences and application settings.</p>
      </div>

      <Tabs defaultValue="appearance" className="flex flex-col md:flex-row gap-10">
        <TabsList className="flex flex-col h-auto bg-transparent items-start w-full md:w-56 space-y-0.5 p-0 border-r border-transparent md:border-neutral-100 pr-6">
          <TabsTrigger
            value="appearance"
            className="w-full justify-start px-3 py-2 data-[state=active]:bg-neutral-100 data-[state=active]:text-neutral-900 text-neutral-600 data-[state=active]:shadow-none rounded text-sm font-medium transition-colors hover:bg-neutral-50 cursor-pointer"
          >
            <Palette className="mr-2 size-4" /> Appearance
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="w-full justify-start px-3 py-2 data-[state=active]:bg-neutral-100 data-[state=active]:text-neutral-900 text-neutral-600 data-[state=active]:shadow-none rounded text-sm font-medium transition-colors hover:bg-neutral-50 cursor-pointer"
          >
            <Bell className="mr-2 size-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="w-full justify-start px-3 py-2 data-[state=active]:bg-neutral-100 data-[state=active]:text-neutral-900 text-neutral-600 data-[state=active]:shadow-none rounded text-sm font-medium transition-colors hover:bg-neutral-50 cursor-pointer"
          >
            <Shield className="mr-2 size-4" /> Security
          </TabsTrigger>
        </TabsList>

        <div className="flex-1">
          {/* Appearance */}
          <TabsContent value="appearance" className="m-0 space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-neutral-900 mb-1">Theme</h2>
              <p className="text-sm text-neutral-500 mb-5">Customize the appearance of the application.</p>
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => handleThemeChange("light")}
                  className={`flex flex-col items-center justify-center w-28 h-24 gap-3 border rounded bg-[#F7F7F5] shadow-none focus:outline-none cursor-pointer transition-all ${
                    theme === "light" ? "border-neutral-900 ring-1 ring-neutral-900" : "border-neutral-200 hover:bg-neutral-100"
                  }`}
                >
                  <Sun className="size-5 text-neutral-900" />
                  <span className="text-sm font-medium text-neutral-900">Light</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleThemeChange("dark")}
                  className={`flex flex-col items-center justify-center w-28 h-24 gap-3 border rounded bg-white shadow-none focus:outline-none cursor-pointer transition-all ${
                    theme === "dark" ? "border-neutral-900 ring-1 ring-neutral-900" : "border-neutral-200 hover:bg-neutral-50"
                  }`}
                >
                  <Moon className="size-5 text-neutral-700" />
                  <span className="text-sm font-medium text-neutral-700">Dark</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleThemeChange("system")}
                  className={`flex flex-col items-center justify-center w-28 h-24 gap-3 border rounded bg-white shadow-none focus:outline-none cursor-pointer transition-all ${
                    theme === "system" ? "border-neutral-900 ring-1 ring-neutral-900" : "border-neutral-200 hover:bg-neutral-50"
                  }`}
                >
                  <Monitor className="size-5 text-neutral-700" />
                  <span className="text-sm font-medium text-neutral-700">System</span>
                </button>
              </div>
            </div>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="m-0 space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-neutral-900 mb-1">Email Notifications</h2>
              <p className="text-sm text-neutral-500 mb-5">Choose what updates you want to receive.</p>
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="flex h-5 items-center">
                    <input type="checkbox" className="size-4 rounded border-neutral-300 text-neutral-900 focus:ring-1 focus:ring-neutral-300" defaultChecked />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-neutral-900 transition-colors">Course Updates</div>
                    <div className="text-sm text-neutral-500">Get notified when new lessons are added.</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="flex h-5 items-center">
                    <input type="checkbox" className="size-4 rounded border-neutral-300 text-neutral-900 focus:ring-1 focus:ring-neutral-300" defaultChecked />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-neutral-900 transition-colors">Community Mentions</div>
                    <div className="text-sm text-neutral-500">Receive an email when someone replies to you.</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="flex h-5 items-center">
                    <input type="checkbox" className="size-4 rounded border-neutral-300 text-neutral-900 focus:ring-1 focus:ring-neutral-300" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-neutral-900 transition-colors">Marketing Emails</div>
                    <div className="text-sm text-neutral-500">Receive tips, offers, and platform news.</div>
                  </div>
                </label>
              </div>
            </div>

            {savedPreferenceNotice && (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 p-2.5 rounded max-w-sm">
                <CheckCircle2 className="size-4" /> {savedPreferenceNotice}
              </div>
            )}

            <div className="pt-2">
              <Button onClick={handleSavePreferences} className="h-8 px-4 font-medium shadow-none bg-black text-white hover:bg-neutral-800 text-xs rounded transition-colors">
                Save Preferences
              </Button>
            </div>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security" className="m-0 space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-neutral-900 mb-1">Change Password</h2>
              <p className="text-sm text-neutral-500 mb-5">Update your password to keep your account secure.</p>

              <div className="space-y-4 max-w-sm">
                <div className="space-y-1.5">
                  <Label htmlFor="current" className="text-sm font-medium text-neutral-700">Current Password</Label>
                  <Input
                    id="current"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="h-9 bg-[#F7F7F5] border-neutral-200 focus-visible:ring-1 focus-visible:ring-neutral-300 focus-visible:border-neutral-300 shadow-none rounded transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="new" className="text-sm font-medium text-neutral-700">New Password</Label>
                  <Input
                    id="new"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="h-9 bg-[#F7F7F5] border-neutral-200 focus-visible:ring-1 focus-visible:ring-neutral-300 focus-visible:border-neutral-300 shadow-none rounded transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="confirm" className="text-sm font-medium text-neutral-700">Confirm New Password</Label>
                  <Input
                    id="confirm"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-9 bg-[#F7F7F5] border-neutral-200 focus-visible:ring-1 focus-visible:ring-neutral-300 focus-visible:border-neutral-300 shadow-none rounded transition-colors"
                  />
                </div>

                {passwordNotice && (
                  <div className={`text-xs font-semibold p-2.5 rounded border ${
                    passwordNotice.startsWith("Error")
                      ? "bg-rose-50 border-rose-200 text-rose-700"
                      : "bg-emerald-50 border-emerald-200 text-emerald-700"
                  }`}>
                    {passwordNotice}
                  </div>
                )}

                <div className="pt-2">
                  <Button onClick={handleUpdatePassword} className="h-8 px-4 font-medium shadow-none bg-black text-white hover:bg-neutral-800 text-xs w-full sm:w-auto rounded transition-colors">
                    Update Password
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
