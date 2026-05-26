import { Skeleton, SkeletonGrid } from "@/components/Skeleton";

export default function EmojiCombosLoading() {
  return (
    <>
      <div className="bg-gradient-to-b from-primary-light/30 to-transparent -mx-4 px-4 py-8 mb-8 rounded-2xl">
        <Skeleton w="170px" h="28px" className="mb-2" />
        <Skeleton w="340px" h="16px" />
      </div>
      <SkeletonGrid cols={3} count={12} />
    </>
  );
}
