interface AffiliateButtonProps {
  amazonUrl?: string;
}

export function AffiliateButton({ amazonUrl }: AffiliateButtonProps) {
  if (!amazonUrl) {
    return null;
  }

  return (
    <a
      href={amazonUrl}
      className="btn btn-primary"
      rel="nofollow sponsored noopener"
      target="_blank"
    >
      Bekijk op Amazon
    </a>
  );
}
