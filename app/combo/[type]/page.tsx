import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getComboBySlug, getRelatedCombos } from "@/lib/mongodb";
import { generateComboMeta } from "@/lib/seo";
import ComboDisplay from "@/components/ComboDisplay";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FadeIn, AnimatedSection } from "@/components/MotionWrappers";

// Weekly ISR: each URL renders on first request, then serves from cache for 7 days.
// Empty generateStaticParams => nothing prerendered at build (keeps build under Vercel's limit).
export const revalidate = 604800;
export async function generateStaticParams() {
  return [];
}

interface PageProps {
  params: Promise<{ type: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type } = await params;
  const combo = await getComboBySlug(type);
  if (!combo) return { title: "Combo Not Found" };
  const meta = generateComboMeta(combo);
  return { title: meta.title, description: meta.description, alternates: { canonical: meta.canonical } };
}

export default async function ComboPage({ params }: PageProps) {
  const { type } = await params;
  const combo = await getComboBySlug(type);
  if (!combo) notFound();

  const relatedCombos = await getRelatedCombos(6);

  return (
    <ClientShell>
      <main className="theme-editorial min-h-screen">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 py-9 sm:py-12">
          <div className="fg-runhead mb-10 sm:mb-12">
            <span className="flex items-center gap-2 min-w-0">
              <Link href="/" className="fg-link">Home</Link>
              <span className="opacity-40" aria-hidden="true">/</span>
              <Link href="/tools/emoji-combos" className="fg-link">Combos</Link>
              <span className="opacity-40" aria-hidden="true">/</span>
              <span className="t-ink truncate">{combo.theme}</span>
            </span>
            <span className="hidden sm:inline shrink-0">Field Guide</span>
          </div>

          {/* Masthead */}
          <FadeIn immediate>
            <div className="border-b-2 border-[var(--rule)] pb-7">
              <p className="fg-kicker mb-4">Emoji Combos</p>
              <h1 className="font-display t-ink leading-[1.02] tracking-[-0.015em] text-[2.4rem] sm:text-[3.4rem]">{combo.theme}</h1>
              {combo.seo_description && <p className="t-muted font-read mt-4 max-w-2xl">{combo.seo_description}</p>}
            </div>
          </FadeIn>

          {combo.combos[0] && (
            <AnimatedSection>
              <div className="mt-9">
                <ComboDisplay emojis={combo.combos[0].emojis} label={combo.combos[0].label} primary />
              </div>
            </AnimatedSection>
          )}

          {combo.combos.length > 1 && (
            <AnimatedSection>
              <section className="pt-12">
                <div className="fg-chapter__bar">
                  <span className="fg-chapter__n">More</span>
                  <span className="fg-chapter__count">{combo.combos.length - 1} sets</span>
                </div>
                <h2 className="fg-chapter__title mt-5 text-[1.6rem] sm:text-[2rem]">More {combo.theme} combos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-7">
                  {combo.combos.slice(1).map((c, i) => (
                    <ComboDisplay key={i} emojis={c.emojis} label={c.label} />
                  ))}
                </div>
              </section>
            </AnimatedSection>
          )}

          {relatedCombos.filter((r) => r.slug !== type).length > 0 && (
            <AnimatedSection>
              <section className="pt-12">
                <div className="fg-chapter__bar">
                  <span className="fg-chapter__n">Related</span>
                  <span className="fg-chapter__count">themes</span>
                </div>
                <h2 className="fg-chapter__title mt-5 text-[1.6rem] sm:text-[2rem]">Related combos</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-7">
                  {relatedCombos.filter((r) => r.slug !== type).map((r) => (
                    <Link key={r.slug} href={`/combo/${r.slug}`} className="fg-card fg-link flex flex-col items-center gap-2 p-4 text-center">
                      <span className="text-2xl">{r.combos[0]?.emojis.slice(0, 4).join("")}</span>
                      <span className="font-read text-sm t-ink">{r.theme}</span>
                    </Link>
                  ))}
                </div>
              </section>
            </AnimatedSection>
          )}
        </div>
      </main>
      <Footer />
    </ClientShell>
  );
}
