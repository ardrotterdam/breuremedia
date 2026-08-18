import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { operator, siteConfig } from "@/lib/site";
import { buildMetadata, sitePageTitle } from "@/lib/seo";
import { breadcrumbSchema, buildJsonLd } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: sitePageTitle("Contact"),
  description:
    "Get in touch with Breure Media for questions about Shadows over Domburg, press enquiries or collaboration.",
  path: "/en/contact",
  locale: "en_US",
  languages: {
    nl: "/contact",
    en: "/en/contact",
    "x-default": "/en/contact",
  },
});

const breadcrumbs = [
  { name: "Home", path: "/en" },
  { name: "Contact", path: "/en/contact" },
];

export default function EnglishContactPage() {
  const jsonLd = buildJsonLd(breadcrumbSchema(breadcrumbs));

  return (
    <main lang="en">
      <JsonLd data={jsonLd} />
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        description="Questions about the book, press enquiries or collaboration? We'd love to hear from you."
      />
      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} />

        <p className="content-meta">
          <Link href="/contact" className="text-link">
            Lees deze pagina in het Nederlands
          </Link>
        </p>

        <section className="content-section" aria-labelledby="contact-info-heading">
          <h2 id="contact-info-heading" className="content-heading">
            How to reach us
          </h2>
          <p className="content-paragraph">
            {siteConfig.name} is an independent Dutch publishing imprint. For
            questions about publications, orders or press enquiries, you can
            reach us by email.
          </p>
          <p className="content-paragraph">
            <a href={`mailto:${siteConfig.email}`} className="text-link">
              {siteConfig.email}
            </a>
          </p>
          <p className="content-paragraph">The Netherlands</p>
        </section>

        <section className="content-section" aria-labelledby="contact-topics-heading">
          <h2 id="contact-topics-heading" className="content-heading">
            What can we help you with?
          </h2>
          <ul className="theme-list">
            <li>Questions about Shadows over Domburg and its release date</li>
            <li>Press and interview requests</li>
            <li>Collaboration and distribution</li>
            <li>General questions about Breure Media</li>
          </ul>
        </section>

        <section className="content-section" aria-labelledby="contact-company-heading">
          <h2 id="contact-company-heading" className="content-heading">
            Business information
          </h2>
          <p className="content-paragraph">
            {siteConfig.name} is operated by {operator.legalName}.
          </p>
          <p className="content-paragraph">
            {operator.legalName}
            <br />
            {operator.streetAddress}
            <br />
            {operator.postalCode} {operator.city}
            <br />
            {operator.countryEn}
          </p>
          <p className="content-paragraph">
            Chamber of Commerce (KvK): {operator.kvk}
          </p>
          <p className="content-paragraph">
            Email:{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
        </section>
      </div>
    </main>
  );
}
