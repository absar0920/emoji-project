"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ToolHero from "@/components/ToolHero";
import EmojiPicker from "@/components/EmojiPicker";
import Link from "next/link";
import { FadeIn } from "@/components/MotionWrappers";

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

  const sameEmoji = !!emoji1 && !!emoji2 && emoji1.slug === emoji2.slug;

  function handleCompare() {
    if (!emoji1 || !emoji2 || sameEmoji) return;
    const sorted = [emoji1.slug, emoji2.slug].sort();
    router.push(`/vs/${sorted[0]}-vs-${sorted[1]}`);
  }

  return (
    <>
      <ToolHero title="Emoji Comparison" description="Compare any two emojis side by side. See differences across meaning layers." badge="Compare" />

      <div className="flex flex-col sm:flex-row items-center gap-5 mb-8">
        <div className="flex-1 w-full flex flex-col items-center gap-3">
          <span className="text-6xl">{emoji1?.character || "❓"}</span>
          <EmojiPicker onSelect={setEmoji1} selected={emoji1?.character} />
        </div>

        <span className="font-display t-accent text-3xl italic shrink-0">vs</span>

        <div className="flex-1 w-full flex flex-col items-center gap-3">
          <span className="text-6xl">{emoji2?.character || "❓"}</span>
          <EmojiPicker onSelect={setEmoji2} selected={emoji2?.character} />
        </div>
      </div>

      <div className="text-center mb-12">
        <button onClick={handleCompare} disabled={!emoji1 || !emoji2 || sameEmoji} className="fg-btn px-8 py-3">
          Compare now →
        </button>
        {sameEmoji && <p className="t-muted text-sm mt-3">Pick two different emojis to compare.</p>}
      </div>

      {popular.length > 0 && (
        <FadeIn>
          <p className="fg-kicker mb-5">Popular comparisons</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {popular.map((p) => (
              <Link key={p.slug} href={`/vs/${p.slug}`} className="fg-card fg-link flex items-center justify-center gap-2 p-3">
                <span className="text-2xl">{p.emoji1_character}</span>
                <span className="mono t-muted text-[0.6rem]">VS</span>
                <span className="text-2xl">{p.emoji2_character}</span>
              </Link>
            ))}
          </div>
        </FadeIn>
      )}
    </>
  );
}
