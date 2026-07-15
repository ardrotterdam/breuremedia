"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, siteConfig } from "@/lib/site";

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

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
      <div className="container header-inner">
        <Link href="/" className="logo" onClick={() => setIsOpen(false)}>
          {siteConfig.name}
        </Link>
        <nav className={`nav${isOpen ? " is-open" : ""}`} aria-label="Hoofdnavigatie">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          className="nav-toggle"
          aria-label={isOpen ? "Menu sluiten" : "Menu openen"}
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
