interface AffiliateButtonProps {
  amazonUrl?: string;
  naam?: string;
}

export function AffiliateButton({ amazonUrl, naam }: AffiliateButtonProps) {
  if (!amazonUrl) {
    return null;
  }

  return (
    <a
      href={amazonUrl}
      className="btn btn-primary"
      rel="nofollow sponsored noopener"
      target="_blank"
      aria-label={naam ? `Bekijk ${naam} op Amazon` : "Bekijk op Amazon"}
    >
      Bekijk op Amazon
    </a>
  );
}
