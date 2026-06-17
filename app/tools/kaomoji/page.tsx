import ToolHero from "@/components/ToolHero";
import KaomojiBrowser from "@/components/kaomoji/KaomojiBrowser";
import IntroLead from "@/components/kaomoji/IntroLead";
import WhatIsKaomoji from "@/components/kaomoji/WhatIsKaomoji";
import KaomojiVsEmoji from "@/components/kaomoji/KaomojiVsEmoji";
import History from "@/components/kaomoji/History";
import HowToType from "@/components/kaomoji/HowToType";
import MakeYourOwn from "@/components/kaomoji/MakeYourOwn";
import Culture from "@/components/kaomoji/Culture";
import KaomojiFAQ from "@/components/kaomoji/KaomojiFAQ";
import Conclusion from "@/components/kaomoji/Conclusion";

export default function KaomojiPage() {
  return (
    <>
      <ToolHero
        title="Kaomoji"
        description="100+ Japanese text emoticons, organized by emotion — click any to copy, then learn the history and how to type them on every device."
        badge="Japanese Text Faces"
      />

      <KaomojiBrowser />

      {/* === EDITORIAL CONTENT === */}
      <IntroLead />
      <WhatIsKaomoji />
      <KaomojiVsEmoji />
      <History />
      <HowToType />
      <MakeYourOwn />
      <Culture />
      <KaomojiFAQ />
      <Conclusion />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Kaomoji: The Complete Guide to Japanese Text Emoticons (2026)",
            description:
              "Definition, 100+ copy-paste examples by category, the full history, how to type kaomoji on iPhone, Windows, Mac, and Android, and how to build your own.",
            datePublished: "2026-01-01",
            dateModified: "2026-06-01",
            author: { "@type": "Organization", name: "Emoji Meaning" },
          }),
        }}
      />
    </>
  );
}
