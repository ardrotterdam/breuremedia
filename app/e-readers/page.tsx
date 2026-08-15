import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AffiliateButton } from "@/components/AffiliateButton";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentBadge } from "@/components/ContentBadge";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { ereaders } from "@/data/affiliate";
import { author, siteConfig } from "@/lib/site";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import {
  breadcrumbSchema,
  buildJsonLd,
  collectionPageSchema,
  faqSchema,
  itemListSchema,
} from "@/lib/schema";

const pageTitle =
  "Beste e-reader 2026: Kindle of Kobo? Eerlijke vergelijking | Breure Media";
const pageDescription =
  "In deze gids vergelijk ik de zes e-readers die er in 2026 wat mij betreft echt toe doen, vooral op de vraag: voor welk type lezer is dit de beste keuze?";
const pagePath = "/e-readers";
const heroImage =
  "/assets/kindle-paperwhite-schaduwen-over-domburg-zeeuwse-kust.webp";

export const metadata: Metadata = buildMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  type: "article",
  image: heroImage,
  imageAlt:
    "Kindle Paperwhite e-reader met de cover van Schaduwen over Domburg, op de achtergrond het Zeeuwse strand en de zee",
  imageWidth: 1600,
  imageHeight: 873,
  languages: {
    nl: "/e-readers",
    en: "/en/e-readers",
    "x-default": "/en/e-readers",
  },
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "E-readers", path: pagePath },
];

const articleSchema = {
  "@type": "Article",
  headline:
    "De beste e-reader van 2026: gekozen door een schrijver die er zelf op leest",
  description: pageDescription,
  image: absoluteUrl(heroImage),
  inLanguage: siteConfig.language,
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

const faqItems = [
  {
    question: "Is een e-reader beter voor je ogen dan een tablet?",
    answer:
      "E-ink werkt anders dan het gewone lcd- of oledscherm van een telefoon of tablet. Het scherm oogt daardoor veel meer als papier en blijft ook in fel zonlicht goed leesbaar. Voor lange leessessies vinden veel mensen dat prettiger en rustiger dan een traditioneel beeldscherm.",
  },
  {
    question: "Hoe lang gaat de batterij van een e-reader mee?",
    answer:
      "Denk eerder aan weken dan aan uren. Afhankelijk van het model, hoe vaak je leest en hoeveel verlichting je gebruikt, kom je grofweg uit op vier tot twaalf weken per lading. Dat is voor mij trouwens een van de fijnste eigenschappen van een e-reader: batterijstress speelt nauwelijks een rol.",
  },
  {
    question: "Kan ik bibliotheekboeken lezen op een e-reader?",
    answer:
      "Ja, maar niet op iedere e-reader op dezelfde manier. Voor e-books van de Nederlandse online Bibliotheek heb je doorgaans een geschikte e-reader, Adobe Digital Editions en een Windows- of Mac-computer nodig. Kindle ondersteunt de Adobe DRM-beveiliging die daarvoor wordt gebruikt niet. In sommige andere landen kun je met Kobo via OverDrive rechtstreeks boeken lenen. Dat werkt niet op dezelfde manier bij de Nederlandse online Bibliotheek.",
  },
  {
    question: "Welke e-reader is het beste voor Nederlandse boeken?",
    answer:
      "Zowel Kindle als Kobo heeft een ruim aanbod Nederlandstalige boeken. Kobo heeft historisch een sterke positie op de Nederlandse markt en is bovendien flexibeler als je boeken uit verschillende bronnen gebruikt. Kindle heeft daartegenover een bijzonder grote internationale winkel. Ik zou de keuze daarom niet alleen laten afhangen van hoeveel Nederlandse titels er zijn, maar vooral van waar jij je boeken wilt kopen en lenen.",
  },
  {
    question: "Hoeveel batterijduur heeft de Kindle (basismodel)?",
    answer:
      "Volgens Amazon gaat de batterij tot ongeveer zes weken mee op één volledige lading. Hoe lang je daar in de praktijk mee doet, hangt natuurlijk af van hoeveel je leest en hoe fel je de verlichting gebruikt.",
  },
  {
    question: "Is de Kindle (basismodel) waterdicht?",
    answer:
      "Nee. Dat is een van de duidelijke verschillen met de Paperwhite. Lees je graag in bad, bij het zwembad of op vakantie aan het water, dan zou ik eerder naar de Kindle Paperwhite of Kobo Libra Colour kijken.",
  },
  {
    question: "Is het kleurenscherm van de Kobo Libra Colour net zo goed als een tablet?",
    answer:
      "Niet als je met \"goed\" bedoelt: helder, verzadigd en geschikt voor video. Maar dat probeert Kobo ook helemaal niet te maken. E Ink Kaleido 3 geeft veel rustigere, meer papierachtige kleuren. Voor lezen vind ik dat juist logisch: het scherm moet niet concurreren met een iPad. Zie het eerder als een gedrukt boek met kleurenillustraties.",
  },
  {
    question: "Kan ik met een Kobo e-reader boeken lenen bij de Nederlandse bibliotheek?",
    answer:
      "Ja. Op Kobo-modellen kun je e-books van de Nederlandse online Bibliotheek lezen via Adobe Digital Editions. Je leent het boek via de website en zet het vervolgens vanaf een Windows- of Mac-computer op je e-reader. Het rechtstreeks lenen vanaf de Kobo zelf, zoals dat via OverDrive in bepaalde landen mogelijk is, werkt niet op dezelfde manier voor de Nederlandse online Bibliotheek.",
  },
  {
    question: "Hoe lang gaat de batterij van de Kobo Libra Colour mee?",
    answer:
      "Bij normaal gebruik gaat de batterij weken mee. Hoe lang precies hangt af van onder meer schermverlichting, Bluetooth en hoeveel je daadwerkelijk leest. Voor een normale vakantie hoef je in ieder geval niet voortdurend achter een stopcontact aan.",
  },
  {
    question: "Is de Kobo Libra Colour waterdicht?",
    answer:
      "Ja. De Kobo Libra Colour heeft een IPX8-classificatie en is ontworpen om tot 60 minuten in maximaal twee meter diep water te kunnen doorstaan. Dat maakt hem geschikt voor lezen in bad, aan het zwembad of op het strand.",
  },
  {
    question: "Wat is het verschil tussen de Kobo Clara BW en de Kobo Libra Colour?",
    answer:
      "De Clara BW is kleiner, lichter en goedkoper. Hij heeft een 6-inch zwart-witscherm en je bedient hem volledig via het touchscreen. De Libra Colour heeft een groter 7-inch kleurenscherm, fysieke bladerknoppen en meer opslag. Beide modellen zijn waterdicht en kunnen gebruikt worden voor e-books van de Nederlandse online Bibliotheek via Adobe Digital Editions. Kort gezegd: Clara voor eenvoud en compactheid, Libra voor meer comfort en mogelijkheden.",
  },
  {
    question: "Is de Kobo Clara BW geschikt voor luisterboeken?",
    answer:
      "Ja. De Clara BW heeft Bluetooth, waardoor je Kobo-luisterboeken kunt afspelen via een draadloze koptelefoon of speaker. Met 16 GB opslag is er naast gewone e-books ook ruimte voor een flinke verzameling luisterboeken.",
  },
  {
    question: "Is de Kobo Clara BW waterdicht?",
    answer:
      "Ja. Ook de relatief compacte Clara BW heeft een IPX8-classificatie: tot 60 minuten in maximaal twee meter water. Dat vind ik een sterk punt van dit model, omdat waterdichtheid bij een betaalbare e-reader zeker niet vanzelfsprekend is.",
  },
  {
    question: "Hoe lang gaat de batterij van de Kobo Clara BW mee?",
    answer:
      "Bij normaal leesgebruik gaat de accu weken mee. Zoals bij iedere e-reader hangt het exacte aantal dagen af van onder meer de verlichting, Bluetooth en hoeveel uren je per dag leest.",
  },
  {
    question: "Kun je op de Kindle Scribe schrijven zoals op papier?",
    answer:
      "Niet letterlijk, maar het komt een stuk dichter in de buurt dan schrijven op een glad tabletscherm. De Premium Pen hoeft niet opgeladen te worden en het oppervlak biedt een lichte weerstand tijdens het schrijven. Handgeschreven notities kun je bovendien omzetten naar getypte tekst.",
  },
  {
    question: "Wat is het verschil tussen de Kindle Scribe en een gewone Kindle?",
    answer:
      "Vooral formaat en functie. De Scribe heeft een groot 10,2-inch scherm, ondersteunt een pen en heeft uitgebreide notitiefuncties. Een gewone Kindle is kleiner, goedkoper en vooral bedoeld om boeken op te lezen. Wil je alleen romans lezen? Dan zou ik vrijwel altijd voor de Paperwhite kiezen. Wil je ook documenten bewerken en veel schrijven? Dan begint de Scribe interessant te worden.",
  },
  {
    question: "Is de Kindle Scribe waterdicht?",
    answer:
      "Nee. In tegenstelling tot de Kindle Paperwhite en de waterdichte Kobo-modellen uit deze lijst heeft de Scribe geen waterdichtheidscertificering. Voor lezen in bad of naast het zwembad is dit dus niet het model dat ik zou pakken.",
  },
  {
    question: "Moet ik wachten op de Kindle Scribe Colorsoft?",
    answer:
      "Alleen als kleur voor jouw manier van werken echt belangrijk is. De Scribe Colorsoft is duurder, terwijl de gewone Scribe al dezelfde kernervaring biedt: lezen, schrijven en notities maken op een groot e-inkscherm. Wil je vooral schrijven en zwart-wit lezen, dan vind ik de gewone Scribe financieel logischer.",
  },
  {
    question: "Wat is het verschil tussen de Kindle Colorsoft en de Kindle Paperwhite?",
    answer:
      "Vooral het scherm. De Colorsoft toont kleur bij omslagen, afbeeldingen en markeringen. De Paperwhite blijft volledig zwart-wit, heeft daardoor een iets lichtere achtergrond en kost minder. Qua formaat, waterdichtheid en algemene Kindle-ervaring lijken ze sterk op elkaar.",
  },
  {
    question: "Wat is het verschil tussen de Kindle Colorsoft en de Kobo Libra Colour?",
    answer:
      "Beide hebben een 7-inch kleuren-e-inkscherm, maar de keuze gaat eigenlijk minder over het scherm dan over het systeem eromheen. De Kobo Libra Colour geeft je fysieke bladerknoppen, meer vrijheid met EPUB-bestanden en ondersteuning voor Nederlandse bibliotheekboeken via Adobe Digital Editions. De Kindle Colorsoft sluit juist naadloos aan op de Kindle Store en je bestaande Kindle-bibliotheek. Dus stel jezelf vooral deze vraag: wil ik Kindle, of wil ik meer vrijheid met mijn bestanden?",
  },
  {
    question: "Is de Kindle Colorsoft waterdicht?",
    answer:
      "Ja. Amazon verkoopt de Colorsoft als waterdichte e-reader, waardoor je hem ook bij het zwembad of in bad kunt gebruiken.",
  },
  {
    question: "Hoe lang gaat de batterij van de Kindle Colorsoft mee?",
    answer:
      "Amazon noemt een batterijduur van maximaal acht weken op één USB-C-lading. In de praktijk hangt dat af van hoe vaak je leest en hoeveel schermverlichting je gebruikt.",
  },
];

function getEreaderUrl(slug: string) {
  return ereaders.find((item) => item.slug === slug)?.amazonUrl ?? "";
}

export default function EReadersPage() {
  const jsonLd = buildJsonLd(
    articleSchema,
    collectionPageSchema(
      "Beste e-readers 2026",
      absoluteUrl(pagePath),
      pageDescription
    ),
    breadcrumbSchema(breadcrumbs),
    itemListSchema(
      "Beste e-readers 2026",
      ereaders.map((item) => ({
        name: item.naam,
        url: absoluteUrl(`${pagePath}#${item.slug}`),
        description: item.korteOmschrijving,
      }))
    ),
    faqSchema(faqItems)
  );


  return (
    <main>
      <JsonLd data={jsonLd} />
      <PageHeader
        eyebrow="Gids"
        title="De beste e-reader van 2026: gekozen door een schrijver die er zelf op leest"
        description="Door Ard Breure, auteur van Schaduwen over Domburg"
      />
      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} />

        <section className="content-section">
          <p className="content-paragraph">
            Ik lees veel. Dat hoort natuurlijk een beetje bij het
            schrijverschap, maar eerlijk gezegd deed ik dat al lang voordat ik
            zelf aan een boek begon. De afgelopen jaren is steeds meer van dat
            lezen verschoven naar een e-reader. In de trein, &apos;s avonds op
            de bank en op vakantie, wanneer je liever dertig boeken meeneemt
            zonder daar ook dertig boeken voor te hoeven tillen.
          </p>
          <p className="content-paragraph">
            En precies daar zit voor mij de kracht van een goede e-reader: hij
            moet vooral niet in de weg zitten. Je wilt hem pakken, je boek
            openen en verder lezen.
          </p>
          <p className="content-paragraph">
            In deze gids vergelijk ik de zes e-readers die er in 2026 wat mij
            betreft echt toe doen. Niet alleen op specificaties, maar vooral op
            de vraag:{" "}
            <strong>
              voor welk type lezer is dit nou de beste keuze?
            </strong>
          </p>
          <p className="content-paragraph">
            Wil je meteen het korte antwoord? Voor de meeste mensen zou ik de{" "}
            <strong>Kindle Paperwhite</strong> kiezen. Wil je liever buiten het
            Amazon-ecosysteem blijven, dan vind ik de{" "}
            <strong>Kobo Libra Colour</strong> interessanter. En wil je vooral
            goedkoop kennismaken met e-lezen, dan is de gewone{" "}
            <strong>Kindle</strong> moeilijk te verslaan.
          </p>
          <p className="content-paragraph">Hieronder leg ik uit waarom.</p>
          <p className="content-paragraph">
            Specifiek op zoek naar een model waarmee je zonder stress in bad,
            aan het zwembad of op het strand kunt lezen? Bekijk dan ook mijn
            aparte gids over de{" "}
            <Link href="/waterdichte-e-reader">waterdichte e-reader</Link>,
            waarin ik uitgebreider inga op IPX8 en de beste modellen voor dat
            gebruik.
          </p>
        </section>

        <AffiliateDisclosure />

        <figure className="content-section">
          <Image
            src="/assets/kindle-paperwhite-schaduwen-over-domburg-zeeuwse-kust.webp"
            alt="Kindle Paperwhite e-reader met de cover van Schaduwen over Domburg, op de achtergrond het Zeeuwse strand en de zee"
            width={1600}
            height={873}
            priority
            sizes="(max-width: 768px) 100vw, 48rem"
            style={{ width: "100%", height: "auto" }}
          />
          <figcaption className="content-meta">
            Zo ziet Schaduwen over Domburg eruit op de Kindle Paperwhite, de
            e-reader die ik hieronder als beste koop aanraad.
          </figcaption>
        </figure>

        <div
          className="content-section content-inline-cta"
          style={{ textAlign: "center", marginTop: "-0.25rem" }}
        >
          <p
            className="content-meta"
            style={{ marginBottom: "0.875rem", maxWidth: "none" }}
          >
            Mijn nummer 1 aanbeveling: lees hieronder waarom, of bekijk hem
            meteen.
          </p>
          <AffiliateButton
            amazonUrl={getEreaderUrl("kindle-paperwhite")}
            label="Bekijk de Kindle Paperwhite op Amazon"
            compact
          />
        </div>

        <section className="content-section" aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="content-heading">
            In één oogopslag
          </h2>
          <div className="content-table-wrapper">
            <table className="content-table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Model</th>
                <th scope="col">Voor wie</th>
                <th scope="col">Scherm</th>
                <th scope="col">Waterdicht</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <a href="#kindle-paperwhite">Kindle Paperwhite</a>
                </td>
                <td>De meeste lezers (beste koop)</td>
                <td>7 inch, zwart-wit</td>
                <td>Ja</td>
              </tr>
              <tr>
                <td>2</td>
                <td>
                  <a href="#kindle-basis">Kindle</a>
                </td>
                <td>Wie zo goedkoop mogelijk wil beginnen</td>
                <td>6 inch, zwart-wit</td>
                <td>Nee</td>
              </tr>
              <tr>
                <td>3</td>
                <td>
                  <a href="#kobo-libra-colour">Kobo Libra Colour</a>
                </td>
                <td>Wie kleur en bladerknoppen wil, zonder Amazon</td>
                <td>7 inch, kleur</td>
                <td>Ja</td>
              </tr>
              <tr>
                <td>4</td>
                <td>
                  <a href="#kobo-clara-bw">Kobo Clara BW</a>
                </td>
                <td>Wie compact en betaalbaar wil, zonder Amazon</td>
                <td>6 inch, zwart-wit</td>
                <td>Ja</td>
              </tr>
              <tr>
                <td>5</td>
                <td>
                  <a href="#kindle-scribe">Kindle Scribe</a>
                </td>
                <td>Wie ook aantekeningen wil maken</td>
                <td>10,2 inch, met pen</td>
                <td>Nee</td>
              </tr>
              <tr>
                <td>6</td>
                <td>
                  <a href="#kindle-colorsoft">Kindle Colorsoft</a>
                </td>
                <td>Wie kleur wil binnen Kindle</td>
                <td>7 inch, kleur</td>
                <td>Ja</td>
              </tr>
            </tbody>
          </table>
          </div>
        </section>

        <section
          id="kindle-paperwhite"
          className="content-section"
          aria-labelledby="kindle-paperwhite-heading"
        >
          <div className="content-heading-group">
            <h2 id="kindle-paperwhite-heading" className="content-heading">
              1. Kindle Paperwhite: de beste e-reader voor de meeste mensen
            </h2>
            <ContentBadge>Beste koop</ContentBadge>
          </div>
          <p className="content-paragraph">
            Als iemand mij vraagt:{" "}
            <em>&quot;Welke e-reader zou jij gewoon kopen?&quot;</em>, dan kom
            ik meestal bij de Kindle Paperwhite uit.
          </p>
          <p className="content-paragraph">
            Niet omdat hij op ieder onderdeel de meest spectaculaire e-reader
            is. Juist omdat hij bijna nergens vervelend wordt.
          </p>
          <p className="content-paragraph">
            Het scherm van 7 inch vind ik daarin een mooie middenweg. Groot
            genoeg om ontspannen te lezen, maar nog steeds compact genoeg om
            makkelijk vast te houden. Zeker als je langere tijd leest, merk je
            hoe prettig dat formaat is.
          </p>
          <p className="content-paragraph">
            De verlichting kun je warmer instellen voor de avond. Dat klinkt
            misschien als zo&apos;n specificatie waar fabrikanten graag mee
            schermen, maar tijdens het lezen is het daadwerkelijk prettig. Het
            scherm voelt daardoor veel minder als een fel apparaat dat vlak
            voor je gezicht staat.
          </p>
          <p className="content-paragraph">
            Daarnaast is de Paperwhite waterdicht. Geen functie die je iedere
            dag nodig hebt, maar wel eentje waarvan je blij bent dat hij erop
            zit zodra je in bad leest, hem naast het zwembad legt of in een
            typisch Nederlandse regenbui terechtkomt.
          </p>
          <p className="content-paragraph">
            En de batterij? Die gaat gewoon weken mee. Dat is precies zoals het
            bij een e-reader hoort te zijn: je hoeft niet iedere avond na te
            denken of dat ding nog aan de lader moet.
          </p>
          <p className="content-paragraph">
            Op Amazon staat de Paperwhite rond de €179,99 voor de 16GB-versie
            en krijgt hij 4,6 sterren op basis van ruim 15.700 beoordelingen.
          </p>
          <p className="content-paragraph">
            Er is wel één belangrijke kanttekening:{" "}
            <strong>Kindle betekent Amazon</strong>.
          </p>
          <p className="content-paragraph">
            Boeken koop je vooral via de Kindle Store. Die bibliotheek is enorm
            en het hele systeem werkt soepel, maar als je graag EPUB-bestanden
            uit allerlei verschillende bronnen gebruikt of Nederlandse
            bibliotheekboeken wilt lenen, is Kobo flexibeler.
          </p>
          <p className="content-paragraph">
            Voor iemand die vooral romans, thrillers of non-fictie koopt en
            gewoon zonder gedoe wil lezen, zie ik dat overigens niet direct als
            een probleem. Dan is dat gesloten ecosysteem juist onderdeel van
            het gemak.
          </p>
          <p className="content-paragraph">
            <strong>Voor wie:</strong> lezers die veel lezen, weinig willen
            instellen en gewoon één keer een goede e-reader willen kopen.
          </p>
          <AffiliateButton amazonUrl={getEreaderUrl("kindle-paperwhite")} />
        </section>

        <section
          id="kindle-basis"
          className="content-section"
          aria-labelledby="kindle-basis-heading"
        >
          <div className="content-heading-group">
            <h2 id="kindle-basis-heading" className="content-heading">
              2. Kindle (basismodel): de slimste instap
            </h2>
            <ContentBadge>Beste instap</ContentBadge>
          </div>
          <p className="content-paragraph">
            De goedkoopste Kindle heeft een beetje een saai imago. Het is niet
            de luxe versie, er zitten geen spectaculaire extra&apos;s op en
            Amazon zet de Paperwhite natuurlijk liever in de etalage.
          </p>
          <p className="content-paragraph">
            Maar juist daarom vind ik hem interessant.
          </p>
          <p className="content-paragraph">
            Voor relatief weinig geld krijg je inmiddels gewoon een heel goede
            leesmachine. Het scherm is scherp, het apparaat is licht, opladen
            gaat via USB-C en volgens Amazon houdt de batterij het tot ongeveer
            zes weken vol.
          </p>
          <p className="content-paragraph">
            Je krijgt bovendien 16 GB opslag. Voor gewone e-books is dat zo veel
            ruimte dat de meeste lezers nooit serieus hoeven na te denken over
            opslag.
          </p>
          <p className="content-paragraph">
            Amazon gebruikt tegenwoordig ook 75% gerecycled plastic en 90%
            gerecycled magnesium voor het apparaat.
          </p>
          <p className="content-paragraph">
            Op Amazon zelf zit de prijs rond de €120 en krijgt het model 4,6
            sterren uit ruim 14.500 beoordelingen.
          </p>
          <p className="content-paragraph">
            Waar zit het verschil met de Paperwhite dan?
          </p>
          <p className="content-paragraph">
            Vooral in de dingen die je pas mist als je ze eenmaal gewend bent.
            De gewone Kindle is niet waterdicht, heeft geen warme
            schermverlichting en het scherm is met 6 inch iets kleiner.
          </p>
          <figure className="content-section">
            <Image
              src="/assets/kindle-basismodel-leesbaarheid-licht-donker.webp"
              alt="Hand met compacte e-reader: scherm blijft even goed leesbaar in een donkere kamer als in fel daglicht"
              width={1600}
              height={873}
              sizes="(max-width: 768px) 100vw, 48rem"
              style={{ width: "100%", height: "auto" }}
            />
          </figure>
          <p className="content-paragraph">
            De verlichting blijft ondertussen prima leesbaar, zowel in een
            donkere kamer als buiten.
          </p>
          <p className="content-paragraph">
            <a
              href={getEreaderUrl("kindle-basis")}
              className="content-inline-link"
              rel="nofollow sponsored noopener"
              target="_blank"
            >
              → Bekijk de actuele prijs op Amazon
            </a>
          </p>
          <p className="content-paragraph">
            Mijn advies is daarom vrij simpel.
          </p>
          <p className="content-paragraph">
            Is het prijsverschil met de Paperwhite voor jou geen probleem? Neem
            dan de Paperwhite. Je krijgt net wat meer comfort en hebt daar
            waarschijnlijk jarenlang plezier van.
          </p>
          <p className="content-paragraph">
            Maar weet je nog helemaal niet of e-lezen iets voor je is? Dan zou
            ik juist niet te ingewikkeld doen. Met deze Kindle kun je relatief
            goedkoop ontdekken of je dat lezen op e-ink prettig vindt.
          </p>
          <p className="content-paragraph">
            En als het bevalt, heb je nog steeds gewoon een goede e-reader.
          </p>
          <p className="content-paragraph">
            <strong>Voor wie:</strong> beginnende e-readergebruikers,
            studenten, prijsbewuste lezers en iedereen die eerst wil ontdekken
            of e-lezen bij hem of haar past.
          </p>
          <AffiliateButton amazonUrl={getEreaderUrl("kindle-basis")} />
        </section>

        <section
          id="kobo-libra-colour"
          className="content-section"
          aria-labelledby="kobo-libra-colour-heading"
        >
          <div className="content-heading-group">
            <h2 id="kobo-libra-colour-heading" className="content-heading">
              3. Kobo Libra Colour: de beste e-reader buiten Amazon
            </h2>
            <ContentBadge>Beste zonder Amazon</ContentBadge>
          </div>
          <p className="content-paragraph">
            Niet iedereen wil zijn complete boekenkast aan één winkel koppelen.
          </p>
          <p className="content-paragraph">
            Misschien koop je het ene boek bij Kobo, haal je ergens anders een
            EPUB vandaan en leen je tussendoor boeken bij de online
            Bibliotheek. Als je zo leest, vind ik Kobo eigenlijk logischer dan
            Kindle.
          </p>
          <p className="content-paragraph">
            En binnen Kobo is de <strong>Libra Colour</strong> wat mij betreft
            het interessantste complete model.
          </p>
          <p className="content-paragraph">
            Je krijgt veel meer vrijheid met bestanden dan bij Kindle.
            EPUB-bestanden zijn geen probleem en ook e-books van de Nederlandse
            online Bibliotheek kun je via Adobe Digital Editions op het
            apparaat zetten.
          </p>
          <p className="content-paragraph">
            Dat klinkt misschien wat technisch, maar het belangrijkste verschil
            is simpel: <strong>je zit minder vast aan één winkel.</strong>
          </p>
          <p className="content-paragraph">
            <a
              href={getEreaderUrl("kobo-libra-colour")}
              className="content-inline-link"
              rel="nofollow sponsored noopener"
              target="_blank"
            >
              → Bekijk de actuele prijs van de Kobo Libra Colour op Amazon
            </a>
          </p>
          <p className="content-paragraph">Dan het kleurenscherm.</p>
          <p className="content-paragraph">
            De Libra Colour gebruikt een 7-inch E Ink Kaleido 3-scherm. Verwacht
            daarbij absoluut geen iPad. De kleuren zijn rustiger en wat
            gedempter.
          </p>
          <p className="content-paragraph">
            En eerlijk gezegd hoort dat ook een beetje bij e-ink.
          </p>
          <p className="content-paragraph">
            Het lijkt eerder op een pagina waarop in kleur is gedrukt dan op
            een fel beeldscherm. Voor boekomslagen, illustraties, strips en
            markeringen werkt dat erg mooi, terwijl je wel het rustige karakter
            van een e-reader houdt.
          </p>
          <p className="content-paragraph">
            Wat ik persoonlijk een sterk punt van de Libra vind, zijn de{" "}
            <strong>fysieke bladerknoppen</strong>.
          </p>
          <p className="content-paragraph">
            Dat lijkt op papier bijna onbelangrijk. Je kunt immers ook gewoon
            op het scherm tikken.
          </p>
          <p className="content-paragraph">
            Maar wanneer je lang achter elkaar leest en de e-reader met één
            hand vasthoudt, zijn echte knoppen ineens verrassend prettig. Je
            duim blijft op dezelfde plek en je bladert door zonder telkens het
            scherm te hoeven aanraken.
          </p>
          <p className="content-paragraph">
            De asymmetrische behuizing helpt daar ook bij. Wissel je van hand,
            dan draait het scherm automatisch mee.
          </p>
          <figure className="content-section">
            <Image
              src="/assets/kobo-libra-colour-waterdicht-lezen-in-bad.webp"
              alt="Vrouw leest ontspannen in bad op een waterdichte Kobo Libra Colour e-reader met kleurenscherm, kaarsen ernaast"
              width={1600}
              height={873}
              sizes="(max-width: 768px) 100vw, 48rem"
              style={{ width: "100%", height: "auto" }}
            />
          </figure>
          <p className="content-paragraph">
            Praktisch gezien krijg je 32 GB opslag, genoeg voor ongeveer 24.000
            e-books of 150 luisterboeken. De batterij gaat weken mee en de
            Libra Colour heeft een IPX8-classificatie: hij kan tot 60 minuten
            in maximaal twee meter water overleven.
          </p>
          <p className="content-paragraph">
            Voor lezen in bad of bij het zwembad is dat vooral geruststellend.
          </p>
          <p className="content-paragraph">
            Wil je aantekeningen maken, dan kun je daarnaast de Kobo Stylus 2
            gebruiken. Die wordt los verkocht en maakt het mogelijk om direct
            te schrijven en in kleur te markeren.
          </p>
          <p className="content-paragraph">
            Op Amazon krijgt de Libra Colour 4,5 sterren uit bijna 2.400
            beoordelingen en ligt de prijs rond de €260.
          </p>
          <p className="content-paragraph">Natuurlijk is hij niet perfect.</p>
          <p className="content-paragraph">
            Een kleuren-e-inkscherm heeft een iets grijzere achtergrond dan een
            echt goed zwart-witscherm. Lees je uitsluitend romans, dan kun je
            jezelf dus afvragen hoeveel je daadwerkelijk aan kleur hebt.
          </p>
          <p className="content-paragraph">
            Ook is de Kobo-winkel kleiner dan Amazons Kindle Store.
          </p>
          <p className="content-paragraph">
            Maar voor lezers die juist boeken uit verschillende bronnen halen,
            vind ik die extra vrijheid belangrijker dan de omvang van één
            winkel.
          </p>
          <p className="content-paragraph">
            <strong>Voor wie:</strong> bibliotheeklezers, mensen met een
            verzameling EPUB-bestanden, strip- en graphic-novellezers en
            iedereen die bewust niet volledig aan Amazon vast wil zitten.
          </p>
          <AffiliateButton amazonUrl={getEreaderUrl("kobo-libra-colour")} />
        </section>

        <section
          id="kobo-clara-bw"
          className="content-section"
          aria-labelledby="kobo-clara-bw-heading"
        >
          <div className="content-heading-group">
            <h2 id="kobo-clara-bw-heading" className="content-heading">
              4. Kobo Clara BW: klein, licht en verrassend compleet
            </h2>
            <ContentBadge>Beste compact</ContentBadge>
          </div>
          <p className="content-paragraph">
            Groter is niet automatisch beter.
          </p>
          <p className="content-paragraph">
            Sterker nog: voor een e-reader kan een kleiner apparaat juist
            heerlijk zijn. Minder gewicht, makkelijker meenemen en je houdt hem
            zonder problemen lang met één hand vast.
          </p>
          <p className="content-paragraph">
            Dat is precies waar de <strong>Kobo Clara BW</strong> goed in is.
          </p>
          <p className="content-paragraph">
            Hij heeft geen kleurenscherm en geen fysieke bladerknoppen. Wat je
            wél krijgt, is een compacte 6-inch e-reader die eigenlijk alles kan
            wat een gewone boekenlezer nodig heeft.
          </p>
          <p className="content-paragraph">
            Net als bij de Libra Colour zit je niet vast aan één winkel.
            EPUB-bestanden kun je gebruiken en boeken van de Nederlandse
            online Bibliotheek zijn via Adobe Digital Editions op het apparaat
            te zetten.
          </p>
          <p className="content-paragraph">
            <a
              href={getEreaderUrl("kobo-clara-bw")}
              className="content-inline-link"
              rel="nofollow sponsored noopener"
              target="_blank"
            >
              → Bekijk de actuele prijs van de Kobo Clara BW op Amazon
            </a>
          </p>
          <p className="content-paragraph">
            Het scherm gebruikt E Ink Carta 1300. Letters zien er scherp uit,
            pagina&apos;s slaan snel om en het scherm blijft buiten goed
            leesbaar doordat het nauwelijks spiegelt.
          </p>
          <p className="content-paragraph">
            De ComfortLight PRO-verlichting kan niet alleen feller en zachter,
            maar ook warmer worden ingesteld. Vooral &apos;s avonds vind ik dat
            relevanter dan allerlei spectaculaire functies die uiteindelijk
            nauwelijks iets met lezen te maken hebben.
          </p>
          <p className="content-paragraph">
            Er is ook een donkere leesmodus.
          </p>
          <figure className="content-section">
            <Image
              src="/assets/kobo-clara-bw-lezen-in-zonlicht-strand.webp"
              alt="Kobo Clara BW e-reader met leesbaar e-inkscherm in fel zonlicht op het strand, zonnebril ernaast"
              width={1600}
              height={1355}
              sizes="(max-width: 768px) 100vw, 48rem"
              style={{ width: "100%", height: "auto" }}
            />
          </figure>
          <p className="content-paragraph">
            Wat ik sterk vind aan de Clara BW, is dat Kobo ondanks de compacte
            prijs en het formaat niet op waterdichtheid heeft bezuinigd.
          </p>
          <p className="content-paragraph">
            Ook dit model heeft IPX8: tot 60 minuten in maximaal twee meter
            water.
          </p>
          <p className="content-paragraph">
            Daarnaast zit er Bluetooth op voor Kobo-luisterboeken. Je kunt dus
            een koptelefoon of speaker aansluiten als je liever luistert dan
            leest.
          </p>
          <p className="content-paragraph">
            Met 16 GB opslag is er ruimte voor ongeveer 12.000 e-books.
          </p>
          <p className="content-paragraph">
            De batterij gaat weken mee.
          </p>
          <p className="content-paragraph">
            Op Amazon krijgt het model 4,6 sterren uit ruim 2.600 beoordelingen
            en ligt de prijs rond de €170.
          </p>
          <p className="content-paragraph">Waar lever je dan op in?</p>
          <p className="content-paragraph">Vooral formaat en bediening.</p>
          <p className="content-paragraph">
            Er zijn geen fysieke bladerknoppen, dus alles gaat via het
            touchscreen. En 6 inch is echt compact. Zelf vind ik dat juist
            aantrekkelijk als je veel onderweg bent, maar gebruik je grotere
            letters of wil je meer tekst tegelijk op het scherm, dan voelt 7
            inch waarschijnlijk comfortabeler.
          </p>
          <p className="content-paragraph">
            In dat geval is de Libra Colour de logischere stap omhoog.
          </p>
          <p className="content-paragraph">
            Maar zoek je vooral een kleine, degelijke en waterdichte e-reader
            zonder verplichte Amazon-winkel, dan is de Clara BW een heel
            sterke keuze.
          </p>
          <p className="content-paragraph">
            <strong>Voor wie:</strong> forenzen, reizigers, bibliotheeklezers
            met een kleiner budget en iedereen die vooral een compacte e-reader
            zoekt.
          </p>
          <AffiliateButton amazonUrl={getEreaderUrl("kobo-clara-bw")} />
        </section>

        <section
          id="kindle-scribe"
          className="content-section"
          aria-labelledby="kindle-scribe-heading"
        >
          <div className="content-heading-group">
            <h2 id="kindle-scribe-heading" className="content-heading">
              5. Kindle Scribe: de e-reader waar je óók op schrijft
            </h2>
            <ContentBadge>Beste om op te schrijven</ContentBadge>
          </div>
          <p className="content-paragraph">
            De Kindle Scribe is eigenlijk een ander soort apparaat dan de
            modellen hierboven.
          </p>
          <p className="content-paragraph">
            Een Paperwhite koop je om boeken te lezen.
          </p>
          <p className="content-paragraph">
            Een Scribe koop je wanneer je tijdens dat lezen ook voortdurend
            dingen wilt <strong>opschrijven</strong>.
          </p>
          <p className="content-paragraph">
            Denk aan studenten die aantekeningen maken, mensen die documenten
            doornemen, schrijvers die ideeën vastleggen of iemand die zijn
            papieren notitieboek het liefst thuislaat.
          </p>
          <p className="content-paragraph">
            De Scribe combineert een e-reader met een digitaal notitieboek en
            wordt geleverd met de Premium Pen. Die pen hoef je niet op te
            laden.
          </p>
          <p className="content-paragraph">
            <a
              href={getEreaderUrl("kindle-scribe")}
              className="content-inline-link"
              rel="nofollow sponsored noopener"
              target="_blank"
            >
              → Bekijk de actuele prijs van de Kindle Scribe op Amazon
            </a>
          </p>
          <p className="content-paragraph">
            Het 10,2-inch scherm is met afstand het grootste scherm in deze
            vergelijking.
          </p>
          <p className="content-paragraph">
            Met 300 ppi is tekst scherp en het scherm is ontspiegeld en
            verlicht, zodat je zowel binnen als buiten kunt werken.
          </p>
          <p className="content-paragraph">
            Schrijven op e-ink voelt bovendien anders dan schrijven op een
            glazen tablet. De pen heeft wat weerstand op het oppervlak. Daardoor
            voelt het eerder alsof je daadwerkelijk iets opschrijft dan alsof
            je met plastic over een stuk glas glijdt.
          </p>
          <p className="content-paragraph">
            Met het Dynamisch canvas kun je tijdens het lezen notities tussen
            de tekst plaatsen. De pagina maakt daar ruimte voor en wanneer je
            de notitie weer inklapt, schuift de tekst terug.
          </p>
          <figure className="content-section">
            <Image
              src="/assets/kindle-scribe-schrijven-met-pen-notities.webp"
              alt="Hand schrijft met pen aantekeningen op een Kindle Scribe e-reader met groot ontspiegeld e-inkscherm"
              width={1600}
              height={893}
              sizes="(max-width: 768px) 100vw, 48rem"
              style={{ width: "100%", height: "auto" }}
            />
          </figure>
          <p className="content-paragraph">
            Daarnaast kun je de Scribe als los notitieboek gebruiken.
          </p>
          <p className="content-paragraph">
            Vergadernotities, takenlijsten, losse ideeën, een dagboek: het kan
            allemaal op hetzelfde apparaat.
          </p>
          <p className="content-paragraph">
            En daar zit voor mij ook een deel van de aantrekkingskracht: er
            zijn geen WhatsApp-berichten, TikTok-video&apos;s of andere
            meldingen die ineens door je notities heen komen denderen.
          </p>
          <p className="content-paragraph">
            Je kunt handgeschreven tekst bovendien omzetten naar getypte tekst
            en vervolgens per e-mail delen.
          </p>
          <p className="content-paragraph">
            Op Amazon krijgt de Scribe 4,3 sterren uit ruim 1.800
            beoordelingen. De 32GB-versie met Premium Pen kost rond de €450.
          </p>
          <p className="content-paragraph">
            Dat maakt meteen duidelijk waarom hij niet voor iedereen is.
          </p>
          <p className="content-paragraph">
            De Scribe is groot. Hij is niet waterdicht. En als je eigenlijk
            alleen maar romans wilt lezen, sleep je een hoop apparaat mee waar
            je weinig aan hebt.
          </p>
          <p className="content-paragraph">
            Er bestaat inmiddels ook een nieuwere Kindle Scribe Colorsoft met
            kleurenscherm. Interessant als kleurmarkeringen belangrijk voor je
            zijn, maar ook aanzienlijk duurder.
          </p>
          <p className="content-paragraph">
            Voor de meeste mensen die vooral willen schrijven én lezen, vind ik
            deze gewone Scribe daarom de verstandigere keuze.
          </p>
          <p className="content-paragraph">
            <strong>Voor wie:</strong> studenten, onderzoekers, professionals
            die documenten annoteren, mensen die veel notities maken en lezers
            die één apparaat willen voor lezen én schrijven.
          </p>
          <AffiliateButton amazonUrl={getEreaderUrl("kindle-scribe")} />
        </section>

        <section
          id="kindle-colorsoft"
          className="content-section"
          aria-labelledby="kindle-colorsoft-heading"
        >
          <div className="content-heading-group">
            <h2 id="kindle-colorsoft-heading" className="content-heading">
              6. Kindle Colorsoft: de Paperwhite, maar dan in kleur
            </h2>
            <ContentBadge>Beste Kindle in kleur</ContentBadge>
          </div>
          <p className="content-paragraph">
            Stel: je vindt Kindle eigenlijk al prima.
          </p>
          <p className="content-paragraph">
            Je hebt boeken in je Kindle-bibliotheek, je kent het systeem en je
            hebt geen behoefte om naar Kobo over te stappen.
          </p>
          <p className="content-paragraph">Je mist alleen kleur.</p>
          <p className="content-paragraph">
            Dan is de <strong>Kindle Colorsoft</strong> waarschijnlijk precies
            het model waar je naar kijkt.
          </p>
          <p className="content-paragraph">
            In de basis voelt hij als een luxere Paperwhite met een
            kleurenscherm. De bediening is vertrouwd, het formaat is compact en
            je blijft gewoon binnen het Kindle-ecosysteem.
          </p>
          <p className="content-paragraph">
            Het verschil zie je vooral bij omslagen, afbeeldingen en
            markeringen.
          </p>
          <p className="content-paragraph">
            <a
              href={getEreaderUrl("kindle-colorsoft")}
              className="content-inline-link"
              rel="nofollow sponsored noopener"
              target="_blank"
            >
              → Bekijk de actuele prijs van de Kindle Colorsoft op Amazon
            </a>
          </p>
          <p className="content-paragraph">
            Het 7-inch Colorsoft-scherm gebruikt rustige e-inkkleuren.
          </p>
          <p className="content-paragraph">
            Ook hier geldt: verwacht geen tablet.
          </p>
          <p className="content-paragraph">
            Dat is geen tekortkoming, maar simpelweg hoe kleuren-e-ink werkt.
            De kleuren zijn zachter en papierachtiger, waardoor het scherm veel
            rustiger oogt dan een telefoon of iPad.
          </p>
          <p className="content-paragraph">
            De verlichting kun je instellen van koel wit naar warmer amber.
            Daardoor is het scherm zowel buiten als &apos;s avonds prettig te
            gebruiken.
          </p>
          <p className="content-paragraph">
            Een aardig detail is de functie Paginakleur. Daarmee kun je voor
            avondlezen de lichte en donkere delen van de pagina omkeren,
            terwijl illustraties en covers hun kleur behouden.
          </p>
          <figure className="content-section">
            <Image
              src="/assets/kindle-colorsoft-kleurenscherm-warm-licht.webp"
              alt="Kindle Colorsoft e-reader met kleurrijke boekomslag op het e-inkscherm, lezen bij warm avondlicht"
              width={1600}
              height={893}
              sizes="(max-width: 768px) 100vw, 48rem"
              style={{ width: "100%", height: "auto" }}
            />
          </figure>
          <p className="content-paragraph">
            Verder krijg je vrijwel alles wat je van een moderne Kindle
            verwacht.
          </p>
          <p className="content-paragraph">
            Hij is waterdicht, de batterij gaat volgens Amazon tot acht weken
            mee en je hebt direct toegang tot de Kindle Store.
          </p>
          <p className="content-paragraph">
            Op Amazon krijgt de Colorsoft 4,5 sterren uit ruim 2.400
            beoordelingen en ligt de prijs rond de €270 voor 16 GB.
          </p>
          <p className="content-paragraph">
            Maar hier zou ik wel even kritisch naar je eigen leesgedrag kijken.
          </p>
          <p className="content-paragraph">
            Lees je bijna uitsluitend romans?
          </p>
          <p className="content-paragraph">
            Dan betaal je ongeveer honderd euro extra voor een kleurenscherm
            dat op de meeste pagina&apos;s nauwelijks iets toevoegt. In dat
            geval zou ik persoonlijk gewoon de Paperwhite nemen.
          </p>
          <p className="content-paragraph">
            Lees je juist strips, kookboeken of artikelen met afbeeldingen? Of
            markeer je graag verschillende passages in verschillende kleuren?
            Dan heeft Colorsoft opeens veel meer bestaansrecht.
          </p>
          <p className="content-paragraph">
            Dat is eigenlijk de kern van deze e-reader:{" "}
            <strong>kleur moet iets toevoegen aan wat jij leest.</strong>
          </p>
          <p className="content-paragraph">
            Anders betaal je vooral voor de mogelijkheid dat het kan.
          </p>
          <p className="content-paragraph">
            <strong>Voor wie:</strong> bestaande Kindle-gebruikers die kleur
            willen, lezers van strips en kookboeken en mensen die veel met
            gekleurde markeringen werken.
          </p>
          <AffiliateButton amazonUrl={getEreaderUrl("kindle-colorsoft")} />
        </section>

        <section
          className="content-section"
          aria-labelledby="choose-heading"
        >
          <h2 id="choose-heading" className="content-heading">
            Zo kies je: drie vragen
          </h2>
          <p className="content-paragraph">
            Na al die modellen en specificaties kun je de keuze eigenlijk
            terugbrengen tot drie vrij simpele vragen.
          </p>
          <h3 id="choose-books-heading" className="content-heading">
            1. Waar komen je boeken vandaan?
          </h3>
          <p className="content-paragraph">
            Koop je je boeken vooral bij één grote winkel en wil je zo weinig
            mogelijk gedoe? Dan is Kindle waarschijnlijk de makkelijkste
            keuze.
          </p>
          <p className="content-paragraph">
            Gebruik je regelmatig EPUB-bestanden of leen je e-books bij de
            Nederlandse online Bibliotheek? Dan past Kobo beter.
          </p>
          <p className="content-paragraph">
            Kindle ondersteunt de Adobe DRM-beveiliging van die Nederlandse
            bibliotheekboeken niet.
          </p>
          <h3 id="choose-color-heading" className="content-heading">
            2. Heb je kleur echt nodig?
          </h3>
          <p className="content-paragraph">
            Voor romans en thrillers zou ik zonder twijfel zwart-wit kiezen.
          </p>
          <p className="content-paragraph">
            Het scherm is scherper, meestal goedkoper en je mist tijdens het
            lezen eigenlijk niets.
          </p>
          <p className="content-paragraph">
            Kleur wordt vooral interessant zodra de inhoud zelf kleur bevat:
            strips, illustraties, tijdschriften, kookboeken of gekleurde
            markeringen.
          </p>
          <p className="content-paragraph">
            Koop dus geen kleuren-e-reader alleen omdat kleur nieuwer klinkt.
          </p>
          <h3 id="choose-budget-heading" className="content-heading">
            3. Hoeveel wil je uitgeven?
          </h3>
          <p className="content-paragraph">
            Weet je nog niet of een e-reader iets voor je is? Begin dan bij een
            betaalbaar instapmodel.
          </p>
          <p className="content-paragraph">
            Lees je al veel en weet je dat je het apparaat jarenlang gaat
            gebruiken? Dan vind ik het makkelijker om extra geld uit te geven
            aan een Paperwhite of Libra Colour.
          </p>
          <p className="content-paragraph">
            Een e-reader is uiteindelijk zo&apos;n apparaat dat je honderden
            uren in je handen kunt hebben. Een paar tientjes verschil wordt dan
            opeens een stuk minder belangrijk.
          </p>
        </section>
      </div>

      <FaqSection items={faqItems} />

      <div className="container content-page content-page--footer">
        <section className="content-section">
          <p className="content-meta">
            Zoek je specifiek een waterdichte e-reader voor bad, strand of
            zwembad? Lees dan mijn gids over de{" "}
            <Link href="/waterdichte-e-reader">
              beste waterdichte e-readers
            </Link>
            .
          </p>
          <p className="content-meta">
            Benieuwd hoeveel pagina&apos;s of woorden een gemiddeld digitaal
            boek heeft? Bekijk dan ook{" "}
            <Link href="/lengte-van-ebook">
              de lengte van een e-book per genre
            </Link>
            .
          </p>
          <p className="content-meta">
            <em>Ik raad alleen aan wat ik zelf zou kopen.</em>
          </p>
          <p className="content-meta">
            <Link href="/blog">Meer artikelen op het blog</Link>
            {" · "}
            <Link href="/boeken-over-rotterdam">Boeken over Rotterdam</Link>
            {" · "}
            <Link href="/boeken-over-zeeland">Boeken over Zeeland</Link>
          </p>
          <p className="content-meta">
            <em>
              Ard Breure is de auteur van de literaire thriller{" "}
              <Link href="/boeken/schaduwen-over-domburg">
                Schaduwen over Domburg
              </Link>
              , die naar verwachting in het najaar van 2026 verschijnt.
            </em>
          </p>
        </section>
      </div>
    </main>
  );
}
