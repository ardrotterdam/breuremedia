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

const pageTitle = "Blog over boeken, e-readers en schrijven | Breure Media";
const pageDescription =
  "Artikelen over e-booklengte, waterdichte e-readers en meer. Lees de gidsen van Breure Media — start hier.";
const pagePath = "/blog";
const intro =
  "Verhalen beginnen niet alleen op de eerste pagina. Hier lees je artikelen over boeken, e-readers, schrijven en de plaatsen die de verhalen van Breure Media vormgeven.";

const posts = getPublishedBlogPosts();
const featuredImage = posts[0];

export const metadata: Metadata = buildMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  ...(featuredImage && {
    image: featuredImage.image,
    imageAlt: featuredImage.imageAlt,
    imageWidth: 1200,
    imageHeight: 675,
    imageType: "image/webp",
  }),
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Blog", path: pagePath },
];

export default function BlogPage() {
  const jsonLd = buildJsonLd(
    collectionPageSchema("Blog", absoluteUrl(pagePath), pageDescription),
    breadcrumbSchema(breadcrumbs),
    itemListSchema(
      "Artikelen van Breure Media",
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
    <main>
      <JsonLd data={jsonLd} />
      <PageHeader title="Blog" description={intro} />
      <div className="container content-page">
        <Breadcrumbs items={breadcrumbs} />
        <section aria-label="Artikelen" className="blog-grid-section">
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
