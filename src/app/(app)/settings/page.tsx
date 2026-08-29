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
  Check,
  GraduationCap,
  Building2,
  AlertTriangle,
  MapPin,
  BadgeCheck,
  Users,
  X,
  Plus
} from "lucide-react";
import { toast } from "sonner";
import { useAppContext } from "@/context/app-context";
import { getInstitutionById, Institution } from "@/lib/institutions";
import { InstitutionBadge } from "@/components/institutions/institution-badge";
import { InstitutionLogo } from "@/components/institutions/institution-logo";
import { InstitutionDialog } from "@/components/institutions/institution-dialog";

type SettingsTab = "appearance" | "institution" | "account" | "notifications" | "security";
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
  const { user, setInstitution } = useAppContext();
  const [activeTab, setActiveTab] = useState<SettingsTab>("appearance");
  const [savedPreferenceNotice, setSavedPreferenceNotice] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordNotice, setPasswordNotice] = useState("");

  const [theme, setTheme] = useState<ThemeMode>("light");
  const [fontSize, setFontSize] = useState<FontSize>("medium");
  const [mounted, setMounted] = useState(false);

  // Institution Modal & Removal Confirmation
  const [isInstitutionDialogOpen, setIsInstitutionDialogOpen] = useState(false);
  const [showRemovalConfirm, setShowRemovalConfirm] = useState(false);

  const currentInstitution = getInstitutionById(user.institutionId);

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

  const handleConfirmRemoveInstitution = () => {
    setInstitution(null);
    setShowRemovalConfirm(false);
    toast.success("Institution removed. Your profile is now set to Independent Learner.");
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
    <div className="max-w-4xl mx-auto w-full pb-16 px-6 text-[#37352F] dark:text-[rgba(255,255,255,0.85)] select-none">
      {/* Page Header */}
      <div className="pt-6 pb-4 border-b border-[rgba(55,53,47,0.09)] dark:border-[rgba(255,255,255,0.09)] mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-1">
          Settings
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage your account preferences, institution affiliation, and application settings.
        </p>
      </div>

      {/* Main Settings Layout Grid */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Left Side Tab Navigation */}
        <div className="flex flex-col w-full md:w-52 space-y-1 shrink-0 border-r-0 md:border-r border-gray-100 dark:border-gray-800 pr-0 md:pr-6">
          <button
            type="button"
            onClick={() => setActiveTab("appearance")}
            className={`w-full justify-start px-3 py-2.5 rounded-lg text-sm transition-colors cursor-pointer flex items-center gap-2.5 text-left ${
              activeTab === "appearance"
                ? "bg-gray-100/90 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold shadow-2xs"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white font-medium"
            }`}
          >
            <Palette className="size-4 text-gray-500 stroke-[1.5] shrink-0" />
            <span>Appearance</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("institution")}
            className={`w-full justify-start px-3 py-2.5 rounded-lg text-sm transition-colors cursor-pointer flex items-center gap-2.5 text-left ${
              activeTab === "institution"
                ? "bg-gray-100/90 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold shadow-2xs"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white font-medium"
            }`}
          >
            <GraduationCap className="size-4 text-gray-500 stroke-[1.5] shrink-0" />
            <span>Institution</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("account")}
            className={`w-full justify-start px-3 py-2.5 rounded-lg text-sm transition-colors cursor-pointer flex items-center gap-2.5 text-left ${
              activeTab === "account"
                ? "bg-gray-100/90 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold shadow-2xs"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white font-medium"
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
                ? "bg-gray-100/90 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold shadow-2xs"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white font-medium"
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
                ? "bg-gray-100/90 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold shadow-2xs"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white font-medium"
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
                <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-1">Theme</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Customize the appearance of the application.</p>

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
                            ? "border-black dark:border-white bg-gray-50/70 dark:bg-gray-800/80 shadow-2xs"
                            : "border-gray-200 dark:border-gray-800 bg-white dark:bg-[#202020] hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                      >
                        {isActive && (
                          <div className="absolute top-2 right-2">
                            <Check className="size-4 text-black dark:text-white stroke-[2]" />
                          </div>
                        )}
                        <Icon className={`size-6 stroke-[1.5] mb-2 ${isActive ? "text-gray-900 dark:text-white" : "text-gray-400"}`} />
                        <span className={`text-sm font-medium ${isActive ? "font-bold text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}>
                          {opt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Font Size Selector */}
              <div className="pt-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Font Size</h3>
                <div className="grid sm:grid-cols-3 gap-3 max-w-lg">
                  {fontSizeOptions.map((opt) => {
                    const isActive = mounted && fontSize === opt.key;
                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleFontSizeChange(opt.key)}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg border cursor-pointer transition-all text-left ${
                          isActive
                            ? "border-black dark:border-white bg-gray-50 dark:bg-gray-800 shadow-2xs"
                            : "border-gray-200 dark:border-gray-800 bg-white dark:bg-[#202020] hover:border-gray-400"
                        }`}
                      >
                        <span className={`text-xs font-semibold ${isActive ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}>
                          {opt.label}
                        </span>
                        <span className="text-[10px] text-gray-400 mt-0.5">{opt.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Code Editor Theme */}
              <div className="pt-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Code Editor Theme</h3>
                <div className="grid sm:grid-cols-2 gap-3 max-w-lg">
                  <label className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-[#F7F7F5] dark:bg-[#252525] cursor-pointer">
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">Notion Minimal (Default)</span>
                    <input type="radio" name="editorTheme" defaultChecked className="accent-black dark:accent-white" />
                  </label>
                  <label className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#202020] cursor-pointer opacity-60">
                    <span className="text-xs font-semibold text-gray-500">Monokai Light (Coming Soon)</span>
                    <input type="radio" name="editorTheme" disabled className="accent-black" />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* 2. Institution Settings */}
          {activeTab === "institution" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-1">
                  Institution &amp; Campus
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Manage your educational affiliation. This defines your Campus Leaderboard and Community feeds.
                </p>

                {currentInstitution ? (
                  <div className="space-y-5 max-w-xl">
                    {/* Active Institution Card */}
                    <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#202020] shadow-xs">
                      <div className="flex items-start gap-4">
                        <InstitutionLogo institution={currentInstitution} size="lg" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-base text-gray-900 dark:text-white truncate">
                              {currentInstitution.name}
                            </h3>
                            {currentInstitution.verified && (
                              <BadgeCheck className="size-4 text-[#0066FF] shrink-0 fill-[#0066FF]/15" />
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <MapPin className="size-3.5 shrink-0" />
                            <span>{currentInstitution.location}</span>
                            <span className="mx-1 text-gray-300 dark:text-gray-600">·</span>
                            <span>{currentInstitution.memberCount.toLocaleString()} registered learners</span>
                          </div>

                          <div className="mt-3 flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold">
                              <Check className="size-3 stroke-[3]" /> Active Campus Scope
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions & Impact Warning */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsInstitutionDialogOpen(true)}
                        className="h-9 px-4 text-xs font-semibold rounded-lg bg-white dark:bg-[#202020] border-gray-200 dark:border-gray-700 hover:bg-gray-50 cursor-pointer shadow-2xs"
                      >
                        Search &amp; Change Institution
                      </Button>

                      <button
                        type="button"
                        onClick={() => setShowRemovalConfirm(true)}
                        className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer py-1.5"
                      >
                        Remove Institution Affiliation
                      </button>
                    </div>

                    {/* Removal Confirmation Notice/Modal */}
                    {showRemovalConfirm && (
                      <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/70 dark:bg-amber-950/40 animate-in fade-in duration-200 space-y-3">
                        <div className="flex items-start gap-2.5">
                          <AlertTriangle className="size-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                          <div className="space-y-1">
                            <div className="text-xs font-bold text-amber-900 dark:text-amber-200">
                              Remove affiliation with {currentInstitution.name}?
                            </div>
                            <div className="text-xs text-amber-700 dark:text-amber-300/90 leading-relaxed">
                              Removing your institution will disconnect you from the {currentInstitution.shortName || currentInstitution.name} leaderboard, reset your campus rank, and remove your institution social scope in Community.
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 justify-end pt-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowRemovalConfirm(false)}
                            className="h-8 px-3 text-xs font-medium rounded-lg text-gray-700 dark:text-gray-300"
                          >
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            onClick={handleConfirmRemoveInstitution}
                            className="h-8 px-3 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-xs cursor-pointer"
                          >
                            Confirm &amp; Remove
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-[#202020]/60 max-w-xl text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 justify-center sm:justify-start">
                        <Building2 className="size-4 text-gray-400" />
                        <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                          Independent Learner
                        </h3>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
                        You are not currently linked to an institution. Connect your university or bootcamp to unlock campus social features and rankings.
                      </p>
                    </div>

                    <Button
                      size="sm"
                      onClick={() => setIsInstitutionDialogOpen(true)}
                      className="h-9 px-4 text-xs font-semibold rounded-lg bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
                    >
                      <Plus className="size-3.5 stroke-[2]" />
                      <span>Select Institution</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 3. Workspace Preferences */}
          {activeTab === "account" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-1">Workspace Preferences</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Configure Python runtime environment and AI defaults.</p>

                <div className="space-y-4 max-w-md">
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Python Interpreter Version</Label>
                    <select className="w-full h-10 px-3 bg-[#F7F7F5] dark:bg-[#252525] border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-medium text-gray-900 dark:text-white outline-none focus:border-black cursor-pointer">
                      <option value="3.12">Python 3.12 (Recommended &amp; Stable)</option>
                      <option value="3.11">Python 3.11</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Pip AI Assistance Level</Label>
                    <select className="w-full h-10 px-3 bg-[#F7F7F5] dark:bg-[#252525] border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-medium text-gray-900 dark:text-white outline-none focus:border-black cursor-pointer">
                      <option value="tutor">Interactive Tutor Mode (Guided Hints)</option>
                      <option value="direct">Direct Solution Mode</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Export & Data Management */}
              <div className="pt-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Data Management</h3>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-[#F7F7F5] dark:bg-[#252525]">
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white">Export Learning History</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Download your solved problems and notes in JSON/Markdown.</div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast("Exporting your learning history as JSON...")}
                    className="h-8 px-3 text-xs font-semibold rounded-lg bg-white dark:bg-[#1E1E1E] border-gray-200 dark:border-gray-700 hover:bg-gray-50 flex items-center gap-1.5"
                  >
                    <Download className="size-3.5 stroke-[1.5]" />
                    <span>Export JSON</span>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* 4. Notifications */}
          {activeTab === "notifications" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-1">Email Notifications</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Choose what updates and reminders you receive.</p>

                <div className="space-y-4 max-w-lg">
                  <label className="flex items-start gap-3.5 p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#202020] cursor-pointer hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors">
                    <input type="checkbox" className="mt-0.5 size-4 rounded border-gray-300 text-black focus:ring-black accent-black" defaultChecked />
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">Daily Streak Reminders</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Receive a gentle reminder to complete your daily Python lesson.</div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3.5 p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#202020] cursor-pointer hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors">
                    <input type="checkbox" className="mt-0.5 size-4 rounded border-gray-300 text-black focus:ring-black accent-black" defaultChecked />
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">Campus &amp; Institution Highlights</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Get notified when fellow learners from your institution post solutions or rank top 3.</div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3.5 p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#202020] cursor-pointer hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors">
                    <input type="checkbox" className="mt-0.5 size-4 rounded border-gray-300 text-black focus:ring-black accent-black" />
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">Community Mentions &amp; Replies</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Receive notifications when someone replies to your post or comment.</div>
                    </div>
                  </label>
                </div>
              </div>

              {savedPreferenceNotice && (
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 p-3 rounded-lg max-w-sm">
                  <CheckCircle2 className="size-4 stroke-[1.5]" /> {savedPreferenceNotice}
                </div>
              )}

              <div className="pt-2">
                <Button onClick={handleSavePreferences} className="h-9 px-5 font-semibold bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 text-xs rounded-lg transition-colors shadow-xs">
                  Save Preferences
                </Button>
              </div>
            </div>
          )}

          {/* 5. Security */}
          {activeTab === "security" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-1">Security &amp; Passkey</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Update your credentials and active security sessions.</p>

                <div className="space-y-4 max-w-md">
                  <div className="space-y-1.5">
                    <Label htmlFor="current" className="text-xs font-semibold text-gray-700 dark:text-gray-300">Current Password</Label>
                    <Input
                      id="current"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="h-10 bg-[#F7F7F5] dark:bg-[#252525] border-gray-200 dark:border-gray-700 focus-visible:ring-1 focus-visible:ring-gray-300 text-gray-900 dark:text-white rounded-lg text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="new" className="text-xs font-semibold text-gray-700 dark:text-gray-300">New Password</Label>
                    <Input
                      id="new"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="h-10 bg-[#F7F7F5] dark:bg-[#252525] border-gray-200 dark:border-gray-700 focus-visible:ring-1 focus-visible:ring-gray-300 text-gray-900 dark:text-white rounded-lg text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="confirm" className="text-xs font-semibold text-gray-700 dark:text-gray-300">Confirm New Password</Label>
                    <Input
                      id="confirm"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-10 bg-[#F7F7F5] dark:bg-[#252525] border-gray-200 dark:border-gray-700 focus-visible:ring-1 focus-visible:ring-gray-300 text-gray-900 dark:text-white rounded-lg text-xs"
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
                    <Button onClick={handleUpdatePassword} className="h-9 px-5 font-semibold bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 text-xs w-full sm:w-auto rounded-lg transition-colors shadow-xs">
                      Update Password
                    </Button>
                  </div>
                </div>
              </div>

              {/* Passkey Integration Badge */}
              <div className="pt-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Passkeys &amp; Hardware Keys</h3>
                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#202020]">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                      <KeyRound className="size-4 text-gray-700 dark:text-gray-300 stroke-[1.5]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-900 dark:text-white">FIDO2 Touch ID / Security Key</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Sign in instantly without passwords.</div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast("Registering a security key...")}
                    className="h-8 px-3 text-xs font-semibold rounded-lg border-gray-200 dark:border-gray-700 hover:bg-gray-50"
                  >
                    Register Key
                  </Button>
                </div>
              </div>
            </div>
          )}
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
