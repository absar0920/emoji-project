import Link from "next/link";
import { getPopularCombos } from "@/lib/mongodb";
import ToolHero from "@/components/ToolHero";
import CombosBrowser from "@/components/combos/CombosBrowser";
import IntroLead from "@/components/combos/IntroLead";
import WhatAreCombos from "@/components/combos/WhatAreCombos";
import HowToMake from "@/components/combos/HowToMake";
import ByPlatform from "@/components/combos/ByPlatform";
import SeasonalOverview from "@/components/combos/SeasonalOverview";
import CombosWithMeaning from "@/components/combos/CombosWithMeaning";
import EmojiKitchen from "@/components/combos/EmojiKitchen";
import CombosFAQ from "@/components/combos/CombosFAQ";
import Conclusion from "@/components/combos/Conclusion";

export const dynamic = "force-dynamic";

export default async function EmojiCombosPage() {
  const combos = await getPopularCombos(30);

  return (
    <>
      <ToolHero
        title="Emoji Combos"
        description="200+ copy-paste combos for every aesthetic, platform, and season — plus the full guide to building your own."
        badge="Combos"
      />

      <CombosBrowser />

      {combos.length > 0 && (
        <section className="mt-12 pt-9 border-t-2 border-[var(--rule)]">
          <p className="fg-kicker mb-2">Browse All Themes</p>
          <p className="t-muted font-read mb-6 max-w-2xl">Curated theme sets with copy-paste pages of their own.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {combos.map((combo) => (
              <Link key={combo.slug} href={`/combo/${combo.slug}`} className="fg-card fg-link flex flex-col items-center gap-2.5 p-5 text-center">
                <span className="text-2xl">{combo.combos?.[0]?.emojis?.slice(0, 4).join("") || "🎉"}</span>
                <span className="font-read text-sm t-ink">{combo.theme}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* === EDITORIAL CONTENT === */}
      <IntroLead />
      <WhatAreCombos />
      <HowToMake />
      <ByPlatform />
      <SeasonalOverview />
      <CombosWithMeaning />
      <EmojiKitchen />
      <CombosFAQ />
      <Conclusion />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Emoji Combos: 200+ Best Combos to Copy & Paste in 2026",
            description:
              "200+ copy-paste emoji combos across cute, funny, aesthetic, platform, and seasonal categories, plus how to build your own, combos with meaning, and Emoji Kitchen.",
            datePublished: "2026-01-01",
            dateModified: "2026-06-01",
            author: { "@type": "Organization", name: "Emoji Intelligence" },
          }),
        }}
      />
    </>
  );
}
