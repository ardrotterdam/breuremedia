"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeFromPathname } from "@/lib/i18n";

const copy = {
  nl: {
    title: "Pagina niet gevonden",
    description:
      "Deze pagina bestaat niet of is verplaatst. Keer terug naar het boek of de homepage.",
    home: "Naar de homepage",
    books: "Bekijk boeken",
    homeHref: "/",
    booksHref: "/boeken",
  },
  en: {
    title: "Page not found",
    description:
      "This page does not exist or has been moved. Return to the book or the homepage.",
    home: "Back to homepage",
    books: "Browse books",
    homeHref: "/en",
    booksHref: "/en/books",
  },
  de: {
    title: "Seite nicht gefunden",
    description:
      "Diese Seite existiert nicht oder wurde verschoben. Kehren Sie zum Buch oder zur Startseite zurück.",
    home: "Zur Startseite",
    books: "Bücher",
    homeHref: "/de",
    booksHref: "/de/schatten-ueber-domburg",
  },
} as const;

export default function NotFound() {
  const pathname = usePathname() ?? "/";
  const locale = localeFromPathname(pathname);
  const t = copy[locale];

  return (
    <main className="not-found" lang={locale}>
      <div className="container not-found-inner">
        <p className="section-eyebrow">404</p>
        <h1 className="page-title">{t.title}</h1>
        <p className="page-description">{t.description}</p>
        <div className="not-found-actions">
          <Link href={t.homeHref} className="btn btn-primary">
            {t.home}
          </Link>
          <Link href={t.booksHref} className="btn btn-secondary">
            {t.books}
          </Link>
        </div>
      </div>
    </main>
  );
}
