import { Skeleton, SkeletonChips } from "@/components/Skeleton";

export default function TextToEmojiLoading() {
  return (
    <>
      <div className="bg-gradient-to-b from-primary-light/30 to-transparent -mx-4 px-4 py-8 mb-8 rounded-2xl">
        <Skeleton w="100px" h="24px" round className="mb-4" />
        <Skeleton w="250px" h="28px" className="mb-2" />
        <Skeleton w="380px" h="16px" />
      </div>
      <Skeleton w="100%" h="120px" className="mb-2" />
      <Skeleton w="60px" h="12px" className="mb-4" />
      <SkeletonChips count={5} />
      <Skeleton w="140px" h="48px" round className="mt-4" />
    </>
  );
}
