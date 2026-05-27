import { Skeleton } from "@/components/Skeleton";

export default function ComparisonLoading() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <Skeleton w="240px" h="14px" className="mb-4" />
      <div className="bg-gradient-to-br from-[#EEF2FF] to-[#F5F3FF] dark:from-slate-800 dark:to-indigo-950 rounded-2xl p-6 sm:p-8 mb-6">
        <div className="flex items-center justify-center gap-6 sm:gap-12">
          <div className="text-center">
            <Skeleton w="80px" h="80px" className="mx-auto mb-2" />
            <Skeleton w="60px" h="14px" className="mx-auto" />
          </div>
          <Skeleton w="40px" h="32px" />
          <div className="text-center">
            <Skeleton w="80px" h="80px" className="mx-auto mb-2" />
            <Skeleton w="60px" h="14px" className="mx-auto" />
          </div>
        </div>
        <Skeleton w="250px" h="24px" className="mx-auto mt-4" />
      </div>
      <Skeleton w="100%" h="60px" round className="mb-8" />
      <div className="mb-10">
        <Skeleton w="160px" h="24px" className="mb-4" />
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm dark:shadow-slate-900/30 border border-neutral-100 dark:border-slate-700 p-4 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="grid grid-cols-3 gap-4">
              <Skeleton w="100%" h="14px" />
              <Skeleton w="60px" h="14px" className="mx-auto" />
              <Skeleton w="100%" h="14px" />
            </div>
          ))}
        </div>
      </div>
      <div className="mb-10">
        <Skeleton w="160px" h="24px" className="mb-4" />
        <Skeleton w="100%" h="14px" className="mb-2" />
        <Skeleton w="80%" h="14px" />
      </div>
    </main>
  );
}
