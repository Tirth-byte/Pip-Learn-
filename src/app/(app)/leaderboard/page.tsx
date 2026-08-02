import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Medal, Flame } from "lucide-react";

const leaderboard = [
  { rank: 1, name: "Alice Cooper", handle: "@alice", score: 12500, streak: 45 },
  { rank: 2, name: "Charlie Davis", handle: "@charlie", score: 11200, streak: 15 },
  { rank: 3, name: "Eve Smith", handle: "@eve", score: 10800, streak: 8 },
  { rank: 4, name: "John Doe", handle: "@john", score: 8500, streak: 12, isCurrentUser: true },
  { rank: 5, name: "Bob Builder", handle: "@bob", score: 7200, streak: 2 },
];

export default function LeaderboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto pb-10 select-none">
      <div className="border-b border-neutral-100 pb-4 mt-4">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 mb-1">Leaderboard</h1>
        <p className="text-neutral-500 text-sm">See how you stack up against your friends and the community.</p>
      </div>

      <div className="border border-neutral-200 rounded-xl overflow-hidden bg-white shadow-none">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F7F7F5] hover:bg-[#F7F7F5] border-b border-neutral-200">
              <TableHead className="w-[80px] text-center text-sm font-medium text-neutral-700 h-10">Rank</TableHead>
              <TableHead className="text-sm font-medium text-neutral-700 h-10">User</TableHead>
              <TableHead className="text-right text-sm font-medium text-neutral-700 h-10">Score (XP)</TableHead>
              <TableHead className="text-right text-sm font-medium text-neutral-700 h-10 pr-6">Streak</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboard.map((user) => (
              <TableRow 
                key={user.handle} 
                className={`hover:bg-neutral-50 transition-colors border-neutral-100 last:border-0 ${user.isCurrentUser ? "bg-neutral-100/80 hover:bg-neutral-100" : ""}`}
              >
                <TableCell className="text-center py-3">
                  {user.rank === 1 ? (
                    <Trophy className="size-5 text-amber-500 mx-auto stroke-[1.5]" />
                  ) : user.rank === 2 ? (
                    <Medal className="size-5 text-neutral-400 mx-auto stroke-[1.5]" />
                  ) : user.rank === 3 ? (
                    <Medal className="size-5 text-amber-700 mx-auto stroke-[1.5]" />
                  ) : (
                    <span className="text-neutral-500 font-medium">{user.rank}</span>
                  )}
                </TableCell>
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-8 rounded">
                      <AvatarFallback className="bg-[#F7F7F5] text-xs font-medium text-neutral-900 border border-neutral-200 rounded">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium text-neutral-900">{user.name} {user.isCurrentUser && <span className="text-neutral-500 ml-1 font-medium text-xs">(You)</span>}</div>
                      <div className="text-xs text-neutral-500">{user.handle}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono font-medium text-neutral-900 py-3">{user.score.toLocaleString()}</TableCell>
                <TableCell className="text-right pr-6 py-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-900 bg-white border border-neutral-200 px-2 py-0.5 rounded-md">
                    <span>{user.streak}d</span>
                    <Flame className="size-3.5 text-amber-500 stroke-[1.5]" />
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
