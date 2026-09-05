import Link from "next/link";
import type { Metadata } from "next";
import { NewsletterSection } from "@/components/NewsletterSection";
import { PublicationsHero } from "@/components/PublicationsHero";
import { UpcomingBookPromo } from "@/components/UpcomingBookPromo";
import { getBookBySlug, getEnglishBooks, type Book } from "@/data/books";
import { author, siteConfig, siteEn, authorEn } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { englishNewsletterCopy } from "@/lib/i18n";

const englishBooks = getEnglishBooks();
const featuredBook = englishBooks[0];
const en = featuredBook.en;
const upcomingBook = getBookBySlug("zero-day-directive");
const upcomingEn = upcomingBook?.en;

function localizeEnglishBook(book: (typeof englishBooks)[number]): Book {
  const edition = book.en;
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
  title: "Breure Media | Literary Thrillers",
  description:
    "Independent Dutch imprint for literary thrillers. Discover publications by Ard Breure.",
  path: "/en",
  image: "/images/og-breure-media-general.jpg",
  imageAlt: "Breure Media — literary thrillers",
  imageWidth: 1200,
  imageHeight: 630,
  locale: "en_US",
  languages: {
    nl: "/",
    en: "/en",
    "x-default": "/en",
  },
});

export default function EnglishHomePage() {
  const upcomingLocalized =
    upcomingBook && upcomingEn
      ? {
          ...upcomingBook,
          title: upcomingEn.title,
          subtitle: upcomingEn.subtitle,
          tagline: upcomingEn.tagline,
          description: upcomingEn.description,
          coverImage: upcomingEn.coverImage ?? upcomingBook.coverImage,
          coverAlt: upcomingEn.coverAlt,
        }
      : null;

  return (
    <main lang="en">
      <PublicationsHero
        eyebrow="Our Publications"
        brand={siteConfig.name}
        lead={siteEn.tagline}
        publications={englishBooks.map((book) => {
          const edition = book.en;
          return {
            book: localizeEnglishBook(book),
            href: `/en/${edition.slug}`,
            pitch: edition.tagline,
            ctaLabel: "View book",
            ...(book.slug === "zero-day-directive"
              ? { badge: "Expected Jan 2027" }
              : {}),
            priority: true,
          };
        })}
      />

      <section className="synopsis" aria-labelledby="synopsis-heading">
        <div className="container synopsis-inner">
          <hr className="editorial-rule" aria-hidden="true" />
          <p className="section-eyebrow">About the book</p>
          <h2 id="synopsis-heading" className="section-title">
            {en.tagline}
          </h2>
          {en.longDescription.map((paragraph) => (
            <p key={paragraph} className="synopsis-paragraph">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {upcomingLocalized && upcomingEn && (
        <UpcomingBookPromo
          book={upcomingLocalized}
          copy={{
            eyebrow: "Coming Soon",
            subtitle: upcomingEn.subtitle,
            blurb: upcomingEn.description,
            expected: "Expected: January 2027",
            primaryLabel: "Read more",
            secondaryLabel: "Join waiting list",
            bookHref: `/en/${upcomingEn.slug}`,
            waitlistHref: `/en/${upcomingEn.slug}#wachtlijst`,
          }}
        />
      )}

      <section className="author" aria-labelledby="home-author-heading">
        <div className="container author-inner">
          <div className="author-text">
            <p className="section-eyebrow">About the author</p>
            <h2 id="home-author-heading" className="section-title">
              {author.name}
            </h2>
            {authorEn.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <Link href="/en/about" className="text-link">
              Read more about the author
            </Link>
          </div>
          <aside className="author-accent" aria-label="Motto">
            <blockquote>&ldquo;{siteEn.motto}&rdquo;</blockquote>
          </aside>
        </div>
      </section>

      <NewsletterSection
        source="en-homepage"
        eyebrow="From Breure Media"
        title="New stories begin in silence."
        description="Get a message when a new publication, edition or special project is released."
        formCopy={englishNewsletterCopy}
      />
    </main>
  );
}
