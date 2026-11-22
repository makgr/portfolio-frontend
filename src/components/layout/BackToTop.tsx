// Author: Mohammad Ali Khan <xvirus.bd@gmail.com>
"use client";

export function BackToTop() {
  return (
    <button
      type="button"
      className="btn-pill sm"
      data-cursor="top"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        })
      }
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
      Back to top
    </button>
  );
}
