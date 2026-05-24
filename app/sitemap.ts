import { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/mongodb";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://emojintel.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllSlugs();
  const emojiPages = slugs.map((slug) => ({
    url: `${SITE_URL}/emoji/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${SITE_URL}/search`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.5 },
    ...emojiPages,
  ];
}
