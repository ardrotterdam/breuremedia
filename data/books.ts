export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Optional translation of a book's editorial content. Only titles published
 * in that language carry the matching block (`en` / `de`); others leave it
 * undefined. Structural/commercial fields (slug, price, currency, format)
 * are shared and stay on the parent Book. Cover image may be overridden when
 * the translated edition has its own artwork.
 */
export interface BookTranslation {
  /** Translated URL slug, used under /en/<slug> or /de/<slug>. */
  slug: string;
  title: string;
  subtitle: string;
  genre: string;
  tagline: string;
  description: string;
  longDescription: string[];
  /** English-edition cover; falls back to the parent Book coverImage when omitted. */
  coverImage?: string;
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
  /**
   * Curated reading-list pages this book belongs to. Rendered as internal
   * links on the book detail page, so authority flows to the topical
   * leeslijsten (e.g. boeken over Rotterdam / Zeeland).
   */
  relatedReadingLists?: { href: string; label: string }[];
  /** English edition content, when the book is also published in English. */
  en?: BookTranslation;
  /** German edition content, when the book is also published in German. */
  de?: BookTranslation;
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
      "Een lichaam op het strand. Een spoor naar de Rotterdamse haven. En een netwerk dat onzichtbaar blijft.",
    description:
      "Een lichaam spoelt aan op het strand van Domburg. Wat op het eerste gezicht een geïsoleerde zaak lijkt, blijkt het begin van iets veel groters.",
    longDescription: [
      "Een lichaam spoelt aan op het strand van Domburg. Wat op het eerste gezicht een geïsoleerde zaak lijkt, blijkt het begin van iets veel groters.",
      "Tom Jansen, voormalig politieman met jarenlange ervaring in de Rotterdamse haven, heeft zijn actieve loopbaan achter zich gelaten. Maar wanneer sporen van de zaak richting Rotterdam leiden, wordt hij opnieuw geconfronteerd met een wereld die hij maar al te goed kent: containers, expediteurs, douanecontroles en handelsroutes waar enorme hoeveelheden goederen dagelijks vrijwel ongezien passeren.",
      "In de Eemhaven ontdekt hij dat achter ogenschijnlijk gewone vracht een netwerk schuilgaat waarin wapens, militaire elektronica en internationale belangen samenkomen. Documenten kloppen. Containers zijn verzegeld. Systemen geven geen alarm. En toch klopt er iets niet.",
      "Terwijl het onderzoek zich verplaatst van de Zeeuwse kust naar de donkere randen van de Rotterdamse haven, wordt het steeds moeilijker vast te stellen wie de waarheid spreekt en wie slechts precies genoeg waarheid vertelt om buiten beeld te blijven.",
      "Schaduwen over Domburg is een moderne Nederlandse thriller over macht, internationale smokkel, technologie en de kwetsbaarheid van een wereld die vertrouwt op data, procedures en systemen. Een verhaal waarin de feiten helder kunnen zijn, de vragen logisch lijken en de antwoorden allesbehalve duidelijk zijn.",
    ],
    coverImage: "/assets/schaduwen-over-domburg-cover.webp",
    coverAlt:
      "Boekomslag Schaduwen over Domburg, een literaire thriller van Ard Breure met een donker strand, watertoren en skyline",
    price: 29.95,
    priceFormatted: "€29,95",
    currency: "EUR",
    language: "nl",
    format: "Paperback",
    formatNote:
      "Schaduwen over Domburg verschijnt naar verwachting najaar 2026. Schrijf je in voor de nieuwsbrief om als eerste bericht te ontvangen over de exacte verschijningsdatum, prijs en een exclusieve voorpublicatie.",
    setting: "Domburg, Zeeland: Nederlandse kust",
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
    relatedReadingLists: [
      { href: "/boeken-over-rotterdam", label: "Boeken over Rotterdam" },
      { href: "/boeken-over-zeeland", label: "Boeken over Zeeland" },
    ],
    faq: [
      {
        question: "Wat is een literaire thriller?",
        answer:
          "Een literaire thriller combineert spanning met verzorgde taal, diepgaande personages en thema's die verder gaan dan de misdaad zelf. De nadruk ligt op psychologie, sfeer en morele dilemma's, niet alleen op wie de dader is.",
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
        "A body on the beach. A trail to the Port of Rotterdam. And a network that remains invisible.",
      description:
        "A body washes ashore on the beach at Domburg. What first appears to be an isolated case soon points to something far larger.",
      longDescription: [
        "A body washes ashore on the beach at Domburg. What first appears to be an isolated case soon points to something far larger.",
        "Tom Jansen, a former police officer with years of experience in the Port of Rotterdam, has left his active career behind. But when the trail leads back toward Rotterdam, he is drawn once more into a world he knows intimately: containers, freight forwarders, customs inspections and global trade routes through which enormous volumes of cargo move every day almost unnoticed.",
        "At the Eemhaven, he discovers that behind seemingly ordinary shipments lies a network where weapons, military electronics and international interests intersect. The documents are correct. The containers are sealed. The systems raise no alarm. And yet something is wrong.",
        "As the investigation moves from the windswept Zeeland coast to the darker edges of the Port of Rotterdam, it becomes increasingly difficult to determine who is telling the truth and who is revealing just enough of it to remain invisible.",
        "Shadows over Domburg is a contemporary Dutch thriller about power, international smuggling, technology and the vulnerability of a world that has learned to trust data, procedures and systems. A story in which the facts may be clear, the questions may seem logical, and the answers are anything but.",
      ],
      coverImage: "/assets/shadows-over-domburg-book-cover.webp",
      coverAlt:
        "English book cover of Shadows over Domburg by Ard Breure",
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
    de: {
      slug: "schatten-ueber-domburg",
      title: "Schatten über Domburg",
      subtitle: "Ein literarischer Thriller",
      genre: "Literarischer Thriller",
      tagline:
        "Ein Körper am Strand. Eine Spur in den Rotterdamer Hafen. Und ein Netz, das unsichtbar bleibt.",
      description:
        "Ein Körper treibt an den Strand von Domburg. Was wie ein Einzelfall wirkt, ist der Anfang von etwas Größerem.",
      longDescription: [
        "Ein Körper treibt an den Strand von Domburg. Was wie ein Einzelfall wirkt, ist der Anfang von etwas Größerem.",
        "Tom Jansen, früher Polizist mit langen Jahren im Rotterdamer Hafen, hat den aktiven Dienst hinter sich. Als die Spuren der Sache nach Rotterdam weisen, trifft er wieder auf eine Welt, die er genau kennt: Container, Spediteure, Zollkontrollen und Handelswege, auf denen täglich enorme Mengen an Fracht nahezu unbemerkt passieren.",
        "Im Eemhaven entdeckt er, dass hinter scheinbar gewöhnlicher Ladung ein Netz steckt, in dem Waffen, militärische Elektronik und internationale Interessen zusammenlaufen. Die Papiere stimmen. Die Container sind verplombt. Die Systeme schlagen keinen Alarm. Und trotzdem stimmt etwas nicht.",
        "Während die Ermittlung von der zeeländischen Küste an die dunklen Ränder des Rotterdamer Hafens wandert, wird es immer schwerer zu sagen, wer die Wahrheit spricht und wer gerade so viel Wahrheit preisgibt, dass er unsichtbar bleibt.",
        "Schatten über Domburg ist ein zeitgenössischer niederländischer Thriller über Macht, internationalen Schmuggel, Technik und die Verletzlichkeit einer Welt, die Daten, Verfahren und Systemen vertraut. Eine Geschichte, in der die Fakten klar sein können, die Fragen logisch wirken und die Antworten alles andere als eindeutig sind.",
      ],
      coverImage: "/assets/schatten-ueber-domburg-cover.webp",
      coverAlt:
        "Buchcover Schatten über Domburg von Ard Breure: einsame Gestalt am Strand von Domburg, Wasserturm und Rotterdamer Hafenskyline unter Gewitterhimmel",
      formatNote:
        "Schatten über Domburg erscheint voraussichtlich im Herbst 2026. Schreiben Sie sich für den Newsletter ein, damit Sie zuerst vom genauen Erscheinungstermin, dem Preis und einer exklusiven Vorveröffentlichung erfahren.",
      setting: "Domburg, Zeeland: die niederländische Küste",
      themes: [
        "Stille und Spannung",
        "Moralische Entscheidungen",
        "Psychologische Tiefe",
        "Schauplatz an der niederländischen Küste",
      ],
      keywords: [
        "literarischer Thriller",
        "Zeeland Krimi",
        "Domburg Roman",
        "Küstenkrimi Niederlande",
        "Domburg Krimi",
        "niederländischer Thriller",
        "Schatten über Domburg",
        "Ard Breure",
      ],
      faq: [
        {
          question: "Was ist ein literarischer Thriller?",
          answer:
            "Ein literarischer Thriller verbindet Spannung mit sorgfältiger Sprache, Figuren mit Tiefe und Themen, die über die Tat hinausreichen. Der Schwerpunkt liegt auf Psychologie, Atmosphäre und moralischen Fragen, nicht nur darauf, wer der Täter ist.",
        },
        {
          question: "Wo spielt Schatten über Domburg?",
          answer:
            "Die Geschichte spielt an der niederländischen Küste, in und um Domburg in Zeeland. Das Meer, der Nebel und die Stille des Badeortes gehören zur Spannung dazu.",
        },
        {
          question:
            "Worin unterscheidet sich ein literarischer Thriller von einem gewöhnlichen Thriller?",
          answer:
            "Bei einem gewöhnlichen Thriller stehen Plot und Handlung im Vordergrund. Ein literarischer Thriller nimmt sich Zeit für Figuren, Atmosphäre und Sprache. Sie lesen nicht nur, um zu erfahren, was geschieht, sondern um die Menschen und ihre Entscheidungen zu verstehen.",
        },
        {
          question: "Für wen ist dieses Buch geeignet?",
          answer:
            "Für Leserinnen und Leser, die Thriller mit psychologischer Tiefe suchen. Wenn Sie Autoren wie Thomas Ammich oder Bernd Stelter kennen und eine Geschichte schätzen, die sich langsam aufbaut statt sofort zu eskalieren, passt dieses Buch zu Ihnen.",
        },
        {
          question: "Wie kann ich Schatten über Domburg bestellen?",
          answer:
            "Schatten über Domburg erscheint voraussichtlich im Herbst 2026. Die Bestellung öffnet, sobald der Erscheinungstermin feststeht. Schreiben Sie sich über das Formular auf dieser Seite ein oder mailen Sie an info@breuremedia.com, damit Sie zuerst benachrichtigt werden.",
        },
        {
          question: "Was kostet das Buch?",
          answer:
            "Der Richtpreis beträgt 29,95 €. Das Buch erscheint voraussichtlich im Herbst 2026. Die endgültige Ausgabe, Paperback oder Hardcover, und der genaue Termin werden später bekanntgegeben.",
        },
      ],
    },
  },
  {
    slug: "zero-day-directive",
    title: "Zero Day Directive",
    subtitle: "Een technothriller",
    genre: "Technothriller",
    author: "Ard Breure",
    tagline:
      "Een zero-day exploit treft het hart van de Europese democratie. De tijd tikt. En de grens tussen loyaliteit en verraad vervaagt.",
    description:
      "Een zero-day exploit treft het hart van de Europese democratie. De tijd tikt. En de grens tussen loyaliteit en verraad vervaagt.",
    longDescription: [
      "Een zero-day exploit treft het hart van de Europese democratie. De tijd tikt. En de grens tussen loyaliteit en verraad vervaagt.",
      "Wanneer een verwoestende cyberaanval het Europees Parlement verlamt, wordt Europa in een hoek gedreven. Terwijl Brussel zich voorbereidt op een historische stemming over digitale souvereiniteit, waarin gekozen moet worden tussen de traditionele alliantie met Amerika en een onafhankelijke koers, eist Iran de aanval op en dreigt de Straat van Hormuz te sluiten om Europese neutraliteit af te dwingen.",
      "Slechts één cybersecurity-analist in Brussel stuit op de gevaarlijke waarheid die in de code verborgen zit. Maar terwijl hij zich een weg baant door een labyrint van staatshacking, politieke spionage en digitale oorlogsvoering, wordt de stemming zelf in het geheim gemanipuleerd. Als de uitslag kantelt, verschuift het geopolitieke machtsevenwicht voorgoed.",
      "Boordevol authentieke tech-spanning, zenuwslopende actie en realistische geopolitiek is Zero Day Directive een meeslepende techno-thriller voor liefhebbers van Tom Clancy, Daniel Silva en William Gibson.",
      "Komt de waarheid boven tafel voordat de democratie wordt herschreven?",
    ],
    coverImage: "/assets/zero-day-directive.webp",
    coverAlt:
      "Zero Day Directive - cyberthriller van Ard Breure, boekomslag met digitaal glitch-effect, binary code en het Europees Parlement",
    price: 29.95,
    priceFormatted: "€29,95",
    currency: "EUR",
    language: "nl",
    format: "Paperback",
    formatNote:
      "Zero Day Directive verschijnt naar verwachting januari 2027. Schrijf je in voor de nieuwsbrief om als eerste bericht te ontvangen over de exacte verschijningsdatum, prijs en een exclusieve voorpublicatie.",
    setting: "Nederland: de grens tussen fysieke en digitale werkelijkheid",
    themes: [
      "Technologie en kwetsbaarheid",
      "Stilzwijgen en geheimen",
      "Morele keuzes in een digitale wereld",
    ],
    keywords: [
      "technothriller",
      "Nederlandse thriller",
      "literaire thriller",
      "cyberthriller",
      "Zero Day Directive",
      "Ard Breure",
    ],
    faq: [
      {
        question: "Wanneer verschijnt Zero Day Directive?",
        answer:
          "Zero Day Directive verschijnt naar verwachting januari 2027. Schrijf je in voor de wachtlijst om als eerste op de hoogte te worden gebracht.",
      },
      {
        question: "Wat is Zero Day Directive over?",
        answer:
          "Een zero-day exploit slaat toe in het hart van de Europese democratie. Wanneer een cyberaanval het Europees Parlement lamlegt en een stemming over digitale soevereiniteit wordt gemanipuleerd, ontdekt één cybersecurity-analist in Brussel de gevaarlijke waarheid in de code.",
      },
      {
        question:
          "Is Zero Day Directive een vervolg op Schaduwen over Domburg?",
        answer:
          "Nee, Zero Day Directive is een zelfstandige thriller. Wel geschreven in dezelfde literaire traditie.",
      },
      {
        question: "Hoe kan ik Zero Day Directive bestellen?",
        answer:
          "Zero Day Directive verschijnt naar verwachting januari 2027. De bestelfunctionaliteit volgt zodra de verschijningsdatum vaststaat. Schrijf je in via het formulier op deze pagina of neem contact op via info@breuremedia.com om als eerste bericht te ontvangen.",
      },
      {
        question: "Wat kost het boek?",
        answer:
          "De adviesprijs is €29,95. Het boek verschijnt naar verwachting januari 2027; de definitieve uitvoering (paperback of hardcover) en het exacte verschijningsmoment worden nader bekendgemaakt.",
      },
    ],
    en: {
      slug: "zero-day-directive",
      title: "Zero Day Directive",
      subtitle: "A technothriller",
      genre: "Technothriller",
      tagline:
        "A zero-day exploit strikes at the heart of European democracy. The clock is ticking—and the line between loyalty and betrayal is fading.",
      description:
        "A zero-day exploit strikes at the heart of European democracy. The clock is ticking—and the line between loyalty and betrayal is fading.",
      longDescription: [
        "A zero-day exploit strikes at the heart of European democracy. The clock is ticking—and the line between loyalty and betrayal is fading.",
        "When a devastating cyberattack paralyzes the European Parliament, Europe is forced into a corner. As Brussels prepares for a historic vote on digital sovereignty—choosing between its traditional alliance with America and an independent future—Iran claims the attack, threatening to shut down the Strait of Hormuz to force European neutrality.",
        "Only one cybersecurity analyst in Brussels stumbles upon the dangerous truth hidden within the code. But as he races through a labyrinth of state-sponsored hacking, political espionage, and digital warfare, the vote itself is being secretly manipulated. If the result flips, the geopolitical balance of power will shift forever.",
        "Packed with authentic tech suspense, pulse-pounding action, and realistic geopolitics, Zero Day Directive is a gripping techno-thriller for fans of Tom Clancy, Daniel Silva, and William Gibson.",
        "Will the truth emerge before democracy is rewritten?",
      ],
      coverAlt:
        "Zero Day Directive - cyber thriller by Ard Breure, book cover with digital glitch effect, binary code and the European Parliament",
      formatNote:
        "Zero Day Directive is expected to be published in January 2027. Sign up for the newsletter to be the first to receive updates on the exact publication date, price, and an exclusive preview.",
      setting:
        "The Netherlands — the border between physical and digital reality",
      themes: [
        "Technology and vulnerability",
        "Silence and secrets",
        "Moral choices in a digital world",
      ],
      keywords: [
        "technothriller",
        "Dutch thriller",
        "literary thriller",
        "cyber thriller",
        "Zero Day Directive",
        "Ard Breure",
      ],
      faq: [
        {
          question: "When will Zero Day Directive be published?",
          answer:
            "Zero Day Directive is expected to be published in January 2027. Join the waiting list to be notified first.",
        },
        {
          question: "What is Zero Day Directive about?",
          answer:
            "A zero-day exploit strikes at the heart of European democracy. When a cyberattack paralyzes the European Parliament and a vote on digital sovereignty is manipulated, one cybersecurity analyst in Brussels uncovers the dangerous truth hidden in the code.",
        },
        {
          question:
            "Is Zero Day Directive a sequel to Shadows over Domburg?",
          answer:
            "No, Zero Day Directive is a standalone thriller. Written in the same literary tradition.",
        },
        {
          question: "How can I order Zero Day Directive?",
          answer:
            "Zero Day Directive is expected in January 2027. Ordering will open once the release date is confirmed. Sign up through the form on this page or write to info@breuremedia.com to be the first to know.",
        },
        {
          question: "What does the book cost?",
          answer:
            "The recommended price is €29.95. The book is expected in January 2027; the final edition (paperback or hardcover) and the exact release date will be announced later.",
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

/** Books that also have a German edition (i.e. carry a `de` block). */
export function getGermanBooks(): (Book & { de: BookTranslation })[] {
  return books.filter(
    (book): book is Book & { de: BookTranslation } => book.de !== undefined
  );
}

/** Find a book by its German slug (the segment used under /de/<slug>). */
export function getBookByGermanSlug(
  deSlug: string
): (Book & { de: BookTranslation }) | undefined {
  return getGermanBooks().find((book) => book.de.slug === deSlug);
}
