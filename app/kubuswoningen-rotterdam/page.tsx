import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { RelatedGuides } from "@/components/RelatedGuides";
import { formatBlogDate } from "@/data/blog";
import { author, siteConfig } from "@/lib/site";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, buildJsonLd, faqSchema } from "@/lib/schema";

interface ArticleImage {
  /** Public path, or null until a licensed/owned file is added. */
  src: string | null;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

function ArticleFigure({
  image,
  priority = false,
}: {
  image: ArticleImage;
  priority?: boolean;
}) {
  if (!image.src) {
    return null;
  }

  return (
    <figure className="content-section">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
        loading={priority ? undefined : "lazy"}
        sizes="(max-width: 768px) 100vw, 48rem"
        style={{ width: "100%", height: "auto", borderRadius: "2px" }}
      />
      {image.caption ? (
        <figcaption className="content-meta">{image.caption}</figcaption>
      ) : null}
    </figure>
  );
}

const pagePath = "/kubuswoningen-rotterdam";
const pageTitle =
  "Kubuswoningen Rotterdam: wat te zien, ervaren en weten voor je bezoek";
const pageHeadline = pageTitle;
const pageDescription =
  "Bezoek je de Kubuswoningen Rotterdam? Ontdek wat je ziet, hoe je de Kijk-Kubus van binnen bekijkt, hoeveel tijd je nodig hebt en wat er in de buurt ligt.";
const datePublished = "2026-08-19";
const dateModified = "2026-08-19";
const englishPath = "/en/cube-houses-rotterdam";

const articleImages = {
  hero: {
    src: "/images/cube-houses-blaak-near-markthal-rotterdam.webp",
    alt: "De gele kubuswoningen van Piet Blom bij station Blaak in Rotterdam",
    width: 1536,
    height: 1024,
    caption:
      "Kubuswoningen Rotterdam: gekantelde huizen op palen die samen een architectonisch bos vormen in het hart van de stad.",
  },
  promenade: {
    src: null,
    alt: "De wandelpromenade onder de kubuswoningen aan het Overblaak in Rotterdam",
    width: 1536,
    height: 1024,
    caption:
      "De promenade van het Blaakse Bos: publieke ruimte onder de private woningen.",
  },
  interior: {
    src: null,
    alt: "Interieur van de Kijk-Kubus museumwoning met schuine wanden en maatmeubilair",
    width: 1536,
    height: 1024,
    caption:
      "Binnen in de Kijk-Kubus: geen rechte muur, en toch een woning die werkt.",
  },
  nearby: {
    src: null,
    alt: "Uitzicht op de Markthal en de Laurenskerk vanaf de kubuswoningen bij Blaak",
    width: 1536,
    height: 1024,
    caption:
      "Vanaf het Overblaak liggen de Markthal, de Laurenskerk en de Oude Haven op loopafstand.",
  },
  rotterdamContext: {
    src: "/assets/rotterdam-maas-lezen-sfeerbeeld.webp",
    alt: "Illustratie van lezen aan het water in Rotterdam met de Erasmusbrug op de achtergrond",
    width: 1600,
    height: 600,
    caption:
      "Rotterdam voorbij de architectuur: de stad van verhalen en haven.",
  },
} as const satisfies Record<string, ArticleImage>;

const heroImage = articleImages.hero;

export const metadata: Metadata = buildMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  type: "article",
  image: heroImage.src,
  imageAlt: heroImage.alt,
  imageWidth: heroImage.width,
  imageHeight: heroImage.height,
  imageType: "image/webp",
  keywords: [
    "Kubuswoningen Rotterdam",
    "kubuswoningen",
    "Kijk-Kubus",
    "Piet Blom",
    "Blaakse Bos",
    "kubuswoningen bezoeken",
    "Rotterdam architectuur",
  ],
  languages: {
    nl: pagePath,
    en: englishPath,
    "x-default": englishPath,
  },
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
  { name: "Kubuswoningen Rotterdam", path: pagePath },
];

const cubeLevels = [
  {
    name: "Het straathuis",
    body: "De onderste verdieping: woonkamer met open keuken, met ramen die schuin naar beneden kijken, de straat en de promenade in.",
  },
  {
    name: "Het hemelhuis",
    body: "De middelste verdieping: slaapkamers en badkamer, in het brede midden van de gekantelde kubus.",
  },
  {
    name: "De loofhut",
    body: "De punt bovenin: een driezijdige piramide met ramen rondom, vaak in gebruik als tuinkamer, werkkamer of extra slaapplek, met uitzicht over de stad.",
  },
] as const;

const faqItems = [
  {
    question: "Zijn de Kubuswoningen Rotterdam de moeite waard?",
    answer:
      "Ja. Het is een staaltje architectuur dat je nergens anders op deze schaal vindt, en het bezoek is kort. Combineer het met de Markthal en de Oude Haven en je hebt een complete ochtend of middag in het Laurenskwartier.",
  },
  {
    question: "Kun je de Kubuswoningen van binnen bekijken?",
    answer:
      "Ja, via de Kijk-Kubus aan het Overblaak 70. Dat is een volledig ingerichte museumwoning, de enige kubus die zonder afspraak voor publiek open is. De overige kubussen zijn gewone woningen waar mensen wonen; daar kun je niet zomaar aanbellen.",
  },
  {
    question: "Hoeveel tijd heb je nodig bij de Kubuswoningen?",
    answer:
      "Reken op twintig tot dertig minuten voor de buitenkant en de promenade. Wil je ook de Kijk-Kubus van binnen zien, tel er dan ongeveer dertig minuten bij op. Samen is dat 45 tot 60 minuten.",
  },
  {
    question: "Wat kost een bezoek aan de Kijk-Kubus?",
    answer:
      "De entree is laagdrempelig: reken op ongeveer €3,50 voor volwassenen, met korting voor studenten en 65-plussers. Betalen kan doorgaans alleen met pin. De promenade onder en tussen de kubussen is vrij toegankelijk en kost niets.",
  },
  {
    question: "Kun je in een Kubuswoning in Rotterdam slapen?",
    answer:
      "Ja. In een van de superkubussen zit het Stayokay-hostel, dat in april 2026 na een grondige verbouwing opnieuw openging. Daarnaast worden losse kubussen soms via verhuurplatforms aangeboden.",
  },
  {
    question: "Is de Kijk-Kubus rolstoeltoegankelijk?",
    answer:
      "Nee. De woningen dateren uit de jaren tachtig en zijn ontsloten met smalle, steile trappen; er is geen lift. De buitenruimte en de promenade zijn wel begaanbaar, al liggen daar trappen naar het straatniveau.",
  },
  {
    question: "Wie ontwierp de Kubuswoningen en wanneer zijn ze gebouwd?",
    answer:
      "Architect Piet Blom ontwierp het complex; het werd gebouwd tussen 1982 en 1984. Blom vatte elke woning op als een boom en het geheel als een bos, vandaar de naam Blaakse Bos.",
  },
];

const articleSchema = {
  "@type": "Article",
  headline: pageHeadline,
  description: pageDescription,
  datePublished,
  dateModified,
  inLanguage: "nl",
  ...(heroImage.src ? { image: absoluteUrl(heroImage.src) } : {}),
  author: {
    "@type": "Person",
    name: author.name,
    url: absoluteUrl("/over-de-auteur"),
  },
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": absoluteUrl(pagePath),
  },
  about: {
    "@type": "TouristAttraction",
    name: "Kubuswoningen Rotterdam",
    alternateName: "Blaakse Bos",
    description:
      "Complex van 38 gekantelde kubuswoningen en twee superkubussen, ontworpen door Piet Blom en gebouwd tussen 1982 en 1984 boven de Blaak in Rotterdam.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Overblaak 70",
      postalCode: "3011 MH",
      addressLocality: "Rotterdam",
      addressCountry: "NL",
    },
  },
};

export default function KubuswoningenRotterdamPage() {
  const jsonLd = buildJsonLd(
    articleSchema,
    breadcrumbSchema(breadcrumbs),
    faqSchema(faqItems)
  );

  return (
    <main>
      <JsonLd data={jsonLd} />
      <PageHeader
        eyebrow="Rotterdam"
        title={pageHeadline}
        description={`Door Ard Breure, auteur van Schaduwen over Domburg · Laatst bijgewerkt ${formatBlogDate(dateModified)}`}
      />

      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} />

        <ArticleFigure image={articleImages.hero} priority />

        <section className="content-section" aria-labelledby="intro-heading">
          <h2 id="intro-heading" className="content-heading">
            Introductie
          </h2>
          <p className="content-paragraph">
            De Kubuswoningen zijn een van de meest gefotografeerde stukjes
            Rotterdam. Waar de rest van de skyline de hoogte in jaagt met glas
            en staal, eist dit gele complex op een brug over een drukke
            verkeersader de aandacht op met hoeken van vijfenveertig graden.
            Het fotografeert briljant. Dat is niet het hele verhaal.
          </p>
          <p className="content-paragraph">
            Rotterdam is een stad die na de verwoesting van haar centrum koos
            voor experiment in plaats van nostalgie. De Kubuswoningen zijn een
            antwoord uit de late jaren zeventig op de kille, grootschalige
            wederopbouwarchitectuur die daarop volgde. Deze gids vertelt wat je
            kunt zien, hoe je binnen kunt kijken, hoeveel tijd je nodig hebt, en
            hoe je dit ontwerp leest als wat het wilde zijn: een dorp in de
            grote stad.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="what-are-cubes-heading"
        >
          <h2 id="what-are-cubes-heading" className="content-heading">
            Wat zijn de Kubuswoningen?
          </h2>
          <p className="content-paragraph">
            De Kubuswoningen, ook het Blaakse Bos genoemd, liggen bij station
            Blaak, pal naast de{" "}
            <Link href="/markthal-rotterdam">Markthal</Link> en boven de brede
            verkeersader de Blaak. Ze zijn ontworpen door architect Piet Blom en
            gebouwd tussen 1982 en 1984.
          </p>
          <p className="content-paragraph">
            Het complex bestaat uit achtendertig reguliere kubuswoningen, twee
            zogenoemde superkubussen en enkele commerciële ruimtes op de begane
            grond. Het idee van Blom was even simpel als radicaal: elke woning
            stelt een boom voor, en samen vormen ze een bos. De kubus is
            vijfenveertig graden gekanteld en rust op een zeshoekige pyloon, de
            stam. Daardoor ontstaat onder de woningen een publieke ruimte: een
            voetgangersroute die de Oude Haven met het stadscentrum verbindt,
            vrij van het autoverkeer eronder.
          </p>
          <p className="content-paragraph">
            Bezoekersinformatie behandelt het complex vaak als een grappige
            bezienswaardigheid. Het uiterlijk is speels, maar dit is in de
            eerste plaats een functionerend wooncomplex. Achter die gekantelde
            muren wonen mensen.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="what-makes-special-heading"
        >
          <h2 id="what-makes-special-heading" className="content-heading">
            Wat maakt de Kubuswoningen bijzonder?
          </h2>
          <ArticleFigure image={articleImages.promenade} />
          <p className="content-paragraph">
            Het eerste wat de meeste mensen doen is proberen te begrijpen hoe de
            ruimte binnenin werkt. Van buiten zie je ramen die schuin naar de
            grond wijzen en ramen die schuin naar de lucht wijzen. Binnen is er
            geen rechte muur. Alles staat uit het lood.
          </p>
          <p className="content-paragraph">
            Een kubus heeft drie niveaus, en Blom gaf ze namen die bij zijn bos
            horen:
          </p>
          <ul className="theme-list">
            {cubeLevels.map((level) => (
              <li key={level.name}>
                <strong>{level.name}.</strong> {level.body}
              </li>
            ))}
          </ul>
          <p className="content-paragraph">
            De Kubuswoningen zijn bijzonder omdat ze een protest zijn. Blom
            wilde in het zakelijke naoorlogse Rotterdam een dorps karakter
            terugbrengen: een plek waar mensen elkaar tegenkomen op een
            promenade, veilig voor het verkeer dat eronder doorschiet. Het is
            structuralisme in zijn meest zichtbare vorm, architectuur die
            weigert zich te schikken naar de standaard doos.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="look-inside-heading"
        >
          <h2 id="look-inside-heading" className="content-heading">
            Kun je in een Kubuswoning kijken?
          </h2>
          <ArticleFigure image={articleImages.interior} />
          <p className="content-paragraph">
            Ja, en als je hier toch bent, is dat eigenlijk een vereiste. Omdat
            het reguliere woningen zijn, kun je niet zomaar bij iemand
            aanbellen. Daarvoor is de Kijk-Kubus, de museumwoning aan het
            Overblaak.
          </p>
          <p className="content-paragraph">
            Die kubus is volledig ingericht en opengesteld voor publiek, met
            maatmeubilair dat speciaal voor de schuine wanden is gemaakt. Je
            ervaart er twee dingen die je van buitenaf niet ziet: hoeveel
            maatwerk er nodig is om een kast tegen een muur van vijfenveertig
            graden te zetten, en hoe verrassend licht en ruimtelijk het binnen
            is, ondanks het ogenschijnlijk onhandige ontwerp.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="worth-visiting-heading"
        >
          <h2 id="worth-visiting-heading" className="content-heading">
            Zijn de Kubuswoningen Rotterdam de moeite waard?
          </h2>
          <p className="content-paragraph">
            Ja, ook als je architectuur normaal gesproken links laat liggen. Het
            is een compact bezoek. Je hebt er geen uren voor nodig, en het ligt
            letterlijk op de route tussen station Blaak en de Oude Haven.
          </p>
          <p className="content-paragraph">
            Het is minder de moeite waard als je slecht ter been bent of last
            hebt van benauwde ruimtes: de Kijk-Kubus heeft steile, smalle
            trappen en geen lift. Maar voor iedereen die wil begrijpen hoe
            Rotterdam ruimte claimt en durft te experimenteren, is dit een
            verplichte stop. Waar de Markthal ertegenover laat zien hoe de stad
            in de eenentwintigste eeuw bouwt, laten de Kubuswoningen zien hoe ze
            in de jaren tachtig dacht over samenleven.
          </p>
        </section>

        <section className="content-section" aria-labelledby="how-long-heading">
          <h2 id="how-long-heading" className="content-heading">
            Hoeveel tijd heb je nodig?
          </h2>
          <p className="content-paragraph">
            Twintig tot dertig minuten is genoeg om over de promenade aan het
            Overblaak te lopen, foto&apos;s te maken en de architectuur op je in
            te laten werken. Wil je ook de Kijk-Kubus van binnen bezoeken, tel
            daar dan ongeveer dertig minuten bij op.
          </p>
          <p className="content-paragraph">
            Je hebt geen halve dag nodig. De Kubuswoningen zijn het perfecte
            tussengerecht van een dag Rotterdam, makkelijk in te passen voor of
            na een lunch.
          </p>
        </section>

        <section className="content-section" aria-labelledby="nearby-heading">
          <h2 id="nearby-heading" className="content-heading">
            Wat te zien in de buurt van de Kubuswoningen
          </h2>
          <ArticleFigure image={articleImages.nearby} />
          <p className="content-paragraph">
            Bijna alles wat de moeite waard is om te combineren, ligt op een
            steenworp afstand.
          </p>
          <ul className="theme-list">
            <li>
              <strong>De Markthal.</strong> De boog van MVRDV ligt recht
              tegenover de kubussen: de logische plek voor koffie of lunch na je
              bezoek. Onze{" "}
              <Link href="/markthal-rotterdam">gids over de Markthal</Link>{" "}
              vertelt wat je er kunt zien en eten.
            </li>
            <li>
              <strong>De Oude Haven en het Witte Huis.</strong> Loop via de
              trappen van de kubuswoningen direct de Oude Haven in. Daar liggen
              historische schepen, terrassen aan het water en het Witte Huis,
              lang beschouwd als de eerste wolkenkrabber van Europa.
            </li>
            <li>
              <strong>De Laurenskerk.</strong> Op vijf minuten lopen staat de
              laatgotische kerk, een van de weinige gebouwen in het centrum die
              het bombardement van 1940 overleefde.
            </li>
            <li>
              <strong>Weekmarkt op de Binnenrotte.</strong> Op dinsdag en
              zaterdag stap je vanuit de kubussen zo de grootste weekmarkt van
              de stad op.
            </li>
          </ul>
        </section>

        <section
          className="content-section"
          aria-labelledby="architecture-heading"
        >
          <h2 id="architecture-heading" className="content-heading">
            De Kubuswoningen en de architectuur van Rotterdam
          </h2>
          <p className="content-paragraph">
            Op 14 mei 1940 leegde het bombardement het midden van de stad. Wat
            volgde was geen steen-voor-steen terugkeer van de oude straten, maar
            een besluit, decennialang herhaald, om de open grond te behandelen
            als een plek om te verzinnen. De eerste antwoorden waren zakelijk en
            grootschalig: de Lijnbaan, het Groothandelsgebouw, de rechte lijnen
            van de wederopbouw.
          </p>
          <p className="content-paragraph">
            De Kubuswoningen zijn de reactie daarop. Blom bouwde geen straat,
            maar een bos; geen blok, maar een dorp op palen. Waar de wederopbouw
            de functies netjes uit elkaar trok, stapelde hij wonen bovenop
            lopen, en lopen bovenop rijden. Datzelfde argument komt dertig jaar
            later terug in de Markthal aan de overkant, waar particuliere
            woningbouw gebogen wordt tot een publiek plein. Twee gebouwen, twee
            generaties, dezelfde vraag: hoe maak je een centrum als het centrum
            weg is?
          </p>
          <p className="content-paragraph">
            Wil je die geschiedenis in een andere vorm, lees haar.{" "}
            <Link href="/boeken-over-rotterdam#rotterdam-wederopbouw-groenendijk">
              Rotterdam Wederopbouw
            </Link>
            , op onze{" "}
            <Link href="/boeken-over-rotterdam">
              leeslijst van boeken over Rotterdam
            </Link>
            , brengt honderd gebouwen uit die jaren bijeen. Het vervangt niet
            het staan onder de kubussen. Het vertelt waarom ze hier konden
            landen en nergens anders.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="books-rotterdam-heading"
        >
          <h2 id="books-rotterdam-heading" className="content-heading">
            Boeken over Rotterdam
          </h2>
          <ArticleFigure image={articleImages.rotterdamContext} />
          <p className="content-paragraph">
            Als de Kubuswoningen je achterlaten met vragen over de denkwijze van
            deze stad, zoek dan verder in de literatuur. Begin bij de{" "}
            <Link href="/boeken-over-rotterdam">
              leeslijst van boeken over Rotterdam
            </Link>{" "}
            van Breure Media: <em>Karakter</em> van Bordewijk voor de stad voor
            het bombardement, Jules Deelder voor haar toon, Hugo Borst voor
            voetbal en identiteit, en de wederopbouwgids voor de skyline waar je
            doorheen loopt.
          </p>
          <p className="content-paragraph">
            Mijn eigen roman,{" "}
            <Link href="/boeken/schaduwen-over-domburg">
              <em>Schaduwen over Domburg</em>
            </Link>
            , is een literaire thriller die najaar 2026 verschijnt. Het verhaal
            begint op een Zeeuws strand en trekt diep de donkere logistiek van
            de Rotterdamse haven in. Hij hoort op die lijst omdat Rotterdam er
            geen decor is, maar een acterend personage.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="practical-heading"
        >
          <h2 id="practical-heading" className="content-heading">
            Praktische informatie
          </h2>
          <p className="content-paragraph">
            <strong>Adres:</strong> Overblaak 70, 3011 MH Rotterdam, het adres
            van de Kijk-Kubus.
          </p>

          <h3 id="ov-heading" className="content-heading">
            Kubuswoningen bereiken met openbaar vervoer
          </h3>
          <p className="content-paragraph">
            Station Blaak ligt letterlijk onder en naast het complex, met trein,
            metro (lijnen A, B en C) en tram. Vanaf Rotterdam Centraal is het
            een korte rit, of een wandeling van ongeveer vijfentwintig minuten
            door het centrum.
          </p>

          <h3 id="parkeren-heading" className="content-heading">
            Parkeren bij de Kubuswoningen
          </h3>
          <p className="content-paragraph">
            Onder de naastgelegen Markthal ligt een grote ondergrondse
            parkeergarage. Alternatieven in de buurt zijn de garages bij de Oude
            Haven en het Kiphof. Fietsen stallen kan gratis in de gemeentelijke
            stalling naast station Blaak.
          </p>

          <h3 id="openingstijden-heading" className="content-heading">
            Openingstijden en tickets van de Kijk-Kubus
          </h3>
          <ul className="theme-list">
            <li>
              De museumwoning is dagelijks geopend, doorgaans van 10:00 tot
              18:00 uur; in de zomermaanden kunnen de tijden ruimer zijn.
            </li>
            <li>
              Tickets koop je aan de deur. Reken op ongeveer €3,50 voor
              volwassenen, met korting voor studenten en 65-plussers. Betalen
              kan doorgaans alleen met pin.
            </li>
            <li>
              De buitenruimte en de promenade zijn dag en nacht vrij
              toegankelijk en kosten niets.
            </li>
          </ul>
          <p className="content-paragraph">
            Openingstijden en prijzen kunnen wijzigen en verschillen per seizoen.
            Controleer voor je vertrekt de actuele gegevens op de{" "}
            <a
              href="https://www.kubuswoning.nl/bezoeken.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              bezoekpagina van de Kijk-Kubus
            </a>
            .
          </p>
        </section>
      </div>

      <FaqSection
        items={faqItems}
        title="Veelgestelde vragen"
        eyebrow="Vragen van bezoekers"
      />

      <div className="container content-page content-page--footer">
        <section
          className="content-section"
          aria-labelledby="walking-route-heading"
        >
          <h2 id="walking-route-heading" className="content-heading">
            Een eenvoudige wandelroute langs de Kubuswoningen
          </h2>
          <p className="content-paragraph">
            Deze ronde blijft dicht bij Blaak en vraagt geen plan dat
            ambitieuzer is dan comfortabele schoenen.
          </p>
          <ul className="theme-list">
            <li>
              <strong>Kom aan op station Blaak.</strong> Blijf eerst op het
              plein staan, zodat de gele kubussen en de boog van de Markthal in
              hetzelfde beeld passen.
            </li>
            <li>
              <strong>Klim de trappen op naar de promenade.</strong> Loop het
              Overblaak in zijn geheel af. Dit is het bos van Blom, en het is
              het deel dat de meeste bezoekers overslaan.
            </li>
            <li>
              <strong>Ga de Kijk-Kubus binnen.</strong> Betaal die paar euro om
              te zien hoe de theorie botst met een bank, een bed en een kast.
            </li>
            <li>
              <strong>Daal af naar de Oude Haven.</strong> Aan het einde van de
              promenade brengen de trappen je bij het water, de oude schepen en
              het Witte Huis.
            </li>
            <li>
              <strong>Eindig in de Markthal of bij de Laurenskerk.</strong> De
              hal is het eten en de eenentwintigste eeuw; de kerk is wat er van
              de oude stad over is. Allebei een beter slotbeeld dan nog een
              foto van de kubussen.
            </li>
          </ul>
        </section>

        <section
          className="content-section"
          aria-labelledby="final-recommendation-heading"
        >
          <h2 id="final-recommendation-heading" className="content-heading">
            Slotadvies
          </h2>
          <p className="content-paragraph">
            Loop niet alleen snel langs de Kubuswoningen voor een foto. Klim de
            trappen op naar de promenade en ervaar het dorp dat Piet Blom wilde
            bouwen, geïsoleerd van het verkeer eronder. Betaal die paar euro
            voor de Kijk-Kubus om te zien hoe een idee zich verhoudt tot het
            praktische leven. Loop daarna de trappen af naar de Oude Haven voor
            een drankje. Nergens laat Rotterdam zo goed zien hoe het oude
            waterleven en het wilde naoorlogse bouwen naast elkaar bestaan.
          </p>
          <p className="content-paragraph">
            Wil je die gedachte op papier voortzetten, dan is de volgende stap
            geen ander gebouw. Het is de{" "}
            <Link href="/boeken-over-rotterdam">
              leeslijst van boeken over Rotterdam
            </Link>
            .
          </p>
        </section>

        <RelatedGuides
          title="Verder lezen"
          guides={[
            {
              href: "/boeken-over-rotterdam",
              label: "Boeken over Rotterdam",
              description:
                "Romans, thrillers en wederopbouwtitels die bij deze stad horen",
            },
            {
              href: "/markthal-rotterdam",
              label: "Markthal Rotterdam",
              description:
                "Wat te zien, eten en weten voor je bezoek, recht tegenover de kubussen",
            },
            {
              href: "/boeken/schaduwen-over-domburg",
              label: "Schaduwen over Domburg",
              description:
                "Een literaire thriller van de Zeeuwse kust tot in de Rotterdamse haven",
            },
            {
              href: "/over-de-auteur",
              label: "Over Ard Breure",
              description: "De auteur achter deze gids, gevestigd in Rotterdam",
            },
          ]}
        />

        <section className="content-section">
          <p className="content-meta">
            <em>
              Ard Breure is de auteur van de literaire thriller{" "}
              <Link href="/boeken/schaduwen-over-domburg">
                Schaduwen over Domburg
              </Link>
              , die naar verwachting najaar 2026 verschijnt.
            </em>
          </p>
        </section>
      </div>
    </main>
  );
}
