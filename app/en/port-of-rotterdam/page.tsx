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

const pagePath = "/en/port-of-rotterdam";
const dutchPath = "/haven-van-rotterdam";
const germanPath = "/de/hafen-von-rotterdam";
const pageHeadline = "The Port of Rotterdam, seen from the water";
const pageTitle = `The Port of Rotterdam, Seen from the Water | ${siteConfig.name}`;
const pageDescription =
  "I drove a taxi in the Port of Rotterdam for seven years. What you see if you go and look, what you don't see, and why my thriller begins here.";
const datePublished = "2026-08-30";
const dateModified = "2026-08-30";

const articleImages = {
  hero: {
    src: "/images/blog/haven-rotterdam-hero.jpg",
    alt: "Container cranes in the Port of Rotterdam at dusk, with a sea-going ship moored at the quay on the Nieuwe Maas",
    width: 1672,
    height: 941,
  },
  kranen: {
    src: "/images/blog/haven-rotterdam-kranen-maasvlakte.jpg",
    alt: "The flat reclaimed land of Maasvlakte 2, with wind turbines along the sea defence and container terminals on the horizon",
    width: 1536,
    height: 1021,
  },
  scan: {
    src: "/images/blog/haven-rotterdam-containerscan.webp",
    alt: "A shipping container inside a Customs X-ray scanner in the Port of Rotterdam",
    width: 1622,
    height: 969,
  },
  kering: {
    src: "/images/blog/haven-rotterdam-maeslantkering.jpg",
    alt: "The closed Maeslantkering storm surge barrier at Hoek van Holland, sealing the Nieuwe Waterweg from the North Sea",
    width: 1668,
    height: 943,
  },
} as const;

export const metadata: Metadata = buildMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  type: "article",
  locale: "en_US",
  keywords: [
    "Port of Rotterdam",
    "Rotterdam harbour",
    "harbour tour Rotterdam",
    "Maasvlakte",
    "Shadows over Domburg",
  ],
  languages: {
    nl: dutchPath,
    en: pagePath,
    de: germanPath,
    "x-default": dutchPath,
  },
});

const breadcrumbs = [
  { name: "Home", path: "/en" },
  { name: "Blog", path: "/en/blog" },
  { name: "Port of Rotterdam", path: pagePath },
];

const articleSchema = {
  "@type": "Article",
  headline: pageHeadline,
  description: pageDescription,
  datePublished,
  dateModified,
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
};

export default function PortOfRotterdamPage() {
  const jsonLd = buildJsonLd(articleSchema, breadcrumbSchema(breadcrumbs));

  return (
    <main lang="en">
      <JsonLd data={jsonLd} />
      <PageHeader
        eyebrow="Rotterdam"
        title={pageHeadline}
        description={`By Ard Breure, author of Shadows over Domburg · Last updated ${formatBlogDate(dateModified, "en")}`}
      />

      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} />

        <BlogImagePlaceholder
          src={articleImages.hero.src}
          alt={articleImages.hero.alt}
          width={articleImages.hero.width}
          height={articleImages.hero.height}
          priority
        />

        <section className="content-section">
          <p className="content-paragraph">
            I never had to go looking for the Port of Rotterdam. It was always
            there.
          </p>
          <p className="content-paragraph">
            If you live here your whole life, the port is not a destination. It
            is the background. You see the cranes along the A15. You see the
            lorries, day and night, on every road out of the city. You know that
            somewhere past the last exit there is something larger than the city
            itself. That feels normal, until you start driving into it.
          </p>
          <p className="content-paragraph">
            For seven years I drove a taxi in the port. My passengers were
            harbour pilots, technicians, people from the oil storage terminals,
            traders, ships&apos; officers, and train drivers heading to Germany
            with a freight train, sometimes flown in via Schiphol that same
            morning. Usually I took them to a station. Sometimes I drove them
            across the border, or picked them up there.
          </p>
          <p className="content-paragraph">
            That work gave me something you cannot buy with a day ticket: access.
            Most of the port sits behind fences. You are not allowed in, you
            cannot get in, and that is as it should be. In a taxi I could,
            because somebody had to be collected and that somebody was not
            standing at the gate.
          </p>
          <p className="content-paragraph">
            What happened inside the car mattered just as much. People talk in
            taxis. They talk because you are not a colleague, not a manager, not
            a competitor. You are the man taking them home. Someone needs to get
            from A to B, and why is none of your business. You don&apos;t ask.
          </p>
          <p className="content-paragraph">
            Which is exactly how the port itself works, although I didn&apos;t
            see that at the time.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="sixty-kilometres-heading"
        >
          <h2 id="sixty-kilometres-heading" className="content-heading">
            Sixty kilometres of port
          </h2>
          <p className="content-paragraph">
            The first thing nobody pictures correctly is the scale. The Port of
            Rotterdam is not a quay with a few cranes on it. It is an area tens
            of kilometres long, running from the city docks to far beyond the
            Europoort, with its own roads, its own bridges, its own railway. You
            can drive in it for an hour without reaching the edge.
          </p>
          <p className="content-paragraph">
            And it is never quiet. That is a misunderstanding I hear often.
            People imagine a modern port as something silent. The opposite is
            true. Traffic moves constantly, loading never stops, something is
            always turning. The port does not pause, not at night, not at
            weekends, not at Christmas.
          </p>
          <p className="content-paragraph">
            I once typed an address into a satnav, back when in-car navigation
            was still fairly new. The signs on the road said straight ahead, so
            I drove straight ahead. On the screen beside me I was driving through
            the North Sea. All blue.
          </p>
          <p className="content-paragraph">
            I was on Maasvlakte 2, land raised from the sea bed and so new that
            the maps had not caught up. That is the port in a single image: it
            grows faster than the paperwork can follow. You drive across ground
            that on paper is still water.
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
          aria-labelledby="what-you-see-heading"
        >
          <h2 id="what-you-see-heading" className="content-heading">
            What you see from the water
          </h2>
          <p className="content-paragraph">
            If you want to see this for yourself, the water is the best place to
            be. From the road you see fences. From the water you see the port.
          </p>
          <p className="content-paragraph">
            The standard harbour tour with Spido lasts seventy-five minutes and
            stays within the city docks. You pass under the Erasmusbrug, along
            the Kop van Zuid, past the shipyards and the inland barges. That is
            the tour most visitors take, and as a first impression it is fine.
          </p>
          <p className="content-paragraph">
            But the trip to take if you want to see where it really happens is
            the long one. That one runs down the Nieuwe Waterweg, past the
            Maeslantkering, past Hoek van Holland, through the Europoort, all
            the way to the Maasvlakte. That is where the port Europe lives off
            actually operates.
          </p>
          <p className="content-paragraph">
            The difference between those two trips is the difference between a
            city and a machine.
          </p>
          <p className="content-paragraph">
            In the city docks everything is still on a human scale. Warehouses,
            quays, a crane you can follow with your eyes. On the Maasvlakte the
            scale stops making sense. The ships are so large that you misjudge
            distance. A container ship a kilometre away looks close. A crane
            that appears small is sixty metres high.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="port-without-people-heading"
        >
          <h2 id="port-without-people-heading" className="content-heading">
            A port without people
          </h2>
          <p className="content-paragraph">
            The two deep sea terminals on Maasvlakte 2 are heavily automated.
            The port as a whole is loud, but inside those fenced zones there is
            not a single person.
          </p>
          <p className="content-paragraph">
            At APM Terminals, running since 2015, roughly eighty per cent of
            crane movements are automated, and the manual part is carried out
            remotely. The automated zones are entirely fenced off, keeping
            people and machines apart. At the neighbouring Rotterdam World
            Gateway terminal the picture is the same: fifty automated stacking
            cranes operated remotely, and fifty-nine automated guided vehicles
            moving containers around the site.
          </p>
          <p className="content-paragraph">
            Those vehicles have no cab. They run at night without lights,
            because they have no need of eyes. They move in the dark across a
            site the size of a village, lifting forty-tonne boxes to positions a
            computer has calculated.
          </p>
          <p className="content-paragraph">
            I am not a port man. I drove there, I looked at it, that is all. So
            I am careful about judging how good this port is, because I
            don&apos;t know the others.
          </p>
          <p className="content-paragraph">
            But I once picked up an Englishman whose work took him to ports all
            over the world. China, America, places whose names I didn&apos;t
            recognise. What exactly he did there I never asked, because you
            don&apos;t. What I do know is what he said, and it stayed with me:
            that Rotterdam is the most advanced port he knows. So modern, so
            organised, so well thought through.
          </p>
          <p className="content-paragraph">
            When someone who has seen a hundred of them says that, there is
            something in it.
          </p>
          <p className="content-paragraph">
            For a writer there is something else in it too. A port that runs
            itself is, by definition, a port where nobody is watching.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="box-nobody-opens-heading"
        >
          <h2 id="box-nobody-opens-heading" className="content-heading">
            The box nobody opens
          </h2>
          <p className="content-paragraph">
            This is where the part that interested me as a writer begins, and
            what eventually became the engine of the book.
          </p>
          <p className="content-paragraph">
            Millions of containers pass through Rotterdam every year. Every box
            has paperwork, every box has a destination, and the logistics are
            built so that the box stands still for as short a time as possible.
            Time is money, and a waiting container costs everyone in the chain
            something.
          </p>
          <p className="content-paragraph">
            Only a small proportion of all those containers actually goes
            through a scanner. Dutch Customs operate six container scanners in
            the Port of Rotterdam, spread across different locations, where
            containers are examined with X-ray equipment. Selection is based on
            risk analysis: origin, cargo, declarant, patterns. Who gets picked
            is the output of a model.
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
            And that model has become smarter in recent years. Algorithms are
            now used that try to recognise from the scan image itself what is
            inside a box, looking for drugs, weapons and cigarettes. Not
            everyone in the field is convinced those algorithms are reliable
            enough. A scan image is not a photograph. It is a grey mass in which
            a trained eye recognises shapes, and in which water and pasta look
            much the same.
          </p>
          <p className="content-paragraph">
            What caught me is the gap in between.
          </p>
          <p className="content-paragraph">
            Before Customs can scan a container, it stands for a while in a
            stack among other containers. That gives so-called extractors the
            opportunity to remove hidden cargo before anything at all has been
            checked. Customs are working on a solution in which selected
            containers are moved to a secured area, but that is logistically
            difficult, precisely because those terminals are so heavily
            automated. A machine built for maximum throughput does not slow down
            easily.
          </p>
          <p className="content-paragraph">
            And there are drones, with thermal cameras, that see people walking
            in the narrow corridors between the containers.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="why-thriller-heading"
        >
          <h2 id="why-thriller-heading" className="content-heading">
            Why this became a thriller and not a travel story
          </h2>
          <p className="content-paragraph">
            According to Europol, more than seventy per cent of all cocaine
            entering Europe comes in through the ports of Antwerp and Rotterdam.
            Almost everybody knows that figure by now. What fewer people realise
            is that a route which works for one thing also works for another. A
            container makes no distinction about what is inside it.
          </p>
          <p className="content-paragraph">
            That is the starting point of <em>Schaduwen over Domburg</em>. Not
            the drugs, because that story has been told. But the same
            infrastructure, the same paperwork that checks out, the same unspoken
            agreement that you don&apos;t ask what is in the box. Someone needs
            to get from A to B. Why is none of your business.
          </p>
          <p className="content-paragraph">
            And on the other side of the country, a beach in Zeeland where
            nothing happens, and where for exactly that reason something can
            happen.
          </p>
          <p className="content-paragraph">
            The port and the Zeeland coast are closer together than people
            think. From the Maasvlakte you look out over the same sea. The water
            going out past Hoek van Holland runs down past Walcheren. For my
            protagonist that is not a metaphor but a travel time.
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
            There is a scene in the book set on exactly the stretch of water the
            Spido sails. I am not going to say which one.
          </p>
        </section>

        <FirstChapterCTA source="port-of-rotterdam" locale="en" />

        <section
          className="content-section"
          aria-labelledby="going-to-see-heading"
        >
          <h2 id="going-to-see-heading" className="content-heading">
            Going to see it yourself
          </h2>
          <p className="content-paragraph">
            The harbour tour departs from the Boompjeskade, close to Leuvehaven.
            The short tour runs daily. The long tour to the Maasvlakte only runs
            in certain periods and takes half a day, so check current times and
            fares on the operator&apos;s own site. I deliberately don&apos;t put
            prices here, because in a year they won&apos;t be right.
          </p>
          <p className="content-paragraph">Three things I would pass on.</p>
          <p className="content-paragraph">
            Sit on deck, even in the wind, because inside you see half of it.
          </p>
          <p className="content-paragraph">
            Take the long tour if you have the choice. The city docks are
            attractive, but the Maasvlakte is the story.
          </p>
          <p className="content-paragraph">
            And don&apos;t expect a tourist attraction. This is not a museum and
            not a viewpoint. It is a working area that happens to be impressive,
            which makes it better than most things built to impress.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="further-reading-port-heading"
        >
          <h2 id="further-reading-port-heading" className="content-heading">
            Further reading about the port
          </h2>
          <p className="content-paragraph">
            I read a great deal about the port for this book, from harbour
            history to books about the logistics themselves. A selection is in
            my overview of books about Rotterdam, alongside the novels that
            capture this city well.
          </p>
          <p className="content-paragraph">
            And if you want to see what the other side of the story looks like,
            the Zeeland side, I wrote about that separately in{" "}
            <Link href="/en/domburg">
              Domburg: the seaside town behind the book
            </Link>
            .
          </p>
        </section>
      </div>

      <div className="container content-page content-page--footer">
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
              href: "/en/domburg",
              label: "Domburg",
              description:
                "The seaside town behind the book, on the Zeeland side",
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
