import type { ReactNode } from "react";
import Link from "next/link";
import { requireAdmin } from "@/lib/dal";
import { logout } from "../actions";

export default async function AdminProtectedLayout({ children }: { children: ReactNode }) {
  await requireAdmin();

  return (
    <div className="theme-editorial min-h-screen">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 py-9 sm:py-12">
        <div className="fg-runhead mb-10 sm:mb-12">
          <span className="flex items-center gap-2">
            <Link href="/" className="fg-link">Emoji Meaning</Link>
            <span className="opacity-40" aria-hidden="true">/</span>
            <span className="t-ink">Admin</span>
          </span>
          <span className="hidden sm:inline">Field Guide</span>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-5 border-b-2 border-[var(--rule)] pb-7 mb-9">
          <div>
            <p className="fg-kicker mb-3">Dashboard</p>
            <h1 className="font-display t-ink leading-[1.0] tracking-[-0.015em] text-[2.2rem] sm:text-[2.6rem]">Posts</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/posts/new" className="fg-btn px-5 py-2.5">New post →</Link>
            <form action={logout}>
              <button type="submit" className="fg-btn fg-btn-ghost px-5 py-2.5">Log out</button>
            </form>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
