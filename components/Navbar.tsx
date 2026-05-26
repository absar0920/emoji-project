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
