# PipLearn Platform — Complete Overhaul Implementation Plan

## Background

PipLearn is a full-featured Python learning platform built with **Next.js 16 + React 19 + Tailwind CSS v4 + TypeScript**. The UI follows a Notion-inspired design language. The project has a solid foundation but has several quality gaps, broken behaviors, and areas that need modernization.

---

## Audit Findings — What's Wrong Today

### 🔴 Broken / Non-functional
1. **Landing page redirects logged-out users to `/login` immediately** — the `useEffect` in `(marketing)/page.tsx` forces a redirect even for unauthenticated visitors, so the landing page is never visible to new users
2. **Landing page is inside `(marketing)` group but has auth-guard logic** — the marketing layout and the landing page are meant for public visitors; the auth check is completely wrong here
3. **`(marketing)/login` & `(marketing)/signup`** — not yet explored but likely linked from a broken landing page flow
4. **Sandbox "Run Code" is fake** — it only checks if the function name is present and does not evaluate code. Works superficially but feels broken
5. **AI Mentor responses are hardcoded pattern-matches** — very limited; only responds to "list", "tuple", "loop"/"for". Any other query gets a generic PEP 8 answer
6. **Heatmap dates are hardcoded** — says "Jan 2026 → Aug 2026" with completely static/fabricated data
7. **Dashboard gallery shows only 2 modules** — very sparse, especially the Table View which shows only 3 rows

### 🟡 Incomplete / Missing polish
8. **No dark mode toggle** — CSS variables are defined for `.dark` but no toggle exists in the app
9. **Leaderboard is too sparse** — only 5 hardcoded users, no filters, no time period selector
10. **Community page** — comments are anonymous (no user name on them), no code snippet sharing
11. **Practice page** — 5 problems only; no XP count shown per problem; filter doesn't persist
12. **Courses page** — only Python Masterclass is clickable, all others fire a "coming soon" toast
13. **Profile page** — not seen yet; needs audit
14. **Settings page** — dark mode toggle is likely non-functional (`.dark` class must be toggled on `<html>`)
15. **Sandbox editor** — no syntax highlighting, no bracket pairing, no word-wrap toggle
16. **Top nav** — `top-nav.tsx` file is 5KB but its exact state is unknown; needs review
17. **No `<meta>` SEO tags** beyond defaults in root layout
18. **`onboarding/` route** — exists but unknown state
19. **`portfolio/`, `projects/`, `admin/` directories** — unknown state

---

## Proposed Changes (Phase by Phase)

---

### Phase 1 — Critical Bug Fixes

#### [MODIFY] [`(marketing)/page.tsx`](file:///Users/raj/Developer/pip_learn_platform/src/app/(marketing)/page.tsx)
- **Remove the `useEffect` auth redirect** — this page is a public landing page. Remove the `isAuthenticated` check and the `router.push('/login')` redirect entirely. The page should be visible to all visitors.
- Keep the rest of the page content intact.

#### [MODIFY] [`(marketing)/layout.tsx`](file:///Users/raj/Developer/pip_learn_platform/src/app/(marketing)/layout.tsx)
- **Fix the sticky header** — Currently `max-w-7xl mx-auto` is on the `<header>` element, which breaks the full-width sticky background. Move the max-width constraint to an inner wrapper.
- **Add a proper "sticky" background** — ensure the backdrop blur covers full width.

#### [MODIFY] [`globals.css`](file:///Users/raj/Developer/pip_learn_platform/src/app/globals.css)
- **Fix dark mode toggle mechanism** — The `.dark` class needs to be applied to `:root` / `html` for it to work. Currently the `@custom-variant dark` uses `&:is(.dark *)` which works for children but `html` itself won't pick it up. This needs testing and potential fix.
- **Add smooth theme transition** — add `transition: color 0.2s, background-color 0.2s` to body.

---

### Phase 2 — Dashboard Page Overhaul

#### [MODIFY] [`(app)/dashboard/page.tsx`](file:///Users/raj/Developer/pip_learn_platform/src/app/(app)/dashboard/page.tsx)
- **Expand Curriculum Progress** to show all 15 modules (currently 2 in gallery, 3 in table)
- **Make heatmap dynamic** — generate the 52-week grid based on current date, properly labeling months
- **Add XP progress bar to properties panel** — show a mini visual progress bar towards next level
- **Add "Today's Goals" section** — a quick-win checklist (3 tasks) with checkboxes
- **Add quick-action shortcuts** — "Continue Learning", "Open Sandbox", "Ask AI Mentor" buttons

---

### Phase 3 — Sandbox / Code Editor Improvements

#### [MODIFY] [`(app)/sandbox/page.tsx`](file:///Users/raj/Developer/pip_learn_platform/src/app/(app)/sandbox/page.tsx)
- **Expand problems list** from 5 to 12 problems (add Fibonacci, FizzBuzz, Palindrome Check, Anagram Detection, Max Subarray, Binary Search, Longest Common Prefix, Count Vowels)
- **Better "Run Code" simulation** — implement smarter validation: check for syntax patterns, `return` statement, correct indentation, expected variable names  
- **Add a "Hint" button** — shows a single helpful hint for each problem
- **Add syntax color highlighting** — use CSS-based token coloring in the textarea using a `<pre>` overlay technique (no external deps)
- **Add keyboard shortcut** — `Ctrl+Enter` / `Cmd+Enter` to run code
- **Add line count to the output panel** — show character count, line count
- **Add problem difficulty progression** — show "You've solved X / Y problems" badge
- **Improve XP feedback** — animate the XP award badge with a brief flash animation

---

### Phase 4 — AI Mentor Page Improvements

#### [MODIFY] [`(app)/ai-mentor/page.tsx`](file:///Users/raj/Developer/pip_learn_platform/src/app/(app)/ai-mentor/page.tsx)
- **Massively expand the response knowledge base** — add responses for 20+ Python topics: decorators, generators, context managers, async/await, type hints, dataclasses, lambda, comprehensions, error handling, file I/O, OOP, modules, pip/packages, f-strings, walrus operator, match-case, structural pattern matching, multiprocessing, etc.
- **Add smart keyword matching** — use a multi-keyword scoring system instead of simple `includes`
- **Add "Follow-up suggestions"** — after each AI response, show 2-3 contextually related follow-up chips
- **Add message timestamps**
- **Add "Copy response" button** on AI messages
- **Auto-scroll to bottom** on new messages (currently missing)
- **Add more quick prompts** — expand from 3 to 8 quick-prompt chips

---

### Phase 5 — Courses Page Improvements

#### [MODIFY] [`(app)/courses/page.tsx`](file:///Users/raj/Developer/pip_learn_platform/src/app/(app)/courses/page.tsx)
- **Add 4 more courses** — FastAPI & async Python, Machine Learning with scikit-learn, DevOps/Docker for Python devs, Python for Finance (8 courses total)
- **Make all courses have a syllabus page** (or show a rich "coming soon" with module outline preview)
- **Add a filter by level** (Beginner/Intermediate/Advanced) alongside the existing search
- **Add progress percentage** for In Progress courses
- **Add estimated completion time**

---

### Phase 6 — Practice Problems Expansion

#### [MODIFY] [`(app)/practice/page.tsx`](file:///Users/raj/Developer/pip_learn_platform/src/app/(app)/practice/page.tsx)
- **Expand from 5 to 20 problems** spanning all major algorithm categories
- **Add XP reward display** per problem (Easy = 10 XP, Medium = 25 XP, Hard = 50 XP)
- **Add progress stats banner** — "X solved, Y remaining, Z total XP from practice"
- **Persist selected filters** across navigations (use URL params)
- **Add "Random Problem" button**

---

### Phase 7 — Leaderboard Improvements

#### [MODIFY] [`(app)/leaderboard/page.tsx`](file:///Users/raj/Developer/pip_learn_platform/src/app/(app)/leaderboard/page.tsx)
- **Expand to 15 users** with realistic data
- **Add time period selector** — All Time, This Week, This Month
- **Add podium design** for top 3 (medal icons + different row styling)
- **Highlight current user row more prominently**
- **Add XP change trend** — show +/- delta from previous period

---

### Phase 8 — Community Page Improvements

#### [MODIFY] [`(app)/community/page.tsx`](file:///Users/raj/Developer/pip_learn_platform/src/app/(app)/community/page.tsx)
- **Show commenter names** — comments currently render raw strings without author attribution
- **Add code block sharing** — posts with triple-backtick content render as code blocks
- **Add category tags to posts** — #python, #algorithms, #debugging, etc.
- **Add post filtering** — All, Questions, Achievements, Resources tabs
- **Improve the "Just now" timestamp** — make it show actual time since posting within the session

---

### Phase 9 — Settings Page Dark Mode Fix

#### [MODIFY] [`(app)/settings/page.tsx`](file:///Users/raj/Developer/pip_learn_platform/src/app/(app)/settings/page.tsx)
- **Make the dark mode toggle actually work** — apply/remove `.dark` class on `document.documentElement` (the `<html>` element), persist choice in localStorage
- **Wire up font size preference** — store in localStorage and apply to `html` font-size
- **Fix the Appearance tab** to properly show Light/Dark/System options as radio-style selectors

---

### Phase 10 — Top Nav & Layout Polish

#### [MODIFY] [`top-nav.tsx`](file:///Users/raj/Developer/pip_learn_platform/src/components/layout/top-nav.tsx)
- **Add breadcrumbs** — show current route as breadcrumbs
- **Add dark mode toggle icon** in the top nav (moon/sun icon)
- **Fix any broken states**

#### [MODIFY] [`app-sidebar.tsx`](file:///Users/raj/Developer/pip_learn_platform/src/components/layout/app-sidebar.tsx)
- **Add XP/streak micro-summary** in the user footer area
- **Add active state animation** — smooth indicator slide

#### [MODIFY] [`(app)/layout.tsx`](file:///Users/raj/Developer/pip_learn_platform/src/app/(app)/layout.tsx)
- **Improve loading state** — instead of "Redirecting to Login...", show a proper skeleton/spinner

---

### Phase 11 — SEO & Root Layout

#### [MODIFY] [`app/layout.tsx`](file:///Users/raj/Developer/pip_learn_platform/src/app/layout.tsx)
- **Add proper SEO metadata** — title template, description, Open Graph tags, robots config
- **Add Google Fonts** — import Inter or Geist as the primary sans-serif font

---

### Phase 12 — Login & Signup Pages Polish

#### Audit and improve `(marketing)/login/` and `(marketing)/signup/`
- Ensure both pages are visually consistent with the Notion design language
- Ensure login properly calls `context.login()` and redirects to `/dashboard`
- Ensure signup form has real-time validation

---

## Execution Order

| Phase | Area | Priority | Estimated Effort |
|-------|------|----------|-----------------|
| 1 | Bug Fixes (landing page redirect, dark mode CSS) | 🔴 Critical | Low |
| 2 | Dashboard Overhaul | 🔴 High | Medium |
| 3 | Sandbox Improvements | 🔴 High | High |
| 4 | AI Mentor Expansion | 🟡 High | Medium |
| 5 | Courses Page | 🟡 Medium | Medium |
| 6 | Practice Problems | 🟡 Medium | Medium |
| 7 | Leaderboard | 🟢 Medium | Low |
| 8 | Community Page | 🟢 Medium | Medium |
| 9 | Settings Dark Mode | 🔴 High | Low |
| 10 | Nav & Layout Polish | 🟡 Medium | Medium |
| 11 | SEO & Root Layout | 🟢 Low | Low |
| 12 | Login/Signup | 🟡 Medium | Low |

---

## Verification Plan

### Automated
- Run `npm run build` after all changes to catch TypeScript compile errors
- Run `npm run lint` to check ESLint rules

### Manual
- Start `npm run dev` and visit every route
- Test the landing page is visible without login
- Test dark mode toggle persists across page refreshes
- Test sandbox "Run Code" with multiple problems
- Test AI Mentor with 10+ different queries
- Test practice problem filtering and XP award
- Test leaderboard ranking with current user XP
- Test community post/like/comment cycle

> [!IMPORTANT]
> This is a long plan. I'll execute it **phase by phase**, one file at a time. Each phase will be done in full before moving to the next. You can stop me between phases if you want to review.
