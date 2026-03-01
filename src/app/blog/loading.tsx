import { BlogCardSkeletonGrid } from "@/components/skeletons/BlogCardSkeleton";

export default function BlogLoading() {
  return (
    <div
      className="mx-auto px-6 py-16"
      style={{ maxWidth: "var(--max-width-container)" }}
      role="status"
      aria-label="Loading posts..."
    >
      {/* Heading placeholder */}
      <div className="mb-10">
        <div className="skeleton h-8 w-24 rounded mb-3" aria-hidden="true" />
        <div className="skeleton h-4 w-80 rounded" aria-hidden="true" />
      </div>
      {/* Search + filter placeholder */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="skeleton h-10 flex-1 rounded-lg" aria-hidden="true" />
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="skeleton h-10 w-20 rounded-full" aria-hidden="true" />
          ))}
        </div>
      </div>
      <BlogCardSkeletonGrid count={6} />
    </div>
  );
}
