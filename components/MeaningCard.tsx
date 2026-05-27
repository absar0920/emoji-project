const borderColors: Record<string, string> = {
  official: "border-l-primary",
  genz: "border-l-accent-violet",
  emotional: "border-l-accent-emerald",
  dating: "border-l-accent-red",
  meme: "border-l-accent-amber",
  sarcastic: "border-l-neutral-400",
};

const labelColors: Record<string, string> = {
  official: "text-primary",
  genz: "text-accent-violet",
  emotional: "text-accent-emerald",
  dating: "text-accent-red",
  meme: "text-accent-amber",
  sarcastic: "text-neutral-500",
};

interface MeaningCardProps {
  type: string;
  label: string;
  content: Record<string, string | number | boolean>;
}

export default function MeaningCard({ type, label, content }: MeaningCardProps) {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-lg p-4 border-l-4 shadow-sm dark:shadow-slate-900/30 ${borderColors[type] || "border-l-neutral-300"}`}>
      <h3 className={`text-sm font-bold mb-2 ${labelColors[type] || "text-neutral-600 dark:text-slate-300"}`}>{label}</h3>
      <div className="space-y-1.5">
        {Object.entries(content).map(([key, value]) => {
          if (typeof value === "boolean") {
            return (
              <div key={key} className="flex items-center gap-2 text-sm">
                <span className="text-neutral-500 dark:text-slate-400 capitalize">{key.replace(/_/g, " ")}:</span>
                <span className={value ? "text-accent-red" : "text-accent-emerald"}>{value ? "Yes" : "No"}</span>
              </div>
            );
          }
          if (typeof value === "number") {
            return (
              <div key={key} className="flex items-center gap-2 text-sm">
                <span className="text-neutral-500 dark:text-slate-400 capitalize">{key.replace(/_/g, " ")}:</span>
                <span className="font-medium text-neutral-800 dark:text-slate-100">{value}/10</span>
              </div>
            );
          }
          return <p key={key} className="text-sm text-neutral-700 dark:text-slate-300">{String(value)}</p>;
        })}
      </div>
    </div>
  );
}
