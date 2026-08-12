import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BookCard } from "@/components/BookCard";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { getAllBooks } from "@/data/books";
import { buildMetadata, sitePageTitle } from "@/lib/seo";
import { breadcrumbSchema, buildJsonLd } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: sitePageTitle("Boeken"),
  description:
    "Ontdek de literaire thrillers van Breure Media. Nederlandse thrillers met psychologische diepgang, verzorgde taal en sfeervolle settings.",
  path: "/boeken",
  languages: {
    nl: "/boeken",
    en: "/en/books",
    "x-default": "/en/books",
  },
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Boeken", path: "/boeken" },
];

export default function BooksOverviewPage() {
  const books = getAllBooks();

  // Met één titel is een aparte overzichtspagina een overbodige tussenstap:
  // stuur bezoekers direct naar het boek. Zodra er een tweede titel bijkomt,
  // verschijnt het overzicht vanzelf weer (tijdelijke 307-redirect, geen
  // permanente die browsers/Google blijvend cachen).
  if (books.length === 1) {
    redirect(`/boeken/${books[0].slug}`);
  }

  const jsonLd = buildJsonLd(breadcrumbSchema(breadcrumbs));

  return (
    <main>
      <JsonLd data={jsonLd} />
      <PageHeader
        eyebrow="Catalogus"
        title="Boeken"
        description="Literaire thrillers van Breure Media — verhalen waarin spanning, taal en psychologie samenkomen."
      />
      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} />

        <section aria-labelledby="books-list-heading">
          <h2 id="books-list-heading" className="visually-hidden">
            Alle titels
          </h2>
          <div className="books-grid">
            {books.map((book) => (
              <BookCard key={book.slug} book={book} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
