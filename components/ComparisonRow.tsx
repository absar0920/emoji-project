interface ComparisonRowProps {
  label: string;
  emoji1Value: string;
  emoji2Value: string;
}

export default function ComparisonRow({ label, emoji1Value, emoji2Value }: ComparisonRowProps) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] gap-4 py-3.5 border-b border-[var(--line)] last:border-b-0 items-baseline">
      <p className="text-sm t-body">{emoji1Value}</p>
      <span className="mono text-[0.62rem] uppercase tracking-[0.12em] t-accent self-center px-2 whitespace-nowrap">{label}</span>
      <p className="text-sm t-body text-right">{emoji2Value}</p>
    </div>
  );
}
