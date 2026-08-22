/**
 * Lightweight locale helpers. The Dutch site lives at the root; English under
 * /en; German under /de. Navigation follows the pages that exist per locale;
 * book detail URLs use /en/<english-slug> and /de/<german-slug>.
 */

import type { NavItem, NavLinkItem } from "@/lib/site";

export type Locale = "nl" | "en" | "de";

export const LOCALES: readonly Locale[] = ["nl", "en", "de"] as const;

export const homePaths: Record<Locale, string> = {
  nl: "/",
  en: "/en",
  de: "/de",
};

/**
 * Navigation shown in the English (/en) section.
 * Mirrors the core NL header: Books dropdown, Reading, Blog, Author, Contact.
 * NL-only theme pages stay omitted until EN twins exist.
 */
export const enNavLinks: readonly NavItem[] = [
  {
    type: "dropdown",
    href: "/en/books",
    label: "Books",
    children: [
      { type: "link", href: "/en/books", label: "All books" },
      { type: "divider" },
      { type: "label", label: "Titles" },
      {
        type: "link",
        href: "/en/shadows-over-domburg",
        label: "Shadows over Domburg",
        subtitle: "Literary thriller",
        coverImage: "/assets/shadows-over-domburg-book-cover.webp",
        coverAlt: "English book cover of Shadows over Domburg by Ard Breure",
      },
      {
        type: "link",
        href: "/en/zero-day-directive",
        label: "Zero Day Directive",
        subtitle: "Technothriller",
        coverImage: "/assets/zero-day-directive.webp",
        coverAlt: "Cover of Zero Day Directive",
      },
    ],
  },
  { type: "link", href: "/en/e-readers", label: "Reading" },
  { type: "link", href: "/en/blog", label: "Blog" },
  { type: "link", href: "/en/about", label: "Author" },
  { type: "link", href: "/en/contact", label: "Contact" },
];

/**
 * Navigation shown in the German (/de) section. Only routes that exist in DE:
 * home (logo), the one translated book, Domburg, author, contact.
 */
export const deNavLinks: readonly NavItem[] = [
  {
    type: "link",
    href: "/de/schatten-ueber-domburg",
    label: "Bücher",
  },
  { type: "link", href: "/de/domburg", label: "Domburg" },
  { type: "link", href: "/de/ueber-den-autor", label: "Über den Autor" },
  { type: "link", href: "/de/kontakt", label: "Kontakt" },
];

/**
 * Canonical pages and their locale-specific paths. A missing locale key means
 * that language has no twin; the language switch then falls back to that
 * locale's home. hreflang/sitemap only emit keys that are present.
 */
const localizedRoutes: Record<string, Partial<Record<Locale, string>>> = {
  home: { nl: "/", en: "/en", de: "/de" },
  books: { nl: "/boeken", en: "/en/books" },
  schaduwen: {
    nl: "/boeken/schaduwen-over-domburg",
    en: "/en/shadows-over-domburg",
    de: "/de/schatten-ueber-domburg",
  },
  zeroDay: {
    nl: "/boeken/zero-day-directive",
    en: "/en/zero-day-directive",
  },
  eReaders: { nl: "/e-readers", en: "/en/e-readers" },
  blog: { nl: "/blog", en: "/en/blog" },
  markthal: {
    nl: "/markthal-rotterdam",
    en: "/en/markthal-rotterdam",
  },
  cubeHouses: {
    nl: "/kubuswoningen-rotterdam",
    en: "/en/cube-houses-rotterdam",
  },
  domburg: { nl: "/domburg", en: "/en/domburg", de: "/de/domburg" },
  about: {
    nl: "/over-de-auteur",
    en: "/en/about",
    de: "/de/ueber-den-autor",
  },
  contact: { nl: "/contact", en: "/en/contact", de: "/de/kontakt" },
  privacy: { nl: "/privacy", en: "/en/privacy" },
  affiliate: { nl: "/affiliate", en: "/en/affiliate" },
};

function normalizePath(pathname: string): string {
  if (pathname === "") {
    return "/";
  }
  return pathname;
}

function findLocalizedRoute(
  pathname: string
): Partial<Record<Locale, string>> | undefined {
  const current = normalizePath(pathname);
  return Object.values(localizedRoutes).find((paths) =>
    LOCALES.some((locale) => paths[locale] === current)
  );
}

/** Paths that actually exist for this URL, used by hreflang and the sitemap. */
export function localePaths(
  pathname: string
): Partial<Record<Locale, string>> | undefined {
  return findLocalizedRoute(pathname);
}

export function pathForLocale(
  pathname: string,
  locale: Locale
): string | undefined {
  return findLocalizedRoute(pathname)?.[locale];
}

export function localeFromPathname(pathname: string): Locale {
  if (pathname === "/de" || pathname.startsWith("/de/")) {
    return "de";
  }
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return "en";
  }
  return "nl";
}

/**
 * Equivalent page in `target` for the language switch. Pages without a
 * counterpart fall back to that locale's home.
 */
export function counterpartPath(pathname: string, target: Locale): string {
  return pathForLocale(pathname, target) ?? homePaths[target];
}

/**
 * hreflang map for a page, including x-default (the English twin, or /en).
 * Only locales that have a real counterpart are included besides x-default.
 */
export function localeAlternates(pathname: string): Record<string, string> {
  const paths = findLocalizedRoute(pathname);
  const languages: Record<string, string> = {};
  if (paths) {
    for (const locale of LOCALES) {
      const href = paths[locale];
      if (href) {
        languages[locale] = href;
      }
    }
  }
  languages["x-default"] = paths?.en ?? homePaths.en;
  return languages;
}

export interface FooterCopy {
  tagline: string;
  nav: readonly NavLinkItem[];
  rights: string;
  navLabel: string;
  country: string;
  operator: string;
}

export const footerCopy: Record<Locale, FooterCopy> = {
  nl: {
    tagline: "Onafhankelijk label voor boeken en oorspronkelijke verhalen.",
    nav: [
      { type: "link", href: "/boeken", label: "Boeken" },
      { type: "link", href: "/e-readers", label: "Lezen" },
      { type: "link", href: "/blog", label: "Blog" },
      { type: "link", href: "/boeken-over-rotterdam", label: "Boeken over Rotterdam" },
      { type: "link", href: "/boeken-over-zeeland", label: "Boeken over Zeeland" },
      { type: "link", href: "/over-de-auteur", label: "Over de auteur" },
      { type: "link", href: "/contact", label: "Contact" },
      { type: "link", href: "/privacy", label: "Privacy" },
      { type: "link", href: "/affiliate", label: "Affiliate" },
    ],
    rights: "Alle rechten voorbehouden.",
    navLabel: "Voettekstnavigatie",
    country: "Nederland",
    operator: "Breure Media wordt geëxploiteerd door ABshops.nl · KvK 72037628",
  },
  en: {
    tagline: "Independent imprint for books and original stories.",
    nav: [
      { type: "link", href: "/en/books", label: "Books" },
      { type: "link", href: "/en/e-readers", label: "Reading" },
      { type: "link", href: "/en/blog", label: "Blog" },
      { type: "link", href: "/en/about", label: "Author" },
      { type: "link", href: "/en/contact", label: "Contact" },
      { type: "link", href: "/en/privacy", label: "Privacy" },
      { type: "link", href: "/en/affiliate", label: "Affiliate" },
    ],
    rights: "All rights reserved.",
    navLabel: "Footer navigation",
    country: "The Netherlands",
    operator: "Breure Media is operated by ABshops.nl · KvK 72037628",
  },
  de: {
    tagline: "Unabhängiges Label für Bücher und originale Geschichten.",
    nav: [
      { type: "link", href: "/de/schatten-ueber-domburg", label: "Bücher" },
      { type: "link", href: "/de/domburg", label: "Domburg" },
      { type: "link", href: "/de/ueber-den-autor", label: "Über den Autor" },
      { type: "link", href: "/de/kontakt", label: "Kontakt" },
    ],
    rights: "Alle Rechte vorbehalten.",
    navLabel: "Fußzeilennavigation",
    country: "Niederlande",
    operator: "Breure Media wird betrieben von ABshops.nl · KvK 72037628",
  },
};

/** English copy for the newsletter form, shared across /en pages.
 * Success text is built in NewsletterForm from the `book` prop + locale.
 */
export const englishNewsletterCopy = {
  emailLabel: "Email address",
  placeholder: "you@email.com",
  submit: "Notify me when the book is released",
  submitting: "One moment…",
  invalidEmail: "Please enter a valid email address.",
  error:
    "Something went wrong. Please try again later or email info@breuremedia.com.",
  privacy:
    "Your email address is used only for updates about Breure Media publications. No spam; you can unsubscribe at any time.",
};

/** German copy for the newsletter form, shared across /de pages. */
export const germanNewsletterCopy = {
  emailLabel: "E-Mail-Adresse",
  placeholder: "name@email.de",
  submit: "Benachrichtigen Sie mich",
  submitting: "Einen Moment…",
  invalidEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
  error:
    "Etwas ist schiefgelaufen. Bitte versuchen Sie es später erneut oder schreiben Sie an info@breuremedia.com.",
  privacy:
    "Ihre E-Mail-Adresse verwenden wir nur für Nachrichten zu Veröffentlichungen von Breure Media. Kein Spam; abmelden können Sie sich jederzeit.",
};

/** UI strings for the header, per locale. */
export const headerCopy: Record<
  Locale,
  {
    navLabel: string;
    openMenu: string;
    closeMenu: string;
    switchTo: string;
    booksMenu: string;
    exploreLabel: string;
    themesLabel: string;
    featuredLabel: string;
    exploreLead: string;
  }
> = {
  nl: {
    navLabel: "Hoofdnavigatie",
    openMenu: "Menu openen",
    closeMenu: "Menu sluiten",
    switchTo: "Read this page in English",
    booksMenu: "Boeken-menu",
    exploreLabel: "Ontdekken",
    themesLabel: "Thema's",
    featuredLabel: "Uitgelicht",
    exploreLead: "Literaire thrillers en oorspronkelijke verhalen.",
  },
  en: {
    navLabel: "Main navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchTo: "Lees deze pagina in het Nederlands",
    booksMenu: "Books menu",
    exploreLabel: "Explore",
    themesLabel: "Themes",
    featuredLabel: "Featured",
    exploreLead: "Literary thrillers and original stories.",
  },
  de: {
    navLabel: "Hauptnavigation",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    switchTo: "Lesen Sie diese Seite auf Deutsch",
    booksMenu: "Bücher-Menü",
    exploreLabel: "Entdecken",
    themesLabel: "Themen",
    featuredLabel: "Empfohlen",
    exploreLead: "Literarische Thriller und originale Geschichten.",
  },
};
