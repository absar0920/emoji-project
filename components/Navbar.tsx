"use client";

import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  onSearchClick: () => void;
  onMenuClick: () => void;
}

export default function Navbar({ onSearchClick, onMenuClick }: NavbarProps) {
  return (
    <div className="theme-editorial">
      <nav
        className="sticky top-0 z-50 border-b-[1.5px] border-[var(--rule)] backdrop-blur-md"
        style={{ background: "color-mix(in srgb, var(--paper) 86%, transparent)" }}
      >
        <div className="px-5 sm:px-6">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Left: menu toggle (mobile) + wordmark */}
            <div className="flex items-center gap-2 min-w-0">
              <div className="lg:hidden">
                <button onClick={onMenuClick} className="fg-iconbtn w-9 h-9" aria-label="Open menu">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
              <Link href="/" className="flex items-center gap-2.5 shrink-0 fg-link">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-[3px] border-[1.5px] border-[var(--rule)] bg-white overflow-hidden" aria-hidden="true">
                  <Image src="/logo.png" alt="" width={32} height={32} priority className="w-full h-full object-contain" />
                </span>
                <span className="font-display t-ink text-xl leading-none">Emoji Meaning</span>
              </Link>
            </div>

            {/* Center: large search bar (desktop) — styled like an input, opens the search modal */}
            <div className="hidden sm:flex flex-1 justify-center px-4">
              <button
                onClick={onSearchClick}
                aria-label="Search emojis"
                className="group w-full max-w-md flex items-center gap-3 h-10 px-4 border border-[var(--line)] hover:border-[var(--accent)] transition-colors text-left cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0 text-[var(--ink-3)] group-hover:text-[var(--accent)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="flex-1 min-w-0 truncate text-[var(--ink-3)] text-sm">Search emojis&hellip;</span>
                <kbd className="mono text-[0.66rem] text-[var(--ink-3)] tracking-widest shrink-0">⌘K</kbd>
              </button>
            </div>

            {/* Right: theme + mobile search icon */}
            <div className="flex items-center gap-2 shrink-0">
              <ThemeToggle />
              <div className="sm:hidden">
                <button onClick={onSearchClick} className="fg-iconbtn w-9 h-9" aria-label="Search">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
