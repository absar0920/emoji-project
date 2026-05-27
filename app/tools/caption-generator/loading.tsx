import { Skeleton, SkeletonChips } from "@/components/Skeleton";

export default function CaptionGeneratorLoading() {
  return (
    <>
      <div className="bg-gradient-to-b from-primary-light/30 dark:from-indigo-900/20 to-transparent -mx-4 px-4 py-8 mb-8 rounded-2xl">
        <Skeleton w="100px" h="24px" round className="mb-4" />
        <Skeleton w="210px" h="28px" className="mb-2" />
        <Skeleton w="380px" h="16px" />
      </div>
      <Skeleton w="100%" h="44px" round className="mb-4" />
      <Skeleton w="50px" h="14px" className="mb-2" />
      <SkeletonChips count={8} />
      <Skeleton w="60px" h="14px" className="mt-4 mb-2" />
      <SkeletonChips count={5} />
      <Skeleton w="180px" h="48px" round className="mt-4" />
    </>
  );
}
