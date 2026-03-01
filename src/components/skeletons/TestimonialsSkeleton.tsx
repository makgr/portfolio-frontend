export function TestimonialsSkeleton() {
  return (
    <div
      className="p-8 rounded-[var(--radius-card)] max-w-2xl mx-auto"
      style={{ background: "var(--bg-tertiary)", border: "1px solid var(--border-default)" }}
      aria-hidden="true"
    >
      {/* Quote icon */}
      <div className="skeleton w-8 h-8 rounded mb-6" />
      {/* Quote lines */}
      <div className="space-y-2 mb-8">
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-4/5 rounded" />
        <div className="skeleton h-4 w-3/5 rounded" />
      </div>
      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="skeleton w-10 h-10 rounded-full flex-shrink-0" />
        <div className="space-y-1.5">
          <div className="skeleton h-4 w-28 rounded" />
          <div className="skeleton h-3 w-20 rounded" />
        </div>
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-8">
        {[0, 1, 2].map((i) => (
          <div key={i} className="skeleton w-2 h-2 rounded-full" />
        ))}
      </div>
    </div>
  );
}
