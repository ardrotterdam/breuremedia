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
  type?: "website" | "article" | "book";
  noIndex?: boolean;
  keywords?: string[];
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
}: PageSeoOptions): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ? absoluteUrl(image) : absoluteUrl("/assets/schaduwen-over-domburg-cover.webp");
  const ogImageAlt = imageAlt ?? title;
  const ogImageWidth = imageWidth ?? 800;
  const ogImageHeight = imageHeight ?? 1200;

  return {
    title,
    description,
    keywords: keywords?.join(", "),
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [
        {
          url: ogImage,
          width: ogImageWidth,
          height: ogImageHeight,
          alt: ogImageAlt,
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
