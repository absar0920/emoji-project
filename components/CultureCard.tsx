import { CULTURE_INFO, CultureRegion } from "@/types/emoji";

interface CultureCardProps {
  region: string;
  meaning: string;
}

export default function CultureCard({ region, meaning }: CultureCardProps) {
  const info = CULTURE_INFO[region as CultureRegion];
  return (
    <div className="fg-entry fg-entry--ledger">
      <span className="fg-entry__glyph" style={{ fontSize: "1.5rem" }}>{info?.flag || "🌐"}</span>
      <div className="fg-entry__main">
        <span className="fg-entry__name">{info?.label || region}</span>
        <p className="fg-entry__text">{meaning}</p>
      </div>
    </div>
  );
}
