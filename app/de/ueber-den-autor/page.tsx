import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { author, siteConfig, authorDe } from "@/lib/site";
import { buildMetadata, sitePageTitle } from "@/lib/seo";
import { DE_PLACEHOLDER, localeAlternates } from "@/lib/i18n";
import { breadcrumbSchema, buildJsonLd, personSchema } from "@/lib/schema";

const pagePath = "/de/ueber-den-autor";

export const metadata: Metadata = buildMetadata({
  title: sitePageTitle("Über den Autor"),
  description: authorDe.shortBio,
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
        eyebrow="Über den Autor"
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
          <p className="content-paragraph">{DE_PLACEHOLDER}</p>
        </section>

        <section className="content-section" aria-labelledby="author-books-heading">
          <h2 id="author-books-heading" className="content-heading">
            Bücher
          </h2>
          <p className="content-paragraph">
            <Link href="/de/schatten-ueber-domburg">
              <em>{DE_PLACEHOLDER}</em>
            </Link>{" "}
            — {siteConfig.name}.
          </p>
        </section>

        <aside className="author-accent author-accent--inline" aria-label="Motto">
          <blockquote>&ldquo;{DE_PLACEHOLDER}&rdquo;</blockquote>
        </aside>
      </div>
    </main>
  );
}
