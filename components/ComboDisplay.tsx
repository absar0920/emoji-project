import CopyAllButton from "./CopyAllButton";

interface ComboDisplayProps {
  emojis: string[];
  label: string;
  primary?: boolean;
}

export default function ComboDisplay({ emojis, label, primary = false }: ComboDisplayProps) {
  return (
    <div className="fg-card p-4" style={primary ? { borderColor: "var(--accent)" } : undefined}>
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="fg-label">{label}</span>
        {primary && (
          <span className="mono text-[0.58rem] uppercase tracking-[0.12em] px-2 py-0.5 bg-accent-ed text-[var(--paper)] shrink-0">Top Pick</span>
        )}
      </div>
      <div className="flex gap-1.5 text-4xl mb-4 flex-wrap">
        {emojis.map((emoji, i) => (
          <span key={i}>{emoji}</span>
        ))}
      </div>
      <CopyAllButton emojis={emojis} />
    </div>
  );
}
