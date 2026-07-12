// app/admin/posts/actions.ts
"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/dal";
import { createPost, updatePost, deletePost as del, setStatus } from "@/lib/blog";
import type { BlogPostInput, BlogStatus } from "@/types/blog";

async function assertAdmin() {
  if (!(await isAdmin())) throw new Error("Unauthorized");
}
function revalidateBlog(slug: string, categories: { slug: string }[] = []) {
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  for (const c of categories) revalidatePath(`/blog/category/${c.slug}`);
  revalidatePath("/sitemap.xml");
}

export async function savePost(input: BlogPostInput & { id?: string }): Promise<{ id: string; slug: string }> {
  await assertAdmin();
  const { id, ...data } = input;
  const res = id ? { id, ...(await updatePost(id, data)) } : await createPost(data);
  revalidateBlog(res.slug, data.categories);
  return res;
}

export async function setPostStatus(id: string, status: BlogStatus): Promise<void> {
  await assertAdmin();
  const { slug } = await setStatus(id, status);
  revalidateBlog(slug);
}

export async function deletePost(id: string): Promise<void> {
  await assertAdmin();
  await del(id);
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  redirect("/admin");
}
