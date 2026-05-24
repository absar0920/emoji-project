const regionFlags: Record<string, string> = {
  western_genz: "🇺🇸",
  pakistan_india: "🇵🇰",
  middle_east: "🇸🇦",
  global_neutral: "🌍",
};

const regionLabels: Record<string, string> = {
  western_genz: "Western / Gen-Z",
  pakistan_india: "Pakistan & India",
  middle_east: "Middle East",
  global_neutral: "Global Neutral",
};

interface CultureCardProps {
  region: string;
  meaning: string;
}

export default function CultureCard({ region, meaning }: CultureCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-neutral-100">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{regionFlags[region] || "🌐"}</span>
        <h3 className="font-bold text-neutral-900 text-sm">{regionLabels[region] || region}</h3>
      </div>
      <p className="text-sm text-neutral-700">{meaning}</p>
    </div>
  );
}
