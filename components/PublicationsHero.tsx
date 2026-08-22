import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/data/books";

export interface PublicationShowcaseItem {
  book: Book;
  href: string;
  pitch: string;
  ctaLabel: string;
  /** Optional status badge, e.g. expected release. */
  badge?: string;
  priority?: boolean;
}

interface PublicationsHeroProps {
  eyebrow: string;
  brand: string;
  lead: string;
  publications: PublicationShowcaseItem[];
}

export function PublicationsHero({
  eyebrow,
  brand,
  lead,
  publications,
}: PublicationsHeroProps) {
  return (
    <section className="publications-hero" aria-labelledby="publications-hero-heading">
      <div className="container publications-hero-inner">
        <header className="publications-hero-header">
          <p className="section-eyebrow publications-hero-eyebrow">{eyebrow}</p>
          <h1 id="publications-hero-heading" className="publications-hero-brand">
            {brand}
          </h1>
          <p className="publications-hero-lead">{lead}</p>
        </header>

        <div
          className={`publications-grid${publications.length === 1 ? " publications-grid--single" : ""}`}
        >
          {publications.map((item) => (
            <article key={item.href} className="publication-feature">
              <Link
                href={item.href}
                className="publication-cover-link"
                aria-label={item.book.coverAlt}
              >
                <Image
                  className="book-cover publication-cover"
                  src={item.book.coverImage}
                  alt={item.book.coverAlt}
                  width={400}
                  height={600}
                  priority={item.priority}
                  sizes="(max-width: 640px) 220px, (max-width: 900px) 260px, 320px"
                />
              </Link>

              <div className="publication-copy">
                <p
                  className={
                    item.badge
                      ? "publication-badge"
                      : "publication-badge publication-badge--empty"
                  }
                  aria-hidden={item.badge ? undefined : true}
                >
                  {item.badge ?? "\u00a0"}
                </p>
                <h2 className="publication-title">{item.book.title}</h2>
                <p className="publication-pitch">{item.pitch}</p>
                <Link href={item.href} className="btn btn-primary btn-shine publication-cta">
                  {item.ctaLabel}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
