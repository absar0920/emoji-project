"use client";

import { useState } from "react";
import { KSection } from "./Section";

const TABS = ["Faces", "Animals", "Food", "Weird & Viral", "Blob Trick"] as const;
type Tab = typeof TABS[number];

const TAB_ICONS: Record<Tab, string> = {
  Faces: "😂", Animals: "🐱", Food: "🍕", "Weird & Viral": "🤡", "Blob Trick": "🪄",
};

const FACE_COMBOS = [
  { combo: "😂 + 😭", result: "Crying-laughing hybrid", why: "Captures \"too funny to handle\" — the crossover between laughter and pain" },
  { combo: "😈 + 🥺", result: "Pleading devil", why: "Simultaneously threatening and adorable — one of the most versatile reaction stickers" },
  { combo: "🤡 + 😭", result: "Sobbing clown", why: "Peak chaotic-sad internet energy" },
  { combo: "🥴 + 😎", result: "Woozy with sunglasses", why: "Effortless disorientation — cool and confused at once" },
  { combo: "😂 + 😂", result: "Ultra-laughing face", why: "Double emoji trick — amplified version of the same expression" },
  { combo: "😭 + 😭", result: "Ultra-crying face", why: "More tears, more intensity, more visual weight" },
];
const ANIMAL_COMBOS = [
  { combo: "🐸 + 🐱", result: "Frog-cat hybrid", why: "Unsettling big eyes with a tiny cat mouth" },
  { combo: "🐶 + 🦊", result: "Fox-dog", why: "Simultaneously feral and fluffy" },
  { combo: "🐻 + 🐼", result: "Bear-panda melancholy face", why: "Popular as a sleepy or overwhelmed reaction" },
  { combo: "🦄 + 🐱", result: "Unicorn-cat", why: "Pastel aesthetic — trends regularly in soft content" },
  { combo: "🐻 + 😴", result: "Sleeping bear", why: "Cozy combination — perfect for goodnight messages" },
  { combo: "🦊 + 😎", result: "Sunglasses fox", why: "Charismatic animal combo" },
];
const FOOD_COMBOS = [
  { combo: "🍕 + 🍣", result: "Sushi-pizza hybrid", why: "Gloriously wrong food fusion" },
  { combo: "🍕 + 😭", result: "Crying pizza", why: "Genuine pathos from a food item" },
  { combo: "🍔 + 🤡", result: "Clown-hamburger", why: "Genuinely difficult to explain but extremely shareable" },
  { combo: "🎂 + 💀", result: "Birthday death cake", why: "Dark-humor birthday sticker — a genre unto itself" },
  { combo: "🌶️ + 😤", result: "Angry pepper face", why: "Fiery personality energy" },
  { combo: "🍕 + 👻", result: "Ghost pizza", why: "Surreal viral content" },
];
const WEIRD_COMBOS = [
  { combo: "🪣 + 😭", result: "Face crying into bucket", why: "Or is itself the bucket of tears — no one is sure" },
  { combo: "💀 + 🎂", result: "Birthday-death cake", why: "Congratulatory dread" },
  { combo: "🤡 + 🧠", result: "Clown brain", why: "Very specific flavor of self-deprecation" },
  { combo: "🫠 + 🔥", result: "Melting face in flames", why: "Standard \"I'm burning out\" reaction sticker" },
  { combo: "🌕 + 😭", result: "Crying moon", why: "Lonely/late-night energy" },
  { combo: "😈 + 🥺", result: "Devil pleading", why: "Conflict between cute and evil — viral on TikTok and Twitter/X" },
];
const BLOB_CONTENT = [
  { combo: "🪄 + 😊", result: "Blob smiley", why: "The classic pre-2017 Google smiley" },
  { combo: "🪄 + 😂", result: "Blob laughing", why: "Rounded, amorphous laughing face" },
  { combo: "🪄 + 😍", result: "Blob heart-eyes", why: "Nostalgic heart-eyes in blob style" },
  { combo: "🪄 + 😭", result: "Blob crying", why: "The original Google crying blob" },
];

const TAB_DATA: Record<Tab, { combo: string; result: string; why: string }[]> = {
  Faces: FACE_COMBOS, Animals: ANIMAL_COMBOS, Food: FOOD_COMBOS, "Weird & Viral": WEIRD_COMBOS, "Blob Trick": BLOB_CONTENT,
};

export default function BestCombos() {
  const [activeTab, setActiveTab] = useState<Tab>("Faces");
  const combos = TAB_DATA[activeTab];

  return (
    <KSection kicker="Combos" title="Best Emoji Kitchen Combos in 2026" dek="The most shared, funniest, and most surprising combinations.">
      <div className="fg-tabs mb-7 overflow-x-auto scrollbar-hide">
        {TABS.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} aria-pressed={activeTab === tab} data-active={activeTab === tab} className="fg-tab">
            <span aria-hidden="true">{TAB_ICONS[tab]}</span>{tab}
          </button>
        ))}
      </div>

      <div className="fg-list mb-8">
        {combos.map((c) => (
          <div key={c.combo} className="fg-entry fg-entry--ledger">
            <span className="fg-entry__glyph" style={{ width: "4rem", fontSize: "1.4rem" }}>{c.combo}</span>
            <div className="fg-entry__main">
              <span className="fg-entry__name">{c.result}</span>
              <p className="fg-entry__text">{c.why}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="fg-pull fg-pull--sm">
        {activeTab === "Blob Trick" ? (
          <>
            <span className="fg-kicker">The Secret Blobs</span>
            <p>Select 🪄 then a face emoji and certain pairings surface Google&apos;s legacy blob designs — the rounded, amorphous style from 2013–2017, retired from the main set but preserved in the Kitchen library. Android 16 expanded the accessible blob variants.</p>
          </>
        ) : (
          <>
            <span className="fg-kicker">Why They Go Viral</span>
            <p>The combos with the highest surprise-to-source ratio spread fastest — the gap between input and output is the joke. Face mashups dominate share volume because they mirror emotional complexity no single Unicode emoji can express.</p>
          </>
        )}
      </div>
    </KSection>
  );
}
