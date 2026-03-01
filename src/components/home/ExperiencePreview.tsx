import type { Experience } from "@/types/experience";
import Link from "next/link";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Badge } from "@/components/shared/Badge";
import { formatDateShort } from "@/lib/utils/formatDate";

interface ExperiencePreviewProps {
  experiences: Experience[];
}

export function ExperiencePreview({ experiences }: ExperiencePreviewProps) {
  const recent = experiences.slice(0, 2);
  if (recent.length === 0) return null;

  return (
    <section className="py-24" aria-labelledby="experience-heading">
      <div
        className="mx-auto px-6"
        style={{ maxWidth: "var(--max-width-container)" }}
      >
        <AnimatedSection className="flex items-start justify-between mb-12 flex-wrap gap-4">
          <SectionTitle
            label="Career"
            title={
              <>
                Work <span className="gradient-text">Experience</span>
              </>
            }
            className="mb-0"
          />
          <Link
            href="/about#experience"
            className="text-sm font-medium transition-colors"
            style={{ color: "var(--accent-light)" }}
          >
            View full timeline →
          </Link>
        </AnimatedSection>

        <div className="space-y-6">
          {recent.map((exp, i) => (
            <AnimatedSection key={exp.id} delay={i * 0.1}>
              <div
                className="p-6 rounded-[var(--radius-card)] flex flex-col sm:flex-row gap-4"
                style={{
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-default)",
                }}
              >
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
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
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {exp.is_current && (
                        <Badge variant="success" size="sm">Current</Badge>
                      )}
                      <span
                        className="text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
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

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.slice(0, 5).map((tech) => (
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
