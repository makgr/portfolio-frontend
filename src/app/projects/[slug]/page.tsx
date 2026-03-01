import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectBySlug, getProjects } from "@/lib/api/projects";
import { ProjectDetail } from "@/components/projects/ProjectDetail";

export const revalidate = 1800;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const projects = await getProjects();
    return projects.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.short_description ?? project.description ?? "",
    openGraph: {
      title: project.title,
      description: project.short_description ?? project.description ?? "",
      ...(project.featured_image ? { images: [{ url: project.featured_image }] } : {}),
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <div
      className="mx-auto px-6 py-16"
      style={{ maxWidth: "var(--max-width-container)" }}
    >
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-8" style={{ color: "var(--text-muted)" }} aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/projects" className="hover:text-[var(--text-primary)] transition-colors">Projects</Link>
        <span>/</span>
        <span style={{ color: "var(--text-primary)" }}>{project.title}</span>
      </nav>

      <ProjectDetail project={project} />

      {/* Back link */}
      <div className="mt-16 pt-8" style={{ borderTop: "1px solid var(--border-default)" }}>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
          style={{ color: "var(--accent-light)" }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to Projects
        </Link>
      </div>
    </div>
  );
}
