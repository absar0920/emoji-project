import { MastheadSkeleton, Skeleton, SkeletonRows } from "@/components/Skeleton";

// Renders inside app/tools/layout.tsx (already theme-editorial + container).
export default function ToolsLoading() {
  return (
    <>
      <MastheadSkeleton />
      <Skeleton w="100%" h="48px" className="max-w-xl mb-5" />
      <div className="flex gap-2 mb-9">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} w={`${72 + (i % 3) * 18}px`} h="30px" />
        ))}
      </div>
      <SkeletonRows count={5} />
    </>
  );
}
