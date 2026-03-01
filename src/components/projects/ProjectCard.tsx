"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/types/project";
import { Badge } from "@/components/shared/Badge";
import { cn } from "@/lib/utils/cn";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: i * 0.1,
    },
  }),
};

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      custom={index}
      variants={itemVariants}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link href={`/projects/${project.slug}`} className="block h-full">
        <article
          className="h-full flex flex-col overflow-hidden rounded-[var(--radius-card)] glass-card"
          style={{ transition: "border-color 0.2s, box-shadow 0.2s" }}
        >
          {/* Image */}
          <div className="relative aspect-video overflow-hidden">
            {project.featured_image ? (
              <Image
                src={project.featured_image}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ background: "var(--bg-elevated)" }}
              >
                <svg
                  className="w-12 h-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1"
                  style={{ color: "var(--text-muted)" }}
                >
                  <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
            )}
            {/* Overlay on hover */}
            <div
              className="absolute inset-0 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-300"
              style={{ background: "rgba(124,58,237,0.7)" }}
            >
              <span className="text-white font-medium text-sm">View Project →</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-1">
            {project.category && (
              <Badge variant="accent" className="mb-3 self-start">
                {project.category.name}
              </Badge>
            )}

            <h3
              className="font-semibold text-base mb-2 line-clamp-2"
              style={{ color: "var(--text-primary)" }}
            >
              {project.title}
            </h3>

            <p
              className="text-sm leading-relaxed mb-4 flex-1 line-clamp-2"
              style={{ color: "var(--text-secondary)" }}
            >
              {project.short_description ?? project.description}
            </p>

            {/* Tech stack */}
            {project.tech_stack && project.tech_stack.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {project.tech_stack.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="default" size="sm">
                    {tech}
                  </Badge>
                ))}
                {project.tech_stack.length > 3 && (
                  <Badge variant="default" size="sm">
                    +{project.tech_stack.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
