"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/MotionWrappers";

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
  { combo: "🪄 + 😊", result: "Blob smiley", note: "The classic pre-2017 Google smiley" },
  { combo: "🪄 + 😂", result: "Blob laughing", note: "Rounded, amorphous laughing face" },
  { combo: "🪄 + 😍", result: "Blob heart-eyes", note: "Nostalgic heart-eyes in blob style" },
  { combo: "🪄 + 😭", result: "Blob crying", note: "The original Google crying blob" },
];

const TAB_DATA: Record<Tab, { combos: { combo: string; result: string; why?: string; note?: string }[] }> = {
  Faces: { combos: FACE_COMBOS },
  Animals: { combos: ANIMAL_COMBOS },
  Food: { combos: FOOD_COMBOS },
  "Weird & Viral": { combos: WEIRD_COMBOS },
  "Blob Trick": { combos: BLOB_CONTENT },
};

export default function BestCombos() {
  const [activeTab, setActiveTab] = useState<Tab>("Faces");
  const data = TAB_DATA[activeTab];

  return (
    <section className="py-14 bg-white dark:bg-slate-900">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-dark dark:text-white mb-2">
            Best Emoji Kitchen Combos in 2026
          </h2>
          <p className="text-neutral-500 dark:text-slate-400 mb-6">The most shared, funniest, and most surprising combinations</p>
        </AnimatedSection>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? "bg-primary text-white shadow-md"
                  : "bg-white dark:bg-slate-700 text-neutral-600 dark:text-slate-300 border border-neutral-200 dark:border-slate-600 hover:bg-neutral-50 dark:hover:bg-slate-600"
              }`}
            >
              <span>{TAB_ICONS[tab]}</span>
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {data.combos.map((c) => (
            <div key={c.combo} className="bg-neutral-50 dark:bg-slate-800 rounded-xl p-4 border border-neutral-100 dark:border-slate-700">
              <span className="text-sm font-mono font-bold text-primary block mb-1">{c.combo}</span>
              <p className="text-sm font-medium text-primary-dark dark:text-white mb-1">{c.result}</p>
              <p className="text-xs text-neutral-500 dark:text-slate-400">{c.why || c.note}</p>
            </div>
          ))}
        </div>

        {activeTab === "Blob Trick" && (
          <AnimatedSection>
            <div className="bg-violet-50 dark:bg-violet-950/30 border-l-4 border-accent-violet rounded-r-xl p-5">
              <h3 className="font-bold text-primary-dark dark:text-white mb-1">💡 The Secret Blob Emojis</h3>
              <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">
                When you select the 🪄 magic wand and then a face emoji, certain combinations surface Google&apos;s legacy blob emoji designs — the rounded, amorphous style used from 2013 to 2017. These were retired from the main emoji set but preserved inside Emoji Kitchen&apos;s library. The Android 16 update expanded the number of accessible blob variants.
              </p>
            </div>
          </AnimatedSection>
        )}

        {activeTab !== "Blob Trick" && (
          <AnimatedSection>
            <div className="bg-indigo-50 dark:bg-indigo-950/30 border-l-4 border-primary rounded-r-xl p-5">
              <h3 className="font-bold text-primary-dark dark:text-white mb-1">Why These Combos Go Viral</h3>
              <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">
                The combinations with the highest surprise-to-source-emoji ratio are the ones that spread — the gap between what you put in and what you get out is the joke. Face mashups dominate share volume because they mirror real emotional complexity that no single Unicode emoji can express.
              </p>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
