"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Heart, Share2, Sparkles, Image as ImageIcon, Link as LinkIcon, Send } from "lucide-react";

type Post = {
  id: number;
  author: string;
  avatar: string;
  role: string;
  content: string;
  likes: number;
  commentsCount: number;
  commentsList: string[];
  time: string;
  liked: boolean;
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
      "Congrats Grace! Which design pattern did you use for the CLI?",
      "Great job! The OOP module is definitely one of the highlights."
    ],
    time: "2 hours ago",
    liked: true
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
      "Check out Python's sys.getrefcount() and the gc module documentation!"
    ],
    time: "5 hours ago",
    liked: false
  },
  {
    id: 3,
    author: "Ada Lovelace",
    avatar: "AL",
    role: "Pro",
    content: "Day 15 of my coding streak! Small steps every day make a huge difference. Writing tests today using pytest. TDD is a game changer.",
    likes: 56,
    commentsCount: 0,
    commentsList: [],
    time: "1 day ago",
    liked: false
  }
];

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPostText, setNewPostText] = useState("");
  const [activeCommentPostId, setActiveCommentPostId] = useState<number | null>(null);
  const [commentInput, setCommentInput] = useState("");

  const handleCreatePost = () => {
    if (!newPostText.trim()) return;
    const newPost: Post = {
      id: Date.now(),
      author: "John Doe",
      avatar: "JD",
      role: "Learner",
      content: newPostText,
      likes: 0,
      commentsCount: 0,
      commentsList: [],
      time: "Just now",
      liked: false
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
    setPosts(
      posts.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            commentsCount: p.commentsCount + 1,
            commentsList: [...p.commentsList, commentInput]
          };
        }
        return p;
      })
    );
    setCommentInput("");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-2xl mx-auto pb-10">
      <div className="border-b border-neutral-100 pb-4 mt-4">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 mb-1">Community</h1>
        <p className="text-neutral-500 text-sm">Share your progress, ask questions, and connect with peers.</p>
      </div>

      {/* Post Editor */}
      <div className="border border-neutral-200 rounded-md p-4 bg-white shadow-none mb-8 focus-within:border-neutral-300 transition-colors">
        <div className="flex gap-4">
          <Avatar className="size-8 rounded shrink-0">
            <AvatarFallback className="bg-neutral-900 text-white font-medium text-xs rounded">JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              placeholder="Share a tip, ask a question, or celebrate a win..."
              className="border-0 shadow-none focus-visible:ring-0 resize-none px-0 py-1.5 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 min-h-[60px]"
            />
            <div className="flex justify-between items-center mt-2 border-t border-neutral-100 pt-2">
              <div className="flex items-center gap-1 text-neutral-400">
                <button className="p-1.5 hover:bg-neutral-100 rounded transition-colors hover:text-neutral-900"><ImageIcon className="size-4" /></button>
                <button className="p-1.5 hover:bg-neutral-100 rounded transition-colors hover:text-neutral-900"><LinkIcon className="size-4" /></button>
                <button className="p-1.5 hover:bg-neutral-100 rounded transition-colors hover:text-neutral-900"><Sparkles className="size-4" /></button>
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
        {posts.map((post) => (
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

            <p className="text-neutral-800 text-sm leading-relaxed mb-4">{post.content}</p>

            <div className="flex items-center gap-4 pt-1 border-t border-neutral-100">
              <button
                onClick={() => handleToggleLike(post.id)}
                className={`flex items-center gap-1.5 text-xs transition-colors ${
                  post.liked ? "text-rose-600 font-medium" : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                <Heart className={`size-4 ${post.liked ? "fill-rose-600 text-rose-600" : ""}`} /> {post.likes}
              </button>

              <button
                onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                <MessageSquare className="size-4" /> {post.commentsCount}
              </button>

              <button className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 transition-colors ml-auto">
                <Share2 className="size-4" />
              </button>
            </div>

            {/* Comments Expansion */}
            {activeCommentPostId === post.id && (
              <div className="mt-4 pt-4 border-t border-neutral-100 space-y-3 animate-in fade-in duration-200">
                <div className="space-y-2">
                  {post.commentsList.map((comment, i) => (
                    <div key={i} className="bg-[#F7F7F5] p-2.5 rounded text-xs text-neutral-800 leading-relaxed">
                      {comment}
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
        ))}
      </div>
    </div>
  );
}
