import { PageSkeleton, SkeletonGrid } from "@/components/Skeleton";

export default function ComboLoading() {
  return (
    <PageSkeleton>
      <div className="border border-[var(--line)] p-4 mb-8">
        <SkeletonGrid cols={1} count={1} />
      </div>
      <SkeletonGrid cols={2} count={4} />
    </PageSkeleton>
  );
}
