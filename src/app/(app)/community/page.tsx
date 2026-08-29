"use client";

import { useState, useCallback, useMemo } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  MessageSquare,
  Heart,
  Share2,
  Sparkles,
  Image as ImageIcon,
  Link as LinkIcon,
  Send,
  Copy,
  Check,
  Globe2,
  Users,
  GraduationCap,
  Plus,
  UserPlus,
  UserCheck,
  BadgeCheck,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";
import { useAppContext } from "@/context/app-context";
import { getInstitutionById, Institution } from "@/lib/institutions";
import { InstitutionBadge } from "@/components/institutions/institution-badge";
import { InstitutionLogo } from "@/components/institutions/institution-logo";
import { InstitutionDialog } from "@/components/institutions/institution-dialog";

type CommunityScope = "global" | "friends" | "institution";
type PostCategory = "all" | "question" | "achievement" | "resource";

type Comment = {
  author: string;
  avatar: string;
  text: string;
  institutionId?: string;
};

type Post = {
  id: number;
  author: string;
  avatar: string;
  role: string;
  institutionId?: string;
  content: string;
  likes: number;
  commentsCount: number;
  commentsList: Comment[];
  time: string;
  liked: boolean;
  tags: string[];
  category: PostCategory;
  scope?: CommunityScope;
};

interface CampusPeer {
  name: string;
  handle: string;
  avatar: string;
  role: string;
  institutionId: string;
  isFollowing: boolean;
}

const initialPosts: Post[] = [
  {
    id: 1,
    author: "Grace Hopper",
    avatar: "GH",
    role: "Senior Learner",
    institutionId: "stanford",
    content: "Just finished the Python Masterclass! The module on OOP finally clicked for me. Highly recommend building the Task Tracker CLI project right after.",
    likes: 24,
    commentsCount: 2,
    commentsList: [
      { author: "Ada Lovelace", avatar: "AL", text: "Congrats Grace! Which design pattern did you use for the CLI?" },
      { author: "Alan Turing", avatar: "AT", text: "Great job! The OOP module is definitely one of the highlights." },
    ],
    time: "2 hours ago",
    liked: true,
    tags: ["#python", "#oop"],
    category: "achievement",
    scope: "global",
  },
  {
    id: 2,
    author: "Alan Turing",
    avatar: "AT",
    role: "Beginner",
    institutionId: "cambridge",
    content: "How does memory management work in Python compared to C? The garbage collector is still a bit of a mystery to me. Anyone have good resources?",
    likes: 42,
    commentsCount: 1,
    commentsList: [
      { author: "Grace Hopper", avatar: "GH", text: "Check out Python's sys.getrefcount() and the gc module documentation!" },
    ],
    time: "5 hours ago",
    liked: false,
    tags: ["#python", "#debugging"],
    category: "question",
    scope: "global",
  },
  {
    id: 3,
    author: "Ada Lovelace",
    avatar: "AL",
    role: "Pro",
    institutionId: "stanford",
    content: "Day 15 of my coding streak! Small steps every day make a huge difference. Writing tests today using pytest. TDD is a game changer.\n\nHere's my test setup:\n```python\nimport pytest\n\ndef test_add():\n    assert add(2, 3) == 5\n\ndef test_subtract():\n    assert subtract(5, 3) == 2\n```",
    likes: 56,
    commentsCount: 0,
    commentsList: [],
    time: "1 day ago",
    liked: false,
    tags: ["#python", "#testing"],
    category: "achievement",
    scope: "friends",
  },
  {
    id: 4,
    author: "Linus Torvalds",
    avatar: "LT",
    role: "Advanced",
    institutionId: "stanford",
    content: "Found an excellent tutorial on async/await patterns in Python. The key insight: `asyncio.gather()` runs tasks concurrently, not `await` in sequence.\n\n```python\nimport asyncio\n\nasync def fetch_all():\n    tasks = [fetch(url) for url in urls]\n    results = await asyncio.gather(*tasks)\n    return results\n```\n\nThis cut my API response times by 80%!",
    likes: 89,
    commentsCount: 2,
    commentsList: [
      { author: "Ada Lovelace", avatar: "AL", text: "This is gold! I've been awaiting each call sequentially like an amateur 😅" },
      { author: "Alan Turing", avatar: "AT", text: "Does asyncio.gather handle exceptions individually or does one failure cancel all?" },
    ],
    time: "2 days ago",
    liked: false,
    tags: ["#python", "#async", "#performance"],
    category: "resource",
    scope: "global",
  },
  {
    id: 5,
    author: "Margaret Hamilton",
    avatar: "MH",
    role: "Mentor",
    institutionId: "mit",
    content: "Quick question: What's the most Pythonic way to merge two dictionaries? I've seen `{**a, **b}` and `a | b`. Which do you prefer?",
    likes: 31,
    commentsCount: 1,
    commentsList: [
      { author: "Linus Torvalds", avatar: "LT", text: "Since Python 3.9+, I always use `a | b`. Cleaner and more readable. The `**` unpacking feels hacky now." },
    ],
    time: "3 days ago",
    liked: false,
    tags: ["#python", "#tips"],
    category: "question",
    scope: "friends",
  },
  {
    id: 6,
    author: "Elena Rostova",
    avatar: "ER",
    role: "Fellow Learner",
    institutionId: "stanford",
    content: "Hey campus group! Anyone taking the CS AI systems course this semester? Organizing a weekly Python algorithmic problem-solving sprint on Discord. Let's conquer the leaderboard together! 🚀",
    likes: 18,
    commentsCount: 3,
    commentsList: [
      { author: "Alex Rivers", avatar: "AR", text: "Count me in! What time are you planning to meet?" },
      { author: "Elena Rostova", avatar: "ER", text: "Tuesdays at 7 PM in the engineering quad study lounge." },
      { author: "Julian Vance", avatar: "JV", text: "Just sent you a friend request!" },
    ],
    time: "4 hours ago",
    liked: false,
    tags: ["#studygroups", "#campus", "#algorithms"],
    category: "resource",
    scope: "institution",
  },
  {
    id: 7,
    author: "Alex Rivers",
    avatar: "AR",
    role: "Teaching Assistant",
    institutionId: "stanford",
    content: "Pro-tip for the Python Data Structures lab: Remember that list operations like `pop(0)` are O(n), whereas `collections.deque.popleft()` is O(1). Switching to deque gave a 12x speedup on large benchmark sets!\n\n```python\nfrom collections import deque\n\nq = deque([1, 2, 3, 4, 5])\nq.append(6)\nq.popleft()\n```",
    likes: 47,
    commentsCount: 1,
    commentsList: [
      { author: "Maya Sterling", avatar: "MS", text: "Huge help for the upcoming benchmark evaluation, thanks Alex!" }
    ],
    time: "6 hours ago",
    liked: true,
    tags: ["#datastructures", "#python", "#performance"],
    category: "resource",
    scope: "institution",
  },
];

const mockCampusPeers: CampusPeer[] = [
  { name: "Alex Rivers", handle: "@arivers", avatar: "AR", role: "TA & Python Lead", institutionId: "stanford", isFollowing: false },
  { name: "Maya Sterling", handle: "@msterling", avatar: "MS", role: "AI Researcher", institutionId: "stanford", isFollowing: true },
  { name: "Elena Rostova", handle: "@elena_r", avatar: "ER", role: "CS Sophomore", institutionId: "stanford", isFollowing: false },
  { name: "Julian Vance", handle: "@jvance", avatar: "JV", role: "Software Eng", institutionId: "stanford", isFollowing: false },
];

function PostContent({ content }: { content: string }) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const parts = content.split(/(```[\s\S]*?```)/g);

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="text-neutral-800 dark:text-neutral-200 text-sm leading-relaxed mb-4 space-y-3">
      {parts.map((part, i) => {
        if (part.startsWith("```") && part.endsWith("```")) {
          const match = part.match(/^```(\w*)\n?([\s\S]*?)```$/);
          const lang = match?.[1] || "";
          const code = match?.[2]?.trimEnd() || part.slice(3, -3).trim();

          return (
            <div key={i} className="relative group">
              <div className="flex items-center justify-between bg-[#2D2D2D] text-gray-400 px-3 py-1.5 rounded-t-lg text-[10px] font-mono">
                <span>{lang || "code"}</span>
                <button
                  onClick={() => handleCopy(code, i)}
                  className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-[10px]"
                >
                  {copiedIndex === i ? (
                    <><Check className="size-3" /><span>Copied</span></>
                  ) : (
                    <><Copy className="size-3" /><span>Copy</span></>
                  )}
                </button>
              </div>
              <pre className="bg-[#1E1E1E] text-[#D4D4D4] px-4 py-3 rounded-b-lg overflow-x-auto text-xs font-mono leading-relaxed">
                <code>{code}</code>
              </pre>
            </div>
          );
        }

        return part.split("\n").map((line, j) => (
          <span key={`${i}-${j}`}>
            {line}
            {j < part.split("\n").length - 1 && <br />}
          </span>
        ));
      })}
    </div>
  );
}

export default function CommunityPage() {
  const { user } = useAppContext();
  const [scope, setScope] = useState<CommunityScope>("global");
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPostText, setNewPostText] = useState("");
  const [activeCommentPostId, setActiveCommentPostId] = useState<number | null>(null);
  const [commentInput, setCommentInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<PostCategory>("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [peers, setPeers] = useState<CampusPeer[]>(mockCampusPeers);
  const [isInstitutionDialogOpen, setIsInstitutionDialogOpen] = useState(false);

  const currentInstitution = getInstitutionById(user.institutionId);

  const handleToggleFollowPeer = (handle: string) => {
    setPeers(peers.map(p => {
      if (p.handle === handle) {
        const nextState = !p.isFollowing;
        toast.success(nextState ? `Connected with ${p.name}` : `Unfollowed ${p.name}`);
        return { ...p, isFollowing: nextState };
      }
      return p;
    }));
  };

  const handleCreatePost = () => {
    if (!newPostText.trim()) return;
    const userInitials = (user.firstName[0] || '') + (user.lastName[0] || '');

    const autoTags: string[] = [];
    const lowerContent = newPostText.toLowerCase();
    if (lowerContent.includes("python")) autoTags.push("#python");
    if (lowerContent.includes("algorithm")) autoTags.push("#algorithms");
    if (lowerContent.includes("django")) autoTags.push("#django");
    if (scope === "institution" && currentInstitution) {
      autoTags.push(`#${currentInstitution.slug}`);
    }
    if (autoTags.length === 0) autoTags.push("#python");

    const newPost: Post = {
      id: Date.now(),
      author: user.name,
      avatar: userInitials || "U",
      role: user.role || "Learner",
      institutionId: user.institutionId || undefined,
      content: newPostText,
      likes: 0,
      commentsCount: 0,
      commentsList: [],
      time: "Just now",
      liked: false,
      tags: autoTags,
      category: lowerContent.includes("?") ? "question" : "achievement",
      scope: scope,
    };
    setPosts([newPost, ...posts]);
    setNewPostText("");
    toast.success(
      scope === "institution" && currentInstitution
        ? `Post shared to ${currentInstitution.name} campus feed!`
        : "Post published to community feed!"
    );
  };

  const handleToggleLike = (id: number) => {
    setPosts(
      posts.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            liked: !p.liked,
            likes: p.liked ? p.likes - 1 : p.likes + 1
          };
        }
        return p;
      })
    );
  };

  const handleAddComment = (postId: number) => {
    if (!commentInput.trim()) return;
    const userInitials = (user.firstName[0] || '') + (user.lastName[0] || '');
    setPosts(
      posts.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            commentsCount: p.commentsCount + 1,
            commentsList: [
              ...p.commentsList,
              {
                author: user.name,
                avatar: userInitials || "U",
                text: commentInput,
                institutionId: user.institutionId || undefined,
              },
            ],
          };
        }
        return p;
      })
    );
    setCommentInput("");
  };

  // Filter posts by scope, category, and tag
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      // Scope filter
      let matchesScope = true;
      if (scope === "friends") {
        matchesScope = p.scope === "friends" || p.author === user.name || ["Ada Lovelace", "Linus Torvalds", "Margaret Hamilton"].includes(p.author);
      } else if (scope === "institution") {
        if (!user.institutionId) {
          matchesScope = false;
        } else {
          // If the post matches current user's institution or is tagged with institution scope
          matchesScope = p.institutionId === user.institutionId || p.scope === "institution";
        }
      }

      // Category filter
      const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;

      // Tag filter
      const matchesTag = !selectedTag || p.tags.includes(selectedTag);

      return matchesScope && matchesCategory && matchesTag;
    });
  }, [posts, scope, user.institutionId, user.name, selectedCategory, selectedTag]);

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort();

  const categoryTabs: { key: PostCategory; label: string }[] = [
    { key: "all", label: "All Posts" },
    { key: "question", label: "Questions" },
    { key: "achievement", label: "Achievements" },
    { key: "resource", label: "Resources" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-2xl mx-auto pb-10 select-none text-[#37352F] dark:text-[rgba(255,255,255,0.85)]">
      {/* Header */}
      <div className="border-b border-neutral-100 dark:border-neutral-800 pb-4 mt-4">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mb-1">Community</h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm">Share your progress, ask questions, and connect with peers across Global, Friends, and Institution.</p>
      </div>

      {/* Scope Segmented Control: Global | Friends | Institution */}
      <div className="flex items-center justify-between gap-4">
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

        {scope === "institution" && currentInstitution && (
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <InstitutionLogo institution={currentInstitution} size="xs" />
            <span className="font-semibold text-gray-900 dark:text-white">{currentInstitution.shortName || currentInstitution.name}</span>
          </div>
        )}
      </div>

      {/* INSTITUTION SCOPE EMPTY STATE */}
      {scope === "institution" && !user.institutionId ? (
        <div className="p-8 sm:p-12 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-[#202020]/70 text-center space-y-4 my-8">
          <div className="size-14 rounded-2xl bg-white dark:bg-[#2A2A2A] border border-gray-200 dark:border-gray-700 flex items-center justify-center mx-auto shadow-xs">
            <GraduationCap className="size-7 text-[#0066FF] stroke-[1.75]" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Join your institution to access your campus community.
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-md mx-auto">
              Discover fellow learners, collaborate on projects, and share solutions with peers at your university.
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
          {/* Institution Header Banner & Campus Peer Discovery */}
          {scope === "institution" && currentInstitution && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50/80 to-indigo-50/50 dark:from-blue-950/30 dark:to-indigo-950/20 border border-blue-200/80 dark:border-blue-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  <InstitutionLogo institution={currentInstitution} size="md" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-gray-900 dark:text-white">
                        {currentInstitution.name} Campus Feed
                      </span>
                      {currentInstitution.verified && (
                        <BadgeCheck className="size-3.5 text-[#0066FF] shrink-0 fill-[#0066FF]/15" />
                      )}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Connect with learners and study groups from your institution
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

              {/* Campus Peers Discovery Row */}
              <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#202020]">
                <div className="flex items-center justify-between mb-3 px-1">
                  <span className="text-xs font-bold text-gray-900 dark:text-white">
                    Learners from {currentInstitution.shortName || currentInstitution.name}
                  </span>
                  <span className="text-[11px] text-gray-400 font-mono">
                    {currentInstitution.memberCount.toLocaleString()} on campus
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {peers.map((peer) => (
                    <div
                      key={peer.handle}
                      className="flex items-center justify-between p-2 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-[#252525]/60 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Avatar className="size-7 rounded">
                          <AvatarFallback className="bg-neutral-900 text-white font-semibold text-[10px] rounded">
                            {peer.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                            {peer.name}
                          </div>
                          <div className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                            {peer.role}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleFollowPeer(peer.handle)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                          peer.isFollowing
                            ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            : "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 shadow-2xs"
                        }`}
                      >
                        {peer.isFollowing ? (
                          <>
                            <UserCheck className="size-3 stroke-[2]" />
                            <span>Following</span>
                          </>
                        ) : (
                          <>
                            <UserPlus className="size-3 stroke-[2]" />
                            <span>Connect</span>
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 border-b border-neutral-100 dark:border-neutral-800 pb-3">
            {categoryTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => { setSelectedCategory(tab.key); setSelectedTag(null); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  selectedCategory === tab.key
                    ? "bg-[#37352F] dark:bg-white text-white dark:text-black font-semibold shadow-2xs"
                    : "bg-[#F7F7F5] dark:bg-[#252525] text-[rgba(55,53,47,0.7)] dark:text-gray-400 hover:bg-[#EFEFEF] dark:hover:bg-[#303030] hover:text-[#37352F] dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tag Filter */}
          {allTags.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap">
              {selectedTag && (
                <button
                  onClick={() => setSelectedTag(null)}
                  className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#37352F] dark:bg-white text-white dark:text-black cursor-pointer"
                >
                  ✕ Clear
                </button>
              )}
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                    selectedTag === tag
                      ? "bg-[#2383E2] text-white"
                      : "bg-[#E8F3F7] dark:bg-blue-950/50 text-[#1C3B47] dark:text-blue-300 hover:bg-[#D0E8F0] dark:hover:bg-blue-900/50"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {/* Post Editor */}
          <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 bg-white dark:bg-[#202020] shadow-none mb-8 focus-within:border-neutral-300 dark:focus-within:border-neutral-700 transition-colors">
            <div className="flex gap-4">
              <Avatar className="size-8 rounded shrink-0">
                <AvatarFallback className="bg-neutral-900 dark:bg-white text-white dark:text-black font-medium text-xs rounded">
                  {(user.firstName[0] || '') + (user.lastName[0] || '')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  placeholder={
                    scope === "institution" && currentInstitution
                      ? `Share a tip or ask a question to ${currentInstitution.shortName || currentInstitution.name} learners... Use \`\`\`python for code`
                      : "Share a tip, ask a question, or celebrate a win... Use ```python for code blocks"
                  }
                  className="border-0 shadow-none focus-visible:ring-0 resize-none px-0 py-1.5 bg-transparent text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 min-h-[60px]"
                />
                <div className="flex justify-between items-center mt-2 border-t border-neutral-100 dark:border-neutral-800 pt-2">
                  <div className="flex items-center gap-1 text-neutral-400">
                    <button onClick={() => toast("Image upload coming soon")} className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors hover:text-neutral-900 dark:hover:text-white"><ImageIcon className="size-4" /></button>
                    <button onClick={() => toast("Link embed coming soon")} className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors hover:text-neutral-900 dark:hover:text-white"><LinkIcon className="size-4" /></button>
                    <button onClick={() => toast("Generating AI post suggestions...")} className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors hover:text-neutral-900 dark:hover:text-white"><Sparkles className="size-4" /></button>
                  </div>
                  <div className="flex items-center gap-2">
                    {currentInstitution && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-gray-400 font-medium">
                        <GraduationCap className="size-3" />
                        <span>{currentInstitution.shortName || currentInstitution.name}</span>
                      </span>
                    )}
                    <Button
                      size="sm"
                      onClick={handleCreatePost}
                      disabled={!newPostText.trim()}
                      className="h-8 px-4 bg-black dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-black shadow-none text-xs font-medium rounded-lg disabled:opacity-40 cursor-pointer"
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Posts Stream */}
          <div className="space-y-4">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12 text-neutral-400 text-sm">
                No posts match the selected filters in this scope.
              </div>
            ) : (
              filteredPosts.map((post) => {
                const postInstitution = getInstitutionById(post.institutionId);

                return (
                  <div key={post.id} className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 bg-white dark:bg-[#202020] shadow-none transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8 rounded">
                          <AvatarFallback className="bg-[#F7F7F5] dark:bg-[#2A2A2A] text-neutral-700 dark:text-neutral-300 font-medium text-xs rounded">
                            {post.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-neutral-900 dark:text-white text-sm">{post.author}</span>
                            <span className="text-[10px] bg-[#F7F7F5] dark:bg-[#2A2A2A] text-neutral-600 dark:text-neutral-400 px-1.5 py-0 border border-neutral-200/60 dark:border-neutral-700/60 rounded">{post.role}</span>
                            {postInstitution && (
                              <InstitutionBadge institution={postInstitution} size="sm" />
                            )}
                          </div>
                          <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">{post.time}</div>
                        </div>
                      </div>
                    </div>

                    {/* Post Content */}
                    <PostContent content={post.content} />

                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                        {post.tags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => { setSelectedTag(tag); setSelectedCategory("all"); }}
                            className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#E8F3F7] dark:bg-blue-950/50 text-[#1C3B47] dark:text-blue-300 hover:bg-[#D0E8F0] dark:hover:bg-blue-900/50 transition-colors cursor-pointer"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                      <button
                        onClick={() => handleToggleLike(post.id)}
                        className={`flex items-center gap-1.5 text-xs transition-colors cursor-pointer ${
                          post.liked ? "text-rose-600 font-medium" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                        }`}
                      >
                        <Heart className={`size-4 ${post.liked ? "fill-rose-600 text-rose-600" : ""}`} /> {post.likes}
                      </button>

                      <button
                        onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                        className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                      >
                        <MessageSquare className="size-4" /> {post.commentsCount}
                      </button>

                      <button
                        onClick={() => toast("Post link copied to clipboard")}
                        className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors ml-auto cursor-pointer"
                      >
                        <Share2 className="size-4" />
                      </button>
                    </div>

                    {/* Comments Expansion */}
                    {activeCommentPostId === post.id && (
                      <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-3 animate-in fade-in duration-200">
                        <div className="space-y-2">
                          {post.commentsList.map((comment, i) => (
                            <div key={i} className="bg-[#F7F7F5] dark:bg-[#252525] p-3 rounded-lg text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed flex items-start gap-2.5">
                              <Avatar className="size-6 rounded shrink-0 mt-0.5">
                                <AvatarFallback className="bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-semibold text-[9px] rounded">
                                  {comment.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-semibold text-neutral-900 dark:text-white text-[11px]">{comment.author}</span>
                                </div>
                                <p className="mt-0.5 text-neutral-700 dark:text-neutral-300">{comment.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddComment(post.id)}
                            placeholder="Write a comment..."
                            className="flex-1 bg-[#F7F7F5] dark:bg-[#252525] border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-neutral-400"
                          />
                          <Button
                            size="sm"
                            onClick={() => handleAddComment(post.id)}
                            className="h-8 px-3 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 text-xs rounded-lg cursor-pointer"
                          >
                            <Send className="size-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
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
