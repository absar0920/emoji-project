import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getComboBySlug, getAllComboSlugs, getRelatedCombos } from "@/lib/mongodb";
import { generateComboMeta } from "@/lib/seo";
import ComboDisplay from "@/components/ComboDisplay";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FadeIn, AnimatedSection } from "@/components/MotionWrappers";

export const dynamic = "force-dynamic";

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
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-neutral-400 mb-4">
          <a href="/" className="hover:text-primary">Home</a>{" › "}
          <span>Combos</span>{" › "}
          <span className="text-neutral-600">{combo.theme}</span>
        </nav>

        {/* Hero */}
        <FadeIn>
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-dark mb-2">
              {combo.theme} Emoji Combos
            </h1>
            <p className="text-neutral-500">{combo.seo_description}</p>
          </div>
        </FadeIn>

        {/* Primary combo */}
        <AnimatedSection>
          {combo.combos[0] && (
            <div className="mb-6">
              <ComboDisplay emojis={combo.combos[0].emojis} label={combo.combos[0].label} primary />
            </div>
          )}
        </AnimatedSection>

        {/* Alternate combos */}
        <AnimatedSection>
          {combo.combos.length > 1 && (
            <section className="mb-10">
              <h2 className="text-lg font-bold text-primary-dark mb-4">More {combo.theme} Combos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {combo.combos.slice(1).map((c, i) => (
                  <ComboDisplay key={i} emojis={c.emojis} label={c.label} />
                ))}
              </div>
            </section>
          )}
        </AnimatedSection>

        {/* Related combos */}
        <AnimatedSection>
          {relatedCombos.length > 0 && (
            <section className="mb-10">
              <h2 className="text-lg font-bold text-primary-dark mb-4">Related Combos</h2>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {relatedCombos.filter((r) => r.slug !== type).map((r) => (
                  <Link
                    key={r.slug}
                    href={`/combo/${r.slug}`}
                    className="flex-shrink-0 px-4 py-3 bg-white rounded-xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow"
                  >
                    <span className="text-2xl block mb-1">{r.combos[0]?.emojis.slice(0, 4).join("")}</span>
                    <span className="text-xs text-neutral-600 font-medium">{r.theme}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </AnimatedSection>
      </main>
      <Footer />
    </ClientShell>
  );
}
