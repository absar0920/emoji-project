import { Skeleton, SkeletonCard, SkeletonChips } from "@/components/Skeleton";

export default function HomeLoading() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#F8F7FF] to-[#EEF2FF] py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Skeleton w="180px" h="28px" round className="mx-auto mb-6" />
          <Skeleton w="80%" h="40px" className="mx-auto mb-3" />
          <Skeleton w="60%" h="40px" className="mx-auto mb-4" />
          <Skeleton w="200px" h="16px" className="mx-auto mb-8" />
          <Skeleton w="100%" h="48px" round className="max-w-md mx-auto" />
        </div>
      </section>

      {/* Popular */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <Skeleton w="140px" h="24px" />
            <Skeleton w="80px" h="16px" />
          </div>
          <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} w="48px" h="48px" />
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-12 bg-neutral-50/50">
        <div className="max-w-5xl mx-auto px-4">
          <Skeleton w="160px" h="24px" className="mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          <Skeleton w="180px" h="24px" className="mb-6" />
          <SkeletonChips count={9} />
        </div>
      </section>
    </main>
  );
}
