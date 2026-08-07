"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";
import { footerCopy, localeFromPathname } from "@/lib/i18n";

export function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const t = footerCopy[locale];

  return (
    <footer className="site-footer" lang={locale}>
      <div className="container footer-colophon">
        <hr className="editorial-rule editorial-rule--footer" aria-hidden="true" />
        <p className="footer-brand-name">{siteConfig.name}</p>
        <p className="footer-tagline">{t.tagline}</p>
        <nav className="footer-nav" aria-label={t.navLabel}>
          {t.nav.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="footer-details">
          <p>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
          <p>{t.country}</p>
        </div>
        <p className="footer-legal">
          &copy; {year} {siteConfig.name}. {t.rights}
        </p>
      </div>
    </footer>
  );
}
