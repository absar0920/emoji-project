import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/types/blog";

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
    <Link
      href={`/blog/${post.slug}`}
      className="group block border border-[var(--line)] hover:border-[var(--accent)] transition-colors"
    >
      <div className="aspect-[16/9] bg-[var(--paper-2)] relative border-b border-[var(--line)] overflow-hidden">
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-4xl">📝</div>
        )}
      </div>

      <div className="p-4">
        {post.categories.length > 0 && (
          <div className="flex flex-wrap gap-x-2.5 gap-y-1 mb-2.5">
            {post.categories.map((cat) => (
              <span key={cat.id} className="fg-kicker">{cat.name}</span>
            ))}
          </div>
        )}
        <h3 className="font-display t-ink text-lg leading-snug line-clamp-2 mb-1.5 transition-colors group-hover:t-accent">
          {post.title}
        </h3>
        <p className="t-muted text-sm leading-relaxed line-clamp-3 mb-3.5">{post.excerpt}</p>
        <div className="fg-label flex items-center gap-2">
          <span>{formattedDate}</span>
          <span className="opacity-40" aria-hidden="true">·</span>
          <span>{post.author}</span>
        </div>
      </div>
    </Link>
  );
}
