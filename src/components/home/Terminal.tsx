// Author: Mohammad Ali Khan <xvirus.bd@gmail.com>
"use client";

import { useState } from "react";

interface Line {
  cls: string;
  text: string;
}

/** A tiny fake shell: each button "runs" a command and prints its canned output. */
export function Terminal({ commands }: { commands: Record<string, string[]> }) {
  const [lines, setLines] = useState<Line[]>([{ cls: "t-dim", text: "# pick a command below" }]);

  const run = (cmd: string) => {
    if (cmd === "clear") return setLines([]);
    const out = commands[cmd].map((text) => ({ cls: "t-out", text }));
    setLines((prev) => [...prev, { cls: "t-cmd", text: `$ ${cmd}` }, ...out].slice(-12));
  };

  return (
    <div suppressHydrationWarning className="glow-card b-term">
      <div className="term-head">
        <span>mak@portfolio: ~</span>
        <span>zsh</span>
      </div>
      <div className="term-out" aria-live="polite">
        {lines.map((l, i) => (
          <div key={i} className={l.cls}>
            {l.text}
          </div>
        ))}
      </div>
      <div className="term-cmds">
        {[...Object.keys(commands), "clear"].map((cmd) => (
          <button key={cmd} type="button" className="cmd" data-cursor="run" onClick={() => run(cmd)}>
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
