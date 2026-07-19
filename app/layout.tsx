import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import { SOCIAL_LINKS } from "@/lib/social";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.emojismeaning.com";

// Site-wide Organization entity. `sameAs` asserts our official social profiles
// to search engines (entity/knowledge-graph signal); sourced from the same
// SOCIAL_LINKS list the visible footer/about icons use, so they can't drift.
const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Emoji Meaning",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  sameAs: SOCIAL_LINKS.map((s) => s.url),
};

// GA4 property. Non-secret (ships to every browser). Loaded only in production
// so local `npm run dev` traffic never counts. SPA route-change pageviews are
// handled by GA4 Enhanced Measurement (History-event tracking, on by default).
// No consent gating today — if EU-consent compliance is needed later, add
// Google Consent Mode v2 (gtag('consent','default',{...}) before the config).
const GA_ID = "G-BKG5X1CEN3";

// Single site-wide typeface. Covers every role (body, headings, labels) via weights;
// italic included for pull-quotes/standfirsts. Exposed under every legacy font variable so
// the existing fg-* / @theme stacks all resolve to Poppins.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Emoji Meaning — Every Emoji, Decoded.",
    template: "%s | Emoji Meaning",
  },
  description:
    "Discover what every emoji really means. Gen-Z slang, TikTok meanings, cultural intelligence, and platform-specific usage for 1000+ emojis.",
  // Google Search Console ownership. Renders <meta name="google-site-verification" ...>.
  verification: {
    google: "WVp49MCpFgdgpon-MSeHZ4jFT_c6cx1hCAzS250QTVM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <body className="font-sans antialiased bg-[#f7f2e9] dark:bg-[#100e0c] text-neutral-700 dark:text-slate-300">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t!=='light'){document.documentElement.classList.add('dark')}var s=localStorage.getItem('sidebar-collapsed');document.documentElement.dataset.sidebar=s==='1'?'collapsed':'expanded';})();`,
          }}
        />
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
        />
        {process.env.NODE_ENV === "production" && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="lazyOnload"
            />
            <Script id="ga4-init" strategy="lazyOnload">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
