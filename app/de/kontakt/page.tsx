import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { operator, siteConfig } from "@/lib/site";
import { buildMetadata, sitePageTitle } from "@/lib/seo";
import { DE_PLACEHOLDER, localeAlternates } from "@/lib/i18n";
import { breadcrumbSchema, buildJsonLd } from "@/lib/schema";

const pagePath = "/de/kontakt";

export const metadata: Metadata = buildMetadata({
  title: sitePageTitle("Kontakt"),
  description: DE_PLACEHOLDER,
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
        title="Kontakt"
        description={DE_PLACEHOLDER}
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
            Kontakt
          </h2>
          <p className="content-paragraph">{DE_PLACEHOLDER}</p>
          <p className="content-paragraph">
            <a href={`mailto:${siteConfig.email}`} className="text-link">
              {siteConfig.email}
            </a>
          </p>
          <p className="content-paragraph">Niederlande</p>
        </section>

        <section className="content-section" aria-labelledby="contact-topics-heading">
          <h2 id="contact-topics-heading" className="content-heading">
            {DE_PLACEHOLDER}
          </h2>
          <ul className="theme-list">
            <li>{DE_PLACEHOLDER}</li>
          </ul>
        </section>

        <section className="content-section" aria-labelledby="contact-company-heading">
          <h2 id="contact-company-heading" className="content-heading">
            {DE_PLACEHOLDER}
          </h2>
          <p className="content-paragraph">
            {siteConfig.name} · {operator.legalName}
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
          <p className="content-paragraph">
            KvK: {operator.kvk}
          </p>
          <p className="content-paragraph">
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
        </section>
      </div>
    </main>
  );
}
