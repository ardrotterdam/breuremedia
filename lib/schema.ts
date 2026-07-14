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
}

export function itemListSchema(name: string, items: ItemListEntry[]) {
  return {
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Thing",
        name: item.name,
        url: item.url,
        ...(item.description && { description: item.description }),
      },
    })),
  };
}

export function affiliateBookSchema(book: {
  name: string;
  author?: string;
  editor?: string;
  description: string;
  isbn?: string;
  datePublished?: string;
  url: string;
  publisher?: string;
  bookFormat?: string;
  genre?: string;
  image?: string;
}) {
  const bookFormat = book.bookFormat
    ? book.bookFormat.startsWith("http")
      ? book.bookFormat
      : `https://schema.org/${book.bookFormat}`
    : undefined;

  return {
    "@type": "Book",
    name: book.name,
    ...(book.author && {
      author: {
        "@type": "Person",
        name: book.author,
      },
    }),
    ...(book.editor && {
      editor: {
        "@type": "Person",
        name: book.editor,
      },
    }),
    description: book.description,
    ...(book.genre && { genre: book.genre }),
    ...(book.isbn && { isbn: book.isbn }),
    ...(book.datePublished && { datePublished: book.datePublished }),
    inLanguage: "nl",
    url: book.url,
    ...(book.image && { image: absoluteUrl(book.image) }),
    ...(book.publisher && {
      publisher: {
        "@type": "Organization",
        name: book.publisher,
      },
    }),
    ...(bookFormat && { bookFormat }),
    offers: {
      "@type": "Offer",
      url: book.url,
      availability: "https://schema.org/InStock",
    },
  };
}

export function productBasicSchema(
  name: string,
  brand: string,
  description: string
) {
  return {
    "@type": "Product",
    name,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    description,
  };
}

export function buildJsonLd(...schemas: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": schemas,
  };
}
