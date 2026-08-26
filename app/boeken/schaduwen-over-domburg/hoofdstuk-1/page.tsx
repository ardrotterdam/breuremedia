import type { Metadata } from "next";
import { ChapterReadingPage } from "@/components/ChapterReadingPage";
import { getChapter1 } from "@/data/chapter-1";
import { buildMetadata } from "@/lib/seo";

const chapter = getChapter1("nl");

export const metadata: Metadata = buildMetadata({
  title: `Hoofdstuk 1: ${chapter.title} | ${chapter.bookTitle}`,
  description: `Lees het eerste hoofdstuk van ${chapter.bookTitle}: ${chapter.title}.`,
  path: chapter.path,
  noIndex: true,
});

export default function DutchChapter1Page() {
  return <ChapterReadingPage locale="nl" />;
}
