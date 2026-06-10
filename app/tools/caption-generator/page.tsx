"use client";

import { useState } from "react";
import ToolHero from "@/components/ToolHero";
import CopyButton from "@/components/CopyButton";

const MOODS = ["Happy", "Sad", "Hype", "Aesthetic", "Funny", "Romantic", "Motivational", "Chill"];
const PLATFORMS = ["Instagram", "TikTok", "WhatsApp", "Twitter", "LinkedIn"];

interface Caption {
  text: string;
  emoji_count: number;
  vibe: string;
}

export default function CaptionGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [mood, setMood] = useState("Happy");
  const [platform, setPlatform] = useState("Instagram");
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    if (!topic.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/tools/caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, mood, platform }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setCaptions(data.captions || []);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ToolHero
        title="Caption Generator"
        description="Generate viral captions with emojis for Instagram, TikTok, WhatsApp, and more."
        badge="AI-Powered"
      />

      <div className="space-y-5 mb-9">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value.slice(0, 200))}
          placeholder="What's the post about?"
          className="fg-field w-full px-4 py-3 text-base"
        />

        <div>
          <span className="fg-label block mb-2.5">Mood</span>
          <div className="flex flex-wrap gap-2">
            {MOODS.map((m) => (
              <button key={m} onClick={() => setMood(m)} data-active={mood === m} className="fg-chip px-3 py-1.5">{m}</button>
            ))}
          </div>
        </div>

        <div>
          <span className="fg-label block mb-2.5">Platform</span>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((p) => (
              <button key={p} onClick={() => setPlatform(p)} data-active={platform === p} className="fg-chip px-3 py-1.5">{p}</button>
            ))}
          </div>
        </div>

        <button onClick={handleGenerate} disabled={!topic.trim() || loading} className="fg-btn w-full sm:w-auto px-8 py-3">
          {loading ? "Generating…" : "Generate captions →"}
        </button>
      </div>

      {error && <div className="fg-alert px-4 py-3 mb-6">{error}</div>}

      {captions.length > 0 && (
        <div className="space-y-3">
          {captions.map((cap, i) => (
            <div key={i} className="fg-card p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="t-ink mb-2.5">{cap.text}</p>
                  <div className="flex gap-x-4 gap-y-1 flex-wrap fg-label">
                    <span>{cap.emoji_count} emojis</span>
                    <span className="t-accent">{cap.vibe}</span>
                  </div>
                </div>
                <CopyButton text={cap.text} label="Copy" tone="editorial" />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
