import { NewsletterForm, type NewsletterFormCopy } from "./NewsletterForm";
import type { Locale } from "@/lib/i18n";

interface NewsletterSectionProps {
  source: string;
  /** Boektitel voor Web3Forms-metadata; standaard "Algemeen". */
  book?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Extra anker-id op de sectie (bijv. "wachtlijst" voor boek-CTA's). */
  id?: string;
  /** Overschrijf de formulierteksten (bijv. Engels op /en-pagina's). */
  formCopy?: Partial<NewsletterFormCopy>;
  locale?: Locale;
}

const sectionCopy: Record<
  Locale,
  { eyebrow: string; title: string; description: string }
> = {
  nl: {
    eyebrow: "Berichten uit Breure Media",
    title: "Nieuwe verhalen beginnen in stilte.",
    description:
      "Ontvang bericht wanneer een nieuwe publicatie, editie of bijzonder project verschijnt.",
  },
  en: {
    eyebrow: "From Breure Media",
    title: "New stories begin in silence.",
    description:
      "Get a message when a new publication, edition or special project is released.",
  },
  de: {
    eyebrow: "Breure Media",
    title: "Neue Geschichten beginnen in der Stille.",
    description:
      "Sie erhalten Nachricht, wenn eine neue Veröffentlichung, Ausgabe oder ein besonderes Projekt erscheint.",
  },
};

/**
 * Volledige nieuwsbrief-band met het Web3Forms-formulier. Anker-CTA's
 * verwijzen naar #newsletter-heading; plaats maximaal één per pagina.
 */
export function NewsletterSection({
  source,
  book,
  eyebrow,
  title,
  description,
  id,
  formCopy,
  locale = "nl",
}: NewsletterSectionProps) {
  const defaults = sectionCopy[locale];

  return (
    <section
      id={id}
      className="newsletter"
      aria-labelledby="newsletter-heading"
    >
      <div className="container newsletter-inner">
        <hr className="editorial-rule" aria-hidden="true" />
        <p className="section-eyebrow">{eyebrow ?? defaults.eyebrow}</p>
        <h2 id="newsletter-heading" className="section-title">
          {title ?? defaults.title}
        </h2>
        <p className="newsletter-description">
          {description ?? defaults.description}
        </p>
        <NewsletterForm source={source} book={book} copy={formCopy} newsletterSignup />
      </div>
    </section>
  );
}
