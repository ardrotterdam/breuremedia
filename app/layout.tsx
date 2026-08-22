import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { buildJsonLd, organizationSchema, webSiteSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";
import "./globals.css";
import "./nav.css";

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
    title: `${siteConfig.name} | Literaire Thrillers`,
    description: siteConfig.description,
    path: "/",
    image: "/images/og-breure-media-general.jpg",
    imageAlt: "Breure Media: literaire thrillers",
    imageWidth: 1200,
    imageHeight: 630,
  }),
  icons: {
    icon: "/assets/favicon.svg",
  },
};

/*
 * The App Router root layout is shared by /, /en and /de. Next.js does not
 * expose the request pathname here without middleware (disallowed for this
 * i18n setup) or a client write to document.documentElement. Nested layouts
 * under /de cannot replace the root <html>. Page-level <main lang="de"> plus
 * header/footer lang attributes carry the language until a [locale] split
 * exists. Leave html lang as the default site language (nl).
 */
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
        <Footer />
      </body>
    </html>
  );
}
