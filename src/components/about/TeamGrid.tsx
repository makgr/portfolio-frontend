// Author: Mohammad Ali Khan <xvirus.bd@gmail.com>
"use client";

import { useState } from "react";
import type { TeamMember } from "@/types/team";
import { resolveImageUrl } from "@/lib/utils/imageUrl";
import { SocialLinks } from "@/components/shared/SocialLinks";

const EMPLOYMENT: Record<string, string> = {
  full_time: "full-time",
  part_time: "part-time",
  contract: "contract",
  intern: "intern",
};

/** Team shown as "contributors", filterable by department like `git branch`. */
export function TeamGrid({ members }: { members: TeamMember[] }) {
  const departments = [...new Set(members.map((m) => m.department).filter(Boolean))] as string[];
  const [dept, setDept] = useState<string | null>(null);
  const shown = dept ? members.filter((m) => m.department === dept) : members;

  return (
    <section aria-labelledby="team-heading">
      <p className="code-label">{"// contributors"}</p>
      <h2 id="team-heading" className="text-display-sm font-semibold tracking-tight text-[var(--text-primary)]">
        The team behind the commits
      </h2>
      <p className="mt-3 max-w-[52ch] text-[var(--text-secondary)]">
        The people I build with on client projects.
      </p>

      {departments.length > 1 && (
        <div className="mt-8 flex flex-wrap gap-2 font-mono text-sm" role="group" aria-label="Filter by department">
          {[null, ...departments].map((d) => {
            const on = dept === d;
            return (
              <button
                key={d ?? "all"}
                type="button"
                aria-pressed={on}
                onClick={() => setDept(d)}
                className={`min-h-10 rounded-lg border px-3 transition-colors ${
                  on
                    ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-dim)]"
                    : "border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {on ? "* " : ""}
                {d ?? "all"}
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((m) => {
          const since = m.join_date ? new Date(m.join_date).getFullYear() : null;
          const social = Array.isArray(m.social_links) ? undefined : m.social_links;
          return (
            <article key={m.id} className="glow-card p-6 flex flex-col gap-4" suppressHydrationWarning>
              <div className="flex items-center gap-4">
                {m.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={resolveImageUrl(m.image)}
                    alt={m.name}
                    loading="lazy"
                    decoding="async"
                    className="w-16 h-16 rounded-xl object-cover flex-none"
                  />
                ) : (
                  <span
                    className="w-16 h-16 rounded-xl flex-none flex items-center justify-center font-mono text-lg bg-[var(--accent-dim)] text-[var(--accent)]"
                    aria-hidden="true"
                  >
                    {m.initials}
                  </span>
                )}
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold leading-tight text-[var(--text-primary)]">{m.name}</h3>
                  <p className="font-mono text-xs text-[var(--text-muted)] truncate">@{m.slug}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{m.position}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {m.department && (
                  <span className="rounded-md border border-[rgba(255,181,71,0.45)] px-2 py-0.5 text-[var(--accent)]">
                    {m.department}
                  </span>
                )}
                {m.employment_type && (
                  <span className="rounded-md border border-[var(--border-default)] px-2 py-0.5 text-[var(--text-secondary)]">
                    {EMPLOYMENT[m.employment_type]}
                  </span>
                )}
                {since && (
                  <span className="rounded-md border border-[var(--border-default)] px-2 py-0.5 text-[var(--text-secondary)]">
                    since {since}
                  </span>
                )}
              </div>

              {m.bio && <p className="text-sm leading-relaxed text-[var(--text-secondary)] line-clamp-4">{m.bio}</p>}

              {m.skills && m.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {m.skills.slice(0, 6).map((s) => (
                    <span
                      key={s}
                      className="font-mono text-xs rounded-md px-2 py-1 bg-[var(--bg-secondary)] border border-[var(--border-default)] text-[#b7c2d2]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}

              {social && <SocialLinks links={social} size="sm" className="mt-auto" />}
            </article>
          );
        })}
      </div>
    </section>
  );
}
