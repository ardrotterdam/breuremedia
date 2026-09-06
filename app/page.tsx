import Link from "next/link";
import type { Metadata } from "next";
import { FeaturedBookSection } from "@/components/FeaturedBookSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { PublicationsHero } from "@/components/PublicationsHero";
import { getAllBooks } from "@/data/books";
import { author, siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { publicationBadge } from "@/lib/i18n";

const allBooks = getAllBooks();

export const metadata: Metadata = buildMetadata({
  title: "Breure Media | Thrillers over macht, havens en Europa",
  description:
    "Onafhankelijk Nederlands label voor thrillers over macht, havens en Europa. Ontdek onze publicaties van Ard Breure.",
  path: "/",
  image: "/images/og-breure-media-general.jpg",
  imageAlt: "Breure Media: thrillers over macht, havens en Europa",
  imageWidth: 1200,
  imageHeight: 630,
  languages: {
    nl: "/",
    en: "/en",
    "x-default": "/en",
  },
});

export default function HomePage() {
  return (
    <main>
      <PublicationsHero
        eyebrow="Onze Publicaties"
        brand={siteConfig.name}
        lead={siteConfig.tagline}
        publications={allBooks.map((book) => {
          const badge = publicationBadge(book.slug, "nl");
          return {
            book,
            href: `/boeken/${book.slug}`,
            pitch: book.tagline,
            ctaLabel: "Bekijk boek",
            ...(badge ? { badge } : {}),
            priority: true,
          };
        })}
      />

      {allBooks.map((book) => (
        <FeaturedBookSection
          key={book.slug}
          eyebrow="Uitgelicht boek"
          title={book.title}
          hook={book.tagline}
          paragraphs={book.longDescription}
          headingId={`featured-book-${book.slug}`}
        />
      ))}

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
