import type { Book, BookTranslation } from "@/data/books";
import { author, siteConfig } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function organizationSchema() {
  return {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.email,
  };
}

export function personSchema(jobTitle: string = "Auteur") {
  return {
    "@type": "Person",
    name: author.name,
    url: absoluteUrl("/over-de-auteur"),
    jobTitle,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
}

export function bookSchema(book: Book) {
  return {
    "@type": "Book",
    name: book.title,
    description: book.description,
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
    description: en.description,
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
    image: absoluteUrl(book.coverImage),
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

export function webSiteSchema() {
  return {
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
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
  description?: string
) {
  return {
    "@type": "CollectionPage",
    name,
    url,
    ...(description && { description }),
    inLanguage: siteConfig.language,
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
