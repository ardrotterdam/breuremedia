import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { FirstChapterCTA } from "@/components/FirstChapterCTA";
import { PageHeader } from "@/components/PageHeader";
import { RelatedGuides } from "@/components/RelatedGuides";
import { formatBlogDate } from "@/data/blog";
import { author, siteConfig } from "@/lib/site";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, buildJsonLd, faqSchema } from "@/lib/schema";

interface ArticleImage {
  /** Public path, or null until a licensed/owned file is added. */
  src: string | null;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

function ArticleFigure({
  image,
  priority = false,
}: {
  image: ArticleImage;
  priority?: boolean;
}) {
  if (!image.src) {
    return null;
  }

  return (
    <figure className="content-section">
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
      {image.caption ? (
        <figcaption className="content-meta">{image.caption}</figcaption>
      ) : null}
    </figure>
  );
}

const pagePath = "/en/markthal-rotterdam";
const pageTitle = "Markthal Rotterdam: the raw shine of a city full of stories";
const pageHeadline = pageTitle;
const pageDescription =
  "Markthal Rotterdam through the eyes of thriller author Ard Breure: the raw shine of a city full of stories, the setting of his series.";
const datePublished = "2026-08-18";
const dateModified = "2026-08-21";

/**
 * IMAGE TODO: add licensed or owned WebP files to `public/assets/` or
 * `public/images/`, then set `src` and the real pixel width/height. Do not
 * fill these slots with scraped third-party photographs.
 *
 * Remaining filenames:
 * - markthal-rotterdam-architecture-exterior.webp
 */
const articleImages = {
  hero: {
    src: "/images/markthal-rotterdam-exterior-hero.webp",
    alt: "Exterior of Markthal Rotterdam with its iconic arched glass facade and city plaza",
    width: 1536,
    height: 1024,
    caption:
      "Markthal Rotterdam: apartments bent into an arch over a covered market square.",
  },
  ceiling: {
    src: "/images/markthal-rotterdam-interior-horn-of-plenty.webp",
    alt: "Interior of Markthal Rotterdam with the colourful Horn of Plenty artwork across the arched ceiling",
    width: 1536,
    height: 1024,
    caption:
      "The Horn of Plenty, the ceiling mural by Arno Coenen and Iris Roskam.",
  },
  food: {
    src: "/images/markthal-rotterdam-food-market-interior.webp",
    alt: "Food stalls inside Markthal Rotterdam with cheese, bread, seafood and visitors in the market hall",
    width: 1536,
    height: 1024,
    caption: "A working market hall: stalls, produce and cooked food under the arch.",
  },
  nearby: {
    src: null,
    alt: "Cube Houses at Blaak near Markthal Rotterdam with pedestrians and city architecture",
    width: 1536,
    height: 1024,
    caption:
      "Piet Blom's Cube Houses stand beside Markthal on the Blaak square.",
  },
  architecture: {
    src: null,
    alt: "Architectural exterior of Markthal Rotterdam, showing the housing arch and glass facade",
    width: 1600,
    height: 900,
    caption:
      "Private housing makes the public hall: the arch seen from outside.",
  },
  rotterdamContext: {
    src: "/assets/rotterdam-maas-lezen-sfeerbeeld.webp",
    alt: "Illustration of reading by the Maas in Rotterdam with the Erasmusbrug in the background",
    width: 1600,
    height: 600,
    caption:
      "Rotterdam beyond the market: the river city that Markthal introduces.",
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
    "Markthal Rotterdam",
    "Markthal",
    "Rotterdam market hall",
    "what to eat at Markthal",
    "Rotterdam architecture",
  ],
  languages: {
    nl: "/markthal-rotterdam",
    en: pagePath,
    "x-default": pagePath,
  },
});

const breadcrumbs = [
  { name: "Home", path: "/en" },
  { name: "Blog", path: "/en/blog" },
  { name: "Markthal Rotterdam", path: pagePath },
];

const openingHours = [
  { day: "Monday to Thursday", hours: "10:00–20:00" },
  { day: "Friday", hours: "10:00–21:00" },
  { day: "Saturday", hours: "10:00–20:00" },
  { day: "Sunday", hours: "12:00–18:00" },
] as const;

const faqItems = [
  {
    question: "Is Markthal Rotterdam worth visiting?",
    answer:
      "Yes, if you want a compact introduction to modern Rotterdam. The hall, the ceiling artwork and the surrounding architecture are the point, not a long shopping list. Combine it with the Cube Houses and, on Tuesday or Saturday, the outdoor market on the Binnenrotte.",
  },
  {
    question: "How long do you need at Markthal Rotterdam?",
    answer:
      "Plan 30 to 45 minutes to walk the hall and look up at the ceiling. Allow 1 to 2 hours if you sit down to eat. A simple loop with the Cube Houses and the Laurenskerk takes a morning or an easy afternoon.",
  },
  {
    question: "What are the opening hours of Markthal Rotterdam?",
    answer:
      "The market hall is open Monday to Thursday 10:00–20:00, Friday 10:00–21:00, Saturday 10:00–20:00 and Sunday 12:00–18:00. Restaurants on the outer sides and the supermarket downstairs keep different hours. Holiday hours can change, so check the official Markthal page before you go.",
  },
  {
    question: "Is Markthal Rotterdam free to enter?",
    answer:
      "Yes. Walking into the hall and looking at the building is free. You pay only for food, drink or shopping. The Cube Houses museum nearby has its own ticket.",
  },
  {
    question: "What can you eat at Markthal Rotterdam?",
    answer:
      "Fresh produce, fish, cheese, bread, coffee and cooked food from Dutch and international kitchens. It is a working market hall, not a fixed restaurant guide: stalls change, so choose by what looks and smells good that day.",
  },
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

export default function MarkthalRotterdamPage() {
  const jsonLd = buildJsonLd(
    articleSchema,
    breadcrumbSchema(breadcrumbs),
    faqSchema(faqItems)
  );

  return (
    <main lang="en">
      <JsonLd data={jsonLd} />
      <PageHeader
        eyebrow="Rotterdam"
        title={pageHeadline}
        description={`By Ard Breure · Last updated ${formatBlogDate(dateModified, "en")}`}
      />

      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} />

        <p className="content-meta">
          By{" "}
          <Link href="/en/about">Ard Breure</Link>, author of{" "}
          <Link href="/en/shadows-over-domburg">Shadows over Domburg</Link>
        </p>

        <ArticleFigure image={articleImages.hero} priority />

        <section className="content-section" aria-labelledby="intro-heading">
          <h2 id="intro-heading" className="content-heading">
            Introduction
          </h2>
          <p className="content-paragraph">
            Rotterdam is the setting of my thriller series — this is the city
            as I know it. Markthal Rotterdam is one of its sharpest faces: an
            arch of apartments over a covered market, a ceiling of fruit and
            fish, the smell of bread rising into a public room. It photographs
            well. That is not why it matters.
          </p>
          <p className="content-paragraph">
            Rotterdam is a city that had to invent itself after the centre was
            destroyed. Markthal is one of the clearest recent answers to that
            history: housing, food and a square stacked into a single idea.
            How to read the building as architecture — and not as a food court
            with a mural — follows below.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="what-is-markthal-heading"
        >
          <h2 id="what-is-markthal-heading" className="content-heading">
            What is Markthal Rotterdam?
          </h2>
          <p className="content-paragraph">
            Markthal is a covered market hall in the Laurenskwartier, next to
            Station Blaak. It was designed by the Rotterdam office MVRDV and
            opened on 1 October 2014. The hall sits under a 40-metre arch of
            apartments. Underneath are parking and a supermarket. Around the
            sides are shops and restaurants.
          </p>
          <p className="content-paragraph">
            The building was designed with 96 fresh-food stalls and shop units
            in the central hall, plus larger retail and restaurant units along
            the sides. Above them are 228 apartments. The point of the design
            is not a market with housing nearby. It is one hybrid: a public
            square created by private homes.
          </p>
          <p className="content-paragraph">
            Official visitor information still treats it as a daily market you
            can walk into without a ticket. That is the right way to arrive.
            Look up first. Then decide whether you are here to eat, to shop, or
            simply to understand the city.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="what-makes-special-heading"
        >
          <h2 id="what-makes-special-heading" className="content-heading">
            What makes Markthal special?
          </h2>
          <ArticleFigure image={articleImages.ceiling} />
          <p className="content-paragraph">
            The first thing most people notice is the ceiling. The mural known
            as the Horn of Plenty, also called Cornucopia, is the work of Arno
            Coenen and Iris Roskam. It covers more than 11,000 square metres:
            fruit, vegetables, fish, flowers and insects, enlarged until they
            become architecture. The image refers to Dutch still-life painting
            of the seventeenth century, then refuses to stay inside a frame.
          </p>
          <p className="content-paragraph">
            The panels are perforated aluminium. They carry the picture and they
            quiet the hall. The grey stone of the exterior and the floor is
            deliberately calm, so the interior can be excessive. At each end of
            the arch, a cable-net glass façade keeps the weather out without
            turning the square into a closed box. MVRDV describes it as the
            largest façade of its kind in Europe.
          </p>
          <p className="content-paragraph">
            What lasts, after the first photograph, is the mixing. You eat under
            other people&apos;s kitchens. Those kitchens look into the hall
            through glass proofed against sound and smell. Living rooms face
            the other way, toward the Maas or the Laurenskerk. Markthal is
            special because it treats density as a civic pleasure, not as a
            problem to hide.
          </p>
        </section>

        <section className="content-section" aria-labelledby="what-to-eat-heading">
          <h2 id="what-to-eat-heading" className="content-heading">
            What can you eat at Markthal?
          </h2>
          <ArticleFigure image={articleImages.food} />
          <p className="content-paragraph">
            Eat as you would in a working market, not as you would in a
            restaurant with a fixed menu for tourists. The hall is built for
            fresh produce, fish, cheese, bread, coffee and cooked food from
            Dutch and international kitchens. Some stalls sell ingredients to
            take home. Others plate a meal you eat standing or at a small
            table.
          </p>
          <p className="content-paragraph">
            Do not treat this page as a ranking of named stalls. Tenants
            change, and a list that pretends otherwise goes stale. Choose by
            what looks and smells good that day. If you want atmosphere,
            lunchtime and weekends bring more activity, but also more people.
            Earlier on a weekday is calmer, and often better if you came for
            the building as much as for lunch.
          </p>
          <p className="content-paragraph">
            There is a supermarket on the level below the hall, useful if you
            are staying in the city and actually need groceries. Restaurants on
            the long outer sides have their own entrances and often keep later
            hours than the market itself.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="worth-visiting-heading"
        >
          <h2 id="worth-visiting-heading" className="content-heading">
            Is Markthal Rotterdam worth visiting?
          </h2>
          <p className="content-paragraph">
            Yes, if you have even a short time in Rotterdam and you want to
            understand how the city builds. The visit is compact. You do not
            need a timed ticket. You can pass through on the way to the Cube
            Houses or the Laurenskerk and still have seen something essential.
          </p>
          <p className="content-paragraph">
            It is less worth a detour if you hoped for a quiet neighbourhood
            market and nothing else. On Tuesday and Saturday the outdoor
            Binnenrotte market, immediately outside, is closer to that older
            idea of buying fish and flowers in the open air. Markthal is the
            covered argument beside it: food as a reason to make a public room
            inside a piece of housing.
          </p>
          <p className="content-paragraph">
            That is where Markthal works best: not simply as a food hall, but
            as an introduction to modern Rotterdam.
          </p>
        </section>

        <section className="content-section" aria-labelledby="how-long-heading">
          <h2 id="how-long-heading" className="content-heading">
            How long do you need at Markthal?
          </h2>
          <p className="content-paragraph">
            Thirty to forty-five minutes is enough to walk the hall, look up,
            and step outside to see the arch from Blaak. If you sit down to
            eat, plan one to two hours. A simple loop with the Cube Houses and
            the Laurenskerk fills a morning or an easy afternoon without
            rushing.
          </p>
          <p className="content-paragraph">
            You do not need half a day inside the building. Markthal is
            strongest as a first chapter, not as the whole book. Leave time for
            the streets around it. That is where the city continues the same
            argument in other forms.
          </p>
        </section>

        <section className="content-section" aria-labelledby="nearby-heading">
          <h2 id="nearby-heading" className="content-heading">
            What to see near Markthal
          </h2>
          <ArticleFigure image={articleImages.nearby} />
          <p className="content-paragraph">
            Almost everything worth pairing with Markthal is within a short
            walk of Station Blaak.
          </p>
          <ul className="theme-list">
            <li>
              <strong>Cube Houses (Kubuswoningen).</strong> Piet Blom&apos;s
              yellow cubes stand beside the hall. They are easy to photograph
              from the square. The Kijk-Kubus museum house is the place to see
              the interior if that curiosity is part of the visit. Our{" "}
              <Link href="/en/cube-houses-rotterdam">
                guide to the Cube Houses
              </Link>{" "}
              covers what you see and how long you need.
            </li>
            <li>
              <strong>Binnenrotte market.</strong> On Tuesday and Saturday the
              outdoor market fills the square outside. Combining the two
              markets is the most complete food visit.
            </li>
            <li>
              <strong>Laurenskerk.</strong> The late-Gothic church survived the
              wartime destruction of the centre. From Markthal you are looking
              toward one of the few remaining witnesses of the old city.
            </li>
            <li>
              <strong>Rotterdam Central Library.</strong> Another piece of
              postwar civic architecture, a short walk from the hall, and a
              useful pause if the square is crowded.
            </li>
            <li>
              <strong>Oude Haven and the Witte Huis.</strong> A few minutes
              further, the old harbour and Europe&apos;s first skyscraper give
              you water, ships and a different layer of the same city.
            </li>
          </ul>
        </section>

        <section
          className="content-section"
          aria-labelledby="architecture-heading"
        >
          <h2 id="architecture-heading" className="content-heading">
            Markthal and Rotterdam architecture
          </h2>
          <ArticleFigure image={articleImages.architecture} />
          <p className="content-paragraph">
            Rotterdam is a city that had its centre taken from it. On 14 May
            1940 the bombing emptied the middle of the town. What followed was
            not a brick-for-brick return of the old streets. It was a decision,
            repeated for decades, to treat the open ground as a place to
            invent. Some visitors still arrive hoping for canals and gables and
            feel short-changed. The city is not hiding a prettier version of
            itself behind the towers. This is the version it chose.
          </p>
          <p className="content-paragraph">
            Markthal belongs to that line, not to a tourist circuit of isolated
            icons. The Cube Houses, the Erasmusbrug, the Depot Boijmans Van
            Beuningen and this arch are different answers to the same
            question: how do you make a centre after the centre is gone? MVRDV
            did not place a decorative roof over a shopping arcade. The market,
            the parking, the supermarket and the 228 apartments are one
            structure. Private housing is bent into a public square. The city
            gets a covered room; the homes get a reason to exist in the middle
            of Blaak.
          </p>
          <p className="content-paragraph">
            Stand in the hall and the design becomes a set of views rather than
            a slogan. One way looks toward the Laurenskerk, the stone remnant.
            The other opens to the glass of the cable-net façade and the newer
            city beyond. Above you, kitchens face inward. Living rooms and
            bedrooms, which Dutch daylight law requires to receive real light,
            face the Maas or the church. The residents are not scenery. They
            are why the square could be built at all.
          </p>
          <p className="content-paragraph">
            That stacking is Rotterdam at its most itself: functions mixed
            instead of zoned into polite distance, spectacle used to justify a
            civic interior, grey stone outside so that colour can happen
            within. The Horn of Plenty is not a sticker applied at the end. It
            is the inside of the arch made visible, a still life enlarged until
            it has to share the room with fish stalls and commuters. The
            building is theatrical. It is also practical. Both things can be
            true here, which is why the city kept building this way.
          </p>
          <p className="content-paragraph">
            If you want that history in another form, read it.{" "}
            <Link href="/boeken-over-rotterdam#rotterdam-wederopbouw-groenendijk">
              Rotterdam Wederopbouw
            </Link>
            , on our{" "}
            <Link href="/boeken-over-rotterdam">books about Rotterdam</Link>{" "}
            list, gathers a hundred buildings from the reconstruction years.
            It will not replace standing in Markthal. It will tell you why a
            hall like this could only have been built in this city.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="books-rotterdam-heading"
        >
          <h2 id="books-rotterdam-heading" className="content-heading">
            Books about Rotterdam
          </h2>
          <ArticleFigure image={articleImages.rotterdamContext} />
          <p className="content-paragraph">
            A visit to Markthal is a way into the city. Books are the slower
            way. If the hall leaves you wanting the harbour, the pre-war
            streets, the voice of the place, start with the Breure Media{" "}
            <Link href="/boeken-over-rotterdam">
              reading list of books about Rotterdam
            </Link>
            . The page is in Dutch. The titles are still the right ones:
            Bordewijk&apos;s <em>Karakter</em> for the city before the
            bombing, Jules Deelder for its tone, Hugo Borst for football and
            identity, and the reconstruction guide for the skyline you are
            walking through.
          </p>
          <p className="content-paragraph">
            My own novel,{" "}
            <Link href="/en/shadows-over-domburg">
              <em>Shadows over Domburg</em>
            </Link>
            , is a literary thriller that begins on a Zeeland beach and runs
            into the Rotterdam harbour. It belongs on that list because the
            port is not a backdrop. It is the plot. Markthal will not appear
            as a postcard in it. The city underneath the postcard will.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="practical-heading"
        >
          <h2 id="practical-heading" className="content-heading">
            Practical information
          </h2>
          <p className="content-paragraph">
            <strong>Address:</strong> Ds. Jan Scharpstraat 298, 3011 GZ
            Rotterdam.
          </p>
          <p className="content-paragraph">
            <strong>Market hall hours:</strong>
          </p>
          <ul className="theme-list">
            {openingHours.map((row) => (
              <li key={row.day}>
                {row.day}: {row.hours}
              </li>
            ))}
          </ul>
          <p className="content-paragraph">
            Restaurants on the outer sides and the supermarket downstairs keep
            their own hours. Holiday periods can differ. For the current
            official times, use the{" "}
            <a
              href="https://markthal.nl/en/visit-markthal/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Markthal visiting page
            </a>
            .
          </p>
          <p className="content-paragraph">
            <strong>How to get there:</strong> Station Blaak is beside the
            building, with train, metro and tram. From Rotterdam Centraal it is
            a short metro or train ride, or a walk of about twenty-five
            minutes through the centre. There is an underground car park
            beneath the hall, open day and night. Cycling is the local default;
            bike parking sits around the square.
          </p>
          <p className="content-paragraph">
            Entry to the hall is free. You pay for what you eat or buy. There
            is no need to book the market itself.
          </p>
        </section>
      </div>

      <FaqSection
        items={faqItems}
        title="Frequently asked questions"
        eyebrow="Visitor questions"
      />

      <div className="container content-page content-page--footer">
        <section
          className="content-section"
          aria-labelledby="walking-route-heading"
        >
          <h2 id="walking-route-heading" className="content-heading">
            A simple Markthal walking route
          </h2>
          <p className="content-paragraph">
            This loop stays close to Blaak and does not require a plan more
            ambitious than comfortable shoes.
          </p>
          <ul className="theme-list">
            <li>
              <strong>Arrive at Station Blaak.</strong> Come up to the square
              and let the arch of Markthal and the yellow cubes sit in the same
              view before you go inside.
            </li>
            <li>
              <strong>Walk the Cube Houses.</strong> Circle the Blaakse Bos
              from below. Go into the Kijk-Kubus only if you want the interior;
              the outdoor path is already the architecture.
            </li>
            <li>
              <strong>Enter Markthal from the square.</strong> Pause in the
              middle of the hall and look up, then along both glass ends,
              before you choose food.
            </li>
            <li>
              <strong>Eat, then step back outside.</strong> On Tuesday or
              Saturday, walk the Binnenrotte market. On other days, cross
              toward the Laurenskerk.
            </li>
            <li>
              <strong>Finish at the church or the Oude Haven.</strong> The
              Laurenskerk is the older city. The harbour is the water. Either
              is a better last image than another circuit of stalls.
            </li>
          </ul>
        </section>

        <section
          className="content-section"
          aria-labelledby="final-recommendation-heading"
        >
          <h2 id="final-recommendation-heading" className="content-heading">
            Final recommendation
          </h2>
          <p className="content-paragraph">
            Go to Markthal. Look up. Eat something simple. Do not stay long
            enough for the hall to become only a food court. Then walk: cubes,
            church, harbour. The building will have done its work if Rotterdam
            feels less like a list of sights and more like a city that decided,
            after the fire, to keep inventing the middle of itself.
          </p>
          <p className="content-paragraph">
            If you want to continue that thought on the page, the next step is
            not another market. It is the{" "}
            <Link href="/boeken-over-rotterdam">
              books about Rotterdam
            </Link>
            .
          </p>
        </section>

        <FirstChapterCTA source="en-markthal-rotterdam" locale="en" />

        <RelatedGuides
          title="Further reading"
          guides={[
            {
              href: "/boeken-over-rotterdam",
              label: "Books about Rotterdam",
              description:
                "Novels, thrillers and reconstruction titles that belong with this city",
            },
            {
              href: "/en/shadows-over-domburg",
              label: "Shadows over Domburg",
              description:
                "A literary thriller from the Zeeland coast into the Rotterdam harbour",
            },
            {
              href: "/en/about",
              label: "About Ard Breure",
              description: "The author behind this guide, based in Rotterdam",
            },
          ]}
        />

        <section className="content-section">
          <p className="content-meta">
            <em>
              Ard Breure is the author of the literary thriller{" "}
              <Link href="/en/shadows-over-domburg">
                Shadows over Domburg
              </Link>
              , expected in autumn 2026.
            </em>
          </p>
        </section>
      </div>
    </main>
  );
}
