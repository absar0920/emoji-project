import { PageSkeleton, SkeletonRows } from "@/components/Skeleton";

export default function ComparisonLoading() {
  return (
    <PageSkeleton>
      <SkeletonRows count={6} />
    </PageSkeleton>
  );
}
