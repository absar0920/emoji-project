"use client";

import Link from "next/link";

export default function Error({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <div className="theme-editorial min-h-screen bg-[var(--paper)] flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        <span className="text-[5.5rem] leading-none block mb-6">😵‍💫</span>
        <p className="fg-kicker mb-4">Error</p>
        <h1 className="font-display t-ink leading-[1.04] tracking-[-0.015em] text-[2.4rem] sm:text-[3rem] mb-4">
          Something went wrong
        </h1>
        <p className="t-muted font-read mb-8">An unexpected error occurred. Please try again.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button onClick={unstable_retry} className="fg-btn px-6 py-3">Try again</button>
          <Link href="/" className="fg-btn-ghost mono text-[0.66rem] uppercase tracking-[0.14em] px-6 py-3">Go home</Link>
        </div>
      </div>
    </div>
  );
}
