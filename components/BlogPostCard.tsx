import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/data/blog";
import { formatBlogDate } from "@/data/blog";

const cardCopy = {
  nl: {
    updated: "Bijgewerkt",
    published: "Gepubliceerd",
    cta: "Lees het artikel",
  },
  en: {
    updated: "Updated",
    published: "Published",
    cta: "Read the article",
  },
  de: {
    updated: "Aktualisiert",
    published: "Veröffentlicht",
    cta: "Artikel lesen",
  },
} as const;

interface BlogPostCardProps {
  post: BlogPost;
  /** Eager-load the first above-the-fold card image. */
  priority?: boolean;
}

export function BlogPostCard({ post, priority = false }: BlogPostCardProps) {
  const copy = cardCopy[post.locale];
  const displayDate = post.updatedAt ?? post.publishedAt;
  const dateLabel =
    post.updatedAt && post.updatedAt !== post.publishedAt
      ? copy.updated
      : copy.published;

  return (
    <article className="blog-card">
      <Link href={post.href} className="blog-card-link">
        {post.image ? (
          <div className="blog-card-media">
            <Image
              src={post.image}
              alt={post.imageAlt ?? ""}
              width={1200}
              height={675}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
              loading={priority ? undefined : "lazy"}
            />
          </div>
        ) : null}
        <div className="blog-card-body">
          <p className="blog-card-category">{post.category}</p>
          <h2 className="blog-card-title">{post.title}</h2>
          <p className="blog-card-excerpt">{post.excerpt}</p>
          <p className="blog-card-meta">
            <time dateTime={displayDate}>
              {dateLabel} {formatBlogDate(displayDate, post.locale)}
            </time>
          </p>
          <span className="blog-card-cta" aria-hidden="true">
            {copy.cta}
          </span>
        </div>
      </Link>
    </article>
  );
}
