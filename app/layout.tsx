import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { buildJsonLd, organizationSchema, webSiteSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...buildMetadata({
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    path: "/",
  }),
  icons: {
    icon: "/assets/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = buildJsonLd(organizationSchema(), webSiteSchema());

  return (
    <html lang={siteConfig.language}>
      <body className={`${cormorant.variable} ${inter.variable}`}>
        <JsonLd data={jsonLd} />
        <Header />
        {children}
        <GoogleAnalytics gaId="G-FY6TDYHB0P" />
        <Footer />
      </body>
    </html>
  );
}
