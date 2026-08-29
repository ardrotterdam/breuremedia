import type { Metadata } from "next";
import { AuthorsWaitlistCTA } from "@/components/AuthorsWaitlistCTA";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { localeAlternates } from "@/lib/i18n";
import { breadcrumbSchema, buildJsonLd } from "@/lib/schema";
import { buildMetadata, sitePageTitle } from "@/lib/seo";

const pagePath = "/en/for-authors";

export const metadata: Metadata = buildMetadata({
  title: sitePageTitle("For authors"),
  description:
    "Breure Media is becoming a label for literary thrillers from the Netherlands, Belgium and Germany. Write thrillers? Leave your email address.",
  path: pagePath,
  locale: "en_US",
  languages: localeAlternates(pagePath),
});

const breadcrumbs = [
  { name: "Home", path: "/en" },
  { name: "For authors", path: pagePath },
];

export default function EnglishAuthorsPage() {
  const jsonLd = buildJsonLd(breadcrumbSchema(breadcrumbs));

  return (
    <main lang="en">
      <JsonLd data={jsonLd} />
      <PageHeader title="For authors" />
      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} locale="en" />

        <section className="content-section">
          <p className="content-paragraph">
            Breure Media is an independent label for literary thrillers. Right
            now it publishes my own work. In 2027 I want to open the label to
            other thriller authors.
          </p>
        </section>

        <section className="content-section" aria-labelledby="the-idea-heading">
          <h2 id="the-idea-heading" className="content-heading">
            The idea
          </h2>
          <p className="content-paragraph">
            Not a general bookshelf, but a narrow list. Everything here is a
            literary thriller. A reader who arrives is here for exactly that.
            That is the difference with a large store where your book sits
            between everything and nothing.
          </p>
          <p className="content-paragraph">
            You keep your rights. Your book sits in my shop, in my mailings,
            and in the places where I find readers.
          </p>
        </section>

        <section
          className="content-section"
          aria-labelledby="what-i-am-building-heading"
        >
          <h2 id="what-i-am-building-heading" className="content-heading">
            What I am building
          </h2>
          <ul className="theme-list">
            <li>
              A shop of my own with direct sales, which means a better margin
              than the large platforms.
            </li>
            <li>
              A list of people who read thrillers, not of random visitors.
            </li>
            <li>
              Visibility in Google for Zeeland, Rotterdam and the world
              behind the books.
            </li>
            <li>
              A German edition, because German readers are not a small group on
              this coast.
            </li>
          </ul>
        </section>

        <section
          className="content-section"
          aria-labelledby="where-this-stands-heading"
        >
          <h2 id="where-this-stands-heading" className="content-heading">
            Honest about where this stands
          </h2>
          <p className="content-paragraph">
            The label is young. My first book is finished and sales are starting
            now. I will not promise reach that does not exist yet. What does
            exist: a clear direction, a narrow list and a plan I work through
            step by step.
          </p>
          <p className="content-paragraph">
            If it works, I open the door. If it does not work, you will hear
            that too.
          </p>
        </section>

        <AuthorsWaitlistCTA source="authors-en" locale="en" />
      </div>
    </main>
  );
}
