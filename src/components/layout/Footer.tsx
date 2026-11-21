import type { Profile } from "@/types/profile";

interface FooterProps {
  profile?: Profile | null;
}

export function Footer({ profile }: FooterProps) {
  const year = new Date().getFullYear();
  const name = profile?.full_name ?? "Developer";

  return (
    <footer className="mt-auto">
      <div
        className="mx-auto flex flex-wrap items-center justify-between gap-5 px-5 sm:px-10 pt-7 pb-9 text-sm text-[var(--text-secondary)]"
        style={{ maxWidth: 1320, borderTop: "1px solid var(--border-default)" }}
      >
        <span>
          &copy; {year} {name}
        </span>
        <span className="font-mono text-[var(--text-muted)]">{"// built with Next.js and Laravel"}</span>
      </div>
    </footer>
  );
}
