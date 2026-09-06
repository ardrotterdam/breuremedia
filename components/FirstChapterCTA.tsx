import { NewsletterForm } from "./NewsletterForm";
import {
  englishNewsletterCopy,
  germanNewsletterCopy,
  type Locale,
} from "@/lib/i18n";
import { getBookBySlug } from "@/data/books";

interface FirstChapterCTAProps {
  source: string;
  locale?: Locale;
  intro?: string;
}

const FEATURED_BOOK_SLUG = "schaduwen-over-domburg";

const sectionIds: Record<Locale, string> = {
  nl: "eerste-hoofdstuk",
  en: "first-chapter",
  de: "erstes-kapitel",
};

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
      body: "Rotterdam is the setting of my thriller series. Start with the first chapter. We will send it by email.",
      book: title,
      form: {
        ...englishNewsletterCopy,
        submit: "SEND THE CHAPTER",
        success: `Thank you. We have emailed you the first chapter of ${title}.`,
        privacy:
          "We send the chapter because you asked for it. That does not subscribe you to book news.",
        marketingConsent:
          "Also keep me informed about the release date and news about the book.",
      },
    };
  }

  if (locale === "de") {
    return {
      heading: `Lesen Sie das erste Kapitel von ${title} kostenlos`,
      body: "Die zeeländische Küste ist der Schauplatz von Schatten über Domburg. Beginnen Sie mit dem ersten Kapitel. Wir senden es per E-Mail.",
      book: title,
      form: {
        ...germanNewsletterCopy,
        submit: "KAPITEL SENDEN",
        success: `Danke. Wir haben Ihnen das erste Kapitel von ${title} per E-Mail geschickt.`,
        privacy:
          "Das Kapitel senden wir, weil Sie darum gebeten haben. Damit sind Sie nicht für den Newsletter angemeldet.",
        marketingConsent:
          "Informieren Sie mich auch über den Erscheinungstermin und Neuigkeiten zum Buch.",
      },
    };
  }

  return {
    heading: `Lees het eerste hoofdstuk van ${title} gratis`,
    body: "Rotterdam is het decor van mijn thrillerserie. Begin bij het eerste hoofdstuk. Je ontvangt het per e-mail.",
    book: title,
    form: {
      submit: "STUUR HET HOOFDSTUK",
      success: `Bedankt. We hebben je een e-mail gestuurd met het eerste hoofdstuk van ${title}.`,
      privacy:
        "We sturen het hoofdstuk omdat je erom vraagt. Daarmee schrijf je je niet in voor nieuws over het boek.",
      marketingConsent:
        "Houd mij ook op de hoogte van de verschijningsdatum en nieuws over het boek.",
    },
  };
}

/**
 * Compact sign-up block for the first chapter of Schaduwen over Domburg.
 * Reuses NewsletterForm. Marketing checkbox is off until Resend (or we)
 * support confirmed double opt-in; Chapter 1 is still sent immediately.
 */
export function FirstChapterCTA({
  source,
  locale = "nl",
  intro,
}: FirstChapterCTAProps) {
  const t = copyFor(locale);

  return (
    <section
      id={sectionIds[locale]}
      className="content-section"
      aria-labelledby="first-chapter-heading"
    >
      {intro ? <p className="content-paragraph">{intro}</p> : null}
      <h2 id="first-chapter-heading" className="content-heading">
        {t.heading}
      </h2>
      <p className="content-paragraph">{t.body}</p>
      <NewsletterForm
        source={source}
        book={t.book}
        compact
        copy={t.form}
        leadMagnet="chapter-1"
        showMarketingConsent={false}
      />
    </section>
  );
}
