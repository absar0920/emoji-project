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
      <ToolHero
        title="Emoji Shortcodes"
        description="Find shortcodes for every emoji. Copy for Slack, Discord, GitHub, and more."
      />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or shortcode..."
        className="w-full px-4 py-3 rounded-xl shadow-sm border-0 bg-white dark:bg-slate-800 dark:text-slate-100 outline-none focus:shadow-md focus:ring-2 focus:ring-primary/20 transition-shadow mb-6"
      />

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md dark:shadow-slate-900/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-slate-700 bg-neutral-50 dark:bg-slate-700">
                <th className="px-4 py-3 text-left font-medium text-neutral-500 dark:text-slate-400">Emoji</th>
                <th className="px-4 py-3 text-left font-medium text-neutral-500 dark:text-slate-400">Name</th>
                <th className="px-4 py-3 text-left font-medium text-neutral-500 dark:text-slate-400">Shortcode</th>
                <th className="px-4 py-3 text-right font-medium text-neutral-500 dark:text-slate-400">Copy</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 100).map((e) => (
                <tr key={e.slug} className="border-b border-neutral-100 dark:border-slate-700 hover:bg-neutral-50 dark:hover:bg-slate-700">
                  <td className="px-4 py-2 text-2xl">{e.character}</td>
                  <td className="px-4 py-2 text-neutral-900 dark:text-slate-100">{e.name}</td>
                  <td className="px-4 py-2 font-mono text-primary text-xs">{e.shortcode}</td>
                  <td className="px-4 py-2 text-right">
                    <CopyButton text={e.shortcode} label="Copy" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length > 100 && (
          <div className="text-center py-3 text-sm text-neutral-400 dark:text-slate-500">
            Showing 100 of {filtered.length} results. Use search to narrow down.
          </div>
        )}
      </div>
    </>
  );
}
