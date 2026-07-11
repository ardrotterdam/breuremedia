export interface FaqItem {
  question: string;
  answer: string;
}

export interface Book {
  slug: string;
  title: string;
  subtitle: string;
  genre: string;
  author: string;
  tagline: string;
  description: string;
  longDescription: string[];
  coverImage: string;
  coverAlt: string;
  price: number;
  priceFormatted: string;
  currency: string;
  language: string;
  formatNote: string;
  setting: string;
  themes: string[];
  isbn?: string;
  published?: string;
  keywords: string[];
  faq: FaqItem[];
}

/**
 * Central book registry. Add a new entry here to auto-generate
 * the book detail page, sitemap entry, and overview listing.
 */
export const books: Book[] = [
  {
    slug: "schaduwen-over-domburg",
    title: "Schaduwen over Domburg",
    subtitle: "Een literaire thriller",
    genre: "Literaire thriller",
    author: "Ard Breure",
    tagline:
      "Een lichaam op het strand van Domburg. Een rechercheur die vijf jaar geleden een belofte niet nakwam. En een leugen die, net als de zee, altijd weer aanspoelt.",
    description:
      "Een literaire thriller over stilte, schuld en de rekening die altijd komt — aan de Nederlandse kust, waar een oude belofte terugspoelt met de vloed.",
    longDescription: [
      "Op het strand van Domburg spoelt het lichaam aan van een Amerikaan die niemand hier hoorde te kennen. Voor rechercheur Tom Jansen — ooit Zeehavenpolitie Rotterdam, nu niemand meer — is het geen vreemde zaak. Het is een oude schuld die terugkomt met de vloed.",
      "Vijf jaar eerder beloofde Jansen deze man bescherming. Hij hield die belofte niet. Nu ligt hij op het zand, met een horloge dat exact vier minuten heeft geregistreerd voordat het stilviel — vier minuten waarin iemand tegenover hem stond die de zee niet heeft prijsgegeven.",
      "Samen met de Deense rechercheur Larsen volgt Jansen een spoor van containers, verdwenen wapenonderdelen en mannen die zichzelf schuilnamen geven — terug naar de haven waar hij ooit zijn eed aflegde, en naar een leugen die groter is dan hijzelf.",
      "Schaduwen over Domburg is een literaire thriller over stilte, schuld en de rekening die altijd komt — geschreven in de traditie van Mulisch en Hermans: koel, precies, en genadeloos eerlijk over wat mensen elkaar niet vertellen.",
    ],
    coverImage: "/assets/schaduwen-over-domburg-cover.webp",
    coverAlt: "Boekomslag van Schaduwen over Domburg door Ard Breure",
    price: 29.95,
    priceFormatted: "€29,95",
    currency: "EUR",
    language: "nl",
    formatNote:
      "Nu in eindredactie. Meld je aan voor de nieuwsbrief voor verschijningsdatum, prijs en een exclusieve voorpublicatie.",
    setting: "Domburg, Zeeland — Nederlandse kust",
    themes: [
      "Stilte en spanning",
      "Morele keuzes",
      "Psychologische diepgang",
      "Nederlandse kustsetting",
    ],
    keywords: [
      "literaire thriller",
      "Nederlandse thriller",
      "thriller Zeeland",
      "thriller Domburg",
      "psychologische thriller",
      "Ard Breure",
    ],
    faq: [
      {
        question: "Wat is een literaire thriller?",
        answer:
          "Een literaire thriller combineert spanning met verzorgde taal, diepgaande personages en thema's die verder gaan dan de misdaad zelf. De nadruk ligt op psychologie, sfeer en morele dilemma's — niet alleen op wie de dader is.",
      },
      {
        question: "Waar speelt Schaduwen over Domburg zich af?",
        answer:
          "Het verhaal speelt zich af aan de Nederlandse kust, in en rond Domburg in Zeeland. De zee, de mist en de stilte van het kustdorp vormen een integraal onderdeel van de spanning.",
      },
      {
        question:
          "Wat is het verschil tussen een literaire thriller en een gewone thriller?",
        answer:
          "Bij een reguliere thriller staat het plot en de actie voorop. Een literaire thriller neemt de tijd voor karakterontwikkeling, atmosfeer en taal. Je leest niet alleen om te weten wat er gebeurt, maar ook om de mensen en hun keuzes te begrijpen.",
      },
      {
        question: "Voor wie is dit boek geschikt?",
        answer:
          "Voor lezers die houden van Nederlandse thrillers met psychologische diepgang. Als je graag leest van auteurs als Esther Verhoef, Saskia Noort of Anya Niewierra, en je waardeert een verhaal dat langzaam opbouwt in plaats van meteen te escaleren, past dit boek bij je.",
      },
      {
        question: "Hoe kan ik Schaduwen over Domburg bestellen?",
        answer:
          "De bestelfunctionaliteit volgt binnenkort. Schrijf je in voor de nieuwsbrief op de homepage of neem contact op via info@breuremedia.com om op de hoogte te blijven van de verschijningsdatum.",
      },
      {
        question: "Wat kost het boek?",
        answer:
          "De adviesprijs is €29,95. De definitieve uitvoering (paperback of hardcover) en het exacte verschijningsmoment worden binnenkort bekendgemaakt.",
      },
    ],
  },
];

export function getAllBooks(): Book[] {
  return books;
}

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((book) => book.slug === slug);
}

export function getAllBookSlugs(): string[] {
  return books.map((book) => book.slug);
}
