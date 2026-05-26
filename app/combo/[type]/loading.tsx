import { Skeleton, SkeletonGrid } from "@/components/Skeleton";

export default function ComboLoading() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <Skeleton w="180px" h="14px" className="mb-4" />
      <Skeleton w="250px" h="28px" className="mb-2" />
      <Skeleton w="100%" h="14px" className="mb-8" />
      <div className="bg-white rounded-xl p-6 shadow-md mb-6">
        <Skeleton w="200px" h="40px" className="mx-auto mb-3" />
        <Skeleton w="140px" h="14px" className="mx-auto" />
      </div>
      <Skeleton w="200px" h="20px" className="mb-4" />
      <SkeletonGrid cols={2} count={4} />
    </main>
  );
}
