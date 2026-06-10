import { Skeleton, MastheadSkeleton, SkeletonRows } from "@/components/Skeleton";

export default function HomeLoading() {
  return (
    <main className="theme-editorial min-h-screen">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-9 sm:py-12">
        <MastheadSkeleton />
        {/* specimen plate */}
        <div className="flex gap-7 border-y border-[var(--line)] py-5 mb-9 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 shrink-0">
              <Skeleton w="44px" h="44px" />
              <Skeleton w="48px" h="9px" />
            </div>
          ))}
        </div>
        <Skeleton w="100%" h="52px" className="max-w-2xl mb-9" />
        <SkeletonRows count={6} />
      </div>
    </main>
  );
}
