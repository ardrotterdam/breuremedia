import type { FaqItem } from "@/data/books";

interface FaqSectionProps {
  items: FaqItem[];
  title?: string;
}

export function FaqSection({
  items,
  title = "Veelgestelde vragen",
}: FaqSectionProps) {
  return (
    <section className="faq" aria-labelledby="faq-heading">
      <div className="container faq-inner">
        <p className="section-eyebrow">Vragen van lezers</p>
        <h2 id="faq-heading" className="section-title">
          {title}
        </h2>
        <dl className="faq-list">
          {items.map((item) => (
            <div key={item.question} className="faq-item">
              <dt className="faq-question">{item.question}</dt>
              <dd className="faq-answer">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
