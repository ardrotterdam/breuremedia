/**
 * Navigatieknop: brengt de bezoeker naar het inschrijfformulier op
 * dezelfde pagina. Bewust een ander label dan de submitknop van het
 * formulier ("Ontvang bericht zodra het boek verschijnt"), zodat
 * navigeren en versturen niet dezelfde naam dragen.
 */
export function OrderButton() {
  return (
    <a href="#newsletter-heading" className="btn btn-primary">
      Meld je aan voor bericht bij verschijning
    </a>
  );
}
