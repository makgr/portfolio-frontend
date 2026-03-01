export function ProjectCardSkeleton() {
  return (
    <div
      className="rounded-[var(--radius-card)] overflow-hidden"
      style={{ background: "var(--bg-tertiary)", border: "1px solid var(--border-default)" }}
      aria-hidden="true"
    >
      {/* Image */}
      <div className="skeleton aspect-video w-full" />
      {/* Body */}
      <div className="p-5 space-y-3">
        <div className="skeleton h-5 w-3/4 rounded" />
        <div className="space-y-1.5">
          <div className="skeleton h-3.5 w-full rounded" />
          <div className="skeleton h-3.5 w-5/6 rounded" />
        </div>
        {/* Badge row */}
        <div className="flex gap-1.5 pt-1">
          <div className="skeleton h-5 w-14 rounded-full" />
          <div className="skeleton h-5 w-16 rounded-full" />
          <div className="skeleton h-5 w-12 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProjectCardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  );
}
