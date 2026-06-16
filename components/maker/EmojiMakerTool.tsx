"use client";

import { useState } from "react";

const STYLES = ["Emoji", "Cartoon", "Pixel Art", "Sticker"];

export default function EmojiMakerTool() {
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
      <div className="space-y-4 mb-9">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value.slice(0, 200))}
          placeholder="Describe your emoji… (e.g. happy cat with sunglasses)"
          className="fg-field w-full px-4 py-3 text-base"
        />
        <div className="flex items-center justify-between">
          <span className="fg-label">{prompt.length}/200</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {STYLES.map((s) => (
            <button key={s} onClick={() => setStyle(s)} data-active={style === s} className="fg-chip px-4 py-2">{s}</button>
          ))}
        </div>

        <button onClick={handleGenerate} disabled={!prompt.trim() || loading} className="fg-btn w-full sm:w-auto px-8 py-3">
          {loading ? "Generating…" : "Generate →"}
        </button>
      </div>

      {error && <div className="fg-alert px-4 py-3 mb-6">{error}</div>}

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {images.map((img, i) => (
            <div key={i} className="fg-card p-4 flex flex-col items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt={`Generated emoji ${i + 1}`} className="w-32 h-32 object-contain" />
              <button onClick={() => handleDownload(img, i)} className="fg-btn-ghost mono text-[0.66rem] uppercase tracking-[0.14em] px-4 py-1.5">
                Download
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
