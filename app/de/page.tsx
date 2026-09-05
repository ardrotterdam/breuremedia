import Link from "next/link";
import type { Metadata } from "next";
import { NewsletterSection } from "@/components/NewsletterSection";
import { PublicationsHero } from "@/components/PublicationsHero";
import { getBookByGermanSlug, getGermanBooks, type Book } from "@/data/books";
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
const germanBooks = getGermanBooks();

function localizeGermanBook(book: (typeof germanBooks)[number]): Book {
  const edition = book.de;
  return {
    ...book,
    title: edition.title,
    subtitle: edition.subtitle,
    tagline: edition.tagline,
    description: edition.description,
    longDescription: edition.longDescription,
    coverImage: edition.coverImage ?? book.coverImage,
    coverAlt: edition.coverAlt,
    formatNote: edition.formatNote,
  };
}

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
  return (
    <main lang="de">
      <PublicationsHero
        eyebrow="Unsere Bücher"
        brand={siteConfig.name}
        lead="Literarische Thriller, wo die zeeländische Küste den Rotterdamer Hafen berührt."
        publications={germanBooks.map((book) => {
          const edition = book.de;
          return {
            book: localizeGermanBook(book),
            href: `/de/${edition.slug}`,
            pitch: edition.tagline,
            ctaLabel: "Zum Buch",
            priority: true,
          };
        })}
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
