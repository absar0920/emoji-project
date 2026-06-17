import { Metadata } from "next";
import Link from "next/link";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Emoji Meaning",
  description: "Privacy policy for Emoji Meaning.",
};

export default function PrivacyPage() {
  return (
    <ClientShell>
      <main className="theme-editorial min-h-screen">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 py-9 sm:py-12">
          <div className="fg-runhead mb-10 sm:mb-12">
            <span className="flex items-center gap-2">
              <Link href="/" className="fg-link">Home</Link>
              <span className="opacity-40" aria-hidden="true">/</span>
              <span className="t-ink">Privacy</span>
            </span>
            <span className="hidden sm:inline">Field Guide</span>
          </div>

          <div className="border-b-2 border-[var(--rule)] pb-7 mb-9">
            <p className="fg-kicker mb-4">Legal · Last updated May 2026</p>
            <h1 className="font-display t-ink leading-[1.02] tracking-[-0.015em] text-[2.6rem] sm:text-[3.6rem]">Privacy Policy</h1>
          </div>

          <div className="fg-article">
            <h2>What We Collect</h2>
            <p>Emoji Meaning does not require user accounts or login. We do not collect personal information such as names, email addresses, or phone numbers.</p>

            <h2>Cookies &amp; Local Storage</h2>
            <p>We use browser localStorage to store your recent emoji selections for convenience. No tracking cookies are set by Emoji Meaning directly.</p>

            <h2>Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul>
              <li><strong>Google AdSense</strong> — for displaying advertisements. Google may use cookies for ad personalization.</li>
              <li><strong>Google Gemini API</strong> — for powering AI features. Text prompts are sent to Google&apos;s servers for processing.</li>
              <li><strong>Vercel</strong> — for hosting and analytics. Standard server logs may be collected.</li>
            </ul>

            <h2>Data Retention</h2>
            <p>We do not store personal data on our servers. AI tool inputs may be cached temporarily (up to 1 hour) for performance but are not linked to individual users.</p>

            <h2>Contact</h2>
            <p>For privacy-related questions, please reach out via the contact information on our About page.</p>
          </div>
        </div>
      </main>
      <Footer />
    </ClientShell>
  );
}
