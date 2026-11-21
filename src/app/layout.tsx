import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { getProfile } from "@/lib/api/profile";
import { getSettings } from "@/lib/api/settings";
import type { ReactNode } from "react";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
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
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable}`}>
      <body className="flex flex-col min-h-screen">
        <SiteChrome name={profile?.full_name ?? "Portfolio"} />
        <Header />
        <main className="flex-1 pt-20">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer profile={profile} />
      </body>
    </html>
  );
}
