import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { FirstChapterCTA } from "@/components/FirstChapterCTA";
import { RelatedGuides } from "@/components/RelatedGuides";
import { formatBlogDate } from "@/data/blog";
import { author, siteConfig } from "@/lib/site";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, buildJsonLd } from "@/lib/schema";

interface ArticleImage {
  /** Public path, or null until a licensed/owned file is added. */
  src: string | null;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

function imageSrc(filename: string | null): string | null {
  return filename ? `/images/${filename}` : null;
}

function ArticleFigure({
  image,
  priority = false,
}: {
  image: ArticleImage;
  priority?: boolean;
}) {
  return (
    <figure className="content-section">
      {image.src ? (
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          priority={priority}
          fetchPriority={priority ? "high" : undefined}
          loading={priority ? undefined : "lazy"}
          sizes="(max-width: 768px) 100vw, 48rem"
          style={{ width: "100%", height: "auto", borderRadius: "2px" }}
        />
      ) : (
        <div
          className="article-figure-placeholder"
          role="img"
          aria-label={image.alt}
          style={{ aspectRatio: `${image.width} / ${image.height}` }}
        >
          {image.alt}
        </div>
      )}
      {image.caption ? (
        <figcaption className="content-meta">{image.caption}</figcaption>
      ) : null}
    </figure>
  );
}

const pagePath = "/domburg";
const englishPath = "/en/domburg";
const pageHeadline = "Domburg: het badplaatsje achter Schaduwen over Domburg";
const pageTitle = `${pageHeadline} | ${siteConfig.name}`;
const pageDescription =
  "Domburg is de oudste badplaats van Zeeland. Mondain, winderig en vol geschiedenis. Ontdek het dorp achter de thriller Schaduwen over Domburg.";
const datePublished = "2026-08-21";
const dateModified = "2026-08-21";

/**
 * Vul de bestandsnaam in. Bestanden komen in /public/images/.
 * Voorbeeld: golf: "domburg-grasbunkers.webp"
 */
const imageFiles: Record<
  "hero" | "pavilion" | "golf" | "beach" | "watertower",
  string | null
> = {
  hero: "paalhoofden-domburg-strand-november.webp",
  pavilion: "badpaviljoen-domburg-hoge-hil.webp",
  golf: "golfbaan-domburg-bunkers-bomkraters.webp",
  beach: "strandovergang-domburg-november.webp",
  watertower: "watertoren-domburg-boulevard-van-schagen.webp",
};

const articleImages = {
  hero: {
    src: imageSrc(imageFiles.hero),
    alt: "Paalhoofden op het strand van Domburg in november, dubbele palenrij richting de Noordzee",
    width: 1672,
    height: 941,
    caption:
      "Paalhoofden op het strand van Domburg in november, dubbele palenrij richting de Noordzee",
  },
  pavilion: {
    src: imageSrc(imageFiles.pavilion),
    alt: "Het Badpaviljoen van Domburg uit 1889 op het duin, met witte veranda's en hoektoren met lantaarn",
    width: 1536,
    height: 1021,
    caption: "Het Badpaviljoen (1889), middelpunt van het mondaine Domburg",
  },
  golf: {
    src: imageSrc(imageFiles.golf),
    alt: "Het gepokte terrein van de Domburgsche Golfclub, waar de bunkers uit bomkraters zijn ontstaan",
    width: 1672,
    height: 941,
    caption:
      "De baan van de Domburgsche, waar 437 bomkraters littekens in het land achterlieten",
  },
  beach: {
    src: imageSrc(imageFiles.beach),
    alt: "Strandovergang tussen de duinen bij Domburg onder een grijze novemberlucht",
    width: 1537,
    height: 1023,
    caption:
      "De strandovergang aan de stille kant van Domburg: waar het verhaal begint",
  },
  watertower: {
    src: imageSrc(imageFiles.watertower),
    alt: "De watertoren van Domburg tussen de duinen en de zee",
    width: 1668,
    height: 943,
    caption: "De watertoren, stille wachter tussen dorp en zee",
  },
} as const satisfies Record<string, ArticleImage>;

const heroImage = articleImages.hero;

export const metadata: Metadata = buildMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  type: "article",
  ...(heroImage.src
    ? {
        image: heroImage.src,
        imageAlt: heroImage.alt,
        imageWidth: heroImage.width,
        imageHeight: heroImage.height,
        imageType: "image/webp",
      }
    : {}),
  keywords: [
    "Domburg",
    "Schaduwen over Domburg",
    "Zeeland",
    "badplaats Domburg",
    "Domburgsche Golfclub",
  ],
  languages: {
    nl: pagePath,
    en: englishPath,
    "x-default": englishPath,
  },
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
  { name: "Domburg", path: pagePath },
];

const articleSchema = {
  "@type": "Article",
  headline: pageHeadline,
  description: pageDescription,
  datePublished,
  dateModified,
  inLanguage: "nl",
  ...(heroImage.src ? { image: absoluteUrl(heroImage.src) } : {}),
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

export default function DomburgPage() {
  const jsonLd = buildJsonLd(articleSchema, breadcrumbSchema(breadcrumbs));

  return (
    <main>
      <JsonLd data={jsonLd} />
      <PageHeader
        eyebrow="Zeeland"
        title={pageHeadline}
        description={`Door Ard Breure, auteur van Schaduwen over Domburg · Laatst bijgewerkt ${formatBlogDate(dateModified)}`}
      />

      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} />

        <ArticleFigure image={articleImages.hero} priority />

        <section className="content-section">
          <p className="content-paragraph">
            Wie Domburg alleen in augustus kent, kent het niet. In november, als
            de strandcabines van het strand zijn gehaald en de wind door de
            Manteling trekt, is het een ander dorp: stiller, kaler, met de zee
            als enige geluid. Dat Domburg, het Domburg buiten het seizoen, is
            het decor van mijn thriller{" "}
            <Link href="/boeken/schaduwen-over-domburg">
              <em>Schaduwen over Domburg</em>
            </Link>
            . Dit is het dorp zoals ik het ken, en waarom het om een verhaal
            vroeg.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="oudste-badplaats-heading"
        >
          <h2 id="oudste-badplaats-heading" className="content-heading">
            De oudste badplaats van Zeeland
          </h2>
          <p className="content-paragraph">
            Domburg ligt op de noordwestpunt van Walcheren, met de rug naar het
            land en het gezicht naar zee. Alleen Westkapelle steekt verder de
            Noordzee in. Die ligging bepaalt alles: het licht, de wind, en de
            geschiedenis die hier steeds opnieuw aanspoelde. Soms letterlijk. Na
            een najaarsstorm in de zeventiende eeuw kwamen op het strand
            altaarstenen tevoorschijn van Nehalennia, de zeegodin die hier in de
            Romeinse tijd werd vereerd door schippers die een behouden overtocht
            afsmeekten. De zee geeft bij Domburg af en toe iets terug. Daar
            begint mijn boek.
          </p>
          <p className="content-paragraph">
            Al in de negentiende eeuw kwamen de eerste badgasten: adel,
            gefortuneerde families, kuurgangers die geloofden in de heilzame
            werking van zeelucht en zeewater. Het Badhotel werd het middelpunt
            van dat mondaine leven, en dat is het in zekere zin nog steeds.
            Domburg had standing toen de rest van de Zeeuwse kust nog vissersdorp
            was.
          </p>
        </section>

        <ArticleFigure image={articleImages.pavilion} />

        <section
          className="content-section"
          aria-labelledby="toorop-mondriaan-heading"
        >
          <h2 id="toorop-mondriaan-heading" className="content-heading">
            Het licht van Toorop en Mondriaan
          </h2>
          <p className="content-paragraph">
            Rond 1900 streek in Domburg een kunstenaarskolonie neer rond Jan
            Toorop. Piet Mondriaan schilderde er zijn duinen en zijn vuurtoren,
            op weg naar de abstractie die hem wereldberoemd zou maken. Het kleine{" "}
            <a href="https://marietakmuseum.nl/" target="_blank" rel="noopener">
              Toorop-paviljoen
            </a>{" "}
            in het dorp herinnert er nog aan.
          </p>
          <p className="content-paragraph">
            Kunstenaars zien iets eerder dan anderen. Wat zij hier vonden, dat
            harde en heldere Zeeuwse licht boven een landschap zonder versiering,
            is precies wat een verhaal nodig heeft. Een decor dat niets verbergt
            en juist daardoor alles kan verbergen.
          </p>
        </section>

        <section className="content-section" aria-labelledby="golfbaan-heading">
          <h2 id="golfbaan-heading" className="content-heading">
            De golfbaan met 437 littekens
          </h2>
          <p className="content-paragraph">
            Aan de rand van het dorp, in de duinen, ligt de{" "}
            <a
              href="https://www.domburgschegolfclub.nl/clubinfo/historie"
              target="_blank"
              rel="noopener"
            >
              Domburgsche Golfclub
            </a>
            . Aangelegd in 1914, de oudste golfbaan van Nederland die nog in
            zijn oorspronkelijke vorm wordt bespeeld. Voor de oorlog liepen de
            caddies er in Walcherse klederdracht.
          </p>
          <p className="content-paragraph">
            Toen kwam september 1941. De Duitse bezetter vorderde het terrein
            en bouwde de baan vol met betonnen bunkers en een kustbatterij.
            Domburg werd een schakel in de Atlantikwall. In de aanloop naar de
            landing bij Westkapelle bombardeerden de geallieerden die batterij,
            en heel gericht ook de Westkapelse zeedijk. Dat was tactiek: door
            het gat in de dijk liep Walcheren onder en stond de Duitse
            verdediging letterlijk in het water. Het eiland betaalde de prijs
            van zijn eigen bevrijding. Het zoute water stond er meer dan een
            jaar. Op de golfbaan vielen honderden bommen. Pas in 1955 kon er
            weer gespeeld worden.
          </p>
          <p className="content-paragraph">
            Bij het herstel deed de club iets opmerkelijks. De bomkraters, 437
            in totaal, werden niet dichtgegooid maar omgevormd tot grasbunkers,
            de verdiepte hindernissen die golfers kennen. Ze liggen er nog, en
            vanuit de lucht zijn de kraters goed te zien. De Duitsers bouwden er
            hun betonnen bunkers. De geallieerde bommen sloegen er kraters. En
            van die kraters maakte de club bunkers in de golfbetekenis van het
            woord, zodat op deze baan het onschuldigste woord uit het golfjargon
            een oorlog in zich draagt.
          </p>
          <p className="content-paragraph">
            Dat is Domburg in het klein: een vriendelijk oppervlak waaronder de
            geschiedenis nooit helemaal is weggezakt. Toen ik een plek zocht
            waar een thriller kon beginnen, hoefde ik niet ver te zoeken.
          </p>
        </section>

        <ArticleFigure image={articleImages.golf} />

        <section className="content-section" aria-labelledby="duitsers-heading">
          <h2 id="duitsers-heading" className="content-heading">
            Wind, regen, wind, Duitsers
          </h2>
          <p className="content-paragraph">
            Wie vandaag door Domburg loopt, hoort meer Duits dan Nederlands. Ze
            komen vooral uit Nordrhein-Westfalen, uit het Ruhrgebied. Voor wie
            in Essen of Dortmund woont, is de Zeeuwse kust dichterbij dan de
            Duitse. En ze komen niet voor het weer. Ze komen ondanks het weer,
            voor wat ze zelf frische Luft noemen: de prikkelende zeelucht waarmee
            Domburg ooit als kuuroord begon. De cirkel is rond. De kuurgasten
            van 1880 en de gezinnen van nu zoeken hier hetzelfde.
          </p>
          <p className="content-paragraph">
            Er zit een diepere laag onder. Luttele jaren na de oorlog, nog met
            de bunkers in de duinen, hingen in de Zeeuwse kustdorpen alweer
            bordjes achter de ramen: <em>Zimmer frei</em>. Boerenkinderen sliepen
            &apos;s zomers in de schuur zodat hun slaapkamer verhuurd kon worden
            aan Duitse gasten. Geen wrok, geen groot gebaar, gewoon verder.
            Nuchterder dan dat wordt het niet, en Zeeuwser ook niet.
          </p>
        </section>

        <ArticleFigure image={articleImages.beach} />

        <section
          className="content-section"
          aria-labelledby="boulevard-heading"
        >
          <h2 id="boulevard-heading" className="content-heading">
            De Boulevard van Schagen en de watertoren
          </h2>
          <p className="content-paragraph">
            Domburg heeft geen boulevard zoals Vlissingen die heeft. Wat het wel
            heeft, is de Boulevard van Schagen: een smal duinpad met een deftige
            naam, dat boven over de duinen slingert, met het dorp aan de ene
            kant en over het duin de zee. Onderweg passeer je het bankje van
            Nehalennia en kijk je uit over de paalhoofden, de rijen zwarte palen
            die om de paar honderd meter het strand insteken en die de schilders
            van 1900 al vastlegden. Aan het oostelijke eind rijst de watertoren
            op, zo dicht bij de duinen dat de strandvakken eronder gewoon
            &quot;Watertoren&quot; heten.
          </p>
          <p className="content-paragraph">
            Wie hier in november loopt, alleen, met de wind vol op de jas,
            begrijpt waarom dit pad in mijn boek terechtkwam.
          </p>
        </section>

        <ArticleFigure image={articleImages.watertower} />

        <section
          className="content-section"
          aria-labelledby="domburg-bezoeken-heading"
        >
          <h2 id="domburg-bezoeken-heading" className="content-heading">
            Domburg bezoeken
          </h2>
          <p className="content-paragraph">
            Praktisch, voor wie het dorp zelf wil zien: Domburg ligt op ruim een
            uur rijden van Rotterdam. Het strand behoort tot de schoonste van
            Nederland, het dorp is compact en autoluw. Het Toorop-paviljoen en{" "}
            <a href="https://terramaris.nl/" target="_blank" rel="noopener">
              museum Terra Maris
            </a>{" "}
            in de Manteling bij Oostkapelle geven de geschiedenis context, de
            Domburgsche Golfclub is voor spelers een bedevaartsoord. En wie het
            echte Domburg wil zien, komt buiten het seizoen. Oktober, november,
            als de badgasten weg zijn en het dorp weer van zichzelf is.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="domburg-van-het-boek-heading"
        >
          <h2 id="domburg-van-het-boek-heading" className="content-heading">
            Het Domburg van het boek
          </h2>
          <p className="content-paragraph">
            In{" "}
            <Link href="/boeken/schaduwen-over-domburg">
              <em>Schaduwen over Domburg</em>
            </Link>{" "}
            is het dorp meer dan decor. Het begint op het strand onder de
            watertoren, op een novemberochtend, bij een paalhoofd waar de zee
            iets heeft achtergelaten. Het Badhotel, de oude golfbaan met haar
            geschiedenis, de duinpaden buiten het seizoen: het zijn de plekken
            waar mijn hoofdpersoon ontdekt dat de rust van een badplaats
            bedrieglijk kan zijn, en dat de lijnen tussen de Zeeuwse kust en de
            Rotterdamse haven korter zijn dan ze lijken.
          </p>
        </section>
      </div>

      <div className="container content-page content-page--footer">
        <FirstChapterCTA source="domburg" />

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
              href: "/boeken-over-zeeland",
              label: "Boeken over Zeeland",
              description:
                "Romans, thrillers en reisgidsen die bij deze provincie horen",
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
