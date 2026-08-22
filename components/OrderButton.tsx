/**
 * Navigatieknop: brengt de bezoeker naar het inschrijfformulier op
 * dezelfde pagina. Bewust een ander label dan de submitknop van het
 * formulier ("Ontvang bericht zodra het boek verschijnt"), zodat
 * navigeren en versturen niet dezelfde naam dragen.
 */
import type { Locale } from "@/lib/i18n";

interface OrderButtonProps {
  /** Anker van het inschrijfformulier op de huidige pagina. */
  href?: string;
  /** Knoptekst; overschrijft het locale-default. */
  label?: string;
  locale?: Locale;
}

const labels: Record<Locale, string> = {
  nl: "Meld je aan voor bericht bij verschijning",
  en: "Sign up to be notified on release",
  de: "Bei Erscheinen benachrichtigen",
};

export function OrderButton({
  href = "#newsletter-heading",
  label,
  locale = "nl",
}: OrderButtonProps) {
  return (
    <a href={href} className="btn btn-primary btn-cta btn-shine">
      {label ?? labels[locale]}
    </a>
  );
}
