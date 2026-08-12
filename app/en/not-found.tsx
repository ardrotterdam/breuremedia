import Link from "next/link";

export default function EnglishNotFound() {
  return (
    <main className="not-found" lang="en">
      <div className="container not-found-inner">
        <p className="section-eyebrow">404</p>
        <h1 className="page-title">Page not found</h1>
        <p className="page-description">
          This page does not exist or has been moved. Return to the book or the
          homepage.
        </p>
        <div className="not-found-actions">
          <Link href="/en" className="btn btn-primary">
            Back to homepage
          </Link>
          <Link href="/en/books" className="btn btn-secondary">
            Browse books
          </Link>
        </div>
      </div>
    </main>
  );
}
