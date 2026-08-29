"use client";

import React, { useRef, useMemo } from "react";

interface PythonEditorProps {
  value: string;
  onChange: (value: string) => void;
  onRun?: () => void;
  readOnly?: boolean;
  minHeight?: string;
  maxHeight?: string;
  ariaLabel?: string;
}

/**
 * Lightweight, accessible Python code editor with syntax highlighting,
 * line numbering, 4-space tab indentation, and keyboard shortcuts.
 */
export function PythonEditor({
  value,
  onChange,
  onRun,
  readOnly = false,
  minHeight = "280px",
  maxHeight = "520px",
  ariaLabel = "Python Code Editor",
}: PythonEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  const lines = useMemo(() => {
    return value.split("\n");
  }, [value]);

  // Synchronize scrolling between textarea and highlighted code overlay
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (preRef.current) {
      preRef.current.scrollTop = e.currentTarget.scrollTop;
      preRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Cmd+Enter or Ctrl+Enter to trigger onRun
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && onRun) {
      e.preventDefault();
      onRun();
      return;
    }

    // 4-space Tab Indentation
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const updated = value.substring(0, start) + "    " + value.substring(end);
      onChange(updated);

      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      });
    }
  };

  // Tokenize and syntax highlight Python code safely
  const highlightedCode = useMemo(() => {
    if (!value) return "";

    const escapeHtml = (text: string) =>
      text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    const lines = value.split("\n");
    const highlightedLines = lines.map((line) => {
      let remaining = line;
      let lineHtml = "";

      while (remaining.length > 0) {
        // 1. Comments
        const commentIdx = remaining.indexOf("#");
        if (commentIdx === 0) {
          lineHtml += `<span class="text-neutral-500 italic">${escapeHtml(remaining)}</span>`;
          break;
        }

        // 2. Double-quoted strings
        const doubleStrMatch = remaining.match(/^(?:f|r|b)?(".*?")/);
        if (doubleStrMatch) {
          lineHtml += `<span class="text-emerald-600 dark:text-emerald-400 font-medium">${escapeHtml(doubleStrMatch[0])}</span>`;
          remaining = remaining.substring(doubleStrMatch[0].length);
          continue;
        }

        // 3. Single-quoted strings
        const singleStrMatch = remaining.match(/^(?:f|r|b)?('.*?')/);
        if (singleStrMatch) {
          lineHtml += `<span class="text-emerald-600 dark:text-emerald-400 font-medium">${escapeHtml(singleStrMatch[0])}</span>`;
          remaining = remaining.substring(singleStrMatch[0].length);
          continue;
        }

        // 4. Numbers
        const numMatch = remaining.match(/^(\b\d+(?:\.\d+)?\b)/);
        if (numMatch) {
          lineHtml += `<span class="text-amber-600 dark:text-amber-400 font-medium">${escapeHtml(numMatch[0])}</span>`;
          remaining = remaining.substring(numMatch[0].length);
          continue;
        }

        // 5. Keywords
        const keywordMatch = remaining.match(
          /^(\b(?:def|class|if|elif|else|for|while|in|return|import|from|as|try|except|finally|with|pass|break|continue|lambda|and|or|not|is|None|True|False|async|await)\b)/
        );
        if (keywordMatch) {
          lineHtml += `<span class="text-purple-600 dark:text-purple-400 font-bold">${escapeHtml(keywordMatch[0])}</span>`;
          remaining = remaining.substring(keywordMatch[0].length);
          continue;
        }

        // 6. Built-in functions
        const builtinMatch = remaining.match(
          /^(\b(?:print|input|float|int|str|len|range|type|sum|min|max|abs|round)\b)/
        );
        if (builtinMatch) {
          lineHtml += `<span class="text-sky-600 dark:text-sky-400 font-semibold">${escapeHtml(builtinMatch[0])}</span>`;
          remaining = remaining.substring(builtinMatch[0].length);
          continue;
        }

        // 7. Plain characters
        const nextSpecial = remaining.search(/["'#\b\d]/);
        if (nextSpecial > 0) {
          lineHtml += escapeHtml(remaining.substring(0, nextSpecial));
          remaining = remaining.substring(nextSpecial);
        } else {
          lineHtml += escapeHtml(remaining[0]);
          remaining = remaining.substring(1);
        }
      }

      return lineHtml || "&nbsp;";
    });

    return highlightedLines.join("<br/>");
  }, [value]);

  return (
    <div
      className="relative flex rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121212] overflow-hidden text-neutral-900 dark:text-neutral-100 shadow-2xs font-mono text-sm leading-relaxed"
      style={{ minHeight, maxHeight }}
    >
      {/* Line Numbers Gutter */}
      <div
        aria-hidden="true"
        className="select-none py-3.5 px-3 bg-neutral-50 dark:bg-[#181818] border-r border-neutral-200/80 dark:border-neutral-800 text-right text-xs text-neutral-400 dark:text-neutral-600 font-mono flex flex-col pointer-events-none"
        style={{ minWidth: "3.25rem" }}
      >
        {lines.map((_, i) => (
          <span key={i} className="leading-relaxed">
            {i + 1}
          </span>
        ))}
      </div>

      {/* Code Textarea & Syntax Overlay Container */}
      <div className="relative flex-1 h-full overflow-hidden">
        {/* Syntax Highlighting Background Overlay */}
        <pre
          ref={preRef}
          aria-hidden="true"
          className="absolute inset-0 m-0 p-3.5 font-mono text-sm leading-relaxed overflow-hidden pointer-events-none whitespace-pre-wrap break-words bg-transparent select-none"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />

        {/* Authoritative Interactive Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          readOnly={readOnly}
          aria-label={ariaLabel}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          className="relative z-10 w-full h-full p-3.5 font-mono text-sm leading-relaxed resize-none bg-transparent text-transparent caret-neutral-900 dark:caret-white focus:outline-none focus:ring-0 whitespace-pre-wrap break-words border-none"
          style={{ minHeight, maxHeight }}
        />
      </div>
    </div>
  );
}
