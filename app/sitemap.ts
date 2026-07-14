import type { MetadataRoute } from "next";
import { getAllBooks } from "@/data/books";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/boeken", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/e-readers", priority: 0.8, changeFrequency: "monthly" as const },
    {
      path: "/boeken-over-rotterdam",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/boeken-over-zeeland",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    { path: "/over-de-auteur", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const bookPages = getAllBooks().map((book) => ({
    url: `${siteConfig.url}/boeken/${book.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const staticEntries = staticPages.map((page) => ({
    url: `${siteConfig.url}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  return [...staticEntries, ...bookPages];
}
