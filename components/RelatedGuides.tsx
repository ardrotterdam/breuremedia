import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export interface RelatedGuide {
  href: string;
  label: string;
  description?: string;
}

interface RelatedGuidesProps {
  guides: RelatedGuide[];
  title?: string;
  locale?: Locale;
}

const titles: Record<Locale, string> = {
  nl: "Verder lezen",
  en: "Further reading",
  de: "Weiterlesen",
};

export function RelatedGuides({
  guides,
  title,
  locale = "nl",
}: RelatedGuidesProps) {
  if (guides.length === 0) {
    return null;
  }

  return (
    <section className="content-section" aria-labelledby="related-guides-heading">
      <h2 id="related-guides-heading" className="content-heading">
        {title ?? titles[locale]}
      </h2>
      <ul className="theme-list related-guides-list">
        {guides.map((guide) => (
          <li key={guide.href}>
            <Link href={guide.href}>{guide.label}</Link>
            {guide.description ? `: ${guide.description}` : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
