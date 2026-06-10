import Link from "next/link";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <ClientShell>
      <main className="theme-editorial min-h-screen flex items-center">
        <div className="max-w-2xl mx-auto px-5 sm:px-6 py-24 text-center">
          <span className="text-[7rem] leading-none block mb-6">🫥</span>
          <p className="fg-kicker mb-4">404</p>
          <h1 className="font-display t-ink leading-[1.04] tracking-[-0.015em] text-[2.6rem] sm:text-[3.4rem] mb-4">
            Page not found
          </h1>
          <p className="t-muted font-read mb-8">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/" className="fg-btn px-6 py-3">Go home</Link>
            <Link href="/search" className="fg-btn-ghost mono text-[0.66rem] uppercase tracking-[0.14em] px-6 py-3">Search emojis</Link>
            <Link href="/tools/emoji-kitchen" className="fg-btn-ghost mono text-[0.66rem] uppercase tracking-[0.14em] px-6 py-3">Emoji Kitchen</Link>
          </div>
        </div>
      </main>
      <Footer />
    </ClientShell>
  );
}
