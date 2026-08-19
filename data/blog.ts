/**
 * Central registry for published blog articles shown on /blog and /en/blog.
 * Article bodies live on their own pages; this file only holds hub metadata.
 */
import type { Locale } from "@/lib/i18n";

export interface BlogPost {
  /** Absolute site path, e.g. "/waterdichte-e-reader" or "/en/markthal-rotterdam". */
  href: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  imageAlt: string;
  locale: Locale;
  /** ISO date YYYY-MM-DD */
  publishedAt: string;
  /** ISO date YYYY-MM-DD when different from publishedAt */
  updatedAt?: string;
}

export const blogPosts: BlogPost[] = [
  {
    href: "/kubuswoningen-rotterdam",
    title: "Kubuswoningen Rotterdam: wat te zien, ervaren en weten voor je bezoek",
    excerpt:
      "Bezoek je de Kubuswoningen Rotterdam? Ontdek wat je ziet, hoe je de Kijk-Kubus van binnen bekijkt, hoeveel tijd je nodig hebt en wat er in de buurt ligt.",
    category: "Rotterdam",
    image: "/images/cube-houses-blaak-near-markthal-rotterdam.webp",
    imageAlt:
      "De gele kubuswoningen van Piet Blom bij station Blaak in Rotterdam",
    locale: "nl",
    publishedAt: "2026-08-19",
  },
  {
    href: "/markthal-rotterdam",
    title: "Markthal Rotterdam: wat te zien, eten en weten voor je bezoek",
    excerpt:
      "Bezoek je de Markthal Rotterdam? Ontdek wat je er kunt zien en eten, hoeveel tijd je nodig hebt en welke bezienswaardigheden dichtbij liggen.",
    category: "Rotterdam",
    image: "/images/markthal-rotterdam-exterior-hero.webp",
    imageAlt:
      "Buitenkant van de Markthal Rotterdam met de herkenbare glazen boog en het stadsplein",
    locale: "nl",
    publishedAt: "2026-08-18",
  },
  {
    href: "/lengte-van-ebook",
    title: "Lengte van een e-book: woorden & pagina's per genre",
    excerpt:
      "Hoe lang is een e-book? Bekijk gemiddelde woord- en pagina-aantallen per genre en kies de juiste lengte.",
    category: "Schrijven",
    image: "/assets/kindle-paperwhite-schaduwen-over-domburg-zeeuwse-kust.webp",
    imageAlt:
      "Kindle Paperwhite e-reader met de cover van Schaduwen over Domburg aan de Zeeuwse kust",
    locale: "nl",
    publishedAt: "2026-08-11",
    updatedAt: "2026-08-18",
  },
  {
    href: "/waterdichte-e-reader",
    title: "Beste waterdichte e-reader 2026: top 4 vergeleken",
    excerpt:
      "Welke e-reader kan mee in bad, naar het strand of zwembad? Vergelijk vier waterdichte modellen van Kobo en Kindle.",
    category: "E-readers",
    image: "/images/beste-waterdichte-e-reader-2026.webp",
    imageAlt:
      "Waterdichte e-reader naast een zwembad voor lezen op vakantie",
    locale: "nl",
    publishedAt: "2026-08-07",
    updatedAt: "2026-08-18",
  },
  {
    href: "/en/markthal-rotterdam",
    title: "Markthal Rotterdam: What to See, Eat and Know Before You Go",
    excerpt:
      "Visiting Markthal Rotterdam? Discover what to see and eat, how long you need, nearby attractions and practical tips for planning your visit.",
    category: "Rotterdam",
    image: "/images/markthal-rotterdam-exterior-hero.webp",
    imageAlt:
      "Exterior of Markthal Rotterdam with its iconic arched glass facade and city plaza",
    locale: "en",
    publishedAt: "2026-08-18",
  },
];

export function getPublishedBlogPosts(locale?: Locale): BlogPost[] {
  if (!locale) {
    return blogPosts;
  }
  return blogPosts.filter((post) => post.locale === locale);
}

const dateLocales: Record<Locale, string> = {
  nl: "nl-NL",
  en: "en-GB",
};

/** Long date for article cards, e.g. "7 augustus 2026" / "18 August 2026". */
export function formatBlogDate(isoDate: string, locale: Locale = "nl"): string {
  const date = new Date(`${isoDate}T12:00:00`);
  return new Intl.DateTimeFormat(dateLocales[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
