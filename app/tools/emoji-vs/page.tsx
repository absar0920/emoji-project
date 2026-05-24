"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ToolHero from "@/components/ToolHero";
import EmojiPicker from "@/components/EmojiPicker";
import Link from "next/link";

interface SelectedEmoji {
  character: string;
  slug: string;
  name: string;
}

interface PopularComparison {
  slug: string;
  emoji1_character: string;
  emoji2_character: string;
  emoji1_name: string;
  emoji2_name: string;
}

export default function EmojiVsPage() {
  const [emoji1, setEmoji1] = useState<SelectedEmoji | null>(null);
  const [emoji2, setEmoji2] = useState<SelectedEmoji | null>(null);
  const [popular, setPopular] = useState<PopularComparison[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/tools/popular-comparisons")
      .then((res) => res.json())
      .then((data) => setPopular(data))
      .catch(() => {});
  }, []);

  function handleCompare() {
    if (!emoji1 || !emoji2) return;
    const sorted = [emoji1.slug, emoji2.slug].sort();
    router.push(`/vs/${sorted[0]}-vs-${sorted[1]}`);
  }

  return (
    <>
      <ToolHero
        title="Emoji Comparison"
        description="Compare any two emojis side by side. See differences across meaning layers."
      />

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <div className="flex-1 w-full">
          <div className="text-center mb-2">
            <span className="text-6xl">{emoji1?.character || "❓"}</span>
          </div>
          <EmojiPicker onSelect={setEmoji1} selected={emoji1?.character} />
        </div>

        <span className="text-3xl font-extrabold text-primary">VS</span>

        <div className="flex-1 w-full">
          <div className="text-center mb-2">
            <span className="text-6xl">{emoji2?.character || "❓"}</span>
          </div>
          <EmojiPicker onSelect={setEmoji2} selected={emoji2?.character} />
        </div>
      </div>

      <div className="text-center mb-10">
        <button
          onClick={handleCompare}
          disabled={!emoji1 || !emoji2}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-accent-violet text-white font-bold text-lg hover:shadow-lg transition-shadow disabled:opacity-50"
        >
          Compare Now →
        </button>
      </div>

      {popular.length > 0 && (
        <>
          <h2 className="text-lg font-bold text-primary-dark mb-4">Popular Comparisons</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {popular.map((p) => (
              <Link
                key={p.slug}
                href={`/vs/${p.slug}`}
                className="flex items-center justify-center gap-2 p-3 bg-white rounded-xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow"
              >
                <span className="text-2xl">{p.emoji1_character}</span>
                <span className="text-xs font-bold text-neutral-400">vs</span>
                <span className="text-2xl">{p.emoji2_character}</span>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}
