import { Skeleton } from "@/components/Skeleton";

export default function EmojiKitchenLoading() {
  return (
    <>
      <div className="bg-gradient-to-b from-primary-light/30 to-transparent -mx-4 px-4 py-8 mb-8 rounded-2xl">
        <Skeleton w="100px" h="24px" round className="mb-4" />
        <Skeleton w="200px" h="28px" className="mb-2" />
        <Skeleton w="300px" h="16px" />
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <div className="flex-1 w-full text-center">
          <Skeleton w="64px" h="64px" className="mx-auto mb-2" />
          <div className="bg-white rounded-xl border border-neutral-200 p-3 w-full max-w-xs mx-auto">
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
          <div className="bg-white rounded-xl border border-neutral-200 p-3 w-full max-w-xs mx-auto">
            <Skeleton w="100%" h="36px" round className="mb-2" />
            <div className="grid grid-cols-6 gap-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} w="32px" h="32px" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mb-8">
        <Skeleton w="160px" h="48px" round className="mx-auto" />
      </div>
    </>
  );
}
