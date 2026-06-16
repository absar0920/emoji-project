// Shared presentational helpers for the Emoji Combos guide sections.

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
