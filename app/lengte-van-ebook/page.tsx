import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { RelatedGuides } from "@/components/RelatedGuides";
import { author, siteConfig } from "@/lib/site";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  buildJsonLd,
  faqSchema,
  itemListSchema,
} from "@/lib/schema";

const pageTitle = "Lengte van een e-book: woorden & pagina's per genre";
const pageDescription =
  "Hoe lang is een e-book? Bekijk gemiddelde woord- en pagina-aantallen per genre. Direct overzicht: kies de juiste lengte.";
const pagePath = "/lengte-van-ebook";
const datePublished = "2026-08-11";
const dateModified = "2026-08-18";

export const metadata: Metadata = buildMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  type: "article",
  keywords: [
    "lengte van ebook",
    "lengte van een e-book",
    "hoe lang is een e-book",
    "woordenaantal e-book",
    "aantal pagina's e-book",
    "e-book lengte per genre",
  ],
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
  { name: "Lengte van een e-book", path: pagePath },
];

const genreLengths = [
  {
    genre: "Kort verhaal",
    woorden: "1.000 – 7.500",
    paginas: "4 – 30",
  },
  {
    genre: "Novelle",
    woorden: "7.500 – 40.000",
    paginas: "30 – 160",
  },
  {
    genre: "Young adult",
    woorden: "50.000 – 80.000",
    paginas: "200 – 320",
  },
  {
    genre: "Romance",
    woorden: "70.000 – 90.000",
    paginas: "280 – 360",
  },
  {
    genre: "Thriller / misdaad",
    woorden: "70.000 – 100.000",
    paginas: "280 – 400",
  },
  {
    genre: "Literaire roman",
    woorden: "80.000 – 110.000",
    paginas: "320 – 440",
  },
  {
    genre: "Fantasy / sciencefiction",
    woorden: "90.000 – 120.000+",
    paginas: "360 – 480+",
  },
  {
    genre: "Non-fictie",
    woorden: "50.000 – 80.000",
    paginas: "200 – 320",
  },
];

const faqItems = [
  {
    question: "Hoeveel woorden heeft een gemiddeld e-book?",
    answer:
      "Een gemiddeld e-book telt ongeveer 60.000 tot 90.000 woorden. Dat komt neer op zo'n 240 tot 360 pagina's, afhankelijk van lettertype, regelafstand en schermgrootte op je e-reader.",
  },
  {
    question: "Hoeveel pagina's is een e-book van 80.000 woorden?",
    answer:
      "Reken op ongeveer 280 tot 320 pagina's. Op een e-reader wisselt het paginanummer mee met je lettergrootte; het woordenaantal blijft de betrouwbaarste maat voor lengte.",
  },
  {
    question: "Verschilt de lengte van een e-book per genre?",
    answer:
      "Ja. Young adult en romance liggen vaak rond de 70.000–90.000 woorden, thrillers iets breder, en fantasy of sciencefiction regelmatig boven de 100.000 woorden. Kortverhalen en novelles zijn bewust korter.",
  },
];

const articleSchema = {
  "@type": "BlogPosting",
  headline: "Hoe lang is een e-book? Lengte in woorden en pagina's per genre",
  description: pageDescription,
  datePublished,
  dateModified,
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

export default function LengteVanEbookPage() {
  const jsonLd = buildJsonLd(
    articleSchema,
    breadcrumbSchema(breadcrumbs),
    itemListSchema(
      "Gemiddelde e-booklengte per genre",
      genreLengths.map((row) => ({
        name: row.genre,
        url: absoluteUrl(`${pagePath}#overzicht-lengte`),
        description: `${row.woorden} woorden · ca. ${row.paginas} pagina's`,
      }))
    ),
    faqSchema(faqItems)
  );

  return (
    <main>
      <JsonLd data={jsonLd} />
      <PageHeader
        eyebrow="Schrijfgids"
        title="Hoe lang is een e-book? Lengte in woorden en pagina's per genre"
        description="Door Ard Breure · Laatst bijgewerkt 18 augustus 2026"
      />

      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} />

        <section className="content-section">
          <p className="content-paragraph">
            De gemiddelde lengte van een e-book ligt tussen de{" "}
            <strong>60.000 en 90.000 woorden</strong>: zo&apos;n 240 tot 360
            pagina&apos;s, afhankelijk van genre en opmaak. Wie &quot;lengte van
            ebook&quot; googelt, wil meestal dat ene heldere antwoord, plus een
            overzicht per genre. Dat krijg je hier.
          </p>
          <p className="content-paragraph">
            Paginanummers op een e-reader zijn misleidend: ze veranderen mee met
            lettergrootte, marges en schermformaat. Het{" "}
            <strong>woordenaantal</strong> is daarom de enige betrouwbare maat.
            Hieronder zie je wat uitgevers en genres doorgaans als gangbaar
            beschouwen: handig voor lezers én voor schrijvers die hun
            manuscript willen toetsen.
          </p>
        </section>

        <section
          id="overzicht-lengte"
          className="content-section content-section--wide"
          aria-labelledby="overzicht-lengte-heading"
        >
          <h2 id="overzicht-lengte-heading" className="content-heading">
            Overzicht: gemiddelde woord- en pagina-aantallen per genre
          </h2>
          <p className="content-paragraph">
            De pagina&apos;s hieronder gaan uit van ongeveer 250–280 woorden per
            pagina (standaard paperback). Op een e-reader kan dat lager of hoger
            uitvallen.
          </p>
          <div className="content-table-wrapper">
            <table className="content-table">
              <thead>
                <tr>
                  <th scope="col">Genre</th>
                  <th scope="col">Woorden (gemiddeld)</th>
                  <th scope="col">Pagina&apos;s (ca.)</th>
                </tr>
              </thead>
              <tbody>
                {genreLengths.map((row) => (
                  <tr key={row.genre}>
                    <td>{row.genre}</td>
                    <td>{row.woorden}</td>
                    <td>{row.paginas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="content-section" aria-labelledby="waarom-heading">
          <h2 id="waarom-heading" className="content-heading">
            Waarom woordenaantal belangrijker is dan pagina&apos;s
          </h2>
          <p className="content-paragraph">
            Op papier is een pagina een vaste eenheid. Op een e-reader niet. Zet
            je lettergrootte een streepje groter, dan springt &quot;pagina
            312&quot; ineens naar &quot;pagina 400&quot;, terwijl de tekst
            precies even lang is. Daarom gebruiken uitgevers, agenten en
            schrijvers woorden, niet pagina&apos;s, om manuscriptlengte te
            bespreken.
          </p>
          <p className="content-paragraph">
            Voor lezers is het woordenaantal vooral handig om te schatten hoe
            lang je met een boek zoet bent. Een thriller van 90.000 woorden is
            een weekendproject; een fantasy-epos van 130.000 woorden vraagt meer
            avonden. Op een{" "}
            <Link href="/e-readers">goede e-reader</Link> zie je vaak beide
            indicators: voortgang in procenten én een geschatte leestijd.
          </p>
        </section>

        <section className="content-section" aria-labelledby="genres-heading">
          <h2 id="genres-heading" className="content-heading">
            Wat je per genre mag verwachten
          </h2>
          <h3 className="content-heading">Romans, thrillers en romance</h3>
          <p className="content-paragraph">
            Commerciële fictie landt meestal tussen de 70.000 en 100.000 woorden.
            Thrillers en misdaadromans mogen iets zwaarder uitvallen als de plot
            het draagt; romance blijft vaak strakker, omdat het tempo van de
            relatieboog dat vraagt.
          </p>
          <h3 className="content-heading">Fantasy en sciencefiction</h3>
          <p className="content-paragraph">
            Wereldbouw kost woorden. Debuten liggen vaak rond de 90.000–110.000;
            gevestigde series lopen regelmatig over de 120.000. Langer is niet
            automatisch beter, maar in deze genres is ruimte voor setting
            gebruikelijker dan in een strakke literaire thriller.
          </p>
          <h3 className="content-heading">Young adult en non-fictie</h3>
          <p className="content-paragraph">
            Young adult mikt vaak op 50.000–80.000 woorden: genoeg diepte,
            behapbaar tempo. Non-fictie varieert sterker per onderwerp; praktische
            gidsen zijn korter, onderzoeksboeken langer. Het overzicht hierboven
            geeft de bandbreedte waarin de meeste titels vallen.
          </p>
        </section>

        <section className="content-section" aria-labelledby="schrijver-heading">
          <h2 id="schrijver-heading" className="content-heading">
            Tip voor schrijvers: mik op genre, niet op een rond getal
          </h2>
          <p className="content-paragraph">
            Een manuscript van 55.000 woorden is niet &quot;te kort&quot; als het
            een novelle of young-adultverhaal is. En 110.000 is niet
            &quot;te lang&quot; als je fantasy schrijft. Kijk eerst naar het
            genre, daarna naar het tempo van je verhaal. Liever een strak boek
            van 75.000 woorden dan een opgeblazen manuscript van 95.000.
          </p>
          <p className="content-paragraph">
            Zelf schrijf ik literaire thrillers; daar voelt 80.000–100.000
            woorden als een comfortabele bandbreedte. Meer over dat genre lees
            je in mijn leeslijsten met{" "}
            <Link href="/boeken-over-rotterdam">boeken over Rotterdam</Link> en{" "}
            <Link href="/boeken-over-zeeland">boeken over Zeeland</Link>.
          </p>
        </section>

        <RelatedGuides
          guides={[
            {
              href: "/e-readers",
              label: "Beste e-readers 2026",
              description: "Kindle of Kobo? Vergelijking voor Nederlandse lezers",
            },
            {
              href: "/waterdichte-e-reader",
              label: "Waterdichte e-reader",
              description: "Top 4 voor bad, strand en vakantie",
            },
            {
              href: "/blog",
              label: "Alle artikelen",
              description: "Blog over boeken, e-readers en schrijven",
            },
          ]}
        />
      </div>

      <FaqSection
        items={faqItems}
        title="Veelgestelde vragen over de lengte van een e-book"
      />

      <div className="container content-page content-page--footer">
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
