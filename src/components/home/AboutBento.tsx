// Author: Mohammad Ali Khan <xvirus.bd@gmail.com>
import type { Profile } from "@/types/profile";
import type { Skill } from "@/types/skill";
import type { Experience } from "@/types/experience";
import type { Education } from "@/types/education";
import { formatDateShort } from "@/lib/utils/formatDate";
import { CountUp } from "./CountUp";
import { LocalClock } from "./LocalClock";
import { Terminal } from "./Terminal";

interface AboutBentoProps {
  profile: Profile;
  photo: string;
  skills: Skill[];
  current?: Experience;
  education: Education[];
  projectSlugs: string[];
}

const year = (d?: string | null) => (d ? new Date(d).getFullYear() : "");

export function AboutBento({ profile, photo, skills, current, education, projectSlugs }: AboutBentoProps) {
  const ranked = [...skills].sort((a, b) => (b.proficiency ?? 0) - (a.proficiency ?? 0));
  const half = Math.ceil(ranked.length / 2);
  const rows = [ranked.slice(0, half), ranked.slice(half)];
  const email = profile.email ?? profile.site_info?.contact?.email;

  const commands: Record<string, string[]> = {
    whoami: [profile.full_name, [profile.title, profile.location].filter(Boolean).join(", ")],
    skills: [ranked.slice(0, 6).map((s) => `${s.name.toLowerCase()} ${s.proficiency ?? ""}`.trim()).join("   ")],
    projects: [`${profile.total_projects ?? projectSlugs.length} shipped. Featured:`, projectSlugs.slice(0, 3).join("  ")],
    ...(email ? { contact: [email] } : {}),
  };

  return (
    <section className="sec" id="about" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <p className="code-label">{"// whoami"}</p>
        <div className="bento">
          <div suppressHydrationWarning className="glow-card b-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} alt={profile.full_name} loading="lazy" decoding="async" />
            <div className="shade" />
            <div className="cap">
              <h3>{profile.full_name}</h3>
              {profile.location && (
                <p>
                  {profile.location}
                  <LocalClock />
                </p>
              )}
            </div>
          </div>

          <div suppressHydrationWarning className="glow-card b-stats">
            <div className="stats">
              {profile.years_of_experience != null && (
                <div className="stat">
                  <b>
                    <CountUp to={profile.years_of_experience} />+
                  </b>
                  <span>years writing production code</span>
                </div>
              )}
              {profile.total_projects != null && (
                <div className="stat">
                  <b>
                    <CountUp to={profile.total_projects} />
                  </b>
                  <span>projects shipped</span>
                </div>
              )}
              {profile.happy_clients != null && (
                <div className="stat">
                  <b>
                    <CountUp to={profile.happy_clients} />
                  </b>
                  <span>happy clients</span>
                </div>
              )}
            </div>
          </div>

          <Terminal commands={commands} />

          {current && (
            <div suppressHydrationWarning className="glow-card b-now">
              <div>
                <p className="code-label" style={{ margin: 0 }}>
                  {"// currently"}
                </p>
                <h3>
                  {current.position} at {current.company_name ?? current.company}
                </h3>
                <p>
                  Since {formatDateShort(current.start_date)}
                  {current.technologies?.length ? `, working in ${current.technologies.slice(0, 4).join(", ")}.` : "."}
                </p>
              </div>
            </div>
          )}

          {ranked.length > 0 && (
            <div suppressHydrationWarning className="glow-card b-stack">
              <div className="stack-title">
                <h3>Tools I use every week</h3>
                <span className="mono" style={{ color: "var(--text-muted)", fontSize: 13 }}>
                  level / 100
                </span>
              </div>
              {rows.map((row, r) => (
                <div key={r} className={`marq${r ? " rev" : ""}`}>
                  <div className="track">
                    {/* list doubled so the -50% marquee loop is seamless */}
                    {[...row, ...row].map((s, i) => (
                      <span key={`${s.id}-${i}`} className="chip" aria-hidden={i >= row.length}>
                        {s.name} {s.proficiency != null && <small>{s.proficiency}</small>}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div suppressHydrationWarning className="glow-card b-edu">
              <div>
                <p className="code-label" style={{ margin: 0 }}>
                  {"// education"}
                </p>
                {education.slice(0, 2).map((e, i) => (
                  <div key={e.id}>
                    {i > 0 && <div className="sep" />}
                    <h3 style={i > 0 ? { fontSize: 18 } : undefined}>
                      {[e.degree, e.field_of_study].filter(Boolean).join(" in ")}
                    </h3>
                    <p>
                      {e.institution}, {year(e.start_date)}
                      {e.end_date || e.is_current ? ` – ${e.is_current ? "now" : year(e.end_date)}` : ""}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
