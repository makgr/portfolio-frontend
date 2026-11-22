import Link from "next/link";
import type { Project } from "@/types/project";
import { resolveImageUrl } from "@/lib/utils/imageUrl";

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <section className="sec" id="work">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="code-label">{"// selected work"}</p>
            <h2 className="h2">Things I&apos;ve shipped</h2>
          </div>
          <p>Shops, SaaS tools, payment APIs and mobile apps, from the schema to the store listing.</p>
        </div>
        <div className="proj-grid">
          {projects.slice(0, 4).map((p) => (
            <Link key={p.id} suppressHydrationWarning className="glow-card proj" href={`/projects/${p.slug}`} data-cursor="view">
              <div className="shot">
                {p.featured_image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={resolveImageUrl(p.featured_image)} alt={p.title} loading="lazy" decoding="async" />
                )}
              </div>
              <div className="meta">
                <h3>{p.title}</h3>
                {p.short_description && <p>{p.short_description}</p>}
                {p.tech_stack && p.tech_stack.length > 0 && (
                  <div className="tags">
                    {p.tech_stack.slice(0, 5).map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
        <div className="more">
          <Link className="btn-pill" href="/projects" data-cursor="open">
            Browse all projects
          </Link>
        </div>
      </div>
    </section>
  );
}
