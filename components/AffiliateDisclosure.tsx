export function AffiliateDisclosure({
  locale = "nl",
}: {
  locale?: "nl" | "en";
}) {
  return (
    <p className="affiliate-disclosure" role="note">
      {locale === "en" ? (
        <>
          As an Amazon Associate I earn from qualifying purchases. This costs
          you nothing extra.
        </>
      ) : (
        <>
          Als Amazon-partner verdien ik aan aankopen die aan de voorwaarden
          voldoen. Dit kost jou niets extra&apos;s.
        </>
      )}
    </p>
  );
}
