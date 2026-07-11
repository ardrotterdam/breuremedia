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

export const navLinks = [
  { href: "/boeken", label: "Boeken" },
  { href: "/over-de-auteur", label: "Auteur" },
  { href: "/contact", label: "Contact" },
] as const;
