"use client";

import { useState } from "react";
import Link from "next/link";
import NavDropdown from "./NavDropdown";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";

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
    <div className="theme-editorial">
      <nav
        className="sticky top-0 z-50 border-b-[1.5px] border-[var(--rule)] backdrop-blur-md"
        style={{ background: "color-mix(in srgb, var(--paper) 86%, transparent)" }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Wordmark */}
            <Link href="/" className="flex items-baseline gap-2 shrink-0 fg-link">
              <span className="text-lg" aria-hidden="true">🧠</span>
              <span className="font-display t-ink text-xl leading-none">Emoji Intelligence</span>
            </Link>

            {/* Center nav (desktop) */}
            <div className="hidden md:flex items-center gap-7">
              <NavDropdown label="Emojis" items={EMOJI_CATEGORIES} />
              <NavDropdown label="Tools" items={TOOL_ITEMS} columns={2} />
              <Link href="/trending" className="fg-navlink">Trending</Link>
              <Link href="/tools/emoji-vs" className="fg-navlink">Compare</Link>
              <Link href="/blog" className="fg-navlink">Blog</Link>
            </div>

            {/* Right cluster */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button onClick={onSearchClick} className="fg-navlink hidden sm:inline-flex h-9 px-3 border border-[var(--line)] hover:border-[var(--accent)] transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Search</span>
                <span className="opacity-50 ml-1" aria-hidden="true">⌘K</span>
              </button>
              {/* Mobile: search + hamburger */}
              <button onClick={onSearchClick} className="fg-iconbtn w-9 h-9 sm:hidden" aria-label="Search">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button onClick={() => setMobileMenuOpen(true)} className="fg-iconbtn w-9 h-9 md:hidden" aria-label="Open menu">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </div>
  );
}
