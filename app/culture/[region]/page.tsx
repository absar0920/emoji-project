import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getEmojisByCulture } from "@/lib/mongodb";
import { generateCultureMeta, generateCultureBreadcrumb } from "@/lib/seo";
import { CULTURE_REGIONS, CULTURE_INFO, CultureRegion } from "@/types/emoji";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ region: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { region } = await params;
  if (!CULTURE_REGIONS.includes(region as CultureRegion)) return { title: "Not Found" };
  const meta = generateCultureMeta(region as CultureRegion);
  return { title: meta.title, description: meta.description, alternates: { canonical: meta.canonical } };
}

export default async function CulturePage({ params }: PageProps) {
  const { region } = await params;
  if (!CULTURE_REGIONS.includes(region as CultureRegion)) notFound();

  const regionKey = region as CultureRegion;
  const info = CULTURE_INFO[regionKey];
  const emojis = await getEmojisByCulture(regionKey);
  const breadcrumbSchema = generateCultureBreadcrumb(regionKey);

  return (
    <ClientShell>
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-neutral-400 mb-4">
          <a href="/" className="hover:text-primary">Home</a>{" › "}
          <span>Cultures</span>{" › "}
          <span className="text-neutral-600">{info.label}</span>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-to-br from-primary-light to-violet-50 rounded-2xl p-6 sm:p-8 mb-8 text-center">
          <span className="text-6xl block mb-3">{info.flag}</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-dark">
            Emoji Meanings in {info.label}
          </h1>
          <p className="text-neutral-500 mt-2">
            How emojis are interpreted and used in {info.label}
          </p>
        </div>

        {/* Emoji grid */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-primary-dark mb-4">
            Top Emojis in {info.label}
          </h2>
          <div className="space-y-4">
            {emojis.map((emoji) => {
              const culturalMeaning = (emoji.cultures as Record<string, string>)?.[regionKey] || "";
              return (
                <Link
                  key={emoji.slug}
                  href={`/emoji/${emoji.slug}`}
                  className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-neutral-100 hover:shadow-md transition-shadow"
                >
                  <span className="text-4xl flex-shrink-0">{emoji.character}</span>
                  <div>
                    <span className="font-medium text-neutral-900">{emoji.name}</span>
                    <p className="text-sm text-neutral-600 mt-1">{culturalMeaning}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Other cultures */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-primary-dark mb-4">Explore Other Cultures</h2>
          <div className="flex flex-wrap gap-2">
            {CULTURE_REGIONS.filter((r) => r !== regionKey).map((r) => {
              const rInfo = CULTURE_INFO[r];
              return (
                <Link
                  key={r}
                  href={`/culture/${r}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-sm border border-neutral-200 hover:bg-neutral-50 transition-colors"
                >
                  <span>{rInfo.flag}</span>
                  <span className="text-neutral-600">{rInfo.label}</span>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </ClientShell>
  );
}
