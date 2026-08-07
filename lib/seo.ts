import type { Metadata } from "next";
import { siteConfig } from "./site";

export interface PageSeoOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  /** MIME type of the OG image, e.g. "image/webp". Added to og:image when set. */
  imageType?: string;
  type?: "website" | "article" | "book";
  noIndex?: boolean;
  keywords?: string[];
  /** OpenGraph locale, e.g. "en_US". Defaults to the site locale (nl_NL). */
  locale?: string;
  /**
   * hreflang alternates, mapping language code → absolute-or-relative path,
   * e.g. { nl: "/boeken/schaduwen-over-domburg", en: "/en/shadows-over-domburg" }.
   * Include an "x-default" entry to name the fallback for unmatched locales.
   */
  languages?: Record<string, string>;
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized}`;
}

export function buildMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  type = "website",
  noIndex = false,
  keywords,
  locale,
  languages,
  imageType,
}: PageSeoOptions): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ? absoluteUrl(image) : absoluteUrl("/assets/schaduwen-over-domburg-cover.webp");
  const ogImageAlt = imageAlt ?? title;
  const ogImageWidth = imageWidth ?? 800;
  const ogImageHeight = imageHeight ?? 1200;
  const hreflang = languages
    ? Object.fromEntries(
        Object.entries(languages).map(([lang, target]) => [
          lang,
          absoluteUrl(target),
        ])
      )
    : undefined;

  return {
    title,
    description,
    keywords: keywords?.join(", "),
    alternates: {
      canonical: url,
      ...(hreflang && { languages: hreflang }),
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: locale ?? siteConfig.locale,
      type,
      images: [
        {
          url: ogImage,
          width: ogImageWidth,
          height: ogImageHeight,
          alt: ogImageAlt,
          ...(imageType && { type: imageType }),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function bookPageTitle(bookTitle: string, authorName: string): string {
  return `${bookTitle} | ${authorName} | ${siteConfig.name}`;
}

export function sitePageTitle(pageName: string): string {
  return `${pageName} | ${siteConfig.name}`;
}
