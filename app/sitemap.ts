import type { MetadataRoute } from "next";
import { getAllBooks, getEnglishBooks } from "@/data/books";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // De /boeken-overzichtspagina stuurt bij één titel door naar dat boek, dus
  // die nemen we dan niet op in de sitemap. Bij twee of meer titels is het
  // weer een echte pagina en verschijnt hij vanzelf terug.
  const hasBookOverview = getAllBooks().length > 1;

  const staticPages = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    ...(hasBookOverview
      ? [{ path: "/boeken", priority: 0.9, changeFrequency: "weekly" as const }]
      : []),
    { path: "/e-readers", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
    {
      path: "/waterdichte-e-reader",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/waterdichte-e-reader",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
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

  // Dutch pages that have an English counterpart (for hreflang alternates).
  const staticTranslations: Record<string, string> = {
    "": "/en",
    "/over-de-auteur": "/en/about",
    "/contact": "/en/contact",
    "/privacy": "/en/privacy",
  };

  const englishStaticPages = [
    { path: "/en", nl: "", priority: 0.9, changeFrequency: "weekly" as const },
    {
      path: "/en/about",
      nl: "/over-de-auteur",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/en/contact",
      nl: "/contact",
      priority: 0.5,
      changeFrequency: "yearly" as const,
    },
    {
      path: "/en/privacy",
      nl: "/privacy",
      priority: 0.3,
      changeFrequency: "yearly" as const,
    },
  ];

  const bookPages = getAllBooks().map((book) => ({
    url: `${siteConfig.url}/boeken/${book.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
    ...(book.en && {
      alternates: {
        languages: {
          nl: `${siteConfig.url}/boeken/${book.slug}`,
          en: `${siteConfig.url}/en/${book.en.slug}`,
        },
      },
    }),
  }));

  const englishBookPages = getEnglishBooks().map((book) => ({
    url: `${siteConfig.url}/en/${book.en.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
    alternates: {
      languages: {
        nl: `${siteConfig.url}/boeken/${book.slug}`,
        en: `${siteConfig.url}/en/${book.en.slug}`,
      },
    },
  }));

  const staticEntries = staticPages.map((page) => {
    const enPath = staticTranslations[page.path];
    return {
      url: `${siteConfig.url}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      ...(enPath && {
        alternates: {
          languages: {
            nl: `${siteConfig.url}${page.path}`,
            en: `${siteConfig.url}${enPath}`,
          },
        },
      }),
    };
  });

  const englishStaticEntries = englishStaticPages.map((page) => ({
    url: `${siteConfig.url}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
    alternates: {
      languages: {
        nl: `${siteConfig.url}${page.nl}`,
        en: `${siteConfig.url}${page.path}`,
      },
    },
  }));

  return [
    ...staticEntries,
    ...bookPages,
    ...englishBookPages,
    ...englishStaticEntries,
  ];
}
