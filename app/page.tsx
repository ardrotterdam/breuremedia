import Link from "next/link";
import type { Metadata } from "next";
import { BookHero } from "@/components/BookHero";
import { NewsletterSection } from "@/components/NewsletterSection";
import { UpcomingBookPromo } from "@/components/UpcomingBookPromo";
import { getAllBooks, getBookBySlug } from "@/data/books";
import { author, siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

const allBooks = getAllBooks();
const featuredBook = allBooks[0];
const upcomingBook = getBookBySlug("zero-day-directive") ?? allBooks[1];

export const metadata: Metadata = buildMetadata({
  title: `${featuredBook.title} | ${author.name} | ${siteConfig.name}`,
  description: featuredBook.description,
  path: "/",
  image: featuredBook.coverImage,
  imageAlt: featuredBook.coverAlt,
  languages: {
    nl: "/",
    en: "/en",
    "x-default": "/en",
  },
});

export default function HomePage() {
  return (
    <main>
      <BookHero book={featuredBook} priority />

      <section className="synopsis" aria-labelledby="synopsis-heading">
        <div className="container synopsis-inner">
          <hr className="editorial-rule" aria-hidden="true" />
          <p className="section-eyebrow">Over het boek</p>
          <h2 id="synopsis-heading" className="section-title">
            {featuredBook.tagline}
          </h2>
          {featuredBook.longDescription.map((paragraph) => (
            <p key={paragraph} className="synopsis-paragraph">{paragraph}</p>
          ))}
        </div>
      </section>

      {upcomingBook && (
        <UpcomingBookPromo
          book={upcomingBook}
          copy={{
            eyebrow: "Aankomend",
            subtitle: upcomingBook.subtitle,
            blurb: upcomingBook.description,
            expected: "Verwacht: najaar 2027",
            primaryLabel: "Meer over dit boek",
            secondaryLabel: "Inschrijven wachtlijst",
            bookHref: `/boeken/${upcomingBook.slug}`,
            waitlistHref: `/boeken/${upcomingBook.slug}#wachtlijst`,
          }}
        />
      )}

      <section className="author" aria-labelledby="home-author-heading">
        <div className="container author-inner">
          <div className="author-text">
            <p className="section-eyebrow">Over de auteur</p>
            <h2 id="home-author-heading" className="section-title">
              {author.name}
            </h2>
            {author.bio.map((paragraph) => (
              <p key={paragraph}>
                {paragraph.includes("Schaduwen over Domburg") ? (
                  <>
                    Ard Breure is de auteur van{" "}
                    <em>Schaduwen over Domburg</em>.
                  </>
                ) : (
                  paragraph
                )}
              </p>
            ))}
            <Link href="/over-de-auteur" className="text-link">
              Lees meer over de auteur
            </Link>
          </div>
          <aside className="author-accent" aria-label="Motto">
            <blockquote>&ldquo;{siteConfig.motto}&rdquo;</blockquote>
          </aside>
        </div>
      </section>

      <NewsletterSection source="homepage" />
    </main>
  );
}
