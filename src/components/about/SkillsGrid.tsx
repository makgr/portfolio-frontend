import type { Skill, SkillCategory } from "@/types/skill";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

interface SkillsGridProps {
  skills: Skill[];
  categories: SkillCategory[];
}

function SkillBar({ proficiency }: { proficiency?: number }) {
  const pct = proficiency ?? 70;
  return (
    <div
      className="h-1.5 rounded-full overflow-hidden"
      style={{ background: "var(--bg-elevated)" }}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Proficiency: ${pct}%`}
    >
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{
          width: `${pct}%`,
          background: "linear-gradient(90deg, var(--accent), var(--accent-light))",
        }}
      />
    </div>
  );
}

export function SkillsGrid({ skills, categories }: SkillsGridProps) {
  if (skills.length === 0 && categories.length === 0) return null;

  const skillsByCategory = categories.length > 0
    ? categories
    : (() => {
        const map = new Map<string, Skill[]>();
        skills.forEach((s) => {
          const cat = s.category ?? "Other";
          map.set(cat, [...(map.get(cat) ?? []), s]);
        });
        return Array.from(map.entries()).map(([name, catSkills]) => ({
          name,
          count: catSkills.length,
          skills: catSkills.map((s) => s.name),
        }));
      })();

  return (
    <section id="skills" aria-labelledby="skills-title">
      <h2
        id="skills-title"
        className="text-display-sm font-bold mb-8"
        style={{ color: "var(--text-primary)" }}
      >
        Skills &amp; Expertise
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillsByCategory.map((cat, i) => {
          const catSkills = skills.filter((s) => s.category === cat.name || cat.skills.includes(s.name));

          return (
            <AnimatedSection key={cat.name} delay={i * 0.08}>
              <div>
                <h3
                  className="text-sm font-semibold mb-4"
                  style={{
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    fontSize: "0.75rem",
                  }}
                >
                  {cat.name}
                </h3>

                {catSkills.length > 0 ? (
                  <div className="space-y-3">
                    {catSkills.map((skill) => (
                      <div key={skill.id}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span
                            className="text-sm font-medium"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {skill.name}
                          </span>
                          {skill.proficiency !== undefined && (
                            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                              {skill.proficiency}%
                            </span>
                          )}
                        </div>
                        <SkillBar proficiency={skill.proficiency} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((name) => (
                      <span
                        key={name}
                        className="px-3 py-1.5 text-sm rounded-lg"
                        style={{
                          background: "var(--bg-elevated)",
                          border: "1px solid var(--border-default)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </section>
  );
}
