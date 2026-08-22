import Link from "next/link";
import type { BreadcrumbItem } from "@/lib/schema";
import type { Locale } from "@/lib/i18n";

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  locale?: Locale;
}

const ariaLabels: Record<Locale, string> = {
  nl: "Broodkruimelpad",
  en: "Breadcrumb",
  de: "Brotkrumennavigation",
};

export function Breadcrumbs({ items, locale = "nl" }: BreadcrumbsProps) {
  return (
    <nav aria-label={ariaLabels[locale]} className="breadcrumbs">
      <ol className="breadcrumbs-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="breadcrumbs-item">
              {isLast ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <Link href={item.path}>{item.name}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
