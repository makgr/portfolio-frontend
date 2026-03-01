"use client";

import { motion } from "framer-motion";
import type { Skill, SkillCategory } from "@/types/skill";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { AnimatedSection, staggerContainer } from "@/components/shared/AnimatedSection";
import { cn } from "@/lib/utils/cn";

interface SkillsSnapshotProps {
  skills: Skill[];
  categories: SkillCategory[];
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export function SkillsSnapshot({ skills, categories }: SkillsSnapshotProps) {
  const primarySkills = skills.filter((s) => s.is_primary).slice(0, 16);
  const displaySkills = primarySkills.length > 0 ? primarySkills : skills.slice(0, 16);

  if (displaySkills.length === 0) return null;

  return (
    <section className="py-24" aria-labelledby="skills-heading">
      <div
        className="mx-auto px-6"
        style={{ maxWidth: "var(--max-width-container)" }}
      >
        <AnimatedSection>
          <SectionTitle
            label="Expertise"
            title={
              <>
                Technical <span className="gradient-text">Skills</span>
              </>
            }
            subtitle="Technologies and tools I use to build production-grade applications."
          />
        </AnimatedSection>

        {/* Category groups */}
        {categories.length > 0 ? (
          <div className="space-y-8">
            {categories.map((cat) => (
              <AnimatedSection key={cat.name}>
                <div>
                  <h3
                    className="text-sm font-medium mb-4"
                    style={{ color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", fontSize: "0.75rem" }}
                  >
                    {cat.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skillName) => (
                      <span
                        key={skillName}
                        className="px-3 py-1.5 rounded-[var(--radius-badge)] text-sm font-medium transition-colors duration-150 cursor-default"
                        style={{
                          background: "var(--bg-elevated)",
                          border: "1px solid var(--border-default)",
                          color: "var(--text-secondary)",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.color = "var(--accent-light)";
                          (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.4)";
                          (e.currentTarget as HTMLElement).style.background = "var(--accent-dim)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                          (e.currentTarget as HTMLElement).style.borderColor = "var(--border-default)";
                          (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)";
                        }}
                      >
                        {skillName}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-3"
          >
            {displaySkills.map((skill) => (
              <motion.span
                key={skill.id}
                variants={itemVariants}
                className="px-4 py-2 rounded-[var(--radius-badge)] text-sm font-medium transition-colors duration-150 cursor-default"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-default)",
                  color: skill.is_primary ? "var(--accent-light)" : "var(--text-secondary)",
                  borderColor: skill.is_primary ? "rgba(124,58,237,0.3)" : "var(--border-default)",
                }}
                whileHover={{ scale: 1.05 }}
              >
                {skill.name}
                {skill.proficiency !== undefined && (
                  <span
                    className="ml-2 text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {skill.proficiency}%
                  </span>
                )}
              </motion.span>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
