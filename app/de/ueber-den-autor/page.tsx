import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { getAllBooks } from "@/data/books";
import { author, siteConfig, authorDe, siteDe } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { localeAlternates } from "@/lib/i18n";
import { breadcrumbSchema, buildJsonLd, personSchema } from "@/lib/schema";

const pagePath = "/de/ueber-den-autor";

export const metadata: Metadata = buildMetadata({
  title: "Ard Breure | Autor | Zeeland Krimi",
  description:
    "Ard Breure wuchs in Zeeland auf und lebt in Rotterdam. Autor von Schatten über Domburg, einem literarischen Thriller an der zeeländischen Küste.",
  path: pagePath,
  locale: "de_DE",
  languages: localeAlternates(pagePath),
});

const breadcrumbs = [
  { name: "Home", path: "/de" },
  { name: "Über den Autor", path: pagePath },
];

export default function GermanAboutPage() {
  const jsonLd = buildJsonLd(
    personSchema("Autor", "de"),
    breadcrumbSchema(breadcrumbs)
  );

  return (
    <main lang="de">
      <JsonLd data={jsonLd} />
      <PageHeader
        eyebrow="Autor"
        title={author.name}
        description={authorDe.shortBio}
      />
      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} locale="de" />

        <p className="content-meta">
          <Link href="/over-de-auteur" className="text-link">
            Niederländisch
          </Link>
          {" · "}
          <Link href="/en/about" className="text-link">
            English
          </Link>
        </p>

        <section className="content-section" aria-labelledby="author-bio-heading">
          <h2 id="author-bio-heading" className="content-heading">
            Über den Autor
          </h2>
          {authorDe.bio.map((paragraph) => (
            <p key={paragraph} className="content-paragraph">
              {paragraph}
            </p>
          ))}
        </section>

        <section className="content-section" aria-labelledby="author-label-heading">
          <h2 id="author-label-heading" className="content-heading">
            {siteConfig.name}
          </h2>
          <p className="content-paragraph">
            {siteConfig.name} ist ein unabhängiges niederländisches Label für
            literarische Thriller. Hier kommen Spannung, Sprache und
            psychologische Tiefe zusammen: Geschichten, die nachklingen, lange
            nachdem die letzte Seite umgeschlagen ist. Die zeeländische Küste
            und der Rotterdamer Hafen gehören zu diesem Werk dazu.
          </p>
          <p className="content-paragraph">
            Nach dem Debüt <em>Schatten über Domburg</em> erscheinen unter diesem
            Label die Titel unten. Wo noch keine deutsche Ausgabe besteht, führt
            der Link zur englischen Seite.
          </p>
        </section>

        <section className="content-section" aria-labelledby="author-books-heading">
          <h2 id="author-books-heading" className="content-heading">
            Veröffentlichungen
          </h2>
          {getAllBooks().map((book) => {
            const href = book.de
              ? `/de/${book.de.slug}`
              : book.en
                ? `/en/${book.en.slug}`
                : `/boeken/${book.slug}`;
            const title = book.de?.title ?? book.en?.title ?? book.title;
            const genre = book.de?.genre ?? book.en?.genre ?? book.genre;

            return (
              <p key={book.slug} className="content-paragraph">
                <Link href={href}>
                  <em>{title}</em>
                </Link>
                : {genre.toLowerCase()}, erscheint bei {siteConfig.name}.
              </p>
            );
          })}
        </section>

        <aside className="author-accent author-accent--inline" aria-label="Motto">
          <blockquote>&ldquo;{siteDe.motto}&rdquo;</blockquote>
        </aside>
      </div>
    </main>
  );
}
