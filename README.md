# Breure Media

Official website for Breure Media — a Dutch publisher of literary thrillers.

## Technology

- **Next.js 15** (App Router)
- **TypeScript**
- **Server Components** by default; client components only for interactivity (nav, forms, order button)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm start
```

## Production

https://breuremedia.com

## Project structure

```
app/                    # Next.js App Router pages
  page.tsx              # Home
  over-de-auteur/       # About the author
  boeken/               # Books overview
  boeken/[slug]/        # Dynamic book detail pages
  contact/
  privacy/
  sitemap.ts            # Auto-generated sitemap
  robots.ts             # Robots.txt
  layout.tsx            # Root layout, fonts, global metadata
  globals.css           # Editorial design tokens & styles
components/             # Reusable UI (Header, Footer, BookCard, FAQ, etc.)
data/
  books.ts              # Book registry — add entries here for new titles
lib/
  site.ts               # Site-wide constants (URL, author, nav)
  seo.ts                # Metadata builder (title, OG, Twitter, canonical)
  schema.ts             # JSON-LD structured data helpers
public/
  assets/               # Static images (cover, favicon)
docs/
  design-dna.md         # Brand & design guidelines
  content-dna.md        # Editorial strategy, clusters, affiliate philosophy
```

## Adding a new book

1. Add a cover image to `public/assets/`
2. Add an entry to the `books` array in `data/books.ts`
3. The book detail page, sitemap entry, and books overview update automatically

## SEO

Each page includes unique metadata (title, description, canonical, Open Graph, Twitter Card) and JSON-LD structured data (Organization, Book, Person, BreadcrumbList, FAQPage). Sitemap and robots.txt are generated at build time.
