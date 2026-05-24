"use client";

import Link from "next/link";

interface NavbarProps {
  onSearchClick: () => void;
}

export default function Navbar({ onSearchClick }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🧠</span>
            <span className="text-lg font-bold text-primary-dark">
              Emoji Intelligence
            </span>
          </Link>
          <button
            onClick={onSearchClick}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="hidden sm:inline">Search emojis...</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-neutral-200 text-xs text-neutral-500 font-mono">⌘K</kbd>
          </button>
        </div>
      </div>
    </nav>
  );
}
