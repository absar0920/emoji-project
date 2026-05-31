import { AnimatedSection } from "@/components/MotionWrappers";

const FEATURES = [
  {
    icon: "🔁",
    title: "The Double Emoji Trick",
    desc: "Select the same emoji twice to get an exaggerated, maximalist version. 😭+😭 produces ultra-crying with more tears and intensity. 🤡+🤡 produces a more chaotic, distorted clown. 😍+😍 renders over-the-top heart-eyes. The fastest way to amplify a single emotion.",
  },
  {
    icon: "💾",
    title: "Save Favorite Combos",
    desc: "Long-press any sticker in the suggestion row on Android to save it to your gallery as a standard PNG. Gboard also retains recently used stickers in the recents row, so frequent combinations resurface without re-selecting the source emojis.",
  },
  {
    icon: "📡",
    title: "Offline Limitations",
    desc: "Kitchen requires an internet connection for new combinations — sticker images are fetched from Google's servers, not stored on-device. Once loaded in a session, stickers may be cached briefly. New pairings won't load without connectivity.",
  },
  {
    icon: "🔄",
    title: "Update Frequency",
    desc: "Google adds new combinations with major Gboard releases, typically aligning with annual Unicode releases and Pixel hardware launches. Major expansion batches arrived with every Android version from 12 through 16.",
  },
];

export default function HiddenFeatures() {
  return (
    <section className="py-14 bg-neutral-50 dark:bg-slate-800/50">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-dark dark:text-white mb-2">
            Hidden Features & Pro Tips
          </h2>
          <p className="text-neutral-500 dark:text-slate-400 mb-8">Tricks most Emoji Kitchen guides don&apos;t cover</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {FEATURES.map((f) => (
            <AnimatedSection key={f.title}>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-neutral-100 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{f.icon}</span>
                  <h3 className="font-bold text-primary-dark dark:text-white">{f.title}</h3>
                </div>
                <p className="text-sm text-neutral-600 dark:text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="bg-violet-50 dark:bg-violet-950/30 border-l-4 border-accent-violet rounded-r-xl p-5">
            <h3 className="font-bold text-primary-dark dark:text-white mb-1">💡 Regular Emojis vs. Kitchen Stickers Offline</h3>
            <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">
              Regular emojis render entirely offline as Unicode characters drawn by your device&apos;s emoji font. Emoji Kitchen stickers are fetched images that require connectivity for first-time loads. The emoji picker itself opens offline; the suggestion row simply displays nothing for unfetched combinations until the connection is restored.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
