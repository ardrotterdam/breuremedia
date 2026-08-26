import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getChapter1 } from "@/data/chapter-1";
import type { Locale } from "@/lib/i18n";

const copy: Record<
  Locale,
  {
    eyebrow: string;
    kicker: string;
    back: string;
    lang: string;
  }
> = {
  nl: {
    eyebrow: "Hoofdstuk 1",
    kicker: "Een voorpublicatie van",
    back: "Terug naar het boek",
    lang: "nl",
  },
  en: {
    eyebrow: "Chapter 1",
    kicker: "A preview from",
    back: "Back to the book",
    lang: "en",
  },
  de: {
    eyebrow: "Kapitel 1",
    kicker: "Eine Vorveröffentlichung aus",
    back: "Zurück zum Buch",
    lang: "de",
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

        <p className="content-paragraph">
          <Link href={chapter.bookPath} className="text-link">
            {t.back}
          </Link>
        </p>
      </div>
    </main>
  );
}
