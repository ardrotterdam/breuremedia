import Image from "next/image";
import type { Book } from "@/data/books";
import { OrderButton } from "./OrderButton";

interface BookHeroProps {
  book: Book;
  priority?: boolean;
}

export function BookHero({ book, priority = false }: BookHeroProps) {
  return (
    <section className="hero">
      <div className="hero-layout">
        <div className="hero-cover-pane">
          <div className="hero-cover-inner">
            <Image
              className="book-cover"
              src={book.coverImage}
              alt={book.coverAlt}
              width={400}
              height={600}
              priority={priority}
              sizes="(max-width: 640px) 240px, (max-width: 900px) 280px, 380px"
            />
          </div>
        </div>
        <div className="hero-content-pane">
          <div className="hero-content">
            <p className="hero-eyebrow">{book.subtitle}</p>
            <h1 className="hero-title">{book.title}</h1>
            <p className="hero-author">{book.author}</p>
            <p className="hero-tagline">{book.tagline}</p>
            <div className="hero-meta">
              <span className="hero-price">{book.priceFormatted}</span>
              <span className="hero-format">{book.formatNote}</span>
            </div>
            <p className="hero-format">
              {book.format} · {book.priceFormatted}
            </p>
            <OrderButton />
          </div>
        </div>
      </div>
    </section>
  );
}
