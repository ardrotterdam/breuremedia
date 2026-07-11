import Link from "next/link";
import type { Metadata } from "next";
import { BookHero } from "@/components/BookHero";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getAllBooks } from "@/data/books";
import { author, siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

const featuredBook = getAllBooks()[0];

export const metadata: Metadata = buildMetadata({
  title: `${featuredBook.title} | ${author.name} | ${siteConfig.name}`,
  description: featuredBook.description,
  path: "/",
  image: featuredBook.coverImage,
  imageAlt: featuredBook.coverAlt,
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
            Een oude schuld die terugkomt met de vloed.
          </h2>
          {featuredBook.longDescription.map((paragraph) => (
            <p key={paragraph} className="synopsis-paragraph">{paragraph}</p>
          ))}
        </div>
      </section>

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

      <section className="newsletter" aria-labelledby="newsletter-heading">
        <div className="container newsletter-inner">
          <hr className="editorial-rule" aria-hidden="true" />
          <p className="section-eyebrow">Berichten uit Breure Media</p>
          <h2 id="newsletter-heading" className="section-title">
            Nieuwe verhalen beginnen in stilte.
          </h2>
          <p className="newsletter-description">
            Ontvang bericht wanneer een nieuwe publicatie, editie of bijzonder
            project verschijnt.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
}
