import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { getProfile } from "@/lib/api/profile";
import { getSettings } from "@/lib/api/settings";
import type { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const [profile, settings] = await Promise.all([
      getProfile(),
      getSettings(),
    ]);

    const siteName =
      settings?.general?.site_title ??
      settings?.seo?.site_name ??
      profile.full_name ??
      "Portfolio";
    const description =
      settings?.seo?.meta_description ??
      settings?.general?.site_description ??
      profile.short_bio ??
      profile.bio ??
      "Personal portfolio website";
    const ogImage =
      settings?.seo?.og_image ?? profile.hero_image_url ?? profile.avatar_url;

    return {
      metadataBase: new URL(
        process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
      ),
      title: {
        default: `${profile.full_name} — ${profile.title ?? "Developer"}`,
        template: `%s | ${siteName}`,
      },
      description,
      keywords: settings?.seo?.meta_keywords ?? "",
      openGraph: {
        type: "website",
        siteName,
        title: `${profile.full_name} — ${profile.title ?? "Developer"}`,
        description,
        ...(ogImage ? { images: [{ url: ogImage }] } : {}),
      },
      twitter: {
        card: "summary_large_image",
        title: `${profile.full_name} — ${profile.title ?? "Developer"}`,
        description,
        ...(ogImage ? { images: [ogImage] } : {}),
      },
    };
  } catch {
    return {
      title: "Portfolio",
      description: "Personal portfolio website",
    };
  }
}

function ThemeScript() {
  const script = `
    (function() {
      try {
        var stored = localStorage.getItem('portfolio-theme');
        var preferred = stored || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
        if (preferred === 'light') document.documentElement.classList.add('light');
      } catch(e) {}
    })();
  `;
  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  let profile = null;
  try {
    profile = await getProfile();
  } catch {
    // Profile fetch failed — layout still renders
  }

  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <ThemeScript />
      </head>
      <body className="flex flex-col min-h-screen" style={{ fontFamily: "var(--font-inter), Inter, system-ui, sans-serif" }}>
        <Header />
        <main className="flex-1 pt-20">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer profile={profile} />
      </body>
    </html>
  );
}
