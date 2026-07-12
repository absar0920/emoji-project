import BlogEditor from "@/components/admin/BlogEditor";
import { getExistingCategoryNames } from "@/lib/blog";

export default async function NewPostPage() {
  const suggestions = await getExistingCategoryNames();

  return <BlogEditor suggestions={suggestions} />;
}
