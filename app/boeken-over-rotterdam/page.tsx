import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AffiliateButton } from "@/components/AffiliateButton";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { rotterdamBoeken } from "@/data/affiliate";
import { getBookBySlug } from "@/data/books";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import {
  affiliateBookSchema,
  bookSchema,
  breadcrumbSchema,
  buildJsonLd,
  faqSchema,
  itemListSchema,
} from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Boeken over Rotterdam: romans, thrillers en verhalen | Breure Media",
  description:
    "Vijf boeken die Rotterdam echt vangen — van Karakter en Jules Deelder tot de haven-thriller Schaduwen over Domburg. Een persoonlijke leeslijst van auteur Ard Breure.",
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
  {
    question: "Welke boeken laten het echte Rotterdam zien?",
    answer:
      "Niet de ansichtkaartversie: Karakter voor het vooroorlogse Rotterdam, Deelder voor de stem van de stad, Wederopbouw voor de architectuur, en thrillers als Schaduwen over Domburg voor de haven.",
  },
  {
    question: "Is Rotterdam Wederopbouw ook interessant zonder architectuurachtergrond?",
    answer:
      "Ja. Rotterdam Wederopbouw: De 100 gebouwen is geen vakboek voor architecten, maar een toegankelijke gids met historische foto's naast de huidige situatie — ideaal om te begrijpen waaróm Rotterdam eruitziet zoals het doet, ook zonder voorkennis.",
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
  const schaduwenBook = getBookBySlug("schaduwen-over-domburg");
  const karakterBoek = rotterdamBoeken.find(
    (item) => item.slug === "karakter-bordewijk"
  );
  const wederopbouwBoek = rotterdamBoeken.find(
    (item) => item.slug === "rotterdam-wederopbouw-groenendijk"
  );
  const deelderBoek = rotterdamBoeken.find(
    (item) => item.slug === "jules-deelder"
  );
  const borstBoek = rotterdamBoeken.find((item) => item.slug === "hugo-borst");

  const jsonLd = buildJsonLd(
    breadcrumbSchema(breadcrumbs),
    itemListSchema(
      "Boeken over Rotterdam",
      rotterdamBoeken.map((item) => ({
        name: item.naam,
        url: item.internalUrl
          ? absoluteUrl(item.internalUrl)
          : absoluteUrl(`/boeken-over-rotterdam#${item.slug}`),
        description: item.korteOmschrijving,
      }))
    ),
    faqSchema(faqItems),
    ...(schaduwenBook ? [bookSchema(schaduwenBook)] : []),
    ...(karakterBoek
      ? [
          affiliateBookSchema({
            name: "Karakter",
            author: "F. Bordewijk",
            description: karakterBoek.korteOmschrijving,
            isbn: "9789038815480",
            datePublished: "2025-10-02",
            publisher: "Nijgh & Van Ditmar",
            bookFormat: "Paperback",
            genre: "Roman",
            image: "/assets/karakter-f-bordewijk-boekomslag.webp",
            url: getBoekSchemaUrl("karakter-bordewijk"),
          }),
        ]
      : []),
    ...(wederopbouwBoek
      ? [
          affiliateBookSchema({
            name: "Rotterdam Wederopbouw: De 100 gebouwen",
            editor: "Paul Groenendijk",
            description: wederopbouwBoek.korteOmschrijving,
            publisher: "nai010 uitgevers",
            bookFormat: "Paperback",
            genre: "Architectuur",
            image:
              "/assets/rotterdam-wederopbouw-100-gebouwen-paul-groenendijk-boekomslag.webp",
            url: getBoekSchemaUrl("rotterdam-wederopbouw-groenendijk"),
          }),
        ]
      : []),
    ...(deelderBoek
      ? [
          affiliateBookSchema({
            name: "De dikke van Deelder",
            author: "Jules Deelder",
            description: deelderBoek.korteOmschrijving,
            publisher: "De Bezige Bij",
            bookFormat: "EBook",
            genre: "Poëzie en proza",
            image: "/assets/de-dikke-van-deelder-jules-deelder-boekomslag.webp",
            url: getBoekSchemaUrl("jules-deelder"),
          }),
        ]
      : []),
    ...(borstBoek
      ? [
          affiliateBookSchema({
            name: "De Coolsingel bleef leeg",
            author: "Hugo Borst",
            description: borstBoek.korteOmschrijving,
            genre: "Sportliteratuur",
            image: "/assets/de-coolsingel-bleef-leeg-hugo-borst-boekomslag.webp",
            url: getBoekSchemaUrl("hugo-borst"),
          }),
        ]
      : [])
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
        </p>

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
            Rotterdam is een stad die je niet beschrijft met
            ansichtkaartwoorden. Wie erover schrijft, schrijft over de haven,
            over werken, over een stad die één keer is platgegooid en zichzelf
            opnieuw heeft uitgevonden — en over mensen die niet praten als ze
            ook kunnen doen. Ik ben er zelf aan verknocht geraakt, zo erg dat
            mijn eigen debuut,{" "}
            <Link href="/boeken/schaduwen-over-domburg">
              Schaduwen over Domburg
            </Link>
            , voor een groot deel in de Rotterdamse haven speelt. Op deze pagina
            verzamel ik de boeken die de stad echt vangen: romans, thrillers en
            verhalen waarin Rotterdam geen decor is, maar een personage.
          </p>
        </section>

        <p className="content-meta affiliate-disclosure">
          Als Amazon-partner verdien ik aan in aanmerking komende aankopen.
        </p>

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
            Het boek verschijnt naar verwachting najaar 2026. Op de{" "}
            <Link href="/boeken/schaduwen-over-domburg">boekpagina</Link> lees
            je meer en kun je je inschrijven om als eerste bericht te krijgen.
            Meer literaire thrillers vind je bij{" "}
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
          <Link
            href="/boeken/schaduwen-over-domburg"
            className="btn btn-primary"
          >
            Meer over Schaduwen over Domburg
          </Link>
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
            Jules Deelder — de stem van Rotterdam
          </h2>
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
          <Image
            className="book-cover"
            src="/assets/de-dikke-van-deelder-jules-deelder-boekomslag.webp"
            alt="De dikke van Deelder - boekomslag van Jules Deelder"
            width={343}
            height={500}
            sizes="280px"
            loading="lazy"
          />
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
      </div>

      <FaqSection items={faqItems} />

      <div className="container content-page content-page--footer">
        <section className="content-section">
          <p className="content-meta">
            <em>
              Als Amazon-partner verdien ik aan in aanmerking komende aankopen.
              Dat verandert niets aan de prijs die jij betaalt, en niets aan
              mijn keuze — hier staan alleen boeken die ik zelf de moeite waard
              vind.
            </em>
          </p>
          <p className="content-meta">
            Lees je liever op een e-reader? Bekijk onze{" "}
            <Link href="/e-readers">e-reader gids</Link>.
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
