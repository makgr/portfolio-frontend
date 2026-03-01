import type { Metadata } from "next";
import { getProjects } from "@/lib/api/projects";
import { getCategoriesByType } from "@/lib/api/categories";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of projects showcasing technical depth and real-world problem solving.",
};

export default async function ProjectsPage() {
  const [projects, categories] = await Promise.allSettled([
    getProjects(),
    getCategoriesByType("project"),
  ]);

  const projectsList = projects.status === "fulfilled" ? projects.value : [];
  const categoriesList = categories.status === "fulfilled" ? categories.value : [];

  return (
    <div
      className="mx-auto px-6 py-16"
      style={{ maxWidth: "var(--max-width-container)" }}
    >
      <AnimatedSection className="mb-12">
        <SectionTitle
          label="Portfolio"
          title={
            <>
              My <span className="gradient-text">Projects</span>
            </>
          }
          subtitle={`${projectsList.length > 0 ? projectsList.length + " projects" : "A collection"} demonstrating production-grade engineering and design thinking.`}
        />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <ProjectsGrid projects={projectsList} categories={categoriesList} />
      </AnimatedSection>
    </div>
  );
}
