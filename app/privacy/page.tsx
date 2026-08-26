import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { operator, siteConfig } from "@/lib/site";
import { buildMetadata, sitePageTitle } from "@/lib/seo";
import { breadcrumbSchema, buildJsonLd } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: sitePageTitle("Privacy"),
  description:
    "Privacybeleid van Breure Media. Lees hoe wij omgaan met uw gegevens bij het gebruik van onze website en nieuwsbrief.",
  path: "/privacy",
    languages: {
      nl: "/privacy",
      en: "/en/privacy",
      de: "/de/datenschutz",
      "x-default": "/en/privacy",
    },
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Privacy", path: "/privacy" },
];

export default function PrivacyPage() {
  const jsonLd = buildJsonLd(breadcrumbSchema(breadcrumbs));

  return (
    <main>
      <JsonLd data={jsonLd} />
      <PageHeader
        eyebrow="Juridisch"
        title="Privacybeleid"
        description="Hoe Breure Media omgaat met uw persoonsgegevens."
      />
      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} />

        <section className="content-section" aria-labelledby="privacy-controller-heading">
          <h2 id="privacy-controller-heading" className="content-heading">
            Verantwoordelijke
          </h2>
          <p className="content-paragraph">
            {siteConfig.name} wordt geëxploiteerd door {operator.legalName}.
          </p>
          <p className="content-paragraph">
            {operator.legalName}
            <br />
            {operator.streetAddress}
            <br />
            {operator.postalCode} {operator.city}
            <br />
            {operator.country}
            <br />
            KvK: {operator.kvk}
          </p>
          <p className="content-paragraph">
            Contact:{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
        </section>

        <section className="content-section" aria-labelledby="privacy-intro-heading">
          <h2 id="privacy-intro-heading" className="content-heading">
            Inleiding
          </h2>
          <p className="content-paragraph">
            {siteConfig.name} respecteert uw privacy. Dit beleid beschrijft welke
            gegevens wij verzamelen wanneer u onze website bezoekt en hoe wij
            daarmee omgaan.
          </p>
        </section>

        <section className="content-section" aria-labelledby="privacy-data-heading">
          <h2 id="privacy-data-heading" className="content-heading">
            Welke gegevens verzamelen wij?
          </h2>
          <p className="content-paragraph">
            Deze website gebruikt geen Google Analytics en geen vergelijkbare
            trackinganalytics.
          </p>
          <p className="content-paragraph">
            Als u zich inschrijft voor de nieuwsbrief of wachtlijst, verwerken
            wij met uw toestemming het e-mailadres dat u invult, de titel of het
            onderwerp waarop u zich inschrijft, de taal van de pagina, de URL
            van de pagina waarop u zich inschrijft, en de bron van de
            inschrijving (bijvoorbeeld de homepage of een boekpagina), en het
            tijdstip van die inschrijving. Die gegevens slaan wij op als contact
            in Resend, de e-maildienst die wij gebruiken om berichten te
            versturen.
          </p>
          <p className="content-paragraph">
            Als u het eerste hoofdstuk aanvraagt, sturen wij u dat hoofdstuk
            omdat u erom vraagt. Dat is geen inschrijving voor toekomstige
            berichten over boeken. Nieuws over publicaties sturen wij alleen
            als u zich daar apart voor inschrijft via de nieuwsbrief of
            wachtlijst. Contacten zonder die inschrijving ontvangen geen
            marketingberichten.
          </p>
          <p className="content-paragraph">
            Wij delen uw gegevens niet met derden voor hun eigen marketing. U
            kunt zich op elk moment uitschrijven via de link in een bericht of
            via{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
          </p>
        </section>

        <section className="content-section" aria-labelledby="privacy-contact-data-heading">
          <h2 id="privacy-contact-data-heading" className="content-heading">
            Contact per e-mail
          </h2>
          <p className="content-paragraph">
            Als u {siteConfig.name} e-mailt, gebruiken wij de informatie die u
            in dat bericht meestuurt om te antwoorden.
          </p>
        </section>

        <section className="content-section" aria-labelledby="privacy-affiliate-heading">
          <h2 id="privacy-affiliate-heading" className="content-heading">
            Affiliatelinks
          </h2>
          <p className="content-paragraph">
            Op deze website kunnen links staan naar externe winkels, zoals
            Amazon en in de toekomst mogelijk bol.com. Als u op zo&apos;n link
            klikt, verlaat u onze site. De winkel heeft een eigen privacy- en
            cookiebeleid. {siteConfig.name} heeft geen controle over cookies of
            gegevensverwerking bij die winkel nadat u de website heeft verlaten.
          </p>
        </section>

        <section className="content-section" aria-labelledby="privacy-cookies-heading">
          <h2 id="privacy-cookies-heading" className="content-heading">
            Cookies
          </h2>
          <p className="content-paragraph">
            Deze website plaatst geen trackingcookies en gebruikt geen
            advertentienetwerken. Technisch noodzakelijke cookies kunnen worden
            gebruikt voor het functioneren van de site.
          </p>
        </section>

        <section className="content-section" aria-labelledby="privacy-rights-heading">
          <h2 id="privacy-rights-heading" className="content-heading">
            Uw rechten
          </h2>
          <p className="content-paragraph">
            Op grond van de Algemene Verordening Gegevensbescherming (AVG) heeft
            u onder meer recht op inzage, correctie en verwijdering van uw
            persoonsgegevens. Neem contact op via{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> voor
            vragen over uw gegevens.
          </p>
        </section>

        <section className="content-section" aria-labelledby="privacy-contact-heading">
          <h2 id="privacy-contact-heading" className="content-heading">
            Contact
          </h2>
          <p className="content-paragraph">
            Vragen over dit privacybeleid? Stuur een e-mail naar{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
          </p>
          <p className="content-paragraph content-meta">
            Laatst bijgewerkt: augustus 2026
          </p>
        </section>
      </div>
    </main>
  );
}
