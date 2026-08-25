import { NewsletterForm } from "./NewsletterForm";
import {
  englishNewsletterCopy,
  germanNewsletterCopy,
  type Locale,
} from "@/lib/i18n";
import { getBookBySlug } from "@/data/books";

interface FirstChapterCTAProps {
  /** Herkomst van de inschrijving, wordt meegestuurd naar Web3Forms. */
  source: string;
  locale?: Locale;
}

const FEATURED_BOOK_SLUG = "schaduwen-over-domburg";

function bookTitleForLocale(locale: Locale): string {
  const book = getBookBySlug(FEATURED_BOOK_SLUG);
  if (locale === "en") {
    return book?.en?.title ?? book?.title ?? "Shadows over Domburg";
  }
  if (locale === "de") {
    return book?.de?.title ?? "Schatten über Domburg";
  }
  return book?.title ?? "Schaduwen over Domburg";
}

function copyFor(locale: Locale) {
  const title = bookTitleForLocale(locale);

  if (locale === "en") {
    return {
      heading: `Read the first chapter of ${title} for free`,
      body: "Rotterdam is the setting of my thriller series. Start with the first chapter — we'll send it by email.",
      book: title,
      form: {
        ...englishNewsletterCopy,
        submit: "SEND THE CHAPTER",
        success: `Thank you. We'll send you the first chapter of ${title}.`,
      },
    };
  }

  if (locale === "de") {
    return {
      heading: `Lesen Sie das erste Kapitel von ${title} kostenlos`,
      body: `Die zeeländische Küste ist der Schauplatz von ${title}. Beginnen Sie mit dem ersten Kapitel. Wir senden es per E-Mail. Sie erfahren außerdem als Erster den Erscheinungstermin.`,
      book: title,
      form: {
        ...germanNewsletterCopy,
        submit: "KAPITEL SENDEN",
        success: `Danke. Wir senden Ihnen das erste Kapitel von ${title}.`,
      },
    };
  }

  return {
    heading: `Lees het eerste hoofdstuk van ${title} gratis`,
    body: "Rotterdam is het decor van mijn thrillerserie. Begin bij het eerste hoofdstuk — je ontvangt het per e-mail.",
    book: title,
    form: {
      submit: "STUUR HET HOOFDSTUK",
      success: `Bedankt. We sturen je het eerste hoofdstuk van ${title}.`,
    },
  };
}

/**
 * Compact aanmeldblok voor het eerste hoofdstuk van Schaduwen over Domburg.
 * Hergebruikt NewsletterForm; plaats vóór gerelateerde artikelen.
 */
export function FirstChapterCTA({
  source,
  locale = "nl",
}: FirstChapterCTAProps) {
  const t = copyFor(locale);

  return (
    <section
      className="content-section"
      aria-labelledby="first-chapter-heading"
    >
      <h2 id="first-chapter-heading" className="content-heading">
        {t.heading}
      </h2>
      <p className="content-paragraph">{t.body}</p>
      <NewsletterForm
        source={source}
        book={t.book}
        compact
        copy={t.form}
      />
    </section>
  );
}
