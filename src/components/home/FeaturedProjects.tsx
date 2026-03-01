"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/types/project";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { Button } from "@/components/shared/Button";
import { AnimatedSection, staggerContainer } from "@/components/shared/AnimatedSection";

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <section
      className="py-24"
      style={{ background: "var(--bg-secondary)" }}
      aria-labelledby="featured-projects-heading"
    >
      <div
        className="mx-auto px-6"
        style={{ maxWidth: "var(--max-width-container)" }}
      >
        <AnimatedSection>
          <SectionTitle
            label="Work"
            title={
              <>
                Featured <span className="gradient-text">Projects</span>
              </>
            }
            subtitle="A selection of projects that demonstrate technical depth and product thinking."
          />
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.slice(0, 6).map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>

        <div className="mt-12 flex justify-center">
          <Button as="link" href="/projects" variant="outline" size="lg">
            View All Projects
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
}
