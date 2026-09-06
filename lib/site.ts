export const siteConfig = {
  name: "Breure Media",
  tagline: "Thrillers over macht, havens en Europa",
  description:
    "Breure Media is een onafhankelijk Nederlands label voor thrillers over macht, havens en Europa.",
  url: "https://breuremedia.com",
  locale: "nl_NL",
  language: "nl",
  email: "info@breuremedia.com",
  country: "Nederland",
  motto: "Verhalen die de stilte doorbreken.",
} as const;

/** Legal operator of the website. Do not add a BTW-id until the owner supplies one. */
export const operator = {
  legalName: "ABshops.nl",
  kvk: "72037628",
  streetAddress: "Weena 70",
  postalCode: "3012 CM",
  city: "Rotterdam",
  country: "Nederland",
  countryEn: "The Netherlands",
} as const;

/** English counterparts of the site-level strings, used in the /en section. */
export const siteEn = {
  tagline: "Thrillers about power, ports and Europe",
  description:
    "Breure Media is an independent Dutch imprint for thrillers about power, ports and Europe.",
  motto: "Stories that break the silence.",
} as const;

export const author = {
  name: "Ard Breure",
  slug: "ard-breure",
  bio: [
    "Ard Breure groeide op in Zeeland, de provincie die hij in Schaduwen over Domburg tot decor maakt. Op zijn vijfentwintigste verruilde hij Zeeland voor Rotterdam, waar hij sindsdien woont, een stad die hij kent van de binnenstad tot de verste hoek van de Maasvlakte.",
    "Die twee landschappen, de stilte van de Zeeuwse kust en de ruwheid van de haven, vormen de ruggengraat van zijn werk. Zijn werk verschijnt onder de vlag van Breure Media, een label voor boeken die blijven nazinderen, lang nadat de laatste pagina is omgeslagen.",
  ],
  shortBio:
    "Nederlandse auteur van thrillers over macht, havens en Europa. Zijn debuut Schaduwen over Domburg verschijnt bij Breure Media.",
} as const;

/** English author copy, used on /en/about and the English home. */
export const authorEn = {
  bio: [
    "Ard Breure grew up in Zeeland, the province he turns into the setting of Shadows over Domburg. At twenty-five he traded Zeeland for Rotterdam, where he has lived ever since, a city he knows from its old centre to the far edge of the Maasvlakte docks.",
    "Those two landscapes, the stillness of the Zeeland coast and the rawness of the harbour, form the backbone of his work. His books appear under the Breure Media imprint: a home for stories that keep resonating long after the final page.",
  ],
  shortBio:
    "Dutch author of thrillers about power, ports and Europe. His debut, Shadows over Domburg, is published by Breure Media.",
} as const;

/** German counterparts of the site-level strings, used in the /de section. */
export const siteDe = {
  tagline: "Thriller über Macht, Häfen und Europa",
  description:
    "Breure Media ist ein unabhängiges niederländisches Label für Thriller über Macht, Häfen und Europa. Hier berührt die zeeländische Küste den Rotterdamer Hafen.",
  motto: "Geschichten, die die Stille durchbrechen.",
} as const;

/** German author copy, used on /de/ueber-den-autor and the German home. */
export const authorDe = {
  bio: [
    "Ard Breure wuchs in Zeeland auf, der Provinz, die in Schatten über Domburg zum Schauplatz wird. Mit fünfundzwanzig Jahren tauschte er Zeeland gegen Rotterdam, wo er seither lebt. Eine Stadt, die er vom alten Zentrum bis zum äußersten Rand der Maasvlakte kennt.",
    "Diese beiden Landschaften, die Stille der zeeländischen Küste und die Rauheit des Hafens, bilden das Rückgrat seiner Arbeit. Seine Bücher erscheinen unter dem Label Breure Media: ein Haus für Geschichten, die nachklingen, lange nachdem die letzte Seite umgeschlagen ist.",
  ],
  shortBio:
    "Niederländischer Autor von Thrillern über Macht, Häfen und Europa. Sein Debüt Schatten über Domburg erscheint bei Breure Media.",
} as const;

/** Leaf link inside the main nav (top-level or dropdown child). */
export interface NavLinkItem {
  type: "link";
  href: string;
  label: string;
  /** Optional cover thumb shown in the books mega menu. */
  coverImage?: string;
  coverAlt?: string;
  /** Optional genre / kicker shown on featured mega-menu book cards. */
  subtitle?: string;
}

/** Non-interactive group label inside a dropdown. */
export interface NavLabelItem {
  type: "label";
  label: string;
}

/** Visual separator inside a dropdown. */
export interface NavDividerItem {
  type: "divider";
}

export type NavChild = NavLinkItem | NavLabelItem | NavDividerItem;

/** Top-level dropdown with nested children. */
export interface NavDropdownItem {
  type: "dropdown";
  /** Overview href used for active-state matching (and as a fallback link). */
  href: string;
  label: string;
  children: readonly NavChild[];
}

export type NavItem = NavLinkItem | NavDropdownItem;

export const navLinks: readonly NavItem[] = [
  {
    type: "dropdown",
    href: "/boeken",
    label: "Boeken",
    children: [
      { type: "link", href: "/boeken", label: "Alle boeken" },
      { type: "divider" },
      { type: "label", label: "Titels" },
      {
        type: "link",
        href: "/boeken/schaduwen-over-domburg",
        label: "Schaduwen over Domburg",
        subtitle: "Literaire thriller",
        coverImage: "/assets/schaduwen-over-domburg-cover.webp",
        coverAlt: "Cover van Schaduwen over Domburg",
      },
      {
        type: "link",
        href: "/boeken/zero-day-directive",
        label: "Zero Day Directive",
        subtitle: "Technothriller",
        coverImage:
          "/assets/zero-day-directive-ard-breure-nederlandse-cover.webp",
        coverAlt:
          "Zero Day Directive van Ard Breure, Nederlandse boekcover van een politieke technothriller over een digitale dreiging voor de Europese democratie",
      },
      {
        type: "link",
        href: "/boeken/de-laatste-ingreep",
        label: "De Laatste Ingreep",
        subtitle: "Geopolitieke AI-thriller",
        coverImage:
          "/assets/de-laatste-ingreep-ard-breure-geopolitieke-ai-thriller.webp",
        coverAlt:
          "De Laatste Ingreep van Ard Breure, geopolitieke AI-thriller over Europa, Amerika en kunstmatige intelligentie",
      },
      { type: "divider" },
      { type: "label", label: "Thema's" },
      {
        type: "link",
        href: "/boeken-over-rotterdam",
        label: "Rotterdam",
      },
      {
        type: "link",
        href: "/boeken-over-zeeland",
        label: "Zeeland",
      },
    ],
  },
  {
    type: "dropdown",
    href: "/e-readers",
    label: "Lezen",
    children: [
      { type: "link", href: "/e-readers", label: "E-readers" },
      {
        type: "link",
        href: "/waterdichte-e-reader",
        label: "Waterdichte e-reader",
      },
      {
        type: "link",
        href: "/lengte-van-ebook",
        label: "Lengte van een ebook",
      },
    ],
  },
  { type: "link", href: "/blog", label: "Blog" },
  { type: "link", href: "/over-de-auteur", label: "Auteur" },
  { type: "link", href: "/contact", label: "Contact" },
];
