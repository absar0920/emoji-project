import { Skeleton } from "@/components/Skeleton";

export default function EmojiVsLoading() {
  return (
    <>
      <div className="bg-gradient-to-b from-primary-light/30 dark:from-indigo-900/20 to-transparent -mx-4 px-4 py-8 mb-8 rounded-2xl">
        <Skeleton w="210px" h="28px" className="mb-2" />
        <Skeleton w="340px" h="16px" />
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <div className="flex-1 w-full text-center">
          <Skeleton w="64px" h="64px" className="mx-auto mb-2" />
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-neutral-200 dark:border-slate-700 p-3 w-full max-w-xs mx-auto">
            <Skeleton w="100%" h="36px" round className="mb-2" />
            <div className="grid grid-cols-6 gap-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} w="32px" h="32px" />
              ))}
            </div>
          </div>
        </div>
        <Skeleton w="32px" h="32px" />
        <div className="flex-1 w-full text-center">
          <Skeleton w="64px" h="64px" className="mx-auto mb-2" />
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-neutral-200 dark:border-slate-700 p-3 w-full max-w-xs mx-auto">
            <Skeleton w="100%" h="36px" round className="mb-2" />
            <div className="grid grid-cols-6 gap-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} w="32px" h="32px" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mb-10">
        <Skeleton w="180px" h="48px" round className="mx-auto" />
      </div>
    </>
  );
}
