import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AffiliateButton } from "@/components/AffiliateButton";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { RelatedGuides } from "@/components/RelatedGuides";
import { ereaders } from "@/data/affiliate";
import { author, siteConfig } from "@/lib/site";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { breadcrumbSchema, buildJsonLd, faqSchema, itemListSchema } from "@/lib/schema";

const pageTitle = "Beste waterdichte e-reader 2026: top 4 vergeleken";
const pageDescription =
  "Welke waterdichte e-reader past bij jou? Vergelijk 4 Kobo- & Kindle-modellen met voor- en nadelen. Bekijk prijzen.";
const heroImage = "/images/beste-waterdichte-e-reader-2026.webp";
const heroAlt = "Waterdichte e-reader naast een zwembad voor lezen op vakantie";
const datePublished = "2026-08-07";
const dateModified = "2026-08-11";

export const metadata: Metadata = buildMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/waterdichte-e-reader",
  type: "article",
  image: heroImage,
  imageAlt: heroAlt,
  imageWidth: 1200,
  imageHeight: 675,
  imageType: "image/webp",
  keywords: [
    "waterdichte ereader",
    "waterdichte e-reader",
    "beste waterdichte e-reader",
    "e-reader bad",
    "IPX8 e-reader",
  ],
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "E-readers", path: "/e-readers" },
  { name: "Waterdichte e-reader", path: "/waterdichte-e-reader" },
];

const faqItems = [
  {
    question: "Is iedere e-reader waterdicht?",
    answer:
      "Nee. Controleer altijd het exacte model en de officiële IP-classificatie. De basis-Kindle en verschillende oudere of goedkopere modellen zijn niet automatisch waterdicht.",
  },
  {
    question: "Welke waterdichte e-reader is het beste?",
    answer:
      "Voor de meeste lezers is de Kobo Libra Colour de beste allround keuze dankzij IPX8, fysieke bladerknoppen en een 7-inch kleurenscherm. Lees je vooral romans en wil je minder uitgeven, kies dan de Kobo Clara BW.",
  },
  {
    question: "Kan een e-reader in bad vallen?",
    answer:
      "Een model met IPX8 is ontworpen om een tijdelijke onderdompeling onder vastgelegde testomstandigheden te doorstaan. Haal de e-reader direct uit het water, droog hem af en sluit pas een oplader aan wanneer de USB-poort volledig droog is.",
  },
];

function getEreaderUrl(slug: string) {
  return ereaders.find((item) => item.slug === slug)?.amazonUrl ?? "";
}

const articleSchema = {
  "@type": "BlogPosting",
  headline: "Welke waterdichte e-reader is het beste voor bad, strand en vakantie?",
  description: pageDescription,
  image: absoluteUrl(heroImage),
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
    "@id": absoluteUrl("/waterdichte-e-reader"),
  },
};

export default function WaterdichteEReaderPage() {
  const jsonLd = buildJsonLd(
    articleSchema,
    breadcrumbSchema(breadcrumbs),
    itemListSchema(
      "Beste waterdichte e-readers 2026",
      [
        {
          name: "Kobo Libra Colour",
          url: absoluteUrl("/waterdichte-e-reader#kobo-libra-colour"),
          description:
            "Waterdichte kleuren-e-reader (IPX8) met fysieke bladerknoppen, 7-inch scherm en 32 GB opslag — de meest veelzijdige keuze aan het water.",
          image: "/assets/kobo-libra-colour-waterdicht-lezen-in-bad.webp",
        },
        {
          name: "Kobo Clara BW",
          url: absoluteUrl("/waterdichte-e-reader#kobo-clara-bw"),
          description:
            "Compacte, betaalbare waterdichte e-reader (IPX8) met scherp 6-inch zwart-witscherm en 16 GB opslag — de verstandigste keuze voor romans.",
          image: "/assets/kobo-clara-bw-lezen-in-zonlicht-strand.webp",
        },
        {
          name: "Kindle Paperwhite",
          url: absoluteUrl("/waterdichte-e-reader#kindle-paperwhite"),
          description:
            "Waterdichte 7-inch Kindle (IPX8) met 16 GB opslag — de beste keuze voor wie zijn boeken bij Amazon koopt.",
          image: "/assets/kindle-paperwhite-schaduwen-over-domburg-zeeuwse-kust.webp",
        },
        {
          name: "Kindle Colorsoft",
          url: absoluteUrl("/waterdichte-e-reader#kindle-colorsoft"),
          description:
            "Waterdichte 7-inch Kindle (IPX8) met kleuren-e-inkscherm en 16 GB opslag — kleur binnen het Amazon-ecosysteem.",
          image: "/assets/kindle-colorsoft-kleurenscherm-warm-licht.webp",
        },
      ]
    ),
    faqSchema(faqItems)
  );

  return (
    <main>
      <JsonLd data={jsonLd} />
      <PageHeader
        eyebrow="Koopgids"
        title="Welke waterdichte e-reader is het beste voor bad, strand en vakantie?"
        description="Door Ard Breure, auteur van Schaduwen over Domburg · Laatst bijgewerkt 11 augustus 2026"
      />

      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} />

        <figure className="content-section">
          <Image
            src={heroImage}
            alt={heroAlt}
            width={1200}
            height={675}
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, 48rem"
            style={{ width: "100%", height: "auto", borderRadius: "2px" }}
          />
        </figure>

        <section className="content-section">
          <p className="content-paragraph">
            Een papieren boek en een vol bad zijn geen gelukkige combinatie. Met
            een waterdichte e-reader hoef je daar minder zenuwachtig over te
            doen. Ook bij het zwembad of op het strand is het prettig als een
            spat, een natte hand of een korte val in het water niet meteen het
            einde van je bibliotheek betekent.
          </p>
          <p className="content-paragraph">
            Maar <em>waterdicht</em> betekent niet dat iedere e-reader zonder
            nadenken mee de zee in kan. De certificering geldt onder specifieke
            testomstandigheden. Zout, chloor, zeep, zand en een natte
            oplaadpoort blijven zaken om voorzichtig mee om te gaan.
          </p>
          <p className="content-paragraph">
            Voor deze vergelijking heb ik vier actuele modellen geselecteerd op
            basis van hun officiële specificaties en hun praktische
            gebruiksdoel. Ik heb ze niet persoonlijk aan een onderdompelingstest
            onderworpen. Voor de meeste Nederlandse lezers is de{" "}
            <strong>Kobo Libra Colour</strong> de meest veelzijdige keuze. Lees
            je vooral romans en wil je minder uitgeven, dan vind ik de{" "}
            <strong>Kobo Clara BW</strong> verstandiger.
          </p>
          <p className="content-paragraph">
            <strong>Kort advies:</strong> kies de Kobo Libra Colour als je
            fysieke bladerknoppen en een groter kleurenscherm wilt. Kies de Kobo
            Clara BW als je vooral zwart-witboeken leest en een lichte, compacte
            e-reader zoekt. Zit je al volledig in het Amazon-ecosysteem, neem
            dan de Kindle Paperwhite.
          </p>
        </section>

        <AffiliateDisclosure />

        <section
          className="content-section content-section--wide"
          aria-labelledby="overview-heading"
        >
          <h2 id="overview-heading" className="content-heading">
            De vier beste waterdichte e-readers in één oogopslag
          </h2>
          <div className="content-table-wrapper">
            <table className="content-table">
              <thead>
                <tr>
                  <th scope="col">Model</th>
                  <th scope="col">Scherm</th>
                  <th scope="col">Opslag</th>
                  <th scope="col">Waterbestendigheid</th>
                  <th scope="col">Bladerknoppen</th>
                  <th scope="col">Beste voor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Kobo Libra Colour</td>
                  <td>7 inch, kleur</td>
                  <td>32 GB</td>
                  <td>IPX8</td>
                  <td>Ja</td>
                  <td>Meest veelzijdige keuze</td>
                </tr>
                <tr>
                  <td>Kobo Clara BW</td>
                  <td>6 inch, zwart-wit</td>
                  <td>16 GB</td>
                  <td>IPX8</td>
                  <td>Nee</td>
                  <td>Romans, compact en betaalbaar</td>
                </tr>
                <tr>
                  <td>Kindle Paperwhite</td>
                  <td>7 inch, zwart-wit</td>
                  <td>16 GB</td>
                  <td>IPX8</td>
                  <td>Nee</td>
                  <td>Lezers die hun boeken bij Amazon kopen</td>
                </tr>
                <tr>
                  <td>Kindle Colorsoft</td>
                  <td>7 inch, kleur</td>
                  <td>16 GB</td>
                  <td>IPX8</td>
                  <td>Nee</td>
                  <td>Kindle-lezers die kleur belangrijk vinden</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="content-meta" style={{ marginBottom: "0.875rem" }}>
            Bekijk direct de actuele prijs:
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              marginBottom: "0.5rem",
            }}
          >
            <AffiliateButton
              amazonUrl={getEreaderUrl("kobo-libra-colour")}
              label="Kobo Libra Colour"
              compact
            />
            <AffiliateButton
              amazonUrl={getEreaderUrl("kobo-clara-bw")}
              label="Kobo Clara BW"
              compact
            />
            <AffiliateButton
              amazonUrl={getEreaderUrl("kindle-paperwhite")}
              label="Kindle Paperwhite"
              compact
            />
            <AffiliateButton
              amazonUrl={getEreaderUrl("kindle-colorsoft")}
              label="Kindle Colorsoft"
              compact
            />
          </div>
        </section>

        <section className="content-section" aria-labelledby="ipx8-heading">
          <h2 id="ipx8-heading" className="content-heading">
            Wat betekent IPX8 bij een e-reader?
          </h2>
          <p className="content-paragraph">
            Alle vier de modellen in deze vergelijking hebben een
            IPX8-classificatie. Kobo vermeldt voor zijn waterdichte modellen dat
            ze onder testomstandigheden tot zestig minuten in maximaal twee
            meter water kunnen worden ondergedompeld. Amazon geeft voor de
            Kindle Paperwhite eveneens een IPX8-classificatie op.
          </p>
          <p className="content-paragraph">
            Dat klinkt ruimer dan de meeste mensen ooit nodig zullen hebben. Een
            e-reader die uit je hand in het bad glijdt, moet je immers binnen
            enkele seconden kunnen oppakken. Toch is IPX8 geen uitnodiging om
            ermee te gaan zwemmen. Het is vooral bescherming tegen ongelukken.
          </p>
          <p className="content-paragraph">
            De letter <strong>X</strong> in IPX8 betekent bovendien dat er in
            deze aanduiding geen aparte stofclassificatie wordt gegeven.
            Waterdicht betekent dus niet automatisch zanddicht. Op het strand
            blijft een hoes verstandig, vooral om het scherm tegen krassen te
            beschermen.
          </p>
        </section>

        <section
          id="kobo-libra-colour"
          className="content-section"
          aria-labelledby="kobo-libra-colour-heading"
        >
          <h2 id="kobo-libra-colour-heading" className="content-heading">
            1. Kobo Libra Colour — de beste allround keuze aan het water
          </h2>
          <p className="content-paragraph">
            De Kobo Libra Colour is mijn eerste keuze voor wie regelmatig in
            bad, bij het zwembad of op vakantie leest. Het 7-inch kleurenscherm
            is ruim genoeg om comfortabel te lezen, terwijl het apparaat nog
            steeds goed in een tas past. De 32 GB opslag is voor gewone e-books
            zeer ruim.
          </p>
          <p className="content-paragraph">
            Het belangrijkste voordeel aan het water zijn de{" "}
            <strong>fysieke bladerknoppen</strong>. Een touchscreen kan door
            waterdruppels minder voorspelbaar reageren. Met een knop sla je ook
            met licht vochtige vingers betrouwbaar een pagina om. De
            asymmetrische vorm geeft bovendien een duidelijke handgreep.
          </p>
          <p className="content-paragraph">
            Het kleurenscherm is aantrekkelijk voor boekomslagen, strips,
            reisboeken en geïllustreerde non-fictie. Voor uitsluitend romans is
            kleur minder belangrijk. Een kleurfilter maakt de achtergrond
            doorgaans iets grijzer dan bij een goede zwart-wit-e-reader. Wie
            vooral tekst leest, betaalt bij de Libra Colour dus ook voor
            mogelijkheden die hij misschien nauwelijks gebruikt.
          </p>
          <h3 className="content-heading">Pluspunten</h3>
          <ul className="theme-list">
            <li>Waterdicht volgens IPX8</li>
            <li>Fysieke knoppen voor pagina&apos;s omslaan</li>
            <li>Ruim 7-inch kleurenscherm</li>
            <li>32 GB opslag</li>
            <li>Ondersteuning voor EPUB en het Kobo-ecosysteem</li>
          </ul>
          <h3 className="content-heading">Nadelen</h3>
          <ul className="theme-list">
            <li>Duurder dan de Kobo Clara BW</li>
            <li>Kleur is voor gewone romans niet noodzakelijk</li>
            <li>Groter en zwaarder dan een compact 6-inchmodel</li>
          </ul>
          <p className="content-paragraph">
            <strong>Voor wie?</strong> Voor de lezer die één veelzijdige
            e-reader wil voor thuis, vakantie, strips en gewone boeken — en
            fysieke bladerknoppen belangrijk vindt.
          </p>
          <AffiliateButton
            amazonUrl={getEreaderUrl("kobo-libra-colour")}
            label="Bekijk de actuele prijs van de Kobo Libra Colour"
          />
        </section>

        <section
          id="kobo-clara-bw"
          className="content-section"
          aria-labelledby="kobo-clara-bw-heading"
        >
          <h2 id="kobo-clara-bw-heading" className="content-heading">
            2. Kobo Clara BW — de verstandigste keuze voor romans
          </h2>
          <p className="content-paragraph">
            De Kobo Clara BW is minder opvallend, maar voor veel lezers eigenlijk
            de rationeelste keuze. Het 6-inch E Ink Carta 1300-scherm is
            zwart-wit, scherp en compact. Met 16 GB opslag biedt hij al ruimte
            aan veel meer romans dan de meeste mensen ooit tegelijk zullen
            meenemen.
          </p>
          <figure className="content-section">
            <Image
              src="/assets/kobo-clara-bw-lezen-in-zonlicht-strand.webp"
              alt="Kobo Clara BW e-reader met leesbaar e-inkscherm in fel zonlicht op het strand, zonnebril ernaast"
              width={1600}
              height={1355}
              sizes="(max-width: 768px) 100vw, 48rem"
              style={{ width: "100%", height: "auto" }}
              loading="lazy"
            />
          </figure>
          <p className="content-paragraph">
            Ook de Clara BW is waterdicht volgens IPX8. Hij heeft geen fysieke
            bladerknoppen, dus de bediening gaat volledig via het touchscreen.
            Dat is thuis geen probleem, maar naast het zwembad moet je het scherm
            soms even afdrogen voordat het weer netjes reageert.
          </p>
          <p className="content-paragraph">
            Het kleine formaat is juist op reis een voordeel. De Clara BW past
            makkelijker in een jaszak of kleine tas en weegt minder dan de
            grotere modellen. Wie voornamelijk thrillers, romans en andere
            tekstboeken leest, mist niets aan een kleurenscherm.
          </p>
          <h3 className="content-heading">Pluspunten</h3>
          <ul className="theme-list">
            <li>Waterdicht volgens IPX8</li>
            <li>Scherp zwart-witscherm</li>
            <li>Compact en licht</li>
            <li>16 GB is ruim voldoende voor gewone e-books</li>
            <li>Meestal voordeliger dan de Libra Colour</li>
          </ul>
          <h3 className="content-heading">Nadelen</h3>
          <ul className="theme-list">
            <li>Geen fysieke bladerknoppen</li>
            <li>Kleiner scherm</li>
            <li>Geen kleur voor strips of geïllustreerde boeken</li>
          </ul>
          <p className="content-paragraph">
            <strong>Voor wie?</strong> Voor romanlezers die een lichte,
            betaalbare en waterdichte e-reader zoeken zonder te betalen voor
            kleur of extra functies.
          </p>
          <AffiliateButton
            amazonUrl={getEreaderUrl("kobo-clara-bw")}
            label="Bekijk de actuele prijs van de Kobo Clara BW"
          />
        </section>

        <section
          id="kindle-paperwhite"
          className="content-section"
          aria-labelledby="kindle-paperwhite-heading"
        >
          <h2 id="kindle-paperwhite-heading" className="content-heading">
            3. Kindle Paperwhite — de beste keuze binnen Amazon
          </h2>
          <p className="content-paragraph">
            Koop je je e-books voornamelijk bij Amazon, dan is de Kindle
            Paperwhite de logische keuze. De huidige Paperwhite heeft een 7-inch
            ontspiegeld zwart-witscherm, 16 GB opslag en een IPX8-classificatie.
            Amazon noemt een batterijduur tot twaalf weken, gebaseerd op een half
            uur lezen per dag met draadloze verbindingen uit; in de praktijk
            hangt dit uiteraard af van verlichting en gebruik.
          </p>
          <figure className="content-section">
            <Image
              src="/assets/kindle-paperwhite-schaduwen-over-domburg-zeeuwse-kust.webp"
              alt="Kindle Paperwhite e-reader met de cover van Schaduwen over Domburg, op de achtergrond het Zeeuwse strand en de zee"
              width={1600}
              height={873}
              sizes="(max-width: 768px) 100vw, 48rem"
              style={{ width: "100%", height: "auto" }}
              loading="lazy"
            />
          </figure>
          <p className="content-paragraph">
            Het scherm is groter dan dat van de Kobo Clara BW, maar de Paperwhite
            heeft geen fysieke bladerknoppen. Voor lezen met natte vingers geldt
            dus hetzelfde advies: droog je hand en het scherm eerst even af.
          </p>
          <p className="content-paragraph">
            Het grootste voordeel is tegelijk de belangrijkste beperking: het
            Amazon-ecosysteem. Wie daar al boeken heeft gekocht, krijgt een
            eenvoudige en prettige ervaring. Voor e-books van de Nederlandse
            online Bibliotheek is een Kindle niet geschikt: die ondersteunt de
            Adobe DRM-beveiliging niet. Op een geschikte e-reader, zoals een
            Kobo, zet je die boeken doorgaans via Adobe Digital Editions vanaf
            een Windows- of Mac-computer.
          </p>
          <h3 className="content-heading">Pluspunten</h3>
          <ul className="theme-list">
            <li>Waterdicht volgens IPX8</li>
            <li>Helder 7-inch zwart-witscherm</li>
            <li>Lange opgegeven batterijduur</li>
            <li>Zeer gebruiksvriendelijk voor bestaande Kindle-klanten</li>
            <li>16 GB opslag</li>
          </ul>
          <h3 className="content-heading">Nadelen</h3>
          <ul className="theme-list">
            <li>Geen fysieke bladerknoppen</li>
            <li>Geen ondersteuning voor beveiligde e-books van de Nederlandse online Bibliotheek</li>
            <li>Sterke koppeling met de Kindle Store</li>
          </ul>
          <p className="content-paragraph">
            <strong>Voor wie?</strong> Voor lezers die hun digitale boeken al bij
            Amazon kopen en een betrouwbare zwart-wit-e-reader voor thuis en
            vakantie willen.
          </p>
          <AffiliateButton
            amazonUrl={getEreaderUrl("kindle-paperwhite")}
            label="Bekijk de actuele prijs van de Kindle Paperwhite"
          />
        </section>

        <section
          id="kindle-colorsoft"
          className="content-section"
          aria-labelledby="kindle-colorsoft-heading"
        >
          <h2 id="kindle-colorsoft-heading" className="content-heading">
            4. Kindle Colorsoft — kleur voor de Kindle-lezer
          </h2>
          <p className="content-paragraph">
            De Kindle Colorsoft voegt kleur toe aan de vertrouwde
            Kindle-omgeving. Het 7-inch scherm toont gewone tekst in zwart-wit en
            kleur bij omslagen, illustraties en markeringen. De
            standaarduitvoering heeft 16 GB opslag en is waterdicht volgens IPX8.
          </p>
          <figure className="content-section">
            <Image
              src="/assets/kindle-colorsoft-kleurenscherm-warm-licht.webp"
              alt="Kindle Colorsoft e-reader met kleurrijke boekomslag op het e-inkscherm, lezen bij warm avondlicht"
              width={1600}
              height={893}
              sizes="(max-width: 768px) 100vw, 48rem"
              style={{ width: "100%", height: "auto" }}
              loading="lazy"
            />
          </figure>
          <p className="content-paragraph">
            Voor een roman verandert kleur weinig aan de leeservaring. De
            Colorsoft wordt vooral interessant wanneer je veel geïllustreerde
            boeken leest, graag in kleur markeert of je bibliotheekcovers mooier
            wilt zien. Net als bij andere kleur-e-inkschermen is de kleur rustiger
            dan op een tablet en heeft het scherm een andere uitstraling dan de
            Paperwhite.
          </p>
          <p className="content-paragraph">
            De Colorsoft heeft geen fysieke bladerknoppen en blijft onderdeel van
            het Amazon-ecosysteem. Wie vooral Nederlandse romans leest en nog
            geen Kindle-bibliotheek heeft, krijgt met de Kobo Clara BW
            waarschijnlijk meer waarde voor zijn geld.
          </p>
          <h3 className="content-heading">Pluspunten</h3>
          <ul className="theme-list">
            <li>Waterdicht volgens IPX8</li>
            <li>7-inch kleurenscherm</li>
            <li>16 GB opslag</li>
            <li>Eenvoudige toegang tot bestaande Kindle-boeken</li>
            <li>Kleurmarkeringen en kleurrijke omslagen</li>
          </ul>
          <h3 className="content-heading">Nadelen</h3>
          <ul className="theme-list">
            <li>Duurder dan een zwart-witmodel</li>
            <li>Kleur voegt bij gewone romans weinig toe</li>
            <li>Geen fysieke bladerknoppen</li>
            <li>Geen ondersteuning voor beveiligde e-books van de Nederlandse online Bibliotheek</li>
          </ul>
          <p className="content-paragraph">
            <strong>Voor wie?</strong> Voor bestaande Kindle-gebruikers die bewust
            een kleurenscherm willen en bereid zijn daarvoor meer te betalen.
          </p>
          <AffiliateButton
            amazonUrl={getEreaderUrl("kindle-colorsoft")}
            label="Bekijk de actuele prijs van de Kindle Colorsoft"
          />
        </section>

        <section className="content-section" aria-labelledby="grenzen-heading">
          <h2 id="grenzen-heading" className="content-heading">
            Waterdicht betekent niet bestand tegen alles
          </h2>
          <p className="content-paragraph">
            De IPX8-tests worden onder gecontroleerde omstandigheden uitgevoerd.
            In het dagelijks leven is water zelden zo netjes als in een
            laboratorium.
          </p>
          <h3 className="content-heading">Zoet water</h3>
          <p className="content-paragraph">
            Een val in een bad met schoon water of een plons bij het zwembad is
            het soort ongeluk waartegen IPX8 bescherming biedt. Haal het apparaat
            er direct uit, droog het af en laat vooral de USB-poort volledig
            drogen voordat je een kabel aansluit.
          </p>
          <h3 className="content-heading">Zeewater</h3>
          <p className="content-paragraph">
            Zout kan op langere termijn corrosie veroorzaken. Neem een e-reader
            daarom niet bewust mee de zee in. Valt hij toch in zout water, volg
            dan de reinigingsinstructies van de fabrikant. Kobo adviseert contact
            met zout water te vermijden en het apparaat na zo&apos;n ongeluk met
            zoet water af te spoelen voordat je het zorgvuldig droogt.
          </p>
          <h3 className="content-heading">Chloor- en zeepwater</h3>
          <p className="content-paragraph">
            Ook chloor, badschuim en zeepresten zijn iets anders dan schoon
            testwater. Beperk de blootstelling en reinig het apparaat volgens de
            instructies van de fabrikant. Laad een e-reader nooit op zolang de
            aansluiting nog vochtig is.
          </p>
          <h3 className="content-heading">Zand</h3>
          <p className="content-paragraph">
            Waterdichtheid beschermt het scherm niet tegen krassen. Een
            zandkorrel tussen het scherm en een hard voorwerp kan blijvende
            schade veroorzaken. Gebruik op het strand daarom een goed passend
            hoesje en leg de e-reader niet los in dezelfde tas als sleutels,
            zonnebrillen of schelpen.
          </p>
        </section>

        <section className="content-section" aria-labelledby="situatie-heading">
          <h2 id="situatie-heading" className="content-heading">
            Welke waterdichte e-reader past bij jouw situatie?
          </h2>
          <h3 className="content-heading">Lezen in bad</h3>
          <p className="content-paragraph">
            Voor het bad zijn alle vier de modellen geschikt tegen een ongeluk.
            De Kobo Libra Colour heeft dankzij de fysieke bladerknoppen het
            praktischste voordeel. Je hoeft het scherm minder vaak aan te raken.
          </p>
          <h3 className="content-heading">Lezen op het strand</h3>
          <p className="content-paragraph">
            Wil je zo weinig mogelijk gewicht meenemen, kies dan de Kobo Clara
            BW. Stop hem wel in een hoes tegen zand en krassen. Wie een groter
            scherm en knoppen prettiger vindt, is beter af met de Libra Colour.
          </p>
          <h3 className="content-heading">Lezen naast het zwembad</h3>
          <p className="content-paragraph">
            De Kobo Libra Colour is opnieuw de meest praktische allrounder. Voor
            bestaande Amazon-klanten is de Kindle Paperwhite een uitstekende
            keuze, zolang je geen bladerknoppen nodig hebt.
          </p>
          <h3 className="content-heading">Vooral Nederlandse romans lezen</h3>
          <p className="content-paragraph">
            Kies de Kobo Clara BW. Een scherp zwart-witscherm, 16 GB opslag en
            een compact formaat zijn voor romans belangrijker dan kleur.
          </p>
          <h3 className="content-heading">Je hebt al veel Kindle-boeken</h3>
          <p className="content-paragraph">
            Kies de Kindle Paperwhite. Neem de Colorsoft alleen als kleur voor
            jouw boeken of markeringen werkelijk waarde toevoegt.
          </p>
        </section>

        <section className="content-section" aria-labelledby="advies-heading">
          <h2 id="advies-heading" className="content-heading">
            Mijn advies
          </h2>
          <p className="content-paragraph">
            De <strong>Kobo Libra Colour</strong> is de beste complete
            waterdichte e-reader van deze vier. Het ruime scherm, de fysieke
            bladerknoppen en de brede inzetbaarheid maken hem bijzonder prettig
            bij bad, strand en zwembad.
          </p>
          <p className="content-paragraph">
            Toch zou ik de meeste pure romanlezers niet automatisch naar het
            duurste model sturen. Lees je vooral tekst, dan is de{" "}
            <strong>Kobo Clara BW</strong> compacter, goedkoper en inhoudelijk
            ruim voldoende. De <strong>Kindle Paperwhite</strong> is vooral sterk
            voor wie al voor Amazon heeft gekozen. De{" "}
            <strong>Kindle Colorsoft</strong> is een luxere nichekeuze voor
            Kindle-lezers die kleur echt gebruiken.
          </p>
          <p className="content-paragraph">
            Wil je ook modellen vergelijken die niet uitsluitend op
            waterbestendigheid zijn geselecteerd? Lees dan de{" "}
            <Link href="/e-readers">
              complete vergelijking van de beste e-readers van 2026
            </Link>
            . Benieuwd hoe lang een gemiddeld e-book is? Zie{" "}
            <Link href="/lengte-van-ebook">lengte van een e-book per genre</Link>
            .
          </p>
        </section>

        <RelatedGuides
          guides={[
            {
              href: "/e-readers",
              label: "Beste e-readers 2026",
              description: "Kindle of Kobo — complete vergelijking",
            },
            {
              href: "/lengte-van-ebook",
              label: "Lengte van een e-book",
              description: "Woord- en pagina-aantallen per genre",
            },
            {
              href: "/blog",
              label: "Blog",
              description: "Meer artikelen over boeken en e-readers",
            },
          ]}
        />
      </div>

      <FaqSection
        items={faqItems}
        title="Veelgestelde vragen over waterdichte e-readers"
      />

      <div className="container content-page content-page--footer">
        <section className="content-section" aria-labelledby="bronnen-heading">
          <h2 id="bronnen-heading" className="content-heading">
            Redactionele bronnotities
          </h2>
          <ul className="theme-list">
            <li>
              Kobo, overzicht waterdichte e-readers en productspecificaties:{" "}
              <a
                href="https://www.kobo.com/nl/nl/ereaders/kobo-waterproof-ereaders"
                target="_blank"
                rel="noopener noreferrer"
              >
                kobo.com
              </a>
            </li>
            <li>
              Kobo, omgang met water en reinigingsadvies:{" "}
              <a
                href="https://help.kobo.com/hc/nl/articles/360017763773-Waterdichte-eReaders-van-Kobo"
                target="_blank"
                rel="noopener noreferrer"
              >
                help.kobo.com
              </a>
            </li>
            <li>
              Amazon, Kindle Paperwhite productspecificaties en IPX8:{" "}
              <a
                href="https://www.amazon.com/All-new-Amazon-Kindle-Paperwhite-glare-free/dp/B0CFPJYX7P"
                target="_blank"
                rel="noopener noreferrer"
              >
                amazon.com
              </a>
            </li>
            <li>
              Amazon, Kindle Colorsoft productspecificaties en IPX8:{" "}
              <a
                href="https://www.amazon.com/Amazon-Kindle-Colorsoft-newest-model/dp/B0FJBNPJ9P"
                target="_blank"
                rel="noopener noreferrer"
              >
                amazon.com
              </a>
            </li>
            <li>
              Online Bibliotheek, compatibiliteit van e-readers:{" "}
              <a
                href="https://www.onlinebibliotheek.nl/klantenservice/e-reader.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                onlinebibliotheek.nl
              </a>
            </li>
          </ul>
          <p className="content-meta">
            <em>Ik raad alleen aan wat ik zelf zou kopen.</em>
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
