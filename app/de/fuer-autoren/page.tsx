import type { Metadata } from "next";
import { AuthorsWaitlistCTA } from "@/components/AuthorsWaitlistCTA";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { localeAlternates } from "@/lib/i18n";
import { breadcrumbSchema, buildJsonLd } from "@/lib/schema";
import { buildMetadata, sitePageTitle } from "@/lib/seo";

const pagePath = "/de/fuer-autoren";

export const metadata: Metadata = buildMetadata({
  title: sitePageTitle("Für Autoren"),
  description:
    "Breure Media wird ein Label für Thriller über Macht, Häfen und Europa, von Autoren aus den Niederlanden, Belgien und Deutschland. Schreiben Sie Thriller? Hinterlassen Sie Ihre E-Mail-Adresse.",
  path: pagePath,
  locale: "de_DE",
  languages: localeAlternates(pagePath),
});

const breadcrumbs = [
  { name: "Home", path: "/de" },
  { name: "Für Autoren", path: pagePath },
];

export default function GermanAuthorsPage() {
  const jsonLd = buildJsonLd(breadcrumbSchema(breadcrumbs));

  return (
    <main lang="de">
      <JsonLd data={jsonLd} />
      <PageHeader title="Für Autoren" />
      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} locale="de" />

        <section className="content-section">
          <p className="content-paragraph">
            Breure Media ist ein unabhängiges Label für Thriller über Macht, Häfen und Europa.
            Zurzeit erscheint hier mein eigenes Werk. Im Jahr 2027 möchte ich
            das Label für andere Thrillerautoren öffnen.
          </p>
        </section>

        <section className="content-section" aria-labelledby="die-idee-heading">
          <h2 id="die-idee-heading" className="content-heading">
            Die Idee
          </h2>
          <p className="content-paragraph">
            Kein allgemeines Bücherregal, sondern ein schmales Programm.
            Alles, was hier steht, ist ein Thriller über Macht, Häfen und Europa. Wer
            hierherkommt, kommt genau dafür. Das ist der Unterschied zu einem
            großen Shop, in dem Ihr Buch zwischen allem und nichts liegt.
          </p>
          <p className="content-paragraph">
            Sie behalten Ihre Rechte. Ihr Buch steht in meinem Shop, in meinen
            Mailings und an den Stellen, an denen ich Leser finde.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="woran-ich-arbeite-heading"
        >
          <h2 id="woran-ich-arbeite-heading" className="content-heading">
            Woran ich arbeite
          </h2>
          <ul className="theme-list">
            <li>
              Ein eigener Shop mit Direktverkauf, also eine bessere Marge als
              bei den großen Plattformen.
            </li>
            <li>
              Eine Liste von Menschen, die Thriller lesen, nicht von beliebigen
              Besuchern.
            </li>
            <li>
              Sichtbarkeit bei Google für Zeeland, Rotterdam und die Welt
              hinter den Büchern.
            </li>
            <li>
              Eine deutsche Ausgabe, denn deutsche Leser sind an dieser Küste
              keine kleine Gruppe.
            </li>
          </ul>
        </section>

        <section
          className="content-section"
          aria-labelledby="aktueller-stand-heading"
        >
          <h2 id="aktueller-stand-heading" className="content-heading">
            Ehrlich zum aktuellen Stand
          </h2>
          <p className="content-paragraph">
            Das Label ist jung. Mein erstes Buch ist fertig, der Verkauf
            beginnt jetzt. Ich verspreche keine Reichweite, die es noch nicht
            gibt. Was es gibt: eine klare Richtung, ein schmales Programm und
            einen Plan, den ich Schritt für Schritt umsetze.
          </p>
          <p className="content-paragraph">
            Wenn es funktioniert, öffne ich die Tür. Wenn es nicht
            funktioniert, erfahren Sie das ebenfalls.
          </p>
        </section>

        <AuthorsWaitlistCTA source="authors-de" locale="de" />
      </div>
    </main>
  );
}
