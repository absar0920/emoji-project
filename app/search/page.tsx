import { Metadata } from "next";
import Link from "next/link";
import { getSearchIndex, getBrowseIndex } from "@/lib/mongodb";
import Footer from "@/components/Footer";
import ClientShell from "@/components/ClientShell";
import { EmojiSearchItem } from "@/types/emoji";

const PER_PAGE = 100;

interface PageProps {
  searchParams: Promise<{ q?: string; category?: string; page?: string }>;
}

function parsePage(raw?: string): number {
  return Math.max(1, parseInt(raw ?? "1", 10) || 1);
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { q, category, page: rawPage } = await searchParams;
  if (q) {
    return {
      title: `"${q}" — Emoji Search Results`,
      description: `Find the meaning of "${q}" emojis across Gen-Z slang, TikTok, WhatsApp, and more.`,
    };
  }
  // Clamp the advertised page to the real range so an out-of-range ?page=
  // (which renders as page 1) never claims a bogus page in the title.
  const requestedPage = parsePage(rawPage);
  const { total } = await getBrowseIndex(category ?? null, requestedPage);
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const page = requestedPage > totalPages ? 1 : requestedPage;
  const suffix = page > 1 ? ` · Page ${page}` : "";
  if (category) {
    return {
      title: `${category} Emojis — Meanings & Copy${suffix}`,
      description: `Browse every ${category} emoji with meanings, copy-paste characters, and usage across platforms.`,
    };
  }
  return {
    title: `All Emojis — The Index${suffix}`,
    description: "Browse every emoji with meanings, copy-paste characters, and platform usage.",
  };
}

/** Build a /search href preserving category, omitting page when 1. */
function pageHref(category: string | undefined, page: number): string {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `/search?${qs}` : "/search";
}

function Pagination({ category, page, totalPages }: { category?: string; page: number; totalPages: number }) {
  if (totalPages <= 1) return null;
  return (
    <nav className="mt-12 pt-6 border-t border-[var(--line)] flex items-center justify-between gap-4" aria-label="Pagination">
      {page > 1 ? (
        <Link href={pageHref(category, page - 1)} className="fg-link mono text-[0.8rem] uppercase tracking-[0.12em] t-ink">
          ← Previous
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
      <span className="mono text-[0.75rem] uppercase tracking-[0.14em] t-muted tabular-nums">
        Page {page} of {totalPages}
      </span>
      {page < totalPages ? (
        <Link href={pageHref(category, page + 1)} className="fg-link mono text-[0.8rem] uppercase tracking-[0.12em] t-ink">
          Next →
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
    </nav>
  );
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q, category, page: rawPage } = await searchParams;

  // Text-search mode: in-memory filter over the full index (unchanged).
  if (q) {
    const allEmojis = await getSearchIndex();
    const query = q.toLowerCase();
    const results = allEmojis.filter(
      (e) =>
        e.name.toLowerCase().includes(query) ||
        e.tags.some((t) => t.toLowerCase().includes(query)) ||
        e.character === q ||
        e.shortcode.toLowerCase().includes(query)
    );
    return <SearchResults heading={`“${q}”`} kicker="Search results" entries={results} />;
  }

  // Browse mode: paginated, Mongo-filtered by category (or all emojis).
  const requestedPage = parsePage(rawPage);
  const { items, total } = await getBrowseIndex(category ?? null, requestedPage);
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  // Out-of-range page → fall back to page 1's items.
  let entries = items;
  let page = requestedPage;
  if (requestedPage > totalPages) {
    page = 1;
    entries = (await getBrowseIndex(category ?? null, 1)).items;
  }

  const countLabel = `${total.toLocaleString()} ${total === 1 ? "entry" : "entries"}${
    totalPages > 1 ? ` · Page ${page} of ${totalPages}` : ""
  }`;

  return (
    <SearchResults
      heading={category ?? "All emojis"}
      kicker="The index"
      entries={entries}
      countLabel={countLabel}
      pagination={<Pagination category={category} page={page} totalPages={totalPages} />}
    />
  );
}

function SearchResults({
  heading,
  kicker,
  entries,
  countLabel,
  pagination,
}: {
  heading: string;
  kicker: string;
  entries: EmojiSearchItem[];
  countLabel?: string;
  pagination?: React.ReactNode;
}) {
  const count = countLabel ?? `${entries.length} ${entries.length === 1 ? "entry" : "entries"}`;
  return (
    <ClientShell>
      <main className="theme-editorial min-h-screen">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-9 sm:py-12">
          {/* Running head */}
          <div className="fg-runhead mb-10 sm:mb-12">
            <span className="flex items-center gap-2">
              <Link href="/" className="fg-link">Home</Link>
              <span className="opacity-40" aria-hidden="true">/</span>
              <span className="t-ink">Index</span>
            </span>
            <span className="hidden sm:inline">Field Guide</span>
          </div>

          {/* Masthead */}
          <div className="border-b-2 border-[var(--rule)] pb-7 mb-9">
            <p className="fg-kicker mb-4">{kicker}</p>
            <h1 className="font-display t-ink leading-[1.0] tracking-[-0.015em] text-[2.4rem] sm:text-[3.4rem]">
              {heading}
            </h1>
            <p className="fg-label mt-4">{count}</p>
          </div>

          {entries.length > 0 ? (
            <>
              <div className="fg-specimen-grid">
                {entries.map((emoji) => (
                  <Link key={emoji.slug} href={`/emoji/${emoji.slug}`} className="fg-specimen fg-link">
                    <span className="fg-specimen__g">{emoji.character}</span>
                    <span className="fg-specimen__c block text-center leading-tight line-clamp-2">{emoji.name}</span>
                  </Link>
                ))}
              </div>
              {pagination}
            </>
          ) : (
            <div className="py-20 border-y border-[var(--line)] text-center">
              <span className="text-5xl block mb-5">🔍</span>
              <p className="mono text-[0.8rem] uppercase tracking-[0.14em] t-muted">
                No entries found — try another term
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </ClientShell>
  );
}
