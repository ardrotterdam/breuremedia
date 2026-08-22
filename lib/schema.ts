import type { Book, BookTranslation } from "@/data/books";
import { author, operator, siteConfig, siteDe, siteEn } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function organizationSchema() {
  return {
    "@type": "Organization",
    name: siteConfig.name,
    legalName: operator.legalName,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.email,
  };
}

const aboutPaths: Record<Locale, string> = {
  nl: "/over-de-auteur",
  en: "/en/about",
  de: "/de/ueber-den-autor",
};

const siteDescriptions: Record<Locale, string> = {
  nl: siteConfig.description,
  en: siteEn.description,
  de: siteDe.description,
};

export function personSchema(
  jobTitle: string = "Auteur",
  locale: Locale = "nl"
) {
  return {
    "@type": "Person",
    name: author.name,
    url: absoluteUrl(aboutPaths[locale]),
    jobTitle,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
}

export function bookSchema(book: Book) {
  // Use the Dutch long description for the Dutch Book schema (inLanguage: nl).
  const schemaDescription =
    book.longDescription.join(" ") || book.description;

  return {
    "@type": "Book",
    name: book.title,
    description: schemaDescription,
    inLanguage: book.language,
    genre: book.genre,
    bookFormat: "https://schema.org/Paperback",
    author: {
      "@type": "Person",
      name: book.author,
      url: absoluteUrl("/over-de-auteur"),
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    image: absoluteUrl(book.coverImage),
    url: absoluteUrl(`/boeken/${book.slug}`),
    ...(book.isbn && { isbn: book.isbn }),
    offers: {
      "@type": "Offer",
      price: book.price.toFixed(2),
      priceCurrency: book.currency,
      availability: "https://schema.org/PreOrder",
      url: absoluteUrl(`/boeken/${book.slug}`),
    },
  };
}

/**
 * Book schema for the English edition. Shares the commercial fields with the
 * Dutch book but uses the English title/description, inLanguage "en" and the
 * /en URL, and links the Dutch edition via workTranslation.
 */
export function englishBookSchema(book: Book & { en: BookTranslation }) {
  const en = book.en;
  const enUrl = absoluteUrl(`/en/${en.slug}`);

  return {
    "@type": "Book",
    name: en.title,
    description: en.longDescription.join(" ") || en.description,
    inLanguage: "en",
    genre: en.genre,
    bookFormat: "https://schema.org/Paperback",
    author: {
      "@type": "Person",
      name: book.author,
      url: absoluteUrl("/over-de-auteur"),
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    image: absoluteUrl(en.coverImage ?? book.coverImage),
    url: enUrl,
    workExample: {
      "@type": "Book",
      name: book.title,
      inLanguage: book.language,
      url: absoluteUrl(`/boeken/${book.slug}`),
    },
    ...(book.isbn && { isbn: book.isbn }),
    offers: {
      "@type": "Offer",
      price: book.price.toFixed(2),
      priceCurrency: book.currency,
      availability: "https://schema.org/PreOrder",
      url: enUrl,
    },
  };
}

/**
 * Book schema for the German edition. Shares commercial fields with the
 * Dutch book but uses the German title/description, inLanguage "de" and the
 * /de URL, and links the Dutch edition via workExample.
 */
export function germanBookSchema(book: Book & { de: BookTranslation }) {
  const de = book.de;
  const deUrl = absoluteUrl(`/de/${de.slug}`);

  return {
    "@type": "Book",
    name: de.title,
    description: de.longDescription.join(" ") || de.description,
    inLanguage: "de",
    genre: de.genre,
    bookFormat: "https://schema.org/Paperback",
    author: {
      "@type": "Person",
      name: book.author,
      url: absoluteUrl(aboutPaths.de),
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    image: absoluteUrl(de.coverImage ?? book.coverImage),
    url: deUrl,
    workExample: {
      "@type": "Book",
      name: book.title,
      inLanguage: book.language,
      url: absoluteUrl(`/boeken/${book.slug}`),
    },
    ...(book.isbn && { isbn: book.isbn }),
    offers: {
      "@type": "Offer",
      price: book.price.toFixed(2),
      priceCurrency: book.currency,
      availability: "https://schema.org/PreOrder",
      url: deUrl,
    },
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faq: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function webSiteSchema(locale: Locale = "nl") {
  return {
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteDescriptions[locale],
    inLanguage: locale,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
}

export interface ItemListEntry {
  name: string;
  url: string;
  description?: string;
  author?: string;
  authors?: string[];
  editor?: string;
  image?: string;
  publisher?: string;
  datePublished?: string;
  numberOfPages?: number;
  bookFormat?: string;
  inLanguage?: string;
}

export interface ItemListSchemaOptions {
  itemType?: "Book" | "Thing";
}

function itemListItemSchema(
  item: ItemListEntry,
  itemType: "Book" | "Thing"
) {
  if (itemType === "Book") {
    return {
      "@type": "Book",
      name: item.name,
      url: item.url,
      ...(item.description && { description: item.description }),
      ...(item.image && { image: absoluteUrl(item.image) }),
      ...(item.authors && item.authors.length > 0
        ? {
            author: item.authors.map((name) => ({
              "@type": "Person",
              name,
            })),
          }
        : item.author && {
            author: {
              "@type": "Person",
              name: item.author,
            },
          }),
      ...(item.editor && {
        editor: {
          "@type": "Person",
          name: item.editor,
        },
      }),
      ...(item.publisher && {
        publisher: {
          "@type": "Organization",
          name: item.publisher,
        },
      }),
      ...(item.datePublished && { datePublished: item.datePublished }),
      ...(item.numberOfPages && { numberOfPages: item.numberOfPages }),
      ...(item.bookFormat && { bookFormat: item.bookFormat }),
      ...(item.inLanguage && { inLanguage: item.inLanguage }),
    };
  }

  return {
    "@type": "Thing",
    name: item.name,
    url: item.url,
    ...(item.description && { description: item.description }),
    ...(item.image && { image: absoluteUrl(item.image) }),
    ...(item.datePublished && { datePublished: item.datePublished }),
  };
}

export function collectionPageSchema(
  name: string,
  url: string,
  description?: string,
  inLanguage: string = siteConfig.language
) {
  return {
    "@type": "CollectionPage",
    name,
    url,
    ...(description && { description }),
    inLanguage,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function itemListSchema(
  name: string,
  items: ItemListEntry[],
  options?: ItemListSchemaOptions
) {
  const itemType = options?.itemType ?? "Thing";

  return {
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: itemListItemSchema(item, itemType),
    })),
  };
}

export function buildJsonLd(...schemas: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": schemas,
  };
}
