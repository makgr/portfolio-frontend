export function HeroSkeleton() {
  return (
    <div className="mx-auto px-6 py-20" style={{ maxWidth: "var(--max-width-container)" }}>
      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Avatar */}
        <div
          className="w-40 h-40 rounded-2xl flex-shrink-0 skeleton"
          aria-hidden="true"
        />
        {/* Text */}
        <div className="flex-1 space-y-4 pt-2">
          <div className="skeleton h-10 w-64 rounded-lg" aria-hidden="true" />
          <div className="skeleton h-6 w-48 rounded-lg" aria-hidden="true" />
          <div className="space-y-2">
            <div className="skeleton h-4 w-full rounded" aria-hidden="true" />
            <div className="skeleton h-4 w-5/6 rounded" aria-hidden="true" />
            <div className="skeleton h-4 w-4/6 rounded" aria-hidden="true" />
          </div>
          <div className="flex gap-3 pt-2">
            <div className="skeleton h-10 w-36 rounded-lg" aria-hidden="true" />
            <div className="skeleton h-10 w-32 rounded-lg" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}
