"use client";

import { useId, useState } from "react";
import type { FaqItem } from "@/data/books";
import type { Locale } from "@/lib/i18n";

interface FaqSectionProps {
  items: FaqItem[];
  title?: string;
  eyebrow?: string;
  locale?: Locale;
}

const copy: Record<Locale, { title: string; eyebrow: string }> = {
  nl: { title: "Veelgestelde vragen", eyebrow: "Vragen van lezers" },
  en: { title: "Frequently asked questions", eyebrow: "Reader questions" },
  de: { title: "Häufige Fragen", eyebrow: "Fragen der Leser" },
};

export function FaqSection({
  items,
  title,
  eyebrow,
  locale = "nl",
}: FaqSectionProps) {
  const defaults = copy[locale];
  const heading = title ?? defaults.title;
  const kicker = eyebrow ?? defaults.eyebrow;
  const baseId = useId();
  const [openItems, setOpenItems] = useState<Set<number>>(() => new Set());

  function toggleItem(index: number) {
    setOpenItems((current) => {
      const next = new Set(current);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <section className="faq" aria-labelledby="faq-heading">
      <div className="container faq-inner">
        <p className="section-eyebrow">{kicker}</p>
        <h2 id="faq-heading" className="section-title">
          {heading}
        </h2>
        <div className="faq-list">
          {items.map((item, index) => {
            const isOpen = openItems.has(index);
            const panelId = `${baseId}-panel-${index}`;

            return (
              <div key={item.question} className="faq-item">
                <button
                  type="button"
                  className="faq-trigger"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleItem(index)}
                >
                  <span className="faq-question">{item.question}</span>
                  <span className="faq-icon" aria-hidden="true">
                    +
                  </span>
                </button>
                <div
                  id={panelId}
                  className={`faq-panel${isOpen ? " is-open" : ""}`}
                  hidden={!isOpen}
                >
                  <p className="faq-answer">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
