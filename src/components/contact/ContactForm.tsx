"use client";

import { useContactForm } from "@/hooks/useContactForm";

export function ContactForm() {
  const { form, errors, status, successMessage, updateField, submit, reset } =
    useContactForm();

  if (status === "success") {
    return (
      <div
        className="p-8 rounded-[var(--radius-card)] text-center"
        style={{
          background: "rgba(34,197,94,0.08)",
          border: "1px solid rgba(34,197,94,0.3)",
        }}
        role="status"
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e" }}
        >
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
          Message Sent!
        </h3>
        <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
          {successMessage || "Thanks for reaching out. I'll get back to you soon."}
        </p>
        <button
          onClick={reset}
          className="text-sm font-medium transition-colors"
          style={{ color: "var(--accent-light)" }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate aria-label="Contact form">
      <div className="space-y-5">
        {/* Name */}
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium mb-1.5"
            style={{ color: "var(--text-primary)" }}
          >
            Name <span aria-hidden="true" style={{ color: "var(--error)" }}>*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="John Doe"
            required
            disabled={status === "loading"}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="w-full px-4 py-2.5 rounded-[var(--radius-button)] text-sm transition-colors"
            style={{
              background: "var(--bg-elevated)",
              border: `1px solid ${errors.name ? "var(--error)" : "var(--border-default)"}`,
              color: "var(--text-primary)",
              outline: "none",
            }}
            onFocus={(e) => { if (!errors.name) (e.target as HTMLInputElement).style.borderColor = "var(--accent)"; }}
            onBlur={(e) => { if (!errors.name) (e.target as HTMLInputElement).style.borderColor = "var(--border-default)"; }}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs" style={{ color: "var(--error)" }} role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium mb-1.5"
            style={{ color: "var(--text-primary)" }}
          >
            Email <span aria-hidden="true" style={{ color: "var(--error)" }}>*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="your@email.com"
            required
            disabled={status === "loading"}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="w-full px-4 py-2.5 rounded-[var(--radius-button)] text-sm transition-colors"
            style={{
              background: "var(--bg-elevated)",
              border: `1px solid ${errors.email ? "var(--error)" : "var(--border-default)"}`,
              color: "var(--text-primary)",
              outline: "none",
            }}
            onFocus={(e) => { if (!errors.email) (e.target as HTMLInputElement).style.borderColor = "var(--accent)"; }}
            onBlur={(e) => { if (!errors.email) (e.target as HTMLInputElement).style.borderColor = "var(--border-default)"; }}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs" style={{ color: "var(--error)" }} role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone (optional) */}
        <div>
          <label
            htmlFor="contact-phone"
            className="block text-sm font-medium mb-1.5"
            style={{ color: "var(--text-primary)" }}
          >
            Phone{" "}
            <span className="text-xs font-normal" style={{ color: "var(--text-muted)" }}>
              (optional)
            </span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            placeholder="+1 234 567 890"
            disabled={status === "loading"}
            className="w-full px-4 py-2.5 rounded-[var(--radius-button)] text-sm transition-colors"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-default)",
              color: "var(--text-primary)",
              outline: "none",
            }}
            onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "var(--accent)"; }}
            onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "var(--border-default)"; }}
          />
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="contact-subject"
            className="block text-sm font-medium mb-1.5"
            style={{ color: "var(--text-primary)" }}
          >
            Subject <span aria-hidden="true" style={{ color: "var(--error)" }}>*</span>
          </label>
          <input
            id="contact-subject"
            type="text"
            value={form.subject}
            onChange={(e) => updateField("subject", e.target.value)}
            placeholder="Project Inquiry"
            required
            disabled={status === "loading"}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "subject-error" : undefined}
            className="w-full px-4 py-2.5 rounded-[var(--radius-button)] text-sm transition-colors"
            style={{
              background: "var(--bg-elevated)",
              border: `1px solid ${errors.subject ? "var(--error)" : "var(--border-default)"}`,
              color: "var(--text-primary)",
              outline: "none",
            }}
            onFocus={(e) => { if (!errors.subject) (e.target as HTMLInputElement).style.borderColor = "var(--accent)"; }}
            onBlur={(e) => { if (!errors.subject) (e.target as HTMLInputElement).style.borderColor = "var(--border-default)"; }}
          />
          {errors.subject && (
            <p id="subject-error" className="mt-1.5 text-xs" style={{ color: "var(--error)" }} role="alert">
              {errors.subject}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="contact-message"
            className="block text-sm font-medium mb-1.5"
            style={{ color: "var(--text-primary)" }}
          >
            Message <span aria-hidden="true" style={{ color: "var(--error)" }}>*</span>
          </label>
          <textarea
            id="contact-message"
            rows={5}
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
            placeholder="Tell me about your project or question…"
            required
            disabled={status === "loading"}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className="w-full px-4 py-2.5 rounded-[var(--radius-button)] text-sm transition-colors resize-y"
            style={{
              background: "var(--bg-elevated)",
              border: `1px solid ${errors.message ? "var(--error)" : "var(--border-default)"}`,
              color: "var(--text-primary)",
              outline: "none",
              minHeight: "120px",
            }}
            onFocus={(e) => { if (!errors.message) (e.target as HTMLTextAreaElement).style.borderColor = "var(--accent)"; }}
            onBlur={(e) => { if (!errors.message) (e.target as HTMLTextAreaElement).style.borderColor = "var(--border-default)"; }}
          />
          {errors.message && (
            <p id="message-error" className="mt-1.5 text-xs" style={{ color: "var(--error)" }} role="alert">
              {errors.message}
            </p>
          )}
        </div>

        {/* General error */}
        {errors.general && (
          <div
            className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm"
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "var(--error)",
            }}
            role="alert"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errors.general}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-3 rounded-[var(--radius-button)] text-sm font-medium text-[var(--on-accent)] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{ background: "var(--accent)" }}
        >
          {status === "loading" ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending…
            </>
          ) : (
            <>
              Send Message
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
