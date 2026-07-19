"use client";

import { useState } from "react";
import EmojiPicker from "@/components/EmojiPicker";
import CopyButton from "@/components/CopyButton";
import { FadeIn } from "@/components/MotionWrappers";

interface SelectedEmoji {
  character: string;
  slug: string;
  name: string;
}

export default function KitchenTool() {
  const [emoji1, setEmoji1] = useState<SelectedEmoji | null>(null);
  const [emoji2, setEmoji2] = useState<SelectedEmoji | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  async function handleCook() {
    if (!emoji1 || !emoji2) return;
    setLoading(true);
    setNotFound(false);
    setResultUrl(null);
    try {
      const res = await fetch(
        `/api/tools/kitchen?emoji1=${encodeURIComponent(emoji1.character)}&emoji2=${encodeURIComponent(emoji2.character)}`
      );
      const data = await res.json();
      if (data.result_url) setResultUrl(data.result_url);
      else setNotFound(true);
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mb-4">
      <div className="flex flex-col sm:flex-row items-center gap-5 mb-7">
        <div className="flex-1 w-full flex flex-col items-center gap-3">
          <span className={`text-6xl ${emoji1 ? "" : "opacity-30"}`}>{emoji1?.character || "❓"}</span>
          <EmojiPicker onSelect={setEmoji1} selected={emoji1?.character} />
        </div>

        <span className="font-display t-accent text-4xl shrink-0">+</span>

        <div className="flex-1 w-full flex flex-col items-center gap-3">
          <span className={`text-6xl ${emoji2 ? "" : "opacity-30"}`}>{emoji2?.character || "❓"}</span>
          <EmojiPicker onSelect={setEmoji2} selected={emoji2?.character} />
        </div>
      </div>

      <div className="text-center mb-8">
        <button onClick={handleCook} disabled={!emoji1 || !emoji2 || loading} className="fg-btn px-8 py-3">
          {loading ? "Cooking…" : "Cook it 🍳"}
        </button>
      </div>

      {resultUrl && (
        <FadeIn className="text-center">
          <div className="inline-block fg-card p-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={resultUrl} alt="Emoji Kitchen result" width={128} height={128} className="mx-auto" />
          </div>
          <div className="flex gap-3 justify-center mt-5">
            <CopyButton text={resultUrl} label="Copy URL" tone="editorial" />
            {/* Route through the same-origin proxy so the attachment header
                actually triggers a download (the cross-origin `download` attr
                on a gstatic URL is ignored and just opens the image). */}
            <a
              href={`/api/tools/kitchen/download?url=${encodeURIComponent(resultUrl)}${
                emoji1 && emoji2 ? `&name=${emoji1.slug}-${emoji2.slug}` : ""
              }`}
              download
              className="fg-btn-ghost mono text-[0.66rem] uppercase tracking-[0.14em] px-4 py-2"
            >
              Download
            </a>
          </div>
        </FadeIn>
      )}

      {notFound && (
        <FadeIn className="text-center py-8 border-y border-[var(--line)]">
          <span className="text-5xl block mb-4">🤷</span>
          <p className="mono text-[0.78rem] uppercase tracking-[0.14em] t-muted">No combination found — try a different pair</p>
        </FadeIn>
      )}
    </section>
  );
}
