"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Testimonial } from "@/types/testimonial";
import { Avatar } from "@/components/shared/Avatar";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
    transition: { duration: 0.3 },
  }),
};

function StarRating({ rating }: { rating?: number }) {
  if (!rating) return null;
  return (
    <div className="flex gap-0.5 mb-4" aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4"
          fill={i < rating ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
          style={{ color: "#f59e0b" }}
        >
          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setActiveIndex((i) => (i + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next, testimonials.length]);

  if (testimonials.length === 0) return null;

  const testimonial = testimonials[activeIndex];

  return (
    <section
      className="py-24"
      style={{ background: "var(--bg-secondary)" }}
      aria-label="Client testimonials"
    >
      <div
        className="mx-auto px-6"
        style={{ maxWidth: "var(--max-width-container)" }}
      >
        <AnimatedSection>
          <SectionTitle
            label="Reviews"
            title={
              <>
                Client <span className="gradient-text">Testimonials</span>
              </>
            }
            center
          />
        </AnimatedSection>

        <div
          className="relative max-w-2xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="overflow-hidden p-8 rounded-[var(--radius-glass)] relative min-h-[280px] flex items-center"
            style={{
              background: "var(--bg-tertiary)",
              border: "1px solid var(--border-default)",
            }}
          >
            {/* Quote mark */}
            <span
              className="absolute top-6 left-8 text-6xl font-serif leading-none select-none pointer-events-none"
              style={{ color: "var(--accent-dim)", fontSize: "5rem" }}
              aria-hidden="true"
            >
              &ldquo;
            </span>

            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full pt-8"
              >
                <StarRating rating={testimonial.rating} />

                <blockquote
                  className="text-base leading-relaxed mb-6 italic"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {testimonial.content}
                </blockquote>

                <div className="flex items-center gap-3">
                  <Avatar
                    src={testimonial.client_image}
                    alt={testimonial.client_name ?? "Client"}
                    size={40}
                  />
                  <div>
                    <p
                      className="font-semibold text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {testimonial.client_name}
                    </p>
                    {(testimonial.client_position || testimonial.client_company) && (
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {[testimonial.client_position, testimonial.client_company]
                          .filter(Boolean)
                          .join(" @ ")}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          {testimonials.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="w-8 h-8 flex items-center justify-center rounded-full border transition-colors"
                style={{ borderColor: "var(--border-default)", color: "var(--text-muted)" }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > activeIndex ? 1 : -1);
                      setActiveIndex(i);
                    }}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className="transition-all duration-300"
                    style={{
                      width: i === activeIndex ? "1.5rem" : "0.5rem",
                      height: "0.5rem",
                      borderRadius: "0.25rem",
                      background: i === activeIndex ? "var(--accent)" : "var(--bg-elevated)",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label="Next testimonial"
                className="w-8 h-8 flex items-center justify-center rounded-full border transition-colors"
                style={{ borderColor: "var(--border-default)", color: "var(--text-muted)" }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
