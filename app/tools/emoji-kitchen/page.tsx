import ToolHero from "@/components/ToolHero";
import KitchenTool from "@/components/kitchen/KitchenTool";
import WhatIsEmojiKitchen from "@/components/kitchen/WhatIsEmojiKitchen";
import HowToUseAndroid from "@/components/kitchen/HowToUseAndroid";
import HowToUseIPhone from "@/components/kitchen/HowToUseIPhone";
import HowToUseOnline from "@/components/kitchen/HowToUseOnline";
import BestCombos from "@/components/kitchen/BestCombos";
import ComboReferenceTable from "@/components/kitchen/ComboReferenceTable";
import SupportedApps from "@/components/kitchen/SupportedApps";
import CombinationCount from "@/components/kitchen/CombinationCount";
import PlatformUsage from "@/components/kitchen/PlatformUsage";
import HiddenFeatures from "@/components/kitchen/HiddenFeatures";
import Android16Updates from "@/components/kitchen/Android16Updates";
import Troubleshooting from "@/components/kitchen/Troubleshooting";
import KitchenFAQ from "@/components/kitchen/KitchenFAQ";

export default function EmojiKitchenPage() {
  return (
    <>
      <ToolHero
        title="Emoji Kitchen — Combine Two Emojis Into One Sticker"
        description="Mix any two emojis to create a unique hand-crafted sticker from Google's 100,000+ combination library. Works on Android, iPhone, and web."
        badge="🍳 Trending"
      />

      <KitchenTool />

      {/* === EDITORIAL CONTENT === */}
      <WhatIsEmojiKitchen />
      <HowToUseAndroid />
      <HowToUseIPhone />
      <HowToUseOnline />
      <BestCombos />
      <ComboReferenceTable />
      <SupportedApps />
      <CombinationCount />
      <PlatformUsage />
      <HiddenFeatures />
      <Android16Updates />
      <Troubleshooting />
      <KitchenFAQ />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Emoji Kitchen: The Complete Guide (2026)",
            description: "The definitive guide to Emoji Kitchen — how to combine emojis, best combos, supported apps, hidden features, and troubleshooting.",
            datePublished: "2026-01-01",
            dateModified: "2026-06-01",
            author: { "@type": "Organization", name: "Emoji Intelligence" },
          }),
        }}
      />
    </>
  );
}
