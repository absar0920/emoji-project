import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/types/blog";
import { AnimatedCard } from "@/components/MotionWrappers";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <AnimatedCard>
      <Link
        href={`/blog/${post.slug}`}
        className="block bg-white dark:bg-slate-800 rounded-2xl shadow-sm card-lift hover:shadow-md hover:border-primary/40 border border-neutral-200/80 dark:border-slate-700 overflow-hidden"
      >
        {/* Featured Image */}
        <div className="aspect-[16/9] bg-neutral-100 dark:bg-slate-700 relative">
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-4xl">
              📝
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {post.categories.length > 0 && (
            <div className="flex gap-1.5 mb-2">
              {post.categories.map((cat) => (
                <span
                  key={cat.id}
                  className="text-xs px-2 py-0.5 rounded-full border border-neutral-200 dark:border-slate-700 text-primary font-medium"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          )}

          <h3 className="font-display text-primary-dark dark:text-white line-clamp-2 mb-1">
            {post.title}
          </h3>
          <p className="text-sm text-neutral-500 dark:text-slate-400 line-clamp-3 mb-3">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-2 text-xs text-neutral-400 dark:text-slate-500">
            <span>{formattedDate}</span>
            <span>·</span>
            <span>{post.author}</span>
          </div>
        </div>
      </Link>
    </AnimatedCard>
  );
}
