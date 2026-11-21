// Author: Mohammad Ali Khan <xvirus.bd@gmail.com>
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const FRAMES = "⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏";
const STEPS = ["resolving route", "fetching data from the API", "rendering components", "hydrating"];

/** Random spot for the bug, in % of the play area. */
const spot = () => ({ left: 8 + Math.random() * 74, top: 10 + Math.random() * 70 });

/**
 * Route-change loader styled as a terminal. While the next page loads, a
 * `bug()` wanders the box; squashing it (click or Enter/Space) bumps a counter.
 */
export function RouteLoader() {
  const route = usePathname();
  const [tick, setTick] = useState(0);
  const [squashed, setSquashed] = useState(0);
  const [pos, setPos] = useState({ left: 50, top: 50 });

  useEffect(() => {
    setPos(spot());
    const spin = setInterval(() => setTick((t) => t + 1), 80);
    const wander = setInterval(() => setPos(spot()), 1400);
    return () => {
      clearInterval(spin);
      clearInterval(wander);
    };
  }, []);

  const seconds = ((tick * 80) / 1000).toFixed(1);
  const step = Math.min(STEPS.length - 1, Math.floor(tick / 10));

  return (
    <div className="route-loader" role="status" aria-label="Loading page">
      <div className="rl-term">
        <div className="rl-head">
          <span>mak@portfolio: ~</span>
          <span>{seconds}s</span>
        </div>
        <div className="rl-body">
          <p>
            <span className="rl-pr">~/mak $</span> open {route}
          </p>
          {STEPS.slice(0, step).map((s) => (
            <p key={s}>
              <span className="rl-ok">✓</span> {s}
            </p>
          ))}
          <p>
            <span className="rl-pr">{FRAMES[tick % FRAMES.length]}</span> {STEPS[step]}…
          </p>
          <div className="rl-play">
            <button
              type="button"
              className="rl-bug"
              style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
              data-cursor="squash"
              aria-label="Squash the bug"
              onClick={() => {
                setSquashed((n) => n + 1);
                setPos(spot());
              }}
            >
              bug()
            </button>
          </div>
          <p className="rl-hint">
            {squashed === 0
              ? "// squash the bug while you wait"
              : `// bugs fixed: ${squashed}${squashed >= 5 ? ", you're hired" : ""}`}
          </p>
        </div>
      </div>
    </div>
  );
}
