import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
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

const pagePath = "/en/cube-houses-rotterdam";
const dutchPath = "/kubuswoningen-rotterdam";
const pageTitle =
  "Cube Houses Rotterdam: What to See, Experience & Know Before You Go";
const pageHeadline =
  "Cube Houses Rotterdam: What to See, Experience and Know Before You Go";
const pageDescription =
  "Visiting the Cube Houses in Rotterdam? Discover what you see, how to look inside at the Kijk-Kubus, how long you need and what lies nearby.";
const datePublished = "2026-08-19";
const dateModified = "2026-08-19";

/**
 * IMAGE TODO: add licensed or owned WebP files to `public/images/`, then set
 * `src` and the real pixel width/height. Do not fill these slots with scraped
 * third-party photographs.
 *
 * Remaining slots: promenade, interior, nearby.
 */
const articleImages = {
  hero: {
    src: null,
    alt: "Row of yellow cube houses by Piet Blom on the Overblaak in Rotterdam, seen from the square beneath the tilted cubes",
    width: 1536,
    height: 1024,
    caption:
      "Cube Houses Rotterdam: tilted homes on pylons that together form an architectural forest in the heart of the city.",
  },
  promenade: {
    src: null,
    alt: "The pedestrian promenade beneath the Cube Houses on the Overblaak in Rotterdam",
    width: 1536,
    height: 1024,
    caption:
      "The promenade of the Blaakse Bos: public space underneath private homes.",
  },
  interior: {
    src: null,
    alt: "Interior of the Kijk-Kubus museum house with sloping walls and custom-built furniture",
    width: 1536,
    height: 1024,
    caption:
      "Inside the Kijk-Kubus: not one straight wall, and still a home that works.",
  },
  nearby: {
    src: null,
    alt: "View towards Markthal and the Laurenskerk from the Cube Houses at Blaak",
    width: 1536,
    height: 1024,
    caption:
      "From the Overblaak, Markthal, the Laurenskerk and the Oude Haven are all within walking distance.",
  },
  rotterdamContext: {
    src: "/assets/rotterdam-maas-lezen-sfeerbeeld.webp",
    alt: "Illustration of reading by the water in Rotterdam with the Erasmusbrug in the background",
    width: 1600,
    height: 600,
    caption:
      "Rotterdam beyond the architecture: the city of stories and harbour.",
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
    "Cube Houses Rotterdam",
    "cube houses",
    "Kubuswoningen",
    "Kijk-Kubus",
    "Piet Blom",
    "Blaakse Bos",
    "Rotterdam architecture",
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
  { name: "Cube Houses Rotterdam", path: pagePath },
];

const cubeLevels = [
  {
    name: "The street house",
    body: "The lowest floor: living room with open kitchen, its windows angled downwards, into the street and the promenade.",
  },
  {
    name: "The sky house",
    body: "The middle floor: bedrooms and bathroom, in the wide centre of the tilted cube.",
  },
  {
    name: "The tree top",
    body: "The point at the top: a three-sided pyramid with windows all around, often used as a garden room, study or extra bed, looking out over the city.",
  },
] as const;

const faqItems = [
  {
    question: "Are the Cube Houses in Rotterdam worth visiting?",
    answer:
      "Yes. This is a piece of architecture you will not find anywhere else at this scale, and the visit is short. Combine it with Markthal and the Oude Haven and you have a complete morning or afternoon in the Laurenskwartier.",
  },
  {
    question: "Can you go inside a Cube House?",
    answer:
      "Yes, at the Kijk-Kubus on the Overblaak 70. That is a fully furnished museum house, the only cube open to the public without an appointment. The other cubes are ordinary homes with residents; you cannot simply ring a doorbell.",
  },
  {
    question: "How long do you need at the Cube Houses?",
    answer:
      "Allow twenty to thirty minutes for the exterior and the promenade. If you also want to see the Kijk-Kubus from the inside, add roughly thirty minutes. Together that is 45 to 60 minutes.",
  },
  {
    question: "How much does it cost to visit the Kijk-Kubus?",
    answer:
      "Admission is modest: expect around €3.50 for adults, with a reduced rate for students and visitors over 65. Payment is usually by card only. The promenade under and between the cubes is freely accessible and costs nothing.",
  },
  {
    question: "Can you sleep in a Cube House in Rotterdam?",
    answer:
      "Yes. One of the super-cubes houses the Stayokay hostel, which reopened in April 2026 after a thorough renovation. Individual cubes are also offered through rental platforms from time to time.",
  },
  {
    question: "Is the Kijk-Kubus wheelchair accessible?",
    answer:
      "No. The homes date from the 1980s and are reached by narrow, steep stairs; there is no lift. The outdoor space and the promenade are walkable, though stairs connect them to street level.",
  },
  {
    question: "Who designed the Cube Houses and when were they built?",
    answer:
      "Architect Piet Blom designed the complex, which was built between 1982 and 1984. Blom conceived each home as a tree and the whole as a forest, hence the name Blaakse Bos.",
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
  about: {
    "@type": "TouristAttraction",
    name: "Cube Houses Rotterdam",
    alternateName: "Kubuswoningen",
    description:
      "Complex of 38 tilted cube houses and two super-cubes, designed by Piet Blom and built between 1982 and 1984 above the Blaak in Rotterdam.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Overblaak 70",
      postalCode: "3011 MH",
      addressLocality: "Rotterdam",
      addressCountry: "NL",
    },
  },
};

export default function CubeHousesRotterdamPage() {
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
            The Cube Houses are one of the most photographed corners of
            Rotterdam. Where the rest of the skyline reaches upwards in glass
            and steel, this yellow complex on a bridge above a busy road
            demands attention with angles of forty-five degrees. It photographs
            brilliantly. That is not the whole story.
          </p>
          <p className="content-paragraph">
            Rotterdam is a city that chose experiment over nostalgia after its
            centre was destroyed. The Cube Houses are a late-1970s answer to
            the cool, large-scale reconstruction architecture that followed.
            This guide tells you what to see, how to look inside, how long you
            need, and how to read the design as what it wanted to be: a village
            inside the big city.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="what-are-cubes-heading"
        >
          <h2 id="what-are-cubes-heading" className="content-heading">
            What are the Cube Houses?
          </h2>
          <p className="content-paragraph">
            The Cube Houses, also known as the Blaakse Bos, stand at Blaak
            station, right beside{" "}
            <Link href="/en/markthal-rotterdam">Markthal</Link> and above the
            broad traffic artery called the Blaak. They were designed by
            architect Piet Blom and built between 1982 and 1984.
          </p>
          <p className="content-paragraph">
            The complex consists of thirty-eight regular cube houses, two
            so-called super-cubes and a handful of commercial units at ground
            level. Blom&apos;s idea was as simple as it was radical: each home
            represents a tree, and together they form a forest. The cube is
            tilted forty-five degrees and rests on a hexagonal pylon, the
            trunk. That creates a public space beneath the homes: a pedestrian
            route connecting the Oude Haven to the city centre, free of the
            car traffic below.
          </p>
          <p className="content-paragraph">
            Visitor information often treats the complex as an amusing
            curiosity. The exterior is playful, but this is first of all a
            working residential building. People live behind those tilted
            walls.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="what-makes-special-heading"
        >
          <h2 id="what-makes-special-heading" className="content-heading">
            What makes the Cube Houses special?
          </h2>
          <ArticleFigure image={articleImages.promenade} />
          <p className="content-paragraph">
            The first thing most people do is try to work out how the space
            inside functions. From outside you see windows angled towards the
            ground and windows angled towards the sky. Inside there is not one
            straight wall. Everything leans.
          </p>
          <p className="content-paragraph">
            A cube has three levels, and Blom gave them names that belong to
            his forest:
          </p>
          <ul className="theme-list">
            {cubeLevels.map((level) => (
              <li key={level.name}>
                <strong>{level.name}.</strong> {level.body}
              </li>
            ))}
          </ul>
          <p className="content-paragraph">
            The Cube Houses are special because they are a protest. Blom wanted
            to bring a village character back to businesslike post-war
            Rotterdam: a place where people meet on a promenade, safe from the
            traffic rushing underneath. This is structuralism at its most
            visible, architecture that refuses to conform to the standard box.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="look-inside-heading"
        >
          <h2 id="look-inside-heading" className="content-heading">
            Can you look inside a Cube House?
          </h2>
          <ArticleFigure image={articleImages.interior} />
          <p className="content-paragraph">
            Yes, and if you are here anyway, it is really a requirement.
            Because these are ordinary homes, you cannot simply ring someone&apos;s
            doorbell. That is what the Kijk-Kubus, the museum house on the
            Overblaak, is for.
          </p>
          <p className="content-paragraph">
            That cube is fully furnished and open to the public, with
            custom-built furniture made specifically for the sloping walls. You
            experience two things there that you cannot see from outside: how
            much bespoke work it takes to put a cupboard against a
            forty-five-degree wall, and how surprisingly light and spacious it
            is inside, despite the seemingly impractical design.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="worth-visiting-heading"
        >
          <h2 id="worth-visiting-heading" className="content-heading">
            Are the Cube Houses Rotterdam worth it?
          </h2>
          <p className="content-paragraph">
            Yes, even if you normally walk straight past architecture. The
            visit is compact. You do not need hours for it, and it sits
            literally on the route between Blaak station and the Oude Haven.
          </p>
          <p className="content-paragraph">
            It is less worthwhile if you are unsteady on your feet or
            uncomfortable in tight spaces: the Kijk-Kubus has steep, narrow
            stairs and no lift. But for anyone who wants to understand how
            Rotterdam claims space and dares to experiment, this is a required
            stop. Where Markthal across the square shows how the city builds in
            the twenty-first century, the Cube Houses show how it thought about
            living together in the 1980s.
          </p>
        </section>

        <section className="content-section" aria-labelledby="how-long-heading">
          <h2 id="how-long-heading" className="content-heading">
            How long do you need?
          </h2>
          <p className="content-paragraph">
            Twenty to thirty minutes is enough to walk the promenade on the
            Overblaak, take photographs and let the architecture settle. If you
            also want to visit the Kijk-Kubus inside, add roughly thirty
            minutes.
          </p>
          <p className="content-paragraph">
            You do not need half a day. The Cube Houses are the perfect middle
            course in a day in Rotterdam, easy to fit in before or after lunch.
          </p>
        </section>

        <section className="content-section" aria-labelledby="nearby-heading">
          <h2 id="nearby-heading" className="content-heading">
            What to see near the Cube Houses
          </h2>
          <ArticleFigure image={articleImages.nearby} />
          <p className="content-paragraph">
            Almost everything worth combining lies a stone&apos;s throw away.
          </p>
          <ul className="theme-list">
            <li>
              <strong>Markthal.</strong> MVRDV&apos;s arch stands directly
              opposite the cubes: the logical place for coffee or lunch after
              your visit. Our{" "}
              <Link href="/en/markthal-rotterdam">guide to Markthal</Link> tells
              you what to see and eat there.
            </li>
            <li>
              <strong>The Oude Haven and the Witte Huis.</strong> Take the
              stairs from the Cube Houses straight down into the old harbour.
              There you will find historic ships, waterside terraces and the
              Witte Huis, long regarded as the first skyscraper in Europe.
            </li>
            <li>
              <strong>The Laurenskerk.</strong> Five minutes on foot stands the
              late-Gothic church, one of the few buildings in the centre that
              survived the bombing of 1940.
            </li>
            <li>
              <strong>Market on the Binnenrotte.</strong> On Tuesdays and
              Saturdays you step from the cubes straight onto the largest
              outdoor market in the city.
            </li>
          </ul>
        </section>

        <section
          className="content-section"
          aria-labelledby="architecture-heading"
        >
          <h2 id="architecture-heading" className="content-heading">
            The Cube Houses and the architecture of Rotterdam
          </h2>
          <p className="content-paragraph">
            On 14 May 1940 the bombing emptied the middle of the city. What
            followed was not a stone-by-stone return of the old streets, but a
            decision, repeated for decades, to treat the open ground as a place
            to invent. The first answers were businesslike and large in scale:
            the Lijnbaan, the Groothandelsgebouw, the straight lines of the
            reconstruction.
          </p>
          <p className="content-paragraph">
            The Cube Houses are the reaction to that. Blom did not build a
            street but a forest; not a block but a village on pylons. Where the
            reconstruction pulled functions neatly apart, he stacked living on
            top of walking, and walking on top of driving. The same argument
            returns thirty years later in Markthal across the square, where
            private housing is bent into a public plaza. Two buildings, two
            generations, the same question: how do you make a centre when the
            centre is gone?
          </p>
          <p className="content-paragraph">
            If you want that history in another form, read it. Our{" "}
            <Link href="/boeken-over-rotterdam">
              reading list of books about Rotterdam
            </Link>{" "}
            gathers the titles, including a reconstruction guide covering a
            hundred buildings from those years. It does not replace standing
            under the cubes. It tells you why they could land here and nowhere
            else.
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
            If the Cube Houses leave you with questions about how this city
            thinks, look further in its literature. Start with the{" "}
            <Link href="/boeken-over-rotterdam">
              reading list of books about Rotterdam
            </Link>{" "}
            from Breure Media: <em>Karakter</em> by Bordewijk for the city
            before the bombing, Jules Deelder for its tone, Hugo Borst for
            football and identity, and the reconstruction guide for the skyline
            you are walking through. Most of these titles are Dutch, so the
            list itself is in Dutch.
          </p>
          <p className="content-paragraph">
            My own novel,{" "}
            <Link href="/en/shadows-over-domburg">
              <em>Shadows over Domburg</em>
            </Link>
            , is a literary thriller due in autumn 2026. The story begins on a
            Zeeland beach and moves deep into the dark logistics of the
            Rotterdam harbour. It belongs on that list because Rotterdam is not
            a backdrop in it, but a character with a part to play.
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
            <strong>Address:</strong> Overblaak 70, 3011 MH Rotterdam, the
            address of the Kijk-Kubus.
          </p>

          <h3 id="transport-heading" className="content-heading">
            Reaching the Cube Houses by public transport
          </h3>
          <p className="content-paragraph">
            Blaak station sits literally under and beside the complex, served
            by train, metro (lines A, B and C) and tram. From Rotterdam Centraal
            it is a short ride, or a walk of around twenty-five minutes through
            the centre.
          </p>

          <h3 id="parking-heading" className="content-heading">
            Parking near the Cube Houses
          </h3>
          <p className="content-paragraph">
            A large underground car park lies beneath the neighbouring
            Markthal. Alternatives nearby are the garages at the Oude Haven and
            the Kiphof. Bicycles can be parked free of charge in the municipal
            facility next to Blaak station.
          </p>

          <h3 id="opening-hours-heading" className="content-heading">
            Kijk-Kubus opening hours and tickets
          </h3>
          <ul className="theme-list">
            <li>
              The museum house is open daily, generally from 10:00 to 18:00;
              hours may be longer in the summer months.
            </li>
            <li>
              Tickets are bought at the door. Expect around €3.50 for adults,
              with a reduced rate for students and visitors over 65. Payment is
              usually by card only.
            </li>
            <li>
              The outdoor space and the promenade are freely accessible day and
              night, at no cost.
            </li>
          </ul>
          <p className="content-paragraph">
            Opening hours and prices can change and vary by season. Check the
            current details on the{" "}
            <a
              href="https://kubuswoning.nl/en/visit.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kijk-Kubus visitor page
            </a>{" "}
            before you set out.
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
            A simple walking route past the Cube Houses
          </h2>
          <p className="content-paragraph">
            This loop stays close to Blaak and asks for no plan more ambitious
            than comfortable shoes.
          </p>
          <ul className="theme-list">
            <li>
              <strong>Arrive at Blaak station.</strong> Stand on the square
              first, so the yellow cubes and the arch of Markthal fit into the
              same frame.
            </li>
            <li>
              <strong>Climb the stairs to the promenade.</strong> Walk the
              whole length of the Overblaak. This is Blom&apos;s forest, and it
              is the part most visitors skip.
            </li>
            <li>
              <strong>Go into the Kijk-Kubus.</strong> Pay the few euros to see
              how the theory collides with a sofa, a bed and a cupboard.
            </li>
            <li>
              <strong>Descend to the Oude Haven.</strong> At the end of the
              promenade the stairs bring you to the water, the old ships and
              the Witte Huis.
            </li>
            <li>
              <strong>Finish in Markthal or at the Laurenskerk.</strong> The
              hall is the food and the twenty-first century; the church is what
              remains of the old city. Either is a better closing image than one
              more photograph of the cubes.
            </li>
          </ul>
        </section>

        <section
          className="content-section"
          aria-labelledby="final-recommendation-heading"
        >
          <h2 id="final-recommendation-heading" className="content-heading">
            Final advice
          </h2>
          <p className="content-paragraph">
            Do not just walk quickly past the Cube Houses for a photograph.
            Climb the stairs to the promenade and experience the village Piet
            Blom wanted to build, isolated from the traffic underneath. Pay the
            few euros for the Kijk-Kubus to see how an idea meets practical
            life. Then take the stairs down to the Oude Haven for a drink.
            Nowhere does Rotterdam show so clearly how old harbour life and
            wild post-war building exist side by side.
          </p>
          <p className="content-paragraph">
            If you want to carry that thought onto the page, the next step is
            not another building. It is the{" "}
            <Link href="/boeken-over-rotterdam">
              reading list of books about Rotterdam
            </Link>
            .
          </p>
        </section>

        <RelatedGuides
          title="Further reading"
          guides={[
            {
              href: "/en/markthal-rotterdam",
              label: "Markthal Rotterdam",
              description:
                "What to see, eat and know before you go, directly opposite the cubes",
            },
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
              <Link href="/en/shadows-over-domburg">Shadows over Domburg</Link>,
              expected in autumn 2026.
            </em>
          </p>
        </section>
      </div>
    </main>
  );
}
