"use client";

export default function HeroSearchBar() {
  function handleClick() {
    window.dispatchEvent(new CustomEvent("open-search"));
  }

  return (
    <div className="max-w-lg mx-auto">
      <button
        onClick={handleClick}
        className="w-full flex items-center gap-3 px-5 py-4 bg-white rounded-full shadow-lg cursor-pointer hover:shadow-xl transition-shadow text-left"
      >
        <span className="text-xl">🔍</span>
        <span className="flex-1 text-neutral-400">
          Search any emoji or feeling...
        </span>
        <span className="bg-primary text-white px-5 py-1.5 rounded-full text-sm font-semibold">
          Search
        </span>
      </button>
    </div>
  );
}
