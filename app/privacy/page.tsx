import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { siteConfig } from "@/lib/site";
import { buildMetadata, sitePageTitle } from "@/lib/seo";
import { breadcrumbSchema, buildJsonLd } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: sitePageTitle("Privacy"),
  description:
    "Privacybeleid van Breure Media. Lees hoe wij omgaan met uw gegevens bij het gebruik van onze website en nieuwsbrief.",
  path: "/privacy",
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
            Op dit moment verzamelt {siteConfig.name} geen persoonsgegevens via
            deze website. De nieuwsbrief is nog niet actief en er worden geen
            e-mailadressen opgeslagen.
          </p>
          <p className="content-paragraph">
            Wanneer de nieuwsbrief wordt geactiveerd, verzamelen wij alleen uw
            e-mailadres, met uw uitdrukkelijke toestemming. U kunt zich op elk
            moment uitschrijven.
          </p>
        </section>

        <section className="content-section" aria-labelledby="privacy-cookies-heading">
          <h2 id="privacy-cookies-heading" className="content-heading">
            Cookies
          </h2>
          <p className="content-paragraph">
            Deze website maakt geen gebruik van trackingcookies of
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
            u recht op inzage, correctie en verwijdering van uw
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
            Laatst bijgewerkt: juli 2026
          </p>
        </section>
      </div>
    </main>
  );
}
