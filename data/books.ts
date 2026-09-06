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
      setting: "Domburg, Zeeland: the Dutch coast",
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
            "A literary thriller combines suspense with careful prose, deeply drawn characters and themes that reach beyond the crime itself. The emphasis lies on psychology, atmosphere and moral dilemmas, not only on who did it.",
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
        "Schatten über Domburg erscheint voraussichtlich im Herbst 2026. Lesen Sie jetzt kostenlos das erste Kapitel.",
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
            "Für Leserinnen und Leser, die Thriller mit psychologischer Tiefe suchen. Wenn Sie die zeeländische Küste aus den Krimis von Thomas Ammich oder Bernd Stelter kennen, aber eine Geschichte suchen, die sich langsam aufbaut und tiefer geht, passt dieses Buch zu Ihnen.",
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
    coverImage:
      "/assets/zero-day-directive-ard-breure-nederlandse-cover.webp",
    coverAlt:
      "Zero Day Directive van Ard Breure, Nederlandse boekcover van een politieke technothriller over een digitale dreiging voor de Europese democratie",
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
        "A zero-day exploit strikes at the heart of European democracy. The clock is ticking, and the line between loyalty and betrayal is fading.",
      description:
        "A zero-day exploit strikes at the heart of European democracy. The clock is ticking, and the line between loyalty and betrayal is fading.",
      longDescription: [
        "A zero-day exploit strikes at the heart of European democracy. The clock is ticking, and the line between loyalty and betrayal is fading.",
        "When a devastating cyberattack paralyzes the European Parliament, Europe is forced into a corner. As Brussels prepares for a historic vote on digital sovereignty, choosing between its traditional alliance with America and an independent future, Iran claims the attack, threatening to shut down the Strait of Hormuz to force European neutrality.",
        "Only one cybersecurity analyst in Brussels stumbles upon the dangerous truth hidden within the code. But as he races through a labyrinth of state-sponsored hacking, political espionage, and digital warfare, the vote itself is being secretly manipulated. If the result flips, the geopolitical balance of power will shift forever.",
        "Packed with authentic tech suspense, pulse-pounding action, and realistic geopolitics, Zero Day Directive is a gripping techno-thriller for fans of Tom Clancy, Daniel Silva, and William Gibson.",
        "Will the truth emerge before democracy is rewritten?",
      ],
      coverImage:
        "/assets/zero-day-directive-ard-breure-english-cover.webp",
      coverAlt:
        "Zero Day Directive by Ard Breure, English book cover for a political techno-thriller about a digital threat to European democracy",
      formatNote:
        "Zero Day Directive is expected to be published in January 2027. Sign up for the newsletter to be the first to receive updates on the exact publication date, price, and an exclusive preview.",
      setting:
        "The Netherlands: the border between physical and digital reality",
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
    de: {
      slug: "zero-day-directive",
      title: "Zero Day Directive",
      subtitle: "Ein Technothriller",
      genre: "Technothriller",
      tagline:
        "Eine bislang unbekannte Sicherheitslücke bedroht das Herz der europäischen Demokratie. Die Uhr tickt. Und die Grenze zwischen Loyalität und Verrat verschwimmt.",
      description:
        "Eine bislang unbekannte Sicherheitslücke bedroht das Herz der europäischen Demokratie. Die Uhr tickt. Und die Grenze zwischen Loyalität und Verrat verschwimmt.",
      longDescription: [
        "Eine bislang unbekannte Sicherheitslücke bedroht das Herz der europäischen Demokratie. Die Uhr tickt. Und die Grenze zwischen Loyalität und Verrat verschwimmt.",
        "Als ein verheerender Cyberangriff das Europäische Parlament lähmt, wird Europa in die Enge getrieben. Während Brüssel sich auf eine historische Abstimmung über digitale Souveränität vorbereitet, in der zwischen dem traditionellen Bündnis mit Amerika und einem unabhängigen Kurs gewählt werden muss, beansprucht Iran den Angriff für sich und droht, die Straße von Hormus zu schließen, um europäische Neutralität zu erzwingen.",
        "Nur ein Cybersicherheitsanalyst in Brüssel stößt auf die gefährliche Wahrheit, die im Code verborgen liegt. Doch während er sich durch ein Labyrinth aus staatlich gelenktem Hacking, politischer Spionage und digitaler Kriegsführung kämpft, wird die Abstimmung selbst im Geheimen manipuliert. Kippt das Ergebnis, verschiebt sich das geopolitische Machtgleichgewicht für immer.",
        "Authentische Tech-Spannung, atemlose Handlung und realistische Geopolitik: Zero Day Directive ist ein Techno-Thriller für Leserinnen und Leser von Tom Clancy, Daniel Silva und William Gibson.",
        "Kommt die Wahrheit ans Licht, bevor die Demokratie neu geschrieben wird?",
      ],
      coverImage:
        "/assets/zero-day-directive-ard-breure-deutsche-cover.webp",
      coverAlt:
        "Zero Day Directive von Ard Breure, deutsche Buchcover-Ausgabe eines politischen Technothrillers über eine digitale Bedrohung der europäischen Demokratie",
      formatNote:
        "Zero Day Directive erscheint voraussichtlich im Januar 2027. Schreiben Sie sich für den Newsletter ein, um als Erste vom genauen Erscheinungstermin, vom Preis und von einer exklusiven Vorabveröffentlichung zu erfahren.",
      setting:
        "Niederlande: die Grenze zwischen physischer und digitaler Wirklichkeit",
      themes: [
        "Technologie und Verletzlichkeit",
        "Schweigen und Geheimnisse",
        "Moralische Entscheidungen in einer digitalen Welt",
      ],
      keywords: [
        "Technothriller",
        "niederländischer Thriller",
        "literarischer Thriller",
        "Cyberthriller",
        "Zero Day Directive",
        "Ard Breure",
      ],
      faq: [
        {
          question: "Wann erscheint Zero Day Directive?",
          answer:
            "Zero Day Directive erscheint voraussichtlich im Januar 2027. Schreiben Sie sich in die Warteliste ein, um als Erste benachrichtigt zu werden.",
        },
        {
          question: "Worum geht es in Zero Day Directive?",
          answer:
            "Ein Zero-Day-Exploit trifft das Herz der europäischen Demokratie. Als ein Cyberangriff das Europäische Parlament lähmt und eine Abstimmung über digitale Souveränität manipuliert wird, entdeckt ein Cybersicherheitsanalyst in Brüssel die gefährliche Wahrheit im Code.",
        },
        {
          question:
            "Ist Zero Day Directive eine Fortsetzung von Schatten über Domburg?",
          answer:
            "Nein, Zero Day Directive ist ein eigenständiger Thriller. Geschrieben in derselben literarischen Tradition.",
        },
        {
          question: "Wie kann ich Zero Day Directive bestellen?",
          answer:
            "Zero Day Directive erscheint voraussichtlich im Januar 2027. Die Bestellung öffnet, sobald der Erscheinungstermin feststeht. Schreiben Sie sich über das Formular auf dieser Seite ein oder mailen Sie an info@breuremedia.com, damit Sie zuerst benachrichtigt werden.",
        },
        {
          question: "Was kostet das Buch?",
          answer:
            "Der Richtpreis beträgt 29,95 €. Das Buch erscheint voraussichtlich im Januar 2027. Die endgültige Ausgabe, Paperback oder Hardcover, und der genaue Termin werden später bekanntgegeben.",
        },
      ],
    },
  },
  {
    slug: "de-laatste-ingreep",
    title: "De Laatste Ingreep",
    subtitle: "Geopolitieke AI-thriller",
    genre: "Geopolitieke AI-thriller",
    author: "Ard Breure",
    tagline:
      "Het grootste gevaar is misschien niet dat machines slimmer worden dan mensen. Maar dat de mens, op het moment dat het er echt toe doet, niet langer het laatste woord heeft.",
    description:
      "Kunstmatige intelligentie verandert de machtsverhoudingen sneller dan regeringen haar kunnen beheersen.",
    longDescription: [
      "Kunstmatige intelligentie verandert de machtsverhoudingen sneller dan regeringen haar kunnen beheersen.",
      "In Europa en de Verenigde Staten geven algoritmes allang niet meer alleen advies. Ze sturen beslissingen, beïnvloeden instituties en bepalen steeds vaker welke informatie wordt vertrouwd, en welke wordt genegeerd.",
      "Wanneer een reeks gebeurtenissen blootlegt hoe diep geautomatiseerde systemen zijn doorgedrongen in politiek, veiligheid en het dagelijks bestuur, dringt één vraag zich onvermijdelijk op: wie heeft er werkelijk de controle?",
      "Het grootste gevaar is misschien niet dat machines slimmer worden dan mensen.",
      "Maar dat de mens, op het moment dat het er echt toe doet, niet langer het laatste woord heeft.",
      "De Laatste Ingreep is een geopolitieke AI-thriller over macht, technologie en het gevaarlijke kantelpunt waarop menselijk oordeel en machinelogica met elkaar botsen.",
    ],
    coverImage:
      "/assets/de-laatste-ingreep-ard-breure-geopolitieke-ai-thriller.webp",
    coverAlt:
      "De Laatste Ingreep van Ard Breure, geopolitieke AI-thriller over Europa, Amerika en kunstmatige intelligentie",
    price: 29.95,
    priceFormatted: "€29,95",
    currency: "EUR",
    language: "nl",
    format: "Paperback",
    formatNote: "",
    setting: "",
    themes: [],
    keywords: [
      "De Laatste Ingreep",
      "geopolitieke AI-thriller",
      "Europa",
      "Amerika",
      "kunstmatige intelligentie",
      "Ard Breure",
    ],
    faq: [],
    en: {
      slug: "the-final-override",
      title: "The Final Override",
      subtitle: "Geopolitical AI thriller",
      genre: "Geopolitical AI thriller",
      tagline:
        "The greatest threat may not be that machines become smarter than humans. It may be that, at the moment that matters most, humanity no longer gets the final say.",
      description:
        "Artificial intelligence is changing the balance of power faster than governments can control it.",
      longDescription: [
        "Artificial intelligence is changing the balance of power faster than governments can control it.",
        "Across Europe and the United States, algorithms are no longer just advising people. They are shaping decisions, influencing institutions and quietly determining which information is trusted, and which is ignored.",
        "When a series of events exposes how deeply automated systems have entered politics, security and public life, one question becomes impossible to avoid: who is really in control?",
        "The greatest threat may not be that machines become smarter than humans.",
        "It may be that, at the moment that matters most, humanity no longer gets the final say.",
        "The Final Override is a geopolitical AI thriller about power, technology and the dangerous point where human judgment and machine logic collide.",
      ],
      coverImage:
        "/assets/the-final-override-ard-breure-geopolitical-ai-thriller.webp",
      coverAlt:
        "The Final Override by Ard Breure, geopolitical AI thriller about Europe, America and artificial intelligence",
      formatNote: "",
      setting: "",
      themes: [],
      keywords: [
        "The Final Override",
        "geopolitical AI thriller",
        "Europe",
        "America",
        "artificial intelligence",
        "Ard Breure",
      ],
      faq: [],
    },
    de: {
      slug: "der-letzte-eingriff",
      title: "Der Letzte Eingriff",
      subtitle: "Geopolitischer KI-Thriller",
      genre: "Geopolitischer KI-Thriller",
      tagline:
        "Die größte Gefahr besteht vielleicht nicht darin, dass Maschinen intelligenter werden als Menschen. Sondern darin, dass der Mensch in dem Moment, in dem es darauf ankommt, nicht mehr das letzte Wort hat.",
      description:
        "Künstliche Intelligenz verändert die Machtverhältnisse schneller, als Regierungen sie kontrollieren können.",
      longDescription: [
        "Künstliche Intelligenz verändert die Machtverhältnisse schneller, als Regierungen sie kontrollieren können.",
        "In Europa und den Vereinigten Staaten beraten Algorithmen längst nicht mehr nur Menschen. Sie beeinflussen Entscheidungen, prägen Institutionen und bestimmen zunehmend, welchen Informationen vertraut wird, und welchen nicht.",
        "Als eine Reihe von Ereignissen offenlegt, wie tief automatisierte Systeme bereits in Politik, Sicherheit und öffentliche Entscheidungsprozesse eingedrungen sind, lässt sich eine Frage nicht länger verdrängen: Wer hat wirklich die Kontrolle?",
        "Die größte Gefahr besteht vielleicht nicht darin, dass Maschinen intelligenter werden als Menschen.",
        "Sondern darin, dass der Mensch in dem Moment, in dem es darauf ankommt, nicht mehr das letzte Wort hat.",
        "Der Letzte Eingriff ist ein geopolitischer KI-Thriller über Macht, Technologie und den gefährlichen Punkt, an dem menschliches Urteilsvermögen und Maschinenlogik aufeinanderprallen.",
      ],
      coverImage:
        "/assets/der-letzte-eingriff-ard-breure-deutsche-cover.webp",
      coverAlt:
        "Der Letzte Eingriff von Ard Breure, deutsche Buchcover eines geopolitischen KI-Thrillers über Mensch und Maschine",
      formatNote: "",
      setting: "",
      themes: [],
      keywords: [
        "Der Letzte Eingriff",
        "geopolitischer KI-Thriller",
        "Europa",
        "Amerika",
        "künstliche Intelligenz",
        "Ard Breure",
      ],
      faq: [],
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
