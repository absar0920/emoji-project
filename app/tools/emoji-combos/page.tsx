import { Metadata } from "next";
import Link from "next/link";
import { getPopularCombos } from "@/lib/mongodb";
import ToolHero from "@/components/ToolHero";

export const metadata: Metadata = {
  title: "Emoji Combo Generator — Copy Emoji Sets [2026]",
  description: "Find the perfect emoji combo for any occasion. Birthday, love, aesthetic, and 200+ more themes.",
};

export const dynamic = "force-dynamic";

export default async function EmojiCombosPage() {
  const combos = await getPopularCombos(30);

  return (
    <>
      <ToolHero title="Emoji Combos" description="Find the perfect emoji combo for any occasion. Pick a theme to see its combos." badge="Combos" />

      {combos.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {combos.map((combo) => (
            <Link key={combo.slug} href={`/combo/${combo.slug}`} className="fg-card fg-link flex flex-col items-center gap-2.5 p-5 text-center">
              <span className="text-2xl">{combo.combos?.[0]?.emojis?.slice(0, 4).join("") || "🎉"}</span>
              <span className="font-read text-sm t-ink">{combo.theme}</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-16 border-y border-[var(--line)] text-center">
          <span className="text-5xl block mb-4">🎨</span>
          <p className="mono text-[0.78rem] uppercase tracking-[0.14em] t-muted">No combo themes available yet</p>
        </div>
      )}
    </>
  );
}
