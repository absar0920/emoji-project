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
      <ToolHero
        title="Emoji Combos"
        description="Find the perfect emoji combo for any occasion. Click a theme to see the combos."
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {combos.map((combo) => (
          <Link
            key={combo.slug}
            href={`/combo/${combo.slug}`}
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow"
          >
            <span className="text-2xl">
              {combo.combos?.[0]?.emojis?.slice(0, 4).join("") || "🎉"}
            </span>
            <span className="text-sm font-medium text-neutral-900">{combo.theme}</span>
          </Link>
        ))}
      </div>

      {combos.length === 0 && (
        <div className="text-center py-12 text-neutral-400">
          <span className="text-6xl block mb-4">🎨</span>
          <p>No combo themes available yet. Run the combo generation script first.</p>
        </div>
      )}
    </>
  );
}
