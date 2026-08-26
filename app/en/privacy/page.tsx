import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { operator, siteConfig } from "@/lib/site";
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
      de: "/de/datenschutz",
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

        <section className="content-section" aria-labelledby="privacy-controller-heading">
          <h2 id="privacy-controller-heading" className="content-heading">
            Controller
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
            <br />
            Chamber of Commerce (KvK): {operator.kvk}
          </p>
          <p className="content-paragraph">
            Contact:{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
        </section>

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
            This website does not use Google Analytics or comparable tracking
            analytics.
          </p>
          <p className="content-paragraph">
            If you subscribe to the newsletter or waitlist, we process, with
            your consent, the email address you enter, the title or topic you
            signed up for, the language of the page, the URL of the page where
            you subscribed, and the source of the subscription (for example the
            homepage or a book page), and the time of that sign-up. We store
            these details as a contact in Resend, the email service we use to
            send messages.
          </p>
          <p className="content-paragraph">
            If you request the first chapter, we send that chapter because you
            asked for it. That is not a subscription to future book news. We
            only send publication updates if you sign up separately through the
            newsletter or waitlist form. Contacts without that sign-up do not
            receive marketing messages.
          </p>
          <p className="content-paragraph">
            We do not share your data with third parties for their own
            marketing. You can unsubscribe at any time via the link in a
            message or via{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
          </p>
        </section>

        <section className="content-section" aria-labelledby="privacy-contact-data-heading">
          <h2 id="privacy-contact-data-heading" className="content-heading">
            Email correspondence
          </h2>
          <p className="content-paragraph">
            If you email {siteConfig.name}, we use the information you send in
            that message in order to reply.
          </p>
        </section>

        <section className="content-section" aria-labelledby="privacy-affiliate-heading">
          <h2 id="privacy-affiliate-heading" className="content-heading">
            Affiliate links
          </h2>
          <p className="content-paragraph">
            This website may contain links to external retailers such as Amazon
            and, in future, possibly bol.com. If you click such a link, you leave
            our site. The retailer has its own privacy and cookie policies.{" "}
            {siteConfig.name} does not control cookies or data processing on that
            retailer&apos;s site after you leave.
          </p>
        </section>

        <section className="content-section" aria-labelledby="privacy-cookies-heading">
          <h2 id="privacy-cookies-heading" className="content-heading">
            Cookies
          </h2>
          <p className="content-paragraph">
            This website does not set tracking cookies and does not use
            advertising networks. Technically necessary cookies may be used for
            the site to function.
          </p>
        </section>

        <section className="content-section" aria-labelledby="privacy-rights-heading">
          <h2 id="privacy-rights-heading" className="content-heading">
            Your rights
          </h2>
          <p className="content-paragraph">
            Under the General Data Protection Regulation (GDPR) you have the
            right, among other things, to access, correct and delete your
            personal data. Contact us at{" "}
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
            Last updated: August 2026
          </p>
        </section>
      </div>
    </main>
  );
}
