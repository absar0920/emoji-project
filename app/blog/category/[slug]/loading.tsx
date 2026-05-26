import { Skeleton, SkeletonChips, SkeletonGrid } from "@/components/Skeleton";

export default function BlogCategoryLoading() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <Skeleton w="160px" h="14px" className="mb-4" />
      <Skeleton w="180px" h="32px" className="mb-2" />
      <Skeleton w="300px" h="16px" className="mb-6" />
      <SkeletonChips count={6} />
      <div className="mt-8">
        <SkeletonGrid cols={3} count={6} />
      </div>
    </main>
  );
}
