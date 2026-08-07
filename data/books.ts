export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Optional English translation of a book's editorial content. Only titles
 * the author publishes in English carry this block; Dutch-only titles leave
 * it undefined. Structural/commercial fields (slug, price, currency, format,
 * cover image) are shared and stay on the parent Book.
 */
export interface BookTranslation {
  /** English URL slug, used under /en/<slug>. */
  slug: string;
  title: string;
  subtitle: string;
  genre: string;
  tagline: string;
  description: string;
  longDescription: string[];
  coverAlt: string;
  formatNote: string;
  setting: string;
  themes: string[];
  keywords: string[];
  faq: FaqItem[];
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
  format: string;
  formatNote: string;
  setting: string;
  themes: string[];
  isbn?: string;
  published?: string;
  keywords: string[];
  faq: FaqItem[];
  /** English edition content, when the book is also published in English. */
  en?: BookTranslation;
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
    format: "Paperback",
    formatNote:
      "Schaduwen over Domburg verschijnt naar verwachting najaar 2026. Schrijf je in voor de nieuwsbrief om als eerste bericht te ontvangen over de exacte verschijningsdatum, prijs en een exclusieve voorpublicatie.",
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
          "Schaduwen over Domburg verschijnt naar verwachting najaar 2026. De bestelfunctionaliteit volgt zodra de verschijningsdatum vaststaat. Schrijf je in via het formulier op deze pagina of neem contact op via info@breuremedia.com om als eerste bericht te ontvangen.",
      },
      {
        question: "Wat kost het boek?",
        answer:
          "De adviesprijs is €29,95. Het boek verschijnt naar verwachting najaar 2026; de definitieve uitvoering (paperback of hardcover) en het exacte verschijningsmoment worden nader bekendgemaakt.",
      },
    ],
    en: {
      slug: "shadows-over-domburg",
      title: "Shadows over Domburg",
      subtitle: "A literary thriller",
      genre: "Literary thriller",
      tagline:
        "A body on the beach at Domburg. A detective who broke a promise five years ago. And a lie that, like the sea, always washes back ashore.",
      description:
        "A literary thriller about silence, guilt and the reckoning that always comes — set on the Dutch coast, where an old promise returns with the tide.",
      longDescription: [
        "On the beach at Domburg, the body of an American washes ashore — a man no one here was supposed to know. For detective Tom Jansen — once with the Rotterdam seaport police, now nobody at all — it is no stranger's case. It is an old debt returning with the tide.",
        "Five years earlier, Jansen promised this man protection. He did not keep that promise. Now the man lies on the sand, beside a watch that recorded exactly four minutes before it stopped — four minutes in which someone stood before him whom the sea has not given up.",
        "Together with the Danish detective Larsen, Jansen follows a trail of shipping containers, missing weapon parts and men who go by assumed names — back to the harbour where he once swore his oath, and to a lie larger than himself.",
        "Shadows over Domburg is a literary thriller about silence, guilt and the reckoning that always comes — written in the tradition of Mulisch and Hermans: cool, precise and unflinchingly honest about the things people never tell one another.",
      ],
      coverAlt: "Book cover of Shadows over Domburg by Ard Breure",
      formatNote:
        "Shadows over Domburg is expected in autumn 2026. Sign up for the newsletter to be the first to hear the exact release date, price and an exclusive preview.",
      setting: "Domburg, Zeeland — the Dutch coast",
      themes: [
        "Silence and suspense",
        "Moral choices",
        "Psychological depth",
        "Dutch coastal setting",
      ],
      keywords: [
        "literary thriller",
        "Dutch thriller",
        "thriller set in the Netherlands",
        "Zeeland thriller",
        "psychological thriller",
        "Ard Breure",
      ],
      faq: [
        {
          question: "What is a literary thriller?",
          answer:
            "A literary thriller combines suspense with careful prose, deeply drawn characters and themes that reach beyond the crime itself. The emphasis lies on psychology, atmosphere and moral dilemmas — not only on who did it.",
        },
        {
          question: "Where is Shadows over Domburg set?",
          answer:
            "The story takes place on the Dutch coast, in and around Domburg in the province of Zeeland. The sea, the mist and the silence of the coastal town are an integral part of the tension.",
        },
        {
          question:
            "What is the difference between a literary thriller and an ordinary thriller?",
          answer:
            "In a regular thriller, plot and action come first. A literary thriller takes its time for character development, atmosphere and language. You read not only to find out what happens, but also to understand the people and their choices.",
        },
        {
          question: "Who is this book for?",
          answer:
            "For readers who love thrillers with psychological depth. If you enjoy authors such as Tana French, Jo Nesbø or Kate Atkinson, and you appreciate a story that builds slowly rather than escalating at once, this book is for you.",
        },
        {
          question: "How can I order Shadows over Domburg?",
          answer:
            "Shadows over Domburg is expected in autumn 2026. Ordering will open once the release date is confirmed. Sign up through the form on this page or write to info@breuremedia.com to be the first to know.",
        },
        {
          question: "What does the book cost?",
          answer:
            "The recommended price is €29.95. The book is expected in autumn 2026; the final edition (paperback or hardcover) and the exact release date will be announced later.",
        },
      ],
    },
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

/** Books that also have an English edition (i.e. carry an `en` block). */
export function getEnglishBooks(): (Book & { en: BookTranslation })[] {
  return books.filter(
    (book): book is Book & { en: BookTranslation } => book.en !== undefined
  );
}

/** Find a book by its English slug (the segment used under /en/<slug>). */
export function getBookByEnglishSlug(
  enSlug: string
): (Book & { en: BookTranslation }) | undefined {
  return getEnglishBooks().find((book) => book.en.slug === enSlug);
}
