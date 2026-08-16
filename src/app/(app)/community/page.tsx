"use client";

import { useState, useCallback } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Heart, Share2, Sparkles, Image as ImageIcon, Link as LinkIcon, Send, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { useAppContext } from "@/context/app-context";

type PostCategory = "all" | "question" | "achievement" | "resource";

type Comment = {
  author: string;
  avatar: string;
  text: string;
};

type Post = {
  id: number;
  author: string;
  avatar: string;
  role: string;
  content: string;
  likes: number;
  commentsCount: number;
  commentsList: Comment[];
  time: string;
  liked: boolean;
  tags: string[];
  category: PostCategory;
};

const initialPosts: Post[] = [
  {
    id: 1,
    author: "Grace Hopper",
    avatar: "GH",
    role: "Senior Learner",
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
  },
  {
    id: 2,
    author: "Alan Turing",
    avatar: "AT",
    role: "Beginner",
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
  },
  {
    id: 3,
    author: "Ada Lovelace",
    avatar: "AL",
    role: "Pro",
    content: "Day 15 of my coding streak! Small steps every day make a huge difference. Writing tests today using pytest. TDD is a game changer.\n\nHere's my test setup:\n```python\nimport pytest\n\ndef test_add():\n    assert add(2, 3) == 5\n\ndef test_subtract():\n    assert subtract(5, 3) == 2\n```",
    likes: 56,
    commentsCount: 0,
    commentsList: [],
    time: "1 day ago",
    liked: false,
    tags: ["#python", "#testing"],
    category: "achievement",
  },
  {
    id: 4,
    author: "Linus Torvalds",
    avatar: "LT",
    role: "Advanced",
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
  },
  {
    id: 5,
    author: "Margaret Hamilton",
    avatar: "MH",
    role: "Mentor",
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
  },
];

// Render post content with code block support
function PostContent({ content }: { content: string }) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const parts = content.split(/(```[\s\S]*?```)/g);

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="text-neutral-800 text-sm leading-relaxed mb-4 space-y-3">
      {parts.map((part, i) => {
        if (part.startsWith("```") && part.endsWith("```")) {
          // Extract language and code
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

        // Regular text — render paragraphs
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
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPostText, setNewPostText] = useState("");
  const [activeCommentPostId, setActiveCommentPostId] = useState<number | null>(null);
  const [commentInput, setCommentInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<PostCategory>("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleCreatePost = () => {
    if (!newPostText.trim()) return;
    const userInitials = (user.firstName[0] || '') + (user.lastName[0] || '');

    // Auto-detect tags from content
    const autoTags: string[] = [];
    const lowerContent = newPostText.toLowerCase();
    if (lowerContent.includes("python")) autoTags.push("#python");
    if (lowerContent.includes("algorithm")) autoTags.push("#algorithms");
    if (lowerContent.includes("django")) autoTags.push("#django");
    if (autoTags.length === 0) autoTags.push("#python");

    const newPost: Post = {
      id: Date.now(),
      author: user.name,
      avatar: userInitials || "U",
      role: "Learner",
      content: newPostText,
      likes: 0,
      commentsCount: 0,
      commentsList: [],
      time: "Just now",
      liked: false,
      tags: autoTags,
      category: lowerContent.includes("?") ? "question" : "achievement",
    };
    setPosts([newPost, ...posts]);
    setNewPostText("");
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
              { author: user.name, avatar: userInitials || "U", text: commentInput },
            ],
          };
        }
        return p;
      })
    );
    setCommentInput("");
  };

  // Filter posts
  const filteredPosts = posts.filter((p) => {
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesTag = !selectedTag || p.tags.includes(selectedTag);
    return matchesCategory && matchesTag;
  });

  // Collect all unique tags
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort();

  const categoryTabs: { key: PostCategory; label: string }[] = [
    { key: "all", label: "All Posts" },
    { key: "question", label: "Questions" },
    { key: "achievement", label: "Achievements" },
    { key: "resource", label: "Resources" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-2xl mx-auto pb-10">
      <div className="border-b border-neutral-100 pb-4 mt-4">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 mb-1">Community</h1>
        <p className="text-neutral-500 text-sm">Share your progress, ask questions, and connect with peers.</p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 border-b border-neutral-100 pb-3">
        {categoryTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setSelectedCategory(tab.key); setSelectedTag(null); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              selectedCategory === tab.key
                ? "bg-[#37352F] text-white"
                : "bg-[#F7F7F5] text-[rgba(55,53,47,0.7)] hover:bg-[#EFEFEF] hover:text-[#37352F]"
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
              className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#37352F] text-white cursor-pointer"
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
                  : "bg-[#E8F3F7] text-[#1C3B47] hover:bg-[#D0E8F0]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Post Editor */}
      <div className="border border-neutral-200 rounded-md p-4 bg-white shadow-none mb-8 focus-within:border-neutral-300 transition-colors">
        <div className="flex gap-4">
          <Avatar className="size-8 rounded shrink-0">
            <AvatarFallback className="bg-neutral-900 text-white font-medium text-xs rounded">{(user.firstName[0] || '') + (user.lastName[0] || '')}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              placeholder="Share a tip, ask a question, or celebrate a win... Use ```python for code blocks"
              className="border-0 shadow-none focus-visible:ring-0 resize-none px-0 py-1.5 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 min-h-[60px]"
            />
            <div className="flex justify-between items-center mt-2 border-t border-neutral-100 pt-2">
              <div className="flex items-center gap-1 text-neutral-400">
                <button onClick={() => toast("Image upload coming soon")} className="p-1.5 hover:bg-neutral-100 rounded transition-colors hover:text-neutral-900"><ImageIcon className="size-4" /></button>
                <button onClick={() => toast("Link embed coming soon")} className="p-1.5 hover:bg-neutral-100 rounded transition-colors hover:text-neutral-900"><LinkIcon className="size-4" /></button>
                <button onClick={() => toast("Generating AI post suggestions...")} className="p-1.5 hover:bg-neutral-100 rounded transition-colors hover:text-neutral-900"><Sparkles className="size-4" /></button>
              </div>
              <Button
                size="sm"
                onClick={handleCreatePost}
                disabled={!newPostText.trim()}
                className="h-8 px-4 bg-black hover:bg-neutral-800 text-white shadow-none text-xs font-medium rounded-md disabled:opacity-40"
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Stream */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 text-neutral-400 text-sm">
            No posts match the selected filters.
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div key={post.id} className="border border-neutral-200 rounded-md p-5 bg-white shadow-none transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="size-8 rounded">
                    <AvatarFallback className="bg-[#F7F7F5] text-neutral-700 font-medium text-xs rounded">{post.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-neutral-900 text-sm">{post.author}</span>
                      <span className="text-[10px] bg-[#F7F7F5] text-neutral-600 px-1.5 py-0 border border-neutral-200/60 rounded">{post.role}</span>
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">{post.time}</div>
                  </div>
                </div>
              </div>

              {/* Post Content with code block support */}
              <PostContent content={post.content} />

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex items-center gap-1.5 mb-3">
                  {post.tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => { setSelectedTag(tag); setSelectedCategory("all"); }}
                      className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#E8F3F7] text-[#1C3B47] hover:bg-[#D0E8F0] transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4 pt-1 border-t border-neutral-100">
                <button
                  onClick={() => handleToggleLike(post.id)}
                  className={`flex items-center gap-1.5 text-xs transition-colors cursor-pointer ${
                    post.liked ? "text-rose-600 font-medium" : "text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  <Heart className={`size-4 ${post.liked ? "fill-rose-600 text-rose-600" : ""}`} /> {post.likes}
                </button>

                <button
                  onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                  className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
                >
                  <MessageSquare className="size-4" /> {post.commentsCount}
                </button>

                <button
                  onClick={() => toast("Post link copied to clipboard")}
                  className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 transition-colors ml-auto cursor-pointer"
                >
                  <Share2 className="size-4" />
                </button>
              </div>

              {/* Comments Expansion */}
              {activeCommentPostId === post.id && (
                <div className="mt-4 pt-4 border-t border-neutral-100 space-y-3 animate-in fade-in duration-200">
                  <div className="space-y-2">
                    {post.commentsList.map((comment, i) => (
                      <div key={i} className="bg-[#F7F7F5] p-3 rounded text-xs text-neutral-800 leading-relaxed flex items-start gap-2.5">
                        <Avatar className="size-6 rounded shrink-0 mt-0.5">
                          <AvatarFallback className="bg-neutral-200 text-neutral-700 font-semibold text-[9px] rounded">
                            {comment.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="font-semibold text-neutral-900 text-[11px]">{comment.author}</span>
                          <p className="mt-0.5 text-neutral-700">{comment.text}</p>
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
                      className="flex-1 bg-[#F7F7F5] border border-neutral-200 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-neutral-400"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleAddComment(post.id)}
                      className="h-7 px-3 bg-black text-white hover:bg-neutral-800 text-xs rounded"
                    >
                      <Send className="size-3" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
