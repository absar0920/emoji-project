import { Skeleton } from "@/components/Skeleton";

export default function EmojiTrendsLoading() {
  return (
    <>
      <div className="bg-gradient-to-b from-primary-light/30 dark:from-indigo-900/20 to-transparent -mx-4 px-4 py-8 mb-8 rounded-2xl">
        <Skeleton w="100px" h="24px" round className="mb-4" />
        <Skeleton w="210px" h="28px" className="mb-2" />
        <Skeleton w="320px" h="16px" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm dark:shadow-slate-900/30 border border-neutral-100 dark:border-slate-700">
            <Skeleton w="24px" h="20px" />
            <Skeleton w="48px" h="48px" />
            <div className="flex-1">
              <Skeleton w="120px" h="16px" className="mb-1" />
              <Skeleton w="80px" h="12px" />
            </div>
            <Skeleton w="60px" h="28px" round />
          </div>
        ))}
      </div>
    </>
  );
}
