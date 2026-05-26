import { Skeleton, SkeletonChips } from "@/components/Skeleton";

export default function VibeSearchLoading() {
  return (
    <>
      <div className="bg-gradient-to-b from-primary-light/30 to-transparent -mx-4 px-4 py-8 mb-8 rounded-2xl">
        <Skeleton w="100px" h="24px" round className="mb-4" />
        <Skeleton w="160px" h="28px" className="mb-2" />
        <Skeleton w="360px" h="16px" />
      </div>
      <div className="flex gap-2 mb-4">
        <Skeleton w="100%" h="48px" round />
        <Skeleton w="100px" h="48px" round />
      </div>
      <SkeletonChips count={10} />
    </>
  );
}
