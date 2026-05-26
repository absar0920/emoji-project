interface SkeletonProps {
  w?: string;
  h?: string;
  round?: boolean;
  className?: string;
}

export function Skeleton({ w = "100%", h = "14px", round = false, className = "" }: SkeletonProps) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width: w,
        height: h,
        borderRadius: round ? "9999px" : "8px",
        background: "linear-gradient(90deg, #E5E7EB 25%, #F3F4F6 50%, #E5E7EB 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s ease-in-out infinite",
      }}
    />
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-white rounded-xl p-4 shadow-sm border border-neutral-100 ${className}`}>
      <Skeleton w="48px" h="48px" className="mb-3" />
      <Skeleton w="70%" h="14px" className="mb-2" />
      <Skeleton w="50%" h="12px" />
    </div>
  );
}

export function SkeletonGrid({ cols = 3, count = 6 }: { cols?: number; count?: number }) {
  return (
    <div
      className="gap-3"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonTabs({ count = 4 }: { count?: number }) {
  return (
    <div className="mb-6">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: count }).map((_, i) => (
          <Skeleton key={i} w={`${60 + i * 10}px`} h="36px" />
        ))}
      </div>
      <Skeleton w="100%" h="14px" className="mb-2" />
      <Skeleton w="85%" h="14px" className="mb-2" />
      <Skeleton w="65%" h="14px" />
    </div>
  );
}

export function SkeletonChips({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} w={`${80 + (i % 3) * 20}px`} h="32px" round />
      ))}
    </div>
  );
}
