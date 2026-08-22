import Link from "next/link";

export default function GermanNotFound() {
  return (
    <main className="not-found" lang="de">
      <div className="container not-found-inner">
        <p className="section-eyebrow">404</p>
        <h1 className="page-title">Seite nicht gefunden</h1>
        <p className="page-description">
          Diese Seite existiert nicht oder wurde verschoben. Kehren Sie zum Buch
          oder zur Startseite zurück.
        </p>
        <div className="not-found-actions">
          <Link href="/de" className="btn btn-primary">
            Zur Startseite
          </Link>
          <Link href="/de/schatten-ueber-domburg" className="btn btn-secondary">
            Bücher
          </Link>
        </div>
      </div>
    </main>
  );
}
