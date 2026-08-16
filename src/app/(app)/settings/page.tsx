"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Bell,
  Shield,
  Moon,
  Sun,
  Monitor,
  Palette,
  CheckCircle2,
  SlidersHorizontal,
  Download,
  KeyRound,
  Check
} from "lucide-react";
import { toast } from "sonner";

type SettingsTab = "appearance" | "account" | "notifications" | "security";
type ThemeMode = "light" | "dark" | "system";
type FontSize = "small" | "medium" | "large";

const THEME_KEY = "piplearn_theme";
const FONT_SIZE_KEY = "piplearn_font_size";

function getStoredTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";
  return (localStorage.getItem(THEME_KEY) as ThemeMode) || "light";
}

function getStoredFontSize(): FontSize {
  if (typeof window === "undefined") return "medium";
  return (localStorage.getItem(FONT_SIZE_KEY) as FontSize) || "medium";
}

const fontSizeMap: Record<FontSize, string> = {
  small: "14px",
  medium: "16px",
  large: "18px",
};

function applyTheme(mode: ThemeMode) {
  const html = document.documentElement;
  if (mode === "system") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    html.classList.toggle("dark", prefersDark);
  } else {
    html.classList.toggle("dark", mode === "dark");
  }
  localStorage.setItem(THEME_KEY, mode);
}

function applyFontSize(size: FontSize) {
  document.documentElement.style.fontSize = fontSizeMap[size];
  localStorage.setItem(FONT_SIZE_KEY, size);
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("appearance");
  const [savedPreferenceNotice, setSavedPreferenceNotice] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordNotice, setPasswordNotice] = useState("");

  const [theme, setTheme] = useState<ThemeMode>("light");
  const [fontSize, setFontSize] = useState<FontSize>("medium");
  const [mounted, setMounted] = useState(false);

  // Load persisted settings on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setTheme(getStoredTheme());
      setFontSize(getStoredFontSize());
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Listen for system theme changes when in system mode
  useEffect(() => {
    if (!mounted) return;
    if (theme !== "system") return;

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("system");
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [theme, mounted]);

  const handleThemeChange = useCallback((mode: ThemeMode) => {
    setTheme(mode);
    applyTheme(mode);
    toast(`Theme set to ${mode === "system" ? "System" : mode.charAt(0).toUpperCase() + mode.slice(1)}`);
  }, []);

  const handleFontSizeChange = useCallback((size: FontSize) => {
    setFontSize(size);
    applyFontSize(size);
    toast(`Font size set to ${size}`);
  }, []);

  const handleSavePreferences = () => {
    setSavedPreferenceNotice("Preferences saved successfully!");
    toast("Notification preferences saved");
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
    toast("Password updated successfully");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordNotice(""), 3000);
  };

  const themeOptions: { key: ThemeMode; icon: typeof Sun; label: string }[] = [
    { key: "light", icon: Sun, label: "Light" },
    { key: "dark", icon: Moon, label: "Dark" },
    { key: "system", icon: Monitor, label: "System" },
  ];

  const fontSizeOptions: { key: FontSize; label: string; desc: string }[] = [
    { key: "small", label: "Small", desc: "14px — Compact" },
    { key: "medium", label: "Medium", desc: "16px — Default" },
    { key: "large", label: "Large", desc: "18px — Comfortable" },
  ];

  return (
    <div className="max-w-4xl mx-auto w-full pb-16 px-6 text-[#37352F] select-none">
      {/* Page Header */}
      <div className="pt-6 pb-4 border-b border-[rgba(55,53,47,0.09)] mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-1">
          Settings
        </h1>
        <p className="text-sm text-gray-500">
          Manage your account preferences and application settings.
        </p>
      </div>

      {/* Main Settings Layout Grid */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Left Side Tab Navigation */}
        <div className="flex flex-col w-full md:w-52 space-y-1 shrink-0 border-r-0 md:border-r border-gray-100 pr-0 md:pr-6">
          <button
            type="button"
            onClick={() => setActiveTab("appearance")}
            className={`w-full justify-start px-3 py-2.5 rounded-lg text-sm transition-colors cursor-pointer flex items-center gap-2.5 text-left ${
              activeTab === "appearance"
                ? "bg-gray-100/90 text-gray-900 font-semibold shadow-2xs"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"
            }`}
          >
            <Palette className="size-4 text-gray-500 stroke-[1.5] shrink-0" />
            <span>Appearance</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("account")}
            className={`w-full justify-start px-3 py-2.5 rounded-lg text-sm transition-colors cursor-pointer flex items-center gap-2.5 text-left ${
              activeTab === "account"
                ? "bg-gray-100/90 text-gray-900 font-semibold shadow-2xs"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"
            }`}
          >
            <SlidersHorizontal className="size-4 text-gray-500 stroke-[1.5] shrink-0" />
            <span>Preferences</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("notifications")}
            className={`w-full justify-start px-3 py-2.5 rounded-lg text-sm transition-colors cursor-pointer flex items-center gap-2.5 text-left ${
              activeTab === "notifications"
                ? "bg-gray-100/90 text-gray-900 font-semibold shadow-2xs"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"
            }`}
          >
            <Bell className="size-4 text-gray-500 stroke-[1.5] shrink-0" />
            <span>Notifications</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("security")}
            className={`w-full justify-start px-3 py-2.5 rounded-lg text-sm transition-colors cursor-pointer flex items-center gap-2.5 text-left ${
              activeTab === "security"
                ? "bg-gray-100/90 text-gray-900 font-semibold shadow-2xs"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"
            }`}
          >
            <Shield className="size-4 text-gray-500 stroke-[1.5] shrink-0" />
            <span>Security</span>
          </button>
        </div>

        {/* Right Side Content Area */}
        <div className="flex-1 min-w-0 w-full">
          {/* 1. Appearance */}
          {activeTab === "appearance" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-gray-900 mb-1">Theme</h2>
                <p className="text-sm text-gray-500 mb-6">Customize the appearance of the application.</p>

                {/* Theme Selection Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg">
                  {themeOptions.map((opt) => {
                    const isActive = mounted && theme === opt.key;
                    const Icon = opt.icon;
                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleThemeChange(opt.key)}
                        className={`flex flex-col items-center justify-center h-32 p-4 rounded-xl border-2 relative select-none cursor-pointer transition-all ${
                          isActive
                            ? "border-black bg-gray-50/70 shadow-2xs"
                            : "border-gray-200 bg-white hover:border-gray-400 hover:bg-gray-50"
                        }`}
                      >
                        {isActive && (
                          <div className="absolute top-2 right-2">
                            <Check className="size-4 text-black stroke-[2]" />
                          </div>
                        )}
                        <Icon className={`size-6 stroke-[1.5] mb-2 ${isActive ? "text-gray-900" : "text-gray-400"}`} />
                        <span className={`text-sm font-medium ${isActive ? "font-bold text-gray-900" : "text-gray-500"}`}>
                          {opt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Font Size Selector */}
              <div className="pt-6 border-t border-gray-100 space-y-4">
                <h3 className="text-sm font-bold text-gray-900">Font Size</h3>
                <div className="grid sm:grid-cols-3 gap-3 max-w-lg">
                  {fontSizeOptions.map((opt) => {
                    const isActive = mounted && fontSize === opt.key;
                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleFontSizeChange(opt.key)}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg border cursor-pointer transition-all text-left ${
                          isActive
                            ? "border-black bg-gray-50 shadow-2xs"
                            : "border-gray-200 bg-white hover:border-gray-400"
                        }`}
                      >
                        <span className={`text-xs font-semibold ${isActive ? "text-gray-900" : "text-gray-600"}`}>
                          {opt.label}
                        </span>
                        <span className="text-[10px] text-gray-400 mt-0.5">{opt.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Code Editor Theme */}
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
            </div>
          )}

          {/* 2. Workspace Preferences */}
          {activeTab === "account" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-gray-900 mb-1">Workspace Preferences</h2>
                <p className="text-sm text-gray-500 mb-6">Configure Python runtime environment and AI defaults.</p>

                <div className="space-y-4 max-w-md">
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium text-gray-700">Python Interpreter Version</Label>
                    <select className="w-full h-10 px-3 bg-[#F7F7F5] border border-gray-200 rounded-lg text-xs font-medium text-gray-900 outline-none focus:border-black cursor-pointer">
                      <option value="3.12">Python 3.12 (Recommended &amp; Stable)</option>
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast("Exporting your learning history as JSON...")}
                    className="h-8 px-3 text-xs font-semibold rounded-lg bg-white border-gray-200 hover:bg-gray-50 flex items-center gap-1.5"
                  >
                    <Download className="size-3.5 stroke-[1.5]" />
                    <span>Export JSON</span>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* 3. Notifications */}
          {activeTab === "notifications" && (
            <div className="space-y-6 animate-in fade-in duration-200">
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
                      <div className="text-sm font-bold text-gray-900">Course &amp; Module Updates</div>
                      <div className="text-xs text-gray-500 mt-0.5">Get notified when new interactive Python courses are added.</div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3.5 p-3.5 rounded-xl border border-gray-200 bg-white cursor-pointer hover:bg-gray-50 transition-colors">
                    <input type="checkbox" className="mt-0.5 size-4 rounded border-gray-300 text-black focus:ring-black accent-black" />
                    <div>
                      <div className="text-sm font-bold text-gray-900">Community Mentions &amp; Replies</div>
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
            </div>
          )}

          {/* 4. Security */}
          {activeTab === "security" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-gray-900 mb-1">Security &amp; Passkey</h2>
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
                <h3 className="text-sm font-bold text-gray-900">Passkeys &amp; Hardware Keys</h3>
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast("Registering a security key...")}
                    className="h-8 px-3 text-xs font-semibold rounded-lg border-gray-200 hover:bg-gray-50"
                  >
                    Register Key
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
