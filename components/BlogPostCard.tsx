import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/data/blog";
import { formatBlogDate } from "@/data/blog";

interface BlogPostCardProps {
  post: BlogPost;
  /** Eager-load the first above-the-fold card image. */
  priority?: boolean;
}

export function BlogPostCard({ post, priority = false }: BlogPostCardProps) {
  const displayDate = post.updatedAt ?? post.publishedAt;
  const dateLabel =
    post.updatedAt && post.updatedAt !== post.publishedAt
      ? "Bijgewerkt"
      : "Gepubliceerd";

  return (
    <article className="blog-card">
      <Link href={post.href} className="blog-card-link">
        <div className="blog-card-media">
          <Image
            src={post.image}
            alt={post.imageAlt}
            width={1200}
            height={675}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            loading={priority ? undefined : "lazy"}
          />
        </div>
        <div className="blog-card-body">
          <p className="blog-card-category">{post.category}</p>
          <h2 className="blog-card-title">{post.title}</h2>
          <p className="blog-card-excerpt">{post.excerpt}</p>
          <p className="blog-card-meta">
            <time dateTime={displayDate}>
              {dateLabel} {formatBlogDate(displayDate)}
            </time>
          </p>
          <span className="blog-card-cta" aria-hidden="true">
            Lees het artikel
          </span>
        </div>
      </Link>
    </article>
  );
}
