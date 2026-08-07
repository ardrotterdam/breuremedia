/**
 * Central registry for published blog articles shown on /blog.
 * Article bodies live on their own pages; this file only holds hub metadata.
 */
export interface BlogPost {
  /** Absolute site path, e.g. "/waterdichte-e-reader" or "/blog/slug". */
  href: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  imageAlt: string;
  /** ISO date YYYY-MM-DD */
  publishedAt: string;
  /** ISO date YYYY-MM-DD when different from publishedAt */
  updatedAt?: string;
}

export const blogPosts: BlogPost[] = [
  {
    href: "/waterdichte-e-reader",
    title: "Beste waterdichte e-reader 2026: 4 modellen vergeleken",
    excerpt:
      "Welke e-reader kan mee in bad, naar het strand of zwembad? Vergelijk vier waterdichte modellen van Kobo en Kindle.",
    category: "E-readers",
    image: "/images/beste-waterdichte-e-reader-2026.webp",
    imageAlt:
      "Waterdichte e-reader naast een zwembad voor lezen op vakantie",
    publishedAt: "2026-08-07",
    updatedAt: "2026-08-07",
  },
];

export function getPublishedBlogPosts(): BlogPost[] {
  return blogPosts;
}

/** Dutch long date for article cards, e.g. "7 augustus 2026". */
export function formatBlogDate(isoDate: string): string {
  const date = new Date(`${isoDate}T12:00:00`);
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
