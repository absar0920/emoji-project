import CopyAllButton from "./CopyAllButton";

interface ComboDisplayProps {
  emojis: string[];
  label: string;
  primary?: boolean;
}

export default function ComboDisplay({ emojis, label, primary = false }: ComboDisplayProps) {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm dark:shadow-slate-900/30 border border-neutral-100 dark:border-slate-700 ${primary ? "ring-2 ring-primary" : ""}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-neutral-600 dark:text-slate-300">{label}</span>
        {primary && <span className="text-xs px-2 py-0.5 bg-primary-light dark:bg-indigo-900/30 text-primary dark:text-indigo-100 rounded-full font-medium">Top Pick</span>}
      </div>
      <div className="flex gap-1 text-4xl mb-3 flex-wrap">
        {emojis.map((emoji, i) => (
          <span key={i} className="hover:scale-110 transition-transform cursor-default">{emoji}</span>
        ))}
      </div>
      <CopyAllButton emojis={emojis} />
    </div>
  );
}
