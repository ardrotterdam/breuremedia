import type { Metadata } from "next";
import { AuthorsWaitlistCTA } from "@/components/AuthorsWaitlistCTA";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { breadcrumbSchema, buildJsonLd } from "@/lib/schema";
import { buildMetadata, sitePageTitle } from "@/lib/seo";

const pagePath = "/voor-auteurs";
const englishPath = "/en/for-authors";
const germanPath = "/de/fuer-autoren";

export const metadata: Metadata = buildMetadata({
  title: sitePageTitle("Voor auteurs"),
  description:
    "Breure Media wordt een label voor literaire thrillers uit Nederland, België en Duitsland. Schrijf je thrillers? Laat je e-mailadres achter.",
  path: pagePath,
  languages: {
    nl: pagePath,
    en: englishPath,
    de: germanPath,
    "x-default": englishPath,
  },
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Voor auteurs", path: pagePath },
];

export default function AuthorsPage() {
  const jsonLd = buildJsonLd(breadcrumbSchema(breadcrumbs));

  return (
    <main>
      <JsonLd data={jsonLd} />
      <PageHeader title="Voor auteurs" />
      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} />

        <section className="content-section">
          <p className="content-paragraph">
            Breure Media is een onafhankelijk label voor literaire thrillers.
            Op dit moment verschijnt hier mijn eigen werk. In 2027 wil ik het
            label openstellen voor andere thrillerauteurs.
          </p>
        </section>

        <section className="content-section" aria-labelledby="het-idee-heading">
          <h2 id="het-idee-heading" className="content-heading">
            Het idee
          </h2>
          <p className="content-paragraph">
            Geen algemene boekenplank, maar een smal fonds. Alles wat hier
            staat is een literaire thriller. Een lezer die binnenkomt, komt
            voor precies dat. Dat is het verschil met een grote winkel waar je
            boek tussen alles en niets ligt.
          </p>
          <p className="content-paragraph">
            Je houdt je rechten. Je boek staat in mijn winkel, in mijn
            mailings, en op de plekken waar ik lezers vind.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="waar-ik-aan-bouw-heading"
        >
          <h2 id="waar-ik-aan-bouw-heading" className="content-heading">
            Waar ik aan bouw
          </h2>
          <ul className="theme-list">
            <li>
              Een eigen webshop met directe verkoop, dus een betere marge dan
              bij de grote platforms.
            </li>
            <li>
              Een lezerslijst van mensen die thrillers lezen, niet van
              willekeurige bezoekers.
            </li>
            <li>
              Vindbaarheid in Google op Zeeland, Rotterdam en de wereld achter
              de boeken.
            </li>
            <li>
              Een Duitse editie, want de Duitse lezer is aan deze kust geen
              kleine groep.
            </li>
          </ul>
        </section>

        <section
          className="content-section"
          aria-labelledby="stand-van-zaken-heading"
        >
          <h2 id="stand-van-zaken-heading" className="content-heading">
            Eerlijk over de stand van zaken
          </h2>
          <p className="content-paragraph">
            Het label bestaat pas kort. Mijn eerste boek is af, de verkoop
            begint nu. Ik beloof geen bereik dat er nog niet is. Wat er wel
            is: een duidelijke richting, een smal fonds en een plan dat ik
            stap voor stap uitvoer.
          </p>
          <p className="content-paragraph">
            Als dat werkt, open ik de deur. Als het niet werkt, hoor je dat
            ook.
          </p>
        </section>

        <AuthorsWaitlistCTA source="authors-nl" />
      </div>
    </main>
  );
}
