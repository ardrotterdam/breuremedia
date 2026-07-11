import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="container not-found-inner">
        <p className="section-eyebrow">404</p>
        <h1 className="page-title">Pagina niet gevonden</h1>
        <p className="page-description">
          Deze pagina bestaat niet of is verplaatst. Keer terug naar het boek
          of de homepage.
        </p>
        <div className="not-found-actions">
          <Link href="/" className="btn btn-primary">
            Naar de homepage
          </Link>
          <Link href="/boeken" className="btn btn-secondary">
            Bekijk boeken
          </Link>
        </div>
      </div>
    </main>
  );
}
