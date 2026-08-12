"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  navLinks,
  siteConfig,
  type NavChild,
  type NavDropdownItem,
  type NavItem,
} from "@/lib/site";
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

function childLinkHrefs(children: readonly NavChild[]): string[] {
  return children
    .filter((child): child is Extract<NavChild, { type: "link" }> => child.type === "link")
    .map((child) => child.href);
}

function isPathActive(pathname: string, href: string): boolean {
  if (href === "/" || href === "/en") {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isDropdownActive(pathname: string, item: NavDropdownItem): boolean {
  if (isPathActive(pathname, item.href)) {
    return true;
  }
  return childLinkHrefs(item.children).some((href) => isPathActive(pathname, href));
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBooksOpen, setIsBooksOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const booksMenuId = useId();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const booksButtonRef = useRef<HTMLButtonElement>(null);

  const locale = localeFromPathname(pathname);
  const links = locale === "en" ? enNavLinks : navLinks;
  const t = headerCopy[locale];
  const homeHref = locale === "en" ? "/en" : "/";
  const otherHref = counterpartPath(pathname);

  const closeBooks = useCallback(() => setIsBooksOpen(false), []);

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

  // Close dropdowns on route change.
  useEffect(() => {
    setIsOpen(false);
    setIsBooksOpen(false);
  }, [pathname]);

  // Click-outside + Escape for the books dropdown (desktop + mobile).
  useEffect(() => {
    if (!isBooksOpen) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsBooksOpen(false);
      }
    };

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsBooksOpen(false);
        booksButtonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isBooksOpen]);

  const closeMobile = () => {
    setIsOpen(false);
    setIsBooksOpen(false);
  };

  const focusChildLink = (index: number) => {
    const panel = dropdownRef.current?.querySelector<HTMLElement>(".nav-dropdown-panel");
    const items = panel?.querySelectorAll<HTMLElement>("a[role='menuitem']");
    if (!items || items.length === 0) return;
    const clamped = ((index % items.length) + items.length) % items.length;
    items[clamped]?.focus();
  };

  const onBooksButtonKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsBooksOpen(true);
      requestAnimationFrame(() => focusChildLink(0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setIsBooksOpen(true);
      requestAnimationFrame(() => focusChildLink(-1));
    } else if (event.key === "Escape") {
      closeBooks();
    }
  };

  const onPanelKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>("a[role='menuitem']")
    );
    const currentIndex = items.indexOf(document.activeElement as HTMLElement);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = currentIndex < 0 ? 0 : (currentIndex + 1) % items.length;
      items[next]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const next =
        currentIndex < 0
          ? items.length - 1
          : (currentIndex - 1 + items.length) % items.length;
      items[next]?.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      items[0]?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      items[items.length - 1]?.focus();
    } else if (event.key === "Escape") {
      event.preventDefault();
      closeBooks();
      booksButtonRef.current?.focus();
    }
  };

  const renderChild = (child: NavChild, index: number) => {
    if (child.type === "divider") {
      return (
        <div
          key={`divider-${index}`}
          className="nav-dropdown-divider"
          role="separator"
        />
      );
    }

    if (child.type === "label") {
      return (
        <p key={`label-${child.label}`} className="nav-dropdown-label">
          {child.label}
        </p>
      );
    }

    const active = isPathActive(pathname, child.href);
    return (
      <Link
        key={child.href}
        href={child.href}
        role="menuitem"
        aria-current={active ? "page" : undefined}
        className="nav-dropdown-link"
        onClick={closeMobile}
      >
        {child.label}
      </Link>
    );
  };

  const renderItem = (item: NavItem) => {
    if (item.type === "link") {
      const active = isPathActive(pathname, item.href);
      return (
        <Link
          key={item.href}
          href={item.href}
          aria-current={active ? "page" : undefined}
          onClick={closeMobile}
        >
          {item.label}
        </Link>
      );
    }

    const active = isDropdownActive(pathname, item);
    return (
      <div
        key={item.label}
        className={`nav-dropdown${isBooksOpen ? " is-open" : ""}${active ? " is-active" : ""}`}
        ref={dropdownRef}
        onMouseEnter={() => {
          if (window.matchMedia("(min-width: 1360px)").matches) {
            setIsBooksOpen(true);
          }
        }}
        onMouseLeave={() => {
          if (window.matchMedia("(min-width: 1360px)").matches) {
            setIsBooksOpen(false);
          }
        }}
      >
        <button
          ref={booksButtonRef}
          type="button"
          className="nav-dropdown-trigger"
          aria-expanded={isBooksOpen}
          aria-haspopup="menu"
          aria-controls={booksMenuId}
          aria-current={active ? "true" : undefined}
          onClick={() => setIsBooksOpen((prev) => !prev)}
          onKeyDown={onBooksButtonKeyDown}
        >
          {item.label}
          <span className="nav-dropdown-caret" aria-hidden="true" />
        </button>
        <div
          id={booksMenuId}
          className="nav-dropdown-panel"
          role="menu"
          aria-label={t.booksMenu}
          hidden={!isBooksOpen}
          onKeyDown={onPanelKeyDown}
        >
          <div className="nav-dropdown-panel-inner">
            {item.children.map(renderChild)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
      <div className="container header-inner">
        <Link href={homeHref} className="logo" onClick={closeMobile}>
          {siteConfig.name}
        </Link>
        <nav
          className={`nav${isOpen ? " is-open" : ""}`}
          aria-label={t.navLabel}
          lang={locale}
        >
          {links.map(renderItem)}
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
                onClick={closeMobile}
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
                onClick={closeMobile}
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
          onClick={() => {
            setIsOpen((prev) => {
              if (prev) setIsBooksOpen(false);
              return !prev;
            });
          }}
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
