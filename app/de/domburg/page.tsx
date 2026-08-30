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
import { localeAlternates } from "@/lib/i18n";
import { breadcrumbSchema, buildJsonLd } from "@/lib/schema";

interface ArticleImage {
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

const pagePath = "/de/domburg";
const pageHeadline = "Domburg: der Badeort hinter Schatten über Domburg";
const pageTitle = "Domburg | Zeeland Krimi | Breure Media";
const pageDescription =
  "Domburg ist der älteste Badeort Zeelands. Kein breiter Strandboulevard, ein schmaler Dünenpfad. Schauplatz des Zeeland Krimis Schatten über Domburg.";
const datePublished = "2026-08-21";
const dateModified = "2026-08-21";

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
    alt: "Paalhoofden am Strand von Domburg im November, doppelte Pfahlreihe zur Nordsee",
    width: 1672,
    height: 941,
    caption:
      "Paalhoofden am Strand von Domburg im November, doppelte Pfahlreihe zur Nordsee",
  },
  pavilion: {
    src: imageSrc(imageFiles.pavilion),
    alt: "Das Badpaviljoen von Domburg (1889) auf der Düne, mit weißen Veranden und Eckturm mit Laterne",
    width: 1536,
    height: 1021,
    caption: "Das Badpaviljoen (1889), Mittelpunkt des mondänen Domburg",
  },
  golf: {
    src: imageSrc(imageFiles.golf),
    alt: "Das narbige Gelände der Domburgsche Golfclub, dessen Bunker aus Bombenkratern entstanden",
    width: 1672,
    height: 941,
    caption:
      "Die Bahn des Domburgsche Golfclub, wo 437 Bombenkrater Narben im Land hinterließen",
  },
  beach: {
    src: imageSrc(imageFiles.beach),
    alt: "Strandübergang zwischen den Dünen bei Domburg unter einem grauen Novemberhimmel",
    width: 1537,
    height: 1023,
    caption:
      "Der Strandübergang an der stillen Seite von Domburg: wo die Geschichte beginnt",
  },
  watertower: {
    src: imageSrc(imageFiles.watertower),
    alt: "Der Wasserturm von Domburg zwischen den Dünen und dem Meer",
    width: 1668,
    height: 943,
    caption: "Der Wasserturm, stiller Wächter zwischen Dorf und Meer",
  },
} as const satisfies Record<string, ArticleImage>;

const heroImage = articleImages.hero;

export const metadata: Metadata = buildMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  type: "article",
  locale: "de_DE",
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
    "Schatten über Domburg",
    "Zeeland",
    "Zeeland Krimi",
    "Domburg Roman",
    "Domburgsche Golfclub",
  ],
  languages: localeAlternates(pagePath),
});

const breadcrumbs = [
  { name: "Home", path: "/de" },
  { name: "Domburg", path: pagePath },
];

const articleSchema = {
  "@type": "Article",
  headline: pageHeadline,
  description: pageDescription,
  datePublished,
  dateModified,
  inLanguage: "de",
  ...(heroImage.src ? { image: absoluteUrl(heroImage.src) } : {}),
  author: {
    "@type": "Person",
    name: author.name,
    url: absoluteUrl("/de/ueber-den-autor"),
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

export default function GermanDomburgPage() {
  const jsonLd = buildJsonLd(articleSchema, breadcrumbSchema(breadcrumbs));

  return (
    <main lang="de">
      <JsonLd data={jsonLd} />
      <PageHeader
        eyebrow="Zeeland"
        title={pageHeadline}
        description={`Von Ard Breure, Autor von Schatten über Domburg. Zuletzt aktualisiert ${formatBlogDate(dateModified, "de")}`}
      />

      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} locale="de" />

        <ArticleFigure image={articleImages.hero} priority />

        <section className="content-section">
          <p className="content-paragraph">
            Wer Domburg nur im August kennt, kennt es nicht. Im November, wenn
            die Strandkabinen vom Strand geholt sind und der Wind durch den Wald
            der Manteling zieht, ist es ein anderes Dorf: stiller, kahler, mit
            dem Meer als einzigem Laut. Dieses Domburg, das Domburg außerhalb der
            Saison, ist der Schauplatz meines Thrillers{" "}
            <Link href="/de/schatten-ueber-domburg">
              <em>Schatten über Domburg</em>
            </Link>
            . So kenne ich den Ort, und deshalb hat er nach einer Geschichte
            verlangt.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="aeltester-badeort-heading"
        >
          <h2 id="aeltester-badeort-heading" className="content-heading">
            Der älteste Badeort Zeelands
          </h2>
          <p className="content-paragraph">
            Domburg liegt an der Nordwestspitze von Walcheren, mit dem Rücken
            zum Land und dem Gesicht zum Meer. Nur Westkapelle reicht weiter in
            die Nordsee. Diese Lage bestimmt alles: das Licht, den Wind, und die
            Geschichte, die hier immer wieder anlandete. Manchmal wörtlich.
            Nach einem Herbststurm im siebzehnten Jahrhundert kamen am Strand
            Altarsteine der Nehalennia zum Vorschein, der Meeresgöttin, die hier
            in römischer Zeit von Schiffern verehrt wurde, die um eine sichere
            Überfahrt baten. Das Meer gibt bei Domburg gelegentlich etwas
            zurück. Dort beginnt mein Buch.
          </p>
          <p className="content-paragraph">
            Schon im neunzehnten Jahrhundert kamen die ersten Badegäste: Adel,
            vermögende Familien, Kurgäste, die an die heilende Wirkung von
            Seeluft und Seewasser glaubten. Das Badhotel wurde der Mittelpunkt
            dieses mondänen Lebens, und in gewissem Sinn ist es das noch. Das
            heutige Badhotel ist ein Neubau von 1993. Nicht zu verwechseln mit
            dem Badpaviljoen (1889) im Stil der Neorenaissance, das auf der Düne
            steht. Domburg hatte Standing, als der Rest der zeeländischen Küste
            noch Fischerdorf war.
          </p>
        </section>

        <ArticleFigure image={articleImages.pavilion} />

        <section
          className="content-section"
          aria-labelledby="toorop-mondriaan-heading"
        >
          <h2 id="toorop-mondriaan-heading" className="content-heading">
            Das Licht von Toorop und Mondriaan
          </h2>
          <p className="content-paragraph">
            Um 1900 ließ sich in Domburg eine Künstlerkolonie um Jan Toorop
            nieder. Piet Mondriaan malte hier seine Dünen und seinen Leuchtturm,
            auf dem Weg zur Abstraktion, die ihn weltbekannt machen sollte. Das
            kleine{" "}
            <a href="https://marietakmuseum.nl/" target="_blank" rel="noopener">
              Toorop-paviljoen
            </a>{" "}
            im Dorf erinnert noch daran.
          </p>
          <p className="content-paragraph">
            Künstler sehen früher als andere. Was sie hier fanden, dieses harte
            und klare zeeländische Licht über einer Landschaft ohne Schmuck, ist
            genau das, was eine Geschichte braucht. Ein Schauplatz, der nichts
            verbirgt und gerade deshalb alles verbergen kann.
          </p>
        </section>

        <section className="content-section" aria-labelledby="golfplatz-heading">
          <h2 id="golfplatz-heading" className="content-heading">
            Der Golfplatz mit 437 Narben
          </h2>
          <p className="content-paragraph">
            Am Rand des Dorfes, in den Dünen, liegt der{" "}
            <a
              href="https://www.domburgschegolfclub.nl/clubinfo/historie"
              target="_blank"
              rel="noopener"
            >
              Domburgsche Golfclub
            </a>
            . Angelegt 1914, der älteste Golfplatz der Niederlande, der noch in
            seiner ursprünglichen Form gespielt wird. Vor dem Krieg liefen die
            Caddies dort in walcherscher Tracht.
          </p>
          <p className="content-paragraph">
            Dann kam der September 1941. Die deutsche Besatzung forderte das
            Gelände und baute den Platz voll mit betonierten Bunkern und einer
            Küstenbatterie. Domburg wurde ein Glied im Atlantikwall. Im Vorfeld
            der Landung bei Westkapelle bombardierten die Alliierten diese
            Batterie, und ganz gezielt auch den Deich von Westkapelle. Das war
            Taktik: durch die Lücke im Deich lief Walcheren voll, und die
            deutsche Verteidigung stand buchstäblich im Wasser. Die Insel
            zahlte den Preis der eigenen Befreiung. Das Salzwasser stand mehr
            als ein Jahr. Auf dem Golfplatz fielen Hunderte Bomben. Erst 1955
            konnte wieder gespielt werden.
          </p>
          <p className="content-paragraph">
            Beim Wiederaufbau tat der Club etwas Ungewöhnliches. Die
            Bombenkrater, 437 insgesamt, wurden nicht zugeschüttet, sondern zu
            Grasbunkern geformt, den vertieften Hindernissen, die Golfer kennen.
            Sie liegen noch da, und aus der Luft sind die Krater gut zu sehen.
            Die Deutschen bauten dort ihre betonierten Bunker. Die alliierten
            Bomben schlugen Krater. Und aus diesen Kratern machte der Club Bunker
            im golferischen Sinn, sodass auf diesem Platz das harmloseste Wort
            aus dem Golfjargon einen Krieg in sich trägt.
          </p>
          <p className="content-paragraph">
            Das ist Domburg im Kleinen: eine freundliche Oberfläche, unter der
            die Geschichte nie ganz versunken ist. Als ich einen Ort suchte, an
            dem ein Thriller beginnen konnte, musste ich nicht weit suchen.
          </p>
        </section>

        <ArticleFigure image={articleImages.golf} />

        <section className="content-section" aria-labelledby="wind-heading">
          <h2 id="wind-heading" className="content-heading">
            Wind, Regen, Wind, Gäste
          </h2>
          <p className="content-paragraph">
            Wer heute durch Domburg geht, hört oft mehr Deutsch als
            Niederländisch. Die Gäste kommen vor allem aus Nordrhein-Westfalen,
            aus dem Ruhrgebiet. Wenn Sie in Essen oder Dortmund wohnen, ist die
            zeeländische Küste näher als die deutsche. Und Sie kommen nicht
            wegen des Wetters. Sie kommen trotz des Wetters, für das, was Sie
            selbst frische Luft nennen: die stechende Seeluft, mit der Domburg
            einst als Kurort begann. Der Kreis schließt sich. Die Kurgäste von 1880 und
            die Familien von heute suchen hier dasselbe.
          </p>
          <p className="content-paragraph">
            Darunter liegt eine tiefere Schicht. Wenige Jahre nach dem Krieg,
            noch mit den Bunkern in den Dünen, hingen in den Küstenorten schon
            wieder Schilder hinter den Fenstern: <em>Zimmer frei</em>.
            Bauernkinder schliefen im Sommer in der Scheune, damit ihr Zimmer an
            deutsche Gäste vermietet werden konnte. Kein Groll, keine große
            Geste, einfach weiter. Nüchterner wird es nicht, und zeeländischer
            auch nicht.
          </p>
        </section>

        <ArticleFigure image={articleImages.beach} />

        <section
          className="content-section"
          aria-labelledby="boulevard-heading"
        >
          <h2 id="boulevard-heading" className="content-heading">
            Der Boulevard van Schagen und der Wasserturm
          </h2>
          <p className="content-paragraph">
            Domburg hat keinen Boulevard wie Vlissingen, keine breite
            Strandpromenade. Was es hat, ist der Boulevard van Schagen: ein
            schmaler Dünenpfad mit einem vornehmen Namen, der oben über die
            Dünen windet, mit dem Dorf auf der einen Seite und über die Düne das
            Meer. Unterwegs passieren Sie die Bank der Nehalennia und blicken
            auf die Paalhoofden, die für Zeeland typischen hölzernen
            Buhnenreihen: gerade, doppelte Reihen, senkrecht zur Küste, alle
            paar hundert Meter in den Strand gesetzt, und von den Malern um 1900
            schon festgehalten. Am östlichen Ende steigt der Wasserturm auf, so
            nah an den Dünen, dass die Strandabschnitte darunter schlicht
            &quot;Watertoren&quot; heißen.
          </p>
          <p className="content-paragraph">
            Wer hier im November geht, allein, mit dem Wind voll auf den Mantel,
            versteht, warum dieser Pfad in mein Buch gekommen ist.
          </p>
        </section>

        <ArticleFigure image={articleImages.watertower} />

        <section
          className="content-section"
          aria-labelledby="domburg-besuchen-heading"
        >
          <h2 id="domburg-besuchen-heading" className="content-heading">
            Domburg besuchen
          </h2>
          <p className="content-paragraph">
            Praktisch, wenn Sie den Ort selbst sehen wollen: Domburg liegt gut
            eine Stunde von Rotterdam. Der Strand zählt zu den saubersten der
            Niederlande, das Dorf ist kompakt und autoverkehrsarm. Das
            Toorop-paviljoen und{" "}
            <a href="https://terramaris.nl/" target="_blank" rel="noopener">
              Museum Terra Maris
            </a>{" "}
            in der Manteling bei Oostkapelle geben der Geschichte einen Rahmen,
            der Domburgsche Golfclub ist für Spieler ein Wallfahrtsort. Und wer
            das eigentliche Domburg sehen will, kommt außerhalb der Saison.
            Oktober, November, wenn die Badegäste weg sind und das Dorf wieder
            sich selbst gehört.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="domburg-im-buch-heading"
        >
          <h2 id="domburg-im-buch-heading" className="content-heading">
            Das Domburg des Buchs
          </h2>
          <p className="content-paragraph">
            In{" "}
            <Link href="/de/schatten-ueber-domburg">
              <em>Schatten über Domburg</em>
            </Link>{" "}
            ist der Ort mehr als Kulisse. Es beginnt am Strand unter dem
            Wasserturm, an einem Novembermorgen, an einem Paalhoofd, wo das Meer
            etwas hinterlassen hat. Das Badhotel, der alte Golfplatz mit seiner
            Geschichte, die Dünenpfade außerhalb der Saison: das sind die Orte,
            an denen mein Protagonist merkt, dass die Ruhe eines Badeorts
            täuschen kann, und dass die Linien zwischen der zeeländischen Küste
            und dem Rotterdamer Hafen kürzer sind, als sie scheinen. Wie dieser
            Hafen vom Wasser aus aussieht, habe ich in{" "}
            <Link href="/de/hafen-von-rotterdam">
              Der Hafen von Rotterdam, vom Wasser aus gesehen
            </Link>{" "}
            beschrieben.
          </p>
        </section>
      </div>

      <div className="container content-page content-page--footer">
        <FirstChapterCTA source="de-domburg" locale="de" />

        <RelatedGuides
          locale="de"
          guides={[
            {
              href: "/de/schatten-ueber-domburg",
              label: "Schatten über Domburg",
              description:
                "Ein literarischer Thriller von der zeeländischen Küste bis in den Rotterdamer Hafen",
            },
            {
              href: "/de/ueber-den-autor",
              label: "Über Ard Breure",
              description: "Der Autor hinter diesem Text, aufgewachsen in Zeeland",
            },
          ]}
        />

        <section className="content-section">
          <p className="content-meta">
            <em>
              Ard Breure ist der Autor des literarischen Thrillers{" "}
              <Link href="/de/schatten-ueber-domburg">
                Schatten über Domburg
              </Link>
              , der voraussichtlich im Herbst 2026 erscheint.
            </em>
          </p>
        </section>
      </div>
    </main>
  );
}
