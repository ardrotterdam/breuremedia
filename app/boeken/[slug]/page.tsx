import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BookHero } from "@/components/BookHero";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { NewsletterSection } from "@/components/NewsletterSection";
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
    ...(book.en && {
      languages: {
        nl: `/boeken/${book.slug}`,
        en: `/en/${book.en.slug}`,
        "x-default": `/en/${book.en.slug}`,
      },
    }),
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

          {book.en && (
            <p className="content-meta">
              <Link href={`/en/${book.en.slug}`} className="text-link">
                Read this page in English
              </Link>
            </p>
          )}

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

          {book.relatedReadingLists && book.relatedReadingLists.length > 0 && (
            <>
              <h2 className="content-heading">Verder lezen</h2>
              <p className="content-paragraph">
                Dit boek staat ook in deze leeslijsten van Breure Media:
              </p>
              <ul className="theme-list">
                {book.relatedReadingLists.map((list) => (
                  <li key={list.href}>
                    <Link href={list.href}>{list.label}</Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      <NewsletterSection
        source={`boekpagina-${book.slug}`}
        eyebrow="Wachtlijst"
        title="Als eerste weten wanneer het boek verschijnt?"
        description={`Laat je e-mailadres achter en ontvang bericht zodra ${book.title} beschikbaar is — inclusief verschijningsdatum en een exclusieve voorpublicatie.`}
      />

      <FaqSection items={book.faq} title={`Veelgestelde vragen over ${book.title}`} />
    </main>
  );
}
