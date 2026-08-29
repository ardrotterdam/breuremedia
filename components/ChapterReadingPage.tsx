import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { NewsletterForm } from "@/components/NewsletterForm";
import { OrderButton } from "@/components/OrderButton";
import { getChapter1 } from "@/data/chapter-1";
import type { Locale } from "@/lib/i18n";

const copy: Record<
  Locale,
  {
    eyebrow: string;
    kicker: string;
    back: string;
    lang: string;
    closing: string;
    order: string;
    formHeading: string;
    source: string;
  }
> = {
  nl: {
    eyebrow: "Hoofdstuk 1",
    kicker: "Een voorpublicatie van",
    back: "Terug naar het boek",
    lang: "nl",
    closing:
      "Dit was het eerste hoofdstuk. De rest van het verhaal speelt zich af tussen de Rotterdamse haven en de kust van Zeeland. Als u wilt weten hoe het verdergaat, vindt u het boek hieronder.",
    order: "Bestel het boek",
    formHeading: "Wilt u horen wanneer het boek verschijnt?",
    source: "chapter-1-reader-nl",
  },
  en: {
    eyebrow: "Chapter 1",
    kicker: "A preview from",
    back: "Back to the book",
    lang: "en",
    closing:
      "This was the first chapter. The rest of the story takes place between the Port of Rotterdam and the coast of Zeeland. If you want to know how it continues, you will find the book below.",
    order: "Order the book",
    formHeading: "Want to hear when the book is out?",
    source: "chapter-1-reader-en",
  },
  de: {
    eyebrow: "Kapitel 1",
    kicker: "Eine Vorveröffentlichung aus",
    back: "Zurück zum Buch",
    lang: "de",
    closing:
      "Das war das erste Kapitel. Der Rest der Geschichte spielt sich zwischen dem Rotterdamer Hafen und der Küste Zeelands ab. Wenn Sie wissen möchten, wie es weitergeht, finden Sie das Buch weiter unten.",
    order: "Das Buch bestellen",
    formHeading: "Möchten Sie erfahren, wann das Buch erscheint?",
    source: "chapter-1-reader-de",
  },
};

export function ChapterReadingPage({ locale }: { locale: Locale }) {
  const chapter = getChapter1(locale);
  const t = copy[locale];
  const breadcrumbs = [
    { name: "Home", path: locale === "nl" ? "/" : `/${locale}` },
    { name: chapter.bookTitle, path: chapter.bookPath },
    { name: t.eyebrow, path: chapter.path },
  ];

  return (
    <main lang={t.lang}>
      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} locale={locale} />

        <article className="content-section chapter-prose">
          <p className="section-eyebrow">{t.eyebrow}</p>
          <h1 className="content-heading chapter-title">{chapter.title}</h1>
          <p className="content-meta">
            {t.kicker} <em>{chapter.bookTitle}</em>
          </p>

          {chapter.blocks.map((block, index) => {
            if (block.type === "hr") {
              return (
                <hr
                  key={`hr-${index}`}
                  className="editorial-rule"
                  aria-hidden="true"
                />
              );
            }

            if (block.type === "em") {
              return (
                <p key={index} className="content-paragraph">
                  <em>{block.text}</em>
                </p>
              );
            }

            return (
              <p key={index} className="content-paragraph">
                {block.text}
              </p>
            );
          })}
        </article>

        <section className="content-section">
          <p className="content-paragraph">{t.closing}</p>
          <OrderButton
            href={chapter.bookPath}
            label={t.order}
            locale={locale}
          />
        </section>

        <section className="content-section" aria-labelledby="chapter-opt-in-heading">
          <h2 id="chapter-opt-in-heading" className="content-heading">
            {t.formHeading}
          </h2>
          <NewsletterForm
            source={t.source}
            book={chapter.bookTitle}
            compact
            showMarketingConsent={true}
          />
          <p className="content-paragraph">
            <Link href={chapter.bookPath} className="text-link">
              {t.back}
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
