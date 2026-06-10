import ToolHero from "@/components/ToolHero";
import KeyboardTool from "@/components/keyboard/KeyboardTool";
import IntroLead from "@/components/keyboard/IntroLead";
import WhatIsAnEmojiKeyboard from "@/components/keyboard/WhatIsAnEmojiKeyboard";
import WindowsGuide from "@/components/keyboard/WindowsGuide";
import MacGuide from "@/components/keyboard/MacGuide";
import IPhoneGuide from "@/components/keyboard/IPhoneGuide";
import AndroidGuide from "@/components/keyboard/AndroidGuide";
import OnlineKeyboard from "@/components/keyboard/OnlineKeyboard";
import CopyPasteWorkflow from "@/components/keyboard/CopyPasteWorkflow";
import ShortcutsReference from "@/components/keyboard/ShortcutsReference";
import BestApps from "@/components/keyboard/BestApps";
import WindowsDesktopDeepDive from "@/components/keyboard/WindowsDesktopDeepDive";
import ProfessionalApps from "@/components/keyboard/ProfessionalApps";
import Troubleshooting from "@/components/keyboard/Troubleshooting";
import Conclusion from "@/components/keyboard/Conclusion";
import KeyboardFAQ from "@/components/keyboard/KeyboardFAQ";

export default function EmojiKeyboardPage() {
  return (
    <>
      <ToolHero
        title="Emoji Keyboard"
        description="Browse, search, and copy any emoji with one click — then learn the built-in keyboard shortcut for every device you own."
        badge="Keyboard"
      />

      <KeyboardTool />

      {/* === EDITORIAL CONTENT === */}
      <IntroLead />
      <WhatIsAnEmojiKeyboard />
      <WindowsGuide />
      <MacGuide />
      <IPhoneGuide />
      <AndroidGuide />
      <OnlineKeyboard />
      <CopyPasteWorkflow />
      <ShortcutsReference />
      <BestApps />
      <WindowsDesktopDeepDive />
      <ProfessionalApps />
      <Troubleshooting />
      <Conclusion />
      <KeyboardFAQ />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "The Complete Emoji Keyboard Guide for Every Device (2026)",
            description:
              "How to open and use the built-in emoji keyboard on Windows, Mac, iPhone, Android, and Chromebook, plus Slack, Teams, Outlook, Gmail, and Google Docs.",
            datePublished: "2026-01-01",
            dateModified: "2026-06-01",
            author: { "@type": "Organization", name: "Emoji Intelligence" },
          }),
        }}
      />
    </>
  );
}
