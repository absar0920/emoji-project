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
        className="block bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden hover:shadow-md transition-shadow"
      >
        {/* Featured Image */}
        <div className="aspect-[16/9] bg-gradient-to-br from-primary-light to-violet-50 relative">
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
                  className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          )}

          <h3 className="font-semibold text-neutral-900 line-clamp-2 mb-1">
            {post.title}
          </h3>
          <p className="text-sm text-neutral-500 line-clamp-3 mb-3">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span>{formattedDate}</span>
            <span>·</span>
            <span>{post.author}</span>
          </div>
        </div>
      </Link>
    </AnimatedCard>
  );
}
