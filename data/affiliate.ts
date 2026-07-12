export interface Ereader {
  slug: string;
  naam: string;
  korteOmschrijving: string;
  amazonUrl: string;
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
    amazonUrl: "",
    todo: "AMAZON-LINK INVOEGEN",
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
      "Dé Rotterdamse roman, punt. Het verhaal van Katadreuffe, de zoon van deurwaarder Dreverhaven, die zich tegen zijn vader in omhoog vecht in het vooroorlogse Rotterdam van kantoren, kades en armoede.",
    amazonUrl: "",
    todo: "AMAZON-LINK INVOEGEN",
  },
  {
    slug: "jules-deelder",
    naam: "Jules Deelder — de stem van Rotterdam",
    korteOmschrijving:
      "Over Rotterdam schrijven zonder Deelder te noemen is als over de stad lopen zonder de Maas over te steken. De nachtburgemeester ving de stad in gedichten en verhalen die je hardop wilt lezen.",
    amazonUrl: "",
    todo: "TITEL + LINK KIEZEN",
  },
  {
    slug: "hugo-borst",
    naam: "Hugo Borst — Rotterdam en voetbal",
    korteOmschrijving:
      "Geen stad waar voetbal en identiteit zo in elkaar grijpen als hier, en niemand schrijft daar zo goed over als Hugo Borst — Spartaan, columnist, en een van de beste sportschrijvers van het land.",
    amazonUrl: "",
    todo: "TITEL + LINK KIEZEN",
  },
  {
    slug: "bombardement-wederopbouw",
    naam: "Het bombardement en de wederopbouw",
    korteOmschrijving:
      "14 mei 1940 is het scharnierpunt van alles wat Rotterdam is. Wie de stad wil begrijpen moet iets lezen over de verwoesting en wat daarna kwam.",
    amazonUrl: "",
    todo: "TITEL + LINK KIEZEN",
  },
  {
    slug: "moderne-rotterdamse-thriller",
    naam: "Een moderne Rotterdamse thriller",
    korteOmschrijving:
      "De stad van nu — met haar torens, haar haven vol camera's en haar oude wijken onder druk — is een cadeau voor thrillerschrijvers.",
    amazonUrl: "",
    todo: "TITEL + LINK KIEZEN",
  },
];

export function getEreaderBySlug(slug: string): Ereader | undefined {
  return ereaders.find((item) => item.slug === slug);
}

export function getRotterdamBoekBySlug(slug: string): RotterdamBoek | undefined {
  return rotterdamBoeken.find((item) => item.slug === slug);
}
