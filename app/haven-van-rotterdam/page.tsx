// TODO: BlogImagePlaceholder vervangen door next/image zodra de afbeeldingen er zijn.
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BlogImagePlaceholder } from "@/components/BlogImagePlaceholder";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { FirstChapterCTA } from "@/components/FirstChapterCTA";
import { RelatedGuides } from "@/components/RelatedGuides";
import { formatBlogDate } from "@/data/blog";
import { author, siteConfig } from "@/lib/site";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, buildJsonLd } from "@/lib/schema";

const pagePath = "/haven-van-rotterdam";
const englishPath = "/en/port-of-rotterdam";
const germanPath = "/de/hafen-von-rotterdam";
const pageHeadline = "De haven van Rotterdam vanaf het water";
const pageTitle = `${pageHeadline} | ${siteConfig.name}`;
const pageDescription =
  "Zeven jaar reed ik taxi in de Rotterdamse haven. Wat je ziet als je zelf gaat kijken, wat je niet ziet, en waarom mijn thriller hier begint.";
const datePublished = "2026-08-30";
const dateModified = "2026-08-30";

const articleImages = {
  hero: {
    src: "/images/blog/haven-rotterdam-hero.webp",
    alt: "Een rij containerkranen langs de kade in de haven van Rotterdam tijdens het blauwe uur",
    width: 1672,
    height: 941,
  },
  kranen: {
    src: "/images/blog/haven-rotterdam-kranen-maasvlakte.jpg",
    alt: "Containerkranen op de Maasvlakte laden een zeeschip, gezien vanaf het water tijdens de havenrondvaart",
    width: 1536,
    height: 1021,
  },
  scan: {
    src: "/images/blog/haven-rotterdam-containerscan.webp",
    alt: "Een zeecontainer in een röntgenscanner van de Douane in de haven van Rotterdam",
    width: 1622,
    height: 969,
  },
  kering: {
    src: "/images/blog/haven-rotterdam-maeslantkering.webp",
    alt: "De gesloten Maeslantkering bij Hoek van Holland, die de Nieuwe Waterweg afsluit van de Noordzee",
    width: 1535,
    height: 1024,
  },
} as const;

export const metadata: Metadata = buildMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  type: "article",
  keywords: [
    "haven van Rotterdam",
    "Rotterdamse haven",
    "havenrondvaart Rotterdam",
    "Maasvlakte",
    "Schaduwen over Domburg",
  ],
  languages: {
    nl: pagePath,
    en: englishPath,
    de: germanPath,
    "x-default": pagePath,
  },
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
  { name: "Haven van Rotterdam", path: pagePath },
];

const articleSchema = {
  "@type": "Article",
  headline: pageHeadline,
  description: pageDescription,
  datePublished,
  dateModified,
  inLanguage: "nl",
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
    "@id": absoluteUrl(pagePath),
  },
};

export default function HavenVanRotterdamPage() {
  const jsonLd = buildJsonLd(articleSchema, breadcrumbSchema(breadcrumbs));

  return (
    <main>
      <JsonLd data={jsonLd} />
      <PageHeader
        eyebrow="Rotterdam"
        title={pageHeadline}
        description={`Door Ard Breure, auteur van Schaduwen over Domburg · Laatst bijgewerkt ${formatBlogDate(dateModified)}`}
      />

      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} />

        <figure className="content-section">
          <Image
            src={articleImages.hero.src}
            alt={articleImages.hero.alt}
            width={articleImages.hero.width}
            height={articleImages.hero.height}
            priority
            sizes="(max-width: 768px) 100vw, 48rem"
            style={{ width: "100%", height: "auto", borderRadius: "2px" }}
          />
        </figure>

        <section className="content-section">
          <p className="content-paragraph">
            Ik heb de haven van Rotterdam nooit hoeven opzoeken. Die was er
            altijd al.
          </p>
          <p className="content-paragraph">
            Als je hier je hele leven woont, is de haven geen bestemming. Het is
            de achtergrond. Je ziet de kranen langs de A15 staan. Je ziet de
            vrachtwagens, dag en nacht, op elke uitvalsweg. Je weet dat er
            ergens voorbij de laatste afslag iets ligt dat groter is dan de stad
            zelf. Dat is normaal, tot je er zelf in gaat rijden.
          </p>
          <p className="content-paragraph">
            Zeven jaar heb ik taxi gereden in de haven. Mijn passagiers waren
            loodsen, technici, mensen van de olieopslag, handelaren,
            scheepsofficieren, machinisten die met een goederentrein richting
            Duitsland gingen en soms vanaf Schiphol werden ingevlogen. Meestal
            reed ik ze naar een station. Soms reed ik ze de grens over, of
            haalde ik ze daar op.
          </p>
          <p className="content-paragraph">
            Dat werk gaf me iets wat je met een dagkaart niet koopt: toegang.
            Het grootste deel van de haven ligt achter hekken. Je mag er niet
            komen, je kunt er niet komen, en dat is maar goed ook. Met een taxi
            kwam ik wel binnen, want iemand moest opgehaald worden en die iemand
            stond niet bij de poort.
          </p>
          <p className="content-paragraph">
            Wat er in die auto gebeurde, was even belangrijk. Mensen praten in
            een taxi. Ze praten omdat je geen collega bent, geen leidinggevende,
            geen concurrent. Je bent de man die ze naar huis brengt. Iemand moet
            van A naar B, en waarom, dat is jouw zaak niet. Je vraagt het ook
            niet.
          </p>
          <p className="content-paragraph">
            Dat is precies hoe de haven zelf werkt, al zag ik dat toen nog niet.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="zestig-kilometer-heading"
        >
          <h2 id="zestig-kilometer-heading" className="content-heading">
            Zestig kilometer haven
          </h2>
          <p className="content-paragraph">
            Het eerste wat niemand goed voor zich ziet, is de schaal. De
            Rotterdamse haven is geen kade met wat kranen. Het is een gebied van
            tientallen kilometers lang, van de stadshaven tot ver voorbij de
            Europoort, met eigen wegen, eigen bruggen, eigen spoor. Je kunt er
            een uur in rijden zonder de rand te bereiken.
          </p>
          <p className="content-paragraph">
            En het is nooit stil. Dat is een misverstand dat ik vaak tegenkom.
            Mensen denken bij een moderne haven aan iets geruisloos. Het
            tegendeel is waar. Er rijdt permanent verkeer, er wordt permanent
            geladen, er staat permanent iets te draaien. De haven staat niet
            stil, niet &apos;s nachts, niet in het weekend, niet met kerst.
          </p>
          <p className="content-paragraph">
            Ik heb ooit een adres ingetoetst in de tijd dat navigatie net in
            elke auto zat. De borden langs de weg wezen rechtdoor, dus ik reed
            rechtdoor. Op het schermpje naast me reed ik dwars door de Noordzee.
            Alles blauw.
          </p>
          <p className="content-paragraph">
            Ik reed over de Maasvlakte 2, land dat was opgespoten en zo nieuw
            was dat de kaarten het nog niet wisten. Dat is de haven in één
            beeld: hij groeit sneller dan de administratie hem kan bijhouden. Je
            rijdt over grond die op papier nog water is.
          </p>
        </section>

        <BlogImagePlaceholder
          src={articleImages.kranen.src}
          alt={articleImages.kranen.alt}
          width={articleImages.kranen.width}
          height={articleImages.kranen.height}
        />

        <section
          className="content-section"
          aria-labelledby="wat-je-ziet-heading"
        >
          <h2 id="wat-je-ziet-heading" className="content-heading">
            Wat je ziet als je vaart
          </h2>
          <p className="content-paragraph">
            Wil je dit zelf zien, dan is het water de beste plek. Vanaf de weg
            zie je hekken. Vanaf het water zie je de haven.
          </p>
          <p className="content-paragraph">
            De gewone havenrondvaart met de Spido duurt vijfenzeventig minuten
            en blijft in de stadshaven. Je vaart onder de Erasmusbrug door,
            langs de Kop van Zuid, langs de scheepswerven en de binnenvaart. Dat
            is de tour die de meeste bezoekers doen, en voor een eerste indruk
            is die prima.
          </p>
          <p className="content-paragraph">
            Maar de tocht die je moet maken als je wilt zien waar het echt
            gebeurt, is de lange. Die vaart de Nieuwe Waterweg af, langs de
            Maeslantkering, langs Hoek van Holland, door de Europoort, tot aan
            de Maasvlakte. Daar draait de haven waar Europa van leeft.
          </p>
          <p className="content-paragraph">
            Het verschil tussen die twee tochten is het verschil tussen een stad
            en een machine.
          </p>
          <p className="content-paragraph">
            In de stadshaven is alles nog op menselijke maat. Loodsen, kades,
            een kraan die je met je ogen kunt volgen. Op de Maasvlakte klopt de
            maat niet meer. De schepen zijn zo groot dat je afstand verkeerd
            inschat. Een containerschip dat een kilometer verderop ligt, lijkt
            vlakbij. Een kraan die je klein ziet staan, is zestig meter hoog.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="haven-zonder-mensen-heading"
        >
          <h2 id="haven-zonder-mensen-heading" className="content-heading">
            Een haven zonder mensen
          </h2>
          <p className="content-paragraph">
            De twee diepzeeterminals op Maasvlakte 2 zijn vergaand
            geautomatiseerd. De haven als geheel is luidruchtig, maar binnen die
            omheinde zones loopt geen mens.
          </p>
          <p className="content-paragraph">
            Bij APM Terminals, dat sinds 2015 draait, is ongeveer tachtig
            procent van de kraanbewegingen geautomatiseerd, en het handmatige
            deel wordt op afstand uitgevoerd. De geautomatiseerde zones zijn
            volledig omheind, zodat mens en machine gescheiden blijven. Bij de
            terminal van Rotterdam World Gateway ernaast is het beeld hetzelfde:
            vijftig automatische stapelkranen die op afstand bediend worden, en
            negenenvijftig automatisch geleide voertuigen die de containers over
            het terrein rijden.
          </p>
          <p className="content-paragraph">
            Die voertuigen hebben geen cabine. Ze rijden &apos;s nachts zonder
            verlichting, want ze hebben geen ogen nodig. Ze rijden in het donker
            over een terrein zo groot als een dorp en tillen dozen van veertig
            ton naar plekken die een computer heeft uitgerekend.
          </p>
          <p className="content-paragraph">
            Ik ben geen havenman. Ik heb er gereden, ik heb ernaar gekeken, meer
            niet. Dus ik ben voorzichtig met oordelen over hoe goed deze haven
            is, want ik ken de andere niet.
          </p>
          <p className="content-paragraph">
            Maar ik heb ooit een Engelsman opgehaald die zijn werk in havens
            deed, over de hele wereld. China, Amerika, plekken waarvan ik de
            namen niet kende. Wat hij daar precies deed heb ik niet gevraagd,
            want dat vraag je niet. Wel weet ik wat hij zei, en dat is me
            bijgebleven: dat Rotterdam de meest geavanceerde haven is die hij
            kent. Zo modern, zo georganiseerd, zo doordacht.
          </p>
          <p className="content-paragraph">
            Als iemand die er honderd heeft gezien dat zegt, dan zit daar iets
            in.
          </p>
          <p className="content-paragraph">
            Voor een schrijver zit er ook iets anders in. Een haven die zichzelf
            bestuurt, is per definitie een haven waar niemand kijkt.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="doos-die-niemand-opent-heading"
        >
          <h2 id="doos-die-niemand-opent-heading" className="content-heading">
            De doos die niemand opent
          </h2>
          <p className="content-paragraph">
            Hier begint het deel dat mij als schrijver interesseerde, en dat
            uiteindelijk de motor van het boek werd.
          </p>
          <p className="content-paragraph">
            Door Rotterdam gaan miljoenen containers per jaar. Elke doos heeft
            papieren, elke doos heeft een bestemming, en de logistiek is erop
            gebouwd dat die doos zo kort mogelijk stilstaat. Tijd is geld, en
            een container die wacht kost iedereen in de keten iets.
          </p>
          <p className="content-paragraph">
            Slechts een klein deel van al die containers gaat daadwerkelijk door
            een scan. De Douane heeft zes containerscans in de Rotterdamse
            haven, verspreid over verschillende plekken, waar containers met
            röntgenapparatuur worden doorgelicht. De selectie gebeurt op basis
            van risicoanalyse: herkomst, lading, aangever, patronen. Wie precies
            wordt uitgekozen, is de uitkomst van een model.
          </p>
        </section>

        <figure className="content-section">
          <Image
            src={articleImages.scan.src}
            alt={articleImages.scan.alt}
            width={articleImages.scan.width}
            height={articleImages.scan.height}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 48rem"
            style={{ width: "100%", height: "auto", borderRadius: "2px" }}
          />
        </figure>

        <section className="content-section">
          <p className="content-paragraph">
            En dat model is de laatste jaren slimmer geworden. Er wordt gewerkt
            met algoritmes die op een scanbeeld zelf proberen te herkennen wat
            er in een doos zit, voor drugs, wapens en sigaretten. Niet iedereen
            in het vak is ervan overtuigd dat die algoritmes betrouwbaar genoeg
            zijn. Een scanbeeld is geen foto. Het is een grijze massa waarin een
            geoefend oog vormen herkent, en waarin water en pasta er ongeveer
            hetzelfde uitzien.
          </p>
          <p className="content-paragraph">
            Wat mij pakte, is het gat dat daartussen zit.
          </p>
          <p className="content-paragraph">
            Voordat de Douane een container kan scannen, staat die een tijd in
            een stack tussen andere containers. Dat geeft zogenoemde uithalers
            de gelegenheid om verstopte lading eruit te halen voordat er ook
            maar iets is gecontroleerd. De Douane werkt aan een oplossing
            waarbij geselecteerde containers naar afgeschermd terrein worden
            gebracht, maar dat is logistiek lastig, juist omdat die terminals zo
            vergaand geautomatiseerd zijn. Een machine die op maximale
            doorstroming is gebouwd, laat zich niet makkelijk vertragen.
          </p>
          <p className="content-paragraph">
            En er zijn drones, met warmtecamera&apos;s, die mensen zien lopen in
            de smalle gangen tussen de containers.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="waarom-thriller-heading"
        >
          <h2 id="waarom-thriller-heading" className="content-heading">
            Waarom dit een thriller werd en geen reisverhaal
          </h2>
          <p className="content-paragraph">
            Volgens Europol komt ruim zeventig procent van alle cocaïne die
            Europa binnenkomt binnen via de havens van Antwerpen en Rotterdam.
            Dat cijfer kent bijna iedereen inmiddels. Wat minder mensen zich
            realiseren, is dat een route die werkt voor het ene, ook werkt voor
            het andere. Een container maakt geen onderscheid tussen wat erin
            zit.
          </p>
          <p className="content-paragraph">
            Dat is het uitgangspunt van <em>Schaduwen over Domburg</em>. Niet de
            drugs, want dat verhaal is verteld. Maar dezelfde infrastructuur,
            dezelfde papieren die kloppen, dezelfde stilzwijgende afspraak dat
            je niet vraagt wat er in de doos zit. Iemand moet van A naar B.
            Waarom, dat is jouw zaak niet.
          </p>
          <p className="content-paragraph">
            En aan de andere kant van het land een strand in Zeeland waar niets
            gebeurt, en waar precies daarom iets kan gebeuren.
          </p>
          <p className="content-paragraph">
            De haven en de Zeeuwse kust liggen dichter bij elkaar dan mensen
            denken. Vanaf de Maasvlakte kijk je uit over dezelfde zee. Het water
            dat langs Hoek van Holland naar buiten gaat, gaat langs Walcheren
            naar beneden. Voor mijn hoofdpersoon is dat geen metafoor maar een
            reistijd.
          </p>
        </section>

        <figure className="content-section">
          <Image
            src={articleImages.kering.src}
            alt={articleImages.kering.alt}
            width={articleImages.kering.width}
            height={articleImages.kering.height}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 48rem"
            style={{ width: "100%", height: "auto", borderRadius: "2px" }}
          />
        </figure>

        <section className="content-section">
          <p className="content-paragraph">
            Er komt een scène in het boek voor die zich afspeelt op precies het
            traject dat de Spido vaart. Ik ga niet zeggen welke.
          </p>
        </section>

        <FirstChapterCTA source="haven-van-rotterdam" />

        <section
          className="content-section"
          aria-labelledby="zelf-gaan-kijken-heading"
        >
          <h2 id="zelf-gaan-kijken-heading" className="content-heading">
            Zelf gaan kijken
          </h2>
          <p className="content-paragraph">
            De havenrondvaart vertrekt bij de Boompjeskade, vlak bij Leuvehaven.
            De korte tour vaart dagelijks. De lange tour naar de Maasvlakte
            vaart alleen in bepaalde periodes en kost een halve dag, dus check
            de actuele tijden en tarieven op de site van de rederij zelf. Ik zet
            hier bewust geen prijzen neer, want die kloppen over een jaar niet
            meer.
          </p>
          <p className="content-paragraph">Drie dingen die ik zou meegeven.</p>
          <p className="content-paragraph">
            Ga aan dek zitten, ook als het waait, want binnen zie je de helft.
          </p>
          <p className="content-paragraph">
            Doe de lange tour als je de keuze hebt. De stadshaven is mooi, maar
            de Maasvlakte is het verhaal.
          </p>
          <p className="content-paragraph">
            En verwacht geen bezienswaardigheid. Dit is geen museum en geen
            uitzichtpunt. Het is een werkend gebied dat toevallig indrukwekkend
            is, en dat maakt het beter dan de meeste dingen die zijn gebouwd om
            indruk te maken.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="verder-lezen-haven-heading"
        >
          <h2 id="verder-lezen-haven-heading" className="content-heading">
            Verder lezen over de haven
          </h2>
          <p className="content-paragraph">
            Ik heb voor dit boek veel gelezen over de haven, van
            havengeschiedenis tot boeken over de logistiek zelf. Een selectie
            daarvan staat in mijn overzicht van{" "}
            <Link href="/boeken-over-rotterdam">boeken over Rotterdam</Link>,
            samen met de romans die deze stad goed vangen.
          </p>
          <p className="content-paragraph">
            En als je wilt weten hoe de andere kant van het verhaal eruitziet,
            de Zeeuwse kant: daar schreef ik apart over in{" "}
            <Link href="/domburg">
              Domburg: het badplaatsje achter het boek
            </Link>
            .
          </p>
        </section>
      </div>

      <div className="container content-page content-page--footer">
        <RelatedGuides
          title="Verder lezen"
          guides={[
            {
              href: "/boeken/schaduwen-over-domburg",
              label: "Schaduwen over Domburg",
              description:
                "Een literaire thriller van de Zeeuwse kust tot in de Rotterdamse haven",
            },
            {
              href: "/boeken-over-rotterdam",
              label: "Boeken over Rotterdam",
              description:
                "Romans, thrillers en reisgidsen die bij deze stad horen",
            },
            {
              href: "/domburg",
              label: "Domburg",
              description: "Het badplaatsje achter het boek, aan de Zeeuwse kant",
            },
            {
              href: "/over-de-auteur",
              label: "Over Ard Breure",
              description: "De auteur achter deze gids, opgegroeid in Zeeland",
            },
          ]}
        />

        <section className="content-section">
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
