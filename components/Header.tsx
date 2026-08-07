"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, siteConfig } from "@/lib/site";
import {
  counterpartPath,
  enNavLinks,
  headerCopy,
  localeFromPathname,
} from "@/lib/i18n";

/*
 * Kalme sinusachtige golf: één kwadratische curve gevolgd door
 * gespiegelde t-segmenten. Golflengte 320px, amplitude ~1.25px
 * (piek-dal 2.5px). Breedte 4960px zodat de tide-shift van 160px
 * ook op 4K-schermen nooit een rand toont.
 */
const WATERLINE_PATH = "M0 3.5 q80 -2.5 160 0" + " t160 0".repeat(30);

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const locale = localeFromPathname(pathname);
  const links = locale === "en" ? enNavLinks : navLinks;
  const t = headerCopy[locale];
  const homeHref = locale === "en" ? "/en" : "/";
  const otherHref = counterpartPath(pathname);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      setIsScrolled(window.scrollY > 50);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/" || href === "/en") {
      return pathname === href;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
      <div className="container header-inner">
        <Link href={homeHref} className="logo" onClick={() => setIsOpen(false)}>
          {siteConfig.name}
        </Link>
        <nav
          className={`nav${isOpen ? " is-open" : ""}`}
          aria-label={t.navLabel}
          lang={locale}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <span className="lang-switch" aria-label="Taal / Language">
            {locale === "nl" ? (
              <span className="lang-current" aria-current="true">
                NL
              </span>
            ) : (
              <Link
                href={otherHref}
                hrefLang="nl"
                className="lang-link"
                onClick={() => setIsOpen(false)}
              >
                NL
              </Link>
            )}
            <span className="lang-sep" aria-hidden="true">
              ·
            </span>
            {locale === "en" ? (
              <span className="lang-current" aria-current="true">
                EN
              </span>
            ) : (
              <Link
                href={otherHref}
                hrefLang="en"
                className="lang-link"
                onClick={() => setIsOpen(false)}
              >
                EN
              </Link>
            )}
          </span>
        </nav>
        <button
          className="nav-toggle"
          aria-label={isOpen ? t.closeMenu : t.openMenu}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <div className="waterline" aria-hidden="true">
        <svg
          className="waterline-svg"
          width="4960"
          height="7"
          viewBox="0 0 4960 7"
          fill="none"
        >
          <path d={WATERLINE_PATH} stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
    </header>
  );
}
