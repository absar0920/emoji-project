"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";
import { readToolJson } from "@/lib/toolError";

const STYLES = ["Balanced", "Heavy Emoji", "Minimal", "Gen-Z", "Professional"];

export default function TextToEmojiTool() {
  const [text, setText] = useState("");
  const [style, setStyle] = useState("Balanced");
  const [result, setResult] = useState<string | null>(null);
  const [alternatives, setAlternatives] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleTranslate() {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/tools/text-to-emoji", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, style }),
      });
      const data = await readToolJson<{ result?: string; alternatives?: string[] }>(res);
      setResult(data.result ?? null);
      setAlternatives(data.alternatives || []);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="space-y-4 mb-9">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 500))}
          placeholder="Type your text here…"
          className="fg-field w-full p-4 min-h-[120px] resize-none"
        />
        <div className="flex items-center justify-between">
          <span className="fg-label">{text.length}/500</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {STYLES.map((s) => (
            <button key={s} onClick={() => setStyle(s)} data-active={style === s} className="fg-chip px-4 py-2">{s}</button>
          ))}
        </div>

        <button onClick={handleTranslate} disabled={!text.trim() || loading} className="fg-btn w-full sm:w-auto px-8 py-3">
          {loading ? "Translating…" : "Translate →"}
        </button>
      </div>

      {error && <div className="fg-alert px-4 py-3 mb-6">{error}</div>}

      {result && (
        <div className="space-y-4">
          <div className="fg-card p-6">
            <div className="flex items-start justify-between gap-4">
              <p className="text-lg t-ink">{result}</p>
              <CopyButton text={result} label="Copy" tone="editorial" />
            </div>
          </div>

          {alternatives.length > 0 && (
            <>
              <p className="fg-kicker mt-7 mb-1">Alternatives</p>
              {alternatives.map((alt, i) => (
                <div key={i} className="fg-card p-4">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm t-body">{alt}</p>
                    <CopyButton text={alt} label="Copy" tone="editorial" />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
}
