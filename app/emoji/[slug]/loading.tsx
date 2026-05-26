import { Skeleton, SkeletonTabs, SkeletonGrid, SkeletonChips } from "@/components/Skeleton";

export default function EmojiDetailLoading() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <Skeleton w="200px" h="14px" className="mb-4" />

      {/* Hero */}
      <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 text-center mb-6">
        <Skeleton w="96px" h="96px" round className="mx-auto mb-4" />
        <Skeleton w="200px" h="28px" className="mx-auto mb-2" />
        <Skeleton w="140px" h="14px" className="mx-auto mb-3" />
        <div className="flex gap-2 justify-center">
          <Skeleton w="80px" h="32px" round />
          <Skeleton w="100px" h="32px" round />
        </div>
      </div>

      {/* Meaning Tabs */}
      <SkeletonTabs count={4} />

      {/* Platforms */}
      <div className="mb-10">
        <Skeleton w="160px" h="24px" className="mb-4" />
        <Skeleton w="100%" h="48px" className="mb-2" />
        <Skeleton w="100%" h="48px" className="mb-2" />
        <Skeleton w="100%" h="48px" />
      </div>

      {/* Cultures */}
      <div className="mb-10">
        <Skeleton w="180px" h="24px" className="mb-4" />
        <SkeletonGrid cols={2} count={4} />
      </div>

      {/* Timeline */}
      <div className="mb-10">
        <Skeleton w="180px" h="24px" className="mb-4" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex gap-4 items-center mb-3">
            <Skeleton w="50px" h="20px" />
            <Skeleton w="100%" h="16px" />
          </div>
        ))}
      </div>

      {/* Related */}
      <div className="mb-10">
        <Skeleton w="140px" h="24px" className="mb-4" />
        <SkeletonGrid cols={3} count={6} />
      </div>

      {/* Platform links */}
      <div className="mb-10">
        <Skeleton w="200px" h="20px" className="mb-4" />
        <SkeletonChips count={8} />
      </div>
    </main>
  );
}
