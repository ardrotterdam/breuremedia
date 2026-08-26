import type { Metadata } from "next";
import { ChapterReadingPage } from "@/components/ChapterReadingPage";
import { getChapter1 } from "@/data/chapter-1";
import { buildMetadata } from "@/lib/seo";

const chapter = getChapter1("de");

export const metadata: Metadata = buildMetadata({
  title: `Kapitel 1: ${chapter.title} | ${chapter.bookTitle}`,
  description: `Lesen Sie das erste Kapitel von ${chapter.bookTitle}: ${chapter.title}.`,
  path: chapter.path,
  locale: "de_DE",
  noIndex: true,
});

export default function GermanChapter1Page() {
  return <ChapterReadingPage locale="de" />;
}
