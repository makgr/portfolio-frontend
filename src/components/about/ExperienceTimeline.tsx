import type { Experience } from "@/types/experience";
import { Badge } from "@/components/shared/Badge";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { formatDateShort } from "@/lib/utils/formatDate";

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  if (experiences.length === 0) return null;

  return (
    <section id="experience" aria-labelledby="experience-title">
      <h2
        id="experience-title"
        className="text-display-sm font-bold mb-8"
        style={{ color: "var(--text-primary)" }}
      >
        Work Experience
      </h2>

      <div className="relative">
        {/* Timeline line */}
        <div
          className="absolute left-4 top-2 bottom-0 w-px hidden sm:block"
          style={{ background: "var(--border-default)" }}
          aria-hidden="true"
        />

        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <AnimatedSection key={exp.id} delay={i * 0.08}>
              <div className="sm:pl-12 relative">
                {/* Timeline dot */}
                <div
                  className="absolute left-2.5 top-4 w-3 h-3 rounded-full -translate-x-1/2 hidden sm:block"
                  style={{
                    background: exp.is_current ? "var(--accent)" : "var(--bg-elevated)",
                    border: `2px solid ${exp.is_current ? "var(--accent)" : "var(--border-hover)"}`,
                    boxShadow: exp.is_current ? "var(--shadow-glow-sm)" : "none",
                  }}
                  aria-hidden="true"
                />

                <div
                  className="p-5 rounded-[var(--radius-card)]"
                  style={{
                    background: "var(--bg-tertiary)",
                    border: "1px solid var(--border-default)",
                  }}
                >
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3
                        className="font-semibold text-base"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {exp.position}
                      </h3>
                      <p
                        className="text-sm font-medium mt-0.5"
                        style={{ color: "var(--accent-light)" }}
                      >
                        {exp.company_name ?? exp.company}
                        {exp.location && (
                          <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>
                            {" "}· {exp.location}
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {exp.is_current && <Badge variant="success">Current</Badge>}
                      {exp.employment_type && (
                        <Badge variant="default">{exp.employment_type}</Badge>
                      )}
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {formatDateShort(exp.start_date)} —{" "}
                        {exp.is_current ? "Present" : formatDateShort(exp.end_date)}
                      </span>
                    </div>
                  </div>

                  {exp.description && (
                    <p
                      className="text-sm leading-relaxed mb-4"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {exp.description}
                    </p>
                  )}

                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-1.5 mb-4">
                      {exp.achievements.map((a, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          <svg
                            className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            style={{ color: "var(--accent-light)" }}
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                          {a}
                        </li>
                      ))}
                    </ul>
                  )}

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs rounded font-mono"
                          style={{
                            background: "var(--bg-elevated)",
                            color: "var(--text-muted)",
                            border: "1px solid var(--border-default)",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
