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

const pagePath = "/en/domburg";
const dutchPath = "/domburg";
const pageHeadline = "Domburg: the seaside village behind Shadows over Domburg";
const pageTitle = `${pageHeadline} | ${siteConfig.name}`;
const pageDescription =
  "Domburg is the oldest seaside resort in Zeeland. Elegant, windswept and steeped in history. Discover the village behind the thriller Shadows over Domburg.";
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
    alt: "Wooden groynes (paalhoofden) on Domburg beach in November, a double row of poles reaching towards the North Sea",
    width: 1672,
    height: 941,
    caption:
      "Paalhoofden on Domburg beach in November: the rows of wooden poles reaching into the North Sea",
  },
  pavilion: {
    src: imageSrc(imageFiles.pavilion),
    alt: "The Badpaviljoen of Domburg, built in 1889 on the dune, with white verandas and a corner tower topped by a lantern",
    width: 1536,
    height: 1021,
    caption: "The Badpaviljoen (1889), centrepiece of fashionable Domburg",
  },
  golf: {
    src: imageSrc(imageFiles.golf),
    alt: "The pockmarked terrain of the Domburgsche Golf Club, where the bunkers were formed from bomb craters",
    width: 1672,
    height: 941,
    caption:
      "The course of the Domburgsche, where 437 bomb craters left their scars on the land",
  },
  beach: {
    src: imageSrc(imageFiles.beach),
    alt: "Beach access path between the dunes near Domburg under a grey November sky",
    width: 1537,
    height: 1023,
    caption:
      "The path over the dunes on the quiet side of Domburg: where the story begins",
  },
  watertower: {
    src: imageSrc(imageFiles.watertower),
    alt: "The water tower of Domburg between the dunes and the sea",
    width: 1668,
    height: 943,
    caption: "The water tower, silent sentinel between village and sea",
  },
} as const satisfies Record<string, ArticleImage>;

const heroImage = articleImages.hero;

export const metadata: Metadata = buildMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  type: "article",
  locale: "en_US",
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
    "Shadows over Domburg",
    "Zeeland",
    "Domburg seaside resort",
    "Domburgsche Golf Club",
    "Dutch coast",
  ],
  languages: {
    nl: dutchPath,
    en: pagePath,
    "x-default": pagePath,
  },
});

const breadcrumbs = [
  { name: "Home", path: "/en" },
  { name: "Blog", path: "/en/blog" },
  { name: "Domburg", path: pagePath },
];

const articleSchema = {
  "@type": "Article",
  headline: pageHeadline,
  description: pageDescription,
  datePublished,
  dateModified,
  inLanguage: "en",
  ...(heroImage.src ? { image: absoluteUrl(heroImage.src) } : {}),
  author: {
    "@type": "Person",
    name: author.name,
    url: absoluteUrl("/en/about"),
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
    <main lang="en">
      <JsonLd data={jsonLd} />
      <PageHeader
        eyebrow="Zeeland"
        title={pageHeadline}
        description={`By Ard Breure, author of Shadows over Domburg · Last updated ${formatBlogDate(dateModified, "en")}`}
      />

      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} />

        <ArticleFigure image={articleImages.hero} priority />

        <section className="content-section">
          <p className="content-paragraph">
            If you only know Domburg in August, you don&apos;t know it at all.
            In November, when the beach cabins have been taken off the sand and
            the wind pulls through the woods of the Manteling, it becomes a
            different village: quieter, barer, with the sea as the only sound.
            That Domburg, the Domburg out of season, is the setting of my
            thriller{" "}
            <Link href="/en/shadows-over-domburg">
              <em>Shadows over Domburg</em>
            </Link>
            . This is the village as I know it, and why it asked for a story.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="oldest-seaside-resort-heading"
        >
          <h2 id="oldest-seaside-resort-heading" className="content-heading">
            Zeeland&apos;s oldest seaside resort
          </h2>
          <p className="content-paragraph">
            Domburg sits on the north-western tip of Walcheren, its back to the
            land and its face to the sea. Only Westkapelle reaches further into
            the North Sea. That position determines everything: the light, the
            wind, and the history that keeps washing ashore here. Sometimes
            literally. After an autumn storm in the seventeenth century, altar
            stones emerged on the beach, dedicated to Nehalennia, the sea
            goddess worshipped here in Roman times by skippers praying for a
            safe crossing. Every so often, the sea at Domburg gives something
            back. That is where my book begins.
          </p>
          <p className="content-paragraph">
            The first bathing guests arrived as early as the nineteenth
            century: aristocrats, families of means, health-seekers who believed
            in the restorative power of sea air and salt water. The Badhotel
            became the centre of that fashionable world, and in a sense it still
            is. Domburg had standing when the rest of the Zeeland coast was
            still fishing villages.
          </p>
        </section>

        <ArticleFigure image={articleImages.pavilion} />

        <section
          className="content-section"
          aria-labelledby="toorop-mondrian-heading"
        >
          <h2 id="toorop-mondrian-heading" className="content-heading">
            The light of Toorop and Mondrian
          </h2>
          <p className="content-paragraph">
            Around 1900, an artists&apos; colony settled in Domburg around Jan
            Toorop. Piet Mondrian painted his dunes and his lighthouse here, on
            his way to the abstraction that would make him world-famous. The
            small{" "}
            <a href="https://marietakmuseum.nl/" target="_blank" rel="noopener">
              Toorop Pavilion
            </a>{" "}
            in the village still remembers them.
          </p>
          <p className="content-paragraph">
            Artists see things a little earlier than the rest of us. What they
            found here, that hard, clear Zeeland light over a landscape without
            ornament, is exactly what a story needs. A setting that hides
            nothing, and for that very reason can hide everything.
          </p>
        </section>

        <section className="content-section" aria-labelledby="golf-course-heading">
          <h2 id="golf-course-heading" className="content-heading">
            The golf course with 437 scars
          </h2>
          <p className="content-paragraph">
            On the edge of the village, in the dunes, lies the{" "}
            <a
              href="https://www.domburgschegolfclub.nl/clubinfo/historie"
              target="_blank"
              rel="noopener"
            >
              Domburgsche Golf Club
            </a>
            . Laid out in 1914, it is the oldest golf course in the Netherlands
            still played in its original form. Before the war, the caddies
            walked the course in traditional Walcheren dress.
          </p>
          <p className="content-paragraph">
            Then came September 1941. The German occupiers requisitioned the
            grounds and covered the course with concrete bunkers and a coastal
            battery. Domburg became a link in the Atlantic Wall. In the run-up
            to the landing at Westkapelle, the Allies bombed that battery, and,
            with great precision, the Westkapelle sea dyke. That was tactics:
            through the breach in the dyke, Walcheren flooded and the German
            defences stood, quite literally, in the water. The island paid the
            price of its own liberation. The salt water stood for more than a
            year. Hundreds of bombs fell on the golf course. Play did not
            resume until 1955.
          </p>
          <p className="content-paragraph">
            During the restoration, the club did something remarkable. The bomb
            craters, 437 in all, were not filled in but turned into grass
            bunkers, the sunken hazards every golfer knows. They are still
            there, and from the air the craters are plainly visible. The
            Germans built their concrete bunkers here. The Allied bombs blew
            craters. And from those craters the club made bunkers in the golfing
            sense of the word, so that on this course, the most innocent word
            in golf carries a war inside it.
          </p>
          <p className="content-paragraph">
            That is Domburg in miniature: a friendly surface beneath which
            history has never quite settled. When I went looking for a place
            where a thriller could begin, I did not have to look far.
          </p>
        </section>

        <ArticleFigure image={articleImages.golf} />

        <section className="content-section" aria-labelledby="germans-heading">
          <h2 id="germans-heading" className="content-heading">
            Wind, rain, wind, Germans
          </h2>
          <p className="content-paragraph">
            Walk through Domburg today and you will hear more German than
            Dutch. They come mainly from North Rhine-Westphalia, from the Ruhr.
            If you live in Essen or Dortmund, the Zeeland coast is closer than
            the German one. And they do not come for the weather. They come
            despite the weather, for what they themselves call{" "}
            <em>frische Luft</em>: the bracing sea air with which Domburg once
            began as a health resort. The circle is complete. The cure guests of
            1880 and the families of today are looking for the same thing here.
          </p>
          <p className="content-paragraph">
            There is a deeper layer beneath it. Mere years after the war, with
            the bunkers still in the dunes, signs appeared once more in the
            windows of the Zeeland coastal villages: <em>Zimmer frei</em>. Farm
            children slept in the barn in summer so their bedrooms could be let
            to German guests. No grudge, no grand gesture: simply getting on
            with it. It does not come more sober than that, or more Zeeland.
          </p>
        </section>

        <ArticleFigure image={articleImages.beach} />

        <section
          className="content-section"
          aria-labelledby="boulevard-heading"
        >
          <h2 id="boulevard-heading" className="content-heading">
            The Boulevard van Schagen and the water tower
          </h2>
          <p className="content-paragraph">
            Domburg has no boulevard the way Vlissingen has one. What it does
            have is the Boulevard van Schagen: a narrow dune path with a
            stately name, winding along the top of the dunes, the village on
            one side and, over the crest, the sea. Along the way you pass
            Nehalennia&apos;s bench and look out over the paalhoofden, the rows
            of black poles that reach into the beach every few hundred metres,
            the same ones the painters of 1900 were already recording. At the
            eastern end rises the water tower, so close to the dunes that the
            beach sections below it are simply called &quot;Watertoren&quot;.
          </p>
          <p className="content-paragraph">
            Anyone who walks here in November, alone, the wind full against
            their coat, understands how this path found its way into my book.
          </p>
        </section>

        <ArticleFigure image={articleImages.watertower} />

        <section
          className="content-section"
          aria-labelledby="visiting-domburg-heading"
        >
          <h2 id="visiting-domburg-heading" className="content-heading">
            Visiting Domburg
          </h2>
          <p className="content-paragraph">
            Practical notes, for anyone who wants to see the village for
            themselves: Domburg is a little over an hour&apos;s drive from
            Rotterdam. The beach ranks among the cleanest in the Netherlands,
            and the village itself is compact and largely car-free. The Toorop
            Pavilion and the{" "}
            <a href="https://terramaris.nl/" target="_blank" rel="noopener">
              Terra Maris museum
            </a>{" "}
            in the Manteling woods near Oostkapelle put the history in context;
            for golfers, the Domburgsche Golf Club is a place of pilgrimage. And
            if you want to see the real Domburg, come out of season. October,
            November: when the holidaymakers have gone and the village belongs
            to itself again.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="domburg-of-the-book-heading"
        >
          <h2 id="domburg-of-the-book-heading" className="content-heading">
            The Domburg of the book
          </h2>
          <p className="content-paragraph">
            In{" "}
            <Link href="/en/shadows-over-domburg">
              <em>Shadows over Domburg</em>
            </Link>
            , the village is more than a backdrop. It begins on the beach below
            the water tower, on a November morning, at a paalhoofd where the
            sea has left something behind. The Badhotel, the old golf course
            with its history, the dune paths out of season: these are the
            places where my protagonist discovers that the calm of a seaside
            resort can be deceptive, and that the lines between the Zeeland
            coast and the port of Rotterdam are shorter than they seem. How
            that port looks from the water, I wrote about in{" "}
            <Link href="/en/port-of-rotterdam">
              The Port of Rotterdam, seen from the water
            </Link>
            .
          </p>
        </section>
      </div>

      <div className="container content-page content-page--footer">
        <FirstChapterCTA source="en-domburg" locale="en" />

        <RelatedGuides
          title="Further reading"
          guides={[
            {
              href: "/en/shadows-over-domburg",
              label: "Shadows over Domburg",
              description:
                "A literary thriller from the Zeeland coast to the port of Rotterdam",
            },
            {
              href: "/boeken-over-zeeland",
              label: "Books about Zeeland",
              description:
                "Novels, thrillers and travel guides that belong to this province",
            },
            {
              href: "/en/about",
              label: "About Ard Breure",
              description:
                "The author behind this guide, who grew up in Zeeland",
            },
          ]}
        />

        <section className="content-section">
          <p className="content-meta">
            <em>
              Ard Breure is the author of the literary thriller{" "}
              <Link href="/en/shadows-over-domburg">Shadows over Domburg</Link>,
              expected in autumn 2026.
            </em>
          </p>
        </section>
      </div>
    </main>
  );
}
