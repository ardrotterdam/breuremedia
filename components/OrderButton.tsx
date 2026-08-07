/**
 * Navigatieknop: brengt de bezoeker naar het inschrijfformulier op
 * dezelfde pagina. Bewust een ander label dan de submitknop van het
 * formulier ("Ontvang bericht zodra het boek verschijnt"), zodat
 * navigeren en versturen niet dezelfde naam dragen.
 */
interface OrderButtonProps {
  /** Anker van het inschrijfformulier op de huidige pagina. */
  href?: string;
  /** Knoptekst; standaard Nederlands. Geef Engels mee op /en-pagina's. */
  label?: string;
}

export function OrderButton({
  href = "#newsletter-heading",
  label = "Meld je aan voor bericht bij verschijning",
}: OrderButtonProps) {
  return (
    <a href={href} className="btn btn-primary btn-cta btn-shine">
      {label}
    </a>
  );
}
