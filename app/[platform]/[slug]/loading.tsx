import { Skeleton, SkeletonChips } from "@/components/Skeleton";

export default function PlatformPageLoading() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <Skeleton w="220px" h="14px" className="mb-4" />
      <div className="bg-gradient-to-br from-[#EEF2FF] to-[#F5F3FF] rounded-2xl p-6 sm:p-8 mb-6 flex flex-col sm:flex-row items-center gap-6">
        <Skeleton w="128px" h="128px" />
        <div className="flex-1">
          <Skeleton w="70%" h="28px" className="mb-2" />
          <Skeleton w="140px" h="14px" className="mb-3" />
          <div className="flex gap-2">
            <Skeleton w="80px" h="32px" round />
            <Skeleton w="120px" h="32px" round />
          </div>
        </div>
      </div>
      <div className="mb-10">
        <Skeleton w="180px" h="24px" className="mb-4" />
        <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-100 space-y-4">
          <Skeleton w="100%" h="14px" />
          <Skeleton w="90%" h="14px" />
          <Skeleton w="75%" h="14px" />
          <Skeleton w="60%" h="14px" />
        </div>
      </div>
      <div className="mb-10">
        <Skeleton w="200px" h="20px" className="mb-4" />
        <SkeletonChips count={8} />
      </div>
    </main>
  );
}
