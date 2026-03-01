import type { Training } from "@/types/training";
import { Badge } from "@/components/shared/Badge";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { formatDateShort } from "@/lib/utils/formatDate";

interface TrainingCertsProps {
  training: Training[];
}

export function TrainingCerts({ training }: TrainingCertsProps) {
  if (training.length === 0) return null;

  const completed = training.filter((t) => t.status === "completed");
  const ongoing = training.filter((t) => t.status === "in_progress");

  return (
    <section id="training" aria-labelledby="training-title">
      <h2
        id="training-title"
        className="text-display-sm font-bold mb-8"
        style={{ color: "var(--text-primary)" }}
      >
        Training &amp; Certifications
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[...ongoing, ...completed].map((cert, i) => (
          <AnimatedSection key={cert.id} delay={i * 0.05}>
            <div
              className="p-4 rounded-[var(--radius-card)] flex gap-3"
              style={{
                background: "var(--bg-tertiary)",
                border: "1px solid var(--border-default)",
              }}
            >
              {/* Icon */}
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-base"
                style={{ background: "var(--accent-dim)", color: "var(--accent-light)" }}
                aria-hidden="true"
              >
                {cert.icon ?? "🏆"}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3
                    className="font-medium text-sm leading-snug"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {cert.title}
                  </h3>
                  {cert.status === "in_progress" ? (
                    <Badge variant="warning" size="sm">In Progress</Badge>
                  ) : (
                    <Badge variant="success" size="sm">Completed</Badge>
                  )}
                </div>

                <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>
                  {cert.provider}
                  {cert.end_date && (
                    <span> · {formatDateShort(cert.end_date)}</span>
                  )}
                </p>

                {cert.skills_gained && cert.skills_gained.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {cert.skills_gained.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="px-1.5 py-0.5 text-xs rounded"
                        style={{
                          background: "var(--bg-elevated)",
                          color: "var(--text-muted)",
                          border: "1px solid var(--border-default)",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                {cert.certificate_url && (
                  <a
                    href={cert.certificate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs mt-2 transition-colors"
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
