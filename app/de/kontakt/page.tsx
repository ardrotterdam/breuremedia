import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { operator, siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { localeAlternates } from "@/lib/i18n";
import { breadcrumbSchema, buildJsonLd } from "@/lib/schema";

const pagePath = "/de/kontakt";

export const metadata: Metadata = buildMetadata({
  title: "Kontakt | Zeeland Krimi | Breure Media",
  description:
    "Schreiben Sie an Breure Media. Fragen zu Schatten über Domburg, zu Presse oder Zusammenarbeit. Antwort per E-Mail aus Rotterdam, Niederlande.",
  path: pagePath,
  locale: "de_DE",
  languages: localeAlternates(pagePath),
});

const breadcrumbs = [
  { name: "Home", path: "/de" },
  { name: "Kontakt", path: pagePath },
];

export default function GermanContactPage() {
  const jsonLd = buildJsonLd(breadcrumbSchema(breadcrumbs));

  return (
    <main lang="de">
      <JsonLd data={jsonLd} />
      <PageHeader
        eyebrow="Kontakt"
        title="Schreiben Sie uns"
        description="Fragen zum Buch, zur Presse oder zu einer Zusammenarbeit? Wir hören gern von Ihnen."
      />
      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} locale="de" />

        <p className="content-meta">
          <Link href="/contact" className="text-link">
            Niederländisch
          </Link>
          {" · "}
          <Link href="/en/contact" className="text-link">
            English
          </Link>
        </p>

        <section className="content-section" aria-labelledby="contact-info-heading">
          <h2 id="contact-info-heading" className="content-heading">
            Erreichbarkeit
          </h2>
          <p className="content-paragraph">
            {siteConfig.name} ist ein unabhängiges niederländisches
            Verlagslabel. Bei Fragen zu Veröffentlichungen, Bestellungen oder
            Presse erreichen Sie uns per E-Mail.
          </p>
          <p className="content-paragraph">
            <a href={`mailto:${siteConfig.email}`} className="text-link">
              {siteConfig.email}
            </a>
          </p>
          <p className="content-paragraph">Niederlande</p>
        </section>

        <section className="content-section" aria-labelledby="contact-topics-heading">
          <h2 id="contact-topics-heading" className="content-heading">
            Wobei können wir helfen?
          </h2>
          <ul className="theme-list">
            <li>Fragen zu Schatten über Domburg und zum Erscheinungstermin</li>
            <li>Presseanfragen und Interviewwünsche</li>
            <li>Zusammenarbeit und Vertrieb</li>
            <li>Allgemeine Fragen zu Breure Media</li>
          </ul>
        </section>

        <section className="content-section" aria-labelledby="contact-company-heading">
          <h2 id="contact-company-heading" className="content-heading">
            Angaben zum Unternehmen
          </h2>
          <p className="content-paragraph">
            {siteConfig.name} wird betrieben von {operator.legalName}.
          </p>
          <p className="content-paragraph">
            {operator.legalName}
            <br />
            {operator.streetAddress}
            <br />
            {operator.postalCode} {operator.city}
            <br />
            Niederlande
          </p>
          <p className="content-paragraph">KvK: {operator.kvk}</p>
          <p className="content-paragraph">
            E-Mail:{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
        </section>
      </div>
    </main>
  );
}
