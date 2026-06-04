import { AnimatedSection } from "@/components/MotionWrappers";

const APPS = [
  { app: "Google Messages", platform: "Android", works: true, how: "Native Gboard integration" },
  { app: "WhatsApp", platform: "Android & iOS", works: true, how: "Sends as image sticker" },
  { app: "Telegram", platform: "Android & iOS", works: true, how: "Sends as image" },
  { app: "Messenger", platform: "Android & iOS", works: true, how: "Sends as image" },
  { app: "Snapchat", platform: "Android", works: true, how: "Sends as image in chat" },
  { app: "Discord", platform: "Android & iOS", works: true, how: "Sends as image attachment" },
  { app: "TikTok Comments", platform: "Android", works: true, how: "Copy-paste method" },
  { app: "Instagram DMs", platform: "Android", works: true, how: "Sends as image" },
  { app: "Gmail (compose)", platform: "Android", works: true, how: "Inserts as inline image" },
  { app: "iMessage", platform: "iOS (web method)", works: null, how: "Share saved sticker image" },
  { app: "Instagram Comments", platform: "Any", works: false, how: "Plain text field only" },
  { app: "Twitter/X", platform: "Any", works: false, how: "Plain text field only" },
  { app: "Facebook Status", platform: "Any", works: false, how: "Plain text field only" },
];

export default function SupportedApps() {
  return (
    <section className="py-14 rule-top">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection>
          <p className="eyebrow mb-3 flex items-center gap-2"><span className="inline-block w-6 h-px bg-primary" aria-hidden="true" />Compatibility</p>
          <h2 className="font-display text-3xl sm:text-4xl text-primary-dark dark:text-white leading-[1.1] mb-2">
            Emoji Kitchen Supported Apps — Where It Works and Where It Doesn&apos;t
          </h2>
          <p className="text-neutral-500 dark:text-slate-400 mt-3 mb-8">Works in any app that accepts image messages — fails in plain text input fields</p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-slate-700 mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-100 dark:bg-slate-700 text-left">
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">App</th>
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Platform</th>
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Works?</th>
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">How</th>
                </tr>
              </thead>
              <tbody>
                {APPS.map((row, i) => (
                  <tr key={row.app} className={i % 2 === 0 ? "bg-white dark:bg-slate-800" : "bg-neutral-50 dark:bg-slate-800/50"}>
                    <td className="px-4 py-3 font-medium text-primary-dark dark:text-white">{row.app}</td>
                    <td className="px-4 py-3 text-neutral-500 dark:text-slate-400 text-xs">{row.platform}</td>
                    <td className="px-4 py-3">
                      {row.works === true && <span className="inline-block text-xs font-medium px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">Yes</span>}
                      {row.works === false && <span className="inline-block text-xs font-medium px-2 py-1 rounded-full bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300">No</span>}
                      {row.works === null && <span className="inline-block text-xs font-medium px-2 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300">Partial</span>}
                    </td>
                    <td className="px-4 py-3 text-neutral-600 dark:text-slate-300 text-xs">{row.how}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border-l-4 border-primary rounded-r-xl p-5">
            <h3 className="font-bold text-primary-dark dark:text-white mb-1">Why It Doesn&apos;t Work in Instagram Comments or Twitter/X</h3>
            <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">
              Instagram comments, Twitter/X compose boxes, and Facebook status fields are plain text input fields that only accept Unicode characters. Emoji Kitchen stickers are rasterized PNG image files — a plain text field has no mechanism to embed an image inline. Messaging apps like WhatsApp and Telegram use rich media input fields that treat text, stickers, and images as parallel input types.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
