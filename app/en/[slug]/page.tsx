import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BookHero } from "@/components/BookHero";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { NewsletterSection } from "@/components/NewsletterSection";
import { getBookByEnglishSlug, getEnglishBooks, type Book } from "@/data/books";
import { bookPageTitle, buildMetadata } from "@/lib/seo";
import { author, siteConfig } from "@/lib/site";
import { englishNewsletterCopy } from "@/lib/i18n";
import {
  breadcrumbSchema,
  buildJsonLd,
  englishBookSchema,
  faqSchema,
  personSchema,
} from "@/lib/schema";

interface EnglishBookPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getEnglishBooks().map((book) => ({ slug: book.en.slug }));
}

export async function generateMetadata({
  params,
}: EnglishBookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookByEnglishSlug(slug);

  if (!book) {
    return { title: "Page not found" };
  }

  const en = book.en;

  return buildMetadata({
    title: bookPageTitle(en.title, book.author),
    description: en.description,
    path: `/en/${en.slug}`,
    image: en.coverImage ?? book.coverImage,
    imageAlt: en.coverAlt,
    type: "article",
    keywords: en.keywords,
    locale: "en_US",
    languages: {
      nl: `/boeken/${book.slug}`,
      en: `/en/${en.slug}`,
      "x-default": `/en/${en.slug}`,
    },
  });
}

export default async function EnglishBookPage({ params }: EnglishBookPageProps) {
  const { slug } = await params;
  const book = getBookByEnglishSlug(slug);

  if (!book) {
    notFound();
  }

  const en = book.en;

  // Localised view of the book for the shared hero, using the English text and
  // an English-formatted price. Format/price stay shared; cover may be EN-specific.
  const localizedBook: Book = {
    ...book,
    title: en.title,
    subtitle: en.subtitle,
    tagline: en.tagline,
    description: en.description,
    longDescription: en.longDescription,
    coverImage: en.coverImage ?? book.coverImage,
    coverAlt: en.coverAlt,
    formatNote: en.formatNote,
    priceFormatted: "€29.95",
  };

  const breadcrumbs = [
    { name: "Home", path: "/en" },
    { name: "Books", path: "/en/books" },
    { name: en.title, path: `/en/${en.slug}` },
  ];

  const jsonLd = buildJsonLd(
    englishBookSchema(book),
    personSchema("Author"),
    breadcrumbSchema(breadcrumbs),
    faqSchema(en.faq)
  );

  return (
    <main lang="en">
      <JsonLd data={jsonLd} />
      <BookHero
        book={localizedBook}
        priority
        orderLabel="Sign up to be notified on release"
      />

      <section className="book-detail" aria-labelledby="book-about-heading">
        <div className="container book-detail-inner">
          <Breadcrumbs items={breadcrumbs} />

          <p className="content-meta">
            <Link href={`/boeken/${book.slug}`} className="text-link">
              Lees deze pagina in het Nederlands
            </Link>
          </p>

          <h2 id="book-about-heading" className="section-title">
            About this book
          </h2>
          {en.longDescription.map((paragraph) => (
            <p key={paragraph} className="content-paragraph">
              {paragraph}
            </p>
          ))}

          <h2 className="content-heading">Setting and themes</h2>
          <p className="content-paragraph">
            <strong>Setting:</strong> {en.setting}
          </p>
          <ul className="theme-list">
            {en.themes.map((theme) => (
              <li key={theme}>{theme}</li>
            ))}
          </ul>

          <h2 className="content-heading">About the author</h2>
          <p className="content-paragraph">
            {author.name} grew up in Zeeland — the province he turns into the
            setting of <em>{en.title}</em>. At twenty-five he traded Zeeland for
            Rotterdam, where he has lived ever since. The stillness of the
            Zeeland coast and the rawness of the harbour form the backbone of
            his work, published under the {siteConfig.name} imprint.
          </p>
        </div>
      </section>

      <NewsletterSection
        id="wachtlijst"
        source={`en-${en.slug}`}
        book={en.title}
        eyebrow="Waiting list"
        title="Be the first to know when the book is released"
        description={`Leave your email address and we'll let you know the moment ${en.title} is available — including the release date and an exclusive preview.`}
        formCopy={englishNewsletterCopy}
      />

      <FaqSection
        items={en.faq}
        eyebrow="Reader questions"
        title={`Frequently asked questions about ${en.title}`}
      />
    </main>
  );
}
