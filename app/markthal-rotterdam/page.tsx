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

const pagePath = "/markthal-rotterdam";
const pageTitle = "Markthal Rotterdam: wat te zien, eten en weten voor je bezoek";
const pageHeadline = pageTitle;
const pageDescription =
  "Bezoek je de Markthal Rotterdam? Ontdek wat je er kunt zien en eten, hoeveel tijd je nodig hebt en welke bezienswaardigheden dichtbij liggen.";
const datePublished = "2026-08-18";
const dateModified = "2026-08-18";
const englishPath = "/en/markthal-rotterdam";

const articleImages = {
  hero: {
    src: "/images/markthal-rotterdam-exterior-hero.webp",
    alt: "Buitenkant van de Markthal Rotterdam met de herkenbare glazen boog en het stadsplein",
    width: 1536,
    height: 1024,
    caption:
      "Markthal Rotterdam: appartementen gebogen tot een boog over een overdekt marktplein.",
  },
  ceiling: {
    src: "/images/markthal-rotterdam-interior-horn-of-plenty.webp",
    alt: "Interieur van de Markthal Rotterdam met het kleurrijke kunstwerk Hoorn des Overvloeds",
    width: 1536,
    height: 1024,
    caption:
      "De Hoorn des Overvloeds, het plafondkunstwerk van Arno Coenen en Iris Roskam.",
  },
  food: {
    src: "/images/markthal-rotterdam-food-market-interior.webp",
    alt: "Eetkraampjes in de Markthal Rotterdam met kaas, brood, vis en bezoekers",
    width: 1536,
    height: 1024,
    caption:
      "Een werkende markthal: kramen, verse waar en bereid eten onder de boog.",
  },
  nearby: {
    src: null,
    alt: "Kubuswoningen bij Blaak vlak bij de Markthal Rotterdam",
    width: 1536,
    height: 1024,
    caption:
      "De kubuswoningen van Piet Blom staan naast de Markthal op het plein bij Blaak.",
  },
  architecture: {
    src: null,
    alt: "Architectonische buitenkant van de Markthal Rotterdam, met de woonboog en de glazen gevel",
    width: 1600,
    height: 900,
    caption:
      "Particuliere woningen maken de publieke hal: de boog van buitenaf.",
  },
  rotterdamContext: {
    src: "/assets/rotterdam-maas-lezen-sfeerbeeld.webp",
    alt: "Illustratie van lezen aan de Maas in Rotterdam met de Erasmusbrug op de achtergrond",
    width: 1600,
    height: 600,
    caption:
      "Rotterdam voorbij de markt: de rivierstad die de Markthal introduceert.",
  },
} as const satisfies Record<string, ArticleImage>;

const heroImage = articleImages.hero;

export const metadata: Metadata = buildMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  type: "article",
  ...(heroImage.src
    ? {
        image: heroImage.src,
        imageAlt: heroImage.alt,
        imageWidth: heroImage.width,
        imageHeight: heroImage.height,
        imageType: "image/webp",
      }
    : {}),
  keywords: [
    "Markthal Rotterdam",
    "Markthal",
    "Markthal bezoeken",
    "wat eten in de Markthal",
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
  { name: "Markthal Rotterdam", path: pagePath },
];

const openingHours = [
  { day: "Maandag tot en met donderdag", hours: "10:00–20:00" },
  { day: "Vrijdag", hours: "10:00–21:00" },
  { day: "Zaterdag", hours: "10:00–20:00" },
  { day: "Zondag", hours: "12:00–18:00" },
] as const;

const faqItems = [
  {
    question: "Is de Markthal Rotterdam de moeite waard?",
    answer:
      "Ja, als je een compacte kennismaking met het moderne Rotterdam zoekt. De hal, het plafondkunstwerk en de architectuur eromheen zijn het punt, niet een lange boodschappenlijst. Combineer het met de kubuswoningen en, op dinsdag of zaterdag, de grote weekmarkt van het Rotterdamse centrum op de Binnenrotte.",
  },
  {
    question: "Hoeveel tijd heb je nodig in de Markthal Rotterdam?",
    answer:
      "Plan 30 tot 45 minuten om de hal te lopen en omhoog te kijken naar het plafond. Als je gaat zitten om te eten, reken dan op ongeveer twee uur. Een eenvoudige ronde met de kubuswoningen en de Laurenskerk vult een ochtend of een rustige middag.",
  },
  {
    question: "Wat zijn de openingstijden van de Markthal Rotterdam?",
    answer:
      "De markthal is open maandag tot en met donderdag 10:00–20:00, vrijdag 10:00–21:00, zaterdag 10:00–20:00 en zondag 12:00–18:00. Restaurants aan de buitenzijden en de supermarkt beneden houden andere tijden aan. In de vakantie kunnen de uren afwijken, dus controleer de officiële Markthal-pagina voordat je gaat.",
  },
  {
    question: "Is de Markthal Rotterdam gratis te bezoeken?",
    answer:
      "Ja. De hal inlopen en naar het gebouw kijken is gratis. Je betaalt alleen voor eten, drinken of boodschappen. Het museumhuis in de kubuswoningen in de buurt heeft een eigen ticket.",
  },
  {
    question: "Wat kun je eten in de Markthal Rotterdam?",
    answer:
      "Verse producten, vis, kaas, brood, koffie en bereid eten uit Nederlandse en internationale keukens. Het is een werkende markthal, geen vaste restaurantgids: kramen wisselen, dus kies op wat die dag goed oogt en ruikt.",
  },
  {
    question: "Welke bezienswaardigheden liggen in de buurt van de Markthal?",
    answer:
      "Bijna alles wat je met de Markthal wilt combineren ligt op een korte wandeling van station Blaak: de kubuswoningen, op dinsdag en zaterdag de grote weekmarkt van het Rotterdamse centrum op de Binnenrotte, de Laurenskerk, de Rotterdamse bibliotheek, en iets verder de Oude Haven met het Witte Huis.",
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
};

export default function MarkthalRotterdamPage() {
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
            De Markthal is het gebouw dat veel bezoekers het eerst treffen in
            Rotterdam: een boog van appartementen over een overdekte markt, een
            plafond van fruit en vis, de geur van brood die opstijgt in een
            publieke ruimte. Het fotografeert goed. Dat is niet waarom het
            ertoe doet.
          </p>
          <p className="content-paragraph">
            Rotterdam is een stad die zichzelf moest uitvinden nadat het
            centrum was verwoest. De Markthal is een van de duidelijkste recente
            antwoorden op die geschiedenis: wonen, eten en een plein gestapeld
            tot één idee. Deze gids vertelt wat je kunt zien, wat je kunt eten,
            hoeveel tijd je nodig hebt, en hoe je het gebouw als architectuur
            leest in plaats van als een eethal met een muurschildering.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="what-is-markthal-heading"
        >
          <h2 id="what-is-markthal-heading" className="content-heading">
            Wat is de Markthal Rotterdam?
          </h2>
          <p className="content-paragraph">
            De Markthal is een overdekte markthal in het Laurenskwartier, pal
            naast station Blaak. Het gebouw is ontworpen door het Rotterdamse
            bureau MVRDV en opende op 1 oktober 2014. De hal ligt onder een
            veertig meter hoge boog van appartementen. Daaronder zitten parkeren
            en een supermarkt. Rondom liggen winkels en restaurants.
          </p>
          <p className="content-paragraph">
            Het gebouw is ontworpen met 96 verskramen en winkelruimtes in de
            centrale hal, plus grotere winkel- en restaurantunits langs de
            zijkanten. Daarboven liggen 228 appartementen. Het punt van het
            ontwerp is geen markt met woningen in de buurt. Het is één hybride:
            een publiek plein dat ontstaat door particuliere huizen.
          </p>
          <p className="content-paragraph">
            Officiële bezoekersinformatie behandelt het nog steeds als een
            dagelijkse markt waar je zonder ticket naar binnen loopt. Zo moet
            je ook aankomen. Kijk eerst omhoog. Bepaal daarna of je komt om te
            eten, te winkelen, of simpelweg om de stad te begrijpen.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="what-makes-special-heading"
        >
          <h2 id="what-makes-special-heading" className="content-heading">
            Wat maakt de Markthal bijzonder?
          </h2>
          <ArticleFigure image={articleImages.ceiling} />
          <p className="content-paragraph">
            Het eerste wat de meeste mensen zien is het plafond. Het
            kunstwerk dat bekendstaat als de Hoorn des Overvloeds, ook
            Cornucopia genoemd, is van Arno Coenen en Iris Roskam. Het
            beslaat meer dan 11.000 vierkante meter: fruit, groente, vis,
            bloemen en insecten, vergroot tot ze architectuur worden. Het
            beeld verwijst naar de Nederlandse stillevenschilderkunst van de
            zeventiende eeuw, en weigert daarna binnen een lijst te blijven.
          </p>
          <p className="content-paragraph">
            De panelen zijn van geperforeerd aluminium. Ze dragen de afbeelding
            en ze dempen de hal. De grijze steen van de buitenkant en de vloer
            is bewust kalm, zodat het interieur excessief mag zijn. Aan beide
            uiteinden van de boog houdt een glazen kabelnetgevel het weer
            buiten zonder van het plein een gesloten doos te maken. MVRDV
            beschrijft het als de grootste gevel in zijn soort in Europa.
          </p>
          <p className="content-paragraph">
            Wat blijft, na de eerste foto, is de vermenging. Je eet onder de
            keukens van anderen. Die keukens kijken de hal in door glas dat
            bestand is tegen geluid en geur. Woonkamers kijken de andere kant
            op, naar de Maas of de Laurenskerk. De Markthal is bijzonder omdat
            ze dichtheid behandelt als een stedelijk genoegen, niet als een
            probleem dat je moet verbergen.
          </p>
        </section>

        <section className="content-section" aria-labelledby="what-to-eat-heading">
          <h2 id="what-to-eat-heading" className="content-heading">
            Wat kun je eten in de Markthal?
          </h2>
          <ArticleFigure image={articleImages.food} />
          <p className="content-paragraph">
            Eet zoals je in een werkende markt zou eten, niet zoals in een
            restaurant met een vast toeristenmenu. De hal is gebouwd voor verse
            producten, vis, kaas, brood, koffie en bereid eten uit Nederlandse
            en internationale keukens. Sommige kramen verkopen ingrediënten om
            mee naar huis te nemen. Andere zetten een maaltijd op die je
            staand of aan een kleine tafel eet.
          </p>
          <p className="content-paragraph">
            Behandel deze pagina niet als een ranglijst van genoemde kramen.
            Huurders wisselen, en een lijst die het tegendeel pretendeert is
            meteen verouderd. Kies op wat die dag goed oogt en ruikt. Wil je
            sfeer, dan brengen lunchtijd en weekenden meer reuring, maar ook
            meer mensen. Vroeger op een doordeweekse dag is het rustiger, en
            vaak beter als je evenzeer voor het gebouw kwam als voor de lunch.
          </p>
          <p className="content-paragraph">
            Op de verdieping onder de hal zit een supermarkt, nuttig als je in
            de stad verblijft en echt boodschappen nodig hebt. Restaurants aan
            de lange buitenzijden hebben eigen ingangen en houden vaak later
            open dan de markt zelf.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="worth-visiting-heading"
        >
          <h2 id="worth-visiting-heading" className="content-heading">
            Is de Markthal Rotterdam de moeite waard?
          </h2>
          <p className="content-paragraph">
            Ja, als je ook maar kort in Rotterdam bent en wilt begrijpen hoe de
            stad bouwt. Het bezoek is compact. Je hebt geen tijdslot nodig. Je
            kunt erdoorheen lopen op weg naar de kubuswoningen of de
            Laurenskerk en toch iets wezenlijks hebben gezien.
          </p>
          <p className="content-paragraph">
            Het is minder een omweg waard als je hoopte op een stille
            buurtmarkt en verder niets. Op dinsdag en zaterdag staat pal
            buiten de grote weekmarkt van het Rotterdamse centrum, dichter bij
            dat oudere idee van vis en bloemen in de open lucht kopen. De
            Markthal is het overdekte argument ernaast: eten als reden om
            binnen een stuk woningbouw een publieke ruimte te maken.
          </p>
          <p className="content-paragraph">
            Daar werkt de Markthal het best: niet simpelweg als eethal, maar
            als introductie tot het moderne Rotterdam.
          </p>
        </section>

        <section className="content-section" aria-labelledby="how-long-heading">
          <h2 id="how-long-heading" className="content-heading">
            Hoeveel tijd heb je nodig in de Markthal?
          </h2>
          <p className="content-paragraph">
            Dertig tot vijfenveertig minuten is genoeg om de hal te lopen,
            omhoog te kijken, en buiten te stappen om de boog vanaf Blaak te
            zien. Als je gaat zitten om te eten, reken dan op ongeveer twee
            uur. Een eenvoudige ronde met de kubuswoningen en de Laurenskerk
            vult een ochtend of een rustige middag, zonder te haasten.
          </p>
          <p className="content-paragraph">
            Je hebt geen halve dag in het gebouw nodig. De Markthal is het
            sterkst als eerste hoofdstuk, niet als het hele boek. Laat tijd
            over voor de straten eromheen. Daar zet de stad hetzelfde argument
            in andere vormen voort.
          </p>
        </section>

        <section className="content-section" aria-labelledby="nearby-heading">
          <h2 id="nearby-heading" className="content-heading">
            Wat te zien in de buurt van de Markthal
          </h2>
          <ArticleFigure image={articleImages.nearby} />
          <p className="content-paragraph">
            Bijna alles wat de moeite waard is om met de Markthal te combineren
            ligt op een korte wandeling van station Blaak.
          </p>
          <ul className="theme-list">
            <li>
              <strong>Kubuswoningen.</strong> De gele kubussen van Piet Blom
              staan pal naast de hal. Ze zijn makkelijk te fotograferen vanaf
              het plein. Het museumhuis Kijk-Kubus is de plek om het interieur
              te zien als die nieuwsgierigheid bij het bezoek hoort. Onze{" "}
              <Link href="/kubuswoningen-rotterdam">
                gids over de Kubuswoningen
              </Link>{" "}
              vertelt wat je ziet en hoeveel tijd je nodig hebt.
            </li>
            <li>
              <strong>Weekmarkt op de Binnenrotte.</strong> Op dinsdag en
              zaterdag vult de grote weekmarkt van het Rotterdamse centrum het
              plein buiten. De twee markten combineren is het meest complete
              eetbezoek.
            </li>
            <li>
              <strong>Laurenskerk.</strong> De laatgotische kerk overleefde de
              oorlogsverwoesting van het centrum. Het is het enige middeleeuwse
              gebouw dat in het centrum van Rotterdam bewaard is gebleven. Vanuit
              de Markthal kijk je naar een van de weinige overgebleven getuigen
              van de oude stad.
            </li>
            <li>
              <strong>Rotterdamse bibliotheek.</strong> Nog een stuk
              naoorlogse stadsarchitectuur, een korte wandeling van de
              hal, en een nuttige pauze als het plein vol is.
            </li>
            <li>
              <strong>Oude Haven en het Witte Huis.</strong> Een paar minuten
              verder geven de oude haven en de eerste wolkenkrabber van Europa
              je water, schepen en een andere laag van dezelfde stad.
            </li>
          </ul>
        </section>

        <section
          className="content-section"
          aria-labelledby="architecture-heading"
        >
          <h2 id="architecture-heading" className="content-heading">
            De Markthal en de architectuur van Rotterdam
          </h2>
          <ArticleFigure image={articleImages.architecture} />
          <p className="content-paragraph">
            Rotterdam is een stad die haar centrum is kwijtgeraakt. Op 14 mei
            1940 leegde het bombardement het midden van de stad. Wat volgde was
            geen steen-voor-steen terugkeer van de oude straten. Het was een
            besluit, decennialang herhaald, om de open grond te behandelen als
            een plek om te verzinnen. Sommige bezoekers komen nog steeds
            binnen in de hoop op grachten en gevels en voelen zich
            tekortgedaan. De stad verbergt geen mooiere versie van zichzelf
            achter de torens. Dit is de versie die ze koos.
          </p>
          <p className="content-paragraph">
            De Markthal hoort in die lijn, niet in een toeristische ronde van
            losse iconen. De kubuswoningen, de Erasmusbrug, Depot Boijmans Van
            Beuningen en deze boog zijn verschillende antwoorden op dezelfde
            vraag: hoe maak je een centrum als het centrum weg is? MVRDV zette
            geen decoratief dak over een winkelpassage. De markt, het parkeren,
            de supermarkt en de 228 appartementen zijn één constructie.
            Particuliere woningbouw is gebogen tot een publiek plein. De stad
            krijgt een overdekte ruimte; de woningen krijgen een reden om in
            het midden van Blaak te bestaan.
          </p>
          <p className="content-paragraph">
            Sta in de hal en het ontwerp wordt een reeks blikken in plaats van
            een slogan. De ene kant kijkt naar de Laurenskerk, het stenen
            restant. De andere opent naar het glas van de kabelnetgevel en de
            nieuwere stad daarachter. Boven je kijken keukens naar binnen.
            Woonkamers en slaapkamers, die volgens het Nederlandse
            daglichtvoorschrift echt licht moeten krijgen, kijken naar de Maas
            of de kerk. De bewoners zijn geen decor. Zij zijn de reden dat het
            plein überhaupt gebouwd kon worden.
          </p>
          <p className="content-paragraph">
            Die stapeling is Rotterdam op z&apos;n meest zichzelf: functies
            gemengd in plaats van op beleefde afstand gezet, spektakel gebruikt
            om een burgerlijk interieur te rechtvaardigen, grijze steen buiten
            zodat kleur binnen kan gebeuren. De Hoorn des Overvloeds is geen
            sticker die er op het eind op is geplakt. Het is de binnenkant van
            de boog zichtbaar gemaakt, een stilleven vergroot tot het de
            ruimte moet delen met viskramen en forenzen. Het gebouw is
            theatraal. Het is ook praktisch. Beide kunnen hier waar zijn, en
            daarom is de stad zo blijven bouwen.
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
            , brengt honderd gebouwen uit de wederopbouwjaren bijeen. Het
            vervangt niet het staan in de Markthal. Het vertelt waarom een
            hal als deze alleen in deze stad gebouwd kon worden.
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
            Een bezoek aan de Markthal is een manier de stad in te gaan.
            Boeken zijn de tragere manier. Als de hal je achterlaat met
            verlangen naar de haven, de vooroorlogse straten, de stem van de
            plek, begin dan bij de{" "}
            <Link href="/boeken-over-rotterdam">
              leeslijst van boeken over Rotterdam
            </Link>{" "}
            van Breure Media. De titels zijn de juiste: <em>Karakter</em> van
            Bordewijk voor de stad voor het bombardement, Jules Deelder voor
            haar toon, Hugo Borst voor voetbal en identiteit, en de
            wederopbouwgids voor de skyline waar je doorheen loopt.
          </p>
          <p className="content-paragraph">
            Mijn eigen roman,{" "}
            <Link href="/boeken/schaduwen-over-domburg">
              <em>Schaduwen over Domburg</em>
            </Link>
            , is een literaire thriller die begint op een Zeeuws strand en
            doorloopt tot in de Rotterdamse haven. Hij hoort op die lijst
            omdat de haven geen achtergrond is. Hij is de plot. De Markthal
            zal er niet als ansichtkaart in voorkomen. De stad onder de
            ansichtkaart wel.
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
            <strong>Adres:</strong> Ds. Jan Scharpstraat 298, 3011 GZ
            Rotterdam.
          </p>

          <h3 id="ov-heading" className="content-heading">
            Markthal bereiken met openbaar vervoer
          </h3>
          <p className="content-paragraph">
            Station Blaak ligt pal naast het gebouw, met trein, metro (lijnen
            A, B en C) en tram. Vanaf Rotterdam Centraal is het een korte rit
            met metro of trein, of een wandeling van ongeveer vijfentwintig
            minuten door het centrum.
          </p>

          <h3 id="parkeren-heading" className="content-heading">
            Parkeren bij de Markthal
          </h3>
          <p className="content-paragraph">
            Onder de hal ligt een ondergrondse parkeergarage, dag en nacht
            open, met meer dan 1.100 plaatsen, laadpunten en parkeerplaatsen
            voor mensen met een beperking. Volg in het centrum de borden naar
            de parkeergarage Markthal, afslag Ds. Jan Scharpstraat. De garage
            is bereikbaar vanaf de A16 en de A20. Fietsen stallen kan gratis
            in de gemeentelijke fietsenstalling naast station Blaak.
          </p>

          <h3 id="openingstijden-heading" className="content-heading">
            Openingstijden van de Markthal
          </h3>
          <ul className="theme-list">
            {openingHours.map((row) => (
              <li key={row.day}>
                {row.day}: {row.hours}
              </li>
            ))}
          </ul>
          <p className="content-paragraph">
            Individuele winkels en restaurants kunnen andere tijden aanhouden.
            Restaurants aan de buitenzijden en de supermarkt beneden hebben
            hun eigen uren. In vakantieperiodes kan het afwijken. Voor de
            actuele officiële tijden, gebruik de{" "}
            <a
              href="https://markthal.nl/bezoek-markthal/"
              target="_blank"
              rel="noopener noreferrer"
            >
              bezoekpagina van de Markthal
            </a>
            .
          </p>
          <p className="content-paragraph">
            De toegang tot de hal is gratis. Je betaalt voor wat je eet of
            koopt. De markt zelf hoef je niet te reserveren.
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
            Een eenvoudige wandelroute langs de Markthal
          </h2>
          <p className="content-paragraph">
            Deze ronde blijft dicht bij Blaak en vraagt geen plan dat
            ambitieuzer is dan comfortabele schoenen.
          </p>
          <ul className="theme-list">
            <li>
              <strong>Kom aan op station Blaak.</strong> Loop het plein op en
              laat de boog van de Markthal en de gele kubussen in hetzelfde
              beeld staan voordat je naar binnen gaat.
            </li>
            <li>
              <strong>Loop de kubuswoningen rond.</strong> Cirkel het Blaakse
              Bos van onderaf. Ga de Kijk-Kubus alleen in als je het interieur
              wilt; het pad buiten is al de architectuur.
            </li>
            <li>
              <strong>Ga de Markthal in vanaf het plein.</strong> Sta stil in
              het midden van de hal en kijk omhoog, dan langs beide glazen
              uiteinden, voordat je eten kiest.
            </li>
            <li>
              <strong>Eet, en stap daarna weer naar buiten.</strong> Op
              dinsdag of zaterdag loop je de grote weekmarkt van het
              Rotterdamse centrum. Op andere dagen steek je over naar de
              Laurenskerk.
            </li>
            <li>
              <strong>Eindig bij de kerk of de Oude Haven.</strong> De
              Laurenskerk is de oudere stad. De haven is het water. Beide zijn
              een beter laatste beeld dan nóg een ronde langs de kramen.
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
            Ga naar de Markthal. Kijk omhoog. Eet iets eenvoudigs. Blijf niet
            lang genoeg om de hal alleen nog een eethal te laten worden.
            Loop daarna: kubussen, kerk, haven. Het gebouw heeft zijn werk
            gedaan als Rotterdam minder aanvoelt als een lijst bezienswaardigheden
            en meer als een stad die, na de brand, besloot het midden van
            zichzelf te blijven verzinnen.
          </p>
          <p className="content-paragraph">
            Wil je die gedachte op papier voortzetten, dan is de volgende stap
            geen andere markt. Het is de{" "}
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
