import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BookHero } from "@/components/BookHero";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { FirstChapterCTA } from "@/components/FirstChapterCTA";
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
        ...(book.de && { de: `/de/${book.de.slug}` }),
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
    ...(book.faq.length > 0 ? [faqSchema(book.faq)] : [])
  );

  const isChapterBook = book.slug === "schaduwen-over-domburg";
  const CROSS_SELL_SLUGS = ["zero-day-directive"];
  const showCrossSellChapter =
    !isChapterBook && CROSS_SELL_SLUGS.includes(book.slug);
  const hasAbout = book.longDescription.length > 0;
  const hasSetting = Boolean(book.setting) || book.themes.length > 0;

  return (
    <main>
      <JsonLd data={jsonLd} />
      <BookHero
        book={book}
        priority
        orderLabel={
          isChapterBook
            ? "LEES HET EERSTE HOOFDSTUK"
            : showCrossSellChapter
              ? "Lees het eerste hoofdstuk van Domburg"
              : undefined
        }
        orderHref={
          isChapterBook || showCrossSellChapter
            ? "#eerste-hoofdstuk"
            : undefined
        }
      />

      <section
        className="book-detail"
        aria-labelledby={hasAbout ? "book-about-heading" : undefined}
      >
        <div className="container book-detail-inner">
          <Breadcrumbs items={breadcrumbs} />

          {book.en && (
            <p className="content-meta">
              <Link href={`/en/${book.en.slug}`} className="text-link">
                Read this page in English
              </Link>
            </p>
          )}

          {hasAbout ? (
            <>
              <h2 id="book-about-heading" className="section-title">
                Over dit boek
              </h2>
              {book.longDescription.map((paragraph) => (
                <p key={paragraph} className="content-paragraph">
                  {paragraph}
                </p>
              ))}
            </>
          ) : null}

          {hasSetting ? (
            <>
              <h2 className="content-heading">Setting en thema&apos;s</h2>
              {book.setting ? (
                <p className="content-paragraph">
                  <strong>Setting:</strong> {book.setting}
                </p>
              ) : null}
              {book.themes.length > 0 ? (
                <ul className="theme-list">
                  {book.themes.map((theme) => (
                    <li key={theme}>{theme}</li>
                  ))}
                </ul>
              ) : null}
            </>
          ) : null}

          {book.relatedReadingLists && book.relatedReadingLists.length > 0 && (
            <>
              <h2 className="content-heading">Verder lezen</h2>
              <p className="content-paragraph">
                Dit boek staat ook in deze leeslijsten van Breure Media:
              </p>
              <ul className="theme-list related-guides-list">
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

      {isChapterBook ? (
        <div className="container">
          <FirstChapterCTA source={`boekpagina-${book.slug}`} />
        </div>
      ) : null}

      {showCrossSellChapter ? (
        <div className="container">
          <FirstChapterCTA
            source={`boekpagina-${book.slug}-crosssell`}
            intro="Zero Day Directive verschijnt naar verwachting januari 2027. Lees intussen het eerste hoofdstuk van mijn eerste thriller."
          />
        </div>
      ) : (
        <NewsletterSection
          id="wachtlijst"
          source={`boekpagina-${book.slug}`}
          book={book.title}
          eyebrow="Wachtlijst"
          title="Als eerste weten wanneer het boek verschijnt?"
          description={`Leuk dat je nieuwsgierig bent naar ${book.title}. Laat je e-mailadres achter, dan ontvang je als eerste nieuws over de verschijningsdatum en een exclusieve voorpublicatie.`}
        />
      )}

      <FaqSection items={book.faq} title={`Veelgestelde vragen over ${book.title}`} />
    </main>
  );
}
