import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { operator, siteConfig } from "@/lib/site";
import { buildMetadata, sitePageTitle } from "@/lib/seo";
import { breadcrumbSchema, buildJsonLd } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: sitePageTitle("Contact"),
  description:
    "Neem contact op met Breure Media voor vragen over Schaduwen over Domburg, persaanvragen of samenwerking.",
  path: "/contact",
  languages: {
    nl: "/contact",
    en: "/en/contact",
    "x-default": "/en/contact",
  },
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function ContactPage() {
  const jsonLd = buildJsonLd(breadcrumbSchema(breadcrumbs));

  return (
    <main>
      <JsonLd data={jsonLd} />
      <PageHeader
        eyebrow="Contact"
        title="Neem contact op"
        description="Vragen over het boek, persaanvragen of samenwerking? We horen graag van u."
      />
      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} />

        <section className="content-section" aria-labelledby="contact-info-heading">
          <h2 id="contact-info-heading" className="content-heading">
            Bereikbaarheid
          </h2>
          <p className="content-paragraph">
            {siteConfig.name} is een onafhankelijk Nederlands uitgeverslabel.
            Voor vragen over publicaties, bestellingen of persaanvragen kunt u
            ons bereiken via e-mail.
          </p>
          <p className="content-paragraph">
            <a href={`mailto:${siteConfig.email}`} className="text-link">
              {siteConfig.email}
            </a>
          </p>
          <p className="content-paragraph">{siteConfig.country}</p>
        </section>

        <section className="content-section" aria-labelledby="contact-topics-heading">
          <h2 id="contact-topics-heading" className="content-heading">
            Waar kunnen we mee helpen?
          </h2>
          <ul className="theme-list">
            <li>Vragen over Schaduwen over Domburg en de verschijningsdatum</li>
            <li>Persaanvragen en interviewverzoeken</li>
            <li>Samenwerking en distributie</li>
            <li>Algemene vragen over Breure Media</li>
          </ul>
        </section>

        <section className="content-section" aria-labelledby="contact-company-heading">
          <h2 id="contact-company-heading" className="content-heading">
            Bedrijfsgegevens
          </h2>
          <p className="content-paragraph">
            {siteConfig.name} wordt geëxploiteerd door {operator.legalName}.
          </p>
          <p className="content-paragraph">
            {operator.legalName}
            <br />
            {operator.streetAddress}
            <br />
            {operator.postalCode} {operator.city}
            <br />
            {operator.country}
          </p>
          <p className="content-paragraph">KvK: {operator.kvk}</p>
          <p className="content-paragraph">
            E-mail:{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
        </section>
      </div>
    </main>
  );
}
