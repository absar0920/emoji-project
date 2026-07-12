import { notFound } from "next/navigation";
import BlogEditor from "@/components/admin/BlogEditor";
import { getExistingCategoryNames, getPostById } from "@/lib/blog";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) notFound();

  const suggestions = await getExistingCategoryNames();

  return <BlogEditor initial={post} suggestions={suggestions} />;
}
