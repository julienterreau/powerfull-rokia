import type { Metadata } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CallWidget } from "@/components/layout/CallWidget";
import { getGlobal } from "@/lib/content";
import { env } from "@/lib/env";
import "./globals.css";

const fraunces = localFont({
  src: [
    { path: "../fonts/fraunces-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/fraunces-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/fraunces-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/fraunces-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = localFont({
  src: "../fonts/Inter.ttf",
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobal();
  return {
    metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
    title: { default: global.seo.metaTitle, template: `%s · ${global.siteName}` },
    description: global.seo.metaDescription,
    openGraph: { title: global.seo.metaTitle, description: global.seo.metaDescription, locale: "fr_FR", type: "website" },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const global = await getGlobal();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: global.siteName,
    url: env.NEXT_PUBLIC_SITE_URL,
    email: global.email,
    sameAs: [global.youtubeUrl],
    description: global.baseline,
  };

  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <a className="skip" href="#contenu">
          Aller au contenu
        </a>
        <Header global={global} />
        {children}
        <Footer global={global} />
        <CallWidget enabled={global.callWidgetEnabled} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
