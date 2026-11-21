// Author: Mohammad Ali Khan <xvirus.bd@gmail.com>
"use client";

import { useEffect, useState } from "react";

export function CopyEmailButton({ email, className }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  return (
    <button
      type="button"
      className={className}
      data-cursor="copy"
      onClick={() => navigator.clipboard?.writeText(email).then(() => setCopied(true), () => setCopied(false))}
    >
      <span aria-live="polite">{copied ? "Email copied" : "Copy email"}</span>
    </button>
  );
}
