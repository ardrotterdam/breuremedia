import Link from "next/link";
import type { Metadata } from "next";
import { BookHero } from "@/components/BookHero";
import { NewsletterSection } from "@/components/NewsletterSection";
import { UpcomingBookPromo } from "@/components/UpcomingBookPromo";
import { getBookBySlug, getEnglishBooks, type Book } from "@/data/books";
import { author, siteConfig, siteEn, authorEn } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { englishNewsletterCopy } from "@/lib/i18n";

const featuredBook = getEnglishBooks()[0];
const en = featuredBook.en;
const upcomingBook = getBookBySlug("zero-day-directive");
const upcomingEn = upcomingBook?.en;

export const metadata: Metadata = buildMetadata({
  title: `${en.title} | ${author.name} | ${siteConfig.name}`,
  description: en.description,
  path: "/en",
  image: en.coverImage ?? featuredBook.coverImage,
  imageAlt: en.coverAlt,
  locale: "en_US",
  languages: {
    nl: "/",
    en: "/en",
    "x-default": "/en",
  },
});

const localizedBook: Book = {
  ...featuredBook,
  title: en.title,
  subtitle: en.subtitle,
  tagline: en.tagline,
  coverImage: en.coverImage ?? featuredBook.coverImage,
  coverAlt: en.coverAlt,
  formatNote: en.formatNote,
  priceFormatted: "€29.95",
};

export default function EnglishHomePage() {
  return (
    <main lang="en">
      <BookHero
        book={localizedBook}
        priority
        orderLabel="Sign up to be notified on release"
      />

      <section className="synopsis" aria-labelledby="synopsis-heading">
        <div className="container synopsis-inner">
          <hr className="editorial-rule" aria-hidden="true" />
          <p className="section-eyebrow">About the book</p>
          <h2 id="synopsis-heading" className="section-title">
            An old debt that returns with the tide.
          </h2>
          {en.longDescription.map((paragraph) => (
            <p key={paragraph} className="synopsis-paragraph">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {upcomingBook && upcomingEn && (
        <UpcomingBookPromo
          book={{
            ...upcomingBook,
            title: upcomingEn.title,
            subtitle: upcomingEn.subtitle,
            coverImage: upcomingEn.coverImage ?? upcomingBook.coverImage,
            coverAlt: upcomingEn.coverAlt,
          }}
          copy={{
            eyebrow: "Coming Soon",
            subtitle: upcomingEn.subtitle,
            blurb: upcomingEn.description,
            expected: "Expected: Autumn 2027",
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
