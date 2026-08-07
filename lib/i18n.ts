/**
 * Lightweight bilingual helpers. The Dutch site lives at the root; the English
 * site lives under /en. Only the author's own evergreen pages are translated —
 * the Dutch affiliate pages (Rotterdam/Zeeland books, e-readers) stay NL-only
 * and simply do not appear in the English navigation.
 */

export type Locale = "nl" | "en";

export interface NavLink {
  href: string;
  label: string;
}

/** Navigation shown in the English (/en) section. */
export const enNavLinks: readonly NavLink[] = [
  { href: "/en", label: "Home" },
  { href: "/en/shadows-over-domburg", label: "The Book" },
  { href: "/en/about", label: "Author" },
  { href: "/en/contact", label: "Contact" },
];

/**
 * NL ↔ EN equivalents for the language switch. Pages without a counterpart
 * (the Dutch-only affiliate pages) fall back to the other locale's home.
 */
const routePairs: readonly (readonly [string, string])[] = [
  ["/", "/en"],
  ["/boeken/schaduwen-over-domburg", "/en/shadows-over-domburg"],
  ["/over-de-auteur", "/en/about"],
  ["/contact", "/en/contact"],
  ["/privacy", "/en/privacy"],
];

export function localeFromPathname(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "nl";
}

/** The equivalent page in the other language for the language switch. */
export function counterpartPath(pathname: string): string {
  if (localeFromPathname(pathname) === "nl") {
    return routePairs.find(([nl]) => nl === pathname)?.[1] ?? "/en";
  }
  return routePairs.find(([, en]) => en === pathname)?.[0] ?? "/";
}

export interface FooterCopy {
  tagline: string;
  nav: readonly NavLink[];
  rights: string;
  navLabel: string;
  country: string;
}

export const footerCopy: Record<Locale, FooterCopy> = {
  nl: {
    tagline: "Onafhankelijk label voor boeken en oorspronkelijke verhalen.",
    nav: [
      { href: "/boeken", label: "Boeken" },
      { href: "/e-readers", label: "E-readers" },
      { href: "/blog", label: "Blog" },
      { href: "/boeken-over-rotterdam", label: "Boeken over Rotterdam" },
      { href: "/boeken-over-zeeland", label: "Boeken over Zeeland" },
      { href: "/over-de-auteur", label: "Over de auteur" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy" },
    ],
    rights: "Alle rechten voorbehouden.",
    navLabel: "Voettekstnavigatie",
    country: "Nederland",
  },
  en: {
    tagline: "Independent imprint for books and original stories.",
    nav: [
      { href: "/en/shadows-over-domburg", label: "The Book" },
      { href: "/en/about", label: "Author" },
      { href: "/en/contact", label: "Contact" },
      { href: "/en/privacy", label: "Privacy" },
    ],
    rights: "All rights reserved.",
    navLabel: "Footer navigation",
    country: "The Netherlands",
  },
};

/** English copy for the newsletter form, shared across /en pages. */
export const englishNewsletterCopy = {
  emailLabel: "Email address",
  placeholder: "you@email.com",
  submit: "Notify me when the book is released",
  submitting: "One moment…",
  success: "Thank you. You'll be notified as soon as the book is released.",
  invalidEmail: "Please enter a valid email address.",
  error:
    "Something went wrong. Please try again later or email info@breuremedia.com.",
  privacy:
    "Your email address is used only for updates about Breure Media publications. No spam; you can unsubscribe at any time.",
  subject: "New sign-up — Shadows over Domburg",
};

/** UI strings for the header, per locale. */
export const headerCopy: Record<
  Locale,
  { navLabel: string; openMenu: string; closeMenu: string; switchTo: string }
> = {
  nl: {
    navLabel: "Hoofdnavigatie",
    openMenu: "Menu openen",
    closeMenu: "Menu sluiten",
    switchTo: "Read this page in English",
  },
  en: {
    navLabel: "Main navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchTo: "Lees deze pagina in het Nederlands",
  },
};
