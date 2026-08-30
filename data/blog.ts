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
  /** Card thumbnail. Omitted until a licensed/owned file exists. */
  image?: string;
  imageAlt?: string;
  locale: Locale;
  /** ISO date YYYY-MM-DD */
  publishedAt: string;
  /** ISO date YYYY-MM-DD when different from publishedAt */
  updatedAt?: string;
}

export const blogPosts: BlogPost[] = [
  {
    href: "/haven-van-rotterdam",
    title: "De haven van Rotterdam vanaf het water",
    excerpt:
      "Zeven jaar reed ik taxi in de Rotterdamse haven. Wat je ziet als je zelf gaat kijken, wat je niet ziet, en waarom mijn thriller hier begint.",
    category: "Rotterdam",
    image: "/images/blog/haven-rotterdam-hero.webp",
    imageAlt:
      "Een rij containerkranen langs de kade in de haven van Rotterdam tijdens het blauwe uur",
    locale: "nl",
    publishedAt: "2026-08-30",
  },
  {
    href: "/domburg",
    title: "Domburg: het badplaatsje achter Schaduwen over Domburg",
    excerpt:
      "Domburg door de ogen van thrillerauteur Ard Breure: de oudste badplaats van Zeeland, en het decor van Schaduwen over Domburg.",
    category: "Zeeland",
    image: "/images/strandovergang-domburg-november.webp",
    imageAlt:
      "Strandovergang tussen de duinen bij Domburg onder een grijze novemberlucht",
    locale: "nl",
    publishedAt: "2026-08-21",
  },
  {
    href: "/kubuswoningen-rotterdam",
    title: "Kubuswoningen Rotterdam: waarom deze stad het decor van mijn thrillers is",
    excerpt:
      "Kubuswoningen Rotterdam door de ogen van thrillerauteur Ard Breure: waarom deze stad het decor van zijn thrillers is.",
    category: "Rotterdam",
    image: "/images/kubuswoningen-rotterdam-exterior-hero.webp",
    imageAlt:
      "Kubuswoningen Rotterdam: gele gekantelde huizen van Piet Blom aan het Overblaak onder een blauwe lucht",
    locale: "nl",
    publishedAt: "2026-08-19",
    updatedAt: "2026-08-21",
  },
  {
    href: "/markthal-rotterdam",
    title: "Markthal Rotterdam: de rauwe glans van een stad vol verhalen",
    excerpt:
      "Markthal Rotterdam door de ogen van thrillerauteur Ard Breure: de rauwe glans van een stad vol verhalen, het decor van zijn serie.",
    category: "Rotterdam",
    image: "/images/markthal-rotterdam-exterior-hero.webp",
    imageAlt:
      "Buitenkant van de Markthal Rotterdam met de herkenbare glazen boog en het stadsplein",
    locale: "nl",
    publishedAt: "2026-08-18",
    updatedAt: "2026-08-21",
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
    href: "/en/port-of-rotterdam",
    title: "The Port of Rotterdam, seen from the water",
    excerpt:
      "I drove a taxi in the Port of Rotterdam for seven years. What you see if you go and look, what you don't see, and why my thriller begins here.",
    category: "Rotterdam",
    image: "/images/blog/haven-rotterdam-hero.webp",
    imageAlt:
      "A row of container cranes along the quay in the Port of Rotterdam at blue hour",
    locale: "en",
    publishedAt: "2026-08-30",
  },
  {
    href: "/en/domburg",
    title: "Domburg: the seaside village behind Shadows over Domburg",
    excerpt:
      "Domburg through the eyes of thriller author Ard Breure: Zeeland's oldest seaside resort, and the setting of Shadows over Domburg.",
    category: "Zeeland",
    image: "/images/strandovergang-domburg-november.webp",
    imageAlt:
      "Beach access path between the dunes near Domburg under a grey November sky",
    locale: "en",
    publishedAt: "2026-08-21",
  },
  {
    href: "/en/cube-houses-rotterdam",
    title: "Cube Houses Rotterdam: why this city is the setting of my thrillers",
    excerpt:
      "Cube Houses Rotterdam through the eyes of thriller author Ard Breure: why this city is the setting of his thrillers.",
    category: "Rotterdam",
    image: "/images/kubuswoningen-rotterdam-exterior-hero.webp",
    imageAlt:
      "Cube Houses Rotterdam: yellow tilted Kubuswoningen by Piet Blom on Overblaak under a blue sky",
    locale: "en",
    publishedAt: "2026-08-19",
    updatedAt: "2026-08-21",
  },
  {
    href: "/en/markthal-rotterdam",
    title: "Markthal Rotterdam: the raw shine of a city full of stories",
    excerpt:
      "Markthal Rotterdam through the eyes of thriller author Ard Breure: the raw shine of a city full of stories, the setting of his series.",
    category: "Rotterdam",
    image: "/images/markthal-rotterdam-exterior-hero.webp",
    imageAlt:
      "Exterior of Markthal Rotterdam with its iconic arched glass facade and city plaza",
    locale: "en",
    publishedAt: "2026-08-18",
    updatedAt: "2026-08-21",
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
  de: "de-DE",
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
