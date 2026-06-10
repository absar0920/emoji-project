interface SkeletonProps {
  w?: string;
  h?: string;
  round?: boolean;
  className?: string;
}

export function Skeleton({ w = "100%", h = "14px", round = false, className = "" }: SkeletonProps) {
  return (
    <div
      className={`fg-shimmer ${className}`}
      style={{ width: w, height: h, borderRadius: round ? "9999px" : "0" }}
    />
  );
}

/** Masthead skeleton: kicker + big title + dek + rule (matches the page recipe). */
export function MastheadSkeleton() {
  return (
    <div className="border-b-2 border-[var(--line)] pb-7 mb-9">
      <Skeleton w="120px" h="11px" className="mb-5" />
      <Skeleton w="62%" h="44px" className="mb-3" />
      <Skeleton w="40%" h="18px" />
    </div>
  );
}

/** A run of hairline-separated ledger rows. */
export function SkeletonRows({ count = 6 }: { count?: number }) {
  return (
    <div className="border-t border-[var(--line)]">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 py-4 border-b border-[var(--line)]">
          <Skeleton w="2.4rem" h="2.4rem" />
          <div className="flex-1">
            <Skeleton w="34%" h="12px" className="mb-2" />
            <Skeleton w="70%" h="13px" />
          </div>
        </div>
      ))}
    </div>
  );
}

/** A grid of bordered card skeletons (field-guide: no shadow, zero radius). */
export function SkeletonGrid({ cols = 3, count = 6 }: { cols?: number; count?: number }) {
  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border border-[var(--line)] p-4">
          <Skeleton w="48px" h="48px" className="mb-3" />
          <Skeleton w="70%" h="14px" className="mb-2" />
          <Skeleton w="50%" h="12px" />
        </div>
      ))}
    </div>
  );
}

/** A specimen grid skeleton (search index). */
export function SkeletonSpecimens({ count = 24 }: { count?: number }) {
  return (
    <div className="grid gap-x-4 gap-y-7" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(5rem, 1fr))" }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <Skeleton w="44px" h="44px" />
          <Skeleton w="60px" h="10px" />
        </div>
      ))}
    </div>
  );
}

/** Full route-loading shell: theme-editorial + container + masthead. */
export function PageSkeleton({ wide = false, children }: { wide?: boolean; children?: React.ReactNode }) {
  return (
    <main className="theme-editorial min-h-screen">
      <div className={`mx-auto px-5 sm:px-6 py-9 sm:py-12 ${wide ? "max-w-6xl" : "max-w-3xl"}`}>
        <MastheadSkeleton />
        {children}
      </div>
    </main>
  );
}
