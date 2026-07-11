import type { Metadata } from "next";
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
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Boeken", path: "/boeken" },
];

export default function BooksOverviewPage() {
  const books = getAllBooks();
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
