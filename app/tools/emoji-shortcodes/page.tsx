"use client";

import { useState, useEffect } from "react";
import ToolHero from "@/components/ToolHero";
import CopyButton from "@/components/CopyButton";
import { EmojiSearchItem } from "@/types/emoji";

export default function ShortcodesPage() {
  const [emojis, setEmojis] = useState<EmojiSearchItem[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/search-index")
      .then((res) => res.json())
      .then((data: EmojiSearchItem[]) => setEmojis(data));
  }, []);

  const filtered = search
    ? emojis.filter(
        (e) =>
          e.name.toLowerCase().includes(search.toLowerCase()) ||
          e.shortcode.toLowerCase().includes(search.toLowerCase()) ||
          e.character === search
      )
    : emojis;

  return (
    <>
      <ToolHero title="Emoji Shortcodes" description="Find shortcodes for every emoji. Copy for Slack, Discord, GitHub, and more." badge="Reference" />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or shortcode…"
        className="fg-field w-full px-4 py-3 mb-7"
      />

      <div className="fg-table-wrap">
        <table className="fg-table">
          <thead>
            <tr>
              <th>Emoji</th>
              <th>Name</th>
              <th>Shortcode</th>
              <th className="text-right">Copy</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 100).map((e) => (
              <tr key={e.slug}>
                <td className="em">{e.character}</td>
                <td className="strong">{e.name}</td>
                <td className="mono t-accent">{e.shortcode}</td>
                <td className="text-right">
                  <CopyButton text={e.shortcode} label="Copy" tone="editorial" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length > 100 && (
        <p className="mono text-[0.72rem] uppercase tracking-[0.12em] t-muted text-center mt-5">
          Showing 100 of {filtered.length} — search to narrow down
        </p>
      )}
    </>
  );
}
