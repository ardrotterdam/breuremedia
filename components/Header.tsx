"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import Image from "next/image";
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
  deNavLinks,
  enNavLinks,
  headerCopy,
  homePaths,
  localeFromPathname,
  type Locale,
} from "@/lib/i18n";

/*
 * Kalme sinusachtige golf: één kwadratische curve gevolgd door
 * gespiegelde t-segmenten. Golflengte 320px, amplitude ~1.25px
 * (piek-dal 2.5px). Breedte 4960px zodat de tide-shift van 160px
 * ook op 4K-schermen nooit een rand toont.
 */
const WATERLINE_PATH = "M0 3.5 q80 -2.5 160 0" + " t160 0".repeat(30);

const DESKTOP_MQ = "(min-width: 1100px)";
const HOVER_MQ = "(hover: hover) and (pointer: fine)";

type NavLinkChild = Extract<NavChild, { type: "link" }>;

interface MegaGroups {
  explore: NavLinkChild[];
  featured: NavLinkChild[];
  themes: NavLinkChild[];
}

function isDesktopNav(): boolean {
  return window.matchMedia(DESKTOP_MQ).matches;
}

function isHoverNav(): boolean {
  return isDesktopNav() && window.matchMedia(HOVER_MQ).matches;
}

function childLinkHrefs(children: readonly NavChild[]): string[] {
  return children
    .filter((child): child is NavLinkChild => child.type === "link")
    .map((child) => child.href);
}

function isPathActive(pathname: string, href: string): boolean {
  if (href === "/" || href === "/en" || href === "/de") {
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

function splitMegaChildren(children: readonly NavChild[]): MegaGroups {
  const explore: NavLinkChild[] = [];
  const featured: NavLinkChild[] = [];
  const themes: NavLinkChild[] = [];
  let bucket: "explore" | "featured" | "themes" = "explore";

  for (const child of children) {
    if (child.type === "divider") continue;
    if (child.type === "label") {
      const key = child.label.toLowerCase();
      if (key.includes("titel") || key === "titles") bucket = "featured";
      else if (key.includes("thema") || key === "themes") bucket = "themes";
      continue;
    }
    if (child.coverImage) {
      featured.push(child);
      continue;
    }
    if (bucket === "themes") themes.push(child);
    else if (bucket === "featured") featured.push(child);
    else explore.push(child);
  }

  return { explore, featured, themes };
}

const LANG_SWITCH_ITEMS: readonly { code: Locale; label: string }[] = [
  { code: "nl", label: "NL" },
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
];

function LangSwitch({
  locale,
  pathname,
  onNavigate,
}: {
  locale: Locale;
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <span className="lang-switch" aria-label="Taal / Language / Sprache">
      {LANG_SWITCH_ITEMS.map((item, index) => (
        <Fragment key={item.code}>
          {index > 0 ? (
            <span className="lang-sep" aria-hidden="true">
              ·
            </span>
          ) : null}
          {locale === item.code ? (
            <span className="lang-current" aria-current="true">
              {item.label}
            </span>
          ) : (
            <Link
              href={counterpartPath(pathname, item.code)}
              hrefLang={item.code}
              className="lang-link"
              onClick={onNavigate}
            >
              {item.label}
            </Link>
          )}
        </Fragment>
      ))}
    </span>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBooksOpen, setIsBooksOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [track, setTrack] = useState({ x: 0, w: 0, visible: false });
  const [trackReady, setTrackReady] = useState(false);
  const pathname = usePathname();
  const booksMenuId = useId();
  const booksMenuMobileId = useId();
  const navListRef = useRef<HTMLDivElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const booksButtonDesktopRef = useRef<HTMLButtonElement>(null);
  const booksButtonMobileRef = useRef<HTMLButtonElement>(null);
  const navToggleRef = useRef<HTMLButtonElement>(null);
  const openTimer = useRef<number>(0);
  const closeTimer = useRef<number>(0);
  const hoveredItem = useRef<HTMLElement | null>(null);

  const locale = localeFromPathname(pathname);
  const navByLocale: Record<Locale, readonly NavItem[]> = {
    nl: navLinks,
    en: enNavLinks,
    de: deNavLinks,
  };
  const links = navByLocale[locale];
  const t = headerCopy[locale];
  const homeHref = homePaths[locale];
  const booksItem = links.find(
    (item): item is NavDropdownItem => item.type === "dropdown"
  );
  const mega = booksItem ? splitMegaChildren(booksItem.children) : null;
  const isBooksOnlyMega =
    mega !== null && mega.explore.length === 0 && mega.themes.length === 0;

  const closeBooks = useCallback(() => setIsBooksOpen(false), []);

  const focusBooksButton = useCallback(() => {
    if (typeof window !== "undefined" && isDesktopNav()) {
      booksButtonDesktopRef.current?.focus();
    } else {
      booksButtonMobileRef.current?.focus();
    }
  }, []);

  const updateTrack = useCallback((el: HTMLElement | null, visible: boolean) => {
    const nav = navListRef.current;
    if (!nav || !el) {
      setTrack((prev) => ({ ...prev, visible: false }));
      return;
    }
    const navRect = nav.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    setTrack({
      x: rect.left - navRect.left,
      w: rect.width,
      visible,
    });
  }, []);

  const syncTrackToActive = useCallback(() => {
    const nav = navListRef.current;
    if (!nav) return;
    const active = nav.querySelector<HTMLElement>(
      ".nav-link[aria-current='page'], .nav-dropdown.is-active .nav-dropdown-trigger"
    );
    hoveredItem.current = null;
    updateTrack(active, Boolean(active));
  }, [updateTrack]);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      setIsScrolled(window.scrollY > 24);
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

  useEffect(() => {
    setIsOpen(false);
    setIsBooksOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("is-nav-locked", isOpen);
    document.body.classList.toggle("is-nav-locked", isOpen);
    return () => {
      document.documentElement.classList.remove("is-nav-locked");
      document.body.classList.remove("is-nav-locked");
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isBooksOpen) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!isDesktopNav()) return;
      const target = event.target as Node;
      if (
        megaRef.current?.contains(target) ||
        booksButtonDesktopRef.current?.contains(target)
      ) {
        return;
      }
      setIsBooksOpen(false);
    };

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsBooksOpen(false);
        focusBooksButton();
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
  }, [isBooksOpen, focusBooksButton]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setIsBooksOpen(false);
        navToggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useLayoutEffect(() => {
    syncTrackToActive();
    const id = window.requestAnimationFrame(() => setTrackReady(true));
    return () => window.cancelAnimationFrame(id);
  }, [pathname, syncTrackToActive, isScrolled]);

  useEffect(() => {
    const nav = navListRef.current;
    if (!nav || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => {
      const target =
        hoveredItem.current ??
        nav.querySelector<HTMLElement>(
          ".nav-link[aria-current='page'], .nav-dropdown.is-active .nav-dropdown-trigger"
        );
      if (target) updateTrack(target, true);
    });

    observer.observe(nav);
    window.addEventListener("resize", syncTrackToActive);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncTrackToActive);
    };
  }, [syncTrackToActive, updateTrack]);

  useEffect(() => {
    return () => {
      window.clearTimeout(openTimer.current);
      window.clearTimeout(closeTimer.current);
    };
  }, []);

  const closeMobile = () => {
    setIsOpen(false);
    setIsBooksOpen(false);
  };

  const scheduleBooksOpen = () => {
    if (!isHoverNav()) return;
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(openTimer.current);
    openTimer.current = window.setTimeout(() => setIsBooksOpen(true), 40);
  };

  const scheduleBooksClose = () => {
    if (!isHoverNav()) return;
    window.clearTimeout(openTimer.current);
    closeTimer.current = window.setTimeout(() => setIsBooksOpen(false), 160);
  };

  const onNavItemEnter = (el: HTMLElement) => {
    hoveredItem.current = el;
    updateTrack(el, true);
  };

  const onNavListLeave = () => {
    syncTrackToActive();
  };

  const focusChildLink = (index: number) => {
    const panel = isDesktopNav()
      ? megaRef.current
      : document.getElementById(booksMenuMobileId);
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
      focusBooksButton();
    }
  };

  const trackStyle = {
    "--track-x": `${track.x}px`,
    "--track-w": `${track.w}px`,
  } as CSSProperties;

  const renderMegaExplore = (onNavigate?: () => void) => {
    if (!mega || (mega.explore.length === 0 && mega.themes.length === 0)) {
      return null;
    }
    return (
      <div className="mega-col mega-col--explore">
        <p className="mega-kicker">{t.exploreLabel}</p>
        <p className="mega-lead">{t.exploreLead}</p>
        <ul className="mega-list">
          {mega.explore.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                role="menuitem"
                aria-current={isPathActive(pathname, child.href) ? "page" : undefined}
                className="mega-link"
                onClick={onNavigate}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
        {mega.themes.length > 0 ? (
          <>
            <p className="mega-kicker mega-kicker--sub">{t.themesLabel}</p>
            <ul className="mega-list">
              {mega.themes.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    role="menuitem"
                    aria-current={
                      isPathActive(pathname, child.href) ? "page" : undefined
                    }
                    className="mega-link"
                    onClick={onNavigate}
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    );
  };

  const renderMegaBooks = (onNavigate?: () => void) => {
    if (!mega) return null;
    return (
      <div className="mega-col mega-col--spotlight">
        <p className="mega-kicker">{t.featuredLabel}</p>
        <div className="mega-books">
          {mega.featured.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              role="menuitem"
              aria-current={isPathActive(pathname, child.href) ? "page" : undefined}
              className="mega-book"
              onClick={onNavigate}
            >
              {child.coverImage ? (
                <span className="mega-book-cover">
                  <Image
                    src={child.coverImage}
                    alt=""
                    width={120}
                    height={180}
                    className="mega-book-cover-img"
                  />
                </span>
              ) : null}
              <span className="mega-book-copy">
                <span className="mega-book-title">{child.label}</span>
                {child.subtitle ? (
                  <span className="mega-book-genre">{child.subtitle}</span>
                ) : null}
              </span>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  const renderDesktopItem = (item: NavItem) => {
    if (item.type === "link") {
      const active = isPathActive(pathname, item.href);
      return (
        <Link
          key={item.href}
          href={item.href}
          className="nav-link"
          aria-current={active ? "page" : undefined}
          onMouseEnter={(event) => onNavItemEnter(event.currentTarget)}
          onFocus={(event) => onNavItemEnter(event.currentTarget)}
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
        onMouseEnter={scheduleBooksOpen}
        onMouseLeave={scheduleBooksClose}
      >
        <button
          ref={booksButtonDesktopRef}
          type="button"
          className="nav-dropdown-trigger"
          aria-expanded={isBooksOpen}
          aria-haspopup="menu"
          aria-controls={booksMenuId}
          aria-current={active ? "true" : undefined}
          onClick={() => setIsBooksOpen((prev) => !prev)}
          onKeyDown={onBooksButtonKeyDown}
          onMouseEnter={(event) => onNavItemEnter(event.currentTarget)}
          onFocus={(event) => onNavItemEnter(event.currentTarget)}
        >
          <span className="nav-dropdown-trigger-label">{item.label}</span>
          <span className="nav-dropdown-caret" aria-hidden="true" />
        </button>
      </div>
    );
  };

  const renderDrawerItem = (item: NavItem) => {
    if (item.type === "link") {
      const active = isPathActive(pathname, item.href);
      return (
        <Link
          key={item.href}
          href={item.href}
          className="nav-link"
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
      >
        <button
          ref={booksButtonMobileRef}
          type="button"
          className="nav-dropdown-trigger"
          aria-expanded={isBooksOpen}
          aria-haspopup="menu"
          aria-controls={booksMenuMobileId}
          aria-current={active ? "true" : undefined}
          onClick={() => setIsBooksOpen((prev) => !prev)}
          onKeyDown={onBooksButtonKeyDown}
        >
          <span className="nav-dropdown-trigger-label">{item.label}</span>
          <span className="nav-dropdown-caret" aria-hidden="true" />
        </button>
        <div
          id={booksMenuMobileId}
          className={`mega-menu mega-menu--drawer${isBooksOpen ? " is-open" : ""}${isBooksOnlyMega ? " mega-menu--books-only" : ""}`}
          role="menu"
          aria-label={t.booksMenu}
          aria-hidden={!isBooksOpen}
          inert={!isBooksOpen ? true : undefined}
          onKeyDown={onPanelKeyDown}
        >
          {renderMegaExplore(closeMobile)}
          {renderMegaBooks(closeMobile)}
        </div>
      </div>
    );
  };

  return (
    <header
      className={`site-header${isScrolled ? " is-scrolled" : ""}${isOpen ? " is-nav-open" : ""}`}
    >
      <div className="header-shell">
        <Link href={homeHref} className="logo" onClick={closeMobile}>
          {siteConfig.name}
        </Link>

        <nav className="nav-desktop" aria-label={t.navLabel} lang={locale}>
          <div
            className="nav-list"
            ref={navListRef}
            onMouseLeave={onNavListLeave}
          >
            <span
              className={`nav-track${track.visible ? " is-visible" : ""}${trackReady ? " is-ready" : ""}`}
              style={trackStyle}
              aria-hidden="true"
            />
            {links.map(renderDesktopItem)}
          </div>
          <LangSwitch locale={locale} pathname={pathname} />
        </nav>

        <button
          ref={navToggleRef}
          className="nav-toggle"
          type="button"
          aria-label={isOpen ? t.closeMenu : t.openMenu}
          aria-expanded={isOpen}
          aria-controls="mobile-nav-drawer"
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

        {booksItem && mega ? (
          <div
            ref={megaRef}
            id={booksMenuId}
            className={`mega-menu mega-menu--desktop${isBooksOpen ? " is-open" : ""}${isBooksOnlyMega ? " mega-menu--books-only" : ""}`}
            role="menu"
            aria-label={t.booksMenu}
            aria-hidden={!isBooksOpen}
            inert={!isBooksOpen ? true : undefined}
            onMouseEnter={scheduleBooksOpen}
            onMouseLeave={scheduleBooksClose}
            onKeyDown={onPanelKeyDown}
          >
            {renderMegaExplore()}
            {renderMegaBooks()}
          </div>
        ) : null}

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
      </div>

      <div
        className={`nav-scrim${isOpen ? " is-open" : ""}`}
        onClick={closeMobile}
        aria-hidden="true"
      />

      <nav
        id="mobile-nav-drawer"
        className={`nav-drawer${isOpen ? " is-open" : ""}`}
        aria-label={t.navLabel}
        lang={locale}
        aria-hidden={!isOpen}
        inert={!isOpen ? true : undefined}
      >
        <div className="nav-drawer-inner">
          {links.map(renderDrawerItem)}
          <LangSwitch
            locale={locale}
            pathname={pathname}
            onNavigate={closeMobile}
          />
        </div>
      </nav>
    </header>
  );
}
