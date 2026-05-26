import { BlogPost, BlogCategory } from "@/types/blog";

const WP_API = process.env.WORDPRESS_API_URL || "";

function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function mapPost(raw: any): BlogPost {
  const embedded = raw._embedded || {};
  const featuredMedia = embedded["wp:featuredmedia"]?.[0];
  const author = embedded.author?.[0];
  const terms = embedded["wp:term"]?.[0] || [];

  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title?.rendered || "",
    excerpt: stripHtmlTags(raw.excerpt?.rendered || ""),
    content: raw.content?.rendered || "",
    date: raw.date,
    modified: raw.modified,
    author: author?.name || "Unknown",
    featuredImage: featuredMedia?.source_url || null,
    categories: terms.map((t: any) => ({
      id: t.id,
      name: t.name,
      slug: t.slug,
    })),
  };
}

function mapCategory(raw: any): BlogCategory {
  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    count: raw.count,
    description: raw.description || "",
  };
}

export async function getPosts(
  page = 1,
  perPage = 12,
  categoryId?: number
): Promise<{ posts: BlogPost[]; totalPages: number }> {
  if (!WP_API) return { posts: [], totalPages: 0 };

  const params = new URLSearchParams({
    _embed: "true",
    page: String(page),
    per_page: String(perPage),
  });
  if (categoryId) params.set("categories", String(categoryId));

  try {
    const res = await fetch(`${WP_API}/posts?${params}`, { cache: "no-store" });
    if (!res.ok) return { posts: [], totalPages: 0 };

    const totalPages = Number(res.headers.get("X-WP-TotalPages")) || 1;
    const data = await res.json();
    return { posts: data.map(mapPost), totalPages };
  } catch {
    return { posts: [], totalPages: 0 };
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!WP_API) return null;

  try {
    const res = await fetch(
      `${WP_API}/posts?_embed=true&slug=${encodeURIComponent(slug)}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;

    const data = await res.json();
    if (!data.length) return null;
    return mapPost(data[0]);
  } catch {
    return null;
  }
}

export async function getCategories(): Promise<BlogCategory[]> {
  if (!WP_API) return [];

  try {
    const res = await fetch(`${WP_API}/categories?per_page=100`, {
      cache: "no-store",
    });
    if (!res.ok) return [];

    const data = await res.json();
    return data.map(mapCategory).filter((c: BlogCategory) => c.count > 0);
  } catch {
    return [];
  }
}

export async function getCategoryBySlug(
  slug: string
): Promise<BlogCategory | null> {
  if (!WP_API) return null;

  try {
    const res = await fetch(
      `${WP_API}/categories?slug=${encodeURIComponent(slug)}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;

    const data = await res.json();
    if (!data.length) return null;
    return mapCategory(data[0]);
  } catch {
    return null;
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  if (!WP_API) return [];

  const slugs: string[] = [];
  let page = 1;

  try {
    while (true) {
      const res = await fetch(
        `${WP_API}/posts?per_page=100&_fields=slug&page=${page}`,
        { cache: "no-store" }
      );
      if (!res.ok) break;

      const data = await res.json();
      if (!data.length) break;

      slugs.push(...data.map((p: any) => p.slug));
      const totalPages = Number(res.headers.get("X-WP-TotalPages")) || 1;
      if (page >= totalPages) break;
      page++;
    }
  } catch {
    // return what we have
  }

  return slugs;
}
