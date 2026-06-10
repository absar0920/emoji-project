"use client";

export default function HeroSearchBar() {
  function handleClick() {
    window.dispatchEvent(new CustomEvent("open-search"));
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Look up any emoji or feeling"
      className="group w-full flex items-center gap-3 border-b-2 border-[var(--rule)] pb-3 text-left cursor-pointer"
    >
      <svg className="w-5 h-5 shrink-0 text-[var(--ink-3)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <span className="flex-1 min-w-0 truncate text-[var(--ink-3)] text-lg">Look up any emoji or feeling&hellip;</span>
      <kbd className="hidden sm:inline mono text-[0.66rem] text-[var(--ink-3)] tracking-widest">⌘K</kbd>
      <span className="fg-kicker group-hover:text-[var(--ink)] transition-colors">Search →</span>
    </button>
  );
}
