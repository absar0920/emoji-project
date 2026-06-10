import { PageSkeleton, SkeletonRows } from "@/components/Skeleton";

export default function PlatformPageLoading() {
  return (
    <PageSkeleton>
      <SkeletonRows count={6} />
    </PageSkeleton>
  );
}
