import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { FirstChapterCTA } from "@/components/FirstChapterCTA";
import { RelatedGuides } from "@/components/RelatedGuides";
import { formatBlogDate } from "@/data/blog";
import { author, siteConfig } from "@/lib/site";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { DE_PLACEHOLDER, localeAlternates } from "@/lib/i18n";
import { breadcrumbSchema, buildJsonLd } from "@/lib/schema";

const pagePath = "/de/domburg";
const pageHeadline = DE_PLACEHOLDER;
const pageTitle = `${pageHeadline} | ${siteConfig.name}`;
const pageDescription = DE_PLACEHOLDER;
const datePublished = "2026-08-23";
const dateModified = "2026-08-23";
const heroSrc = "/images/paalhoofden-domburg-strand-november.webp";

export const metadata: Metadata = buildMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  type: "article",
  locale: "de_DE",
  image: heroSrc,
  imageAlt: DE_PLACEHOLDER,
  imageWidth: 1672,
  imageHeight: 941,
  imageType: "image/webp",
  keywords: [DE_PLACEHOLDER],
  languages: localeAlternates(pagePath),
});

const breadcrumbs = [
  { name: "Home", path: "/de" },
  { name: "Domburg", path: pagePath },
];

const articleSchema = {
  "@type": "Article",
  headline: pageHeadline,
  description: pageDescription,
  datePublished,
  dateModified,
  inLanguage: "de",
  image: absoluteUrl(heroSrc),
  author: {
    "@type": "Person",
    name: author.name,
    url: absoluteUrl("/de/ueber-den-autor"),
  },
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": absoluteUrl(pagePath),
  },
};

export default function GermanDomburgPage() {
  const jsonLd = buildJsonLd(articleSchema, breadcrumbSchema(breadcrumbs));

  return (
    <main lang="de">
      <JsonLd data={jsonLd} />
      <PageHeader
        eyebrow="Domburg"
        title={pageHeadline}
        description={`${author.name} · ${formatBlogDate(dateModified, "de")}`}
      />

      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} locale="de" />

        <figure className="content-section">
          <Image
            src={heroSrc}
            alt={DE_PLACEHOLDER}
            width={1672}
            height={941}
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, 48rem"
            style={{ width: "100%", height: "auto", borderRadius: "2px" }}
          />
        </figure>

        <section className="content-section">
          <p className="content-paragraph">{DE_PLACEHOLDER}</p>
          <p className="content-paragraph">
            <Link href="/de/schatten-ueber-domburg" className="text-link">
              Bücher
            </Link>
          </p>
        </section>
      </div>

      <div className="container content-page content-page--footer">
        <FirstChapterCTA source="de-domburg" locale="de" />

        <RelatedGuides
          locale="de"
          guides={[
            {
              href: "/de/schatten-ueber-domburg",
              label: "Bücher",
              description: DE_PLACEHOLDER,
            },
            {
              href: "/de/ueber-den-autor",
              label: "Über den Autor",
              description: DE_PLACEHOLDER,
            },
          ]}
        />
      </div>
    </main>
  );
}
