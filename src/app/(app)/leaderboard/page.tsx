"use client";

import { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, Medal, Flame, TrendingUp, TrendingDown, Minus, Crown, Users, Globe2, GraduationCap, Plus, Sparkles, MapPin, BadgeCheck } from "lucide-react";
import { NotionAvatar } from "@/components/ui/notion-avatar";
import { useAppContext } from "@/context/app-context";
import { getInstitutionById, Institution } from "@/lib/institutions";
import { InstitutionLogo } from "@/components/institutions/institution-logo";
import { InstitutionDialog } from "@/components/institutions/institution-dialog";
import { Button } from "@/components/ui/button";

type RankingScope = "global" | "friends" | "institution";
type TimePeriod = "all" | "month" | "week";

interface LeaderboardUser {
  name: string;
  handle: string;
  institutionId?: string;
  scores: { all: number; month: number; week: number };
  streak: number;
  deltas: { all: number; month: number; week: number };
  isCurrentUser?: boolean;
}

export default function LeaderboardPage() {
  const { user, progress } = useAppContext();
  const [scope, setScope] = useState<RankingScope>("global");
  const [period, setPeriod] = useState<TimePeriod>("all");
  const [isInstitutionDialogOpen, setIsInstitutionDialogOpen] = useState(false);

  const currentInstitution = getInstitutionById(user.institutionId);

  // 1. Global Learners Population
  const globalUsers: LeaderboardUser[] = useMemo(() => [
    { name: "Alice Cooper", handle: "@alice", institutionId: "mit", scores: { all: 12500, month: 2100, week: 480 }, streak: 45, deltas: { all: 0, month: 320, week: 120 } },
    { name: "Charlie Davis", handle: "@charlie", institutionId: "stanford", scores: { all: 11200, month: 1850, week: 410 }, streak: 15, deltas: { all: 0, month: 180, week: 90 } },
    { name: "Eve Smith", handle: "@eve", institutionId: "oxford", scores: { all: 10800, month: 1600, week: 350 }, streak: 8, deltas: { all: 0, month: 240, week: -30 } },
    { name: "David Kim", handle: "@david", institutionId: "berkeley", scores: { all: 9600, month: 1400, week: 290 }, streak: 22, deltas: { all: 0, month: 150, week: 75 } },
    { name: "Priya Patel", handle: "@priya", institutionId: "iit-bombay", scores: { all: 9100, month: 1350, week: 310 }, streak: 30, deltas: { all: 0, month: 280, week: 140 } },
    { name: user.name, handle: `@${user.firstName.toLowerCase()}`, institutionId: user.institutionId || undefined, scores: { all: Math.max(progress.xp, 8800), month: Math.floor(Math.max(progress.xp, 8800) * 0.25), week: Math.floor(Math.max(progress.xp, 8800) * 0.08) }, streak: progress.streak, deltas: { all: 0, month: 120, week: 50 }, isCurrentUser: true },
    { name: "Olivia Chen", handle: "@olivia", institutionId: "harvard", scores: { all: 8200, month: 1100, week: 220 }, streak: 12, deltas: { all: 0, month: -50, week: 60 } },
    { name: "Marcus Johnson", handle: "@marcus", institutionId: "cmu", scores: { all: 7800, month: 980, week: 190 }, streak: 5, deltas: { all: 0, month: 90, week: 40 } },
    { name: "Bob Builder", handle: "@bob", institutionId: "waterloo", scores: { all: 7200, month: 850, week: 160 }, streak: 2, deltas: { all: 0, month: 60, week: -20 } },
    { name: "Sophia Lee", handle: "@sophia", institutionId: "nus", scores: { all: 6500, month: 780, week: 140 }, streak: 18, deltas: { all: 0, month: 200, week: 80 } },
    { name: "Raj Kapoor", handle: "@raj", institutionId: "iit-bombay", scores: { all: 5900, month: 650, week: 120 }, streak: 9, deltas: { all: 0, month: 100, week: 30 } },
    { name: "Liam O'Brien", handle: "@liam", institutionId: "cambridge", scores: { all: 5200, month: 580, week: 100 }, streak: 3, deltas: { all: 0, month: 40, week: -10 } },
    { name: "Fatima Al-Rashid", handle: "@fatima", institutionId: "imperial", scores: { all: 4700, month: 500, week: 90 }, streak: 7, deltas: { all: 0, month: 130, week: 55 } },
    { name: "Noah Williams", handle: "@noah", institutionId: "georgia-tech", scores: { all: 3800, month: 420, week: 70 }, streak: 1, deltas: { all: 0, month: 20, week: 10 } },
    { name: "Yuki Tanaka", handle: "@yuki", institutionId: "tokyo", scores: { all: 2900, month: 340, week: 50 }, streak: 4, deltas: { all: 0, month: 60, week: 25 } },
  ], [user.name, user.firstName, user.institutionId, progress.xp, progress.streak]);

  // 2. Friends / Connections
  const friendsUsers: LeaderboardUser[] = useMemo(() => [
    { name: "Ada Lovelace", handle: "@ada", institutionId: "cambridge", scores: { all: 10400, month: 1720, week: 390 }, streak: 28, deltas: { all: 0, month: 210, week: 90 } },
    { name: "Linus Torvalds", handle: "@linus", institutionId: "helsinki", scores: { all: 9950, month: 1540, week: 340 }, streak: 42, deltas: { all: 0, month: 170, week: 60 } },
    { name: user.name, handle: `@${user.firstName.toLowerCase()}`, institutionId: user.institutionId || undefined, scores: { all: Math.max(progress.xp, 8800), month: Math.floor(Math.max(progress.xp, 8800) * 0.25), week: Math.floor(Math.max(progress.xp, 8800) * 0.08) }, streak: progress.streak, deltas: { all: 0, month: 120, week: 50 }, isCurrentUser: true },
    { name: "Grace Hopper", handle: "@grace", institutionId: "yale", scores: { all: 8300, month: 1210, week: 280 }, streak: 19, deltas: { all: 0, month: 90, week: 40 } },
    { name: "Alan Turing", handle: "@alan", institutionId: "cambridge", scores: { all: 7600, month: 980, week: 210 }, streak: 14, deltas: { all: 0, month: 130, week: 50 } },
    { name: "Margaret Hamilton", handle: "@margaret", institutionId: "mit", scores: { all: 6900, month: 840, week: 160 }, streak: 11, deltas: { all: 0, month: 80, week: 25 } },
    { name: "Guido van Rossum", handle: "@guido", institutionId: "uva", scores: { all: 5800, month: 620, week: 110 }, streak: 8, deltas: { all: 0, month: 40, week: -10 } },
  ], [user.name, user.firstName, user.institutionId, progress.xp, progress.streak]);

  // 3. Institution Peers
  const institutionUsers: LeaderboardUser[] = useMemo(() => {
    if (!user.institutionId) return [];

    const instName = currentInstitution?.shortName || currentInstitution?.name || "Campus";
    const instId = user.institutionId;

    return [
      { name: "Alex Rivers", handle: "@arivers", institutionId: instId, scores: { all: 11400, month: 1920, week: 430 }, streak: 26, deltas: { all: 0, month: 240, week: 110 } },
      { name: "Maya Sterling", handle: "@msterling", institutionId: instId, scores: { all: 10150, month: 1680, week: 370 }, streak: 34, deltas: { all: 0, month: 190, week: 80 } },
      { name: user.name, handle: `@${user.firstName.toLowerCase()}`, institutionId: instId, scores: { all: Math.max(progress.xp, 8800), month: Math.floor(Math.max(progress.xp, 8800) * 0.25), week: Math.floor(Math.max(progress.xp, 8800) * 0.08) }, streak: progress.streak, deltas: { all: 0, month: 120, week: 50 }, isCurrentUser: true },
      { name: "Julian Vance", handle: "@jvance", institutionId: instId, scores: { all: 7900, month: 1150, week: 240 }, streak: 15, deltas: { all: 0, month: 90, week: 40 } },
      { name: "Elena Rostova", handle: "@elena_r", institutionId: instId, scores: { all: 6800, month: 890, week: 190 }, streak: 12, deltas: { all: 0, month: 140, week: 60 } },
      { name: "Kenji Sato", handle: "@kenji", institutionId: instId, scores: { all: 5400, month: 670, week: 130 }, streak: 9, deltas: { all: 0, month: 50, week: 20 } },
      { name: "Tara Thorne", handle: "@tarat", institutionId: instId, scores: { all: 4600, month: 520, week: 90 }, streak: 6, deltas: { all: 0, month: 30, week: 10 } },
      { name: "Samira Khan", handle: "@samirak", institutionId: instId, scores: { all: 3700, month: 410, week: 70 }, streak: 4, deltas: { all: 0, month: -20, week: 5 } },
    ];
  }, [user.institutionId, currentInstitution, user.name, user.firstName, progress.xp, progress.streak]);

  // Current active list based on scope
  const activeBaseUsers = useMemo(() => {
    if (scope === "friends") return friendsUsers;
    if (scope === "institution") return institutionUsers;
    return globalUsers;
  }, [scope, friendsUsers, institutionUsers, globalUsers]);

  // Sorted by selected period
  const sorted = useMemo(() => {
    return [...activeBaseUsers].sort((a, b) => b.scores[period] - a.scores[period]);
  }, [activeBaseUsers, period]);

  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  const periodLabels: Record<TimePeriod, string> = {
    all: "All Time",
    month: "This Month",
    week: "This Week",
  };

  const DeltaBadge = ({ delta }: { delta: number }) => {
    if (delta === 0) return <Minus className="size-3 text-[rgba(55,53,47,0.3)] dark:text-gray-500" />;
    if (delta > 0)
      return (
        <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
          <TrendingUp className="size-3 stroke-[2]" />+{delta}
        </span>
      );
    return (
      <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-rose-600 dark:text-rose-400">
        <TrendingDown className="size-3 stroke-[2]" />{delta}
      </span>
    );
  };

  const podiumColors = [
    { bg: "bg-amber-50 dark:bg-amber-950/40", border: "border-amber-300 dark:border-amber-800", medal: "text-amber-500", label: "🥇" },
    { bg: "bg-gray-50 dark:bg-gray-800/40", border: "border-gray-300 dark:border-gray-700", medal: "text-gray-400", label: "🥈" },
    { bg: "bg-orange-50 dark:bg-orange-950/40", border: "border-amber-700/30 dark:border-amber-900/60", medal: "text-amber-700", label: "🥉" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto pb-10 select-none text-[#37352F] dark:text-[rgba(255,255,255,0.85)]">
      {/* Header */}
      <div className="border-b border-neutral-100 dark:border-neutral-800 pb-4 mt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mb-1">Leaderboard</h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">See how you stack up against learners across Global, Friends, and Institution.</p>
          </div>

          {/* User's Current Scope Badge */}
          {scope === "institution" && currentInstitution && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F7F7F5] dark:bg-[#252525] border border-gray-200 dark:border-gray-700 shrink-0">
              <InstitutionLogo institution={currentInstitution} size="xs" />
              <span className="font-semibold text-xs text-gray-900 dark:text-white">
                {currentInstitution.name}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Scope Segmented Switcher & Time Period Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Three Ranking Scopes: Global | Friends | Institution */}
        <div className="inline-flex p-1 rounded-xl bg-[#F1F1EF] dark:bg-[#252525] border border-neutral-200/80 dark:border-neutral-700/80 shadow-2xs">
          <button
            type="button"
            onClick={() => setScope("global")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              scope === "global"
                ? "bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-white shadow-xs"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <Globe2 className="size-3.5 stroke-[2]" />
            <span>Global</span>
          </button>

          <button
            type="button"
            onClick={() => setScope("friends")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              scope === "friends"
                ? "bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-white shadow-xs"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <Users className="size-3.5 stroke-[2]" />
            <span>Friends</span>
          </button>

          <button
            type="button"
            onClick={() => setScope("institution")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              scope === "institution"
                ? "bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-white shadow-xs"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <GraduationCap className="size-3.5 stroke-[2]" />
            <span>Institution</span>
          </button>
        </div>

        {/* Time Period Selector */}
        {!(scope === "institution" && !user.institutionId) && (
          <div className="flex items-center gap-1.5">
            {(Object.keys(periodLabels) as TimePeriod[]).map((key) => (
              <button
                key={key}
                onClick={() => setPeriod(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  period === key
                    ? "bg-[#37352F] dark:bg-white text-white dark:text-black font-semibold shadow-2xs"
                    : "bg-[#F7F7F5] dark:bg-[#252525] text-[rgba(55,53,47,0.7)] dark:text-gray-400 hover:bg-[#EFEFEF] dark:hover:bg-[#303030] hover:text-[#37352F] dark:hover:text-white"
                }`}
              >
                {periodLabels[key]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* INSTITUTION SCOPE EMPTY STATE (When user has no institution) */}
      {scope === "institution" && !user.institutionId ? (
        <div className="p-8 sm:p-12 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-[#202020]/70 text-center space-y-4 max-w-lg mx-auto my-8">
          <div className="size-14 rounded-2xl bg-white dark:bg-[#2A2A2A] border border-gray-200 dark:border-gray-700 flex items-center justify-center mx-auto shadow-xs">
            <GraduationCap className="size-7 text-[#0066FF] stroke-[1.75]" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Add your institution to see how you rank with learners there.
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-md mx-auto">
              Compare streaks, algorithm problem counts, and weekly XP progression with classmates and peers at your school.
            </p>
          </div>

          <div className="pt-2">
            <Button
              onClick={() => setIsInstitutionDialogOpen(true)}
              className="h-10 px-5 text-xs font-semibold rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 flex items-center gap-2 shadow-xs cursor-pointer mx-auto"
            >
              <Plus className="size-4 stroke-[2]" />
              <span>Select Your Institution</span>
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Institution Header Banner if in Institution Scope */}
          {scope === "institution" && currentInstitution && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50/80 to-indigo-50/50 dark:from-blue-950/30 dark:to-indigo-950/20 border border-blue-200/80 dark:border-blue-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3">
                <InstitutionLogo institution={currentInstitution} size="md" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-gray-900 dark:text-white">
                      {currentInstitution.name} Leaderboard
                    </span>
                    {currentInstitution.verified && (
                      <BadgeCheck className="size-3.5 text-[#0066FF] shrink-0 fill-[#0066FF]/15" />
                    )}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="size-3 shrink-0" />
                    <span>{currentInstitution.location}</span>
                    <span className="mx-1">·</span>
                    <span>{currentInstitution.memberCount.toLocaleString()} learners</span>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsInstitutionDialogOpen(true)}
                className="h-8 px-3 text-xs font-semibold rounded-lg bg-white dark:bg-[#202020] border-gray-200 dark:border-gray-700 hover:bg-gray-50"
              >
                Change Campus
              </Button>
            </div>
          )}

          {/* Podium — Top 3 */}
          <div className="grid grid-cols-3 gap-3">
            {[top3[1], top3[0], top3[2]].map((entry, displayIndex) => {
              if (!entry) return null;
              const actualRank = displayIndex === 0 ? 1 : displayIndex === 1 ? 0 : 2;
              const colors = podiumColors[actualRank];
              const isFirst = actualRank === 0;

              return (
                <div
                  key={entry.handle}
                  className={`relative flex flex-col items-center p-4 rounded-xl border ${colors.border} ${colors.bg} ${
                    isFirst ? "sm:-mt-2 sm:pb-6 shadow-sm" : ""
                  } ${entry.isCurrentUser ? "ring-2 ring-[#2383E2]/50" : ""} transition-all`}
                >
                  {isFirst && (
                    <Crown className="size-5 text-amber-500 absolute -top-2.5 bg-white dark:bg-[#1E1E1E] rounded-full p-0.5 shadow-sm" />
                  )}
                  <div className="text-xl mb-2">{colors.label}</div>
                  <NotionAvatar seed={entry.name} size="md" hasShadow={false} />
                  <div className="mt-2 text-sm font-bold text-[#37352F] dark:text-white text-center truncate max-w-full">
                    {entry.name}
                    {entry.isCurrentUser && <span className="text-[10px] text-[rgba(55,53,47,0.5)] dark:text-gray-400 ml-1">(You)</span>}
                  </div>
                  <div className="text-[11px] text-[rgba(55,53,47,0.5)] dark:text-gray-400 mb-1">{entry.handle}</div>
                  <div className="text-lg font-bold text-[#37352F] dark:text-white">{entry.scores[period].toLocaleString()}</div>
                  <div className="text-[10px] text-[rgba(55,53,47,0.5)] dark:text-gray-400 font-medium">XP</div>
                  <div className="mt-1">
                    <DeltaBadge delta={entry.deltas[period]} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Rest of Leaderboard Table */}
          <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden bg-white dark:bg-[#202020] shadow-none">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F7F7F5] dark:bg-[#252525] hover:bg-[#F7F7F5] border-b border-neutral-200 dark:border-neutral-800">
                  <TableHead className="w-[80px] text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 h-10">Rank</TableHead>
                  <TableHead className="text-sm font-medium text-neutral-700 dark:text-neutral-300 h-10">User</TableHead>
                  <TableHead className="text-right text-sm font-medium text-neutral-700 dark:text-neutral-300 h-10">Score (XP)</TableHead>
                  <TableHead className="text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 h-10">Trend</TableHead>
                  <TableHead className="text-right text-sm font-medium text-neutral-700 dark:text-neutral-300 h-10 pr-6">Streak</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rest.map((entry, index) => {
                  const rank = index + 4;
                  return (
                    <TableRow
                      key={entry.handle}
                      className={`hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors border-neutral-100 dark:border-neutral-800 last:border-0 ${
                        entry.isCurrentUser ? "bg-[#E8F3F7]/60 dark:bg-blue-950/40 hover:bg-[#E8F3F7] dark:hover:bg-blue-950/60" : ""
                      }`}
                    >
                      <TableCell className="text-center py-3">
                        <span className="text-neutral-500 dark:text-neutral-400 font-medium">{rank}</span>
                      </TableCell>
                      <TableCell className="py-3">
                        <div className="flex items-center gap-3">
                          <NotionAvatar seed={entry.name} size="sm" hasShadow={false} />
                          <div>
                            <div className="text-sm font-medium text-neutral-900 dark:text-white flex items-center gap-1.5">
                              <span>{entry.name}</span>
                              {entry.isCurrentUser && (
                                <span className="text-neutral-500 dark:text-neutral-400 font-medium text-xs">(You)</span>
                              )}
                            </div>
                            <div className="text-xs text-neutral-500 dark:text-neutral-400">{entry.handle}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono font-medium text-neutral-900 dark:text-white py-3">
                        {entry.scores[period].toLocaleString()}
                      </TableCell>
                      <TableCell className="text-center py-3">
                        <DeltaBadge delta={entry.deltas[period]} />
                      </TableCell>
                      <TableCell className="text-right pr-6 py-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-900 dark:text-white bg-white dark:bg-[#1A1A1A] border border-neutral-200 dark:border-neutral-700 px-2 py-0.5 rounded-md">
                          <span>{entry.streak}d</span>
                          <Flame className="size-3.5 text-amber-500 stroke-[1.5]" />
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </>
      )}

      {/* Institution Selector Modal */}
      <InstitutionDialog
        open={isInstitutionDialogOpen}
        onOpenChange={setIsInstitutionDialogOpen}
      />
    </div>
  );
}
