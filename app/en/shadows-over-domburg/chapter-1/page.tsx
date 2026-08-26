import type { Metadata } from "next";
import { ChapterReadingPage } from "@/components/ChapterReadingPage";
import { getChapter1 } from "@/data/chapter-1";
import { buildMetadata } from "@/lib/seo";

const chapter = getChapter1("en");

export const metadata: Metadata = buildMetadata({
  title: `Chapter 1: ${chapter.title} | ${chapter.bookTitle}`,
  description: `Read the first chapter of ${chapter.bookTitle}: ${chapter.title}.`,
  path: chapter.path,
  locale: "en_US",
  noIndex: true,
});

export default function EnglishChapter1Page() {
  return <ChapterReadingPage locale="en" />;
}
