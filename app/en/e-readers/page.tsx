import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AffiliateButton } from "@/components/AffiliateButton";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { ereaders } from "@/data/affiliate";
import { author, siteConfig } from "@/lib/site";
import { buildMetadata, absoluteUrl, sitePageTitle } from "@/lib/seo";
import {
  breadcrumbSchema,
  buildJsonLd,
  collectionPageSchema,
  itemListSchema,
} from "@/lib/schema";

const pageTitle = sitePageTitle("Best e-readers 2026: Kindle or Kobo?");
const pageDescription =
  "A writer’s comparison of the six e-readers that matter in 2026, and which one I’d buy, depending on how you read.";
const pagePath = "/en/e-readers";
const heroImage =
  "/assets/kindle-paperwhite-schaduwen-over-domburg-zeeuwse-kust.webp";

export const metadata: Metadata = buildMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  type: "article",
  locale: "en_US",
  image: heroImage,
  imageAlt:
    "Kindle Paperwhite showing the cover of Shadows over Domburg, with the Zeeland coast behind it",
  imageWidth: 1600,
  imageHeight: 873,
  languages: {
    nl: "/e-readers",
    en: pagePath,
    "x-default": pagePath,
  },
});

const breadcrumbs = [
  { name: "Home", path: "/en" },
  { name: "E-readers", path: pagePath },
];

const models: readonly {
  slug: string;
  title: string;
  forWhom: string;
  screen: string;
  waterproof: string;
  body: readonly string[];
  bestFor: string;
}[] = [
  {
    slug: "kindle-paperwhite",
    title: "Kindle Paperwhite: the best pick for most readers",
    forWhom: "Most readers, best buy",
    screen: '7", black & white',
    waterproof: "Yes",
    body: [
      "If someone asks me which e-reader to buy, this is the answer nine times out of ten. The 7-inch screen is large enough to read comfortably and small enough to hold in one hand. Warm adjustable lighting means evening reading without that phone-screen glare. It’s waterproof, and the battery lasts weeks, not hours.",
      "The trade-off: you’re in the Amazon ecosystem. Books come from the Kindle Store, which is huge and convenient, but EPUB files from elsewhere don’t transfer as easily. For novels and thrillers, that’s usually a feature, not a bug.",
    ],
    bestFor: "Anyone who wants to read a lot and make one solid choice.",
  },
  {
    slug: "kindle-basis",
    title: "Kindle (basic): the smartest entry point",
    forWhom: "Smallest budget",
    screen: '6", black & white',
    waterproof: "No",
    body: [
      "The cheapest Kindle has quietly become excellent: the same sharp screen type as the Paperwhite (300 ppi), light as a paperback, USB-C, and weeks of battery life. You give up waterproofing, warm lighting, and an inch of screen compared with the Paperwhite.",
      "Honest advice: if the price gap with the Paperwhite doesn’t matter, take the Paperwhite. If you’re still testing whether e-reading sticks, this is the low-regret start.",
    ],
    bestFor: "Sceptics, students, and anyone trying e-reading first.",
  },
  {
    slug: "kobo-libra-colour",
    title: "Kobo Libra Colour: freedom, colour, page-turn buttons",
    forWhom: "Colour and buttons, without Amazon",
    screen: '7", colour',
    waterproof: "Yes",
    body: [
      "Kobo is the brand for readers who want freedom: EPUB files, library loans via Adobe Digital Editions, and no locked-in store. The Libra Colour adds a colour screen and physical page-turn buttons: a pleasure if you read with one hand on the train.",
      "Colour e-ink is still a little greyer than the best black-and-white panels. For novels alone, black and white stays sharper and cheaper. For comics, magazines, or illustrated books, colour earns its keep.",
    ],
    bestFor: "Readers who want EPUB, libraries, and life outside Amazon.",
  },
  {
    slug: "kobo-clara-bw",
    title: "Kobo Clara BW: compact Kobo without Amazon",
    forWhom: "Compact and affordable, without Amazon",
    screen: '6", black & white',
    waterproof: "Yes",
    body: [
      "The Clara BW is the smaller sibling: 6 inches, black and white, with a very sharp modern screen. Waterproof, light, and open to EPUB and library books, without Amazon’s store.",
      "Choose this when you want Kobo freedom in a pocketable size and don’t need colour or physical buttons.",
    ],
    bestFor: "Travel readers who want a small open e-reader.",
  },
  {
    slug: "kindle-scribe",
    title: "Kindle Scribe: large screen with a pen",
    forWhom: "Notes on a large screen",
    screen: '10.2", with pen',
    waterproof: "No",
    body: [
      "The Scribe is a different kind of device: 10.2 inches, with a pen for margin notes that feel close to paper. Ideal if you annotate non-fiction or want one device for reading and handwritten notes.",
      "It’s larger and pricier than a Paperwhite. If you only want novels in a bag, skip it.",
    ],
    bestFor: "Note-takers and non-fiction readers who annotate heavily.",
  },
  {
    slug: "kindle-colorsoft",
    title: "Kindle Colorsoft: colour inside Kindle",
    forWhom: "Colour within the Kindle ecosystem",
    screen: '7", colour',
    waterproof: "Yes",
    body: [
      "If you read comics, magazines, or illustrated books and already live in Kindle, the Colorsoft is the logical step. Waterproof, long battery, and direct access to the Kindle Store.",
      "Colour e-ink costs more and looks a shade greyer than top black-and-white screens. Pure novel readers usually don’t need it.",
    ],
    bestFor: "Kindle readers who want colour covers, comics, or marked-up study texts.",
  },
];

const faqItems = [
  {
    question: "Is an e-reader better for your eyes than a tablet?",
    answer:
      "Yes. E-ink reflects light like paper instead of shining light into your eyes like a phone or tablet. That’s why you can read for hours without eye strain, including outdoors in sunlight.",
  },
  {
    question: "How long does the battery last?",
    answer:
      "Weeks, not hours. Depending on the model and how you use it: roughly four to twelve weeks on a single charge.",
  },
  {
    question: "Can I read library books on an e-reader?",
    answer:
      "On Kobo, yes: via Adobe Digital Editions and many public library systems. Kindle does not support those protected library loans the same way; Kindle shines if you buy or borrow inside Amazon’s ecosystem.",
  },
  {
    question: "Kindle or Kobo?",
    answer:
      "Buy most books from a big store and want simplicity: Kindle Paperwhite. Want EPUB files and library loans: Kobo. That single question decides most purchases.",
  },
];

function getEreaderUrl(slug: string) {
  return ereaders.find((item) => item.slug === slug)?.amazonUrl ?? "";
}

export default function EnglishEReadersPage() {
  const jsonLd = buildJsonLd(
    {
      "@type": "Article",
      headline: "The best e-reader of 2026, chosen by a writer who reads on one",
      description: pageDescription,
      image: absoluteUrl(heroImage),
      inLanguage: "en",
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
    },
    collectionPageSchema(
      "Best e-readers 2026",
      absoluteUrl(pagePath),
      pageDescription
    ),
    breadcrumbSchema(breadcrumbs),
    itemListSchema(
      "Best e-readers 2026",
      models.map((item) => ({
        name: item.title,
        url: absoluteUrl(`${pagePath}#${item.slug}`),
        description: item.body[0],
      }))
    )
  );

  return (
    <main lang="en">
      <JsonLd data={jsonLd} />
      <PageHeader
        eyebrow="Guide"
        title="The best e-reader of 2026, chosen by a writer who reads on one"
        description="By Ard Breure, author of Shadows over Domburg"
      />
      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} />

        <p className="content-meta">
          <Link href="/e-readers" className="text-link">
            Lees deze gids in het Nederlands
          </Link>
        </p>

        <section className="content-section">
          <p className="content-paragraph">
            I read a lot. As a writer that comes with the job. But I was
            reading long before I published a word. Over the past years much of
            that reading moved to e-readers: on the train, on the sofa at night,
            on holiday with thirty books in a jacket pocket. This guide compares
            the six models that actually matter in 2026, and tells you which one
            I would buy depending on how you read.
          </p>
          <p className="content-paragraph">
            <strong>Short version:</strong> for most readers the{" "}
            <strong>Kindle Paperwhite</strong> is the best buy. Prefer not to
            lock into Amazon? Choose the <strong>Kobo Libra Colour</strong>.
            Want the cheapest solid option? The <strong>basic Kindle</strong>.
            The details below explain why.
          </p>
        </section>

        <AffiliateDisclosure locale="en" />

        <figure className="content-section">
          <Image
            src={heroImage}
            alt="Kindle Paperwhite showing the cover of Shadows over Domburg, with the Zeeland coast behind it"
            width={1600}
            height={873}
            priority
            sizes="(max-width: 768px) 100vw, 48rem"
            style={{ width: "100%", height: "auto" }}
          />
          <figcaption className="content-meta">
            Shadows over Domburg on the Kindle Paperwhite, the e-reader I
            recommend as the best buy below.
          </figcaption>
        </figure>

        <div
          className="content-section content-inline-cta"
          style={{ textAlign: "center", marginTop: "-0.25rem" }}
        >
          <p
            className="content-meta"
            style={{ marginBottom: "0.875rem", maxWidth: "none" }}
          >
            My number-one recommendation. Read why below, or open it now:
          </p>
          <AffiliateButton
            amazonUrl={getEreaderUrl("kindle-paperwhite")}
            label="View the Kindle Paperwhite on Amazon"
            compact
          />
        </div>

        <section className="content-section" aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="content-heading">
            At a glance
          </h2>
          <div className="content-table-wrapper">
            <table className="content-table">
              <thead>
                <tr>
                  <th scope="col">Model</th>
                  <th scope="col">Best for</th>
                  <th scope="col">Screen</th>
                  <th scope="col">Waterproof</th>
                </tr>
              </thead>
              <tbody>
                {models.map((model) => (
                  <tr key={model.slug}>
                    <td>
                      <a href={`#${model.slug}`}>{model.title.split(": ")[0]}</a>
                    </td>
                    <td>{model.forWhom}</td>
                    <td>{model.screen}</td>
                    <td>{model.waterproof}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {models.map((model) => (
          <section
            key={model.slug}
            id={model.slug}
            className="content-section"
            aria-labelledby={`${model.slug}-heading`}
          >
            <h2 id={`${model.slug}-heading`} className="content-heading">
              {model.title}
            </h2>
            {model.slug === "kobo-libra-colour" ? (
              <figure className="content-section">
                <Image
                  src="/assets/waterdichte-ereader-kobo-libra-colour-zwembad.webp"
                  alt="Waterproof Kobo Libra Colour e-reader used in a swimming pool"
                  width={1600}
                  height={900}
                  sizes="(max-width: 768px) 100vw, 48rem"
                  style={{ width: "100%", height: "auto" }}
                  loading="lazy"
                />
                <figcaption className="content-meta">
                  The waterproof Kobo Libra Colour is suitable for reading by
                  the pool.
                </figcaption>
              </figure>
            ) : null}
            {model.body.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="content-paragraph">
                {paragraph}
              </p>
            ))}
            <p className="content-paragraph">
              <strong>Best for:</strong> {model.bestFor}
            </p>
            <AffiliateButton
              amazonUrl={getEreaderUrl(model.slug)}
              label={`View on Amazon`}
            />
          </section>
        ))}

        <section className="content-section" aria-labelledby="choose-heading">
          <h2 id="choose-heading" className="content-heading">
            How to choose: three questions
          </h2>
          <p className="content-paragraph">
            <strong>1. Where do your books come from?</strong> Buy from a major
            store: Kindle. Prefer EPUB files or library loans: Kobo. Kindle
            does not support those protected library books the same way.
          </p>
          <p className="content-paragraph">
            <strong>2. Black &amp; white or colour?</strong> For novels and
            thrillers: black and white, always. Sharper, cheaper, longer battery.
            Colour is for comics and magazines.
          </p>
          <p className="content-paragraph">
            <strong>3. How much do you want to spend?</strong> Entry model to try
            it out; Paperwhite or Libra Colour once you know you&apos;ll keep
            reading.
          </p>
        </section>
      </div>

      <FaqSection
        items={faqItems}
        title="Frequently asked questions"
        eyebrow="Reader questions"
      />

      <div className="container content-page content-page--footer">
        <section className="content-section">
          <p className="content-meta">
            Prefer the full Dutch guide with more detail? Read{" "}
            <Link href="/e-readers">de Nederlandse e-reader gids</Link>.
          </p>
          <p className="content-meta">
            <em>I only recommend what I would buy myself.</em>
          </p>
        </section>
      </div>
    </main>
  );
}
