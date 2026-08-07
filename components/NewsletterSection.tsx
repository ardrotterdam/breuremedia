import { NewsletterForm, type NewsletterFormCopy } from "./NewsletterForm";

interface NewsletterSectionProps {
  source: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Overschrijf de formulierteksten (bijv. Engels op /en-pagina's). */
  formCopy?: Partial<NewsletterFormCopy>;
}

/**
 * Volledige nieuwsbrief-band met het Web3Forms-formulier. Anker-CTA's
 * verwijzen naar #newsletter-heading; plaats maximaal één per pagina.
 */
export function NewsletterSection({
  source,
  eyebrow = "Berichten uit Breure Media",
  title = "Nieuwe verhalen beginnen in stilte.",
  description = "Ontvang bericht wanneer een nieuwe publicatie, editie of bijzonder project verschijnt.",
  formCopy,
}: NewsletterSectionProps) {
  return (
    <section className="newsletter" aria-labelledby="newsletter-heading">
      <div className="container newsletter-inner">
        <hr className="editorial-rule" aria-hidden="true" />
        <p className="section-eyebrow">{eyebrow}</p>
        <h2 id="newsletter-heading" className="section-title">
          {title}
        </h2>
        <p className="newsletter-description">{description}</p>
        <NewsletterForm source={source} copy={formCopy} />
      </div>
    </section>
  );
}
