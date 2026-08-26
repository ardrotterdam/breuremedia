import { absoluteUrl } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

export const CHAPTER_1_SLUG = "schaduwen-over-domburg";

/**
 * Last manuscript commits from which the website Chapter 1 copies were taken.
 * Literary source of truth remains schaduwen-over-domburg-v2.
 */
export const CHAPTER_1_MANUSCRIPT_SOURCES: Record<
  Locale,
  { path: string; commit: string }
> = {
  nl: {
    path: "01-manuscript/deel-1-de-haven/01-het-lichaam.md",
    commit: "39e784d71b1826fd0f79e237f715708b9cda95f6",
  },
  en: {
    path: "02-manuscript-en/part-1-the-harbour/01-the-body.md",
    commit: "83b389d009d332f249f9c00c182ba62b0679a7eb",
  },
  de: {
    path: "02-manuscript-de/teil-1-der-hafen/01-die-leiche.md",
    commit: "5e2657a6f7808b2715ca64a97734cc779654ed80",
  },
};

export const CHAPTER_1_PATHS: Record<Locale, string> = {
  nl: "/boeken/schaduwen-over-domburg/hoofdstuk-1",
  en: "/en/shadows-over-domburg/chapter-1",
  de: "/de/schatten-ueber-domburg/kapitel-1",
};

export const CHAPTER_1_BOOK_PATHS: Record<Locale, string> = {
  nl: "/boeken/schaduwen-over-domburg",
  en: "/en/shadows-over-domburg",
  de: "/de/schatten-ueber-domburg",
};

export function chapter1Url(locale: Locale): string {
  return absoluteUrl(CHAPTER_1_PATHS[locale]);
}

export function isChapter1Book(slug: string): boolean {
  return (
    slug === CHAPTER_1_SLUG ||
    slug === "shadows-over-domburg" ||
    slug === "schatten-ueber-domburg"
  );
}
