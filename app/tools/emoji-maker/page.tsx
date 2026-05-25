"use client";

import { useState } from "react";
import ToolHero from "@/components/ToolHero";

const STYLES = ["Emoji", "Cartoon", "Pixel Art", "Sticker"];

export default function EmojiMakerPage() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Emoji");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    setImages([]);
    try {
      const res = await fetch("/api/tools/emoji-maker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, style }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setImages(data.images || []);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  function handleDownload(dataUri: string, index: number) {
    const link = document.createElement("a");
    link.href = dataUri;
    link.download = `emoji-${prompt.slice(0, 20).replace(/\s+/g, "-")}-${index + 1}.png`;
    link.click();
  }

  return (
    <>
      <ToolHero
        title="Emoji Maker"
        description="Describe any emoji and AI will generate it for you. Choose from multiple styles."
        badge="✨ AI-Powered"
      />

      <div className="space-y-4 mb-8">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value.slice(0, 200))}
          placeholder="Describe your emoji... (e.g. happy cat with sunglasses)"
          className="w-full px-5 py-3 rounded-xl border border-neutral-200 outline-none focus:ring-2 focus:ring-primary/30 text-lg"
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-400">{prompt.length}/200</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {STYLES.map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                style === s
                  ? "bg-primary text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <button
          onClick={handleGenerate}
          disabled={!prompt.trim() || loading}
          className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-primary to-accent-violet text-white font-medium hover:shadow-lg transition-shadow disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate →"}
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 text-accent-red text-sm mb-6">
          {error}
        </div>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100 flex flex-col items-center gap-3"
            >
              <img
                src={img}
                alt={`Generated emoji ${i + 1}`}
                className="w-32 h-32 object-contain"
              />
              <button
                onClick={() => handleDownload(img, i)}
                className="px-4 py-1.5 rounded-full text-sm font-medium bg-accent-emerald text-white hover:bg-emerald-700 transition-colors"
              >
                Download
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
