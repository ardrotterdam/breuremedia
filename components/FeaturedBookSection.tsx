interface FeaturedBookSectionProps {
  eyebrow: string;
  title: string;
  hook: string;
  paragraphs: string[];
  headingId: string;
}

export function FeaturedBookSection({
  eyebrow,
  title,
  hook,
  paragraphs,
  headingId,
}: FeaturedBookSectionProps) {
  const body = paragraphs[0] === hook ? paragraphs.slice(1) : paragraphs;

  return (
    <section className="synopsis" aria-labelledby={headingId}>
      <div className="container synopsis-inner">
        <hr className="editorial-rule" aria-hidden="true" />
        <p className="section-eyebrow">{eyebrow}</p>
        <h2 id={headingId} className="section-title">
          {title}
        </h2>
        <p className="hero-tagline">{hook}</p>
        {body.map((paragraph) => (
          <p key={paragraph} className="synopsis-paragraph">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
