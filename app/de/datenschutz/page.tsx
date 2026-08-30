import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { operator, siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { localeAlternates } from "@/lib/i18n";
import { breadcrumbSchema, buildJsonLd } from "@/lib/schema";

const pagePath = "/de/datenschutz";

export const metadata: Metadata = buildMetadata({
  title: "Datenschutz | Breure Media",
  description:
    "Datenschutzhinweise von Breure Media. So gehen wir mit Ihren Daten um, wenn Sie unsere Website, das erste Kapitel oder den Newsletter nutzen.",
  path: pagePath,
  locale: "de_DE",
  languages: localeAlternates(pagePath),
});

const breadcrumbs = [
  { name: "Home", path: "/de" },
  { name: "Datenschutz", path: pagePath },
];

export default function GermanPrivacyPage() {
  const jsonLd = buildJsonLd(breadcrumbSchema(breadcrumbs));

  return (
    <main lang="de">
      <JsonLd data={jsonLd} />
      <PageHeader
        eyebrow="Rechtliches"
        title="Datenschutz"
        description="Wie Breure Media mit Ihren personenbezogenen Daten umgeht."
      />
      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} locale="de" />

        <p className="content-meta">
          <Link href="/privacy" className="text-link">
            Niederländisch
          </Link>
          {" · "}
          <Link href="/en/privacy" className="text-link">
            English
          </Link>
        </p>

        <section className="content-section" aria-labelledby="privacy-controller-heading">
          <h2 id="privacy-controller-heading" className="content-heading">
            Verantwortliche Stelle
          </h2>
          <p className="content-paragraph">
            {siteConfig.name} wird betrieben von {operator.legalName}.
          </p>
          <p className="content-paragraph">
            {operator.legalName}
            <br />
            {operator.streetAddress}
            <br />
            {operator.postalCode} {operator.city}
            <br />
            Niederlande
            <br />
            KvK: {operator.kvk}
          </p>
          <p className="content-paragraph">
            Kontakt:{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
        </section>

        <section className="content-section" aria-labelledby="privacy-intro-heading">
          <h2 id="privacy-intro-heading" className="content-heading">
            Einleitung
          </h2>
          <p className="content-paragraph">
            {siteConfig.name} achtet auf Ihre Privatsphäre. Diese Hinweise
            beschreiben, welche Daten wir erheben, wenn Sie unsere Website
            nutzen, und wie wir damit umgehen.
          </p>
        </section>

        <section className="content-section" aria-labelledby="privacy-data-heading">
          <h2 id="privacy-data-heading" className="content-heading">
            Welche Daten erheben wir?
          </h2>
          <p className="content-paragraph">
            Diese Website verwendet Google Analytics, um zu messen, wie viele
            Menschen die Seiten besuchen und welche Artikel gelesen werden. Ich
            nutze diese Daten ausschließlich, um zu sehen, was funktioniert und
            was nicht. Es werden keine Werbeprofile erstellt und es werden keine
            Daten weiterverkauft.
          </p>
          <p className="content-paragraph">
            Wenn Sie sich für den Newsletter oder die Warteliste anmelden,
            verarbeiten wir mit Ihrer Einwilligung die E-Mail-Adresse, die Sie
            eintragen, den Titel oder das Thema der Anmeldung, die Sprache der
            Seite, die URL der Seite, die Quelle der Anmeldung und den Zeitpunkt
            der Anmeldung. Diese Angaben speichern wir als Kontakt bei Resend,
            dem E-Mail-Dienst, über den wir Nachrichten versenden.
          </p>
          <p className="content-paragraph">
            Wenn Sie das erste Kapitel anfordern, senden wir Ihnen dieses
            Kapitel, weil Sie darum gebeten haben. Das ist keine Anmeldung für
            künftige Nachrichten zum Buch. Veröffentlichungsnews senden wir nur,
            wenn Sie sich gesondert über das Newsletter- oder
            Wartelistenformular anmelden. Kontakte ohne diese Anmeldung erhalten
            keine Marketingnachrichten.
          </p>
          <p className="content-paragraph">
            Wir geben Ihre Daten nicht an Dritte für deren eigenes Marketing
            weiter. Sie können sich jederzeit über den Link in einer Nachricht
            oder über{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>{" "}
            abmelden.
          </p>
        </section>

        <section className="content-section" aria-labelledby="privacy-contact-data-heading">
          <h2 id="privacy-contact-data-heading" className="content-heading">
            Kontakt per E-Mail
          </h2>
          <p className="content-paragraph">
            Wenn Sie {siteConfig.name} eine E-Mail schreiben, verwenden wir die
            Angaben in dieser Nachricht, um zu antworten.
          </p>
        </section>

        <section className="content-section" aria-labelledby="privacy-affiliate-heading">
          <h2 id="privacy-affiliate-heading" className="content-heading">
            Affiliate-Links
          </h2>
          <p className="content-paragraph">
            Auf dieser Website können Links zu externen Shops stehen, etwa zu
            Amazon. Wenn Sie auf einen solchen Link klicken, verlassen Sie unsere
            Website. Der Shop hat eine eigene Datenschutz- und Cookie-Regelung.{" "}
            {siteConfig.name} hat keine Kontrolle über Cookies oder die
            Datenverarbeitung dort, nachdem Sie die Website verlassen haben.
          </p>
        </section>

        <section className="content-section" aria-labelledby="privacy-cookies-heading">
          <h2 id="privacy-cookies-heading" className="content-heading">
            Cookies
          </h2>
          <p className="content-paragraph">
            Google Analytics verwendet Cookies, um Besuche zu messen. Diese
            Website verwendet keine Werbenetzwerke. Technisch notwendige Cookies
            können für den Betrieb der Website verwendet werden.
          </p>
        </section>

        <section className="content-section" aria-labelledby="privacy-rights-heading">
          <h2 id="privacy-rights-heading" className="content-heading">
            Ihre Rechte
          </h2>
          <p className="content-paragraph">
            Nach der Datenschutz-Grundverordnung (DSGVO) haben Sie unter anderem
            das Recht auf Auskunft, Berichtigung und Löschung Ihrer
            personenbezogenen Daten. Schreiben Sie an{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>, wenn
            Sie Fragen zu Ihren Daten haben.
          </p>
        </section>

        <section className="content-section" aria-labelledby="privacy-contact-heading">
          <h2 id="privacy-contact-heading" className="content-heading">
            Kontakt
          </h2>
          <p className="content-paragraph">
            Fragen zu diesen Datenschutzhinweisen? Schreiben Sie an{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
          </p>
          <p className="content-paragraph content-meta">
            Zuletzt aktualisiert: August 2026
          </p>
        </section>
      </div>
    </main>
  );
}
