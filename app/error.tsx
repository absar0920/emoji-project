"use client";

import Link from "next/link";

export default function Error({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <span className="text-[100px] leading-none block mb-6">😵‍💫</span>
        <h1 className="text-3xl font-extrabold text-primary-dark mb-3">
          Something Went Wrong
        </h1>
        <p className="text-neutral-500 mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={unstable_retry}
            className="px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary-dark transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-neutral-100 text-neutral-700 font-medium hover:bg-neutral-200 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
