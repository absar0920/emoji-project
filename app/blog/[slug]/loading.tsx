import { PageSkeleton, Skeleton } from "@/components/Skeleton";

export default function BlogPostLoading() {
  return (
    <PageSkeleton>
      <Skeleton w="100%" h="280px" className="mb-8" />
      <div className="space-y-3">
        {["100%", "100%", "92%", "100%", "78%", "100%", "100%", "85%"].map((w, i) => (
          <Skeleton key={i} w={w} h="14px" />
        ))}
      </div>
    </PageSkeleton>
  );
}
