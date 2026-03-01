export function BlogCardSkeleton() {
  return (
    <div
      className="rounded-[var(--radius-card)] p-5"
      style={{ background: "var(--bg-tertiary)", border: "1px solid var(--border-default)" }}
      aria-hidden="true"
    >
      {/* Image */}
      <div className="skeleton aspect-video w-full rounded-lg mb-4" />
      {/* Badge */}
      <div className="skeleton h-5 w-20 rounded-full mb-3" />
      {/* Title */}
      <div className="space-y-1.5 mb-3">
        <div className="skeleton h-5 w-full rounded" />
        <div className="skeleton h-5 w-4/5 rounded" />
      </div>
      {/* Excerpt */}
      <div className="space-y-1 mb-4">
        <div className="skeleton h-3.5 w-full rounded" />
        <div className="skeleton h-3.5 w-5/6 rounded" />
        <div className="skeleton h-3.5 w-3/4 rounded" />
      </div>
      {/* Author row */}
      <div className="flex items-center gap-2 pt-2" style={{ borderTop: "1px solid var(--border-default)" }}>
        <div className="skeleton w-6 h-6 rounded-full flex-shrink-0" />
        <div className="skeleton h-3.5 w-24 rounded" />
        <div className="skeleton h-3.5 w-16 rounded ml-auto" />
      </div>
    </div>
  );
}

export function BlogCardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
}
