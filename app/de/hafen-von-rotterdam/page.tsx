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
import { localeAlternates } from "@/lib/i18n";
import { breadcrumbSchema, buildJsonLd } from "@/lib/schema";

const pagePath = "/de/hafen-von-rotterdam";
const dutchPath = "/haven-van-rotterdam";
const pageHeadline = "Der Hafen von Rotterdam, vom Wasser aus gesehen";
const pageTitle = `Der Hafen von Rotterdam vom Wasser aus | ${siteConfig.name}`;
const pageDescription =
  "Sieben Jahre lang fuhr ich Taxi im Hafen von Rotterdam. Was Sie sehen, wenn Sie selbst hinfahren, und warum mein Thriller hier beginnt.";
const datePublished = "2026-08-30";
const dateModified = "2026-08-30";

const articleImages = {
  hero: {
    src: "/images/blog/haven-rotterdam-hero.webp",
    alt: "Eine Reihe von Containerkränen am Kai im Hafen von Rotterdam zur blauen Stunde",
    width: 1672,
    height: 941,
  },
  kranen: {
    src: "/images/blog/haven-rotterdam-kranen-maasvlakte.jpg",
    alt: "Das flache aufgespülte Land der Maasvlakte 2, mit Windrädern entlang des Deiches und Containerterminals am Horizont",
    width: 1536,
    height: 1021,
  },
  scan: {
    src: "/images/blog/haven-rotterdam-containerscan.webp",
    alt: "Ein Seecontainer in einem Röntgenscanner des Zolls im Hafen von Rotterdam",
    width: 1622,
    height: 969,
  },
  kering: {
    src: "/images/blog/haven-rotterdam-maeslantkering.jpg",
    alt: "Die geschlossene Maeslantkering bei Hoek van Holland, die den Nieuwe Waterweg von der Nordsee abschließt",
    width: 1668,
    height: 943,
  },
} as const;

export const metadata: Metadata = buildMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  type: "article",
  locale: "de_DE",
  keywords: [
    "Hafen von Rotterdam",
    "Rotterdamer Hafen",
    "Hafenrundfahrt Rotterdam",
    "Maasvlakte",
    "Schatten über Domburg",
  ],
  languages: {
    ...localeAlternates(pagePath),
    "x-default": dutchPath,
  },
});

const breadcrumbs = [
  { name: "Home", path: "/de" },
  { name: "Hafen von Rotterdam", path: pagePath },
];

const articleSchema = {
  "@type": "Article",
  headline: pageHeadline,
  description: pageDescription,
  datePublished,
  dateModified,
  inLanguage: "de",
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

export default function HafenVonRotterdamPage() {
  const jsonLd = buildJsonLd(articleSchema, breadcrumbSchema(breadcrumbs));

  return (
    <main lang="de">
      <JsonLd data={jsonLd} />
      <PageHeader
        eyebrow="Rotterdam"
        title={pageHeadline}
        description={`Von Ard Breure, Autor von Schatten über Domburg. Zuletzt aktualisiert ${formatBlogDate(dateModified, "de")}`}
      />

      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} locale="de" />

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
            Ich musste den Hafen von Rotterdam nie suchen. Er war immer schon
            da.
          </p>
          <p className="content-paragraph">
            Wer sein ganzes Leben hier wohnt, für den ist der Hafen kein
            Ausflugsziel. Er ist der Hintergrund. Man sieht die Kräne entlang
            der A15. Man sieht die Lastwagen, Tag und Nacht, auf jeder
            Ausfallstraße. Man weiß, dass irgendwo hinter der letzten Abfahrt
            etwas liegt, das größer ist als die Stadt selbst. Das ist normal,
            bis man selbst hineinfährt.
          </p>
          <p className="content-paragraph">
            Sieben Jahre lang habe ich Taxi im Hafen gefahren. Meine Fahrgäste
            waren Lotsen, Techniker, Leute aus den Öltanklagern, Händler,
            Schiffsoffiziere und Lokführer, die mit einem Güterzug Richtung
            Deutschland unterwegs waren und manchmal am selben Morgen über
            Schiphol eingeflogen wurden. Meistens brachte ich sie zu einem
            Bahnhof. Manchmal fuhr ich sie über die Grenze oder holte sie dort
            ab.
          </p>
          <p className="content-paragraph">
            Diese Arbeit gab mir etwas, das man mit einer Tageskarte nicht
            kaufen kann: Zugang. Der größte Teil des Hafens liegt hinter Zäunen.
            Man darf nicht hinein, man kommt nicht hinein, und das ist auch gut
            so. Mit einem Taxi kam ich hinein, denn jemand musste abgeholt
            werden, und dieser Jemand stand nicht am Tor.
          </p>
          <p className="content-paragraph">
            Was im Auto geschah, war ebenso wichtig. Menschen reden im Taxi. Sie
            reden, weil man kein Kollege ist, kein Vorgesetzter, kein
            Konkurrent. Man ist der Mann, der sie nach Hause bringt. Jemand muss
            von A nach B, und warum, das geht Sie nichts an. Man fragt auch
            nicht.
          </p>
          <p className="content-paragraph">
            Genau so funktioniert der Hafen selbst, auch wenn ich das damals
            noch nicht sah.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="sechzig-kilometer-heading"
        >
          <h2 id="sechzig-kilometer-heading" className="content-heading">
            Sechzig Kilometer Hafen
          </h2>
          <p className="content-paragraph">
            Das Erste, was sich niemand richtig vorstellt, ist der Maßstab. Der
            Hafen von Rotterdam ist kein Kai mit ein paar Kränen. Es ist ein
            Gebiet von mehreren Dutzend Kilometern Länge, von den Stadthäfen bis
            weit hinter die Europoort, mit eigenen Straßen, eigenen Brücken,
            eigener Bahnstrecke. Man kann eine Stunde darin fahren, ohne den
            Rand zu erreichen.
          </p>
          <p className="content-paragraph">
            Und es ist niemals still. Das ist ein Missverständnis, das mir oft
            begegnet. Viele stellen sich einen modernen Hafen als etwas
            Geräuschloses vor. Das Gegenteil ist der Fall. Ständig fährt
            Verkehr, ständig wird geladen, ständig dreht sich etwas. Der Hafen
            steht nicht still, nicht nachts, nicht am Wochenende, nicht an
            Weihnachten.
          </p>
          <p className="content-paragraph">
            Ich habe einmal eine Adresse in ein Navigationsgerät eingegeben,
            damals, als Navigation im Auto gerade erst üblich wurde. Die Schilder
            an der Straße wiesen geradeaus, also fuhr ich geradeaus. Auf dem
            Display neben mir fuhr ich quer durch die Nordsee. Alles blau.
          </p>
          <p className="content-paragraph">
            Ich fuhr über die Maasvlakte 2, aufgespültes Land, so neu, dass die
            Karten es noch nicht wussten. Das ist der Hafen in einem einzigen
            Bild: er wächst schneller, als die Verwaltung ihm folgen kann. Man
            fährt über Boden, der auf dem Papier noch Wasser ist.
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
          aria-labelledby="vom-wasser-heading"
        >
          <h2 id="vom-wasser-heading" className="content-heading">
            Was Sie vom Wasser aus sehen
          </h2>
          <p className="content-paragraph">
            Wenn Sie das selbst sehen wollen, ist das Wasser der beste Platz.
            Von der Straße aus sehen Sie Zäune. Vom Wasser aus sehen Sie den
            Hafen.
          </p>
          <p className="content-paragraph">
            Die normale Hafenrundfahrt mit der Spido dauert fünfundsiebzig
            Minuten und bleibt in den Stadthäfen. Sie fahren unter der
            Erasmusbrug hindurch, am Kop van Zuid entlang, vorbei an den Werften
            und der Binnenschifffahrt. Das ist die Tour, die die meisten
            Besucher machen, und für einen ersten Eindruck ist sie gut.
          </p>
          <p className="content-paragraph">
            Aber die Fahrt, die Sie machen sollten, wenn Sie sehen wollen, wo es
            wirklich geschieht, ist die lange. Sie fährt den Nieuwe Waterweg
            hinunter, an der Maeslantkering vorbei, an Hoek van Holland vorbei,
            durch die Europoort, bis zur Maasvlakte. Dort arbeitet der Hafen,
            von dem Europa lebt.
          </p>
          <p className="content-paragraph">
            Der Unterschied zwischen diesen beiden Fahrten ist der Unterschied
            zwischen einer Stadt und einer Maschine.
          </p>
          <p className="content-paragraph">
            In den Stadthäfen ist alles noch auf menschlichem Maß. Schuppen,
            Kais, ein Kran, dem Sie mit den Augen folgen können. Auf der
            Maasvlakte stimmt das Maß nicht mehr. Die Schiffe sind so groß, dass
            Sie Entfernungen falsch einschätzen. Ein Containerschiff, das einen
            Kilometer entfernt liegt, wirkt nah. Ein Kran, der klein aussieht,
            ist sechzig Meter hoch.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="hafen-ohne-menschen-heading"
        >
          <h2 id="hafen-ohne-menschen-heading" className="content-heading">
            Ein Hafen ohne Menschen
          </h2>
          <p className="content-paragraph">
            Die beiden Tiefseeterminals auf der Maasvlakte 2 sind weitgehend
            automatisiert. Der Hafen als Ganzes ist laut, aber innerhalb dieser
            umzäunten Zonen läuft kein Mensch.
          </p>
          <p className="content-paragraph">
            Bei APM Terminals, seit 2015 in Betrieb, sind etwa achtzig Prozent
            der Kranbewegungen automatisiert, und der manuelle Teil wird aus der
            Ferne ausgeführt. Die automatisierten Zonen sind vollständig
            umzäunt, damit Mensch und Maschine getrennt bleiben. Beim
            benachbarten Terminal von Rotterdam World Gateway ist das Bild
            dasselbe: fünfzig automatische Stapelkräne, die aus der Ferne
            bedient werden, und neunundfünfzig fahrerlose Transportfahrzeuge,
            die die Container über das Gelände fahren.
          </p>
          <p className="content-paragraph">
            Diese Fahrzeuge haben keine Kabine. Sie fahren nachts ohne
            Beleuchtung, denn sie brauchen keine Augen. Sie fahren im Dunkeln
            über ein Gelände so groß wie ein Dorf und heben Kisten von vierzig
            Tonnen an Stellen, die ein Computer berechnet hat.
          </p>
          <p className="content-paragraph">
            Ich bin kein Hafenfachmann. Ich bin dort gefahren, ich habe
            hingesehen, mehr nicht. Deshalb bin ich vorsichtig mit Urteilen
            darüber, wie gut dieser Hafen ist, denn ich kenne die anderen nicht.
          </p>
          <p className="content-paragraph">
            Aber ich habe einmal einen Engländer abgeholt, dessen Arbeit ihn in
            Häfen auf der ganzen Welt führte. China, Amerika, Orte, deren Namen
            ich nicht kannte. Was er dort genau tat, habe ich nie gefragt, denn
            das fragt man nicht. Was ich weiß, ist, was er sagte, und das ist
            mir geblieben: dass Rotterdam der fortschrittlichste Hafen sei, den
            er kenne. So modern, so organisiert, so durchdacht.
          </p>
          <p className="content-paragraph">
            Wenn das jemand sagt, der hundert davon gesehen hat, dann ist etwas
            dran.
          </p>
          <p className="content-paragraph">
            Für einen Schriftsteller steckt noch etwas anderes darin. Ein Hafen,
            der sich selbst steuert, ist per Definition ein Hafen, in dem
            niemand hinsieht.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="kiste-die-niemand-oeffnet-heading"
        >
          <h2 id="kiste-die-niemand-oeffnet-heading" className="content-heading">
            Die Kiste, die niemand öffnet
          </h2>
          <p className="content-paragraph">
            Hier beginnt der Teil, der mich als Schriftsteller interessierte und
            der am Ende zum Motor des Buches wurde.
          </p>
          <p className="content-paragraph">
            Durch Rotterdam gehen Millionen Container pro Jahr. Jede Kiste hat
            Papiere, jede Kiste hat ein Ziel, und die Logistik ist darauf
            gebaut, dass diese Kiste so kurz wie möglich stillsteht. Zeit ist
            Geld, und ein wartender Container kostet jeden in der Kette etwas.
          </p>
          <p className="content-paragraph">
            Nur ein kleiner Teil all dieser Container geht tatsächlich durch
            einen Scanner. Der niederländische Zoll betreibt sechs
            Containerscanner im Rotterdamer Hafen, verteilt auf verschiedene
            Standorte, wo Container mit Röntgentechnik durchleuchtet werden. Die
            Auswahl erfolgt auf Basis einer Risikoanalyse: Herkunft, Ladung,
            Anmelder, Muster. Wer genau ausgewählt wird, ist das Ergebnis eines
            Modells.
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
            Und dieses Modell ist in den letzten Jahren klüger geworden. Es wird
            mit Algorithmen gearbeitet, die auf dem Scanbild selbst zu erkennen
            versuchen, was in einer Kiste ist, für Drogen, Waffen und
            Zigaretten. Nicht jeder im Fach ist davon überzeugt, dass diese
            Algorithmen zuverlässig genug sind. Ein Scanbild ist kein Foto. Es
            ist eine graue Masse, in der ein geübtes Auge Formen erkennt, und in
            der Wasser und Nudeln ungefähr gleich aussehen.
          </p>
          <p className="content-paragraph">
            Was mich gepackt hat, ist die Lücke dazwischen.
          </p>
          <p className="content-paragraph">
            Bevor der Zoll einen Container scannen kann, steht dieser eine Zeit
            lang in einem Stapel zwischen anderen Containern. Das gibt
            sogenannten Ausholern die Gelegenheit, versteckte Ladung
            herauszuholen, bevor überhaupt etwas kontrolliert wurde. Der Zoll
            arbeitet an einer Lösung, bei der ausgewählte Container auf
            abgeschirmtes Gelände gebracht werden, aber das ist logistisch
            schwierig, gerade weil diese Terminals so weitgehend automatisiert
            sind. Eine Maschine, die auf maximalen Durchsatz gebaut ist, lässt
            sich nicht leicht bremsen.
          </p>
          <p className="content-paragraph">
            Und es gibt Drohnen, mit Wärmebildkameras, die Menschen sehen, die
            in den schmalen Gängen zwischen den Containern gehen.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="warum-thriller-heading"
        >
          <h2 id="warum-thriller-heading" className="content-heading">
            Warum daraus ein Thriller wurde und keine Reisegeschichte
          </h2>
          <p className="content-paragraph">
            Laut Europol kommen über siebzig Prozent des gesamten Kokains, das
            nach Europa gelangt, über die Häfen von Antwerpen und Rotterdam
            herein. Diese Zahl kennt inzwischen fast jeder. Was weniger Menschen
            bedenken: eine Route, die für das eine funktioniert, funktioniert
            auch für das andere. Ein Container macht keinen Unterschied zwischen
            dem, was darin ist.
          </p>
          <p className="content-paragraph">
            Das ist der Ausgangspunkt von <em>Schatten über Domburg</em>. Nicht
            die Drogen, denn diese Geschichte ist erzählt. Sondern dieselbe
            Infrastruktur, dieselben Papiere, die stimmen, dieselbe
            stillschweigende Übereinkunft, dass man nicht fragt, was in der
            Kiste ist. Jemand muss von A nach B. Warum, das geht Sie nichts an.
          </p>
          <p className="content-paragraph">
            Und auf der anderen Seite des Landes ein Strand in Zeeland, an dem
            nichts geschieht, und an dem genau deshalb etwas geschehen kann.
          </p>
          <p className="content-paragraph">
            Der Hafen und die zeeländische Küste liegen näher beieinander, als
            man denkt. Von der Maasvlakte blicken Sie auf dasselbe Meer. Das
            Wasser, das bei Hoek van Holland hinausgeht, läuft an Walcheren
            hinunter. Für meine Hauptfigur ist das keine Metapher, sondern eine
            Fahrzeit.
          </p>
        </section>

        <BlogImagePlaceholder
          src={articleImages.kering.src}
          alt={articleImages.kering.alt}
          width={articleImages.kering.width}
          height={articleImages.kering.height}
        />

        <section className="content-section">
          <p className="content-paragraph">
            Es gibt eine Szene im Buch, die genau auf der Strecke spielt, die
            die Spido fährt. Welche, verrate ich nicht.
          </p>
        </section>

        <FirstChapterCTA source="hafen-von-rotterdam" locale="de" />

        <section
          className="content-section"
          aria-labelledby="selbst-hinfahren-heading"
        >
          <h2 id="selbst-hinfahren-heading" className="content-heading">
            Selbst hinfahren
          </h2>
          <p className="content-paragraph">
            Die Hafenrundfahrt startet an der Boompjeskade, nahe der Leuvehaven.
            Die kurze Tour fährt täglich. Die lange Tour zur Maasvlakte fährt
            nur in bestimmten Zeiträumen und dauert einen halben Tag, prüfen Sie
            die aktuellen Zeiten und Preise also auf der Seite der Reederei
            selbst. Ich setze hier bewusst keine Preise hin, denn die stimmen in
            einem Jahr nicht mehr.
          </p>
          <p className="content-paragraph">
            Drei Dinge, die ich Ihnen mitgeben würde.
          </p>
          <p className="content-paragraph">
            Setzen Sie sich an Deck, auch wenn es windig ist, denn drinnen sehen
            Sie die Hälfte.
          </p>
          <p className="content-paragraph">
            Machen Sie die lange Tour, wenn Sie die Wahl haben. Die Stadthäfen
            sind schön, aber die Maasvlakte ist die Geschichte.
          </p>
          <p className="content-paragraph">
            Und erwarten Sie keine Sehenswürdigkeit. Das ist kein Museum und
            kein Aussichtspunkt. Es ist ein arbeitendes Gebiet, das zufällig
            beeindruckend ist, und das macht es besser als die meisten Dinge,
            die gebaut wurden, um zu beeindrucken.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="weiterlesen-heading"
        >
          <h2 id="weiterlesen-heading" className="content-heading">
            Weiterlesen
          </h2>
          <p className="content-paragraph">
            Wenn Sie sehen möchten, wie die andere Seite der Geschichte
            aussieht, die zeeländische Seite, darüber habe ich gesondert
            geschrieben in{" "}
            <Link href="/de/domburg">
              Domburg: der Badeort hinter dem Buch
            </Link>
            .
          </p>
          <p className="content-paragraph">
            Und wenn Sie wissen möchten, worum es im Buch selbst geht:{" "}
            <Link href="/de/schatten-ueber-domburg">
              Schatten über Domburg
            </Link>
            .
          </p>
        </section>
      </div>

      <div className="container content-page content-page--footer">
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
              href: "/de/domburg",
              label: "Domburg",
              description: "Der Badeort hinter dem Buch, an der zeeländischen Küste",
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
