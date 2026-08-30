interface BlogImagePlaceholderProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

/**
 * Temporary stand-in for next/image. Renders a grey box at the final
 * aspect ratio and shows the target path, so missing files do not break
 * the page. Swap for next/image once the files exist.
 */
export function BlogImagePlaceholder({
  src,
  alt,
  width,
  height,
  priority = false,
}: BlogImagePlaceholderProps) {
  return (
    <figure className="content-section">
      <div
        className="blog-image-placeholder"
        role="img"
        aria-label={alt}
        data-src={src}
        data-priority={priority ? "high" : undefined}
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <span className="blog-image-placeholder-path">{src}</span>
        <span className="blog-image-placeholder-alt">{alt}</span>
      </div>
    </figure>
  );
}
