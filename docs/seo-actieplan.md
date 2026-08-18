# SEO-actieplan: Breure Media

Gebaseerd op Google Search Console, laatste 28 dagen (peildatum 2026-08-07).

## Uitgangssituatie

| Metric | Waarde |
|---|---|
| Vertoningen | ~143 |
| Klikken | 3 (allemaal homepage, allemaal desktop) |
| Gem. positie | ~16 (losse pagina's 6–13) |
| Trend | Stijgend (0 → 5–14 vertoningen/dag) |
| Rich results | Productfragmenten op 21 vertoningen ✅ |

**Interpretatie:** nieuwe site in de settle-/indexeringsfase. Aantallen zijn
statistisch nog nietszeggend (1–5 vertoningen per query). Technische SEO en
content zijn al sterk. De hefboom is nu **autoriteit + tijd**, niet
metadata-churn. Niet over-optimaliseren op basis van enkele impressies.

## Kansen per prioriteit

### 1. "boeken over rotterdam": positie 11.5 (hoogste prioriteit)
Waardevolste commerciële term, staat op de rand van pagina 1. Geen
tekstprobleem, heeft een klein zetje autoriteit nodig.
- **Doel:** positie 11.5 → top 10.
- **Acties:** externe links opbouwen (zie §Linkbuilding); interne links vanaf
  sterke pagina's (gedaan: boekpagina → leeslijst).

### 2. Zeeland-pagina rankt structureel te laag
- "boeken over zeeland" → pos 29
- "boek over zeeland" → pos 32
- "boek zeeland" → pos 52

De Zeeland-pagina is inhoudelijk sterker dan de Rotterdam-pagina, dus dit is
een **freshness/autoriteit-gat**, geen on-page probleem.
- **Acties (deels gedaan):** cross-links Rotterdam ↔ Zeeland toegevoegd;
  boekpagina → Zeeland toegevoegd. Verder: externe links, en geduld, de
  pagina is nog aan het settelen.

### 3. E-readers-pagina: lage ROI
- "lengte van ebook" → pos 66 (pagina 7)
- "waterdichte ereader" → pos 35
- "kieskeurig ereader" → pos 68

Competitieve informatieve termen waar de pagina ver achterloopt. **Advies:**
niet veel energie in steken tenzij e-readers strategisch belangrijk worden.
Overweeg de pagina te focussen op één niche-term i.p.v. brede concurrentie.

### 4. "Breure"-naamzoekingen: ruis
"bernice breure", "jan-willem breure", "marnel breure" zijn *andere personen*.
Niet bruikbaar. Indirect nut: entiteit "Ard Breure" versterken (zie §Entiteit)
zodat de merknaam correct associeert.

## Uitgevoerde wijzigingen (deze sessie)

1. **Zeeland-pagina alt-tekst**: foutieve verwijzing "Rotterdamse Erasmusbrug"
   op een Zeeland-pagina vervangen door Zeeuwse-kust-tekst.
2. **Cross-link Rotterdam → Zeeland** in de content-footer van de
   Rotterdam-leeslijst.
3. **Cross-link Zeeland → Rotterdam** in de content-footer van de
   Zeeland-leeslijst.
4. **Boekpagina → beide leeslijsten**: nieuw, data-gedreven veld
   `relatedReadingLists` op `Book`; "Verder lezen"-blok op de boekpagina.
   Autoriteit stroomt van de (rankende) boekpagina naar beide leeslijsten.

## Vervolgstappen (buiten de code)

### Linkbuilding (grootste hefboom)
- Auteursprofiel + boekvermelding op Hebban, Goodreads, bol.com-community.
- Gastartikel of interview bij een boekenblog / regionale (Zeeuwse/Rotterdamse)
  media met link naar de relevante leeslijst.
- Vermelding bij lokale culturele agenda's (Domburg, Zeeland, Rotterdam-haven).

### Entiteit "Ard Breure" versterken
- Person-schema al aanwezig ✅. Zorg voor consistente NAP/vermeldingen extern
  (zelfde naam-spelling, zelfde bio) zodat Google "Ard Breure" als auteur-entiteit
  koppelt en de "breure"-ruis wegvalt.

### Query-data laten rijpen
- Herhaal deze GSC-analyse over ~4–8 weken. Pas dan zijn CTR- en
  positiecijfers betrouwbaar genoeg voor gerichte title/meta-aanpassingen.
- Let specifiek op "boeken over rotterdam": zodra die structureel in de top 10
  komt, is een CTR-geoptimaliseerde title/description de volgende winst.

### Meten
- Volg positie van "boeken over rotterdam" en "boeken over zeeland" wekelijks.
- Volg of de nieuwe interne links de Zeeland-pagina omhoog helpen (pos 29 → <20).
