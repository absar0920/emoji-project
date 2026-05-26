"use client";

import { useState } from "react";
import ToolHero from "@/components/ToolHero";
import CopyButton from "@/components/CopyButton";
import { StaggerContainer, StaggerItem } from "@/components/MotionWrappers";

const STYLES = ["Balanced", "Heavy Emoji", "Minimal", "Gen-Z", "Professional"];

export default function TextToEmojiPage() {
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
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data.result);
      setAlternatives(data.alternatives || []);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ToolHero
        title="Text to Emoji Translator"
        description="Transform your text into emoji-rich messages. Choose from Gen-Z, professional, and more styles."
        badge="✨ AI-Powered"
      />

      {/* Input */}
      <div className="space-y-4 mb-8">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 500))}
          placeholder="Type your text here..."
          className="w-full p-4 rounded-xl shadow-sm border-0 bg-white min-h-[120px] outline-none focus:shadow-md focus:ring-2 focus:ring-primary/20 transition-shadow resize-none"
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-400">{text.length}/500</span>
        </div>

        {/* Style selector */}
        <div className="flex flex-wrap gap-2">
          {STYLES.map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                style === s
                  ? "bg-gradient-to-r from-primary/10 to-accent-violet/10 text-primary ring-1 ring-primary/30"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <button
          onClick={handleTranslate}
          disabled={!text.trim() || loading}
          className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-primary to-accent-violet text-white font-medium shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50"
        >
          {loading ? "Translating..." : "Translate →"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 text-accent-red text-sm mb-6">{error}</div>
      )}

      {/* Results */}
      {result && (
        <StaggerContainer className="space-y-4">
          <StaggerItem>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <p className="text-lg">{result}</p>
                <CopyButton text={result} label="Copy" />
              </div>
            </div>
          </StaggerItem>

          {alternatives.length > 0 && (
            <>
              <h3 className="text-sm font-medium text-neutral-500 mt-6">Alternatives</h3>
              {alternatives.map((alt, i) => (
                <StaggerItem key={i}>
                  <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-sm">{alt}</p>
                      <CopyButton text={alt} label="Copy" />
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </>
          )}
        </StaggerContainer>
      )}
    </>
  );
}
