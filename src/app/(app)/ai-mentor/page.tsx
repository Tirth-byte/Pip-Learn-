"use client";

import { useState } from "react";
import { Sparkles, Send, Bot, User, Code2, HelpCircle, Bug, Check } from "lucide-react";

type Message = {
  id: string;
  sender: "user" | "ai";
  text: string;
  codeSnippet?: string;
};

const initialMessages: Message[] = [
  {
    id: "1",
    sender: "ai",
    text: "Hello! I am your Pip AI Mentor. How can I help you with your Python code today? You can ask me to explain concepts, review code, or solve algorithm problems."
  }
];

export default function AIMentorPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsLoading(true);

    setTimeout(() => {
      let aiText = "Here is an explanation tailored for your query:";
      let snippet: string | undefined = undefined;

      if (query.toLowerCase().includes("list") || query.toLowerCase().includes("tuple")) {
        aiText = "Lists and Tuples are two of the most fundamental data structures in Python:";
        snippet = `# Example of List (mutable):
my_list = [1, 2, 3]
my_list.append(4)  # Allowed!

# Example of Tuple (immutable):
my_tuple = (1, 2, 3)
# my_tuple[0] = 99  # TypeError: 'tuple' object does not support item assignment!`;
      } else if (query.toLowerCase().includes("loop") || query.toLowerCase().includes("for")) {
        aiText = "In Python, `for` loops iterate over any sequence (like lists or ranges):";
        snippet = `for i in range(5):
    print(f"Index: {i}")`;
      } else {
        aiText = `Great question! When writing clean Python code, remember to follow PEP 8 standards, keep functions small, and use type hints where helpful.`;
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: aiText,
        codeSnippet: snippet
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto w-full pb-16 px-6 text-[#37352F] flex flex-col h-[calc(100vh-5.5rem)]">
      
      {/* Notion Page Header */}
      <div className="pt-6 pb-3 border-b border-[rgba(55,53,47,0.09)] mb-4 shrink-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-3xl select-none">✨</span>
          <h1 className="text-2xl font-bold tracking-tight text-[#37352F]">
            Pip AI Mentor
          </h1>
          <span className="notion-tag notion-tag-purple">Notion AI Engine</span>
        </div>
        <p className="text-xs text-[rgba(55,53,47,0.65)]">
          Ask questions, get debugging hints, or request code reviews in real-time.
        </p>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 shrink-0">
        <button
          onClick={() => handleSend("Explain the difference between a list and a tuple in Python.")}
          className="notion-tag notion-tag-blue hover:bg-[#D5E8F0] cursor-pointer py-1 px-2.5 text-xs transition-colors"
        >
          💡 List vs Tuple
        </button>
        <button
          onClick={() => handleSend("How do Python for loops work with range()?")}
          className="notion-tag notion-tag-green hover:bg-[#D6E8D4] cursor-pointer py-1 px-2.5 text-xs transition-colors"
        >
          ⚡ For Loops
        </button>
        <button
          onClick={() => handleSend("What is object-oriented programming in Python?")}
          className="notion-tag notion-tag-purple hover:bg-[#E5D2F8] cursor-pointer py-1 px-2.5 text-xs transition-colors"
        >
          🧠 OOP Concepts
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 min-h-0 text-xs">
        {messages.map((m) => (
          <div key={m.id} className="space-y-2">
            <div className={`p-3.5 rounded border ${
              m.sender === "ai" ? "notion-callout-gray" : "bg-[#F7F7F5] border-[rgba(55,53,47,0.12)] text-[#37352F]"
            }`}>
              <div className="flex items-center gap-1.5 font-semibold text-xs mb-1">
                {m.sender === "ai" ? (
                  <>
                    <Sparkles className="size-3.5 text-[#8846C7]" />
                    <span className="text-[#4D2875]">Pip AI Assistant</span>
                  </>
                ) : (
                  <>
                    <span className="size-4 rounded-full bg-[#37352F] text-white flex items-center justify-center text-[10px] font-bold">A</span>
                    <span>You</span>
                  </>
                )}
              </div>
              <div className="text-xs leading-relaxed text-[#37352F]">
                {m.text}
              </div>

              {m.codeSnippet && (
                <div className="mt-3 bg-white border border-[rgba(55,53,47,0.12)] rounded p-3 font-mono text-[11px] text-[#37352F] leading-relaxed">
                  <pre><code>{m.codeSnippet}</code></pre>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="notion-callout notion-callout-gray animate-pulse text-xs">
            <Sparkles className="size-3.5 text-[#8846C7] mr-1.5 inline" />
            <span>Pip AI is thinking...</span>
          </div>
        )}
      </div>

      {/* Notion AI Prompt Input Bar */}
      <div className="mt-3 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 bg-[#F7F7F5] border border-[rgba(55,53,47,0.16)] rounded p-1.5 focus-within:bg-white focus-within:border-[#2383E2] transition-colors"
        >
          <Sparkles className="size-4 text-[#8846C7] ml-2 shrink-0" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Pip AI anything about Python..."
            className="flex-1 bg-transparent text-xs text-[#37352F] outline-none px-2 font-medium"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="notion-btn-primary h-7 px-3 text-xs shrink-0 disabled:opacity-40"
          >
            <Send className="size-3 mr-1" /> Ask
          </button>
        </form>
      </div>

    </div>
  );
}
