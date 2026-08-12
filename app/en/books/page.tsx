import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BookCard } from "@/components/BookCard";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { getEnglishBooks, type Book } from "@/data/books";
import { buildMetadata, sitePageTitle } from "@/lib/seo";
import { breadcrumbSchema, buildJsonLd } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: sitePageTitle("Books"),
  description:
    "Literary thrillers from Breure Media — Dutch stories with psychological depth, careful prose and atmospheric settings.",
  path: "/en/books",
  locale: "en_US",
  languages: {
    nl: "/boeken",
    en: "/en/books",
    "x-default": "/en/books",
  },
});

const breadcrumbs = [
  { name: "Home", path: "/en" },
  { name: "Books", path: "/en/books" },
];

export default function EnglishBooksOverviewPage() {
  const books = getEnglishBooks().map((book): Book & { href: string } => {
    const en = book.en;
    return {
      ...book,
      title: en.title,
      subtitle: en.subtitle,
      tagline: en.tagline,
      description: en.description,
      longDescription: en.longDescription,
      coverImage: en.coverImage ?? book.coverImage,
      coverAlt: en.coverAlt,
      formatNote: en.formatNote,
      priceFormatted: "€29.95",
      href: `/en/${en.slug}`,
    };
  });

  const jsonLd = buildJsonLd(breadcrumbSchema(breadcrumbs));

  return (
    <main lang="en">
      <JsonLd data={jsonLd} />
      <PageHeader
        eyebrow="Catalogue"
        title="Books"
        description="Literary thrillers from Breure Media — stories where suspense, language and psychology meet."
      />
      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} />

        <section aria-labelledby="books-list-heading">
          <h2 id="books-list-heading" className="visually-hidden">
            All titles
          </h2>
          <div className="books-grid">
            {books.map((book) => (
              <BookCard key={book.href} book={book} href={book.href} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
