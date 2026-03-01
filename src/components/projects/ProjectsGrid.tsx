"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/types/project";
import type { Category } from "@/types/category";
import { ProjectCard } from "./ProjectCard";
import { CategoryFilter } from "./CategoryFilter";

interface ProjectsGridProps {
  projects: Project[];
  categories: Category[];
}

export function ProjectsGrid({ projects, categories }: ProjectsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("");

  const filtered = useMemo(() => {
    if (!selectedCategory) return projects;
    return projects.filter((p) => p.category?.slug === selectedCategory);
  }, [projects, selectedCategory]);

  return (
    <div>
      {categories.length > 0 && (
        <div className="mb-10">
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {filtered.length === 0 ? (
            <div
              className="text-center py-20"
              style={{ color: "var(--text-muted)" }}
            >
              <p className="text-lg">No projects found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
