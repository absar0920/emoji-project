// app/admin/posts/actions.ts
"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/dal";
import { createPost, updatePost, deletePost as del, setStatus, getPostById, BLOG_SITEMAP_ID } from "@/lib/blog";
import type { BlogPostInput, BlogStatus } from "@/types/blog";

async function assertAdmin() {
  if (!(await isAdmin())) throw new Error("Unauthorized");
}
// `/sitemap.xml` (next.config.ts rewrite -> app/api/sitemap-index/route.ts)
// is a fixed-count index of chunk URLs, not post data — it doesn't need
// revalidating. The actual blog-post URLs live in the sitemap chunk at
// /sitemap/<BLOG_SITEMAP_ID>.xml (generateSitemaps() in app/sitemap.ts),
// which is what must be kept fresh on every write.
function revalidateBlog(slug: string, categories: { slug: string }[] = []) {
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  for (const c of categories) revalidatePath(`/blog/category/${c.slug}`);
  revalidatePath(`/sitemap/${BLOG_SITEMAP_ID}.xml`);
}

export async function savePost(input: BlogPostInput & { id?: string }): Promise<{ id: string; slug: string }> {
  await assertAdmin();
  const { id, ...data } = input;
  const prior = id ? await getPostById(id) : null;
  const res = id ? { id, ...(await updatePost(id, data)) } : await createPost(data);
  revalidateBlog(res.slug, data.categories);
  if (prior && prior.slug !== res.slug) {
    // Slug changed: the old URL must stop serving the (now stale/removed) post.
    revalidatePath(`/blog/${prior.slug}`);
  }
  if (prior) {
    const newCategorySlugs = new Set(data.categories.map((c) => c.slug));
    for (const c of prior.categories) {
      if (!newCategorySlugs.has(c.slug)) revalidatePath(`/blog/category/${c.slug}`);
    }
  }
  return res;
}

export async function setPostStatus(id: string, status: BlogStatus): Promise<void> {
  await assertAdmin();
  const { slug } = await setStatus(id, status);
  revalidateBlog(slug);
}

export async function deletePost(id: string): Promise<void> {
  await assertAdmin();
  const post = await getPostById(id);
  await del(id);
  if (post) revalidateBlog(post.slug, post.categories);
  else {
    revalidatePath("/blog");
    revalidatePath(`/sitemap/${BLOG_SITEMAP_ID}.xml`);
  }
  redirect("/admin");
}
