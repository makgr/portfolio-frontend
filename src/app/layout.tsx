import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { clip, metaTags } from "@/lib/seo";
import { resolveImageUrl } from "@/lib/utils/imageUrl";
import { getProfile } from "@/lib/api/profile";
import { getSettings, isMaintenanceMode } from "@/lib/api/settings";
import { MaintenanceView } from "@/components/layout/MaintenanceView";
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
  // Keep the maintenance page out of search results.
  if (await isMaintenanceMode()) {
    return { title: "Back soon", robots: { index: false, follow: false } };
  }
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
    // Most specific first: the generic site_description ("This is a personal
    // portfolio site.") only wins when nothing better is filled in.
    const description = clip(
      settings?.seo?.meta_description ??
        metaTags(profile.meta_tags).description ??
        profile.short_bio ??
        settings?.general?.site_description ??
        profile.bio ??
        "Personal portfolio website"
    );
    const ogImage = resolveImageUrl(
      settings?.seo?.og_image ?? metaTags(profile.meta_tags).og_image ?? profile.hero_image_url ?? profile.avatar_url
    );

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
  const maintenance = await isMaintenanceMode();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${geist.variable} ${geistMono.variable}`}
    >
      <body className="flex flex-col min-h-screen">
        <SiteChrome name={profile?.full_name ?? "Portfolio"} intro={!maintenance} />
        {maintenance ? (
          <MaintenanceView profile={profile} />
        ) : (
          <>
            <Header />
            <main className="flex-1 pt-20">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer profile={profile} />
          </>
        )}
      </body>
    </html>
  );
}
