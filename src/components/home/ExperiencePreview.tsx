import type { Experience } from "@/types/experience";
import type { Education } from "@/types/education";
import { formatDateShort } from "@/lib/utils/formatDate";

interface Commit {
  key: string;
  type: string;
  title: string;
  desc: string;
  tech: string[];
  when: string;
  ref?: string;
  current: boolean;
}

/** Short, stable fake commit hash (FNV-1a) so each row looks like `git log --oneline`. */
function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

export function ExperiencePreview({
  experiences,
  degree,
  authorName,
}: {
  experiences: Experience[];
  degree?: Education;
  authorName: string;
}) {
  const sorted = [...experiences].sort((a, b) => (b.start_date ?? "").localeCompare(a.start_date ?? ""));
  const commits: Commit[] = sorted.map((e, i) => {
    const company = e.company_name ?? e.company ?? "";
    const freelance = /freelance/i.test(company + (e.employment_type ?? ""));
    const current = !!e.is_current || !e.end_date;
    return {
      key: `e${e.id}`,
      type: freelance ? "merge:" : "feat:",
      title: freelance ? company.replace(/^freelance\s*/i, "freelance work ").trim() : `joined ${company}`,
      desc: e.position,
      tech: e.technologies?.slice(0, 4) ?? [],
      when: `${formatDateShort(e.start_date)} – ${current ? "now" : formatDateShort(e.end_date)}`,
      ref: i === 0 ? "HEAD -> main" : freelance ? "freelance" : undefined,
      current,
    };
  });
  if (degree) {
    const y = (d?: string | null) => (d ? new Date(d).getFullYear() : "");
    commits.push({
      key: `d${degree.id}`,
      type: "init:",
      title: [degree.degree, degree.field_of_study].filter(Boolean).join(" in "),
      desc: degree.institution,
      tech: [],
      when: [y(degree.start_date), y(degree.end_date)].filter(Boolean).join(" – "),
      current: false,
    });
  }

  return (
    <section className="sec" id="experience">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="code-label">{"// experience"}</p>
            <h2 className="h2">Commit history</h2>
          </div>
          <p>Every role, newest first. Amber means I&apos;m still there.</p>
        </div>
        <div className="gitlog">
          <div className="cmdline">
            <span>$</span> git log --author=&quot;{authorName}&quot;
          </div>
          {commits.map((c) => (
            <div key={c.key} className={`commit${c.current ? " cur" : ""}`}>
              <div className="graph">
                <i />
              </div>
              <div className="hash">{hash(c.key + c.title)}</div>
              <div>
                <p className="msg">
                  <span className="ty">{c.type}</span>
                  {c.title}
                  {c.ref && <span className="ref">{c.ref}</span>}
                </p>
                <p className="desc">{c.desc}</p>
                {c.tech.length > 0 && (
                  <div className="tags">
                    {c.tech.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="when">{c.when}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
