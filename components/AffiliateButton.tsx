import type { Locale } from "@/lib/i18n";

interface AffiliateButtonProps {
  amazonUrl?: string;
  naam?: string;
  label?: string;
  compact?: boolean;
  locale?: Locale;
}

const fallbackLabels: Record<Locale, string> = {
  nl: "Bekijk op Amazon",
  en: "View on Amazon",
  de: "Bei Amazon ansehen",
};

function namedLabel(naam: string, locale: Locale): string {
  if (locale === "en") {
    return `View ${naam} on Amazon`;
  }
  if (locale === "de") {
    return `${naam} bei Amazon ansehen`;
  }
  return `Bekijk ${naam} op Amazon`;
}

export function AffiliateButton({
  amazonUrl,
  naam,
  label,
  compact = false,
  locale = "nl",
}: AffiliateButtonProps) {
  if (!amazonUrl) {
    return null;
  }

  const buttonLabel =
    label ?? (naam ? namedLabel(naam, locale) : fallbackLabels[locale]);

  return (
    <a
      href={amazonUrl}
      className="btn btn-primary btn-shine"
      rel="nofollow sponsored noopener noreferrer"
      target="_blank"
      aria-label={buttonLabel}
      style={
        compact
          ? { padding: "0.625rem 1.25rem", fontSize: "0.75rem" }
          : undefined
      }
    >
      {buttonLabel}
    </a>
  );
}
