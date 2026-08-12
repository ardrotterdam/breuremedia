import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/data/books";

export interface UpcomingBookPromoCopy {
  eyebrow: string;
  subtitle: string;
  blurb: string;
  expected: string;
  primaryLabel: string;
  secondaryLabel: string;
  bookHref: string;
  waitlistHref: string;
}

interface UpcomingBookPromoProps {
  book: Book;
  copy: UpcomingBookPromoCopy;
}

export function UpcomingBookPromo({ book, copy }: UpcomingBookPromoProps) {
  return (
    <section className="upcoming" aria-labelledby="upcoming-heading">
      <div className="container upcoming-inner">
        <hr className="editorial-rule editorial-rule--gold" aria-hidden="true" />
        <p className="section-eyebrow">{copy.eyebrow}</p>

        <div className="upcoming-layout">
          <Link
            href={copy.bookHref}
            className="upcoming-cover-link"
            aria-label={book.coverAlt}
          >
            <Image
              className="book-cover"
              src={book.coverImage}
              alt={book.coverAlt}
              width={400}
              height={600}
              sizes="(max-width: 640px) 200px, 280px"
            />
          </Link>

          <div className="upcoming-content">
            <h2 id="upcoming-heading" className="section-title upcoming-title">
              {book.title}
            </h2>
            <p className="upcoming-subtitle">{copy.subtitle}</p>
            <p className="upcoming-blurb">{copy.blurb}</p>
            <p className="upcoming-expected">{copy.expected}</p>

            <div className="upcoming-actions">
              <Link
                href={copy.bookHref}
                className="btn btn-primary btn-shine"
              >
                {copy.primaryLabel}
              </Link>
              <Link
                href={copy.waitlistHref}
                className="btn btn-secondary upcoming-waitlist"
              >
                {copy.secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
