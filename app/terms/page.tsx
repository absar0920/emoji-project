import { Metadata } from "next";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — Emoji Intelligence",
  description: "Terms of service for Emoji Intelligence.",
};

export default function TermsPage() {
  return (
    <ClientShell>
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-primary-dark dark:text-white mb-6">
          Terms of Service
        </h1>
        <p className="text-sm text-neutral-400 dark:text-slate-500 mb-8">
          Last updated: May 2026
        </p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-neutral-700 dark:text-slate-300">
          <h2 className="text-xl font-bold text-primary-dark dark:text-white">
            Acceptance of Terms
          </h2>
          <p>
            By accessing and using Emoji Intelligence, you agree to be
            bound by these Terms of Service. If you do not agree, please
            do not use the service.
          </p>

          <h2 className="text-xl font-bold text-primary-dark dark:text-white">
            Description of Service
          </h2>
          <p>
            Emoji Intelligence provides emoji meaning analysis,
            interactive tools, and educational content about emoji usage
            across platforms and cultures. The service is provided free of
            charge and supported by advertising.
          </p>

          <h2 className="text-xl font-bold text-primary-dark dark:text-white">
            Content Disclaimer
          </h2>
          <p>
            Emoji meanings, cultural interpretations, and AI-generated
            content on this platform are for informational and
            entertainment purposes only. Meanings are generated using AI
            models and may not be fully accurate or reflect all cultural
            perspectives. Use your own judgment when interpreting emoji
            meanings in real conversations.
          </p>

          <h2 className="text-xl font-bold text-primary-dark dark:text-white">
            Intellectual Property
          </h2>
          <p>
            The content, design, and code of Emoji Intelligence are
            protected by copyright. Emoji characters themselves are part
            of the Unicode Standard. Vendor-specific emoji designs belong
            to their respective owners (Apple, Google, etc.).
          </p>

          <h2 className="text-xl font-bold text-primary-dark dark:text-white">
            Limitation of Liability
          </h2>
          <p>
            Emoji Intelligence is provided &quot;as is&quot; without
            warranties of any kind. We are not liable for any damages
            arising from your use of the platform, including but not
            limited to misinterpretation of emoji meanings.
          </p>

          <h2 className="text-xl font-bold text-primary-dark dark:text-white">
            Changes to Terms
          </h2>
          <p>
            We may update these terms from time to time. Continued use of
            the service after changes constitutes acceptance of the
            updated terms.
          </p>
        </div>
      </main>
      <Footer />
    </ClientShell>
  );
}
