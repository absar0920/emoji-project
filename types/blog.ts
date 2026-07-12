export interface BlogCategoryRef {
  name: string;
  slug: string;
}

export type BlogStatus = "draft" | "published";

/** Stored document in the `blog_posts` collection. */
export interface BlogPost {
  id: string;               // stringified Mongo _id
  slug: string;
  title: string;
  excerpt: string;
  content_json: unknown;    // canonical ProseMirror JSON (TipTap getJSON())
  content_html: string;     // sanitized, rendered HTML for display
  status: BlogStatus;
  featured_image: string | null;
  featured_image_alt: string;
  categories: BlogCategoryRef[];
  seo_title: string;        // may be "" -> fall back to title
  seo_description: string;  // may be "" -> fall back to excerpt
  author: string;
  reading_time: number;     // minutes
  created_at: string;       // ISO
  updated_at: string;       // ISO
  published_at: string | null; // ISO, set on first publish
}

/** Input accepted by createPost/updatePost (server-derives html/reading_time/timestamps). */
export interface BlogPostInput {
  title: string;
  slug: string;
  excerpt: string;
  content_json: unknown;
  status: BlogStatus;
  featured_image: string | null;
  featured_image_alt: string;
  categories: BlogCategoryRef[];
  seo_title: string;
  seo_description: string;
}

/** Trimmed shape for list/card views (no content). */
export interface BlogListItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  status: BlogStatus;
  featured_image: string | null;
  categories: BlogCategoryRef[];
  author: string;
  reading_time: number;
  published_at: string | null;
  updated_at: string;
}

export interface BlogCategoryCount {
  name: string;
  slug: string;
  count: number;
}
