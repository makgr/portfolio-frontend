"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/utils/constants";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils/cn";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="site-nav">
        <nav className="pill" aria-label="Main navigation">
          <Link href="/" className="logo" aria-label="Go to homepage">
            &lt;mak <span>/</span>&gt;
          </Link>
          {/* Home is the logo */}
          {NAV_LINKS.filter((l) => l.href !== "/").map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn("nl", pathname.startsWith(link.href) && "active")}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-pill amber sm" style={{ marginLeft: 8 }} data-cursor="hi">
            Let&apos;s talk
          </Link>
          <button
            type="button"
            className="menu-btn"
            onClick={() => setMenuOpen(true)}
            aria-label="Open mobile menu"
            aria-expanded={menuOpen}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
