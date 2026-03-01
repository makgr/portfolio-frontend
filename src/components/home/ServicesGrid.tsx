"use client";

import type { Service } from "@/types/service";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { AnimatedSection, staggerContainer, staggerItem } from "@/components/shared/AnimatedSection";
import { GlassCard } from "@/components/shared/GlassCard";
import { motion } from "framer-motion";

interface ServicesGridProps {
  services: Service[];
}

export function ServicesGrid({ services }: ServicesGridProps) {
  if (services.length === 0) return null;

  return (
    <section
      className="py-24"
      style={{ background: "var(--bg-secondary)" }}
      aria-labelledby="services-heading"
    >
      <div
        className="mx-auto px-6"
        style={{ maxWidth: "var(--max-width-container)" }}
      >
        <AnimatedSection>
          <SectionTitle
            label="Services"
            title={
              <>
                What I <span className="gradient-text">Offer</span>
              </>
            }
            subtitle="End-to-end development services tailored to your needs."
            center
          />
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.slice(0, 6).map((service) => (
            <motion.div key={service.id} variants={staggerItem}>
              <GlassCard hoverable className="p-6 h-full">
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl"
                  style={{ background: "var(--accent-dim)", color: "var(--accent-light)" }}
                >
                  {service.icon ?? "⚡"}
                </div>

                <h3
                  className="font-semibold text-base mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {service.title}
                </h3>

                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {service.short_description ?? service.description}
                </p>

                {service.features && service.features.length > 0 && (
                  <ul className="space-y-1.5">
                    {service.features.slice(0, 3).map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <svg
                          className="w-3 h-3 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          style={{ color: "var(--accent-light)" }}
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
