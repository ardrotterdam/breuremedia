import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AffiliateButton } from "@/components/AffiliateButton";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { rotterdamBoeken } from "@/data/affiliate";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import {
  affiliateBookSchema,
  breadcrumbSchema,
  buildJsonLd,
  itemListSchema,
} from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title:
    "Boeken over Rotterdam: de beste romans en thrillers | Breure Media",
  description:
    "Op deze pagina verzamel ik de boeken die de stad echt vangen: romans, thrillers en verhalen waarin Rotterdam geen decor is, maar een personage.",
  path: "/boeken-over-rotterdam",
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

function getBoekUrl(slug: string) {
  return rotterdamBoeken.find((item) => item.slug === slug)?.amazonUrl ?? "";
}

export default function BoekenOverRotterdamPage() {
  const karakterBoek = rotterdamBoeken.find(
    (item) => item.slug === "karakter-bordewijk"
  );

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
    ...(karakterBoek?.amazonUrl
      ? [
          affiliateBookSchema({
            name: "Karakter",
            author: "F. Bordewijk",
            description: karakterBoek.korteOmschrijving,
            isbn: "9789038815480",
            datePublished: "2025-10-02",
            url: karakterBoek.amazonUrl,
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
        description="Door Ard Breure, auteur van Schaduwen over Domburg"
      />
      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} />

        <section className="content-section">
          <p className="content-paragraph">
            Rotterdam is een stad die je niet beschrijft met
            ansichtkaartwoorden. Wie erover schrijft, schrijft over de haven,
            over werken, over een stad die één keer is platgegooid en zichzelf
            opnieuw heeft uitgevonden — en over mensen die niet praten als ze
            ook kunnen doen. Ik ben er zelf aan verknocht geraakt, zo erg dat
            mijn eigen debuut voor een groot deel in de Rotterdamse haven
            speelt. Op deze pagina verzamel ik de boeken die de stad echt
            vangen: romans, thrillers en verhalen waarin Rotterdam geen decor
            is, maar een personage.
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
            Het boek verschijnt naar verwachting najaar 2026. Op de boekpagina
            lees je meer en kun je je inschrijven om als eerste bericht te
            krijgen.
          </p>
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
            film mee won.
          </p>
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
          <div style={{ maxWidth: "280px", marginBottom: "1.5rem" }}>
            <Image
              className="book-cover"
              src="/assets/de-coolsingel-bleef-leeg-hugo-borst-boekomslag.webp"
              alt="De Coolsingel bleef leeg - het klassieke boek over Feyenoord van Hugo Borst, boekomslag"
              width={963}
              height={1500}
              sizes="280px"
            />
          </div>
          <AffiliateButton amazonUrl={getBoekUrl("hugo-borst")} />
        </section>

        <section
          id="bombardement-wederopbouw"
          className="content-section"
          aria-labelledby="bombardement-wederopbouw-heading"
        >
          <h2
            id="bombardement-wederopbouw-heading"
            className="content-heading"
          >
            Het bombardement en de wederopbouw
          </h2>
          <p className="content-paragraph">
            14 mei 1940 is het scharnierpunt van alles wat Rotterdam is. Wie de
            stad wil begrijpen — waarom ze eruitziet zoals ze eruitziet, waarom
            haar mensen praten zoals ze praten — moet iets lezen over de
            verwoesting en wat daarna kwam: de kaalslag, de ambitie, de betonnen
            trots. Er zijn zowel romans als toegankelijke geschiedenisboeken
            over deze periode.
          </p>
          <p className="content-paragraph">
            <strong>Voor wie:</strong> wie wil snappen waaróm Rotterdam anders
            is dan elke andere Nederlandse stad.
          </p>
          <AffiliateButton amazonUrl={getBoekUrl("bombardement-wederopbouw")} />
        </section>

        <section
          id="moderne-rotterdamse-thriller"
          className="content-section"
          aria-labelledby="moderne-rotterdamse-thriller-heading"
        >
          <h2
            id="moderne-rotterdamse-thriller-heading"
            className="content-heading"
          >
            Een moderne Rotterdamse thriller
          </h2>
          <p className="content-paragraph">
            De stad van nu — met haar torens, haar haven vol camera&apos;s en
            haar oude wijken onder druk — is een cadeau voor thrillerschrijvers,
            en er verschijnen elk jaar titels die er dankbaar gebruik van maken.
            Hier hoort een recente Rotterdamse misdaadroman die de stad van
            vandaag laat zien.
          </p>
          <p className="content-paragraph">
            <strong>Voor wie:</strong> wie na de klassiekers het Rotterdam van
            nu wil lezen — als opwarmer voor wat hierboven staat.
          </p>
          <AffiliateButton
            amazonUrl={getBoekUrl("moderne-rotterdamse-thriller")}
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
