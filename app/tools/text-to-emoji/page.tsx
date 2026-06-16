import ToolHero from "@/components/ToolHero";
import TextToEmojiTool from "@/components/text2emoji/TextToEmojiTool";
import IntroLead from "@/components/text2emoji/IntroLead";
import WhatIsTextToEmoji from "@/components/text2emoji/WhatIsTextToEmoji";
import BestTools from "@/components/text2emoji/BestTools";
import EmojiLetters from "@/components/text2emoji/EmojiLetters";
import HowToConvert from "@/components/text2emoji/HowToConvert";
import RemoveEmoji from "@/components/text2emoji/RemoveEmoji";
import AddRespond from "@/components/text2emoji/AddRespond";
import DiscordAutoConvert from "@/components/text2emoji/DiscordAutoConvert";
import EmojiMeaning from "@/components/text2emoji/EmojiMeaning";
import TextToSpeech from "@/components/text2emoji/TextToSpeech";
import TextToEmojiFAQ from "@/components/text2emoji/TextToEmojiFAQ";
import Conclusion from "@/components/text2emoji/Conclusion";

export default function TextToEmojiPage() {
  return (
    <>
      <ToolHero
        title="Text to Emoji Translator"
        description="Turn text into emoji-rich messages with AI — then the full guide to converting, emoji letters, removing emoji, and platform tricks."
        badge="AI-Powered"
      />

      <TextToEmojiTool />

      {/* === EDITORIAL CONTENT === */}
      <IntroLead />
      <WhatIsTextToEmoji />
      <BestTools />
      <EmojiLetters />
      <HowToConvert />
      <RemoveEmoji />
      <AddRespond />
      <DiscordAutoConvert />
      <EmojiMeaning />
      <TextToSpeech />
      <TextToEmojiFAQ />
      <Conclusion />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Text to Emoji: The Complete Guide to Converting, Creating & Using Emoji Text in 2026",
            description:
              "Convert text to emoji, generate emoji letters, remove emoji from text, and use emoji across iPhone, Android, Discord, WhatsApp, and code — with JS and Python snippets.",
            datePublished: "2026-01-01",
            dateModified: "2026-06-01",
            author: { "@type": "Organization", name: "Emoji Intelligence" },
          }),
        }}
      />
    </>
  );
}
