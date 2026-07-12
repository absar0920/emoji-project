import Link from "next/link";
import { listAllPosts } from "@/lib/blog";
import type { BlogListItem, BlogStatus } from "@/types/blog";

const STATUS_LABEL: Record<BlogStatus, string> = {
  draft: "Draft",
  published: "Published",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function StatusBadge({ status }: { status: BlogStatus }) {
  const color = status === "published" ? "var(--good)" : "var(--warn)";
  return (
    <span
      className="mono uppercase tracking-[0.14em] text-[0.62rem] px-2 py-0.5 border"
      style={{ borderColor: color, color }}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

function PostRow({ post }: { post: BlogListItem }) {
  return (
    <Link href={`/admin/posts/${post.id}/edit`} className="fg-entry no-underline">
      <span className="fg-entry__glyph" aria-hidden="true">
        {post.status === "published" ? "✅" : "📝"}
      </span>
      <span className="fg-entry__main">
        <span className="fg-entry__name">{post.title}</span>
        {post.excerpt && <p className="fg-entry__text line-clamp-2">{post.excerpt}</p>}
        <span className="fg-entry__meta flex flex-wrap items-center gap-3">
          <StatusBadge status={post.status} />
          <span>
            {post.status === "published" && post.published_at
              ? `Published ${formatDate(post.published_at)}`
              : `Updated ${formatDate(post.updated_at)}`}
          </span>
        </span>
      </span>
    </Link>
  );
}

function PostSection({ title, posts }: { title: string; posts: BlogListItem[] }) {
  if (posts.length === 0) return null;
  return (
    <section className="mb-12">
      <p className="fg-label mb-1">
        {title} <span className="t-muted">— {posts.length}</span>
      </p>
      <div className="fg-list">
        {posts.map((post) => (
          <PostRow key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

export default async function AdminDashboardPage() {
  const posts = await listAllPosts();

  if (posts.length === 0) {
    return (
      <div className="py-20 border-y border-[var(--line)] text-center">
        <span className="text-5xl block mb-5">📝</span>
        <p className="mono text-[0.8rem] uppercase tracking-[0.14em] t-muted mb-6">
          No posts yet — start your first dispatch
        </p>
        <Link href="/admin/posts/new" className="fg-btn px-5 py-2.5 inline-flex">
          New post →
        </Link>
      </div>
    );
  }

  const drafts = posts.filter((post) => post.status === "draft");
  const published = posts.filter((post) => post.status === "published");

  return (
    <div>
      <PostSection title="Drafts" posts={drafts} />
      <PostSection title="Published" posts={published} />
    </div>
  );
}
