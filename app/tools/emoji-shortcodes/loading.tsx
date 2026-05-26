import { Skeleton } from "@/components/Skeleton";

export default function ShortcodesLoading() {
  return (
    <>
      <div className="bg-gradient-to-b from-primary-light/30 to-transparent -mx-4 px-4 py-8 mb-8 rounded-2xl">
        <Skeleton w="200px" h="28px" className="mb-2" />
        <Skeleton w="320px" h="16px" />
      </div>
      <Skeleton w="100%" h="44px" round className="mb-6" />
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-4 py-3 border-b border-neutral-200 bg-neutral-50 flex gap-4">
          <Skeleton w="60px" h="14px" />
          <Skeleton w="80px" h="14px" />
          <Skeleton w="100px" h="14px" />
          <Skeleton w="50px" h="14px" className="ml-auto" />
        </div>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="px-4 py-3 border-b border-neutral-100 flex items-center gap-4">
            <Skeleton w="32px" h="32px" />
            <Skeleton w="100px" h="14px" />
            <Skeleton w="80px" h="14px" />
            <Skeleton w="60px" h="28px" round className="ml-auto" />
          </div>
        ))}
      </div>
    </>
  );
}
