export const siteConfig = {
  name: "Breure Media",
  tagline: "Uitgeverij van literaire thrillers",
  description:
    "Breure Media is een onafhankelijk Nederlands label voor literaire thrillers en oorspronkelijke verhalen.",
  url: "https://breuremedia.com",
  locale: "nl_NL",
  language: "nl",
  email: "info@breuremedia.com",
  country: "Nederland",
  motto: "Verhalen die de stilte doorbreken.",
} as const;

/** English counterparts of the site-level strings, used in the /en section. */
export const siteEn = {
  tagline: "Publisher of literary thrillers",
  description:
    "Breure Media is an independent Dutch imprint for literary thrillers and original stories.",
  motto: "Stories that break the silence.",
} as const;

export const author = {
  name: "Ard Breure",
  slug: "ard-breure",
  bio: [
    "Ard Breure groeide op in Zeeland, de provincie die hij in Schaduwen over Domburg tot decor maakt. Op zijn vijfentwintigste verruilde hij Zeeland voor Rotterdam, waar hij sindsdien woont — een stad die hij kent van de binnenstad tot de verste hoek van de Maasvlakte.",
    "Die twee landschappen, de stilte van de Zeeuwse kust en de ruwheid van de haven, vormen de ruggengraat van zijn werk. Zijn werk verschijnt onder de vlag van Breure Media — een label voor boeken die blijven nazinderen, lang nadat de laatste pagina is omgeslagen.",
  ],
  shortBio:
    "Nederlandse auteur van literaire thrillers. Zijn debuut Schaduwen over Domburg verschijnt bij Breure Media.",
} as const;

/** English author copy, used on /en/about and the English home. */
export const authorEn = {
  bio: [
    "Ard Breure grew up in Zeeland, the province he turns into the setting of Shadows over Domburg. At twenty-five he traded Zeeland for Rotterdam, where he has lived ever since — a city he knows from its old centre to the far edge of the Maasvlakte docks.",
    "Those two landscapes — the stillness of the Zeeland coast and the rawness of the harbour — form the backbone of his work. His books appear under the Breure Media imprint: a home for stories that keep resonating long after the final page.",
  ],
  shortBio:
    "Dutch author of literary thrillers. His debut, Shadows over Domburg, is published by Breure Media.",
} as const;

export const navLinks = [
  { href: "/boeken", label: "Schaduwen over Domburg" },
  { href: "/e-readers", label: "E-readers" },
  { href: "/blog", label: "Blog" },
  { href: "/boeken-over-rotterdam", label: "Boeken over Rotterdam" },
  { href: "/boeken-over-zeeland", label: "Boeken over Zeeland" },
  { href: "/over-de-auteur", label: "Auteur" },
  { href: "/contact", label: "Contact" },
] as const;
