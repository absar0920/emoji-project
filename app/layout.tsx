import type { Metadata } from "next";
import { Noto_Color_Emoji, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

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

// Consistent color emoji across OSes — used as a *fallback* after the text faces, so Latin
// text keeps rendering in the editorial fonts and only emoji codepoints fall through to Noto.
// Fixes "tofu" boxes for newer emoji on devices with an outdated system emoji font.
const notoColorEmoji = Noto_Color_Emoji({
  weight: "400",
  subsets: ["emoji"],
  display: "swap",
  variable: "--font-emoji",
});

export const metadata: Metadata = {
  title: {
    default: "Emoji Meaning — Every Emoji, Decoded.",
    template: "%s | Emoji Meaning",
  },
  description:
    "Discover what every emoji really means. Gen-Z slang, TikTok meanings, cultural intelligence, and platform-specific usage for 1000+ emojis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.variable} ${notoColorEmoji.variable}`}>
      <body className="font-sans antialiased bg-[#f7f2e9] dark:bg-[#100e0c] text-neutral-700 dark:text-slate-300">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t!=='light'){document.documentElement.classList.add('dark')}var s=localStorage.getItem('sidebar-collapsed');document.documentElement.dataset.sidebar=s==='1'?'collapsed':'expanded';})();`,
          }}
        />
        <ThemeProvider>
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
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
