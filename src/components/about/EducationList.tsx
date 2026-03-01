import type { Education } from "@/types/education";
import { Badge } from "@/components/shared/Badge";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { formatDateShort } from "@/lib/utils/formatDate";

interface EducationListProps {
  education: Education[];
}

export function EducationList({ education }: EducationListProps) {
  if (education.length === 0) return null;

  return (
    <section id="education" aria-labelledby="education-title">
      <h2
        id="education-title"
        className="text-display-sm font-bold mb-8"
        style={{ color: "var(--text-primary)" }}
      >
        Education
      </h2>

      <div className="space-y-5">
        {education.map((edu, i) => (
          <AnimatedSection key={edu.id} delay={i * 0.08}>
            <div
              className="p-5 rounded-[var(--radius-card)] flex gap-4"
              style={{
                background: "var(--bg-tertiary)",
                border: "1px solid var(--border-default)",
              }}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: "var(--accent-dim)", color: "var(--accent-light)" }}
                aria-hidden="true"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                  <div>
                    <h3
                      className="font-semibold text-base"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {edu.degree}
                      {edu.field_of_study && (
                        <span style={{ color: "var(--text-secondary)", fontWeight: 400 }}>
                          {" "}in {edu.field_of_study}
                        </span>
                      )}
                    </h3>
                    <p className="text-sm font-medium mt-0.5" style={{ color: "var(--accent-light)" }}>
                      {edu.institution}
                      {edu.location && (
                        <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>
                          {" "}· {edu.location}
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {edu.is_current && <Badge variant="success">Ongoing</Badge>}
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {formatDateShort(edu.start_date)} —{" "}
                      {edu.is_current ? "Present" : formatDateShort(edu.end_date)}
                    </span>
                  </div>
                </div>

                {edu.grade && (
                  <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                    Grade: {edu.grade}
                  </p>
                )}

                {edu.description && (
                  <p className="text-sm leading-relaxed mt-2" style={{ color: "var(--text-secondary)" }}>
                    {edu.description}
                  </p>
                )}

                {edu.certificate_url && (
                  <a
                    href={edu.certificate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs mt-3 transition-colors"
                    style={{ color: "var(--accent-light)" }}
                  >
                    View Certificate →
                  </a>
                )}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
