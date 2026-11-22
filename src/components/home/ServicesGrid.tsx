"use client";

import Link from "next/link";
import { useState } from "react";
import type { Service } from "@/types/service";

const slug = (s: Service) =>
  s.slug ?? s.title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** Services shown as an IDE file tree; picking a file shows its description. */
export function ServicesGrid({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const cur = services[active];

  return (
    <section className="sec" id="services">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="code-label">{"// services"}</p>
            <h2 className="h2">What you can hire me for</h2>
          </div>
          <p>Pick a file to read what&apos;s included.</p>
        </div>
        <div suppressHydrationWarning className="glow-card svc">
          <div className="tree">
            <div className="root">services/</div>
            {services.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className={`file${i === active ? " on" : ""}`}
                aria-pressed={i === active}
                data-cursor="open"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
              >
                <span className="br">{i === services.length - 1 ? "└──" : "├──"}</span>
                {slug(s)}.md
              </button>
            ))}
          </div>
          <div className="pane" aria-live="polite">
            <span className="fname">services/{slug(cur)}.md</span>
            <h3 key={`h${active}`}>{cur.title}</h3>
            <p key={`p${active}`}>{cur.short_description ?? cur.description}</p>
            <Link className="btn-pill amber" href="/contact" data-cursor="hi">
              Start a project
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
