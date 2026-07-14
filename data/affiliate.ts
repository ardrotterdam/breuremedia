export interface Ereader {
  slug: string;
  naam: string;
  korteOmschrijving: string;
  amazonUrl: string;
  prijs?: number;
  prijsFormatted?: string;
  todo?: string;
}

export interface RotterdamBoek {
  slug: string;
  naam: string;
  korteOmschrijving: string;
  amazonUrl?: string;
  internalUrl?: string;
  todo?: string;
}

export const ereaders: Ereader[] = [
  {
    slug: "kindle-paperwhite",
    naam: "Kindle Paperwhite",
    korteOmschrijving:
      "Als iemand mij op een verjaardag vraagt \"welke e-reader moet ik kopen?\", is dit negen van de tien keer het antwoord. Het scherm van 7 inch is groot genoeg om prettig te lezen en klein genoeg om in één hand te houden.",
    amazonUrl: "https://amzn.to/4vYBl1z",
    prijs: 179.99,
    prijsFormatted: "€179,99",
  },
  {
    slug: "kindle-basis",
    naam: "Kindle (basismodel)",
    korteOmschrijving:
      "De goedkoopste Kindle is de laatste jaren stilletjes heel goed geworden: hetzelfde scherpe schermtype als de Paperwhite (300 ppi), licht als een pocketboek en met USB-C.",
    amazonUrl: "https://amzn.to/4yiGDqi",
  },
  {
    slug: "kobo-libra-colour",
    naam: "Kobo Libra Colour",
    korteOmschrijving:
      "Kobo is het merk voor lezers die vrijheid willen: EPUB-bestanden, lenen bij de openbare bibliotheek rechtstreeks vanaf het apparaat, en geen gedwongen winkel.",
    amazonUrl: "https://amzn.to/4vpmj3I",
  },
  {
    slug: "kobo-clara-bw",
    naam: "Kobo Clara BW",
    korteOmschrijving:
      "De Clara BW is het kleine broertje: 6 inch, zwart-wit, maar met het nieuwste en scherpste schermtype dat er is — nieuwer zelfs dan wat in de basis-Kindle zit.",
    amazonUrl: "https://amzn.to/4fdZ8nd",
  },
  {
    slug: "kindle-scribe",
    naam: "Kindle Scribe",
    korteOmschrijving:
      "De Scribe is een ander soort apparaat: 10,2 inch, met een pen waarmee je in de kantlijn schrijft alsof het papier is.",
    amazonUrl: "https://amzn.to/44K9Z3v",
  },
  {
    slug: "kindle-colorsoft",
    naam: "Kindle Colorsoft",
    korteOmschrijving:
      "Lees je strips, tijdschriften of boeken met illustraties, en zit je al in het Kindle-ecosysteem? Dan is de Colorsoft de logische stap.",
    amazonUrl: "https://amzn.to/4pi7gHS",
  },
];

export const rotterdamBoeken: RotterdamBoek[] = [
  {
    slug: "schaduwen-over-domburg",
    naam: "Schaduwen over Domburg — Ard Breure",
    korteOmschrijving:
      "Een literaire thriller over een ex-rechercheur van de Zeehavenpolitie die wordt teruggeroepen naar een zaak die begint met een lichaam op een Zeeuws strand, maar die hem dwars door de Rotterdamse haven voert.",
    internalUrl: "/boeken/schaduwen-over-domburg",
  },
  {
    slug: "karakter-bordewijk",
    naam: "Karakter — F. Bordewijk",
    korteOmschrijving:
      "Het verhaal van Jacob Willem Katadreuffe, buitenechtelijke zoon van deurwaarder Dreverhaven, die zich in het vooroorlogse Rotterdam omhoogvecht naar een advocatenpraktijk — dwars tegen zijn eigen vader in.",
    amazonUrl: "https://amzn.to/3T0STeX",
  },
  {
    slug: "jules-deelder",
    naam: "De dikke van Deelder",
    korteOmschrijving:
      "Over Rotterdam schrijven zonder Deelder te noemen is als over de stad lopen zonder de Maas over te steken. De nachtburgemeester ving de stad in gedichten en verhalen die je hardop wilt lezen.",
    amazonUrl: "https://amzn.to/4aPu3EV",
  },
  {
    slug: "hugo-borst",
    naam: "Hugo Borst — Rotterdam en voetbal",
    korteOmschrijving:
      "Geen stad waar voetbal en identiteit zo in elkaar grijpen als hier, en niemand schrijft daar zo goed over als Hugo Borst — Spartaan, columnist, en een van de beste sportschrijvers van het land.",
    amazonUrl: "https://amzn.to/4gxPZIp",
  },
  {
    slug: "rotterdam-wederopbouw-groenendijk",
    naam: "Rotterdam Wederopbouw — Paul Groenendijk (red.)",
    korteOmschrijving:
      "Gids met honderd wederopbouwprojecten uit Rotterdam — van het Groothandelsgebouw tot Pendrecht en Ommoord, met historische foto's naast de huidige situatie.",
    amazonUrl: "https://amzn.to/4w0zclU",
  },
];

export interface ZeelandBoek {
  slug: string;
  naam: string;
  korteOmschrijving: string;
  amazonUrl?: string;
  internalUrl?: string;
  todo?: string;
}

export const zeelandBoeken: ZeelandBoek[] = [
  {
    slug: "schaduwen-over-domburg",
    naam: "Schaduwen over Domburg — Ard Breure",
    korteOmschrijving:
      "Een literaire thriller die begint met een lichaam op het strand van Domburg en een rechercheur die een oude belofte niet nakwam — een verhaal dat de Zeeuwse kust als personage gebruikt.",
    internalUrl: "/boeken/schaduwen-over-domburg",
  },
  {
    slug: "time-to-momo-zeeland",
    naam: "Time to Momo Zeeland",
    korteOmschrijving:
      "Zoek je geen roman maar een praktische gids voor je volgende tripje naar Zeeland? Time to Momo Zeeland neemt je mee naar de leukste stranden, verrassende hotspots en goede horeca — van gezellige terrasjes tot de vis die zo vanuit zee op je bord belandt. Met tips van locals haal je alles uit je bezoek aan 'het Zeeuwse'.",
    // TODO: amazonUrl invullen met affiliate link zodra beschikbaar.
    todo: "Affiliate link nog invullen; cover afbeelding is een placeholder totdat de echte omslag beschikbaar is.",
  },
  // Meer Zeeuwse romans, verhalen en reisgidsen volgen hier.
];

export function getEreaderBySlug(slug: string): Ereader | undefined {
  return ereaders.find((item) => item.slug === slug);
}

export function getRotterdamBoekBySlug(slug: string): RotterdamBoek | undefined {
  return rotterdamBoeken.find((item) => item.slug === slug);
}

export function getZeelandBoekBySlug(slug: string): ZeelandBoek | undefined {
  return zeelandBoeken.find((item) => item.slug === slug);
}
