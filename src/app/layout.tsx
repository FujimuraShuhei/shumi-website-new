import type { Metadata, Viewport } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Shumiデザイン｜${site.tagline}・業務アプリ開発`,
    template: `%s｜Shumiデザイン`,
  },
  description: site.description,
  openGraph: { type: "website", locale: "ja_JP", siteName: "Shumiデザイン", url: site.url },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#e2e7e9",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Shumiデザイン",
  alternateName: ["Shumi", "しゅうみ"],
  url: site.url,
  logo: `${site.url}/logo.svg`,
  description: site.description,
  areaServed: "JP",
  address: { "@type": "PostalAddress", addressRegion: "神奈川県", addressLocality: "横浜市", addressCountry: "JP" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <Script id="js-flag" strategy="beforeInteractive">{"document.documentElement.classList.add('js')"}</Script>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ScrollReveal />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
