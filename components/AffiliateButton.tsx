interface AffiliateButtonProps {
  amazonUrl?: string;
  naam?: string;
  label?: string;
  compact?: boolean;
}

export function AffiliateButton({
  amazonUrl,
  naam,
  label,
  compact = false,
}: AffiliateButtonProps) {
  if (!amazonUrl) {
    return null;
  }

  const buttonLabel =
    label ?? (naam ? `Bekijk ${naam} op Amazon` : "Bekijk op Amazon");

  return (
    <a
      href={amazonUrl}
      className="btn btn-primary"
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
