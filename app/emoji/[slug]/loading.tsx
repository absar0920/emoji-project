import { PageSkeleton, SkeletonRows } from "@/components/Skeleton";

export default function EmojiDetailLoading() {
  return (
    <PageSkeleton>
      <SkeletonRows count={7} />
    </PageSkeleton>
  );
}
