import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AffiliateButton } from "@/components/AffiliateButton";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PageHeader } from "@/components/PageHeader";
import { RelatedGuides } from "@/components/RelatedGuides";
import { rotterdamBoeken } from "@/data/affiliate";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import {
  breadcrumbSchema,
  buildJsonLd,
  collectionPageSchema,
  faqSchema,
  itemListSchema,
} from "@/lib/schema";

const pageTitle = "Boeken over Rotterdam: 5 romans & thrillers (gids)";
const pageDescription =
  "5 boeken die Rotterdam écht vangen — van Karakter tot haven-thrillers. Lees de gids en kies je volgende boek.";
const pageDescriptionLong =
  "Vijf boeken die Rotterdam echt vangen — van Karakter en Jules Deelder tot de haven-thriller Schaduwen over Domburg. Een persoonlijke leeslijst van auteur Ard Breure.";

const rotterdamBookDetails: Record<
  string,
  { schemaName: string; author?: string; editor?: string; image?: string }
> = {
  "schaduwen-over-domburg": {
    schemaName: "Schaduwen over Domburg",
    author: "Ard Breure",
    image: "/assets/schaduwen-over-domburg-boekomslag-ard-breure.webp",
  },
  "karakter-bordewijk": {
    schemaName: "Karakter",
    author: "F. Bordewijk",
    image: "/assets/karakter-f-bordewijk-boekomslag.webp",
  },
  "jules-deelder": {
    schemaName: "De dikke van Deelder",
    author: "Jules Deelder",
    image: "/assets/de-dikke-van-deelder-jules-deelder-boekomslag.webp",
  },
  "hugo-borst": {
    schemaName: "De Coolsingel bleef leeg",
    author: "Hugo Borst",
    image: "/assets/de-coolsingel-bleef-leeg-hugo-borst-boekomslag.webp",
  },
  "rotterdam-wederopbouw-groenendijk": {
    schemaName: "Rotterdam Wederopbouw: De 100 gebouwen",
    editor: "Paul Groenendijk",
    image:
      "/assets/rotterdam-wederopbouw-100-gebouwen-paul-groenendijk-boekomslag.webp",
  },
};

export const metadata: Metadata = buildMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/boeken-over-rotterdam",
  image: "/assets/rotterdam-maas-lezen-sfeerbeeld.webp",
  imageAlt:
    "Illustratie van lezen aan de Maas in Rotterdam met de Erasmusbrug op de achtergrond",
  imageWidth: 1600,
  imageHeight: 600,
  keywords: [
    "boeken over rotterdam",
    "rotterdamse roman",
    "thriller rotterdam",
    "karakter bordewijk",
    "jules deelder",
  ],
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Boeken over Rotterdam", path: "/boeken-over-rotterdam" },
];

const faqItems = [
  {
    question: "Wat is de bekendste roman die zich in Rotterdam afspeelt?",
    answer:
      "Karakter van F. Bordewijk (1938) geldt als dé Rotterdamse roman. Het boek speelt in het vooroorlogse Rotterdam en de verfilming uit 1997 won de Oscar voor beste buitenlandse film.",
  },
  {
    question: "Zijn er thrillers die zich in de Rotterdamse haven afspelen?",
    answer:
      "Ja — de haven is een geliefd decor voor Nederlandse misdaadromans. De literaire thriller Schaduwen over Domburg van Ard Breure (verwacht najaar 2026) speelt grotendeels in en rond de Rotterdamse haven.",
  },
  {
    question: "Welk boek moet ik lezen om Rotterdam te begrijpen?",
    answer:
      "Begin met Karakter voor de ziel van de stad, lees Deelder voor haar stem, en een boek over het bombardement en de wederopbouw voor haar geschiedenis.",
  },
];

const bookIndex = [
  {
    slug: "schaduwen-over-domburg",
    title: "Schaduwen over Domburg",
    author: "Ard Breure",
    summary:
      "Literaire thriller die van het Zeeuwse strand dwars door de Rotterdamse haven voert.",
  },
  {
    slug: "karakter-bordewijk",
    title: "Karakter",
    author: "F. Bordewijk",
    summary:
      "Dé klassieke Rotterdamse roman over wilskracht in het vooroorlogse Rotterdam.",
  },
  {
    slug: "jules-deelder",
    title: "De dikke van Deelder",
    author: "Jules Deelder",
    summary:
      "Gedichten en verhalen met de droge, snelle toon van de nachtburgemeester.",
  },
  {
    slug: "hugo-borst",
    title: "De Coolsingel bleef leeg",
    author: "Hugo Borst",
    summary:
      "Voetbal, Feyenoord en Rotterdamse identiteit — tribune en stad in één.",
  },
  {
    slug: "rotterdam-wederopbouw-groenendijk",
    title: "Rotterdam Wederopbouw",
    author: "Paul Groenendijk (red.)",
    summary:
      "Honderd gebouwen die laten zien waarom Rotterdam eruitziet zoals het doet.",
  },
];

function getBoekUrl(slug: string) {
  return rotterdamBoeken.find((item) => item.slug === slug)?.amazonUrl ?? "";
}

function getBoekSchemaUrl(slug: string) {
  const boek = rotterdamBoeken.find((item) => item.slug === slug);
  if (!boek) {
    return "";
  }
  if (boek.internalUrl) {
    return absoluteUrl(boek.internalUrl);
  }
  if (boek.amazonUrl) {
    return boek.amazonUrl;
  }
  return absoluteUrl(`/boeken-over-rotterdam#${slug}`);
}

export default function BoekenOverRotterdamPage() {
  const jsonLd = buildJsonLd(
    collectionPageSchema(
      "Boeken over Rotterdam: romans, thrillers en verhalen",
      absoluteUrl("/boeken-over-rotterdam"),
      pageDescriptionLong
    ),
    breadcrumbSchema(breadcrumbs),
    itemListSchema(
      "Boeken over Rotterdam",
      rotterdamBoeken.map((item) => {
        const details = rotterdamBookDetails[item.slug];

        return {
          name: details.schemaName,
          url: getBoekSchemaUrl(item.slug),
          description: item.korteOmschrijving,
          author: details.author,
          editor: details.editor,
          image: details.image,
        };
      }),
      { itemType: "Book" }
    ),
    faqSchema(faqItems)
  );

  return (
    <main>
      <JsonLd data={jsonLd} />
      <PageHeader
        eyebrow="Leeslijst"
        title="Boeken over Rotterdam: romans en thrillers die in de stad spelen"
      />
      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} />

        <p className="content-meta">
          Door{" "}
          <Link href="/over-de-auteur">Ard Breure</Link>, auteur van{" "}
          <Link href="/boeken/schaduwen-over-domburg">Schaduwen over Domburg</Link>
          {" · "}
          Laatst bijgewerkt 11 augustus 2026
        </p>

        <AffiliateDisclosure />

        <figure className="content-section">
          <Image
            src="/assets/rotterdam-maas-lezen-sfeerbeeld.webp"
            alt="Illustratie van lezen aan de Maas in Rotterdam met de Erasmusbrug op de achtergrond"
            width={1600}
            height={600}
            priority
            sizes="(max-width: 768px) 100vw, 48rem"
            style={{ width: "100%", height: "auto" }}
          />
        </figure>

        <section className="content-section">
          <p className="content-paragraph">
            Op zoek naar <strong>boeken over Rotterdam</strong>? Hieronder vind
            je vijf titels die de stad echt vangen — romans, thrillers en
            verhalen waarin Rotterdam geen decor is, maar een personage. Van
            Bordewijk tot Deelder, van voetbal tot wederopbouw, en een
            haven-thriller die van Zeeland naar de Maasvlakte loopt.
          </p>
          <p className="content-paragraph">
            Rotterdam beschrijf je niet met ansichtkaartwoorden. Wie erover
            schrijft, schrijft over de haven, over werken, over een stad die één
            keer is platgegooid en zichzelf opnieuw heeft uitgevonden. Ik ben er
            zelf aan verknocht geraakt, zo erg dat mijn debuut,{" "}
            <Link href="/boeken/schaduwen-over-domburg">
              Schaduwen over Domburg
            </Link>
            , voor een groot deel in de Rotterdamse haven speelt.
          </p>
        </section>

        <section
          id="overzicht"
          className="content-section"
          aria-labelledby="overzicht-heading"
        >
          <h2 id="overzicht-heading" className="content-heading">
            Overzicht: 5 boeken over Rotterdam
          </h2>
          <div className="content-table-wrapper">
            <table className="content-table">
              <thead>
                <tr>
                  <th scope="col">Titel</th>
                  <th scope="col">Auteur</th>
                  <th scope="col">In het kort</th>
                </tr>
              </thead>
              <tbody>
                {bookIndex.map((book) => (
                  <tr key={book.slug}>
                    <td>
                      <a href={`#${book.slug}`}>{book.title}</a>
                    </td>
                    <td>{book.author}</td>
                    <td>{book.summary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section
          id="schaduwen-over-domburg"
          className="content-section"
          aria-labelledby="schaduwen-over-domburg-heading"
        >
          <h2 id="schaduwen-over-domburg-heading" className="content-heading">
            Schaduwen over Domburg — Ard Breure
          </h2>
          <p className="content-paragraph">
            Ik begin schaamteloos bij mijn eigen boek — het staat hier omdat het
            hier hoort. <em>Schaduwen over Domburg</em> is een literaire
            thriller over een ex-rechercheur van de Zeehavenpolitie die wordt
            teruggeroepen naar een zaak die begint met een lichaam op een
            Zeeuws strand, maar die hem dwars door de Rotterdamse haven voert:
            Katendrecht, de Waalhaven, de Maasvlakte, de kade bij nacht. Een
            verhaal over schuld, stilte, en een stad waar containers meer
            geheimen bewaren dan mensen.
          </p>
          <p className="content-paragraph">
            Dit is een aankomend boek — het is nog niet af en nu niet te koop.
            Het verschijnt naar verwachting najaar 2026. Schrijf je in op de
            wachtlijst en ontvang je een e-mail zodra het boek beschikbaar is.
            Op de{" "}
            <Link href="/boeken/schaduwen-over-domburg">boekpagina</Link> lees
            je meer over het verhaal. Meer literaire thrillers vind je bij{" "}
            <Link href="/boeken">alle boeken van Breure Media</Link>.
          </p>
          <Image
            className="book-cover"
            src="/assets/schaduwen-over-domburg-boekomslag-ard-breure.webp"
            alt="Schaduwen over Domburg - literaire thriller van Ard Breure, boekomslag met vuurtoren en de Rotterdamse Erasmusbrug"
            width={1365}
            height={2048}
            sizes="280px"
            loading="lazy"
          />
        </section>

        <section
          id="boek-wachtlijst"
          className="content-section"
          aria-labelledby="boek-wachtlijst-heading"
        >
          <h2 id="boek-wachtlijst-heading" className="content-heading">
            Ontvang bericht bij verschijning
          </h2>
          <p className="content-paragraph">
            Laat je e-mailadres achter en je ontvangt één bericht zodra{" "}
            <em>Schaduwen over Domburg</em> verschijnt — met de
            verschijningsdatum en een exclusieve voorpublicatie.
          </p>
          <NewsletterForm source="boeken-over-rotterdam" compact />
        </section>

        <section
          id="karakter-bordewijk"
          className="content-section"
          aria-labelledby="karakter-bordewijk-heading"
        >
          <h2 id="karakter-bordewijk-heading" className="content-heading">
            Karakter — F. Bordewijk
          </h2>
          <p className="content-paragraph">
            Geen boek over Rotterdam is zo vaak genoemd en zo weinig herlezen
            als <em>Karakter</em>. Bordewijk schreef in 1938 het verhaal van
            Jacob Willem Katadreuffe, buitenechtelijke zoon van de
            onverzettelijke deurwaarder Dreverhaven, die zich in het
            vooroorlogse Rotterdam omhoogvecht naar een advocatenpraktijk —
            dwars tegen zijn eigen vader in. Geen gezellige haven hier, maar een
            stad van kantoren, incasso&apos;s en onbuigzame wilskracht. De stijl
            is kil en precies, bijna juridisch, en juist daardoor
            onvergetelijk. Wie Rotterdam wil begrijpen vóór de oorlog, vóór het
            bombardement, leest dit.
          </p>
          <p className="content-paragraph">
            <em>Karakter</em> won in 1938 de C.W. van der Hoogtprijs en werd in
            1997 verfilmd door Mike van Diem, die er een Oscar voor buitenlandse
            film mee won. Voor meer literaire thrillers, zie ook{" "}
            <Link href="/boeken">alle boeken van Breure Media</Link>.
          </p>
          <Image
            className="book-cover"
            src="/assets/karakter-f-bordewijk-boekomslag.webp"
            alt="Karakter - boekomslag van F. Bordewijk"
            width={942}
            height={1500}
            sizes="280px"
            loading="lazy"
          />
          <AffiliateButton
            amazonUrl={getBoekUrl("karakter-bordewijk")}
            label="MEER OVER KARAKTER — BESTEL HIER"
          />
        </section>

        <section
          id="jules-deelder"
          className="content-section"
          aria-labelledby="jules-deelder-heading"
        >
          <h2 id="jules-deelder-heading" className="content-heading">
            De dikke van Deelder — Jules Deelder
          </h2>
          <figure className="content-section">
            <Image
              src="/assets/de-dikke-van-deelder-rotterdam-nh-hotel-lifestyle-lezen-met-uitzicht-op-erasmusbrug.webp"
              alt="Lezer geniet van De Dikke van Deelder in een NH Hotel met uitzicht op de Erasmusbrug en de Rotterdamse skyline."
              title="De Dikke van Deelder | Lifestyle in NH Hotel Rotterdam"
              width={1536}
              height={1024}
              sizes="(max-width: 768px) 100vw, 48rem"
              style={{ width: "100%", height: "auto" }}
              loading="lazy"
            />
          </figure>
          <p className="content-paragraph">
            Over Rotterdam schrijven zonder Deelder te noemen is als over de
            stad lopen zonder de Maas over te steken. De nachtburgemeester ving
            de stad in gedichten en verhalen die je hardop wilt lezen, met dat
            onnavolgbare ritme — droog, snel, en altijd nét iets waarachtiger
            dan je verwacht. Een verzamelbundel is de beste plek om te beginnen.
          </p>
          <p className="content-paragraph">
            <strong>Voor wie:</strong> wie de tóón van Rotterdam wil horen, niet
            alleen de feiten.
          </p>
          <h3 className="content-heading">Originele boekcover</h3>
          <a
            href={getBoekUrl("jules-deelder")}
            className="book-cover-link"
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            aria-label="Bekijk De dikke van Deelder op Amazon"
          >
            <Image
              className="book-cover"
              src="/assets/de-dikke-van-deelder-jules-deelder-boekomslag.webp"
              alt="De dikke van Deelder - boekomslag van Jules Deelder"
              width={343}
              height={500}
              sizes="280px"
              loading="lazy"
            />
          </a>
          <AffiliateButton amazonUrl={getBoekUrl("jules-deelder")} />
        </section>

        <section
          id="hugo-borst"
          className="content-section"
          aria-labelledby="hugo-borst-heading"
        >
          <h2 id="hugo-borst-heading" className="content-heading">
            Hugo Borst — Rotterdam en voetbal
          </h2>
          <p className="content-paragraph">
            Geen stad waar voetbal en identiteit zo in elkaar grijpen als hier,
            en niemand schrijft daar zo goed over als Hugo Borst — Spartaan,
            columnist, en een van de beste sportschrijvers van het land. Zijn
            werk gaat over voetbal zoals <em>Karakter</em> over een
            advocatenkantoor gaat: het onderwerp is het voertuig, de stad en
            haar mensen zijn de lading.
          </p>
          <p className="content-paragraph">
            <strong>Voor wie:</strong> de lezer voor wie Rotterdam ook tribune,
            gras en zondagmiddag is.
          </p>
          <Image
            className="book-cover"
            src="/assets/de-coolsingel-bleef-leeg-hugo-borst-boekomslag.webp"
            alt="De Coolsingel bleef leeg - het klassieke boek over Feyenoord van Hugo Borst, boekomslag"
            width={963}
            height={1500}
            sizes="280px"
            loading="lazy"
          />
          <AffiliateButton amazonUrl={getBoekUrl("hugo-borst")} />
        </section>

        <section
          id="rotterdam-wederopbouw-groenendijk"
          className="content-section"
          aria-labelledby="rotterdam-wederopbouw-groenendijk-heading"
        >
          <h2
            id="rotterdam-wederopbouw-groenendijk-heading"
            className="content-heading"
          >
            Rotterdam Wederopbouw — Paul Groenendijk (red.)
          </h2>
          <p className="content-paragraph">
            Wie Rotterdam zegt, denkt aan bouwen. Na het bombardement van 14 mei
            1940 werd de stad letterlijk opnieuw opgebouwd — vier dagen na de
            verwoesting kreeg stadsarchitect Witteveen al opdracht voor een
            wederopbouwplan. Deze gids brengt honderd projecten uit die periode
            samen, van het Groothandelsgebouw tot de Maastorenflat, van
            Pendrecht tot Ommoord, met historische foto&apos;s naast de huidige
            situatie. Geen roman, geen verhaal met personages — maar wel het
            fundament onder elk boek dat wél over deze stad geschreven wordt.
          </p>
          <p className="content-paragraph">
            <strong>Voor wie:</strong> wie wil begrijpen waaróm Rotterdam is
            zoals het is, voordat je leest hoe het voelt.
          </p>
          <Image
            className="book-cover"
            src="/assets/rotterdam-wederopbouw-100-gebouwen-paul-groenendijk-boekomslag.webp"
            alt="Rotterdam Wederopbouw: De 100 gebouwen - boekomslag van Paul Groenendijk"
            width={870}
            height={1500}
            sizes="280px"
            loading="lazy"
          />
          <AffiliateButton
            amazonUrl={getBoekUrl("rotterdam-wederopbouw-groenendijk")}
            label="MEER OVER ROTTERDAM WEDEROPBOUW — BESTEL HIER"
          />
        </section>

        <RelatedGuides
          title="Meer gidsen en leeslijsten"
          guides={[
            {
              href: "/boeken-over-zeeland",
              label: "Boeken over Zeeland",
              description: "Thrillers en verhalen aan de Zeeuwse kust",
            },
            {
              href: "/boeken/schaduwen-over-domburg",
              label: "Schaduwen over Domburg",
              description: "De literaire thriller over haven en kust",
            },
            {
              href: "/e-readers",
              label: "E-reader gids",
              description: "Kindle of Kobo voor je volgende Rotterdam-boek",
            },
            {
              href: "/blog",
              label: "Blog",
              description: "Artikelen over boeken, e-readers en schrijven",
            },
          ]}
        />
      </div>

      <FaqSection
        items={faqItems}
        title="Veelgestelde vragen over boeken over Rotterdam"
      />

      <div className="container content-page content-page--footer">
        <section className="content-section">
          <p className="content-meta">
            <em>
              Hier staan alleen boeken die ik zelf de moeite waard vind.
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
