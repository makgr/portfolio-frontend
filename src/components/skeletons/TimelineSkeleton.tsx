export function TimelineItemSkeleton() {
  return (
    <div className="sm:pl-12 relative" aria-hidden="true">
      {/* Dot */}
      <div
        className="skeleton absolute left-2.5 top-4 w-3 h-3 rounded-full -translate-x-1/2 hidden sm:block"
      />
      <div
        className="p-5 rounded-[var(--radius-card)] space-y-3"
        style={{ background: "var(--bg-tertiary)", border: "1px solid var(--border-default)" }}
      >
        <div className="flex justify-between gap-3">
          <div className="space-y-1.5">
            <div className="skeleton h-5 w-40 rounded" />
            <div className="skeleton h-4 w-28 rounded" />
          </div>
          <div className="skeleton h-4 w-24 rounded flex-shrink-0" />
        </div>
        <div className="space-y-1">
          <div className="skeleton h-3.5 w-full rounded" />
          <div className="skeleton h-3.5 w-5/6 rounded" />
          <div className="skeleton h-3.5 w-4/6 rounded" />
        </div>
      </div>
    </div>
  );
}

export function TimelineSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="relative">
      <div
        className="absolute left-4 top-2 bottom-0 w-px hidden sm:block"
        style={{ background: "var(--border-default)" }}
        aria-hidden="true"
      />
      <div className="space-y-8">
        {Array.from({ length: count }).map((_, i) => (
          <TimelineItemSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
