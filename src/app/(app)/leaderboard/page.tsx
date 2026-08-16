"use client";

import { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, Medal, Flame, TrendingUp, TrendingDown, Minus, Crown } from "lucide-react";
import { NotionAvatar } from "@/components/ui/notion-avatar";
import { useAppContext } from "@/context/app-context";

type TimePeriod = "all" | "month" | "week";

interface LeaderboardUser {
  name: string;
  handle: string;
  scores: { all: number; month: number; week: number };
  streak: number;
  deltas: { all: number; month: number; week: number };
  isCurrentUser?: boolean;
}

export default function LeaderboardPage() {
  const { user, progress } = useAppContext();
  const [period, setPeriod] = useState<TimePeriod>("all");

  const baseUsers: LeaderboardUser[] = useMemo(() => [
    { name: "Alice Cooper", handle: "@alice", scores: { all: 12500, month: 2100, week: 480 }, streak: 45, deltas: { all: 0, month: 320, week: 120 } },
    { name: "Charlie Davis", handle: "@charlie", scores: { all: 11200, month: 1850, week: 410 }, streak: 15, deltas: { all: 0, month: 180, week: 90 } },
    { name: "Eve Smith", handle: "@eve", scores: { all: 10800, month: 1600, week: 350 }, streak: 8, deltas: { all: 0, month: 240, week: -30 } },
    { name: "David Kim", handle: "@david", scores: { all: 9600, month: 1400, week: 290 }, streak: 22, deltas: { all: 0, month: 150, week: 75 } },
    { name: "Priya Patel", handle: "@priya", scores: { all: 9100, month: 1350, week: 310 }, streak: 30, deltas: { all: 0, month: 280, week: 140 } },
    { name: user.name, handle: `@${user.firstName.toLowerCase()}`, scores: { all: progress.xp, month: Math.floor(progress.xp * 0.25), week: Math.floor(progress.xp * 0.08) }, streak: progress.streak, deltas: { all: 0, month: 120, week: 50 }, isCurrentUser: true },
    { name: "Olivia Chen", handle: "@olivia", scores: { all: 8200, month: 1100, week: 220 }, streak: 12, deltas: { all: 0, month: -50, week: 60 } },
    { name: "Marcus Johnson", handle: "@marcus", scores: { all: 7800, month: 980, week: 190 }, streak: 5, deltas: { all: 0, month: 90, week: 40 } },
    { name: "Bob Builder", handle: "@bob", scores: { all: 7200, month: 850, week: 160 }, streak: 2, deltas: { all: 0, month: 60, week: -20 } },
    { name: "Sophia Lee", handle: "@sophia", scores: { all: 6500, month: 780, week: 140 }, streak: 18, deltas: { all: 0, month: 200, week: 80 } },
    { name: "Raj Kapoor", handle: "@raj", scores: { all: 5900, month: 650, week: 120 }, streak: 9, deltas: { all: 0, month: 100, week: 30 } },
    { name: "Liam O'Brien", handle: "@liam", scores: { all: 5200, month: 580, week: 100 }, streak: 3, deltas: { all: 0, month: 40, week: -10 } },
    { name: "Fatima Al-Rashid", handle: "@fatima", scores: { all: 4700, month: 500, week: 90 }, streak: 7, deltas: { all: 0, month: 130, week: 55 } },
    { name: "Noah Williams", handle: "@noah", scores: { all: 3800, month: 420, week: 70 }, streak: 1, deltas: { all: 0, month: 20, week: 10 } },
    { name: "Yuki Tanaka", handle: "@yuki", scores: { all: 2900, month: 340, week: 50 }, streak: 4, deltas: { all: 0, month: 60, week: 25 } },
  ], [user.name, user.firstName, progress.xp, progress.streak]);

  // Sort by the selected period's score
  const sorted = useMemo(() => {
    return [...baseUsers].sort((a, b) => b.scores[period] - a.scores[period]);
  }, [baseUsers, period]);

  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  const periodLabels: Record<TimePeriod, string> = {
    all: "All Time",
    month: "This Month",
    week: "This Week",
  };

  const DeltaBadge = ({ delta }: { delta: number }) => {
    if (delta === 0) return <Minus className="size-3 text-[rgba(55,53,47,0.3)]" />;
    if (delta > 0)
      return (
        <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-700">
          <TrendingUp className="size-3 stroke-[2]" />+{delta}
        </span>
      );
    return (
      <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-rose-600">
        <TrendingDown className="size-3 stroke-[2]" />{delta}
      </span>
    );
  };

  const podiumColors = [
    { bg: "bg-amber-50", border: "border-amber-300", medal: "text-amber-500", label: "🥇" },
    { bg: "bg-gray-50", border: "border-gray-300", medal: "text-gray-400", label: "🥈" },
    { bg: "bg-orange-50", border: "border-amber-700/30", medal: "text-amber-700", label: "🥉" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto pb-10 select-none">
      {/* Header */}
      <div className="border-b border-neutral-100 pb-4 mt-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 mb-1">Leaderboard</h1>
            <p className="text-neutral-500 text-sm">See how you stack up against the community.</p>
          </div>
        </div>
      </div>

      {/* Time Period Selector */}
      <div className="flex items-center gap-1.5">
        {(Object.keys(periodLabels) as TimePeriod[]).map((key) => (
          <button
            key={key}
            onClick={() => setPeriod(key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              period === key
                ? "bg-[#37352F] text-white"
                : "bg-[#F7F7F5] text-[rgba(55,53,47,0.7)] hover:bg-[#EFEFEF] hover:text-[#37352F]"
            }`}
          >
            {periodLabels[key]}
          </button>
        ))}
      </div>

      {/* Podium — Top 3 */}
      <div className="grid grid-cols-3 gap-3">
        {/* Reorder for display: 2nd, 1st, 3rd */}
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
              } ${entry.isCurrentUser ? "ring-2 ring-[#2383E2]/40" : ""} transition-all`}
            >
              {isFirst && (
                <Crown className="size-5 text-amber-500 absolute -top-2.5 bg-white rounded-full p-0.5 shadow-sm" />
              )}
              <div className="text-xl mb-2">{colors.label}</div>
              <NotionAvatar seed={entry.name} size="md" hasShadow={false} />
              <div className="mt-2 text-sm font-bold text-[#37352F] text-center truncate max-w-full">
                {entry.name}
                {entry.isCurrentUser && <span className="text-[10px] text-[rgba(55,53,47,0.5)] ml-1">(You)</span>}
              </div>
              <div className="text-[11px] text-[rgba(55,53,47,0.5)] mb-1">{entry.handle}</div>
              <div className="text-lg font-bold text-[#37352F]">{entry.scores[period].toLocaleString()}</div>
              <div className="text-[10px] text-[rgba(55,53,47,0.5)] font-medium">XP</div>
              <div className="mt-1">
                <DeltaBadge delta={entry.deltas[period]} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Rest of Leaderboard Table */}
      <div className="border border-neutral-200 rounded-xl overflow-hidden bg-white shadow-none">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F7F7F5] hover:bg-[#F7F7F5] border-b border-neutral-200">
              <TableHead className="w-[80px] text-center text-sm font-medium text-neutral-700 h-10">Rank</TableHead>
              <TableHead className="text-sm font-medium text-neutral-700 h-10">User</TableHead>
              <TableHead className="text-right text-sm font-medium text-neutral-700 h-10">Score (XP)</TableHead>
              <TableHead className="text-center text-sm font-medium text-neutral-700 h-10">Trend</TableHead>
              <TableHead className="text-right text-sm font-medium text-neutral-700 h-10 pr-6">Streak</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rest.map((entry, index) => {
              const rank = index + 4; // starts at 4th
              return (
                <TableRow
                  key={entry.handle}
                  className={`hover:bg-neutral-50 transition-colors border-neutral-100 last:border-0 ${
                    entry.isCurrentUser ? "bg-[#E8F3F7]/60 hover:bg-[#E8F3F7]" : ""
                  }`}
                >
                  <TableCell className="text-center py-3">
                    <span className="text-neutral-500 font-medium">{rank}</span>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <NotionAvatar seed={entry.name} size="sm" hasShadow={false} />
                      <div>
                        <div className="text-sm font-medium text-neutral-900">
                          {entry.name}
                          {entry.isCurrentUser && (
                            <span className="text-neutral-500 ml-1 font-medium text-xs">(You)</span>
                          )}
                        </div>
                        <div className="text-xs text-neutral-500">{entry.handle}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono font-medium text-neutral-900 py-3">
                    {entry.scores[period].toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center py-3">
                    <DeltaBadge delta={entry.deltas[period]} />
                  </TableCell>
                  <TableCell className="text-right pr-6 py-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-900 bg-white border border-neutral-200 px-2 py-0.5 rounded-md">
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
    </div>
  );
}
