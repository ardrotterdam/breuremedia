import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AffiliateButton } from "@/components/AffiliateButton";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { ereaders } from "@/data/affiliate";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import {
  breadcrumbSchema,
  buildJsonLd,
  itemListSchema,
  productBasicSchema,
} from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title:
    "Beste e-reader 2026: Kindle of Kobo? Eerlijke vergelijking | Breure Media",
  description:
    "In deze gids vergelijk ik de zes e-readers die er in 2026 echt toe doen, en vertel ik welke ik zelf zou kopen — afhankelijk van hoe jij leest.",
  path: "/e-readers",
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "E-readers", path: "/e-readers" },
];

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
      "Op een Kobo kan dat rechtstreeks vanaf het apparaat. Op een Kindle kan het ook, maar via een omweg met de Libby-app op je telefoon.",
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
      "Ja, dit is een van de grootste voordelen van Kobo boven Kindle. Via de online Bibliotheek leen je e-books die je rechtstreeks op de Libra Colour leest, zonder omwegen via een computer.",
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
      "De Clara BW is kleiner (6 inch), lichter en goedkoper, met een zwart-witscherm en bediening via touchscreen. De Libra Colour heeft een 7-inch kleurenscherm, fysieke bladerknoppen en meer opslag. Beide zijn waterdicht en lenen rechtstreeks bibliotheekboeken.",
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
];

function getEreaderUrl(slug: string) {
  return ereaders.find((item) => item.slug === slug)?.amazonUrl ?? "";
}

export default function EReadersPage() {
  const jsonLd = buildJsonLd(
    breadcrumbSchema(breadcrumbs),
    itemListSchema(
      "Beste e-readers 2026",
      ereaders.map((item) => ({
        name: item.naam,
        url: absoluteUrl(`/e-readers#${item.slug}`),
        description: item.korteOmschrijving,
      }))
    )
  );

  const koboLibraProductSchema = buildJsonLd(
    productBasicSchema(
      "Kobo Libra Colour",
      "Kobo",
      "Kleurene-reader met fysieke bladerknoppen, IPX8-waterdichtheid, 32 GB opslag en bibliotheek-lenen rechtstreeks vanaf het apparaat."
    )
  );

  const koboClaraProductSchema = buildJsonLd(
    productBasicSchema(
      "Kobo Clara BW",
      "Kobo",
      "Compacte 6-inch e-reader met E Ink Carta 1300, ComfortLight PRO, IPX8-waterdichtheid en Bluetooth voor luisterboeken."
    )
  );

  const kindleScribeProductSchema = buildJsonLd(
    productBasicSchema(
      "Amazon Kindle Scribe",
      "Amazon",
      "10,2-inch e-reader en digitaal notitieboek in één, met 300 ppi ontspiegeld scherm en inbegrepen Premium Pen om mee te schrijven."
    )
  );

  return (
    <main>
      <JsonLd data={jsonLd} />
      <JsonLd data={koboLibraProductSchema} />
      <JsonLd data={koboClaraProductSchema} />
      <JsonLd data={kindleScribeProductSchema} />
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
        </section>

        <figure className="content-section">
          <Image
            src="/assets/kindle-paperwhite-schaduwen-over-domburg.webp"
            alt="Kindle Paperwhite met de cover van de literaire thriller Schaduwen over Domburg van Ard Breure op het scherm"
            width={1200}
            height={1200}
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

        <p className="content-meta affiliate-disclosure">
          Als Amazon-partner verdien ik aan in aanmerking komende aankopen.
        </p>

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
            regen — en de batterij gaat wekenlang mee, niet urenlang.
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
            rechtstreeks bibliotheekboeken lenen vanaf het apparaat, en lezen
            zoals jij dat wilt.
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
            broer: EPUB-bestanden, bibliotheekboeken rechtstreeks lenen, geen
            gedwongen winkel.
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
            Kindle Colorsoft — kleur voor Kindle-lezers
          </h2>
          <p className="content-paragraph">
            Lees je strips, tijdschriften of boeken met illustraties, en zit je
            al in het Kindle-ecosysteem? Dan is de Colorsoft de logische stap:
            hetzelfde vertrouwde Kindle-gevoel, maar met kleur. Voor pure
            romanlezers voegt kleur weinig toe — dan is de Paperwhite scherper
            én voordeliger.
          </p>
          <p className="content-paragraph">
            <strong>Voor wie:</strong> stripboek- en tijdschriftlezers die
            Kindle trouw willen blijven.
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
            bij de grootste winkel: Kindle. Leen je bij de bibliotheek of
            verzamel je EPUB&apos;s: Kobo.
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
            <em>
              Als Amazon-partner verdien ik aan in aanmerking komende aankopen.
              Dat verandert niets aan de prijs die jij betaalt, en niets aan
              mijn oordeel — ik raad alleen aan wat ik zelf zou kopen.
            </em>
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
