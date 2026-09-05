import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BookHero } from "@/components/BookHero";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { FirstChapterCTA } from "@/components/FirstChapterCTA";
import { NewsletterSection } from "@/components/NewsletterSection";
import { getBookByGermanSlug, getGermanBooks, type Book } from "@/data/books";
import { bookPageTitle, buildMetadata } from "@/lib/seo";
import { author, siteConfig } from "@/lib/site";
import { localeAlternates } from "@/lib/i18n";
import {
  breadcrumbSchema,
  buildJsonLd,
  faqSchema,
  germanBookSchema,
  personSchema,
} from "@/lib/schema";

interface GermanBookPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getGermanBooks().map((book) => ({ slug: book.de.slug }));
}

export async function generateMetadata({
  params,
}: GermanBookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookByGermanSlug(slug);

  if (!book) {
    return { title: "Seite nicht gefunden" };
  }

  const de = book.de;
  const isChapterBook = book.slug === "schaduwen-over-domburg";

  return buildMetadata({
    title: isChapterBook
      ? "Schatten über Domburg | Zeeland Krimi"
      : bookPageTitle(de.title, book.author),
    description: isChapterBook
      ? "Ein Körper treibt an den Strand von Domburg. Schatten über Domburg, ein Zeeland Krimi zwischen der zeeländischen Küste und dem Rotterdamer Hafen."
      : de.description,
    path: `/de/${de.slug}`,
    image: de.coverImage ?? book.coverImage,
    imageAlt: de.coverAlt,
    type: "article",
    keywords: de.keywords,
    locale: "de_DE",
    languages: localeAlternates(`/de/${de.slug}`),
  });
}

export default async function GermanBookPage({ params }: GermanBookPageProps) {
  const { slug } = await params;
  const book = getBookByGermanSlug(slug);

  if (!book) {
    notFound();
  }

  const de = book.de;
  const isChapterBook = book.slug === "schaduwen-over-domburg";
  const hasAbout = de.longDescription.length > 0;
  const hasSetting = Boolean(de.setting) || de.themes.length > 0;

  const localizedBook: Book = {
    ...book,
    title: de.title,
    subtitle: de.subtitle,
    tagline: de.tagline,
    description: de.description,
    longDescription: de.longDescription,
    coverImage: de.coverImage ?? book.coverImage,
    coverAlt: de.coverAlt,
    formatNote: de.formatNote,
    priceFormatted: book.priceFormatted,
  };

  const breadcrumbs = [
    { name: "Home", path: "/de" },
    { name: de.title, path: `/de/${de.slug}` },
  ];

  const jsonLd = buildJsonLd(
    germanBookSchema(book),
    personSchema("Autor", "de"),
    breadcrumbSchema(breadcrumbs),
    ...(de.faq.length > 0 ? [faqSchema(de.faq)] : [])
  );

  return (
    <main lang="de">
      <JsonLd data={jsonLd} />
      <BookHero
        book={localizedBook}
        priority
        locale="de"
        orderLabel={isChapterBook ? "ERSTES KAPITEL LESEN" : undefined}
        orderHref={isChapterBook ? "#erstes-kapitel" : undefined}
      />

      <section
        className="book-detail"
        aria-labelledby={hasAbout ? "book-about-heading" : undefined}
      >
        <div className="container book-detail-inner">
          <Breadcrumbs items={breadcrumbs} locale="de" />

          <p className="content-meta">
            <Link href={`/boeken/${book.slug}`} className="text-link">
              Niederländisch
            </Link>
            {" · "}
            {book.en ? (
              <Link href={`/en/${book.en.slug}`} className="text-link">
                English
              </Link>
            ) : null}
          </p>

          {hasAbout ? (
            <>
              <h2 id="book-about-heading" className="section-title">
                Über dieses Buch
              </h2>
              {de.longDescription.map((paragraph) => (
                <p key={paragraph} className="content-paragraph">
                  {paragraph}
                </p>
              ))}
            </>
          ) : null}

          {hasSetting ? (
            <>
              <h2 className="content-heading">Schauplatz und Themen</h2>
              {de.setting ? (
                <p className="content-paragraph">
                  <strong>Schauplatz:</strong> {de.setting}
                </p>
              ) : null}
              {de.themes.length > 0 ? (
                <ul className="theme-list">
                  {de.themes.map((theme) => (
                    <li key={theme}>{theme}</li>
                  ))}
                </ul>
              ) : null}
            </>
          ) : null}

          {isChapterBook ? (
            <>
              <h2 className="content-heading">Über den Autor</h2>
              <p className="content-paragraph">
                {author.name} wuchs in Zeeland auf, der Provinz, die in{" "}
                <em>{de.title}</em> zum Schauplatz wird. Mit fünfundzwanzig Jahren
                tauschte er Zeeland gegen Rotterdam. Die Stille der zeeländischen
                Küste und die Rauheit des Hafens bilden das Rückgrat seiner Arbeit,
                die unter {siteConfig.name} erscheint.
              </p>
            </>
          ) : null}
        </div>
      </section>

      {isChapterBook ? (
        <div className="container">
          <FirstChapterCTA source={`de-${de.slug}`} locale="de" />
        </div>
      ) : (
        <NewsletterSection
          id="wachtlijst"
          source={`de-${de.slug}`}
          book={de.title}
          locale="de"
        />
      )}

      <FaqSection
        items={de.faq}
        locale="de"
        title={`Häufige Fragen zu ${de.title}`}
      />
    </main>
  );
}
