import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { siteConfig } from "@/lib/site";
import { buildMetadata, sitePageTitle } from "@/lib/seo";
import { breadcrumbSchema, buildJsonLd } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: sitePageTitle("Privacy"),
  description:
    "Privacy policy of Breure Media. Read how we handle your data when you use our website and newsletter.",
  path: "/en/privacy",
  locale: "en_US",
  languages: {
    nl: "/privacy",
    en: "/en/privacy",
    "x-default": "/en/privacy",
  },
});

const breadcrumbs = [
  { name: "Home", path: "/en" },
  { name: "Privacy", path: "/en/privacy" },
];

export default function EnglishPrivacyPage() {
  const jsonLd = buildJsonLd(breadcrumbSchema(breadcrumbs));

  return (
    <main lang="en">
      <JsonLd data={jsonLd} />
      <PageHeader
        eyebrow="Legal"
        title="Privacy policy"
        description="How Breure Media handles your personal data."
      />
      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} />

        <p className="content-meta">
          <Link href="/privacy" className="text-link">
            Lees deze pagina in het Nederlands
          </Link>
        </p>

        <section className="content-section" aria-labelledby="privacy-intro-heading">
          <h2 id="privacy-intro-heading" className="content-heading">
            Introduction
          </h2>
          <p className="content-paragraph">
            {siteConfig.name} respects your privacy. This policy describes which
            data we collect when you visit our website and how we handle it.
          </p>
        </section>

        <section className="content-section" aria-labelledby="privacy-data-heading">
          <h2 id="privacy-data-heading" className="content-heading">
            What data do we collect?
          </h2>
          <p className="content-paragraph">
            Through this website, {siteConfig.name} collects only the email
            address you enter yourself when subscribing to the newsletter. This
            happens with your explicit consent.
          </p>
          <p className="content-paragraph">
            We use your email address solely to inform you about the release of
            Shadows over Domburg and other {siteConfig.name} publications. We do
            not share your data with third parties for marketing purposes. You
            can unsubscribe at any time.
          </p>
        </section>

        <section className="content-section" aria-labelledby="privacy-cookies-heading">
          <h2 id="privacy-cookies-heading" className="content-heading">
            Cookies
          </h2>
          <p className="content-paragraph">
            This website does not use tracking cookies or advertising networks.
            Technically necessary cookies may be used for the site to function.
          </p>
        </section>

        <section className="content-section" aria-labelledby="privacy-rights-heading">
          <h2 id="privacy-rights-heading" className="content-heading">
            Your rights
          </h2>
          <p className="content-paragraph">
            Under the General Data Protection Regulation (GDPR) you have the
            right to access, correct and delete your personal data. Contact us at{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> for
            questions about your data.
          </p>
        </section>

        <section className="content-section" aria-labelledby="privacy-contact-heading">
          <h2 id="privacy-contact-heading" className="content-heading">
            Contact
          </h2>
          <p className="content-paragraph">
            Questions about this privacy policy? Send an email to{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
          </p>
          <p className="content-paragraph content-meta">
            Last updated: July 2026
          </p>
        </section>
      </div>
    </main>
  );
}
