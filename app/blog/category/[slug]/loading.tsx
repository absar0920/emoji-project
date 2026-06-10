import { PageSkeleton, SkeletonGrid } from "@/components/Skeleton";

export default function BlogCategoryLoading() {
  return (
    <PageSkeleton wide>
      <SkeletonGrid cols={3} count={6} />
    </PageSkeleton>
  );
}
