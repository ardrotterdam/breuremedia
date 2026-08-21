import { NewsletterForm } from "./NewsletterForm";
import { englishNewsletterCopy, type Locale } from "@/lib/i18n";

interface FirstChapterCTAProps {
  /** Herkomst van de inschrijving, wordt meegestuurd naar Web3Forms. */
  source: string;
  locale?: Locale;
}

const copy = {
  nl: {
    heading: "Lees het eerste hoofdstuk van Schaduwen over Domburg gratis",
    body: "Rotterdam is het decor van mijn thrillerserie. Begin bij het eerste hoofdstuk — je ontvangt het per e-mail.",
    form: {
      submit: "STUUR HET HOOFDSTUK",
      success:
        "Bedankt. We sturen je het eerste hoofdstuk van Schaduwen over Domburg.",
    },
  },
  en: {
    heading: "Read the first chapter of Schaduwen over Domburg for free",
    body: "Rotterdam is the setting of my thriller series. Start with the first chapter — we'll send it by email.",
    form: {
      ...englishNewsletterCopy,
      submit: "SEND THE CHAPTER",
      success:
        "Thank you. We'll send you the first chapter of Schaduwen over Domburg.",
    },
  },
} as const;

/**
 * Compact aanmeldblok voor het eerste hoofdstuk van Schaduwen over Domburg.
 * Hergebruikt NewsletterForm; plaats vóór gerelateerde artikelen.
 */
export function FirstChapterCTA({
  source,
  locale = "nl",
}: FirstChapterCTAProps) {
  const t = copy[locale];

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
        book="Schaduwen over Domburg"
        compact
        copy={t.form}
      />
    </section>
  );
}
