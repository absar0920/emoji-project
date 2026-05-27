interface ComparisonRowProps {
  label: string;
  emoji1Value: string;
  emoji2Value: string;
  color?: string;
}

export default function ComparisonRow({ label, emoji1Value, emoji2Value, color = "primary" }: ComparisonRowProps) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] gap-4 py-3 border-b border-neutral-100 dark:border-slate-700 last:border-b-0">
      <p className="text-sm text-neutral-700 dark:text-slate-300">{emoji1Value}</p>
      <span className={`text-xs font-bold text-${color} self-center px-2`}>{label}</span>
      <p className="text-sm text-neutral-700 dark:text-slate-300 text-right">{emoji2Value}</p>
    </div>
  );
}
