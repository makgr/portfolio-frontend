import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getProfile } from "@/lib/api/profile";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    title: "Contact",
    description: "Get in touch for project inquiries, collaborations, or just to say hello.",
    path: "/contact",
  });
}

export default async function ContactPage() {
  let profile = null;
  try {
    profile = await getProfile();
  } catch {
    // Silently fail — contact form still works
  }

  return (
    <div
      className="mx-auto px-6 py-16"
      style={{ maxWidth: "var(--max-width-container)" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Info */}
        <div>
          <ContactInfo profile={profile} />
        </div>

        {/* Right: Form */}
        <div>
          <h2
            className="text-display-sm font-bold mb-8"
            style={{ color: "var(--text-primary)" }}
          >
            Send a Message
          </h2>
          <div
            className="p-6 rounded-[var(--radius-card)]"
            style={{
              background: "var(--bg-tertiary)",
              border: "1px solid var(--border-default)",
            }}
          >
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
