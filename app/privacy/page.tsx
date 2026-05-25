import { Metadata } from "next";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Emoji Intelligence",
  description: "Privacy policy for Emoji Intelligence.",
};

export default function PrivacyPage() {
  return (
    <ClientShell>
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-primary-dark mb-6">
          Privacy Policy
        </h1>
        <p className="text-sm text-neutral-400 mb-8">
          Last updated: May 2026
        </p>

        <div className="prose prose-neutral max-w-none space-y-6 text-neutral-700">
          <h2 className="text-xl font-bold text-primary-dark">
            What We Collect
          </h2>
          <p>
            Emoji Intelligence does not require user accounts or login.
            We do not collect personal information such as names, email
            addresses, or phone numbers.
          </p>

          <h2 className="text-xl font-bold text-primary-dark">
            Cookies &amp; Local Storage
          </h2>
          <p>
            We use browser localStorage to store your recent emoji
            selections for convenience. No tracking cookies are set by
            Emoji Intelligence directly.
          </p>

          <h2 className="text-xl font-bold text-primary-dark">
            Third-Party Services
          </h2>
          <p>We use the following third-party services:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Google AdSense</strong> — for displaying
              advertisements. Google may use cookies for ad
              personalization.
            </li>
            <li>
              <strong>Google Gemini API</strong> — for powering AI
              features. Text prompts are sent to Google&apos;s servers for
              processing.
            </li>
            <li>
              <strong>Vercel</strong> — for hosting and analytics.
              Standard server logs may be collected.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-primary-dark">
            Data Retention
          </h2>
          <p>
            We do not store personal data on our servers. AI tool inputs
            may be cached temporarily (up to 1 hour) for performance but
            are not linked to individual users.
          </p>

          <h2 className="text-xl font-bold text-primary-dark">Contact</h2>
          <p>
            For privacy-related questions, please reach out via the
            contact information on our About page.
          </p>
        </div>
      </main>
      <Footer />
    </ClientShell>
  );
}
