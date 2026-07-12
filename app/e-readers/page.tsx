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
            Kobo Libra Colour — de beste e-reader buiten Amazon
          </h2>
          <p className="content-paragraph">
            Kobo is het merk voor lezers die vrijheid willen: EPUB-bestanden,
            lenen bij de openbare bibliotheek rechtstreeks vanaf het apparaat, en
            geen gedwongen winkel. De Libra Colour is het topmodel voor de
            meeste mensen: een kleurenscherm (rustige, papierachtige kleuren —
            geen tablet), fysieke bladerknoppen die je pas mist als je ze ooit
            gehad hebt, en een asymmetrische vorm die perfect in één hand ligt.
          </p>
          <p className="content-paragraph">
            De keerzijde: een kleurenscherm van e-ink heeft een iets grijzere
            achtergrond dan het beste zwart-witscherm, en de Kobo-winkel is
            kleiner dan die van Amazon. Voor wie veel bij de bibliotheek leent
            of zijn boeken uit meerdere bronnen haalt, weegt de vrijheid daar
            ruimschoots tegenop.
          </p>
          <p className="content-paragraph">
            <strong>Voor wie:</strong> bibliotheekleners, EPUB-verzamelaars, en
            iedereen die bewust niet aan één winkel vast wil zitten.
          </p>
          <AffiliateButton amazonUrl={getEreaderUrl("kobo-libra-colour")} />
        </section>

        <section
          id="kobo-clara-bw"
          className="content-section"
          aria-labelledby="kobo-clara-bw-heading"
        >
          <h2 id="kobo-clara-bw-heading" className="content-heading">
            Kobo Clara BW — compact, scherp, betaalbaar
          </h2>
          <p className="content-paragraph">
            De Clara BW is het kleine broertje: 6 inch, zwart-wit, maar met het
            nieuwste en scherpste schermtype dat er is — nieuwer zelfs dan wat
            in de basis-Kindle zit. Waterdicht, warme verlichting,
            bibliotheek-lenen aan boord. Eigenlijk alles wat de basis-Kindle
            mist, voor een vergelijkbare prijsklasse.
          </p>
          <p className="content-paragraph">
            <strong>Voor wie:</strong> wie compact en betaalbaar wil, maar niet
            wil inleveren op schermkwaliteit — en Amazon liever links laat
            liggen.
          </p>
          <AffiliateButton amazonUrl={getEreaderUrl("kobo-clara-bw")} />
        </section>

        <section
          id="kindle-scribe"
          className="content-section"
          aria-labelledby="kindle-scribe-heading"
        >
          <h2 id="kindle-scribe-heading" className="content-heading">
            Kindle Scribe — lezen én schrijven
          </h2>
          <p className="content-paragraph">
            De Scribe is een ander soort apparaat: 10,2 inch, met een pen
            waarmee je in de kantlijn schrijft alsof het papier is. Ik noem hem
            hier omdat ik weet wie hem koopt: studenten, onderzoekers, en
            mensen die documenten en PDF&apos;s doorwerken. Als notitieapparaat
            is hij uitstekend; als je alleen romans leest, is hij onnodig groot
            en duur.
          </p>
          <p className="content-paragraph">
            <strong>Voor wie:</strong> wie leest om te wérken — aantekeningen,
            PDF&apos;s, studie.
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
