import type { Metadata } from "next";
import { BlogPostCard } from "@/components/BlogPostCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { getPublishedBlogPosts } from "@/data/blog";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  buildJsonLd,
  collectionPageSchema,
  itemListSchema,
} from "@/lib/schema";

const pageTitle = "Blog | Books, E-readers and Rotterdam | Breure Media";
const pageDescription =
  "Guides to books, e-readers and Rotterdam, plus reading recommendations from Breure Media. Start here.";
const pagePath = "/en/blog";
const intro =
  "Stories do not begin only on the first page. Here you will find articles about books, e-readers, Rotterdam and the places that shape the stories of Breure Media.";

const posts = getPublishedBlogPosts("en");
const featuredImage = posts[0];

export const metadata: Metadata = buildMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  locale: "en_US",
  ...(featuredImage && {
    image: featuredImage.image,
    imageAlt: featuredImage.imageAlt,
    imageWidth: 1200,
    imageHeight: 675,
    imageType: "image/webp",
  }),
  languages: {
    nl: "/blog",
    en: pagePath,
    "x-default": pagePath,
  },
});

const breadcrumbs = [
  { name: "Home", path: "/en" },
  { name: "Blog", path: pagePath },
];

export default function EnglishBlogPage() {
  const jsonLd = buildJsonLd(
    collectionPageSchema(
      "Blog",
      absoluteUrl(pagePath),
      pageDescription,
      "en"
    ),
    breadcrumbSchema(breadcrumbs),
    itemListSchema(
      "Articles from Breure Media",
      posts.map((post) => ({
        name: post.title,
        url: absoluteUrl(post.href),
        description: post.excerpt,
        image: post.image,
        datePublished: post.publishedAt,
      }))
    )
  );

  return (
    <main lang="en">
      <JsonLd data={jsonLd} />
      <PageHeader title="Blog" description={intro} />
      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} />
        <section aria-label="Articles" className="blog-grid-section">
          <ul className="blog-grid">
            {posts.map((post, index) => (
              <li key={post.href} className="blog-grid-item">
                <BlogPostCard post={post} priority={index === 0} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
