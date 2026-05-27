import { Skeleton, SkeletonChips } from "@/components/Skeleton";

export default function CultureLoading() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <Skeleton w="180px" h="14px" className="mb-4" />
      <div className="bg-gradient-to-br from-[#EEF2FF] to-[#F5F3FF] dark:from-slate-800 dark:to-indigo-950 rounded-2xl p-6 sm:p-8 mb-8 text-center">
        <Skeleton w="64px" h="64px" className="mx-auto mb-3" />
        <Skeleton w="280px" h="28px" className="mx-auto mb-2" />
        <Skeleton w="220px" h="14px" className="mx-auto" />
      </div>
      <div className="mb-10">
        <Skeleton w="200px" h="24px" className="mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm dark:shadow-slate-900/30 border border-neutral-100 dark:border-slate-700">
              <Skeleton w="48px" h="48px" />
              <div className="flex-1">
                <Skeleton w="120px" h="16px" className="mb-2" />
                <Skeleton w="100%" h="12px" className="mb-1" />
                <Skeleton w="80%" h="12px" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-10">
        <Skeleton w="200px" h="20px" className="mb-4" />
        <SkeletonChips count={10} />
      </div>
    </main>
  );
}
