// Shared presentational helpers for the Emoji Maker guide sections.

export function Kbd({ children }: { children: React.ReactNode }) {
  return <kbd className="fg-kbd">{children}</kbd>;
}

// Ruled 4-up data strip: big Didone figure + mono caption, hairline-divided.
export function StatStrip({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 border border-[var(--line)] my-9">
      {stats.map((s, i) => (
        <div
          key={s.value}
          className={`px-4 py-5 border-[var(--line)] ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b sm:border-b-0" : ""} ${i > 0 ? "sm:border-l" : ""}`}
        >
          <div className="font-display t-ink leading-none text-[1.8rem] sm:text-[2.1rem] tracking-[-0.01em]">{s.value}</div>
          <div className="fg-label mt-2 leading-snug">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

// Hairline-separated list of titled items, each led by a ✗ (bad) or ★ (accent) marker.
export function MarkerList({
  tone,
  items,
}: {
  tone: "bad" | "accent";
  items: { title: string; body: string }[];
}) {
  const color = tone === "bad" ? "var(--bad)" : "var(--accent)";
  const glyph = tone === "bad" ? "✗" : "★";
  return (
    <div className="border-t border-[var(--line)]">
      {items.map((it) => (
        <div key={it.title} className="flex gap-4 sm:gap-5 py-4 border-b border-[var(--line)]">
          <span aria-hidden="true" className="mono text-base leading-snug shrink-0 w-4 text-center" style={{ color }}>
            {glyph}
          </span>
          <div className="min-w-0">
            <h3 className="font-read font-semibold t-ink leading-snug">{it.title}</h3>
            <p className="t-body leading-relaxed mt-1 max-w-2xl">{it.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
