import Link from "next/link";
import type { Metadata } from "next";
import { NewsletterSection } from "@/components/NewsletterSection";
import { PublicationsHero } from "@/components/PublicationsHero";
import { getBookByGermanSlug, type Book } from "@/data/books";
import { author, siteConfig, siteDe, authorDe } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { localeAlternates } from "@/lib/i18n";

function requireGermanFeaturedBook() {
  const book = getBookByGermanSlug("schatten-ueber-domburg");
  if (!book) {
    throw new Error("German edition of Schatten über Domburg is missing.");
  }
  return book;
}

const featuredBook = requireGermanFeaturedBook();
const de = featuredBook.de;

export const metadata: Metadata = buildMetadata({
  title: "Breure Media | Literarische Thriller",
  description:
    "Unabhängiges niederländisches Label für literarische Thriller. Zeeländische Küste, Rotterdamer Hafen. Schatten über Domburg, ein Zeeland Krimi.",
  path: "/de",
  image: "/images/og-breure-media-general.jpg",
  imageAlt: "Breure Media: literarische Thriller an der zeeländischen Küste",
  imageWidth: 1200,
  imageHeight: 630,
  locale: "de_DE",
  languages: localeAlternates("/de"),
});

export default function GermanHomePage() {
  const featuredLocalized: Book = {
    ...featuredBook,
    title: de.title,
    subtitle: de.subtitle,
    tagline: de.tagline,
    description: de.description,
    longDescription: de.longDescription,
    coverImage: de.coverImage ?? featuredBook.coverImage,
    coverAlt: de.coverAlt,
    formatNote: de.formatNote,
  };

  return (
    <main lang="de">
      <PublicationsHero
        eyebrow="Unsere Bücher"
        brand={siteConfig.name}
        lead="Literarische Thriller, wo die zeeländische Küste den Rotterdamer Hafen berührt."
        publications={[
          {
            book: featuredLocalized,
            href: `/de/${de.slug}`,
            pitch: de.tagline,
            ctaLabel: "Zum Buch",
            priority: true,
          },
        ]}
      />

      <section className="synopsis" aria-labelledby="synopsis-heading">
        <div className="container synopsis-inner">
          <hr className="editorial-rule" aria-hidden="true" />
          <p className="section-eyebrow">Über das Buch</p>
          <h2 id="synopsis-heading" className="section-title">
            {de.tagline}
          </h2>
          {de.longDescription.map((paragraph) => (
            <p key={paragraph} className="synopsis-paragraph">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="author" aria-labelledby="home-author-heading">
        <div className="container author-inner">
          <div className="author-text">
            <p className="section-eyebrow">Über den Autor</p>
            <h2 id="home-author-heading" className="section-title">
              {author.name}
            </h2>
            {authorDe.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <Link href="/de/ueber-den-autor" className="text-link">
              Mehr über den Autor
            </Link>
          </div>
          <aside className="author-accent" aria-label="Motto">
            <blockquote>&ldquo;{siteDe.motto}&rdquo;</blockquote>
          </aside>
        </div>
      </section>

      <NewsletterSection source="de-homepage" locale="de" />
    </main>
  );
}
