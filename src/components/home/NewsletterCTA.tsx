"use client";

import { useNewsletterForm } from "@/hooks/useNewsletterForm";
import { cn } from "@/lib/utils/cn";

export function NewsletterCTA() {
  const { email, setEmail, status, message, submit } = useNewsletterForm();

  return (
    <section
      className="py-24"
      style={{ background: "var(--bg-secondary)" }}
      aria-labelledby="newsletter-heading"
    >
      <div
        className="mx-auto px-6 max-w-2xl text-center"
        style={{ maxWidth: "42rem" }}
      >
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: "var(--accent-dim)", color: "var(--accent-light)" }}
          aria-hidden="true"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>

        <h2
          className="text-display-sm font-bold mb-3"
          id="newsletter-heading"
          style={{ color: "var(--text-primary)" }}
        >
          Stay in the loop
        </h2>
        <p
          className="text-base mb-8 leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          Get occasional articles on software engineering, architecture patterns, and
          lessons from real-world projects. No spam, ever.
        </p>

        {status === "success" ? (
          <div
            className="flex items-center gap-3 px-5 py-4 rounded-xl text-sm"
            style={{
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.3)",
              color: "#22c55e",
            }}
            role="status"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M5 13l4 4L19 7" />
            </svg>
            {message || "You&apos;re subscribed! Thanks for joining."}
          </div>
        ) : (
          <form onSubmit={submit} className="flex gap-2 flex-col sm:flex-row" aria-label="Newsletter subscription">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={status === "loading"}
              className="flex-1 px-4 py-2.5 rounded-[var(--radius-button)] text-sm transition-colors"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-default)",
                color: "var(--text-primary)",
                outline: "none",
              }}
              onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "var(--accent)"; }}
              onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "var(--border-default)"; }}
            />
            <button
              type="submit"
              disabled={status === "loading" || !email.trim()}
              className="px-6 py-2.5 rounded-[var(--radius-button)] text-sm font-medium text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              style={{ background: "var(--accent)" }}
            >
              {status === "loading" ? "Subscribing…" : "Subscribe"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-3 text-sm" style={{ color: "var(--error)" }} role="alert">
            {message}
          </p>
        )}

        <p className="mt-4 text-xs" style={{ color: "var(--text-muted)" }}>
          Unsubscribe anytime. No spam.
        </p>
      </div>
    </section>
  );
}
