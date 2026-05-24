import { MetadataRoute } from "next";
import { getAllSlugs, getAllComparisonSlugs, getAllComboSlugs } from "@/lib/mongodb";
import { PLATFORM_KEYS } from "@/types/emoji";
import { CULTURE_REGIONS } from "@/types/emoji";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://emojintel.com";
const MAX_PER_SITEMAP = 45000;

export async function generateSitemaps() {
  // Chunk 0: static pages + combos + cultures
  // Chunks 1-15: one per platform
  // Chunk 16: comparisons
  // Chunk 17: base emoji pages
  const ids = [];
  for (let i = 0; i <= 17; i++) {
    ids.push({ id: i });
  }
  return ids;
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  if (id === 0) {
    // Static pages + combos + cultures
    const comboSlugs = await getAllComboSlugs();
    return [
      { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
      { url: `${SITE_URL}/search`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
      ...comboSlugs.map((slug) => ({
        url: `${SITE_URL}/combo/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })),
      ...CULTURE_REGIONS.map((region) => ({
        url: `${SITE_URL}/culture/${region}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ];
  }

  if (id >= 1 && id <= 15) {
    // Platform pages: one sitemap per platform
    const platformIndex = id - 1;
    const platform = PLATFORM_KEYS[platformIndex];
    const slugs = await getAllSlugs();
    return slugs.map((slug) => ({
      url: `${SITE_URL}/${platform}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  }

  if (id === 16) {
    // Comparison pages
    const compSlugs = await getAllComparisonSlugs();
    return compSlugs.map((slug) => ({
      url: `${SITE_URL}/vs/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  }

  if (id === 17) {
    // Base emoji pages
    const slugs = await getAllSlugs();
    return slugs.map((slug) => ({
      url: `${SITE_URL}/emoji/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  }

  return [];
}
