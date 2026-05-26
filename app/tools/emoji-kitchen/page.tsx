"use client";

import { useState } from "react";
import ToolHero from "@/components/ToolHero";
import EmojiPicker from "@/components/EmojiPicker";
import CopyButton from "@/components/CopyButton";

interface SelectedEmoji {
  character: string;
  slug: string;
  name: string;
}

export default function EmojiKitchenPage() {
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
      if (data.result_url) {
        setResultUrl(data.result_url);
      } else {
        setNotFound(true);
      }
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ToolHero
        title="Emoji Kitchen"
        description="Mix and match emojis to create unique combinations."
        badge="🍳 Trending"
      />

      {/* Pickers */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <div className="flex-1 w-full">
          <div className="text-center mb-2">
            {emoji1 ? (
              <span className="text-6xl">{emoji1.character}</span>
            ) : (
              <span className="text-6xl opacity-30">❓</span>
            )}
          </div>
          <EmojiPicker onSelect={setEmoji1} selected={emoji1?.character} />
        </div>

        <span className="text-3xl font-bold text-primary">+</span>

        <div className="flex-1 w-full">
          <div className="text-center mb-2">
            {emoji2 ? (
              <span className="text-6xl">{emoji2.character}</span>
            ) : (
              <span className="text-6xl opacity-30">❓</span>
            )}
          </div>
          <EmojiPicker onSelect={setEmoji2} selected={emoji2?.character} />
        </div>
      </div>

      {/* Cook button */}
      <div className="text-center mb-8">
        <button
          onClick={handleCook}
          disabled={!emoji1 || !emoji2 || loading}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-accent-violet text-white font-bold text-lg shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50"
        >
          {loading ? "Cooking..." : "Cook It! 🍳"}
        </button>
      </div>

      {/* Result */}
      {resultUrl && (
        <div className="text-center">
          <div className="inline-block bg-white rounded-2xl p-8 shadow-lg">
            <img src={resultUrl} alt="Emoji Kitchen result" width={128} height={128} className="mx-auto" />
          </div>
          <div className="flex gap-2 justify-center mt-4">
            <CopyButton text={resultUrl} label="Copy URL" />
            <a
              href={resultUrl}
              download
              className="px-3 py-1.5 rounded-full text-sm font-medium bg-accent-emerald text-white hover:bg-emerald-700 transition-colors"
            >
              Download
            </a>
          </div>
        </div>
      )}

      {notFound && (
        <div className="text-center py-8">
          <span className="text-6xl block mb-4">🤷</span>
          <p className="text-neutral-500">No combination found for these two emojis. Try different ones!</p>
        </div>
      )}
    </>
  );
}
