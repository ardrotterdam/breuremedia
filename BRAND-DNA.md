# Breure Media — Brand DNA Blueprint

*Vastgelegd 21 augustus 2026. Dit document bevat de strategische besluiten achter breuremedia.com. Besluiten hier zijn genomen en niet meer ter discussie, tenzij expliciet herzien. AI-agents (Cursor e.a.) gebruiken dit document als context bij elke opdracht aan de site.*

---

## 1. Wat Breure Media is

**Breure Media is het uitgeverslabel van Ard Breure voor literaire thrillers.**

Positionering (letterlijk, overal consistent gebruiken):

> **"Literaire thrillers waar de Zeeuwse kust de Rotterdamse haven raakt."**

Niet kiezen tussen Rotterdam en Zeeland — juist de combinatie is onderscheidend en niemand anders bezit haar.

Footer-beschrijving: **"Onafhankelijk label voor literaire thrillers."** (Niet: "boeken en oorspronkelijke verhalen" — te breed.)

## 2. De boeken

| Boek | Titel / thema | Setting | Status |
|---|---|---|---|
| 1 | *Schaduwen over Domburg* — wapendeals/haven | Rotterdam / Zeeland | Manuscript in uitvoering (**hoogste prioriteit**) |
| 2 | Politiek | Brussel, mogelijk Knokke-Heist als kustcontrast | Gepland |
| 3 | Open | Open | Gepland |
| — | *Zero Day Directive* (technothriller) | — | Geschreven |

**Boek 1-2-3 is een serie met dezelfde hoofdpersoon.** Een serie stapelt: boek 1 verkoopt boek 2. Boek 1 staat volledig op zichzelf met een bevredigend einde, maar laat bewust **één verhaallijn open** (bijv. rond het wapennetwerk) en geeft de hoofdpersoon groeiruimte.

## 3. Wat NIET onder Breure Media hoort

Latere boekplannen — kookboek, Côte d'Azur-reisboek, beleggen, olie/energie, AI — horen **niet** onder dit label. Andere doelgroepen. Later eigen imprints of via bestaande sites (bijv. HormuzEye voor olie/geopolitiek).

Uitzondering: AI mág als blogonderwerp, uitsluitend via de haven/het boek (bijv. AI in de Rotterdamse haven als thrillerresearch).

## 4. Verkoopstrategie

- **E-book: direct via eigen site vanaf lancering.** Marge van ±70% naar bijna 100%. Rekensom: 20 directe e-bookverkopen/maand (±€15 marge) verslaat het hele affiliate-droomscenario.
- **Print: Amazon + Bol.** Voor logistiek en vindbaarheid.
- Direct verkopen wordt pas echt krachtig bij drie boeken (bundels, serie-momentum).

## 5. E-mailstrategie

De maillijst is het enige kanaal dat onafhankelijk is van Google.

- Aanbod: **"Lees het eerste hoofdstuk van Schaduwen over Domburg gratis"** — op álle Rotterdam- en Zeeland-contentpagina's (daar komt het verkeer binnen).
- De "bericht bij verschijning"-aanmelding op de boekpagina blijft, maar is te smal als enige funnel.
- Herbruikbaar component: `FirstChapterCTA`.

## 6. Sitestructuur

Twee pillars, schone scheiding:

- **Pillar "Lezen"** (menulabel; NL "Lezen", EN "Reading" — URL's `/e-readers/` ongewijzigd) = het *hoe* van lezen: e-readers, leesgewoontes, e-booklengte, lezen op vakantie.
- **Pillar "Boeken"** = het *wat*: eigen romans plus aanbevelingslijsten.

### E-reader-cluster: bevroren op 6 reviews
Zes reviews + vergelijkingstabel is een asset — **niet uitbreiden, alleen jaarlijks actualiseren**. Elke nieuwe review is tijd die niet naar het manuscript gaat, in een gevecht dat tegen Coolblue niet te winnen is.

**Speerpunt binnen dit cluster: waterdicht.** Grootste zoekwoordcluster (±27 vertoningen, positie 11–24) en past perfect bij een schrijver van kustromans. Pagina over lezen op het strand (zand, zout, zon) = SEO én merk tegelijk.

## 7. Affiliate-regels

Alleen wat een **romanschrijver geloofwaardig kan aanbevelen**:

- **Boekenlijsten**: Rotterdam (Bordewijk, Deelder, Borst — uitbreidbaar met architectuur/havengeschiedenis), Zeeland, Zeeuwse schrijvers (Oek de Jong, Franca Treur, Den Doolaard).
- **Bestaand e-reader-cluster** (zie §6).
- Niets anders. Geen gadgets, geen willekeurige producten.

## 8. Content: toon en onderwerpen

**Toon: auteursperspectief, niet reisgids.** De schrijver laat zijn stad/decor zien. Vermijd reisblogger-taal ("ontdek", "voor je bezoek"). SEO-zoekwoord blijft vooraan in de titel; de invalshoek is literair en persoonlijk. Brugzin in intro's: *"Rotterdam is het decor van mijn thrillerserie — dit is de stad zoals ik haar ken."*

**Stijlregel: geen gedachtestreepjes in teksten, nooit.** Vermijd formuleringen die als AI-gegenereerd ogen. Korte zinnen, dubbele punten en komma's in plaats van streepjes. Dit geldt voor alle content: blogposts, pagina's, meta descriptions en UI-teksten.

**Waarover wél bloggen:**
1. Rotterdam- en Zeeland-locaties vanuit auteursperspectief (Domburg, Markthal, Kubuswoningen, haven).
2. Haven/onderwereld/research-onderwerpen die de thriller geloofwaardig maken — de onderscheidende categorie.
3. Schrijven en lezen, persoonlijk vanuit het maken ("Lengte van een e-book" rankt op positie 2,9 — dat signaal volgen).
4. Zeeuwse en Rotterdamse schrijvers.

**Waarover níét bloggen:**
- Meer e-reader-reviews.
- Algemene boekennieuwtjes of losse recensies.
- AI, beleggen, olie, Côte d'Azur (behalve AI via de haven, zie §3).
- Generieke SEO-content zonder eigen invalshoek.

**Ritme:** één post per twee weken, of één per maand zolang het manuscript voorrang heeft. Consistentie verslaat volume.

## 9. Technisch / huisstijl (voor AI-agents)

- Next.js 15. Navigatielabels in `lib/site.ts` (NL) en `lib/i18n.ts` (EN + footers).
- Huisstijl: donker met goud, serif. CSS-variabelen: `--color-gold` (#b8975a), `--color-gold-light` (#d4b87a), `--color-gold-bright` (#f2dca4, alleen op donkere vlakken), `--color-gold-deep` (#8a6d3a, voor hover op lichte/crème achtergronden).
- Drie-laags hover-systeem: text-glow voor nav/CTA's, box-shadow + lift voor kaarten, alleen kleurwissel voor inline links. `prefers-reduced-motion` altijd respecteren.
- **Slugs/URL's nooit wijzigen zonder expliciete opdracht.** Labels mogen afwijken van slugs (voorbeeld elders: menu "Blog" op slug `/inzichten`).

## 10. De gouden regel

> **Prioriteit is altijd: het manuscript afmaken.** De site ondersteunt de boeken — niet andersom. Bij elke twijfel over waar tijd naartoe gaat, wint het manuscript.
