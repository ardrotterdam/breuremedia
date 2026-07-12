import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-colophon">
        <hr className="editorial-rule editorial-rule--footer" aria-hidden="true" />
        <p className="footer-brand-name">{siteConfig.name}</p>
        <p className="footer-tagline">
          Onafhankelijk label voor boeken en oorspronkelijke verhalen.
        </p>
        <nav className="footer-nav" aria-label="Voettekstnavigatie">
          <Link href="/boeken">Boeken</Link>
          <Link href="/e-readers">E-readers</Link>
          <Link href="/boeken-over-rotterdam">Boeken over Rotterdam</Link>
          <Link href="/over-de-auteur">Over de auteur</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
        <div className="footer-details">
          <p>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
          <p>{siteConfig.country}</p>
        </div>
        <p className="footer-legal">
          &copy; {year} {siteConfig.name}. Alle rechten voorbehouden.
        </p>
      </div>
    </footer>
  );
}
