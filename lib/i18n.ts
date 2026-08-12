/**
 * Lightweight bilingual helpers. The Dutch site lives at the root; the English
 * site lives under /en. Navigation mirrors the NL structure; book detail URLs
 * use the existing /en/<english-slug> routes.
 */

import type { NavItem, NavLinkItem } from "@/lib/site";

export type Locale = "nl" | "en";

/**
 * Navigation shown in the English (/en) section.
 * Book detail hrefs match live /en/[slug] pages; overview/theme/affiliate
 * paths follow the planned EN IA (may 404 until those pages exist).
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
        label: "Schaduwen over Domburg",
        coverImage: "/assets/schaduwen-over-domburg-cover.webp",
        coverAlt: "Cover of Shadows over Domburg",
      },
      {
        type: "link",
        href: "/en/zero-day-directive",
        label: "Zero Day Directive",
        coverImage: "/assets/zero-day-directive.webp",
        coverAlt: "Cover of Zero Day Directive",
      },
      { type: "divider" },
      { type: "label", label: "Themes" },
      {
        type: "link",
        href: "/en/books-about-rotterdam",
        label: "Books about Rotterdam",
      },
      {
        type: "link",
        href: "/en/books-about-zeeland",
        label: "Books about Zeeland",
      },
    ],
  },
  { type: "link", href: "/en/e-readers", label: "E-readers" },
  { type: "link", href: "/en/blog", label: "Blog" },
  { type: "link", href: "/en/about", label: "Author" },
  { type: "link", href: "/en/contact", label: "Contact" },
];

/**
 * NL ↔ EN equivalents for the language switch. Pages without a counterpart
 * (affiliate pages without an EN twin) fall back to the other locale's home.
 */
const routePairs: readonly (readonly [string, string])[] = [
  ["/", "/en"],
  ["/boeken", "/en/books"],
  ["/boeken/schaduwen-over-domburg", "/en/shadows-over-domburg"],
  ["/boeken/zero-day-directive", "/en/zero-day-directive"],
  ["/boeken-over-rotterdam", "/en/books-about-rotterdam"],
  ["/boeken-over-zeeland", "/en/books-about-zeeland"],
  ["/e-readers", "/en/e-readers"],
  ["/blog", "/en/blog"],
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
  nav: readonly NavLinkItem[];
  rights: string;
  navLabel: string;
  country: string;
}

export const footerCopy: Record<Locale, FooterCopy> = {
  nl: {
    tagline: "Onafhankelijk label voor boeken en oorspronkelijke verhalen.",
    nav: [
      { type: "link", href: "/boeken", label: "Boeken" },
      { type: "link", href: "/e-readers", label: "E-readers" },
      { type: "link", href: "/blog", label: "Blog" },
      { type: "link", href: "/boeken-over-rotterdam", label: "Boeken over Rotterdam" },
      { type: "link", href: "/boeken-over-zeeland", label: "Boeken over Zeeland" },
      { type: "link", href: "/over-de-auteur", label: "Over de auteur" },
      { type: "link", href: "/contact", label: "Contact" },
      { type: "link", href: "/privacy", label: "Privacy" },
    ],
    rights: "Alle rechten voorbehouden.",
    navLabel: "Voettekstnavigatie",
    country: "Nederland",
  },
  en: {
    tagline: "Independent imprint for books and original stories.",
    nav: [
      { type: "link", href: "/en/shadows-over-domburg", label: "The Book" },
      { type: "link", href: "/en/about", label: "Author" },
      { type: "link", href: "/en/contact", label: "Contact" },
      { type: "link", href: "/en/privacy", label: "Privacy" },
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
  {
    navLabel: string;
    openMenu: string;
    closeMenu: string;
    switchTo: string;
    booksMenu: string;
  }
> = {
  nl: {
    navLabel: "Hoofdnavigatie",
    openMenu: "Menu openen",
    closeMenu: "Menu sluiten",
    switchTo: "Read this page in English",
    booksMenu: "Boeken-submenu",
  },
  en: {
    navLabel: "Main navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchTo: "Lees deze pagina in het Nederlands",
    booksMenu: "Books submenu",
  },
};
