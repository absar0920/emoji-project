import { Skeleton } from "@/components/Skeleton";

export default function SearchLoading() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <Skeleton w="250px" h="28px" className="mb-2" />
      <Skeleton w="120px" h="16px" className="mb-8" />
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1 p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm dark:shadow-slate-900/30 border border-neutral-100 dark:border-slate-700">
            <Skeleton w="36px" h="36px" />
            <Skeleton w="60px" h="12px" />
          </div>
        ))}
      </div>
    </main>
  );
}
