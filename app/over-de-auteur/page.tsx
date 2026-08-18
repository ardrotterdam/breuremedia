import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { author, siteConfig } from "@/lib/site";
import { buildMetadata, sitePageTitle } from "@/lib/seo";
import {
  breadcrumbSchema,
  buildJsonLd,
  personSchema,
} from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: sitePageTitle("Over de auteur"),
  description:
    "Lees meer over Ard Breure, auteur van Schaduwen over Domburg en oprichter van het literaire thrillerlabel Breure Media.",
  path: "/over-de-auteur",
  languages: {
    nl: "/over-de-auteur",
    en: "/en/about",
    "x-default": "/en/about",
  },
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Over de auteur", path: "/over-de-auteur" },
];

export default function AboutAuthorPage() {
  const jsonLd = buildJsonLd(
    personSchema(),
    breadcrumbSchema(breadcrumbs)
  );

  return (
    <main>
      <JsonLd data={jsonLd} />
      <PageHeader
        eyebrow="Auteur"
        title={author.name}
        description={author.shortBio}
      />
      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} />

        <section className="content-section" aria-labelledby="author-bio-heading">
          <h2 id="author-bio-heading" className="content-heading">
            Over de schrijver
          </h2>
          {author.bio.map((paragraph) => (
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
            {siteConfig.name} is een onafhankelijk Nederlands label voor
            literaire thrillers. Het richt zich op boeken waarin spanning,
            taal en psychologische diepgang samenkomen — verhalen die blijven
            nazinderen, lang nadat de laatste pagina is omgeslagen. Daarnaast
            verschijnen hier leeslijsten en gidsen over boeken, over plekken
            als Rotterdam en Zeeland, en over e-readers.
          </p>
          <p className="content-paragraph">
            Na het debuut <em>Schaduwen over Domburg</em> verschijnt met{" "}
            <em>Zero Day Directive</em> de tweede literaire techno-thriller
            onder dit label.
          </p>
        </section>

        <section className="content-section" aria-labelledby="author-books-heading">
          <h2 id="author-books-heading" className="content-heading">
            Publicaties
          </h2>
          <p className="content-paragraph">
            <Link href="/boeken/schaduwen-over-domburg">
              <em>Schaduwen over Domburg</em>
            </Link>{" "}
            — literaire thriller, verschijnt bij {siteConfig.name}.
          </p>
          <p className="content-paragraph">
            <Link href="/boeken/zero-day-directive">
              <em>Zero Day Directive</em>
            </Link>{" "}
            — cyberthriller / techno-thriller, verschijnt bij {siteConfig.name}.
          </p>
        </section>

        <aside className="author-accent author-accent--inline" aria-label="Motto">
          <blockquote>&ldquo;{siteConfig.motto}&rdquo;</blockquote>
        </aside>
      </div>
    </main>
  );
}
