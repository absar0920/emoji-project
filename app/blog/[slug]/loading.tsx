import { Skeleton } from "@/components/Skeleton";

export default function BlogPostLoading() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <Skeleton w="200px" h="14px" className="mb-4" />
      <Skeleton w="100%" h="300px" className="rounded-2xl mb-6" />
      <div className="flex gap-3 mb-3">
        <Skeleton w="100px" h="14px" />
        <Skeleton w="80px" h="14px" />
      </div>
      <div className="flex gap-1.5 mb-4">
        <Skeleton w="60px" h="20px" round />
        <Skeleton w="80px" h="20px" round />
      </div>
      <Skeleton w="80%" h="36px" className="mb-8" />
      <div className="space-y-3">
        <Skeleton w="100%" h="14px" />
        <Skeleton w="100%" h="14px" />
        <Skeleton w="90%" h="14px" />
        <Skeleton w="100%" h="14px" />
        <Skeleton w="75%" h="14px" />
        <Skeleton w="100%" h="14px" />
        <Skeleton w="100%" h="14px" />
        <Skeleton w="85%" h="14px" />
      </div>
    </main>
  );
}
