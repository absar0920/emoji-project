"use client";

import { useState } from "react";
import ToolHero from "@/components/ToolHero";
import CopyButton from "@/components/CopyButton";
import { StaggerContainer, StaggerItem } from "@/components/MotionWrappers";

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
        badge="✨ AI-Powered"
      />

      {/* Input */}
      <div className="space-y-4 mb-8">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value.slice(0, 200))}
          placeholder="What's the post about?"
          className="w-full px-5 py-3 rounded-xl shadow-sm border-0 bg-white outline-none focus:shadow-md focus:ring-2 focus:ring-primary/20 transition-shadow"
        />

        {/* Mood */}
        <div>
          <span className="text-sm font-medium text-neutral-600 block mb-2">Mood</span>
          <div className="flex flex-wrap gap-2">
            {MOODS.map((m) => (
              <button
                key={m}
                onClick={() => setMood(m)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  mood === m
                    ? "bg-gradient-to-r from-primary/10 to-accent-violet/10 text-primary ring-1 ring-primary/30"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Platform */}
        <div>
          <span className="text-sm font-medium text-neutral-600 block mb-2">Platform</span>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  platform === p ? "bg-accent-violet text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!topic.trim() || loading}
          className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-primary to-accent-violet text-white font-medium shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Captions →"}
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 text-accent-red text-sm mb-6">{error}</div>
      )}

      {/* Results */}
      {captions.length > 0 && (
        <StaggerContainer className="space-y-3">
          {captions.map((cap, i) => (
            <StaggerItem key={i}>
              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-neutral-900 mb-2">{cap.text}</p>
                    <div className="flex gap-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary-light text-primary font-medium">
                        {cap.emoji_count} emojis
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-accent-violet/10 text-accent-violet font-medium">
                        {cap.vibe}
                      </span>
                    </div>
                  </div>
                  <CopyButton text={cap.text} label="Copy" />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </>
  );
}
