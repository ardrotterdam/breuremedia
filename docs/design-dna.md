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

---

## De visuele taal — "Goud op warm papier in donkere stilte"

### Kleur

Alle kleuren komen uit `styles.css` (`:root`). Geen losse hexcodes in HTML of
componenten.

| Token | Hex | Rol |
|---|---|---|
| `--color-warm-white` | `#F5F0E8` | Draagt alles. Papier, licht, literaire warmte. |
| `--color-warm-white-muted` | `#E8E2D8` | Subtiele achtergronden, randen, zwevende vlakken. |
| `--color-charcoal` | `#1E1E1E` | Header, primaire knop, donkere secties. Diepte, geen hard zwart. |
| `--color-charcoal-light` | `#2A2A2A` | Footer, secundaire donkere vlakken. |
| `--color-charcoal-mid` | `#333333` | Accentvlakken, secundaire donkere tinten. |
| `--color-gold` | `#B8975A` | Enige accentkleur. Eyebrows, hover, secundaire CTA. |
| `--color-gold-light` | `#D4B87A` | Hover op donkere achtergronden. |
| `--color-gold-subtle` | `rgba(184,151,90,0.15)` | Subtiele glans, borders, highlights. |
| `--color-text` | `#2C2C2C` | Bodytekst op lichte achtergrond. |
| `--color-text-muted` | `#6B6560` | Ondertekst, meta-informatie, placeholders. |

**Regels:**
- **Goud** is het enige accent. Maximaal één gouden highlight per scherm
  (eyebrow, border, of hover — niet alles tegelijk).
- **Charcoal** draagt autoriteit: header, primaire actie, auteurssectie.
- **Warm white** is de leesomgeving. Nooit koud wit (`#FFFFFF`) als
  pagina-achtergrond.
- Nooit meer kleuren toevoegen zonder dit document te herzien.

### Typografie

| Rol | Font | Gewicht | Gebruik |
|---|---|---|---|
| Display / merk | **Cormorant Garamond** | 400, 600 | Logo, titels, prijs, blockquotes |
| UI / body | **Inter** | 300, 400, 500 | Alles daaronder: nav, body, formulieren, knoppen |

**Regels:**
- Koppen ademen. `hero-title` mag groot zijn (`clamp(2.5rem, 6vw, 4rem)`).
  Hiërarchie in maximaal drie niveaus per scherm.
- Eyebrows zijn altijd uppercase, `letter-spacing: 0.2em`, goud — het zijn
  richtingaanwijzers, geen koppen.
- Bodytekst: `line-height: 1.7`, maximaal ~65 tekens per regel (`max-width: 52ch`
  waar relevant).
- Geen derde font toevoegen. Geen Geist, geen system-ui als display.

### Ruimte & vorm

- Witruimte is een feature. Twijfel tussen krap en ruim? **Ruim.**
- Container: `--container-max: 1120px`, padding `1.5rem`.
- Sectie-padding: `6rem` desktop, `4rem` mobiel. Geen "ongeveer goed".
- Boekomslag: `aspect-ratio: 2/3`, subtiele schaduw, `border-radius: 2px`
  (bijna rechthoekig — boeken zijn geen pillen).
- Kaarten en vlakken: geen zware drop-shadows. Diepte via kleurcontrast
  (charcoal op warm white). Alleen de boekomslag krijgt een gelaagde,
  subtiele schaduw (`.book-cover` in `styles.css`).
- Raster: consequent 4px-veelvouden.

### Beweging

- Beweging heeft betekenis: bevestigen, leiden. Nooit versieren.
- Standaard: `--transition: 0.3s ease`.
- Hover op knoppen: kleurverschuiving, geen scale-bounce.
- Scroll: `scroll-behavior: smooth` met `scroll-padding-top` voor vaste header.
- Geen parallax, geen auto-play animaties, geen confetti bij nieuwsbrief-inschrijving.
- Eén signatuurmoment mag: de boekomslag die subtiel oplicht bij hover
  (toekomstig). De rest is kalm.

---

## Paginastructuur

### Homepage (huidige opzet — vast)

1. **Header** — vast, charcoal, logo + nav (Het boek · Auteur · Nieuwsbrief · Contact)
2. **Hero** — boekomslag links (`assets/schaduwen-over-domburg-cover.webp`),
   titel *Schaduwen over Domburg*, auteur Ard Breure, beschrijving, prijs
   €29,95, formaatnotitie (“Verschijningsdatum en uitvoering volgen.”) +
   primaire CTA rechts
3. **Auteur** — charcoal sectie, tekst + blockquote
4. **Nieuwsbrief** — gecentreerd, één formulier
5. **Footer** — contact, tagline, copyright

**Regel:** de homepage heeft één hoofdtaak: **het boek laten voelen alsof
je het al vasthoudt.** Alles wat die taak niet dient, gaat eruit.

### Toekomstige pagina's (zelfde DNA)

| Pagina | Hoofdtaak | Opmerking |
|---|---|---|
| Bestelpagina | Boek kopen in zo min mogelijk stappen | Geen account verplicht |
| Bedankpagina | Bevestigen + verwachting zetten | Zelfde typografie en kleuren |
| Privacy / AV | Juridisch, maar verzorgd | Geen template-look |
| 404 | Terug naar het boek leiden | Charcoal + warm white, geen grapjes |

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
  (huidige waarde: `Schaduwen over Domburg | Ard Breure | Breure Media`)
- Overige pagina's: `{Pagina} | Breure Media`
- Description: één zin, literair, geen keyword-stuffing
- Open Graph en Twitter Cards volgen dezelfde toon (toekomstig)

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
- Primary hover: charcoal → goud
- Secondary hover: goud → goud-light

### Formulieren

- Labels: visueel verborgen maar aanwezig (`visually-hidden`) voor screenreaders
- Focus: gouden border (`border-color: var(--color-gold)`)
- Foutmeldingen: rustig rood (`#A04040`), geen schreeuwerige alerts
- Succesmelding: goud, inline onder het formulier (`aria-live="polite"`)

### Boekomslag

- `<img class="book-cover">` met `src="assets/schaduwen-over-domburg-cover.webp"`
- Alt-tekst: boektitel + auteur (descriptief, geen marketing)
- `aspect-ratio: 2/3`, `object-fit: contain`, gelaagde subtiele schaduw
- `loading="eager"` en `fetchpriority="high"` in hero (LCP)
- Geen placeholder-gradient meer — alleen het echte coverbestand

### Navigatie

- Desktop: horizontaal, uppercase, muted warm white
- Mobiel: hamburger → fullscreen dropdown, zelfde charcoal
- `aria-expanded` op toggle, `aria-label` op menu-knop

---

## Technische conventies

- **Stack:** statische HTML + `styles.css` + `script.js` (fase 1)
- **Tokens:** alle kleuren en fonts via CSS custom properties in `:root`
- **Fonts:** Google Fonts — Cormorant Garamond + Inter (preconnect aanwezig)
- **Breakpoints:** `900px` (grid → single column), `640px` (mobiel nav)
- **Toegankelijkheid:** semantische HTML, focus states, aria-attributen,
  voldoende contrast (goud op charcoal alleen voor grote tekst of accenten)
- **Geen frameworks** in fase 1 tenzij dit document wordt herzien

---

## De lat (checklist per pagina/component)

- [ ] Voelt dit als een serieuze literaire uitgeverij — niet als een template?
- [ ] Is er precies één duidelijke hoofdactie?
- [ ] Kan er iets weg zonder verlies? Dan gaat het weg.
- [ ] Kloppen lege staat, laadstaat en foutstaat — en zijn ze verzorgd?
- [ ] Werkt en oogt het op mobiel net zo doordacht als op desktop?
- [ ] Gebruikt het uitsluitend de tokens uit `styles.css` (geen losse hexcodes)?
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
- Losse hexcodes in HTML/JS in plaats van CSS tokens
- Engelse UI-labels op een Nederlandse site
- "Tijdelijk lelijk, fixen we later" — nee. Het is meteen goed, of het wacht.

---

## Relatie tot andere projecten

| Project | Relatie |
|---|---|
| **Schaduwen over Domburg** | Eerste titel op de site; auteur Ard Breure; prijs €29,95 |
| **CoachBalie** (`docs/design-dna.md`) | Zelfde DNA-structuur, ander merk — warm papier vs. baanblauw |
| **HormuzEye** (`hormuzeye-editorial-dna.md`) | Zelfde editorial discipline, ander domein (finance vs. fictie) |

Bij twijfel over merkscheiding: Breure Media = fictie en literaire spanning.
Geen kruisbestuiving van kleuren, fonts of toon met andere merken.

---

*Laatst bijgewerkt: juli 2026 — versie 1.0*
