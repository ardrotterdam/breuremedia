import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AffiliateButton } from "@/components/AffiliateButton";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { Breadcrumbs } from "@/components/Breadcrumbs";
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
  itemListSchema,
} from "@/lib/schema";

const pageTitle =
  "Beste e-reader 2026: Kindle of Kobo? Eerlijke vergelijking | Breure Media";
const pageDescription =
  "In deze gids vergelijk ik de zes e-readers die er in 2026 echt toe doen, en vertel ik welke ik zelf zou kopen — afhankelijk van hoe jij leest.";
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
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "E-readers", path: pagePath },
];

const articleSchema = {
  "@type": "Article",
  headline:
    "De beste e-reader van 2026 — gekozen door een schrijver die er zelf op leest",
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
      "Ja. E-ink weerkaatst licht zoals papier, in plaats van licht in je ogen te stralen zoals een telefoon of tablet. Daarom lees je er urenlang op zonder vermoeide ogen, ook in de zon.",
  },
  {
    question: "Hoe lang gaat de batterij mee?",
    answer:
      "Weken, geen uren. Afhankelijk van model en gebruik: vier tot twaalf weken op één lading.",
  },
  {
    question: "Kan ik bibliotheekboeken lezen op een e-reader?",
    answer:
      "Voor e-books van de Nederlandse online Bibliotheek heb je doorgaans een geschikte e-reader, Adobe Digital Editions en een Windows- of Mac-computer nodig. Kindle ondersteunt de gebruikte Adobe DRM-beveiliging niet. In sommige andere landen kun je via OverDrive wel rechtstreeks vanaf een Kobo lenen — dat geldt niet voor de Nederlandse online Bibliotheek.",
  },
  {
    question: "Welke e-reader is het beste voor Nederlandse boeken?",
    answer:
      "Beide ecosystemen hebben een ruim Nederlands aanbod. Kobo heeft van oudsher sterke banden met de Nederlandse markt; Kindle heeft de grootste totale winkel.",
  },
  {
    question: "Hoeveel batterijduur heeft de Kindle (basismodel)?",
    answer:
      "Tot 6 weken op één volle lading, afhankelijk van gebruik.",
  },
  {
    question: "Is de Kindle (basismodel) waterdicht?",
    answer:
      "Nee. Alleen de Kindle Paperwhite en duurdere modellen zijn waterdicht. Wil je een waterdichte e-reader, kies dan de Paperwhite of de Kobo Libra Colour.",
  },
  {
    question: "Is het kleurenscherm van de Kobo Libra Colour net zo goed als een tablet?",
    answer:
      "Nee, en dat is bewust. E Ink Kaleido 3 toont rustige, papierachtige kleuren zonder schittering of blauw licht — ideaal voor urenlang lezen, maar niet bedoeld voor video of felle graphics. Zie het als een gedrukt boek met kleurenillustraties, niet als een iPad.",
  },
  {
    question: "Kan ik met een Kobo e-reader boeken lenen bij de Nederlandse bibliotheek?",
    answer:
      "Ja. Op een Kobo kun je e-books van de Nederlandse online Bibliotheek lezen — in tegenstelling tot een Kindle, die de Adobe DRM-beveiliging niet ondersteunt. Je leent via de website en zet de boeken met Adobe Digital Editions vanaf een Windows- of Mac-computer op je e-reader. Rechtstreeks lenen vanaf het apparaat, zoals OverDrive in sommige andere landen, hoort daar niet bij.",
  },
  {
    question: "Hoe lang gaat de batterij van de Kobo Libra Colour mee?",
    answer:
      "Weken, bij normaal leesgebruik. E-ink verbruikt alleen stroom bij het omslaan van een pagina, dus één lading via USB-C is genoeg voor een hele vakantie.",
  },
  {
    question: "Is de Kobo Libra Colour waterdicht?",
    answer:
      "Ja, volgens de IPX8-norm: tot 60 minuten in maximaal 2 meter diep water. Lezen in bad, aan het zwembad of op het strand kan zonder zorgen.",
  },
  {
    question: "Wat is het verschil tussen de Kobo Clara BW en de Kobo Libra Colour?",
    answer:
      "De Clara BW is kleiner (6 inch), lichter en goedkoper, met een zwart-witscherm en bediening via touchscreen. De Libra Colour heeft een 7-inch kleurenscherm, fysieke bladerknoppen en meer opslag. Beide zijn waterdicht en geschikt voor e-books van de Nederlandse online Bibliotheek via Adobe Digital Editions.",
  },
  {
    question: "Is de Kobo Clara BW geschikt voor luisterboeken?",
    answer:
      "Ja. De Clara BW heeft ingebouwde Bluetooth, waarmee je Kobo-luisterboeken afspeelt via een koptelefoon of speaker. De 16 GB opslag biedt ruimte aan zo'n 75 luisterboeken.",
  },
  {
    question: "Is de Kobo Clara BW waterdicht?",
    answer:
      "Ja, volgens de IPX8-norm: tot 60 minuten in maximaal 2 meter diep water. Uitzonderlijk voor een e-reader in deze prijsklasse — lezen in bad of aan het zwembad kan zonder zorgen.",
  },
  {
    question: "Hoe lang gaat de batterij van de Kobo Clara BW mee?",
    answer:
      "Weken, bij normaal leesgebruik. Het e-ink-scherm verbruikt alleen stroom bij het omslaan van een pagina, dus één lading is genoeg voor een lange vakantie.",
  },
  {
    question: "Kun je op de Kindle Scribe schrijven zoals op papier?",
    answer:
      "Het komt dichtbij. De Premium Pen (inbegrepen, hoeft nooit opgeladen) schrijft met lichte weerstand op het ontspiegelde scherm, wat natuurlijker aanvoelt dan een gladde tablet. Handgeschreven notities zijn om te zetten in getypte tekst.",
  },
  {
    question: "Wat is het verschil tussen de Kindle Scribe en een gewone Kindle?",
    answer:
      "De Scribe heeft een veel groter scherm (10,2 inch), een pen om mee te schrijven en een ingebouwd notitieboek. Een gewone Kindle is compacter, goedkoper en puur op lezen gericht. Voor alleen romans lezen is een Paperwhite praktischer.",
  },
  {
    question: "Is de Kindle Scribe waterdicht?",
    answer:
      "Nee. In tegenstelling tot de Kindle Paperwhite en de Kobo-modellen in deze lijst heeft de Scribe geen waterdichtheidscertificering. Voor bad of zwembad is dit niet het juiste apparaat.",
  },
  {
    question: "Moet ik wachten op de Kindle Scribe Colorsoft?",
    answer:
      "Alleen als je per se in kleur wilt markeren. De Scribe Colorsoft is aanzienlijk duurder, terwijl deze Scribe hetzelfde schrijfgevoel en dezelfde notitiefuncties biedt tegen een scherpere prijs.",
  },
  {
    question: "Wat is het verschil tussen de Kindle Colorsoft en de Kindle Paperwhite?",
    answer:
      "Het scherm. De Colorsoft toont papierachtige kleuren voor omslagen, afbeeldingen en markeringen; de Paperwhite is zwart-wit met een nét iets witter scherm en een lagere prijs. Formaat, waterdichtheid en batterijduur zijn vrijwel gelijk.",
  },
  {
    question: "Wat is het verschil tussen de Kindle Colorsoft en de Kobo Libra Colour?",
    answer:
      "Beide hebben een 7-inch kleuren-e-inkscherm. De Kobo biedt fysieke bladerknoppen, open EPUB-ondersteuning en e-books van de online Bibliotheek via Adobe Digital Editions; de Kindle biedt de grootste boekwinkel en naadloze integratie voor wie al Kindle-boeken bezit. De keuze is vooral: welk ecosysteem past bij jou?",
  },
  {
    question: "Is de Kindle Colorsoft waterdicht?",
    answer:
      "Ja. Amazon adverteert de Colorsoft als waterdicht en zorgeloos — lezen naast het zwembad of in bad kan zonder problemen.",
  },
  {
    question: "Hoe lang gaat de batterij van de Kindle Colorsoft mee?",
    answer:
      "Tot acht weken op één lading via USB-C, afhankelijk van gebruik en verlichting. Het kleurenscherm verbruikt nauwelijks meer dan een zwart-wit e-inkscherm omdat het alleen stroom trekt bij het omslaan van pagina's.",
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
    )
  );


  return (
    <main>
      <JsonLd data={jsonLd} />
      <PageHeader
        eyebrow="Gids"
        title="De beste e-reader van 2026 — gekozen door een schrijver die er zelf op leest"
        description="Door Ard Breure, auteur van Schaduwen over Domburg"
      />
      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} />

        <section className="content-section">
          <p className="content-paragraph">
            Ik lees veel. Als schrijver moet dat, maar eerlijk gezegd las ik al
            zo voordat ik ooit een woord op papier zette. De afgelopen jaren is
            een groot deel van dat lezen verschoven naar e-readers — in de
            trein, &apos;s avonds op de bank, op vakantie met dertig boeken in
            mijn jaszak. In deze gids vergelijk ik de zes e-readers die er in
            2026 echt toe doen, en vertel ik welke ik zelf zou kopen —
            afhankelijk van hoe jij leest.
          </p>
          <p className="content-paragraph">
            <strong>Kort samengevat:</strong> voor de meeste lezers is de{" "}
            <strong>Kindle Paperwhite</strong> de beste koop. Wil je niet aan
            Amazon vastzitten, kies dan de <strong>Kobo Libra Colour</strong>.
            Op zoek naar de goedkoopste goede optie? De{" "}
            <strong>basis-Kindle</strong>. Alles hieronder legt uit waarom.
          </p>
          <p className="content-paragraph">
            Speciaal op zoek naar een model voor bad, strand of zwembad? Lees
            de aparte gids over de{" "}
            <Link href="/waterdichte-e-reader">waterdichte e-reader</Link> —
            met IPX8-uitleg en gerichte aanbevelingen.
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
            Zo ziet Schaduwen over Domburg eruit op de Kindle Paperwhite — de
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
            Mijn nummer 1 aanbeveling — lees hieronder waarom, of bekijk hem
            meteen:
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
                <th scope="col">Model</th>
                <th scope="col">Voor wie</th>
                <th scope="col">Scherm</th>
                <th scope="col">Waterdicht</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Kindle Paperwhite</td>
                <td>De meeste lezers — beste koop</td>
                <td>7&quot;, zwart-wit</td>
                <td>Ja</td>
              </tr>
              <tr>
                <td>Kindle (basismodel)</td>
                <td>Kleinste budget</td>
                <td>6&quot;, zwart-wit</td>
                <td>Nee</td>
              </tr>
              <tr>
                <td>Kobo Libra Colour</td>
                <td>Wie kleur en bladerknoppen wil, zonder Amazon</td>
                <td>7&quot;, kleur</td>
                <td>Ja</td>
              </tr>
              <tr>
                <td>Kobo Clara BW</td>
                <td>Compact en betaalbaar, zonder Amazon</td>
                <td>6&quot;, zwart-wit</td>
                <td>Ja</td>
              </tr>
              <tr>
                <td>Kindle Scribe</td>
                <td>Notities maken op groot scherm</td>
                <td>10,2&quot;, met pen</td>
                <td>Nee</td>
              </tr>
              <tr>
                <td>Kindle Colorsoft</td>
                <td>Kleur binnen het Kindle-ecosysteem</td>
                <td>7&quot;, kleur</td>
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
          <h2 id="kindle-paperwhite-heading" className="content-heading">
            Kindle Paperwhite — de beste e-reader voor de meeste mensen
          </h2>
          <p className="content-paragraph">
            Als iemand mij op een verjaardag vraagt &quot;welke e-reader moet
            ik kopen?&quot;, is dit negen van de tien keer het antwoord. Het
            scherm van 7 inch is groot genoeg om prettig te lezen en klein
            genoeg om in één hand te houden. De verlichting is warm instelbaar,
            zodat je &apos;s avonds leest zonder dat het voelt als naar een
            telefoon staren. Hij is waterdicht — badkuip, zwembad, Nederlandse
            regen — en de batterij gaat wekenlang mee, niet urenlang. Op
            Amazon scoort de Paperwhite 4,6 sterren op basis van ruim 15.700
            beoordelingen, voor een prijs rond de €179,99 (16 GB).
          </p>
          <p className="content-paragraph">
            Wat je moet weten: je zit in het Amazon-ecosysteem. Boeken koop je
            in de Kindle-winkel, en die is enorm, maar EPUB-bestanden van elders
            zet je er niet zomaar op. Voor wie gewoon romans en thrillers leest
            en niet moeilijk wil doen, is dat geen nadeel maar juist het gemak.
          </p>
          <p className="content-paragraph">
            <strong>Voor wie:</strong> iedereen die gewoon veel wil lezen en één
            keer een goede keuze wil maken.
          </p>
          <AffiliateButton amazonUrl={getEreaderUrl("kindle-paperwhite")} />
        </section>

        <section
          id="kindle-basis"
          className="content-section"
          aria-labelledby="kindle-basis-heading"
        >
          <h2 id="kindle-basis-heading" className="content-heading">
            Kindle (basismodel) — de slimste instap
          </h2>
          <p className="content-paragraph">
            De goedkoopste Kindle is de laatste jaren stilletjes heel goed
            geworden: hetzelfde scherpe schermtype als de Paperwhite, licht
            als een pocketboek, met USB-C en tot 6 weken batterijduur op één
            lading. Er is 16 GB opslag — genoeg voor duizenden boeken — en
            Amazon maakt hem tegenwoordig van 75% gerecycled plastic en 90%
            gerecycled magnesium. Op Amazon zelf staat hij rond de €120,
            beoordeeld met 4,6 sterren op basis van ruim 14.500 reviews. Wat je
            inlevert ten opzichte van de Paperwhite: geen waterdichtheid, geen
            warme verlichting, en een iets kleiner scherm van 6 inch.
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
            <figcaption className="content-meta">
              Sfeerbeeld — de voorkantverlichting van de Kindle werkt in elke
              lichtomstandigheid.
            </figcaption>
          </figure>
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
            Mijn eerlijke advies: als het prijsverschil met de Paperwhite je
            niet uitmaakt, neem de Paperwhite. Maar als je twijfelt of e-lezen
            iets voor je is en het eerst wilt proberen, is dit de instap zonder
            spijt.
          </p>
          <p className="content-paragraph">
            <strong>Voor wie:</strong> twijfelaars, studenten, en iedereen die
            het eerst wil proberen voor een klein bedrag.
          </p>
          <AffiliateButton amazonUrl={getEreaderUrl("kindle-basis")} />
        </section>

        <section
          id="kobo-libra-colour"
          className="content-section"
          aria-labelledby="kobo-libra-colour-heading"
        >
          <h2 id="kobo-libra-colour-heading" className="content-heading">
            Kobo Libra Colour review: de beste e-reader buiten Amazon
          </h2>
          <p className="content-paragraph">
            Er zijn lezers die hun boeken kopen waar het uitkomt: de ene keer
            bij bol, dan bij de Kobo-winkel, soms gratis geleend bij de
            openbare bibliotheek. Voor die lezers is er eigenlijk maar één
            serieus topmodel, en dat is de Kobo Libra Colour. Geen gesloten
            ecosysteem, geen gedwongen winkel — gewoon EPUB-bestanden,
            e-books van de Nederlandse online Bibliotheek via Adobe Digital
            Editions, en lezen zoals jij dat wilt.
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
          <p className="content-paragraph">
            Het 7-inch E Ink Kaleido 3-scherm is het eerste kleurenscherm dat
            écht aanvoelt als papier. Verwacht geen tabletkleuren: de tinten
            zijn rustig en gedempt, alsof je een aquarel bekijkt in plaats van
            een beeldscherm. Boekomslagen, strips, graphic novels en je eigen
            markeringen komen tot leven, terwijl het scherm niet spiegelt in fel
            zonlicht en &apos;s avonds een donkere leesmodus heeft die je ogen
            spaart.
          </p>
          <p className="content-paragraph">
            Wat de Libra Colour onderscheidt van vrijwel elke concurrent: de
            fysieke bladerknoppen en de asymmetrische vorm. Het klinkt als een
            detail, tot je een winteravond lang met één hand — de andere om een
            mok — hoofdstuk na hoofdstuk wegtikt zonder het scherm aan te raken.
            Het apparaat draait automatisch mee als je van hand wisselt.
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
            Praktisch zit het ruim in orde: 32 GB opslag (goed voor zo&apos;n
            24.000 e-books of 150 luisterboeken), een batterij die weken meegaat
            op één lading, en IPX8-waterdichtheid — tot 60 minuten in twee
            meter water, dus bad en strand zijn geen risico. Wie graag
            aantekeningen maakt, kan met de los verkrijgbare Kobo Stylus 2
            direct in kleur markeren en schrijven. Op Amazon wordt het model
            beoordeeld met 4,5 sterren op basis van bijna 2.400 beoordelingen,
            voor een prijs rond de €260.
          </p>
          <p className="content-paragraph">
            De keerzijde is er ook. Een kleurenscherm van e-ink heeft een iets
            grijzere achtergrond dan het beste zwart-witscherm, en de
            Kobo-winkel is kleiner dan die van Amazon. Voor wie veel bij de
            bibliotheek leent of zijn boeken uit meerdere bronnen haalt, weegt
            de vrijheid daar ruimschoots tegenop.
          </p>
          <p className="content-paragraph">
            <strong>Voor wie:</strong> bibliotheekleners, EPUB-verzamelaars,
            strip- en graphic novel-lezers, en iedereen die bewust niet aan één
            winkel vast wil zitten.
          </p>
          <AffiliateButton amazonUrl={getEreaderUrl("kobo-libra-colour")} />
        </section>

        <section
          id="kobo-clara-bw"
          className="content-section"
          aria-labelledby="kobo-clara-bw-heading"
        >
          <h2 id="kobo-clara-bw-heading" className="content-heading">
            Kobo Clara BW review: klein, licht en verrassend compleet
          </h2>
          <p className="content-paragraph">
            Niet iedereen wil het grootste scherm of een kleurendisplay. Er is
            een grote groep lezers die maar één ding vraagt: een licht apparaat
            dat in elke jaszak past, wekenlang meegaat en gewoon heel goed
            zwart-op-wit leest. Voor die lezers is de Kobo Clara BW het slimste
            instapmodel van dit moment — met dezelfde vrijheid als zijn grote
            broer: EPUB-bestanden, e-books van de online Bibliotheek via Adobe
            Digital Editions, geen gedwongen winkel.
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
            Het 6-inch scherm gebruikt E Ink Carta 1300, de nieuwste generatie
            zwart-wit e-ink: scherpe letters, snelle pagina-omslagen en geen
            spiegeling in fel zonlicht. De ComfortLight PRO-verlichting past
            helderheid én kleurtemperatuur aan — overdag koel wit, &apos;s avonds
            warm en met minder blauw licht, zodat je ogen rustig blijven tot de
            laatste bladzijde. Een instelbare donkere leesmodus zit er ook op.
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
            Verrassend voor een instapmodel: de Clara BW is volledig waterdicht
            volgens de IPX8-norm (tot 60 minuten in twee meter water) en heeft
            Bluetooth aan boord voor Kobo-luisterboeken — koptelefoon of speaker
            aansluiten en luisteren maar. De 16 GB opslag is goed voor
            zo&apos;n 12.000 e-books, en de batterij gaat weken mee op één
            lading. Op Amazon scoort het model 4,6 sterren op basis van ruim 2.600
            beoordelingen, voor een prijs rond de €170.
          </p>
          <p className="content-paragraph">
            De keerzijde: geen fysieke bladerknoppen (alles gaat via het
            touchscreen) en het scherm is met 6 inch echt compact — fijn voor
            onderweg, minder voor wie graag met grote letters leest. Wie dat
            comfort zoekt, kijkt naar de Libra Colour. Maar als draagbare,
            zorgeloze leesmachine voor dit geld is de Clara BW moeilijk te
            verslaan.
          </p>
          <p className="content-paragraph">
            <strong>Voor wie:</strong> forenzen en reizigers, bibliotheekleners
            met een kleiner budget, en iedereen die een compacte, waterdichte
            e-reader zoekt zonder aan één winkel vast te zitten.
          </p>
          <AffiliateButton amazonUrl={getEreaderUrl("kobo-clara-bw")} />
        </section>

        <section
          id="kindle-scribe"
          className="content-section"
          aria-labelledby="kindle-scribe-heading"
        >
          <h2 id="kindle-scribe-heading" className="content-heading">
            Kindle Scribe review: de e-reader waar je óók op schrijft
          </h2>
          <p className="content-paragraph">
            Sommige lezers lezen niet alleen — ze werken met hun boeken.
            Aantekeningen in de kantlijn, onderstrepingen, gedachten die meteen
            op papier moeten voor ze vervliegen. Voor die lezers bestaat er maar
            één Kindle: de Scribe, een e-reader en notitieboek in één, geleverd
            met de Premium Pen die je nooit hoeft op te laden.
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
            Het 10,2-inch scherm is met afstand het grootste in deze lijst: 300
            ppi, ontspiegeld en verlicht, zodat je binnen én buiten leest en
            schrijft. Schrijven voelt verrassend echt — de pen glijdt niet weg
            zoals op een tablet, maar heeft de lichte weerstand van papier.
            Schrijf je in een boek, dan schuift het &quot;Dynamisch canvas&quot;
            de tekst opzij voor je notitie; klap je de marge dicht, dan is de
            pagina weer gewoon een pagina.
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
            Daarnaast is het een volwaardig notitieboek: vergadernotities,
            takenlijsten, een dagboek — alles op één apparaat, zonder meldingen
            of sociale media die om aandacht vragen. Handgeschreven notities zet
            je om in getypte tekst en mail je direct naar jezelf of anderen. Op
            Amazon scoort de Scribe 4,3 sterren op basis van ruim 1.800
            beoordelingen, voor een prijs rond de €450 (32 GB, inclusief Premium
            Pen).
          </p>
          <p className="content-paragraph">
            Eerlijk is eerlijk: dit is geen apparaat voor de strandtas. Het is
            groot, niet waterdicht, en fors duurder dan een gewone e-reader. Er
            bestaat inmiddels ook een nieuwere Kindle Scribe Colorsoft met
            kleurenscherm — mooi voor wie in kleur wil markeren, maar ook weer
            een flink stuk prijziger. Voor de meeste schrijvende lezers is deze
            Scribe de verstandige keuze: bewezen, compleet en scherper
            geprijsd.
          </p>
          <p className="content-paragraph">
            <strong>Voor wie:</strong> studenten en onderzoekers, professionals
            die documenten annoteren, dagboekschrijvers, en iedereen die lezen
            en schrijven op één afleidingsvrij apparaat wil.
          </p>
          <AffiliateButton amazonUrl={getEreaderUrl("kindle-scribe")} />
        </section>

        <section
          id="kindle-colorsoft"
          className="content-section"
          aria-labelledby="kindle-colorsoft-heading"
        >
          <h2 id="kindle-colorsoft-heading" className="content-heading">
            Kindle Colorsoft review: de Paperwhite, maar dan in kleur
          </h2>
          <p className="content-paragraph">
            Wie al jaren tevreden in het Kindle-ecosysteem leest en maar één
            ding mist — kleur — hoeft niet meer te kiezen. De Kindle Colorsoft
            is in essentie een Paperwhite met een kleurenscherm: dezelfde
            compacte vorm, dezelfde zorgeloosheid, maar boekomslagen die
            eruitzien zoals de ontwerper ze bedoelde en markeringen in geel,
            oranje, blauw en roze in plaats van grijs.
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
            Het 7-inch Colorsoft-scherm toont papierachtige, gedempte kleuren
            met hoog contrast — geen schreeuwerig tabletscherm, maar e-ink dat
            oogvriendelijk blijft tijdens lange leessessies. Het licht is
            instelbaar van koel wit naar warm amber, zodat je zowel in fel
            zonlicht als &apos;s avonds in bed comfortabel leest. Slim detail: de
            functie Paginakleur keert zwarte tekst en witte achtergrond om voor
            rustig avondlezen, terwijl omslagen en afbeeldingen gewoon in kleur
            blijven.
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
            Verder is het alles wat een moderne Kindle hoort te zijn: volledig
            waterdicht, dus zwembad en bad zijn geen risico, een batterij die
            tot acht weken meegaat op één USB-C-lading, en directe toegang tot
            miljoenen titels in de Kindle Store. Op Amazon scoort de Colorsoft
            4,5 sterren op basis van ruim 2.400 beoordelingen, voor een prijs
            rond de €270 (16 GB).
          </p>
          <p className="content-paragraph">
            De keerzijde is dezelfde als bij elk kleuren-e-inkscherm: de
            achtergrond is een fractie grijzer dan bij de beste
            zwart-witschermen, en je betaalt zo&apos;n honderd euro meer dan
            voor een Paperwhite. Lees je vrijwel alleen romans zonder
            illustraties, dan is die meerprijs het niet waard. Lees je strips,
            kookboeken, tijdschriftartikelen of markeer je veel in kleur, dan
            is dit de fijnste Kindle van dit moment.
          </p>
          <p className="content-paragraph">
            <strong>Voor wie:</strong> trouwe Kindle-lezers die kleur willen,
            strip- en kookboeklezers, studenten die in kleur markeren, en
            iedereen die boekomslagen wil zien zoals ze bedoeld zijn.
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
            <strong>1. Waar komen je boeken vandaan?</strong> Koop je gewoon
            bij de grootste winkel: Kindle. Leen je bij de Nederlandse online
            Bibliotheek of verzamel je EPUB&apos;s: Kobo — Kindle ondersteunt
            die beveiligde bibliotheekboeken niet.
          </p>
          <p className="content-paragraph">
            <strong>2. Zwart-wit of kleur?</strong> Voor romans en thrillers:
            zwart-wit, altijd. Scherper, goedkoper, langere batterij. Kleur is
            er voor strips en tijdschriften.
          </p>
          <p className="content-paragraph">
            <strong>3. Hoeveel wil je uitgeven?</strong> Instapmodel om te
            proberen, Paperwhite of Libra Colour als je weet dat je blijft
            lezen.
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
            Benieuwd hoe lang een gemiddeld e-book is? Bekijk{" "}
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
              , die naar verwachting najaar 2026 verschijnt.
            </em>
          </p>
        </section>
      </div>
    </main>
  );
}
