import type { Locale } from "@/lib/i18n";

export function AffiliateDisclosure({
  locale = "nl",
}: {
  locale?: Locale;
}) {
  const text =
    locale === "en"
      ? "As an Amazon Associate I earn from qualifying purchases. This costs you nothing extra."
      : locale === "de"
        ? "Als Amazon-Partner verdiene ich an qualifizierten Käufen. Das kostet Sie nichts extra."
        : "Als Amazon-partner verdien ik aan aankopen die aan de voorwaarden voldoen. Dit kost jou niets extra's.";

  return (
    <p className="affiliate-disclosure" role="note">
      {text}
    </p>
  );
}
