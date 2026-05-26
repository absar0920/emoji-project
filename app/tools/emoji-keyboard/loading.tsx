import { Skeleton, SkeletonChips } from "@/components/Skeleton";

export default function EmojiKeyboardLoading() {
  return (
    <>
      <div className="bg-gradient-to-b from-primary-light/30 to-transparent -mx-4 px-4 py-8 mb-8 rounded-2xl">
        <Skeleton w="180px" h="28px" className="mb-2" />
        <Skeleton w="280px" h="16px" />
      </div>
      <Skeleton w="100%" h="44px" round className="mb-4" />
      <SkeletonChips count={9} />
      <div className="grid grid-cols-8 gap-1 mt-4">
        {Array.from({ length: 40 }).map((_, i) => (
          <Skeleton key={i} w="100%" h="44px" />
        ))}
      </div>
    </>
  );
}
