// Author: Mohammad Ali Khan <xvirus.bd@gmail.com>
import type { Metadata } from "next";
import Link from "next/link";
import { getServices } from "@/lib/api/services";
import { getProfile } from "@/lib/api/profile";
import type { Service } from "@/types/service";
import { ContactCTA } from "@/components/home/ContactCTA";
import "@/components/home/home.css";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Services",
  description: "Web apps, APIs, mobile apps and the support to keep them running.",
};

const fileName = (s: Service) =>
  s.slug ?? s.title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default async function ServicesPage() {
  const [servicesRes, profileRes] = await Promise.allSettled([getServices(), getProfile()]);
  const services = servicesRes.status === "fulfilled" ? servicesRes.value : [];
  const profile = profileRes.status === "fulfilled" ? profileRes.value : null;

  return (
    <div className="home">
      <section className="svc-page-head">
        <div className="wrap">
          <p className="code-label">{"// services"}</p>
          <h1 className="h2">What you can hire me for</h1>
          <p className="lede">
            From the first database table to the app in the store, and the fixes after launch. Tell me what you need and
            I&apos;ll reply within a day.
          </p>
        </div>
      </section>

      <section className="svc-page-list">
        <div className="wrap">
          {services.length === 0 ? (
            <p className="lede">
              Services couldn&apos;t be loaded right now. <Link href="/contact">Send me a message</Link> and I&apos;ll
              tell you what I can do.
            </p>
          ) : (
            <div className="svc-list">
              {services.map((s) => {
                const paragraphs = (s.description ?? s.short_description ?? "").split(/\n\s*\n/).filter(Boolean);
                return (
                  <article key={s.id} id={fileName(s)} className="glow-card svc-item" suppressHydrationWarning>
                    <div>
                      <span className="fname">services/{fileName(s)}.md</span>
                      <h2>{s.title}</h2>
                      {paragraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                    <div className="svc-side">
                      {s.features && s.features.length > 0 && (
                        <ul aria-label={`What's included in ${s.title}`}>
                          {s.features.map((f) => (
                            <li key={f}>{f}</li>
                          ))}
                        </ul>
                      )}
                      {s.technologies && s.technologies.length > 0 && (
                        <div className="tags">
                          {s.technologies.map((t) => (
                            <span key={t} className="tag">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                      {s.formatted_price && <p className="price">{s.formatted_price}</p>}
                      <Link className="btn-pill amber sm" href="/contact" data-cursor="hi">
                        Start a project
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <ContactCTA
        email={profile?.email ?? profile?.site_info?.contact?.email}
        resumeUrl={profile?.resume_url}
        social={{ ...(profile?.social_links ?? {}), ...(profile?.site_info?.social ?? {}) }}
      />
    </div>
  );
}
