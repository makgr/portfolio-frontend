"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { scramble } from "@/components/layout/SiteChrome";
import { CopyEmailButton } from "./CopyEmailButton";

export interface HeroSlide {
  slug: string;
  title: string;
  image: string;
  file: string;
  category: string;
}

interface HeroSectionProps {
  name: string;
  title: string;
  intro: string;
  since?: string;
  portrait: string;
  email?: string;
  roles: string[];
  slides: HeroSlide[];
}

const PLUS_X = ["0%", "16.666%", "33.333%", "66.666%", "83.333%", "100%"];
const PLUS_Y = ["0%", "33.333%", "66.666%"];

export function HeroSection({ name, title, intro, since, portrait, email, roles, slides }: HeroSectionProps) {
  // "Mohammad Ali Khan" -> "Mohammad\nAli Khan": first name on its own line
  const stacked = name.replace(" ", "\n");
  const [shown, setShown] = useState(stacked);
  const [revealed, setRevealed] = useState(false);
  const [role, setRole] = useState(roles[0] ?? "");
  const [slide, setSlide] = useState(0);

  // Start the entrance once the intro loader has finished (or immediately if it was skipped).
  useEffect(() => {
    let stop = () => {};
    const go = () => {
      setRevealed(true);
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) stop = scramble(stacked, 900, setShown);
    };
    if (document.documentElement.dataset.intro === "done") go();
    else window.addEventListener("intro:done", go, { once: true });
    return () => {
      window.removeEventListener("intro:done", go);
      stop();
    };
  }, [stacked]);

  // Typewriter for the "building:" line.
  useEffect(() => {
    if (!revealed || roles.length === 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ri = 0, ci = 0, del = false, hold = 0;
    const id = window.setInterval(() => {
      if (hold > 0) return void hold--;
      const word = roles[ri];
      if (!del) {
        ci++;
        if (ci >= word.length) { del = true; hold = 32; }
      } else {
        ci -= 2;
        if (ci <= 0) { ci = 0; del = false; ri = (ri + 1) % roles.length; hold = 6; }
      }
      setRole(roles[ri].slice(0, ci));
    }, 55);
    return () => clearInterval(id);
  }, [revealed, roles]);

  // Rotate the featured project card.
  useEffect(() => {
    if (slides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setSlide((s) => (s + 1) % slides.length), 3200);
    return () => clearInterval(id);
  }, [slides.length]);

  const ghost = title.split(" ").pop()?.toUpperCase() ?? "";

  return (
    <section className={`hero${revealed ? " in" : ""}`} id="top" data-spot="" suppressHydrationWarning>
      <div className="hero-grid" aria-hidden="true" />
      <div className="plus-layer" aria-hidden="true">
        {PLUS_X.flatMap((x) =>
          PLUS_Y.map((y) => (
            <span key={x + y} className="plus" style={{ left: x, top: y }}>
              +
            </span>
          ))
        )}
      </div>
      <p className="ghost rise" aria-hidden="true">{ghost}</p>
      <p className="ghost lit" aria-hidden="true">{ghost}</p>
      <div className="halo" aria-hidden="true" />
      <div className="portrait">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={portrait} alt={name} />
        <div className="fade" />
      </div>

      <div className="hero-intro rise d2">
        <p className="code-label">{`// ${title.toLowerCase()}`}</p>
        <p>{intro}</p>
        <p className="hero-role">
          <span>building:</span> {role}
          <span className="caret" />
        </p>
        <div className="ctas">
          <Link className="btn-pill amber sm" href="/projects" data-cursor="view">
            View my work
          </Link>
          {email && <CopyEmailButton email={email} className="btn-pill sm" />}
        </div>
      </div>

      <h1 className="hero-name rise d1" aria-label={name} onMouseEnter={() => scramble(stacked, 600, setShown)}>
        {since && <small>{since}</small>}
        <strong aria-hidden="true">{shown}</strong>
      </h1>

      {slides.length > 0 && (
        <Link suppressHydrationWarning className="glow-card hero-proj rise d3" href={`/projects/${slides[slide].slug}`} data-cursor="view">
          <div className="bar">
            <i />
            <i />
            <i />
            <b>{slides[slide].file}</b>
          </div>
          <div className="slides">
            {slides.map((s, i) => (
              <div key={s.slug} className={`slide${i === slide ? " on" : ""}`} aria-hidden={i !== slide}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.image} alt={s.title} />
                <div>
                  <span>{s.title}</span>
                  <span>/{s.category}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="dots">
            {slides.map((s, i) => (
              <i key={s.slug} className={i === slide ? "on" : ""} />
            ))}
          </div>
        </Link>
      )}

      <Link suppressHydrationWarning className="glow-card hero-talk rise d4" href="/contact" data-cursor="hi">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={portrait} alt="" />
        <div className="tx">
          <small>Let&apos;s talk</small>
          <b>{name}</b>
          <span>{title}</span>
        </div>
        <span className="go" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </span>
      </Link>
    </section>
  );
}
