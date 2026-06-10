import { Metadata } from "next";
import Link from "next/link";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — Emoji Intelligence",
  description: "Terms of service for Emoji Intelligence.",
};

export default function TermsPage() {
  return (
    <ClientShell>
      <main className="theme-editorial min-h-screen">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 py-9 sm:py-12">
          <div className="fg-runhead mb-10 sm:mb-12">
            <span className="flex items-center gap-2">
              <Link href="/" className="fg-link">Home</Link>
              <span className="opacity-40" aria-hidden="true">/</span>
              <span className="t-ink">Terms</span>
            </span>
            <span className="hidden sm:inline">Field Guide</span>
          </div>

          <div className="border-b-2 border-[var(--rule)] pb-7 mb-9">
            <p className="fg-kicker mb-4">Legal · Last updated May 2026</p>
            <h1 className="font-display t-ink leading-[1.02] tracking-[-0.015em] text-[2.6rem] sm:text-[3.6rem]">Terms of Service</h1>
          </div>

          <div className="fg-article">
            <h2>Acceptance of Terms</h2>
            <p>By accessing and using Emoji Intelligence, you agree to be bound by these Terms of Service. If you do not agree, please do not use the service.</p>

            <h2>Description of Service</h2>
            <p>Emoji Intelligence provides emoji meaning analysis, interactive tools, and educational content about emoji usage across platforms and cultures. The service is provided free of charge and supported by advertising.</p>

            <h2>Content Disclaimer</h2>
            <p>Emoji meanings, cultural interpretations, and AI-generated content on this platform are for informational and entertainment purposes only. Meanings are generated using AI models and may not be fully accurate or reflect all cultural perspectives. Use your own judgment when interpreting emoji meanings in real conversations.</p>

            <h2>Intellectual Property</h2>
            <p>The content, design, and code of Emoji Intelligence are protected by copyright. Emoji characters themselves are part of the Unicode Standard. Vendor-specific emoji designs belong to their respective owners (Apple, Google, etc.).</p>

            <h2>Limitation of Liability</h2>
            <p>Emoji Intelligence is provided &quot;as is&quot; without warranties of any kind. We are not liable for any damages arising from your use of the platform, including but not limited to misinterpretation of emoji meanings.</p>

            <h2>Changes to Terms</h2>
            <p>We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the updated terms.</p>
          </div>
        </div>
      </main>
      <Footer />
    </ClientShell>
  );
}
