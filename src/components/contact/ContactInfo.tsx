import type { Profile } from "@/types/profile";
import { SocialLinks } from "@/components/shared/SocialLinks";

interface ContactInfoProps {
  profile?: Profile | null;
}

const contactItems = [
  {
    key: "email",
    label: "Email",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    key: "phone",
    label: "Phone",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    key: "location",
    label: "Location",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
] as const;

export function ContactInfo({ profile }: ContactInfoProps) {
  const socialLinks = {
    ...(profile?.social_links ?? {}),
    ...(profile?.site_info?.social ?? {}),
  };

  const info: { key: string; label: string; value: string; icon: React.ReactNode }[] =
    contactItems
      .map((item) => ({
        ...item,
        value: profile?.[item.key as keyof typeof profile] as string | undefined ?? "",
      }))
      .filter((item) => !!item.value) as {
        key: string;
        label: string;
        value: string;
        icon: React.ReactNode;
      }[];

  return (
    <div>
      <h1
        className="text-display-sm font-bold mb-3"
        style={{ color: "var(--text-primary)" }}
      >
        Let&apos;s work together
      </h1>
      <p
        className="text-base leading-relaxed mb-8"
        style={{ color: "var(--text-secondary)" }}
      >
        Have a project in mind or just want to say hello? Feel free to reach out. I&apos;m
        always open to discussing new opportunities and interesting ideas.
      </p>

      {info.length > 0 && (
        <div className="space-y-4 mb-8">
          {info.map((item) => (
            <div key={item.key} className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--accent-dim)", color: "var(--accent-light)" }}
                aria-hidden="true"
              >
                {item.icon}
              </div>
              <div>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{item.label}</p>
                <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div>
        <p className="text-xs font-medium mb-3 text-label" style={{ color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "0.75rem" }}>
          Find me online
        </p>
        <SocialLinks links={socialLinks} size="lg" />
      </div>
    </div>
  );
}
