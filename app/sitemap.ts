import type { MetadataRoute } from "next";
import { getAllBooks, getEnglishBooks, getGermanBooks } from "@/data/books";
import {
  contentPages,
  parseContentDate,
  type ContentPageEntry,
} from "@/data/content-pages";
import { getPublishedBlogPosts } from "@/data/blog";
import { localePaths, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

function toAbs(path: string): string {
  if (path === "" || path === "/") {
    return siteConfig.url;
  }
  return `${siteConfig.url}${path}`;
}

function sitemapLanguageAlternates(
  path: string
): MetadataRoute.Sitemap[number]["alternates"] | undefined {
  const paths = localePaths(path === "" ? "/" : path);
  if (!paths) {
    return undefined;
  }

  const languages: Record<string, string> = {};
  for (const locale of ["nl", "en", "de"] as const satisfies readonly Locale[]) {
    const href = paths[locale];
    if (href) {
      languages[locale] = toAbs(href);
    }
  }

  if (Object.keys(languages).length === 0) {
    return undefined;
  }

  return { languages };
}

function toSitemapEntry(
  page: ContentPageEntry,
  options?: {
    alternates?: MetadataRoute.Sitemap[number]["alternates"];
  }
): MetadataRoute.Sitemap[number] {
  return {
    url: toAbs(page.path),
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
      lastModified: "2026-08-26",
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
    {
      path: "/en/for-authors",
      lastModified: "2026-08-29",
      priority: 0.5,
      changeFrequency: "monthly",
    },
  ];

  const germanStaticPages: ContentPageEntry[] = [
    {
      path: "/de",
      lastModified: "2026-08-23",
      priority: 0.9,
      changeFrequency: "weekly",
    },
    {
      path: "/de/domburg",
      lastModified: "2026-08-23",
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      path: "/de/ueber-den-autor",
      lastModified: "2026-08-23",
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      path: "/de/kontakt",
      lastModified: "2026-08-23",
      priority: 0.5,
      changeFrequency: "yearly",
    },
    {
      path: "/de/datenschutz",
      lastModified: "2026-08-26",
      priority: 0.3,
      changeFrequency: "yearly",
    },
    {
      path: "/de/fuer-autoren",
      lastModified: "2026-08-29",
      priority: 0.5,
      changeFrequency: "monthly",
    },
  ];

  const staticEntries = contentPages
    .filter((page) => {
      if (page.path === "/boeken" && !hasBookOverview) {
        return false;
      }
      return page.include !== false;
    })
    .map((page) =>
      toSitemapEntry(page, {
        alternates: sitemapLanguageAlternates(page.path),
      })
    );

  // Blog posts that are not already covered by static NL/EN/DE page lists.
  const contentPaths = new Set([
    ...contentPages.map((page) => page.path),
    ...englishStaticPages.map((page) => page.path),
    ...germanStaticPages.map((page) => page.path),
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

  const bookPages = getAllBooks().map((book) => {
    const languages: Record<string, string> = {
      nl: toAbs(`/boeken/${book.slug}`),
    };
    if (book.en) {
      languages.en = toAbs(`/en/${book.en.slug}`);
    }
    if (book.de) {
      languages.de = toAbs(`/de/${book.de.slug}`);
    }
    return {
      url: toAbs(`/boeken/${book.slug}`),
      lastModified: parseContentDate(book.published ?? "2026-08-07"),
      changeFrequency: "monthly" as const,
      priority: 0.9,
      ...(Object.keys(languages).length > 1 && {
        alternates: { languages },
      }),
    };
  });

  const englishBookPages = getEnglishBooks().map((book) => {
    const languages: Record<string, string> = {
      nl: toAbs(`/boeken/${book.slug}`),
      en: toAbs(`/en/${book.en.slug}`),
    };
    if (book.de) {
      languages.de = toAbs(`/de/${book.de.slug}`);
    }
    return {
      url: toAbs(`/en/${book.en.slug}`),
      lastModified: parseContentDate(book.published ?? "2026-08-07"),
      changeFrequency: "monthly" as const,
      priority: 0.9,
      alternates: { languages },
    };
  });

  const germanBookPages = getGermanBooks().map((book) => {
    const languages: Record<string, string> = {
      nl: toAbs(`/boeken/${book.slug}`),
      de: toAbs(`/de/${book.de.slug}`),
    };
    if (book.en) {
      languages.en = toAbs(`/en/${book.en.slug}`);
    }
    return {
      url: toAbs(`/de/${book.de.slug}`),
      lastModified: parseContentDate(book.published ?? "2026-08-07"),
      changeFrequency: "monthly" as const,
      priority: 0.9,
      alternates: { languages },
    };
  });

  const englishStaticEntries = englishStaticPages.map((page) =>
    toSitemapEntry(page, {
      alternates: sitemapLanguageAlternates(page.path),
    })
  );

  const germanStaticEntries = germanStaticPages.map((page) =>
    toSitemapEntry(page, {
      alternates: sitemapLanguageAlternates(page.path),
    })
  );

  return [
    ...staticEntries,
    ...blogEntries,
    ...bookPages,
    ...englishBookPages,
    ...germanBookPages,
    ...englishStaticEntries,
    ...germanStaticEntries,
  ];
}
