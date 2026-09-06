import Link from "next/link";
import type { Metadata } from "next";
import { FeaturedBookSection } from "@/components/FeaturedBookSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { PublicationsHero } from "@/components/PublicationsHero";
import { getGermanBooks, type Book } from "@/data/books";
import { author, siteConfig, siteDe, authorDe } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { localeAlternates, publicationBadge } from "@/lib/i18n";

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
  title: "Breure Media | Thriller über Macht, Häfen und Europa",
  description:
    "Unabhängiges niederländisches Label für Thriller über Macht, Häfen und Europa. Zeeländische Küste, Rotterdamer Hafen. Schatten über Domburg, ein Zeeland Krimi.",
  path: "/de",
  image: "/images/og-breure-media-general.jpg",
  imageAlt: "Breure Media: Thriller über Macht, Häfen und Europa",
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
        lead="Thriller über Macht, Häfen und Europa. Von der zeeländischen Küste bis in den Rotterdamer Hafen."
        publications={germanBooks.map((book) => {
          const edition = book.de;
          const badge = publicationBadge(book.slug, "de");
          return {
            book: localizeGermanBook(book),
            href: `/de/${edition.slug}`,
            pitch: edition.tagline,
            ctaLabel: "Zum Buch",
            ...(badge ? { badge } : {}),
            priority: true,
          };
        })}
      />

      {germanBooks.map((book) => {
        const edition = book.de;
        return (
          <FeaturedBookSection
            key={edition.slug}
            eyebrow="Buch im Fokus"
            title={edition.title}
            hook={edition.tagline}
            paragraphs={edition.longDescription}
            headingId={`featured-book-${edition.slug}`}
          />
        );
      })}

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
