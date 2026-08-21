import type { MetadataRoute } from "next";
import { getAllBooks, getEnglishBooks } from "@/data/books";
import {
  contentPages,
  parseContentDate,
  type ContentPageEntry,
} from "@/data/content-pages";
import { getPublishedBlogPosts } from "@/data/blog";
import { siteConfig } from "@/lib/site";

function toSitemapEntry(
  page: ContentPageEntry,
  options?: {
    alternates?: MetadataRoute.Sitemap[number]["alternates"];
  }
): MetadataRoute.Sitemap[number] {
  return {
    url: `${siteConfig.url}${page.path}`,
    lastModified: parseContentDate(page.lastModified),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
    ...(options?.alternates && { alternates: options.alternates }),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  // De /boeken-overzichtspagina stuurt bij één titel door naar dat boek, dus
  // die nemen we dan niet op in de sitemap. Bij twee of meer titels is het
  // weer een echte pagina en verschijnt hij vanzelf terug.
  const hasBookOverview = getAllBooks().length > 1;

  const staticTranslations: Record<string, string> = {
    "": "/en",
    "/boeken": "/en/books",
    "/e-readers": "/en/e-readers",
    "/blog": "/en/blog",
    "/over-de-auteur": "/en/about",
    "/contact": "/en/contact",
    "/privacy": "/en/privacy",
    "/affiliate": "/en/affiliate",
    "/markthal-rotterdam": "/en/markthal-rotterdam",
    "/kubuswoningen-rotterdam": "/en/cube-houses-rotterdam",
    "/domburg": "/en/domburg",
  };

  const englishStaticPages: ContentPageEntry[] = [
    {
      path: "/en",
      lastModified: "2026-08-07",
      priority: 0.9,
      changeFrequency: "weekly",
    },
    {
      path: "/en/books",
      lastModified: "2026-08-12",
      priority: 0.8,
      changeFrequency: "weekly",
    },
    {
      path: "/en/e-readers",
      lastModified: "2026-08-12",
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      path: "/en/blog",
      lastModified: "2026-08-21",
      priority: 0.8,
      changeFrequency: "weekly",
    },
    {
      path: "/en/about",
      lastModified: "2026-08-07",
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      path: "/en/contact",
      lastModified: "2026-08-18",
      priority: 0.5,
      changeFrequency: "yearly",
    },
    {
      path: "/en/privacy",
      lastModified: "2026-08-18",
      priority: 0.3,
      changeFrequency: "yearly",
    },
    {
      path: "/en/affiliate",
      lastModified: "2026-08-18",
      priority: 0.3,
      changeFrequency: "yearly",
    },
    {
      path: "/en/markthal-rotterdam",
      lastModified: "2026-08-21",
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      path: "/en/cube-houses-rotterdam",
      lastModified: "2026-08-21",
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      path: "/en/domburg",
      lastModified: "2026-08-21",
      priority: 0.7,
      changeFrequency: "monthly",
    },
  ];

  const englishNlPath: Record<string, string> = {
    "/en": "",
    "/en/books": "/boeken",
    "/en/e-readers": "/e-readers",
    "/en/blog": "/blog",
    "/en/about": "/over-de-auteur",
    "/en/contact": "/contact",
    "/en/privacy": "/privacy",
    "/en/affiliate": "/affiliate",
    "/en/markthal-rotterdam": "/markthal-rotterdam",
    "/en/cube-houses-rotterdam": "/kubuswoningen-rotterdam",
    "/en/domburg": "/domburg",
  };

  const staticEntries = contentPages
    .filter((page) => {
      if (page.path === "/boeken" && !hasBookOverview) {
        return false;
      }
      return page.include !== false;
    })
    .map((page) => {
      const enPath = staticTranslations[page.path];
      return toSitemapEntry(page, {
        ...(enPath && {
          alternates: {
            languages: {
              nl: `${siteConfig.url}${page.path}`,
              en: `${siteConfig.url}${enPath}`,
            },
          },
        }),
      });
    });

  // Blog posts that are not already covered by static NL/EN page lists.
  const contentPaths = new Set([
    ...contentPages.map((page) => page.path),
    ...englishStaticPages.map((page) => page.path),
  ]);
  const blogEntries = getPublishedBlogPosts()
    .filter((post) => !contentPaths.has(post.href))
    .map((post) =>
      toSitemapEntry({
        path: post.href,
        lastModified: post.updatedAt ?? post.publishedAt,
        priority: 0.7,
        changeFrequency: "monthly",
      })
    );

  const bookPages = getAllBooks().map((book) => ({
    url: `${siteConfig.url}/boeken/${book.slug}`,
    lastModified: parseContentDate(book.published ?? "2026-08-07"),
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
    lastModified: parseContentDate(book.published ?? "2026-08-07"),
    changeFrequency: "monthly" as const,
    priority: 0.9,
    alternates: {
      languages: {
        nl: `${siteConfig.url}/boeken/${book.slug}`,
        en: `${siteConfig.url}/en/${book.en.slug}`,
      },
    },
  }));

  const englishStaticEntries = englishStaticPages.map((page) => {
    const nlPath = englishNlPath[page.path];
    return toSitemapEntry(
      page,
      nlPath === undefined
        ? undefined
        : {
            alternates: {
              languages: {
                nl: `${siteConfig.url}${nlPath}`,
                en: `${siteConfig.url}${page.path}`,
              },
            },
          }
    );
  });

  return [
    ...staticEntries,
    ...blogEntries,
    ...bookPages,
    ...englishBookPages,
    ...englishStaticEntries,
  ];
}
