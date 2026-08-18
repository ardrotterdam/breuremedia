import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { operator, siteConfig } from "@/lib/site";
import { buildMetadata, sitePageTitle } from "@/lib/seo";
import { breadcrumbSchema, buildJsonLd } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: sitePageTitle("Affiliate"),
  description:
    "Affiliate-informatie van Breure Media. Uitleg over affiliatelinks naar externe winkels zoals Amazon.",
  path: "/affiliate",
  languages: {
    nl: "/affiliate",
    en: "/en/affiliate",
    "x-default": "/en/affiliate",
  },
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Affiliate", path: "/affiliate" },
];

export default function AffiliatePage() {
  const jsonLd = buildJsonLd(breadcrumbSchema(breadcrumbs));

  return (
    <main>
      <JsonLd data={jsonLd} />
      <PageHeader
        eyebrow="Transparantie"
        title="Affiliate & samenwerking"
        description="Hoe affiliatelinks op Breure Media werken."
      />
      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} />

        <section className="content-section" aria-labelledby="affiliate-intro-heading">
          <h2 id="affiliate-intro-heading" className="content-heading">
            Redactionele inhoud
          </h2>
          <p className="content-paragraph">
            {siteConfig.name} publiceert redactionele inhoud over boeken,
            e-readers en aanverwant leeswerk: van eigen publicaties tot
            leeslijsten en koopgidsen.
          </p>
        </section>

        <section className="content-section" aria-labelledby="affiliate-links-heading">
          <h2 id="affiliate-links-heading" className="content-heading">
            Affiliatelinks
          </h2>
          <p className="content-paragraph">
            Sommige links op deze website zijn affiliatelinks. Die kunnen leiden
            naar externe winkels, zoals Amazon en in de toekomst mogelijk
            bol.com.
          </p>
          <p className="content-paragraph">
            Als u via een affiliatelink iets koopt, kan {siteConfig.name} een
            commissie ontvangen. U betaalt daar niets extra voor.
          </p>
          <p className="content-paragraph">
            Affiliaterelaties bepalen niet de redactionele mening of
            aanbeveling. {siteConfig.name} beveelt titels en producten aan
            omdat ze relevant zijn voor de inhoud en de lezer.
          </p>
        </section>

        <section className="content-section" aria-labelledby="affiliate-amazon-heading">
          <h2 id="affiliate-amazon-heading" className="content-heading">
            Amazon
          </h2>
          <p className="content-paragraph">
            Als Amazon-partner verdien ik aan aankopen die aan de voorwaarden
            voldoen. Dit kost u niets extra&apos;s.
          </p>
        </section>

        <section className="content-section" aria-labelledby="affiliate-operator-heading">
          <h2 id="affiliate-operator-heading" className="content-heading">
            Exploitant
          </h2>
          <p className="content-paragraph">
            {siteConfig.name} wordt geëxploiteerd door {operator.legalName}.
            KvK {operator.kvk}. {operator.streetAddress}, {operator.postalCode}{" "}
            {operator.city}.{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
        </section>
      </div>
    </main>
  );
}
