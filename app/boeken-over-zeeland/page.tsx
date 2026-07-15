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
import { getZeelandBoekBySlug, zeelandBoeken } from "@/data/affiliate";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import {
  breadcrumbSchema,
  buildJsonLd,
  collectionPageSchema,
  faqSchema,
  itemListSchema,
} from "@/lib/schema";

const pageDescription =
  "Romans, verhalen en reisgidsen over Zeeland — van de literaire thriller Schaduwen over Domburg en de Zeelandthriller Spoorloos van Ellen de Vriend tot praktische gidsen voor de Zeeuwse kust. Een groeiende leeslijst van auteur Ard Breure.";

const dutchMonths: Record<string, string> = {
  januari: "01",
  februari: "02",
  maart: "03",
  april: "04",
  mei: "05",
  juni: "06",
  juli: "07",
  augustus: "08",
  september: "09",
  oktober: "10",
  november: "11",
  december: "12",
};

function toIsoDate(dutchDate?: string): string | undefined {
  if (!dutchDate) {
    return undefined;
  }
  const match = dutchDate.match(/^(\d{1,2})\s+([a-z]+)\s+(\d{4})$/i);
  if (!match) {
    return undefined;
  }
  const [, day, monthName, year] = match;
  const month = dutchMonths[monthName.toLowerCase()];
  if (!month) {
    return undefined;
  }
  return `${year}-${month}-${day.padStart(2, "0")}`;
}

const zeelandBookDetails: Record<
  string,
  {
    schemaName: string;
    author?: string;
    authors?: string[];
    editor?: string;
    image?: string;
    publisher?: string;
    datePublished?: string;
    numberOfPages?: number;
    bookFormat?: string;
    inLanguage?: string;
  }
> = {
  "schaduwen-over-domburg": {
    schemaName: "Schaduwen over Domburg",
    author: "Ard Breure",
    image: "/assets/schaduwen-over-domburg-boekomslag-ard-breure.webp",
  },
  "spoorloos-ellen-de-vriend": {
    schemaName: "Spoorloos",
    author: "Ellen de Vriend",
    image: "/assets/spoorloos-ellen-de-vriend-zeeland-thriller-boekcover.webp",
    publisher: "Uitgeverij De Fontein",
    datePublished: toIsoDate(
      getZeelandBoekBySlug("spoorloos-ellen-de-vriend")?.publicationDate
    ),
    numberOfPages: getZeelandBoekBySlug("spoorloos-ellen-de-vriend")?.pages,
    bookFormat: "https://schema.org/Paperback",
    inLanguage: "nl",
  },
  "time-to-momo-zeeland": {
    schemaName: "Time to Momo Zeeland",
    authors: ["Kim van Zweeden", "Melanie van Zweeden"],
    image: "/assets/time-to-momo-zeeland-boekomslag.webp",
    publisher: "Mo’Media",
    datePublished: toIsoDate(
      getZeelandBoekBySlug("time-to-momo-zeeland")?.publicationDate
    ),
    numberOfPages: getZeelandBoekBySlug("time-to-momo-zeeland")?.pages,
    bookFormat: "https://schema.org/Paperback",
    inLanguage: "nl",
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
    "spoorloos ellen de vriend",
    "zeelandthriller",
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
      "De literaire thriller Schaduwen over Domburg van Ard Breure (verwacht najaar 2026) speelt grotendeels aan de Zeeuwse kust, met Domburg als decor. Spoorloos van Ellen de Vriend (2026) speelt zich af in Bruinisse op Schouwen-Duiveland. Deze leeslijst groeit — meer romans en verhalen die Zeeland als personage gebruiken volgen hier.",
  },
  {
    question: "In welke volgorde lees ik de Zeelandthrillers van Ellen de Vriend?",
    answer:
      "Begin met deel 1, Duivelskruid (2025), waarin teamchef Roos Latuheru haar eerste grote zaak in Zeeland onderzoekt. Lees daarna deel 2, Spoorloos (2026). Beide delen zijn ook los te lezen, maar in volgorde volg je de ontwikkeling van Roos en haar team het beste.",
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
  // Always point the Book schema at its own section on this page, never at
  // the Amazon affiliate URL, so the canonical page stays with Breure Media.
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
          authors: details.authors,
          editor: details.editor,
          image: details.image,
          publisher: details.publisher,
          datePublished: details.datePublished,
          numberOfPages: details.numberOfPages,
          bookFormat: details.bookFormat,
          inLanguage: details.inLanguage,
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

        <figure className="content-section">
          <Image
            src="/assets/zeeland-duinen-zee-lezende-vrouw-op-bankje.webp"
            alt="Lezende vrouw op een bankje in de Zeeuwse duinen met uitzicht op zee bij zonsondergang"
            width={1672}
            height={941}
            priority
            sizes="(max-width: 768px) 100vw, 48rem"
            style={{ width: "100%", height: "auto" }}
          />
        </figure>

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
          <NewsletterForm source="boeken-over-zeeland" compact />
        </section>

        <section
          id="spoorloos-ellen-de-vriend"
          className="content-section"
          aria-labelledby="spoorloos-ellen-de-vriend-heading"
        >
          <h2
            id="spoorloos-ellen-de-vriend-heading"
            className="content-heading"
          >
            Spoorloos — Ellen de Vriend
          </h2>
          <p className="content-meta">
            Nieuw in 2026 · Zeeland-thriller · Deel 2 van de serie{" "}
            <em>Een Zeelandthriller</em>
          </p>
          <p className="content-paragraph">
            Wanneer de jonge onderneemster Carice Romeijn uit Bruinisse
            spoorloos verdwijnt, lijkt het aanvankelijk een vermissingszaak.
            Maar al snel verandert het onderzoek in een zenuwslopende thriller
            vol geheimen, leugens en onverwachte wendingen.
          </p>
          <p className="content-paragraph">
            Rechercheur Roos Latuheru ontdekt dat vrijwel iedereen in het hechte
            Zeeuwse dorp iets achterhoudt. De waarheid blijkt veel dichterbij te
            liggen dan iemand had kunnen vermoeden.
          </p>
          <h3 className="content-heading">Waarom dit boek?</h3>
          <ul className="theme-list">
            <li>Gloednieuwe Zeeland-thriller uit 2026</li>
            <li>Speelt zich af op Schouwen-Duiveland</li>
            <li>Spannend van de eerste tot de laatste pagina</li>
            <li>Geschreven door de Zeeuwse auteur Ellen de Vriend</li>
          </ul>
          <p className="content-paragraph">
            <strong>Voor wie:</strong> liefhebbers van spannende Nederlandse
            thrillers, fans van Zeeland en de Zeeuwse kust, en lezers van Kiki
            van Dijk, Linda van Rijn en Mathijs Deen — en iedereen die houdt
            van mysteries en onverwachte plotwendingen.
          </p>
          <p className="content-paragraph">
            Ellen de Vriend combineert de rust van Zeeland met een verhaal vol
            spanning, waardoor je het boek moeilijk weglegt. Een uitstekende
            keuze voor wie houdt van een meeslepende thriller met een
            authentieke Zeeuwse sfeer.
          </p>
          <p className="content-paragraph">
            <strong>Tip:</strong> heb je deel 1 (<em>Duivelskruid</em>, 2025)
            nog niet gelezen? Begin daar eerst mee en geniet daarna van{" "}
            <em>Spoorloos</em> voor de complete Zeelandthriller-ervaring.
          </p>
          <p className="content-meta">
            Ellen de Vriend, uitgegeven door Uitgeverij De Fontein (28 april
            2026), 256 pagina&apos;s.
          </p>
          <a
            href={getBoekUrl("spoorloos-ellen-de-vriend")}
            className="book-cover-link"
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            aria-label="Bekijk Spoorloos op Amazon"
          >
            <Image
              className="book-cover"
              src="/assets/spoorloos-ellen-de-vriend-zeeland-thriller-boekcover.webp"
              alt="Boekcover van Spoorloos door Ellen de Vriend, een spannende Zeeland-thriller die zich afspeelt op Schouwen-Duiveland."
              title="Spoorloos – Ellen de Vriend | Zeeland-thriller"
              width={1672}
              height={941}
              sizes="280px"
              loading="lazy"
            />
          </a>
          <AffiliateButton
            amazonUrl={getBoekUrl("spoorloos-ellen-de-vriend")}
            label="Bekijk Spoorloos op Amazon"
          />
        </section>

        <section
          id="time-to-momo-zeeland"
          className="content-section"
          aria-labelledby="time-to-momo-zeeland-heading"
        >
          <h2 id="time-to-momo-zeeland-heading" className="content-heading">
            Time to Momo Zeeland — Kim van Zweeden en Melanie van Zweeden
          </h2>
          <p className="content-paragraph">
            Zoek je geen roman maar een praktische gids voor je volgende
            tripje naar Zeeland? <em>Time to Momo Zeeland</em>, geschreven
            door Kim van Zweeden en Melanie van Zweeden, is zo&apos;n gids:
            met tips van locals neemt het boek je mee naar de mooiste
            stranden, sfeervolle stadjes en dorpen, en goede horeca — van
            gezellige terrasjes tot de vis die zo vanuit zee op je bord
            belandt. Ook de bekendere Zeeuwse hoogtepunten, van de Zeeuwse
            kust tot de Deltawerken, komen aan bod.
          </p>
          <p className="content-paragraph">
            <strong>Voor wie:</strong> wie eerst wil reizen en pas daarna wil
            lezen — of andersom, en na <em>Schaduwen over Domburg</em> zelf
            naar het strand van Domburg toe wil.
          </p>
          <p className="content-meta">
            Kim van Zweeden en Melanie van Zweeden, uitgegeven door
            Mo&rsquo;Media (28 april 2022), 128 pagina&apos;s.
          </p>
          <Image
            className="book-cover"
            src="/assets/time-to-momo-zeeland-boekomslag.webp"
            alt="Boekomslag van Time to Momo Zeeland, reisgids van Kim van Zweeden en Melanie van Zweeden"
            width={800}
            height={1052}
            sizes="280px"
            loading="lazy"
          />
          <AffiliateButton
            amazonUrl={getBoekUrl("time-to-momo-zeeland")}
            label="BEKIJK TIME TO MOMO ZEELAND BIJ AMAZON"
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
