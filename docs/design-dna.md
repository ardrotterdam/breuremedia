# Breure Media — Design DNA

> Dit document is wet. Elke pagina, elk component, elke animatie en elke zin
> copy wordt hieraan getoetst vóór hij gebouwd wordt en nádat hij gebouwd is.
> Bij twijfel wint dit document van snelheid.

**Doelgroep:** developers, designers en Cursor-agents die werken aan
`breuremedia.com` — de site, e-mails, social assets en alles wat onder de
uitgeverij-vlag valt.

---

## De ambitie

Breure Media voelt als een serieuze literaire uitgeverij — niet als een
webshop, niet als een zelfpublicatie-template, niet als een blog. De eerste
reactie van een lezer die de site opent moet zijn: *dit is een boek dat ik
wil vasthouden*. De site moet dezelfde rust en zelfvertrouwen uitstralen als
een goed ontworpen hardcover op een nachttafel.

We streven naar het niveau van premium editorial design: Type Directors Club,
Dutch Design Awards, Awwwards — niet als show, maar als bewijs dat hier met
zorg is gewerkt. Elke pixel dient het boek en de lezer, niet de techniek.

---

## Wat Breure Media is (en niet is)

**Breure Media is:**
- Een Nederlandse uitgeverij van literaire thrillers
- Een merk dat kwaliteit boven volume stelt
- Een plek waar één boek centraal staat, niet een catalogus van twintig titels
- Een uitnodiging om te lezen — niet om te scrollen

**Breure Media is niet:**
- Een generieke boekenwebshop (Bol.com-achtig)
- Een auteurspagina op Wix of WordPress-template
- Een nieuwssite of literair tijdschrift
- Luid, schreeuwerig of clickbait-achtig

---

## De filosofie (Jobs-principes, vertaald naar Breure Media)

1. **Design is hoe het wérkt.** De bestelknop, de nieuwsbrief, de
   boekbeschrijving — dat ís het merk. Geen decoratie eromheen.
2. **Weglaten is de hoogste vorm van verfijning.** Eén boek per pagina
   verdient de volle aandacht. Geen carrousels, geen pop-ups, geen drie
   call-to-actions waar één volstaat.
3. **Zeg nee tegen 1.000 dingen.** Badges, sterren, "bestseller"-labels,
   social-proof-banners — alles wat schreeuwt dat het boek niet voor zichzelf
   spreekt, gaat eruit.
4. **De achterkant van de kast is ook afgewerkt.** 404-pagina, foutmeldingen
   bij het formulier, lege staten, bevestigingsmails — de schermen die
   "niemand ziet" krijgen dezelfde zorg als de homepage.
5. **Het moet vanzelfsprekend voelen.** Een lezer van 60 zonder
   tech-achtergrond moet zonder uitleg het boek kunnen bestellen en zich
   kunnen inschrijven. Geen handleiding nodig = geslaagd.

---

## De persoonlijkheid

**"De stilte vóór de eerste zin."** Literair, ingetogen, zelfverzekerd.
Donker genoeg voor spanning, warm genoeg voor vertrouwen. Denk aan een
goed verlichte boekwinkel na sluitingstijd — niet aan een thriller-filmposter.

**Stem:**
- Kalm, nooit hysterisch
- Zelfverzekerd zonder arrogantie
- Literair, nooit academisch of stijf
- Nederlands als moedertaal; geen Engelse marketing-taal tenzij het boek dat vereist

**Tagline (vast):** *Uitgeverij van literaire thrillers*

**Motto (accent, spaarzaam):** *Verhalen die de stilte doorbreken.*

**Contact:** info@breuremedia.com · Nederland

---

## De visuele taal — "Goud op warm papier in donkere stilte"

### Kleur

Alle kleuren komen uit `app/globals.css` (`:root`). Geen losse hexcodes in
componenten of inline styles.

| Token | Hex | Rol |
|---|---|---|
| `--color-warm-white` | `#F5F0E8` | Draagt alles. Papier, licht, literaire warmte. Pagina-achtergrond. |
| `--color-warm-white-muted` | `#E8E2D8` | Subtiele achtergronden, randen, zwevende vlakken. Nieuwsbrief- en FAQ-secties. |
| `--color-charcoal` | `#1E1E1E` | Header, primaire knop, donkere secties. Diepte, geen hard zwart. |
| `--color-charcoal-light` | `#2A2A2A` | Auteurssectie, secundaire donkere vlakken. |
| `--color-charcoal-mid` | `#333333` | Accentvlakken, secundaire donkere tinten. |
| `--color-gold` | `#B8975A` | Enige accentkleur. Eyebrows, hover, secundaire CTA, links. |
| `--color-gold-light` | `#D4B87A` | Hover op donkere achtergronden (nav, footer). |
| `--color-gold-subtle` | `rgba(184,151,90,0.15)` | Subtiele glans, borders, highlights. |
| `--color-text` | `#2C2C2C` | Bodytekst op lichte achtergrond. |
| `--color-text-muted` | `#6B6560` | Ondertekst, meta-informatie, placeholders. |

**Functionele kleuren (formulieren):**

| Gebruik | Hex | Klasse |
|---|---|---|
| Succesmelding | `#7A5F2E` | `.form-message.success` |
| Foutmelding | `#A04040` | `.form-message.error` |
| Info/loading | `--color-text-muted` | `.form-message.info` |

**Regels:**
- **Goud** is het enige accent. Maximaal één gouden highlight per scherm
  (eyebrow, border, of hover — niet alles tegelijk).
- **Charcoal** draagt autoriteit: header, primaire actie, auteurssectie, footer.
- **Warm white** is de leesomgeving. Nooit koud wit (`#FFFFFF`) als
  pagina-achtergrond.
- Nooit meer kleuren toevoegen zonder dit document te herzien.

### Typografie

| Rol | Font | Gewicht | Gebruik |
|---|---|---|---|
| Display / merk | **Cormorant Garamond** | 400, 600 (italic beschikbaar) | Logo, titels, prijs, blockquotes, auteursnaam |
| UI / body | **Inter** | 300, 400, 500 | Alles daaronder: nav, body, formulieren, knoppen |

**Implementatie:** `next/font/google` in `app/layout.tsx` → CSS-variabelen
`--font-serif` en `--font-sans`. Fallback: Georgia (serif), system-ui (sans).

**Regels:**
- Koppen ademen. `hero-title`: `clamp(2.5rem, 5.5vw, 3.75rem)`.
  `page-title`: `clamp(2rem, 4vw, 3rem)`.
  Hiërarchie in maximaal drie niveaus per scherm.
- Eyebrows zijn altijd uppercase, `letter-spacing: 0.18em`, goud — het zijn
  richtingaanwijzers, geen koppen.
- Bodytekst: `line-height: 1.7`, maximaal ~65 tekens per regel (`max-width: 52ch`
  waar relevant).
- Geen derde font toevoegen. Geen Geist, geen system-ui als display.

### Ruimte & vorm

- Witruimte is een feature. Twijfel tussen krap en ruim? **Ruim.**
- Container: `--container-max: 1120px`, padding `1.5rem`.
- Header: `--header-height: 64px`, fixed, charcoal.
- Sectie-padding: `6rem` desktop, `4rem` mobiel. Geen "ongeveer goed".
- Boekomslag: `aspect-ratio: 2/3`, subtiele schaduw, `border-radius: 2px`
  (bijna rechthoekig — boeken zijn geen pillen).
- Kaarten en vlakken: geen zware drop-shadows. Diepte via kleurcontrast
  (charcoal op warm white). Alleen de boekomslag krijgt een gelaagde,
  subtiele schaduw (`.book-cover`, `.book-card-cover img`).
- Editorial rule: korte horizontale lijn (`width: 4rem`) boven secties als
  visueel anker. Footer-variant: gouden tint, gecentreerd.
- Raster: consequent 4px-veelvouden.

### Textuur

- Subtiele papierkorrel over de hele pagina via `body::before`:
  SVG fractal noise overlay, `opacity: 0.028`, `pointer-events: none`.
  Voegt literaire warmte toe zonder afleiding.

### Beweging

- Beweging heeft betekenis: bevestigen, leiden. Nooit versieren.
- Standaard: `--transition: 0.3s ease`.
- Hover op knoppen: kleurverschuiving, geen scale-bounce.
- Hover op boekomslag: subtiel diepere schaduw (gouden rand-glow).
- Scroll: `scroll-behavior: smooth` met `scroll-padding-top: var(--header-height)`.
- Geen parallax, geen auto-play animaties, geen confetti bij nieuwsbrief-inschrijving.
- `prefers-reduced-motion: reduce`: scroll auto, transitions uitgeschakeld,
  hover-shadows gefixeerd.

---

## Paginastructuur

### Navigatie (vast)

Header: **Boeken** · **Auteur** · **Contact**

Footer: Boeken · Over de auteur · Contact · Privacy

Geen nieuwsbrief in de nav — die leeft op de homepage als sectie.

### Homepage (`app/page.tsx`)

1. **Header** — fixed, charcoal, logo + nav
2. **Hero** (`BookHero`) — boekomslag links (charcoal pane), titel + auteur +
   tagline + prijs + formaatnotitie + bestelknop rechts (warm white pane)
3. **Synopsis** — editorial rule, eyebrow "Over het boek", sectietitel,
   lange beschrijving (paragrafen uit `data/books.ts`)
4. **Auteur** — charcoal sectie, bio + blockquote met motto, link naar
   `/over-de-auteur`
5. **Nieuwsbrief** — warm-white-muted achtergrond, formulier
6. **Footer** — contact, tagline, nav, copyright

**Regel:** de homepage heeft één hoofdtaak: **het boek laten voelen alsof
je het al vasthoudt.** Alles wat die taak niet dient, gaat eruit.

### Overige pagina's

| Route | Componenten | Hoofdtaak |
|---|---|---|
| `/boeken` | `PageHeader`, `BookCard` grid | Overzicht van alle titels |
| `/boeken/[slug]` | `BookHero`, synopsis, `FaqSection`, `OrderButton` | Eén boek in volle glorie |
| `/over-de-auteur` | `PageHeader`, content-secties, blockquote | Auteur introduceren |
| `/contact` | `PageHeader`, contactinfo, `theme-list` | Bereikbaar zijn |
| `/privacy` | `PageHeader`, content-secties | Juridisch, maar verzorgd |
| 404 (`not-found.tsx`) | `.not-found`, terug-links | Terug naar het boek leiden |

Alle inner pages delen `.page-header` (warm-white-muted achtergrond) en
`.content-page` / `.content-section` typografie.

---

## Copy & content

### Toon

- Schrijf alsof je een brief aan een literaire lezer stuurt — niet als een
  marketingafdeling.
- Beschrijf het boek met zintuigen en sfeer, niet met superlatieven
  ("de beste thriller ooit").
- Prijs en formaat zijn feiten, geen verkooptrucs. Toon ze rustig.
- Auteursectie: mysterie mag, maar geen pseudoniem-theater. Eerlijk en
  literair.

### Wat niet

- "Must-read", "pageturner", "bestseller" (tenzij feitelijk bewezen)
- Emoji in UI of copy
- Engelse woorden waar Nederlands volstaat ("newsletter" → nieuwsbrief)
- Clickbait-koppen of COUNTDOWN-timers

### SEO & metadata

- Taal: `lang="nl"` op `<html>`
- Elke pagina: unieke `<title>` en `<meta name="description">`
- Formaat title homepage: `{Boektitel} | {Auteur} | Breure Media`
- Overige pagina's: `{Pagina} | Breure Media`
- Description: één zin, literair, geen keyword-stuffing
- Open Graph, Twitter Cards, canonical URL via `lib/seo.ts`
- JSON-LD: Organization, WebSite, Book, Person, BreadcrumbList, FAQPage
  via `lib/schema.ts`
- Sitemap en robots.txt gegenereerd bij build

---

## Componenten (vastgelegd)

### Logo

- Tekst: `Breure Media` — Cormorant Garamond, `letter-spacing: 0.04em`
- Op donkere achtergrond: `--color-warm-white`
- Nooit een afbeelding-logo zonder dit document te herzien

### Knoppen

| Variant | Gebruik | Regel |
|---|---|---|
| `.btn-primary` | Hoofdactie (Bestel het boek) | Maximaal één per scherm |
| `.btn-secondary` | Secundaire actie (Inschrijven) | Nooit naast primary als gelijkwaardig |

- Uppercase, `letter-spacing: 0.12em`, geen iconen in knoppen
- Padding: `0.875rem 2rem`, font-size `0.8125rem`
- Primary hover: charcoal → goud (tekst wordt charcoal)
- Secondary hover: border → goud, tekst → charcoal

### Formulieren (`NewsletterForm`)

- Labels: visueel verborgen maar aanwezig (`.visually-hidden`) voor screenreaders
- Input: underline-only (geen box), border-bottom warm white → goud bij focus
- Focus: gouden border + `outline: 2px solid var(--color-gold)` op focus-visible
- Foutmeldingen: rustig rood (`#A04040`), geen schreeuwerige alerts
- Succesmelding: `#7A5F2E`, inline onder het formulier (`aria-live="polite"`)
- Honeypot (`botcheck`) visueel verborgen tegen spam
- Privacy-tekst onder formulier: `0.75rem`, muted

### Boekomslag

- `<Image className="book-cover">` via Next.js Image
- Alt-tekst: boektitel + auteur (descriptief, geen marketing)
- `aspect-ratio: 2/3`, `object-fit: contain`, gelaagde subtiele schaduw
- `priority` en `sizes` responsive in hero (LCP-optimalisatie)
- Hover: diepere schaduw + subtiele gouden rand-glow

### BookCard (overzichtspagina)

- Grid: `repeat(auto-fill, minmax(280px, 1fr))`, gap `3rem`
- Cover + titel (serif) + auteur (italic serif) + beschrijving + prijs
- Hover op cover: subtiel diepere schaduw

### Navigatie (`Header`)

- Desktop: horizontaal, uppercase, muted warm white (`rgba(232,226,216,0.72)`)
- Mobiel (<640px): hamburger → fullscreen dropdown, zelfde charcoal
- `aria-expanded` op toggle, `aria-label` op menu-knop
- Breakpoint: `640px`

### Breadcrumbs

- Font-size `0.75rem`, scheidingsteken `/`
- Huidige pagina: `--color-charcoal`, rest: muted
- Hover: goud

### FAQ (`FaqSection`)

- Achtergrond: `--color-warm-white-muted`
- Vraag: serif, `1.125rem`, weight 600
- Antwoord: muted, max `52ch`
- Scheiding: subtiele border-top/bottom

### PageHeader (inner pages)

- Padding-top: `calc(var(--header-height) + 4rem)`
- Achtergrond: `--color-warm-white-muted`
- Titel: serif, `clamp(2rem, 4vw, 3rem)`
- Beschrijving: muted, max `48ch`

### Editorial rule

- `<hr class="editorial-rule">` — korte lijn boven secties
- Footer-variant: `.editorial-rule--footer` — gouden tint, gecentreerd

### Text links

- `.text-link` — uppercase, goud, `letter-spacing: 0.06em`
- Hover: charcoal

### 404

- Gecentreerd, max `32rem`
- Charcoal + warm white, geen grapjes
- Terug-links als `.btn-primary` / `.btn-secondary`

---

## Technische conventies

- **Stack:** Next.js 15 (App Router) + TypeScript + CSS (geen Tailwind)
- **Tokens:** alle kleuren en fonts via CSS custom properties in `:root`
  (`app/globals.css`)
- **Fonts:** Google Fonts via `next/font` — Cormorant Garamond + Inter
- **Breakpoints:** `900px` (hero grid → single column), `640px` (mobiel nav)
- **Server Components** by default; client components alleen voor interactiviteit
  (Header nav, NewsletterForm, OrderButton)
- **Data:** boeken in `data/books.ts`, site-constants in `lib/site.ts`
- **Toegankelijkheid:** semantische HTML, focus states, aria-attributen,
  voldoende contrast (goud op charcoal alleen voor grote tekst of accenten),
  `prefers-reduced-motion` respecteren
- **Afbeeldingen:** Next.js `<Image>`, WebP covers in `public/assets/`
- **Favicon:** `/assets/favicon.svg`

---

## De lat (checklist per pagina/component)

- [ ] Voelt dit als een serieuze literaire uitgeverij — niet als een template?
- [ ] Is er precies één duidelijke hoofdactie?
- [ ] Kan er iets weg zonder verlies? Dan gaat het weg.
- [ ] Kloppen lege staat, laadstaat en foutstaat — en zijn ze verzorgd?
- [ ] Werkt en oogt het op mobiel net zo doordacht als op desktop?
- [ ] Gebruikt het uitsluitend de tokens uit `globals.css` (geen losse hexcodes)?
- [ ] Is de copy literair en kalm — geen marketing-taal?
- [ ] Zou een Awwwards-jury dit serieus nemen als editorial design?

---

## Anti-patronen (direct afkeuren)

- Bootstrap/template-look, generieke boekenwebshop-grijs
- Meerdere primaire knoppen naast elkaar
- Sterrenratings, "bestseller"-badges, countdown-timers
- Emoji als UI-element
- Stockfoto's van mensen die "lezen" met geforceerde glimlach
- Carrousels, pop-ups, cookie-banners die het hele scherm vullen
- Koud wit (`#FFFFFF`) als pagina-achtergrond
- Losse hexcodes in componenten in plaats van CSS tokens
- Engelse UI-labels op een Nederlandse site
- Tailwind of andere utility-first frameworks (dit project gebruikt plain CSS)
- "Tijdelijk lelijk, fixen we later" — nee. Het is meteen goed, of het wacht.

---

## Relatie tot andere projecten

| Project | Relatie |
|---|---|
| **Schaduwen over Domburg** | Eerste titel op de site; auteur Ard Breure; prijs €29,95 |
| **CoachBalie** | Zelfde DNA-structuur, ander merk — warm papier vs. baanblauw |
| **HormuzEye** | Zelfde editorial discipline, ander domein (finance vs. fictie) |

Bij twijfel over merkscheiding: Breure Media = fictie en literaire spanning.
Geen kruisbestuiving van kleuren, fonts of toon met andere merken.

---

*Laatst bijgewerkt: juli 2026 — versie 2.0 (Next.js)*
