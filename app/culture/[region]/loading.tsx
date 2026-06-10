import { PageSkeleton, SkeletonRows } from "@/components/Skeleton";

export default function CultureLoading() {
  return (
    <PageSkeleton>
      <SkeletonRows count={6} />
    </PageSkeleton>
  );
}
