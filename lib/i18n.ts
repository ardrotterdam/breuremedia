/**
 * Lightweight bilingual helpers. The Dutch site lives at the root; the English
 * site lives under /en. Navigation mirrors the NL structure; book detail URLs
 * use the existing /en/<english-slug> routes.
 */

import type { NavItem, NavLinkItem } from "@/lib/site";

export type Locale = "nl" | "en";

/**
 * Navigation shown in the English (/en) section.
 * Mirrors the core NL header: Books dropdown, E-readers, Blog, Author, Contact.
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
  { type: "link", href: "/en/e-readers", label: "E-readers" },
  { type: "link", href: "/en/blog", label: "Blog" },
  { type: "link", href: "/en/about", label: "Author" },
  { type: "link", href: "/en/contact", label: "Contact" },
];

/**
 * NL ↔ EN equivalents for the language switch. Pages without a counterpart
 * (one-language articles and guides) fall back to the other locale's home.
 */
const routePairs: readonly (readonly [string, string])[] = [
  ["/", "/en"],
  ["/boeken", "/en/books"],
  ["/boeken/schaduwen-over-domburg", "/en/shadows-over-domburg"],
  ["/boeken/zero-day-directive", "/en/zero-day-directive"],
  ["/e-readers", "/en/e-readers"],
  ["/blog", "/en/blog"],
  ["/markthal-rotterdam", "/en/markthal-rotterdam"],
  ["/kubuswoningen-rotterdam", "/en/cube-houses-rotterdam"],
  ["/over-de-auteur", "/en/about"],
  ["/contact", "/en/contact"],
  ["/privacy", "/en/privacy"],
  ["/affiliate", "/en/affiliate"],
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
  operator: string;
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
      { type: "link", href: "/en/e-readers", label: "E-readers" },
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
};
