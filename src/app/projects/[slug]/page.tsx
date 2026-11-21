import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectBySlug, getProjects } from "@/lib/api/projects";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { JsonLd } from "@/components/shared/JsonLd";
import { getProfile } from "@/lib/api/profile";
import { pageMetadata, metaTags, clip, SITE_URL } from "@/lib/seo";
import { resolveImageUrl } from "@/lib/utils/imageUrl";

export const revalidate = 0;

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

  const meta = metaTags(project.meta_tags);
  return pageMetadata({
    title: meta.title ?? project.title,
    description: meta.description ?? project.short_description ?? project.description,
    path: `/projects/${project.slug}`,
    images: [project.featured_image],
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const [project, profile] = await Promise.all([getProjectBySlug(slug), getProfile().catch(() => null)]);

  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: clip(project.short_description ?? project.description, 300),
    url: `${SITE_URL}/projects/${project.slug}`,
    ...(project.featured_image ? { image: resolveImageUrl(project.featured_image) } : {}),
    ...(project.tech_stack?.length ? { keywords: project.tech_stack.join(", ") } : {}),
    ...(project.published_at ? { datePublished: project.published_at } : {}),
    ...(profile ? { creator: { "@type": "Person", name: profile.full_name, url: SITE_URL } } : {}),
  };

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

      <JsonLd data={jsonLd} />
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
