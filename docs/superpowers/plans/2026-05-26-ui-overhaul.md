# UI Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Visual overhaul of Navbar, Homepage, Emoji Detail Page, Tool Pages, Footer, and Trending Page with soft elevated design system.

**Architecture:** No new features — purely visual. Rewrite Navbar (add nav links + dropdowns + mobile menu), Homepage (search-first layout), and Emoji Detail (tabbed meanings). Upgrade card styles across tool pages, trending, and footer. Apply existing MotionWrappers to tool results.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS, Framer Motion (already installed)

**Spec:** `docs/superpowers/specs/2026-05-26-ui-overhaul-design.md`

---

### Task 1: Navbar — NavDropdown + MobileMenu Components

**Files:**
- Create: `components/NavDropdown.tsx`
- Create: `components/MobileMenu.tsx`

- [ ] **Step 1: Write NavDropdown component**

Write to `components/NavDropdown.tsx`:

```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface NavDropdownItem {
  icon?: string;
  name: string;
  href: string;
}

interface NavDropdownProps {
  label: string;
  items: NavDropdownItem[];
  columns?: 1 | 2;
}

export default function NavDropdown({ label, items, columns = 1 }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 text-sm font-medium transition-colors ${
          open ? "text-primary" : "text-neutral-600 hover:text-primary"
        }`}
      >
        {label}
        <svg
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className={`absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-neutral-100 py-2 z-50 transition-all ${
            columns === 2 ? "w-80 grid grid-cols-2 gap-0" : "w-56"
          }`}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-primary transition-colors"
            >
              {item.icon && <span className="text-base">{item.icon}</span>}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Write MobileMenu component**

Write to `components/MobileMenu.tsx`:

```tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_LINKS = [
  { label: "Trending", href: "/trending" },
  { label: "Compare", href: "/tools/emoji-vs" },
];

const CATEGORY_LINKS = [
  { icon: "😀", name: "Smileys & Emotion", href: "/search?category=Smileys+%26+Emotion" },
  { icon: "👥", name: "People & Body", href: "/search?category=People+%26+Body" },
  { icon: "🐱", name: "Animals & Nature", href: "/search?category=Animals+%26+Nature" },
  { icon: "🍕", name: "Food & Drink", href: "/search?category=Food+%26+Drink" },
  { icon: "✈️", name: "Travel & Places", href: "/search?category=Travel+%26+Places" },
  { icon: "⚽", name: "Activities", href: "/search?category=Activities" },
  { icon: "💡", name: "Objects", href: "/search?category=Objects" },
  { icon: "❤️", name: "Symbols", href: "/search?category=Symbols" },
  { icon: "🏁", name: "Flags", href: "/search?category=Flags" },
];

const TOOL_LINKS = [
  { icon: "🍳", name: "Emoji Kitchen", href: "/tools/emoji-kitchen" },
  { icon: "🔍", name: "Smart Search", href: "/tools/smart-search" },
  { icon: "✨", name: "Emoji Maker", href: "/tools/emoji-maker" },
  { icon: "📝", name: "Text to Emoji", href: "/tools/text-to-emoji" },
  { icon: "🎯", name: "Vibe Search", href: "/tools/vibe-search" },
  { icon: "💬", name: "Caption Generator", href: "/tools/caption-generator" },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] bg-white">
      <div className="flex items-center justify-between px-4 h-16 border-b border-neutral-200">
        <span className="text-lg font-bold text-primary-dark">Menu</span>
        <button onClick={onClose} className="p-2 text-neutral-500 hover:text-neutral-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="overflow-y-auto max-h-[calc(100vh-64px)] p-4 space-y-6">
        {/* Direct links */}
        <div className="space-y-1">
          {MENU_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="block px-3 py-2.5 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider px-3 mb-2">Emojis</h3>
          <div className="space-y-0.5">
            {CATEGORY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="flex items-center gap-2.5 px-3 py-2 text-sm text-neutral-600 rounded-lg hover:bg-neutral-50"
              >
                <span>{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div>
          <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider px-3 mb-2">Tools</h3>
          <div className="space-y-0.5">
            {TOOL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="flex items-center gap-2.5 px-3 py-2 text-sm text-neutral-600 rounded-lg hover:bg-neutral-50"
              >
                <span>{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify and commit**

```bash
npx tsc --noEmit
git add components/NavDropdown.tsx components/MobileMenu.tsx
git commit -m "feat: add NavDropdown and MobileMenu components"
```

---

### Task 2: Navbar — Rewrite

**Files:**
- Rewrite: `components/Navbar.tsx`

- [ ] **Step 1: Rewrite Navbar with full navigation**

Write to `components/Navbar.tsx`:

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import NavDropdown from "./NavDropdown";
import MobileMenu from "./MobileMenu";

interface NavbarProps {
  onSearchClick: () => void;
}

const EMOJI_CATEGORIES = [
  { icon: "😀", name: "Smileys & Emotion", href: "/search?category=Smileys+%26+Emotion" },
  { icon: "👥", name: "People & Body", href: "/search?category=People+%26+Body" },
  { icon: "🐱", name: "Animals & Nature", href: "/search?category=Animals+%26+Nature" },
  { icon: "🍕", name: "Food & Drink", href: "/search?category=Food+%26+Drink" },
  { icon: "✈️", name: "Travel & Places", href: "/search?category=Travel+%26+Places" },
  { icon: "⚽", name: "Activities", href: "/search?category=Activities" },
  { icon: "💡", name: "Objects", href: "/search?category=Objects" },
  { icon: "❤️", name: "Symbols", href: "/search?category=Symbols" },
  { icon: "🏁", name: "Flags", href: "/search?category=Flags" },
];

const TOOL_ITEMS = [
  { icon: "🍳", name: "Emoji Kitchen", href: "/tools/emoji-kitchen" },
  { icon: "🔍", name: "Smart Search", href: "/tools/smart-search" },
  { icon: "✨", name: "Emoji Maker", href: "/tools/emoji-maker" },
  { icon: "📝", name: "Text to Emoji", href: "/tools/text-to-emoji" },
  { icon: "🎯", name: "Vibe Search", href: "/tools/vibe-search" },
  { icon: "💬", name: "Caption Generator", href: "/tools/caption-generator" },
  { icon: "⌨️", name: "Emoji Keyboard", href: "/tools/emoji-keyboard" },
  { icon: "🏷️", name: "Shortcodes", href: "/tools/emoji-shortcodes" },
  { icon: "⚔️", name: "Emoji Compare", href: "/tools/emoji-vs" },
  { icon: "🎨", name: "Emoji Combos", href: "/tools/emoji-combos" },
  { icon: "🔥", name: "Trend Tracker", href: "/tools/emoji-trends" },
];

export default function Navbar({ onSearchClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <span className="text-2xl">🧠</span>
              <span className="text-lg font-bold text-primary-dark">
                Emoji Intelligence
              </span>
            </Link>

            {/* Center: Nav links (desktop) */}
            <div className="hidden md:flex items-center gap-6 ml-8">
              <NavDropdown label="Emojis" items={EMOJI_CATEGORIES} />
              <NavDropdown label="Tools" items={TOOL_ITEMS} columns={2} />
              <Link
                href="/trending"
                className="text-sm font-medium text-neutral-600 hover:text-primary transition-colors"
              >
                Trending
              </Link>
              <Link
                href="/tools/emoji-vs"
                className="text-sm font-medium text-neutral-600 hover:text-primary transition-colors"
              >
                Compare
              </Link>
            </div>

            {/* Right: Search + Dark toggle + Mobile hamburger */}
            <div className="flex items-center gap-2">
              <button
                onClick={onSearchClick}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 transition-colors text-sm"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="hidden sm:inline">Search emojis...</span>
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-neutral-200 text-xs text-neutral-500 font-mono">
                  ⌘K
                </kbd>
              </button>

              {/* Dark mode placeholder */}
              <button
                className="hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 transition-colors"
                title="Dark mode (coming soon)"
              >
                🌙
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
```

- [ ] **Step 2: Verify and commit**

```bash
npx tsc --noEmit
git add components/Navbar.tsx
git commit -m "feat: rewrite Navbar with full navigation, dropdowns, and mobile menu"
```

---

### Task 3: Homepage — Rewrite

**Files:**
- Rewrite: `app/page.tsx`

- [ ] **Step 1: Rewrite homepage with search-first layout**

Write to `app/page.tsx`:

```tsx
import Link from "next/link";
import { getTrendingEmojis } from "@/lib/mongodb";
import Footer from "@/components/Footer";
import ClientShell from "@/components/ClientShell";

export const revalidate = 300;

const TOOLS = [
  { icon: "🍳", name: "Emoji Kitchen", desc: "Mix emojis into new designs", href: "/tools/emoji-kitchen" },
  { icon: "🔍", name: "Smart Search", desc: "AI-powered emoji finder", href: "/tools/smart-search" },
  { icon: "✨", name: "Emoji Maker", desc: "Generate custom emojis", href: "/tools/emoji-maker" },
  { icon: "📝", name: "Text to Emoji", desc: "Convert text to emoji style", href: "/tools/text-to-emoji" },
  { icon: "🎯", name: "Vibe Search", desc: "Find emojis by feeling", href: "/tools/vibe-search" },
  { icon: "💬", name: "Caption Generator", desc: "Viral captions with emojis", href: "/tools/caption-generator" },
];

const CATEGORIES = [
  { icon: "😀", name: "Smileys & Emotion", href: "/search?category=Smileys+%26+Emotion" },
  { icon: "👥", name: "People & Body", href: "/search?category=People+%26+Body" },
  { icon: "🐱", name: "Animals & Nature", href: "/search?category=Animals+%26+Nature" },
  { icon: "🍕", name: "Food & Drink", href: "/search?category=Food+%26+Drink" },
  { icon: "✈️", name: "Travel & Places", href: "/search?category=Travel+%26+Places" },
  { icon: "⚽", name: "Activities", href: "/search?category=Activities" },
  { icon: "💡", name: "Objects", href: "/search?category=Objects" },
  { icon: "❤️", name: "Symbols", href: "/search?category=Symbols" },
  { icon: "🏁", name: "Flags", href: "/search?category=Flags" },
];

export default async function HomePage() {
  const trending = await getTrendingEmojis(10);

  return (
    <ClientShell>
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#F8F7FF] to-[#EEF2FF] py-16 sm:py-24">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              ✨ AI-Powered Emoji Intelligence
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary-dark leading-tight mb-4">
              Every Emoji.{" "}
              <span className="bg-gradient-to-r from-primary to-accent-violet bg-clip-text text-transparent">
                Every Meaning.
              </span>
            </h1>
            <p className="text-lg text-neutral-500 mb-8">
              3,700+ emojis · 15 platforms · 31 cultures
            </p>

            {/* Search bar */}
            <div className="max-w-lg mx-auto">
              <div className="flex items-center gap-3 px-5 py-4 bg-white rounded-full shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
                <span className="text-xl">🔍</span>
                <span className="flex-1 text-left text-neutral-400">Search any emoji or feeling...</span>
                <span className="bg-primary text-white px-5 py-1.5 rounded-full text-sm font-semibold">
                  Search
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Emojis */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-primary-dark">Most Popular</h2>
              <Link href="/search" className="text-sm text-primary font-medium hover:underline">
                Show More →
              </Link>
            </div>
            <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
              {trending.map((e) => (
                <Link
                  key={e.slug}
                  href={`/emoji/${e.slug}`}
                  className="text-4xl sm:text-5xl hover:scale-110 transition-transform"
                  title={e.name}
                >
                  {e.character}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Playground */}
        <section className="py-12 bg-neutral-50/50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-bold text-primary-dark mb-6">Tools Playground</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {TOOLS.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="bg-gradient-to-br from-primary-light/50 to-violet-50/50 rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow"
                >
                  <div className="bg-white rounded-xl shadow-sm w-12 h-12 flex items-center justify-center text-2xl mb-3">
                    {tool.icon}
                  </div>
                  <div className="font-semibold text-primary-dark">{tool.name}</div>
                  <div className="text-sm text-neutral-500 mt-1">{tool.desc}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Category Browse */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-bold text-primary-dark mb-6">Browse by Category</h2>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-neutral-100 text-sm font-medium text-neutral-700 hover:shadow-md transition-shadow whitespace-nowrap shrink-0"
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </ClientShell>
  );
}
```

- [ ] **Step 2: Verify and commit**

```bash
npx tsc --noEmit
git add app/page.tsx
git commit -m "feat: rewrite homepage with search-first hero, popular emojis, tool showcase"
```

---

### Task 4: Emoji Detail — MeaningTabs + PlatformAccordion

**Files:**
- Create: `components/MeaningTabs.tsx`
- Create: `components/PlatformAccordion.tsx`

- [ ] **Step 1: Write MeaningTabs component**

Write to `components/MeaningTabs.tsx`:

```tsx
"use client";

import { useState } from "react";

const TAB_COLORS: Record<string, { border: string; label: string }> = {
  genz: { border: "border-l-accent-violet", label: "text-accent-violet" },
  official: { border: "border-l-primary", label: "text-primary" },
  emotional: { border: "border-l-accent-emerald", label: "text-accent-emerald" },
  dating: { border: "border-l-accent-red", label: "text-accent-red" },
  meme: { border: "border-l-accent-amber", label: "text-accent-amber" },
  sarcastic: { border: "border-l-neutral-400", label: "text-neutral-500" },
};

interface MeaningLayer {
  key: string;
  label: string;
  content: Record<string, string | number | boolean>;
}

interface MeaningTabsProps {
  meanings: MeaningLayer[];
}

export default function MeaningTabs({ meanings }: MeaningTabsProps) {
  const [active, setActive] = useState(meanings[0]?.key || "genz");

  const activeMeaning = meanings.find((m) => m.key === active);
  const colors = TAB_COLORS[active] || TAB_COLORS.official;

  return (
    <section id="meanings" className="mb-10">
      <h2 className="text-xl font-bold text-primary-dark mb-4">Meaning Layers</h2>

      {/* Tab bar */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-4">
        {meanings.map((m) => (
          <button
            key={m.key}
            onClick={() => setActive(m.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              active === m.key
                ? "bg-primary text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Active meaning card */}
      {activeMeaning && (
        <div
          className={`bg-white rounded-xl shadow-md p-5 border-l-4 ${colors.border}`}
        >
          <h3 className={`text-sm font-bold mb-3 ${colors.label}`}>
            {activeMeaning.label} Meaning
          </h3>
          <div className="space-y-2">
            {Object.entries(activeMeaning.content).map(([key, value]) => {
              if (typeof value === "boolean") {
                return (
                  <div key={key} className="flex items-center gap-2 text-sm">
                    <span className="text-neutral-500 capitalize">
                      {key.replace(/_/g, " ")}:
                    </span>
                    <span className={value ? "text-accent-red" : "text-accent-emerald"}>
                      {value ? "Yes" : "No"}
                    </span>
                  </div>
                );
              }
              if (typeof value === "number") {
                return (
                  <div key={key} className="flex items-center gap-2 text-sm">
                    <span className="text-neutral-500 capitalize">
                      {key.replace(/_/g, " ")}:
                    </span>
                    <span className="font-medium text-neutral-800">{value}/10</span>
                  </div>
                );
              }
              return (
                <p key={key} className="text-sm text-neutral-700">
                  {String(value)}
                </p>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
```

- [ ] **Step 2: Write PlatformAccordion component**

Write to `components/PlatformAccordion.tsx`:

```tsx
"use client";

import { useState } from "react";

const PLATFORM_ICONS: Record<string, string> = {
  tiktok: "🎵",
  whatsapp: "💬",
  instagram: "📸",
  x: "𝕏",
  facebook: "👤",
  snapchat: "👻",
  telegram: "✈️",
  discord: "🎮",
  pinterest: "📌",
  reddit: "🤖",
  linkedin: "💼",
  bereal: "📷",
  threads: "🧵",
  twitch: "🎬",
  spotify: "🎵",
};

interface PlatformAccordionProps {
  platforms: Array<{
    key: string;
    data: Record<string, string | string[] | number>;
  }>;
}

export default function PlatformAccordion({ platforms }: PlatformAccordionProps) {
  const [open, setOpen] = useState<string | null>(null);

  if (platforms.length === 0) return null;

  return (
    <section id="platforms" className="mb-10">
      <h2 className="text-xl font-bold text-primary-dark mb-4">Platform Meanings</h2>

      {/* Platform icon row */}
      <div className="flex gap-2 flex-wrap mb-4">
        {platforms.map((p) => (
          <button
            key={p.key}
            onClick={() => setOpen(open === p.key ? null : p.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              open === p.key
                ? "bg-primary text-white shadow-md"
                : "bg-white shadow-sm border border-neutral-100 text-neutral-600 hover:shadow-md"
            }`}
          >
            <span>{PLATFORM_ICONS[p.key] || "📱"}</span>
            <span className="capitalize">{p.key}</span>
          </button>
        ))}
      </div>

      {/* Expanded platform card */}
      {open && (
        <div className="bg-white rounded-xl shadow-md p-5 border border-neutral-100">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">
              {PLATFORM_ICONS[open] || "📱"}
            </span>
            <h3 className="font-bold text-neutral-900 capitalize">{open}</h3>
          </div>
          <div className="space-y-2">
            {Object.entries(
              platforms.find((p) => p.key === open)?.data || {}
            ).map(([key, value]) => {
              if (Array.isArray(value)) {
                return (
                  <div key={key}>
                    <span className="text-xs text-neutral-500 capitalize">
                      {key.replace(/_/g, " ")}
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {value.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 bg-primary-light text-primary rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              }
              if (typeof value === "number") {
                return (
                  <div
                    key={key}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-neutral-500 capitalize">
                      {key.replace(/_/g, " ")}
                    </span>
                    <span className="font-medium text-accent-amber">
                      {value}/100
                    </span>
                  </div>
                );
              }
              return (
                <div key={key} className="text-sm">
                  <span className="text-neutral-500 capitalize block text-xs">
                    {key.replace(/_/g, " ")}
                  </span>
                  <p className="text-neutral-700">{String(value)}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
```

- [ ] **Step 3: Verify and commit**

```bash
npx tsc --noEmit
git add components/MeaningTabs.tsx components/PlatformAccordion.tsx
git commit -m "feat: add MeaningTabs and PlatformAccordion components"
```

---

### Task 5: Emoji Detail Page — Rewrite

**Files:**
- Rewrite: `app/emoji/[slug]/page.tsx`

- [ ] **Step 1: Read the current emoji detail page fully**

Read `app/emoji/[slug]/page.tsx` to get the complete current code.

- [ ] **Step 2: Rewrite the page**

Rewrite `app/emoji/[slug]/page.tsx` with these changes:
- Replace the full-bleed gradient hero with a centered white card (`bg-white rounded-2xl shadow-md p-6 sm:p-8 text-center`)
- Replace `MeaningCard` grid with `MeaningTabs` component — build the `meanings` array from the emoji document, filtering out layers with no data
- Replace `PlatformCard` grid with `PlatformAccordion` — build the `platforms` array from the emoji document, filtering to platforms that have data
- Remove `StickyTOC` import and usage
- Upgrade remaining cards (CultureCard, TimelineSection) classes: change `shadow-sm border border-neutral-100` to `shadow-md rounded-xl`
- Keep all other sections (cultures, timeline, design variations, related emojis, FAQ, safety, schemas)

The implementer MUST read the current file first and preserve all the existing data fetching, metadata generation, schemas, and section content. Only change the visual structure.

Key imports to change:
- Remove: `import MeaningCard from "@/components/MeaningCard"`
- Remove: `import PlatformCard from "@/components/PlatformCard"`
- Remove: `import StickyTOC from "@/components/StickyTOC"`
- Add: `import MeaningTabs from "@/components/MeaningTabs"`
- Add: `import PlatformAccordion from "@/components/PlatformAccordion"`

The MeaningTabs expects:
```ts
meanings: Array<{ key: string; label: string; content: Record<string, string | number | boolean> }>
```

Build it like:
```ts
const meanings = [
  emoji.genz_meaning && { key: "genz", label: "Gen-Z", content: { interpretation: emoji.genz_meaning.interpretation || "", tiktok_usage: emoji.genz_meaning.tiktok_usage || "", irony_level: emoji.genz_meaning.irony_level ?? 0 } },
  emoji.official_meaning && { key: "official", label: "Official", content: { description: emoji.official_meaning.description || "", original_intent: emoji.official_meaning.original_intent || "" } },
  // ... same for emotional, dating, meme, sarcastic
].filter(Boolean);
```

The PlatformAccordion expects:
```ts
platforms: Array<{ key: string; data: Record<string, string | string[] | number> }>
```

Build it from the existing platform data on the emoji document (tiktok, whatsapp, instagram, etc.), filtering to ones that exist.

- [ ] **Step 3: Verify and commit**

```bash
npx tsc --noEmit
git add app/emoji/[slug]/page.tsx
git commit -m "feat: rewrite emoji detail page with tabbed meanings and platform accordion"
```

---

### Task 6: ToolHero Upgrade + Tool Pages Visual Pass

**Files:**
- Modify: `components/ToolHero.tsx`
- Modify: All 10 tool pages

- [ ] **Step 1: Upgrade ToolHero with gradient background**

Write to `components/ToolHero.tsx`:

```tsx
interface ToolHeroProps {
  title: string;
  description: string;
  badge?: string;
}

export default function ToolHero({ title, description, badge }: ToolHeroProps) {
  return (
    <div className="bg-gradient-to-b from-primary-light/30 to-transparent -mx-4 px-4 py-8 mb-8 rounded-2xl">
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          {badge}
        </span>
      )}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-dark mb-2">
        {title}
      </h1>
      <p className="text-neutral-500">{description}</p>
    </div>
  );
}
```

- [ ] **Step 2: Update all 10 tool pages**

For each tool page, make these class changes (read each file first):

**Input fields:** Change `border border-neutral-200` to `shadow-sm border-0 bg-white`; change `focus:ring-2 focus:ring-primary/30` to `focus:shadow-md focus:ring-2 focus:ring-primary/20 transition-shadow`

**Active style chips:** Change `bg-primary text-white` to `bg-gradient-to-r from-primary/10 to-accent-violet/10 text-primary ring-1 ring-primary/30`

**Result cards:** Change `shadow-sm border border-neutral-100` to `shadow-md` (remove border); add `hover:shadow-lg transition-shadow`

**Primary action buttons:** Add `shadow-lg hover:shadow-xl` to existing gradient buttons

**Motion wrappers:** Add `import { FadeIn, StaggerContainer, StaggerItem } from "@/components/MotionWrappers"` and wrap the result display sections in `<StaggerContainer>` with each result item in `<StaggerItem>`.

Apply to all 10 files:
- `app/tools/text-to-emoji/page.tsx`
- `app/tools/vibe-search/page.tsx`
- `app/tools/caption-generator/page.tsx`
- `app/tools/emoji-kitchen/page.tsx`
- `app/tools/emoji-maker/page.tsx`
- `app/tools/smart-search/page.tsx`
- `app/tools/emoji-keyboard/page.tsx`
- `app/tools/emoji-shortcodes/page.tsx`
- `app/tools/emoji-vs/page.tsx`
- `app/tools/emoji-trends/page.tsx`

- [ ] **Step 3: Verify and commit**

```bash
npx tsc --noEmit
git add components/ToolHero.tsx app/tools/
git commit -m "feat: upgrade ToolHero and tool pages with soft elevated design + motion"
```

---

### Task 7: Footer + Trending + Category Links

**Files:**
- Modify: `components/Footer.tsx`
- Modify: `app/trending/page.tsx`

- [ ] **Step 1: Upgrade Footer**

Read `components/Footer.tsx`. Make these changes:

Add gradient top border — before the `<footer>` tag, add:
```tsx
<div className="h-0.5 bg-gradient-to-r from-primary to-accent-violet" />
```

Change link hover from `hover:text-white` to `hover:text-primary-300` (all link instances).

Fix category links to use actual URLs:
```ts
categories: [
  { name: "Smileys & Emotion", href: "/search?category=Smileys+%26+Emotion" },
  { name: "People & Body", href: "/search?category=People+%26+Body" },
  { name: "Animals & Nature", href: "/search?category=Animals+%26+Nature" },
  { name: "Food & Drink", href: "/search?category=Food+%26+Drink" },
  { name: "Travel & Places", href: "/search?category=Travel+%26+Places" },
],
```

- [ ] **Step 2: Upgrade Trending page cards**

Read `app/trending/page.tsx`. In the `EmojiRow` component, change:
- `shadow-sm border border-neutral-100` → `shadow-md`
- Add `hover:shadow-lg` (replace `hover:shadow-md`)

Add section dividers — between each section, add:
```tsx
<hr className="border-neutral-200 my-8" />
```

- [ ] **Step 3: Verify and commit**

```bash
npx tsc --noEmit
git add components/Footer.tsx app/trending/page.tsx
git commit -m "feat: upgrade Footer with gradient border and fix category links, elevate Trending cards"
```

---

### Task 8: Final Verification

**Files:** None (verification only)

- [ ] **Step 1: TypeScript check**

```bash
npx tsc --noEmit
```

- [ ] **Step 2: Production build**

```bash
npm run build
```

Verify all routes build successfully.

- [ ] **Step 3: Visual check list**

Start dev server and verify:
- Homepage: Search-first hero, popular emoji row, tool showcase grid, category pills
- Navbar: Logo + Emojis dropdown + Tools dropdown + Trending + Compare + Search + dark toggle + mobile hamburger
- `/emoji/skull`: White hero card, meaning tabs (Gen-Z active by default), platform accordion
- `/tools/text-to-emoji`: Gradient ToolHero background, elevated inputs, motion on results
- `/trending`: Elevated cards with hover shadows, section dividers
- Footer: Gradient top border, indigo hover on links, working category links

- [ ] **Step 4: Commit any remaining fixes**

```bash
git add -A && git status
# Only commit if there are changes
```
