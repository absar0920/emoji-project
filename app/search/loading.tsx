import { PageSkeleton, SkeletonSpecimens } from "@/components/Skeleton";

export default function SearchLoading() {
  return (
    <PageSkeleton wide>
      <SkeletonSpecimens count={32} />
    </PageSkeleton>
  );
}
