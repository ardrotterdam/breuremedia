/**
 * Central registry of indexable content pages with accurate lastmod dates.
 * Used by sitemap.ts so static and guide routes stay in sync with editorial updates.
 */
export type ChangeFrequency = "weekly" | "monthly" | "yearly";

export interface ContentPageEntry {
  path: string;
  /** ISO date YYYY-MM-DD — last substantive editorial update */
  lastModified: string;
  priority: number;
  changeFrequency: ChangeFrequency;
  /** When false, path is omitted from the sitemap (e.g. /boeken with one title). */
  include?: boolean;
}

export const contentPages: ContentPageEntry[] = [
  {
    path: "",
    lastModified: "2026-08-07",
    priority: 1,
    changeFrequency: "weekly",
  },
  {
    path: "/boeken",
    lastModified: "2026-08-07",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    path: "/e-readers",
    lastModified: "2026-08-11",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/blog",
    lastModified: "2026-08-18",
    priority: 0.8,
    changeFrequency: "weekly",
  },
  {
    path: "/markthal-rotterdam",
    lastModified: "2026-08-18",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "/kubuswoningen-rotterdam",
    lastModified: "2026-08-19",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "/lengte-van-ebook",
    lastModified: "2026-08-18",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/waterdichte-e-reader",
    lastModified: "2026-08-18",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/boeken-over-rotterdam",
    lastModified: "2026-08-18",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/boeken-over-zeeland",
    lastModified: "2026-08-18",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/over-de-auteur",
    lastModified: "2026-08-07",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/contact",
    lastModified: "2026-08-18",
    priority: 0.6,
    changeFrequency: "yearly",
  },
  {
    path: "/privacy",
    lastModified: "2026-08-18",
    priority: 0.3,
    changeFrequency: "yearly",
  },
  {
    path: "/affiliate",
    lastModified: "2026-08-18",
    priority: 0.3,
    changeFrequency: "yearly",
  },
];

export function parseContentDate(isoDate: string): Date {
  return new Date(`${isoDate}T12:00:00Z`);
}
