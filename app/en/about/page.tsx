import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { author, siteConfig, authorEn } from "@/lib/site";
import { buildMetadata, sitePageTitle } from "@/lib/seo";
import { breadcrumbSchema, buildJsonLd, personSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: sitePageTitle("About the author"),
  description:
    "About Ard Breure, author of Shadows over Domburg and founder of the literary thriller imprint Breure Media.",
  path: "/en/about",
  locale: "en_US",
  languages: {
    nl: "/over-de-auteur",
    en: "/en/about",
    "x-default": "/en/about",
  },
});

const breadcrumbs = [
  { name: "Home", path: "/en" },
  { name: "About the author", path: "/en/about" },
];

export default function EnglishAboutPage() {
  const jsonLd = buildJsonLd(
    personSchema("Author"),
    breadcrumbSchema(breadcrumbs)
  );

  return (
    <main lang="en">
      <JsonLd data={jsonLd} />
      <PageHeader
        eyebrow="Author"
        title={author.name}
        description={authorEn.shortBio}
      />
      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} />

        <p className="content-meta">
          <Link href="/over-de-auteur" className="text-link">
            Lees deze pagina in het Nederlands
          </Link>
        </p>

        <section className="content-section" aria-labelledby="author-bio-heading">
          <h2 id="author-bio-heading" className="content-heading">
            About the writer
          </h2>
          {authorEn.bio.map((paragraph) => (
            <p key={paragraph} className="content-paragraph">
              {paragraph}
            </p>
          ))}
        </section>

        <section className="content-section" aria-labelledby="author-label-heading">
          <h2 id="author-label-heading" className="content-heading">
            Breure Media
          </h2>
          <p className="content-paragraph">
            {siteConfig.name} is an independent Dutch imprint for literary
            thrillers. It focuses on books where suspense, language and
            psychological depth come together — stories that keep resonating
            long after the final page.
          </p>
          <p className="content-paragraph">
            Following the debut novel <em>Shadows over Domburg</em>,{" "}
            <em>Zero Day Directive</em> marks the second high-stakes
            techno-thriller released under this imprint.
          </p>
        </section>

        <section className="content-section" aria-labelledby="author-books-heading">
          <h2 id="author-books-heading" className="content-heading">
            Publications
          </h2>
          <p className="content-paragraph">
            <Link href="/en/shadows-over-domburg">
              <em>Shadows over Domburg</em>
            </Link>{" "}
            — literary thriller, published by {siteConfig.name}.
          </p>
          <p className="content-paragraph">
            <Link href="/en/zero-day-directive">
              <em>Zero Day Directive</em>
            </Link>{" "}
            — high-stakes cyber thriller, published by {siteConfig.name}.
          </p>
        </section>

        <aside className="author-accent author-accent--inline" aria-label="Motto">
          <blockquote>&ldquo;Stories that break the silence.&rdquo;</blockquote>
        </aside>
      </div>
    </main>
  );
}
