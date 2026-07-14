import type { Book } from "@/data/books";
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

export function personSchema() {
  return {
    "@type": "Person",
    name: author.name,
    url: absoluteUrl("/over-de-auteur"),
    jobTitle: "Auteur",
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
  editor?: string;
  image?: string;
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
      ...(item.author && {
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
    };
  }

  return {
    "@type": "Thing",
    name: item.name,
    url: item.url,
    ...(item.description && { description: item.description }),
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

export function productBasicSchema(
  name: string,
  brand: string,
  description: string,
  price: string,
  url: string
) {
  return {
    "@type": "Product",
    name,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    description,
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url,
    },
  };
}

export function buildJsonLd(...schemas: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": schemas,
  };
}
