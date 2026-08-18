import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { operator, siteConfig } from "@/lib/site";
import { buildMetadata, sitePageTitle } from "@/lib/seo";
import { breadcrumbSchema, buildJsonLd } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: sitePageTitle("Affiliate disclosure"),
  description:
    "Affiliate disclosure for Breure Media. How affiliate links to external retailers such as Amazon work.",
  path: "/en/affiliate",
  locale: "en_US",
  languages: {
    nl: "/affiliate",
    en: "/en/affiliate",
    "x-default": "/en/affiliate",
  },
});

const breadcrumbs = [
  { name: "Home", path: "/en" },
  { name: "Affiliate disclosure", path: "/en/affiliate" },
];

export default function EnglishAffiliatePage() {
  const jsonLd = buildJsonLd(breadcrumbSchema(breadcrumbs));

  return (
    <main lang="en">
      <JsonLd data={jsonLd} />
      <PageHeader
        eyebrow="Transparency"
        title="Affiliate disclosure"
        description="How affiliate links on Breure Media work."
      />
      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} />

        <p className="content-meta">
          <Link href="/affiliate" className="text-link">
            Lees deze pagina in het Nederlands
          </Link>
        </p>

        <section className="content-section" aria-labelledby="affiliate-intro-heading">
          <h2 id="affiliate-intro-heading" className="content-heading">
            Editorial content
          </h2>
          <p className="content-paragraph">
            {siteConfig.name} publishes editorial content about books,
            e-readers and related reading — from its own publications to reading
            lists and buying guides.
          </p>
        </section>

        <section className="content-section" aria-labelledby="affiliate-links-heading">
          <h2 id="affiliate-links-heading" className="content-heading">
            Affiliate links
          </h2>
          <p className="content-paragraph">
            Some links on this website are affiliate links. They may lead to
            external retailers such as Amazon and, in future, possibly bol.com.
          </p>
          <p className="content-paragraph">
            If you buy through an affiliate link, {siteConfig.name} may receive
            a commission. You do not pay extra because of this.
          </p>
          <p className="content-paragraph">
            Affiliate relationships do not determine the editorial opinion or
            recommendation. {siteConfig.name} recommends titles and products
            because they are relevant to the content and the reader.
          </p>
        </section>

        <section className="content-section" aria-labelledby="affiliate-amazon-heading">
          <h2 id="affiliate-amazon-heading" className="content-heading">
            Amazon
          </h2>
          <p className="content-paragraph">
            As an Amazon Associate I earn from qualifying purchases. This costs
            you nothing extra.
          </p>
        </section>

        <section className="content-section" aria-labelledby="affiliate-operator-heading">
          <h2 id="affiliate-operator-heading" className="content-heading">
            Operator
          </h2>
          <p className="content-paragraph">
            {siteConfig.name} is operated by {operator.legalName}. KvK{" "}
            {operator.kvk}. {operator.streetAddress}, {operator.postalCode}{" "}
            {operator.city}.{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
        </section>
      </div>
    </main>
  );
}
