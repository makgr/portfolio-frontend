import type { Project } from "@/types/project";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/shared/Badge";
import { TechBadge } from "./TechBadge";
import { ProjectLinks } from "./ProjectLinks";
import { ProjectImageGallery } from "./ProjectImageGallery";
import { formatDateShort } from "@/lib/utils/formatDate";
import { resolveImageUrl } from "@/lib/utils/imageUrl";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <article>
      {/* Hero image */}
      {project.featured_image && (
        <div className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-card)] mb-10"
          style={{ border: "1px solid var(--border-default)" }}
        >
          <Image
            src={resolveImageUrl(project.featured_image)}
            alt={project.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        {project.category && (
          <Badge variant="accent" className="mb-3">
            {project.category.name}
          </Badge>
        )}
        <h1 className="text-display-md font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          {project.title}
        </h1>

        <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
          {project.short_description ?? project.description}
        </p>

        <ProjectLinks project={project} />
      </div>

      {/* Meta grid */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-[var(--radius-card)] mb-10"
        style={{ background: "var(--bg-tertiary)", border: "1px solid var(--border-default)" }}
      >
        {project.type && (
          <div>
            <p className="text-xs mb-1 text-label" style={{ color: "var(--text-muted)" }}>Type</p>
            <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{project.type}</p>
          </div>
        )}
        {project.my_role && (
          <div>
            <p className="text-xs mb-1 text-label" style={{ color: "var(--text-muted)" }}>Role</p>
            <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{project.my_role}</p>
          </div>
        )}
        {project.duration_weeks && (
          <div>
            <p className="text-xs mb-1 text-label" style={{ color: "var(--text-muted)" }}>Duration</p>
            <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{project.duration_weeks} weeks</p>
          </div>
        )}
        {project.project_date && (
          <div>
            <p className="text-xs mb-1 text-label" style={{ color: "var(--text-muted)" }}>Year</p>
            <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{formatDateShort(project.project_date)}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {project.description && project.description !== project.short_description && (
            <section>
              <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>About</h2>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {project.description}
              </p>
            </section>
          )}

          {project.features && project.features.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Key Features</h2>
              <ul className="space-y-2">
                {project.features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-base"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" style={{ color: "var(--accent-light)" }}>
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {project.challenges && project.challenges.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Challenges &amp; Solutions</h2>
              <div className="space-y-4">
                {project.challenges.map((c, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-start gap-2 text-base" style={{ color: "var(--text-secondary)" }}>
                      <span className="font-medium text-sm" style={{ color: "var(--warning)" }}>Challenge:</span>
                      {c}
                    </div>
                    {project.solutions?.[i] && (
                      <div className="flex items-start gap-2 text-base" style={{ color: "var(--text-secondary)" }}>
                        <span className="font-medium text-sm" style={{ color: "var(--success)" }}>Solution:</span>
                        {project.solutions[i]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Gallery */}
          {project.images && project.images.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Gallery</h2>
              <ProjectImageGallery images={project.images} title={project.title} />
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {project.tech_stack && project.tech_stack.length > 0 && (
            <div
              className="p-5 rounded-[var(--radius-card)]"
              style={{ background: "var(--bg-tertiary)", border: "1px solid var(--border-default)" }}
            >
              <h3 className="text-sm font-semibold mb-4 text-label" style={{ color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "0.75rem" }}>
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.map((tech) => (
                  <TechBadge key={tech} tech={tech} />
                ))}
              </div>
            </div>
          )}

          {(project.client_name || project.team_size) && (
            <div
              className="p-5 rounded-[var(--radius-card)]"
              style={{ background: "var(--bg-tertiary)", border: "1px solid var(--border-default)" }}
            >
              <h3 className="text-sm font-semibold mb-4 text-label" style={{ color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "0.75rem" }}>
                Project Info
              </h3>
              {project.client_name && (
                <div className="mb-3">
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>Client</p>
                  <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{project.client_name}</p>
                </div>
              )}
              {project.team_size && (
                <div>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>Team Size</p>
                  <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{project.team_size} people</p>
                </div>
              )}
            </div>
          )}
        </aside>
      </div>
    </article>
  );
}
