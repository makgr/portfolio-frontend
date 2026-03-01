"use client";

import { useRef, useEffect } from "react";
import { useInView, animate } from "framer-motion";

interface Stat {
  value: number;
  label: string;
  suffix?: string;
}

interface StatsBarProps {
  yearsOfExperience?: number;
  totalProjects?: number;
  happyClients?: number;
}

function CountUpNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || !ref.current) return;
    const controls = animate(0, target, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        if (ref.current) {
          ref.current.textContent = `${Math.round(v)}${suffix}`;
        }
      },
    });
    return () => controls.stop();
  }, [isInView, target, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export function StatsBar({ yearsOfExperience, totalProjects, happyClients }: StatsBarProps) {
  const stats: Stat[] = [
    { value: yearsOfExperience ?? 5, label: "Years Experience", suffix: "+" },
    { value: totalProjects ?? 20, label: "Projects Completed", suffix: "+" },
    { value: happyClients ?? 30, label: "Happy Clients", suffix: "+" },
  ];

  return (
    <section
      className="py-12"
      style={{ borderTop: "1px solid var(--border-default)", borderBottom: "1px solid var(--border-default)" }}
      aria-label="Key statistics"
    >
      <div
        className="mx-auto px-6 grid grid-cols-3 gap-8"
        style={{ maxWidth: "var(--max-width-container)" }}
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            className="text-center"
          >
            <p
              className="text-display-lg font-bold"
              style={{ color: "var(--accent-light)", lineHeight: 1 }}
            >
              <CountUpNumber target={stat.value} suffix={stat.suffix} />
            </p>
            <p
              className="mt-2 text-sm font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
