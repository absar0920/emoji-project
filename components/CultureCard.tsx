import { CULTURE_INFO, CultureRegion } from "@/types/emoji";

interface CultureCardProps {
  region: string;
  meaning: string;
}

export default function CultureCard({ region, meaning }: CultureCardProps) {
  const info = CULTURE_INFO[region as CultureRegion];
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-neutral-100">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{info?.flag || "🌐"}</span>
        <h3 className="font-bold text-neutral-900 text-sm">{info?.label || region}</h3>
      </div>
      <p className="text-sm text-neutral-700">{meaning}</p>
    </div>
  );
}
