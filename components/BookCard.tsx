import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/data/books";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <article className="book-card">
      <Link href={`/boeken/${book.slug}`} className="book-card-link">
        <div className="book-card-cover">
          <Image
            src={book.coverImage}
            alt={book.coverAlt}
            width={280}
            height={420}
            sizes="(max-width: 640px) 200px, 280px"
          />
        </div>
        <div className="book-card-content">
          <p className="section-eyebrow">{book.genre}</p>
          <h2 className="book-card-title">{book.title}</h2>
          <p className="book-card-author">{book.author}</p>
          <p className="book-card-description">{book.description}</p>
          <p className="book-card-price">{book.priceFormatted}</p>
        </div>
      </Link>
    </article>
  );
}
