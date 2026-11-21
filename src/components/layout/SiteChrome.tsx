// Author: Mohammad Ali Khan <xvirus.bd@gmail.com>
"use client";

import { useEffect, useRef, useState } from "react";

const CODE = `<?php

namespace App\\Http\\Controllers\\Api\\V1;

use App\\Models\\Project;
use App\\Http\\Resources\\ProjectResource;
use Illuminate\\Http\\Request;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $projects = Project::query()
            ->published()
            ->with(['category', 'images'])
            ->when($request->featured, fn ($q) => $q->featured())
            ->latest('project_date')
            ->paginate($request->integer('per_page', 12));

        return ProjectResource::collection($projects);
    }

    public function show(string $slug)
    {
        $project = Project::published()
            ->where('slug', $slug)
            ->firstOrFail();

        return new ProjectResource($project);
    }
}

Route::prefix('v1')->group(function () {
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::get('/projects/{slug}', [ProjectController::class, 'show']);
    Route::get('/skills', [SkillController::class, 'index']);
    Route::get('/experiences', [ExperienceController::class, 'index']);
    Route::post('/contact', [ContactController::class, 'store'])
        ->middleware('throttle:5,1');
});

export async function getProjects(featured = false) {
  const res = await fetch(\`\${API_BASE}/projects?featured=\${+featured}\`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new ApiError(res.status, 'Projects failed');
  const { data } = await res.json();
  return data as Project[];
}

class BookingRepository {
  Future<List<Slot>> freeSlots(DateTime day) async {
    final rows = await _db.query('slots', where: 'day = ?');
    return rows.map(Slot.fromMap).where((s) => !s.taken).toList();
  }
}

SELECT p.title, COUNT(o.id) AS orders
FROM projects p
JOIN orders o ON o.project_id = p.id
WHERE p.status = 'published'
GROUP BY p.id
ORDER BY orders DESC
LIMIT 10;
`;

const STEPS: [number, string, string, string][] = [
  [0, "pr", "~/mak $", "npm run portfolio"],
  [12, "ok", "✓", "loaded laravel, react, vue, flutter"],
  [34, "ok", "✓", "compiled projects"],
  [56, "ok", "✓", "migrated years of experience"],
  [78, "ok", "✓", "linked happy clients"],
  [100, "pr", ">", "ready"],
];
const GLYPHS = "!<>-_/[]{}=+*^?#$%&01;:";

const CLICKABLE = "a[href],button,[role='button'],label[for],select,summary,[data-cursor]";

/** Word shown inside the cursor ring over a clickable element. */
function cursorLabel(el: Element) {
  const custom = el.getAttribute("data-cursor");
  if (custom) return custom;
  if (el.tagName === "A") return el.getAttribute("target") === "_blank" ? "visit ↗" : "open";
  return "click";
}

/** Marks the intro as finished so the hero can start its own entrance. */
function finishIntro() {
  document.documentElement.dataset.intro = "done";
  window.dispatchEvent(new Event("intro:done"));
}

/** Scrambles `target` into place over `ms`, calling `set` each frame. */
export function scramble(target: string, ms: number, set: (s: string) => void, done?: () => void) {
  const start = performance.now();
  let raf = 0;
  const step = (now: number) => {
    const k = Math.min(1, (now - start) / ms);
    const n = Math.floor(k * target.length);
    let out = target.slice(0, n);
    for (let i = n; i < target.length; i++) {
      const ch = target[i];
      out += ch === " " || ch === "\n" ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    }
    set(out);
    if (k < 1) raf = requestAnimationFrame(step);
    else done?.();
  };
  raf = requestAnimationFrame(step);
  return () => cancelAnimationFrame(raf);
}

function IntroLoader({ name }: { name: string }) {
  const [p, setP] = useState(0);
  const [phase, setPhase] = useState<"boot" | "name" | "out" | "done">("boot");
  const [ldName, setLdName] = useState("");

  useEffect(() => {
    // Once per tab session; reduced-motion users skip straight to the page.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || sessionStorage.getItem("intro-seen")) {
      setPhase("done");
      finishIntro();
      return;
    }
    sessionStorage.setItem("intro-seen", "1");
    const timers: number[] = [];
    let stop = () => {};
    let cur = 0;
    const id = window.setInterval(() => {
      cur = Math.min(100, cur + 1 + Math.round(Math.random() * 2));
      setP(cur);
      if (cur < 100) return;
      clearInterval(id);
      setPhase("name");
      stop = scramble(name, 700, setLdName, () => {
        timers.push(window.setTimeout(() => setPhase("out"), 450));
        timers.push(window.setTimeout(finishIntro, 650));
        timers.push(window.setTimeout(() => setPhase("done"), 1500));
      });
    }, 28);
    return () => {
      clearInterval(id);
      timers.forEach(clearTimeout);
      stop();
    };
  }, [name]);

  if (phase === "done") return null;
  const filled = Math.round(p / 5);
  return (
    <div className={`intro${phase === "out" ? " out" : ""}`} role="status" aria-label="Loading portfolio">
      <div className="intro-body">
        {STEPS.filter((s) => p >= s[0]).map((s) => (
          <div key={s[3]} className="intro-line">
            <span className={s[1]}>{s[2]}</span> {s[3]}
          </div>
        ))}
        <div className="intro-bar">
          [{"█".repeat(filled)}
          {"░".repeat(20 - filled)}] {String(p).padStart(3, " ")}%
        </div>
        <div className="intro-name">{ldName}</div>
      </div>
    </div>
  );
}

/**
 * Site-wide chrome: the dim code backdrop lit by the pointer, the amber cursor
 * (dot + trailing ring with a label from `data-cursor`) and the intro loader.
 */
export function SiteChrome({ name }: { name: string }) {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    root.classList.add("has-cursor");
    let mx = -200, my = -200, rx = -200, ry = -200, raf = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      root.style.setProperty("--mx", `${mx}px`);
      root.style.setProperty("--my", `${my}px`);
      const t = e.target instanceof Element ? e.target : null;
      const hit = t?.closest(CLICKABLE);
      const disabled = !!hit?.matches(":disabled,[aria-disabled='true']");
      root.classList.toggle("cursor-hover", !!hit && !disabled);
      ring.current?.classList.toggle("on", !!hit && !disabled);
      if (label.current) label.current.textContent = hit && !disabled ? cursorLabel(hit) : "";
      // local pointer coords for edge-lit cards and spotlight areas; these elements
      // set suppressHydrationWarning since this can run before they hydrate
      const card = t?.closest<HTMLElement>(".glow-card");
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--cx", `${mx - r.left}px`);
        card.style.setProperty("--cy", `${my - r.top}px`);
      }
      let sp = t?.closest<HTMLElement>("[data-spot]");
      while (sp) {
        const r = sp.getBoundingClientRect();
        sp.style.setProperty("--sx", `${mx - r.left}px`);
        sp.style.setProperty("--sy", `${my - r.top}px`);
        sp = sp.parentElement?.closest<HTMLElement>("[data-spot]") ?? null;
      }
    };
    const down = () => ring.current?.classList.add("down");
    const up = () => ring.current?.classList.remove("down");
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (dot.current) dot.current.style.transform = `translate(${mx}px,${my}px)`;
      if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    raf = requestAnimationFrame(tick);
    return () => {
      root.classList.remove("has-cursor", "cursor-hover");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="codefield" aria-hidden="true">
        <pre>{CODE}</pre>
        <div className="lit">
          <pre>{CODE}</pre>
        </div>
      </div>
      <div className="pointer-glow" aria-hidden="true" />
      <IntroLoader name={name} />
      <div className="cur-dot" ref={dot} aria-hidden="true" />
      <div className="cur-ring" ref={ring} aria-hidden="true">
        <i />
        <span className="cur-label" ref={label} />
      </div>
    </>
  );
}
