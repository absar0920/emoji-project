import ToolHero from "@/components/ToolHero";
import EmojiMakerTool from "@/components/maker/EmojiMakerTool";
import IntroLead from "@/components/maker/IntroLead";
import WhatIsAnEmojiMaker from "@/components/maker/WhatIsAnEmojiMaker";
import WhyItMatters from "@/components/maker/WhyItMatters";
import FeaturesAndExport from "@/components/maker/FeaturesAndExport";
import MakerTypes from "@/components/maker/MakerTypes";
import NineSteps from "@/components/maker/NineSteps";
import DeviceGuides from "@/components/maker/DeviceGuides";
import CommonMistakes from "@/components/maker/CommonMistakes";
import ExpertTips from "@/components/maker/ExpertTips";
import MakerFAQ from "@/components/maker/MakerFAQ";
import Conclusion from "@/components/maker/Conclusion";

export default function EmojiMakerPage() {
  return (
    <>
      <ToolHero
        title="Emoji Maker"
        description="Describe any emoji and AI will generate it for you — then learn how to make, refine, and export custom emoji for Discord, Slack, and Twitch."
        badge="AI-Powered"
      />

      <EmojiMakerTool />

      {/* === EDITORIAL CONTENT === */}
      <IntroLead />
      <WhatIsAnEmojiMaker />
      <WhyItMatters />
      <FeaturesAndExport />
      <MakerTypes />
      <NineSteps />
      <DeviceGuides />
      <CommonMistakes />
      <ExpertTips />
      <MakerFAQ />
      <Conclusion />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Emoji Maker: The Complete Guide to Custom Emoji Creation in 2026",
            description:
              "How emoji makers work, the tool types for each goal, a nine-step creation process, platform export specs for Discord, Slack, Twitch, WhatsApp, and Telegram, common mistakes, and expert tips.",
            datePublished: "2026-01-01",
            dateModified: "2026-06-01",
            author: { "@type": "Organization", name: "Emoji Meaning" },
          }),
        }}
      />
    </>
  );
}
