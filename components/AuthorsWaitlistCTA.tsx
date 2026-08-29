import { NewsletterForm } from "./NewsletterForm";
import {
  englishNewsletterCopy,
  germanNewsletterCopy,
  type Locale,
} from "@/lib/i18n";

interface AuthorsWaitlistCTAProps {
  source: string;
  locale?: Locale;
}

const sectionIds: Record<Locale, string> = {
  nl: "interesse",
  en: "interested",
  de: "interesse",
};

function copyFor(locale: Locale) {
  if (locale === "en") {
    return {
      heading: "Interested?",
      body: "Leave your email address. I will let you know when the time comes. No newsletter, no selling, no obligations.",
      form: {
        ...englishNewsletterCopy,
        submit: "Keep me posted",
        success: "Noted. You will hear from me as soon as the label opens.",
        privacy: "I only use your address for this subject.",
      },
    };
  }

  if (locale === "de") {
    return {
      heading: "Interesse?",
      body: "Hinterlassen Sie Ihre E-Mail-Adresse. Sie hören von mir, sobald es so weit ist. Kein Newsletter, kein Verkauf, keine Verpflichtungen.",
      form: {
        ...germanNewsletterCopy,
        submit: "Halten Sie mich auf dem Laufenden",
        success: "Notiert. Sie hören von mir, sobald das Label öffnet.",
        privacy:
          "Ich verwende Ihre Adresse ausschließlich für dieses Thema.",
      },
    };
  }

  return {
    heading: "Interesse?",
    body: "Laat je e-mailadres achter. Je hoort het als het zover is. Geen nieuwsbrief, geen verkoop, geen verplichtingen.",
    form: {
      submit: "Houd me op de hoogte",
      success: "Genoteerd. Je hoort van me zodra het label opengaat.",
      privacy: "Ik gebruik je adres alleen voor dit onderwerp.",
    },
  };
}

/**
 * Compact sign-up block for the authors waitlist.
 * Reuses NewsletterForm. Contacts stay unsubscribed, like Chapter 1.
 */
export function AuthorsWaitlistCTA({
  source,
  locale = "nl",
}: AuthorsWaitlistCTAProps) {
  const t = copyFor(locale);

  return (
    <section
      id={sectionIds[locale]}
      className="content-section"
      aria-labelledby="authors-waitlist-heading"
    >
      <h2 id="authors-waitlist-heading" className="content-heading">
        {t.heading}
      </h2>
      <p className="content-paragraph">{t.body}</p>
      <NewsletterForm
        source={source}
        compact
        copy={t.form}
        leadMagnet="authors-waitlist"
        showMarketingConsent={false}
      />
    </section>
  );
}
