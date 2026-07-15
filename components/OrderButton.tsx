/**
 * Navigatieknop: brengt de bezoeker naar het inschrijfformulier op
 * dezelfde pagina. Bewust een ander label dan de submitknop van het
 * formulier ("Ontvang bericht zodra het boek verschijnt"), zodat
 * navigeren en versturen niet dezelfde naam dragen.
 */
interface OrderButtonProps {
  /** Anker van het inschrijfformulier op de huidige pagina. */
  href?: string;
}

export function OrderButton({ href = "#newsletter-heading" }: OrderButtonProps) {
  return (
    <a href={href} className="btn btn-primary btn-cta btn-shine">
      Meld je aan voor bericht bij verschijning
    </a>
  );
}
