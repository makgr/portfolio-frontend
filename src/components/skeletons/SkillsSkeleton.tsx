export function SkillsSkeleton() {
  return (
    <div className="space-y-8" aria-hidden="true">
      {[4, 5, 3].map((pillCount, i) => (
        <div key={i}>
          {/* Category heading */}
          <div className="skeleton h-5 w-32 rounded mb-4" />
          {/* Pills */}
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: pillCount }).map((_, j) => (
              <div
                key={j}
                className="skeleton h-7 rounded-full"
                style={{ width: `${60 + Math.floor(Math.random() * 40)}px` }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
