import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BookHero } from "@/components/BookHero";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import {
  getAllBookSlugs,
  getBookBySlug,
} from "@/data/books";
import { bookPageTitle, buildMetadata } from "@/lib/seo";
import {
  bookSchema,
  breadcrumbSchema,
  buildJsonLd,
  faqSchema,
  personSchema,
} from "@/lib/schema";

interface BookDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBookSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BookDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) {
    return { title: "Boek niet gevonden" };
  }

  return buildMetadata({
    title: bookPageTitle(book.title, book.author),
    description: book.description,
    path: `/boeken/${book.slug}`,
    image: book.coverImage,
    imageAlt: book.coverAlt,
    type: "article",
    keywords: book.keywords,
  });
}

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Boeken", path: "/boeken" },
    { name: book.title, path: `/boeken/${book.slug}` },
  ];

  const jsonLd = buildJsonLd(
    bookSchema(book),
    personSchema(),
    breadcrumbSchema(breadcrumbs),
    faqSchema(book.faq)
  );

  return (
    <main>
      <JsonLd data={jsonLd} />
      <BookHero book={book} priority />

      <section className="book-detail" aria-labelledby="book-about-heading">
        <div className="container book-detail-inner">
          <Breadcrumbs items={breadcrumbs} />

          <h2 id="book-about-heading" className="section-title">
            Over dit boek
          </h2>
          {book.longDescription.map((paragraph) => (
            <p key={paragraph} className="content-paragraph">
              {paragraph}
            </p>
          ))}

          <h2 className="content-heading">Setting en thema&apos;s</h2>
          <p className="content-paragraph">
            <strong>Setting:</strong> {book.setting}
          </p>
          <ul className="theme-list">
            {book.themes.map((theme) => (
              <li key={theme}>{theme}</li>
            ))}
          </ul>
        </div>
      </section>

      <FaqSection items={book.faq} title={`Veelgestelde vragen over ${book.title}`} />
    </main>
  );
}
