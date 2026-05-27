import { CULTURE_INFO, CultureRegion } from "@/types/emoji";

interface CultureCardProps {
  region: string;
  meaning: string;
}

export default function CultureCard({ region, meaning }: CultureCardProps) {
  const info = CULTURE_INFO[region as CultureRegion];
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm dark:shadow-slate-900/30 border border-neutral-100 dark:border-slate-700">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{info?.flag || "🌐"}</span>
        <h3 className="font-bold text-neutral-900 dark:text-slate-100 text-sm">{info?.label || region}</h3>
      </div>
      <p className="text-sm text-neutral-700 dark:text-slate-300">{meaning}</p>
    </div>
  );
}
