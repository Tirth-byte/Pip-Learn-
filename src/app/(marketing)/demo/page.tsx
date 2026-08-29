"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar as CalendarIcon, Clock, Video, Globe, ArrowLeft, ArrowRight,
  CheckCircle2, ChevronLeft, ChevronRight, Check, Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotionAvatar } from "@/components/ui/notion-avatar";
import { toast } from "sonner";

const timezones = [
  { value: "UTC", label: "UTC (Coordinated Universal Time)" },
  { value: "America/New_York", label: "Eastern Time (US & Canada)" },
  { value: "America/Los_Angeles", label: "Pacific Time (US & Canada)" },
  { value: "America/Chicago", label: "Central Time (US & Canada)" },
  { value: "Europe/London", label: "London (GMT / BST)" },
  { value: "Europe/Berlin", label: "Central European Time (Berlin, Paris)" },
  { value: "Asia/Kolkata", label: "India Standard Time (IST)" },
  { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
  { value: "Australia/Sydney", label: "Australian Eastern Time (AEST)" },
];

const mockTimeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:30 AM",
  "01:30 PM",
  "03:00 PM",
  "04:30 PM"
];

export default function RequestDemoPage() {
  const [step, setStep] = useState<"calendar" | "form" | "confirmed">("calendar");
  const [selectedDay, setSelectedDay] = useState<number>(3); // 3rd of month as default selected
  const [selectedMonth, setSelectedMonth] = useState<number>(8); // September (0-indexed 8)
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [selectedTime, setSelectedTime] = useState<string | null>("10:00 AM");
  const [selectedTimezone, setSelectedTimezone] = useState<string>("UTC");

  // Form State
  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [company, setCompany] = useState("");
  const [teamSize, setTeamSize] = useState("11-50");
  const [notes, setNotes] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    if (selectedMonth === 8 && selectedYear === 2026) return; // don't go to past
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear((y) => y - 1);
    } else {
      setSelectedMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear((y) => y + 1);
    } else {
      setSelectedMonth((m) => m + 1);
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      errors.fullName = "Please enter your full name";
    }
    if (!workEmail.trim() || !workEmail.includes("@") || !workEmail.includes(".")) {
      errors.workEmail = "Please enter a valid work email address";
    }
    if (!company.trim()) {
      errors.company = "Please enter your organization name";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStep("confirmed");
    toast.success("Demo scheduled successfully! Confirmation email sent.");
  };

  const handleReset = () => {
    setStep("calendar");
    setFullName("");
    setWorkEmail("");
    setCompany("");
    setNotes("");
  };

  const formattedDateString = `${monthNames[selectedMonth]} ${selectedDay}, ${selectedYear}`;

  return (
    <div className="flex flex-col min-h-screen bg-[#FBFBFA] dark:bg-[#151515] text-[#37352F] dark:text-[rgba(255,255,255,0.85)] py-12 px-4 sm:px-6 select-none justify-center items-center">
      <div className="w-full max-w-4xl bg-white dark:bg-[#1E1E1E] rounded-3xl border border-neutral-200 dark:border-[rgba(255,255,255,0.12)] shadow-xl overflow-hidden animate-in fade-in duration-300">
        <div className="grid md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-neutral-100 dark:divide-white/10">
          
          {/* Left Panel: Meeting Info & Overview */}
          <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#FAFAFA] dark:bg-[#1A1A1A]">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <NotionAvatar seed="PipLearn Team" avatarIndex={2} size="md" />
                <div>
                  <div className="text-xs font-bold text-neutral-900 dark:text-white">PipLearn Enterprise</div>
                  <div className="text-[11px] text-neutral-500 font-medium">Technical Solutions Team</div>
                </div>
              </div>

              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                  PipLearn for Teams Walkthrough
                </h1>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                  A tailored 30-minute overview of our interactive Python sandbox, curriculum paths, and administrative controls.
                </p>
              </div>

              <div className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-300 border-t border-neutral-200 dark:border-white/10 pt-4">
                <div className="flex items-center gap-2.5 font-medium">
                  <Clock className="size-4 text-neutral-400 shrink-0" />
                  <span>30 minutes</span>
                </div>
                <div className="flex items-center gap-2.5 font-medium">
                  <Video className="size-4 text-neutral-400 shrink-0" />
                  <span>Google Meet web conference</span>
                </div>
                <div className="flex items-center gap-2.5 font-medium">
                  <Globe className="size-4 text-neutral-400 shrink-0" />
                  <span>{selectedTimezone}</span>
                </div>
              </div>

              {/* What will be covered list */}
              <div className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400 border-t border-neutral-200 dark:border-white/10 pt-4">
                <div className="font-semibold text-neutral-900 dark:text-white text-[11px] uppercase tracking-wider">
                  Agenda Highlights
                </div>
                <ul className="space-y-1.5 text-[11px]">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                    <span>Live browser sandbox demonstration</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                    <span>Admin portal &amp; seat management</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                    <span>Team volume pricing &amp; custom tracks</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-200 dark:border-white/10 mt-6 flex items-center justify-between text-[11px] text-neutral-400">
              <Link href="/enterprise" className="hover:underline flex items-center gap-1">
                <ArrowLeft className="size-3" /> Back to Enterprise
              </Link>
              <span>PipLearn © {selectedYear}</span>
            </div>
          </div>

          {/* Right Panel: Multi-Step Interaction */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            
            {/* STEP 1: Date & Time Picker */}
            {step === "calendar" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-neutral-900 dark:text-white">
                    Select a Date &amp; Time
                  </h2>
                  <div className="text-xs text-neutral-400 font-mono">Step 1 of 2</div>
                </div>

                {/* Calendar Month Header */}
                <div className="flex items-center justify-between border-b border-neutral-100 dark:border-white/10 pb-3">
                  <div className="text-xs font-bold text-neutral-900 dark:text-white">
                    {monthNames[selectedMonth]} {selectedYear}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handlePrevMonth}
                      className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-300 cursor-pointer"
                    >
                      <ChevronLeft className="size-4" />
                    </button>
                    <button
                      onClick={handleNextMonth}
                      className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-300 cursor-pointer"
                    >
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                </div>

                {/* Calendar Days Matrix */}
                <div className="space-y-1">
                  <div className="grid grid-cols-7 text-center text-[10px] font-semibold text-neutral-400 mb-1">
                    <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-xs">
                    {/* Render days of September 2026 */}
                    {Array.from({ length: 30 }).map((_, i) => {
                      const dayNum = i + 1;
                      const isSelected = selectedDay === dayNum;
                      // Disable weekends for business demos (assuming Tue=1st, Sa=5, Su=6, etc.)
                      const dayOfWeek = (i + 1) % 7; // simplified day calculation
                      const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;

                      return (
                        <button
                          key={dayNum}
                          disabled={isWeekend}
                          onClick={() => setSelectedDay(dayNum)}
                          className={`h-8 rounded-lg font-medium transition-all text-center flex items-center justify-center cursor-pointer ${
                            isWeekend
                              ? "opacity-25 cursor-not-allowed text-neutral-400"
                              : isSelected
                              ? "bg-[#0066FF] text-white font-bold shadow-xs"
                              : "hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-800 dark:text-neutral-200"
                          }`}
                        >
                          {dayNum}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots Selection */}
                <div>
                  <div className="text-xs font-bold text-neutral-900 dark:text-white mb-2 flex items-center justify-between">
                    <span>Available Slots on {monthNames[selectedMonth]} {selectedDay}</span>
                    <span className="text-[10px] text-neutral-400 font-mono">{mockTimeSlots.length} available</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {mockTimeSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2 px-1 text-xs font-mono rounded-lg border text-center transition-all cursor-pointer ${
                          selectedTime === slot
                            ? "border-[#0066FF] bg-[#0066FF]/10 dark:bg-[#0066FF]/20 text-[#0066FF] font-bold"
                            : "border-neutral-200 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/20 text-neutral-700 dark:text-neutral-300 bg-white dark:bg-[#202020]"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timezone Selector */}
                <div>
                  <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                    Timezone
                  </label>
                  <select
                    value={selectedTimezone}
                    onChange={(e) => setSelectedTimezone(e.target.value)}
                    className="w-full h-9 bg-[#F7F7F5] dark:bg-[#252525] border border-neutral-200 dark:border-white/10 rounded-lg px-3 text-xs text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-[#0066FF] cursor-pointer"
                  >
                    {timezones.map((tz) => (
                      <option key={tz.value} value={tz.value}>
                        {tz.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Action CTA */}
                <div className="pt-4 border-t border-neutral-100 dark:border-white/10 flex justify-end">
                  <Button
                    onClick={() => setStep("form")}
                    disabled={!selectedTime}
                    className="h-10 px-6 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-semibold rounded-xl shadow-xs"
                  >
                    Next: Enter Details <ArrowRight className="ml-2 size-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2: Attendee Form */}
            {step === "form" && (
              <form onSubmit={handleFormSubmit} className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-neutral-900 dark:text-white">
                    Attendee Information
                  </h2>
                  <div className="text-xs text-neutral-400 font-mono">Step 2 of 2</div>
                </div>

                {/* Selected Slot Summary Badge */}
                <div className="p-3 rounded-xl bg-[#F0F7FF] dark:bg-[#122438] border border-[#0066FF]/20 text-xs text-[#0066FF] flex items-center justify-between">
                  <div className="flex items-center gap-2 font-medium">
                    <CalendarIcon className="size-4" />
                    <span>{formattedDateString} at {selectedTime} ({selectedTimezone})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep("calendar")}
                    className="text-[11px] underline font-semibold hover:opacity-80 cursor-pointer"
                  >
                    Change
                  </button>
                </div>

                {/* Full Name */}
                <div>
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full h-9 bg-[#F7F7F5] dark:bg-[#252525] border border-neutral-200 dark:border-white/10 rounded-lg px-3 text-xs text-neutral-900 dark:text-white outline-none focus:border-[#0066FF]"
                  />
                  {formErrors.fullName && <p className="text-[11px] text-rose-500 mt-1">{formErrors.fullName}</p>}
                </div>

                {/* Work Email */}
                <div>
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder="sarah@company.com"
                    className="w-full h-9 bg-[#F7F7F5] dark:bg-[#252525] border border-neutral-200 dark:border-white/10 rounded-lg px-3 text-xs text-neutral-900 dark:text-white outline-none focus:border-[#0066FF]"
                  />
                  {formErrors.workEmail && <p className="text-[11px] text-rose-500 mt-1">{formErrors.workEmail}</p>}
                </div>

                {/* Company & Team Size Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme Corp"
                      className="w-full h-9 bg-[#F7F7F5] dark:bg-[#252525] border border-neutral-200 dark:border-white/10 rounded-lg px-3 text-xs text-neutral-900 dark:text-white outline-none focus:border-[#0066FF]"
                    />
                    {formErrors.company && <p className="text-[11px] text-rose-500 mt-1">{formErrors.company}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                      Engineers / Team Size
                    </label>
                    <select
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      className="w-full h-9 bg-[#F7F7F5] dark:bg-[#252525] border border-neutral-200 dark:border-white/10 rounded-lg px-3 text-xs text-neutral-800 dark:text-neutral-200 outline-none focus:border-[#0066FF] cursor-pointer"
                    >
                      <option value="1-10">1 - 10 engineers</option>
                      <option value="11-50">11 - 50 engineers</option>
                      <option value="51-200">51 - 200 engineers</option>
                      <option value="200+">200+ enterprise</option>
                    </select>
                  </div>
                </div>

                {/* Optional Notes */}
                <div>
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                    What are your team&apos;s primary learning goals? (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Standardizing Python backend skills for new hires..."
                    className="w-full bg-[#F7F7F5] dark:bg-[#252525] border border-neutral-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-neutral-900 dark:text-white outline-none focus:border-[#0066FF] resize-none"
                  />
                </div>

                {/* Controls */}
                <div className="pt-3 border-t border-neutral-100 dark:border-white/10 flex items-center justify-between">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setStep("calendar")}
                    className="h-9 px-3 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                  >
                    <ArrowLeft className="mr-1.5 size-3.5" /> Back
                  </Button>
                  <Button
                    type="submit"
                    className="h-10 px-6 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-semibold rounded-xl shadow-xs"
                  >
                    Confirm Demo Booking <Check className="ml-1.5 size-4" />
                  </Button>
                </div>
              </form>
            )}

            {/* STEP 3: Confirmed State */}
            {step === "confirmed" && (
              <div className="text-center py-6 space-y-6 animate-in fade-in duration-300">
                <div className="size-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-300 dark:border-emerald-800">
                  <CheckCircle2 className="size-7" />
                </div>

                <div>
                  <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white mb-1">
                    Demo Scheduled!
                  </h2>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    A calendar invitation and Google Meet link have been sent to <strong>{workEmail}</strong>.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="p-4 rounded-2xl bg-[#F7F7F5] dark:bg-[#252525] border border-neutral-200 dark:border-white/10 text-left space-y-3 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-white/10">
                    <span className="text-neutral-500 font-medium">Session</span>
                    <span className="font-bold text-neutral-900 dark:text-white">PipLearn Enterprise Demo</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500 font-medium">Date &amp; Time</span>
                    <span className="font-mono font-semibold text-neutral-900 dark:text-white">{formattedDateString} @ {selectedTime} ({selectedTimezone})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500 font-medium">Attendee</span>
                    <span className="font-semibold text-neutral-900 dark:text-white">{fullName} ({company})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500 font-medium">Meeting Link</span>
                    <span className="font-mono text-[#0066FF] text-[11px]">meet.google.com/pip-demo-preview</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button
                    onClick={() => toast.success("Calendar invite (.ics) downloaded")}
                    variant="outline"
                    className="flex-1 h-9 text-xs font-semibold rounded-xl border-neutral-200 dark:border-white/10"
                  >
                    <Download className="mr-1.5 size-3.5" /> Download .ics
                  </Button>
                  <Button
                    asChild
                    className="flex-1 h-9 bg-black hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 text-xs font-semibold rounded-xl"
                  >
                    <Link href="/">Return to Home</Link>
                  </Button>
                </div>

                <button
                  onClick={handleReset}
                  className="text-[11px] text-neutral-400 hover:text-neutral-700 dark:hover:text-white underline cursor-pointer"
                >
                  Book another appointment
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
