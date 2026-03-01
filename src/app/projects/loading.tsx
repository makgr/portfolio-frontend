import { ProjectCardSkeletonGrid } from "@/components/skeletons/ProjectCardSkeleton";

export default function ProjectsLoading() {
  return (
    <div
      className="mx-auto px-6 py-16"
      style={{ maxWidth: "var(--max-width-container)" }}
      role="status"
      aria-label="Loading projects..."
    >
      {/* Heading placeholder */}
      <div className="mb-10">
        <div className="skeleton h-8 w-36 rounded mb-3" aria-hidden="true" />
        <div className="skeleton h-4 w-72 rounded" aria-hidden="true" />
      </div>
      {/* Category filter placeholder */}
      <div className="flex gap-2 mb-8">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="skeleton h-8 w-20 rounded-full" aria-hidden="true" />
        ))}
      </div>
      <ProjectCardSkeletonGrid count={6} />
    </div>
  );
}
