import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AffiliateButton } from "@/components/AffiliateButton";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { zeelandBoeken } from "@/data/affiliate";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import {
  breadcrumbSchema,
  buildJsonLd,
  collectionPageSchema,
  faqSchema,
  itemListSchema,
} from "@/lib/schema";

const pageDescription =
  "Romans, verhalen en reisgidsen over Zeeland — van de literaire thriller Schaduwen over Domburg tot praktische gidsen voor de Zeeuwse kust. Een groeiende leeslijst van auteur Ard Breure.";

const zeelandBookDetails: Record<
  string,
  { schemaName: string; author?: string; editor?: string; image?: string }
> = {
  "schaduwen-over-domburg": {
    schemaName: "Schaduwen over Domburg",
    author: "Ard Breure",
    image: "/assets/schaduwen-over-domburg-boekomslag-ard-breure.webp",
  },
  "time-to-momo-zeeland": {
    schemaName: "Time to Momo Zeeland",
    image: "/assets/time-to-momo-zeeland-boekomslag-placeholder.png",
  },
};

export const metadata: Metadata = buildMetadata({
  title: "Boeken over Zeeland: romans, verhalen en reisgidsen | Breure Media",
  description: pageDescription,
  path: "/boeken-over-zeeland",
  keywords: [
    "boeken over zeeland",
    "zeeuwse roman",
    "verhalen zeeland",
    "reisgids zeeland",
    "schaduwen over domburg",
  ],
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Boeken over Zeeland", path: "/boeken-over-zeeland" },
];

const faqItems = [
  {
    question: "Welke boeken spelen zich af in Zeeland?",
    answer:
      "De literaire thriller Schaduwen over Domburg van Ard Breure (verwacht najaar 2026) speelt grotendeels aan de Zeeuwse kust, met Domburg als decor. Deze leeslijst groeit — meer romans en verhalen die Zeeland als personage gebruiken volgen hier.",
  },
  {
    question: "Welke reisgids is het beste voor Zeeland?",
    answer:
      "Time to Momo Zeeland is een prettige eerste keus: een praktische gids met de leukste stranden, hotspots en horeca, inclusief tips van locals. Voor wie liever nog dieper de Deltawerken of de fiets- en wandelroutes van Walcheren en Zeeuws-Vlaanderen induikt, volgen hier binnenkort meer aanraders.",
  },
  {
    question: "Is Schaduwen over Domburg ook interessant als reisliteratuur?",
    answer:
      "Het is geen reisgids, maar wie het boek leest voordat hij naar Domburg gaat, kijkt anders naar het strand, de duinen en de vuurtoren — de plekken uit het verhaal bestaan echt.",
  },
  {
    question: "Wat maakt Zeeland een goed decor voor verhalen?",
    answer:
      "De combinatie van wijdsheid en dreiging: eindeloze stranden en polders, maar ook een geschiedenis van water dat wint. Die spanning tussen rust en gevaar leent zich uitstekend voor literaire verhalen.",
  },
];

function getBoekUrl(slug: string) {
  return zeelandBoeken.find((item) => item.slug === slug)?.amazonUrl ?? "";
}

function getBoekSchemaUrl(slug: string) {
  const boek = zeelandBoeken.find((item) => item.slug === slug);
  if (!boek) {
    return "";
  }
  if (boek.internalUrl) {
    return absoluteUrl(boek.internalUrl);
  }
  if (boek.amazonUrl) {
    return boek.amazonUrl;
  }
  return absoluteUrl(`/boeken-over-zeeland#${slug}`);
}

export default function BoekenOverZeelandPage() {
  const jsonLd = buildJsonLd(
    collectionPageSchema(
      "Boeken over Zeeland: romans, verhalen en reisgidsen",
      absoluteUrl("/boeken-over-zeeland"),
      pageDescription
    ),
    breadcrumbSchema(breadcrumbs),
    itemListSchema(
      "Boeken over Zeeland",
      zeelandBoeken.map((item) => {
        const details = zeelandBookDetails[item.slug];

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
        title="Boeken over Zeeland: romans, verhalen en reisgidsen"
      />
      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} />

        <p className="content-meta">
          Door{" "}
          <Link href="/over-de-auteur">Ard Breure</Link>, auteur van{" "}
          <Link href="/boeken/schaduwen-over-domburg">Schaduwen over Domburg</Link>
        </p>

        <AffiliateDisclosure />

        <section className="content-section">
          <p className="content-paragraph">
            Ik ben opgegroeid in Zeeland — de wijdsheid van het strand, de
            polders, de dreiging van water dat ooit won en ooit weer kan
            winnen. Op deze pagina verzamel ik boeken over die provincie in de
            breedste zin: romans en verhalen die Zeeland als decor of
            personage gebruiken, maar ook praktische reisgidsen voor wie de
            Zeeuwse kust zelf wil ontdekken. De lijst is nog klein, maar
            groeit.
          </p>
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
            Ik begin schaamteloos bij mijn eigen boek — het staat hier omdat
            het hier hoort. <em>Schaduwen over Domburg</em> is een literaire
            thriller over een ex-rechercheur van de Zeehavenpolitie die wordt
            teruggeroepen naar een zaak die begint met een lichaam op het
            strand van Domburg, maar die hem terugvoert naar een oude belofte
            die hij niet nakwam. De duinen, de vuurtoren en de stilte van de
            Zeeuwse kust zijn geen decor — ze zijn onderdeel van het verhaal.
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
          <Link href="/#newsletter-heading" className="btn btn-primary">
            Schrijf je in voor de wachtlijst
          </Link>
        </section>

        <section
          id="time-to-momo-zeeland"
          className="content-section"
          aria-labelledby="time-to-momo-zeeland-heading"
        >
          <h2 id="time-to-momo-zeeland-heading" className="content-heading">
            Time to Momo Zeeland
          </h2>
          <p className="content-paragraph">
            Zoek je geen roman maar een praktische gids voor je volgende
            tripje naar Zeeland? <em>Time to Momo Zeeland</em> neemt je mee
            naar de leukste stranden, verrassende hotspots en goede horeca —
            van gezellige terrasjes tot de vis die zo vanuit zee op je bord
            belandt. Met tips van locals haal je alles uit je bezoek aan
            &apos;het Zeeuwse&apos;.
          </p>
          <p className="content-paragraph">
            <strong>Voor wie:</strong> wie eerst wil reizen en pas daarna wil
            lezen — of andersom, en na <em>Schaduwen over Domburg</em> zelf
            naar het strand van Domburg toe wil.
          </p>
          <Image
            className="book-cover"
            src="/assets/time-to-momo-zeeland-boekomslag-placeholder.png"
            alt="Time to Momo Zeeland - boekomslag (voorlopige afbeelding)"
            width={1024}
            height={1536}
            sizes="280px"
            loading="lazy"
          />
          <AffiliateButton
            amazonUrl={getBoekUrl("time-to-momo-zeeland")}
            label="MEER OVER TIME TO MOMO ZEELAND — BESTEL HIER"
          />
        </section>
      </div>

      <FaqSection items={faqItems} />

      <div className="container content-page content-page--footer">
        <section className="content-section">
          <p className="content-meta">
            <em>
              Deze leeslijst wordt uitgebreid met meer romans, verhalen en
              reisgidsen over Zeeland.
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
