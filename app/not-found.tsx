import Link from "next/link";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";

const EMOJIS = ["🤔", "😵", "🫠", "👀", "🙈", "🤷", "😅", "🫣"];

export default function NotFound() {
  const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

  return (
    <ClientShell>
      <main className="max-w-2xl mx-auto px-4 py-24 text-center">
        <span className="text-[120px] leading-none block mb-6">{emoji}</span>
        <h1 className="text-3xl font-extrabold text-primary-dark dark:text-white mb-3">
          Page Not Found
        </h1>
        <p className="text-neutral-500 dark:text-slate-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary-dark transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/search"
            className="px-6 py-3 rounded-full bg-neutral-100 dark:bg-slate-700 text-neutral-700 dark:text-slate-300 font-medium hover:bg-neutral-200 dark:hover:bg-slate-600 transition-colors"
          >
            Search Emojis
          </Link>
          <Link
            href="/tools/emoji-kitchen"
            className="px-6 py-3 rounded-full bg-neutral-100 dark:bg-slate-700 text-neutral-700 dark:text-slate-300 font-medium hover:bg-neutral-200 dark:hover:bg-slate-600 transition-colors"
          >
            Emoji Kitchen
          </Link>
        </div>
      </main>
      <Footer />
    </ClientShell>
  );
}
