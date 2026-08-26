import type { Locale } from "@/lib/i18n";
import { CHAPTER_1_BOOK_PATHS, CHAPTER_1_PATHS } from "@/lib/chapter-1";

export type ChapterBlock =
  | { type: "p"; text: string }
  | { type: "em"; text: string }
  | { type: "hr" };

export interface Chapter1Edition {
  locale: Locale;
  title: string;
  bookTitle: string;
  path: string;
  bookPath: string;
  blocks: ChapterBlock[];
}

function parseChapterMarkdown(source: string): { title: string; blocks: ChapterBlock[] } {
  const normalized = source.replace(/\r\n/g, "\n").trim();
  const titleMatch = normalized.match(/^# (.+)$/m);
  const title = titleMatch?.[1] ?? "";
  const parts = normalized.split(/\n\n+/);
  const blocks: ChapterBlock[] = [];

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) {
      continue;
    }
    if (trimmed.startsWith("# ")) {
      continue;
    }
    if (trimmed.startsWith(">")) {
      continue;
    }
    if (trimmed === "---") {
      blocks.push({ type: "hr" });
      continue;
    }

    const emMatch = trimmed.match(/^\*(.+)\*$/);
    if (emMatch && !trimmed.includes("\n")) {
      blocks.push({ type: "em", text: emMatch[1] });
      continue;
    }

    blocks.push({ type: "p", text: trimmed });
  }

  return { title, blocks };
}

/*
 * Prose copied from the manuscript repo without rewrite.
 * Status blockquotes are parsed out and not rendered.
 * NL source has no LOCKED banner in-file; BOOK_DNA marks H01 Dutch DONE.
 * EN: LITERARY EDITION / FINAL MERGE.
 * DE: LITERARISCHE EDITION / LOCKED.
 *
 * Source commits (schaduwen-over-domburg-v2):
 * NL 39e784d71b1826fd0f79e237f715708b9cda95f6  01-manuscript/deel-1-de-haven/01-het-lichaam.md
 * EN 83b389d009d332f249f9c00c182ba62b0679a7eb  02-manuscript-en/part-1-the-harbour/01-the-body.md
 * DE 5e2657a6f7808b2715ca64a97734cc779654ed80  02-manuscript-de/teil-1-der-hafen/01-die-leiche.md
 */
const NL_SOURCE = `# Het Lichaam

Toen het water zich die ochtend bij Domburg terugtrok, lag Michael Harlan op het strand.

Tom Jansen stond enkele meters van het lichaam. De politie had het strand ruim afgezet. Verderop, bij de duinovergang, wachtte een forensisch team naast een bus met geopende achterdeuren.

Niemand kwam dichterbij dan nodig was.

Het was nog vroeg. Mist hing laag boven de duinen en ontnam het strand zijn verte. Jansen zette zijn kraag op. De wind vond toch een weg naar binnen. De kou trok vanuit het zand door zijn schoenen omhoog.

Vijf jaar geleden had hij de actieve dienst verlaten. Gisteravond had Henk Maaskant gebeld.

Voor één zaak was Jansen tijdelijk teruggehaald als rechercheur en havenspecialist. Niet in zijn oude functie en niet voor onbepaalde tijd.

Een jonge agent stond bij het lichaam. Zijn wangen waren rood van de wind. Af en toe stampte hij met zijn voeten in het zand.

'Kogel achter het linkeroor,' zei hij. 'Geen sporen van een worsteling. Horloge zit er nog.'

Jansen keek naar de pols.

'Loopt ook nog.'

De agent wees ernaar en trok zijn hand weer in zijn mouw.

Bij de duinovergang stond een dienstwagen met een open portier. Uit de mobilofoon kwamen berichten die niets met Michael Harlan te maken hadden. Een aanhouding in Oostkapelle. Een wegafzetting bij Westkapelle. Een kenteken dat moest worden nagetrokken.

Jansen hurkte.

Het was een duur stuk, Zwitsers waarschijnlijk. Onder het glas zag hij de secondewijzer kruipen, gelijkmatig, zonder haast.

Een automatisch uurwerk leefde van beweging. Als Harlan in het water had gelegen, konden de golven het gaande hebben gehouden. Het horloge zei dus niets over het tijdstip waarop hij was gestorven.

Het liep alleen.

De seconden gingen door. De man niet meer.

Jansen keek naar Harlans gezicht. Bleke huid, kort grijs haar, nat tegen de slapen. Achter het linkeroor zat een kleine, donkere wond.

Op zijn onderarm was een verbleekte tatoeage zichtbaar.

*USMC.*

Adelaar, wereldbol, anker.

Dat strookte met wat Jansen onderweg had meegekregen. Ex-marinier. Daarna logistiek. Rotterdam. Transporten die op papier eenvoudiger waren dan ze in werkelijkheid bleken te zijn. Landbouwmachines. Materiaal voor Oekraïne. Wapens waren genoemd, maar nog zonder dossier dat Jansen zelf had gezien.

Papieren die nooit helemaal klopten.

De meeuwen waren eerder bij Harlan geweest dan de politie. De schouwarts zou straks precies vastleggen wat ze hadden gedaan. Nu stonden de vogels verderop in het zand. Een van hen liep een paar passen naar voren, bleef staan en wachtte.

Jansen begreep het geduld.

Harlan zou straks in een zak van het strand verdwijnen.

Zijn telefoon ging.

Onbekend nummer.

Hij nam op zonder van het lichaam weg te kijken.

'Jansen.'

'Freja Larsen. Recherche Kopenhagen.'

De vrouwenstem was kalm. Haar Nederlands was goed; alleen aan sommige klinkers hoorde hij iets Scandinavisch.

'Ik begrijp dat u betrokken bent bij de zaak in Domburg.'

'Dat klopt.'

'Het slachtoffer heet Michael Harlan. Wij volgen hem al maanden.'

Jansen keek opnieuw naar het lichaam.

'Volgden.'

Aan de andere kant bleef het een ogenblik stil.

'Ja,' zei Larsen. 'Volgden.'

'Waarvoor?'

'Harlan verscheepte niet alleen landbouwmachines.'

'Wat dan wel?'

'Dat bespreek ik niet aan de telefoon.'

Jansen kwam overeind.

'Waarom belt u mij dan?'

'Omdat Rotterdam in ons onderzoek voorkomt. En omdat Harlan daar contacten had die voor ons belangrijk zijn.'

'Dat kan het bureau u ook vertellen.'

'Het bureau krijgt zijn informatie.'

'Dat was mijn vraag niet.'

Larsen antwoordde pas na een paar tellen.

'Er is een Russische connectie,' zei ze. 'Meer zeg ik daar nu niet over. Ik ben onderweg. Ik wil met u spreken voordat andere belangen zich met deze zaak gaan bemoeien.'

Jansen keek over het strand. De horizon was in de mist verdwenen.

'U bent snel.'

'Niet snel genoeg voor Harlan.'

'Wanneer bent u hier?'

'Ik bel u.'

De verbinding werd verbroken.

Jansen hield de telefoon nog een moment in zijn hand.

Een Russische connectie. Maaskant had daar niets over gezegd.

---

Hij stak buiten de afzetting een sigaret op.

De rook werd meteen door de wind meegenomen. Aan de horizon was nog altijd geen scheepvaart te zien. Hij wist niet of dat voor Domburg normaal was. In Rotterdam kon hij zich nauwelijks een horizon zonder schip herinneren.

Achter hem riep iemand dat de schouwarts eraan kwam.

Jansen rookte verder.

Maaskant had hem de avond ervoor gebeld zonder hallo. Ook daarin was niets veranderd.

'Zeeland heeft een lichaam met een havenverleden.'

Jansen had gewacht.

'We hebben iemand nodig die de containers kent.'

'Ik ben met pensioen.'

Twee seconden stilte.

'Dat weet ik.'

Nog twee.

'Tijdelijk. Deze zaak.'

'Waarom ik?'

Maaskant had de naam genoemd.

'Michael Harlan.'

De naam was genoeg.

Vijf jaar eerder had Harlan al in een dossier gestaan dat nooit werkelijk was afgesloten.

Jansen herinnerde zich een achterbank in Katendrecht. Een avond waarop hij had besloten dat het klaar was.

Hij had daarna zijn werk verlaten en vijf jaar lang geen reden gezocht om terug te keren.

Maaskant had hem er één gegeven.

Jansen keek naar het strand.

Bij Harlan was de schouwarts inmiddels neergehurkt. Een van de forensisch rechercheurs fotografeerde de wond. De jonge agent stond iets verderop met zijn handen diep in zijn jaszakken.

Het horloge liep nog steeds.

Jansen dacht aan het dossier van vijf jaar geleden. Aan wat ze toen hadden geweten, en vooral aan wat ze niet hadden kunnen bewijzen.

Hij keek nog één keer naar het horloge.

De secondewijzer kroop verder. Straks zou het uurwerk meegaan op de brancard, in de wagen, over iedere drempel en iedere bocht. Zolang er beweging was, zou het blijven lopen.

Pas ergens op een plank, in een stille ruimte, zou het uiteindelijk stilstaan.

Niemand zou weten op welk moment.

Jansen draaide zich om naar de duinen.

Daarachter, voorbij de mist en ruim een uur asfalt, lag de haven te wachten.

Hij had er ongeveer twintig jaar gewerkt.

Niet ongeduldig. Havens zijn nooit ongeduldig.

Maar ze vergeten ook niets.

Jansen liet zijn sigaret in het natte zand vallen, drukte hem uit met zijn hak en liep naar de auto.`;

const EN_SOURCE = `# The Body

> H01 ENGLISH — LITERARY EDITION / FINAL MERGE (Claude eindredactie; aligned to definitive Dutch H01, new opening)

When the water drew back at Domburg that morning, Michael Harlan lay on the beach.

Tom Jansen stood a few metres from the body. The police had cordoned off a wide stretch of beach. Further along, by the dune crossing, a forensic team waited beside a van with its rear doors open.

No one came any closer than necessary.

It was still early. Mist hung low over the dunes and robbed the beach of its distance. Jansen turned up his collar. The wind found its way in anyway. The cold rose from the sand, up through his shoes.

Five years ago he had left active service. Last night, Henk Maaskant had called.

For one case, Jansen had been brought back temporarily as an investigator and harbour specialist. Not in his old position, and not indefinitely.

A young officer stood beside the body. His cheeks were red from the wind. Every so often he stamped his feet in the sand.

'Bullet behind the left ear,' he said. 'No signs of a struggle. Watch is still on him.'

Jansen looked at the wrist.

'Still running too.'

The officer pointed at it, then pulled his hand back into his sleeve.

A patrol car stood by the dune crossing with one door open. Messages came over the radio that had nothing to do with Michael Harlan. An arrest in Oostkapelle. A road closure near Westkapelle. A registration number that needed checking.

Jansen crouched down.

It was an expensive piece, probably Swiss. Beneath the glass he watched the second hand creep, steady, unhurried.

An automatic watch lived on movement. If Harlan had been in the water, the waves could have kept it running. So the watch told him nothing about the time Harlan had died.

It only ran.

The seconds went on. The man did not.

Jansen looked at Harlan's face. Pale skin, short grey hair wet against the temples. Behind the left ear was a small, dark wound.

A faded tattoo showed on his forearm.

*USMC.*

Eagle, globe, anchor.

That matched what Jansen had picked up on the way. Former Marine. Logistics afterwards. Rotterdam. Shipments that looked simpler on paper than they turned out to be. Agricultural machinery. Equipment for Ukraine. Weapons had been mentioned, but not yet in any file Jansen had seen himself.

Papers that never quite tallied.

The gulls had reached Harlan before the police. Later, the medical examiner would record precisely what they had done. For now the birds stood further along the sand. One of them took a few steps forward, stopped and waited.

Jansen understood the patience.

Soon Harlan would leave the beach in a bag.

His phone rang.

Unknown number.

He answered without taking his eyes off the body.

'Jansen.'

'Freja Larsen. Copenhagen Police.'

The woman's voice was calm. Her Dutch was good; only some of the vowels carried something Scandinavian.

'I understand you're involved in the case at Domburg.'

'That's right.'

'The victim's name is Michael Harlan. We've been following him for months.'

Jansen looked at the body again.

'Were.'

There was a moment of silence at the other end.

'Yes,' said Larsen. 'Were.'

'Why?'

'Harlan wasn't only shipping agricultural machinery.'

'What, then?'

'I'm not discussing that over the phone.'

Jansen got to his feet.

'Then why call me?'

'Because Rotterdam appears in our investigation. And because Harlan had contacts there who matter to us.'

'The station can tell you that as well.'

'The station is getting its information.'

'That wasn't my question.'

Larsen waited a few seconds before answering.

'There's a Russian connection,' she said. 'I'm not saying any more about it now. I'm on my way. I want to speak to you before other interests start involving themselves in this case.'

Jansen looked across the beach. The horizon had disappeared into the mist.

'You're quick.'

'Not quick enough for Harlan.'

'When will you be here?'

'I'll call you.'

The line went dead.

Jansen held the phone in his hand a moment longer.

A Russian connection. Maaskant had said nothing about that.

---

Outside the cordon, he lit a cigarette.

The wind took the smoke at once. There was still no shipping on the horizon. He did not know whether that was normal for Domburg. In Rotterdam he could hardly remember a horizon without a ship on it.

Behind him, someone called out that the medical examiner was arriving.

Jansen kept smoking.

Maaskant had called him the previous evening without saying hello. That had not changed either.

'Zeeland has a body with a harbour past.'

Jansen had waited.

'We need someone who knows the containers.'

'I'm retired.'

Two seconds of silence.

'I know.'

Another two.

'Temporary. This case.'

'Why me?'

Maaskant had said the name.

'Michael Harlan.'

The name was enough.

Five years earlier, Harlan had already appeared in a case file that had never truly been closed.

Jansen remembered a back seat in Katendrecht. An evening when he had decided he was done.

After that, he had left the job and spent five years without looking for a reason to return.

Maaskant had given him one.

Jansen looked at the beach.

The medical examiner was crouching beside Harlan now. One of the forensic officers was photographing the wound. The young officer stood a little way off, his hands deep in his coat pockets.

The watch was still running.

Jansen thought about the file from five years earlier. About what they had known then, and above all what they had not been able to prove.

He looked at the watch once more.

The second hand crept on. Soon the movement would ride along on the stretcher, into the van, over every threshold and around every bend. As long as there was motion, it would keep running.

Only later, somewhere on a shelf in a quiet room, would it finally stop.

No one would know at what moment.

Jansen turned towards the dunes.

Behind them, beyond the mist and a good hour of tarmac, the harbour lay waiting.

He had worked there for about twenty years.

Not impatiently. Harbours are never impatient.

But they forget nothing either.

Jansen dropped his cigarette into the wet sand, ground it out beneath his heel and walked to the car.`;

const DE_SOURCE = `# Die Leiche

> H01 DEUTSCH — LITERARISCHE EDITION / LOCKED (auteursbeslissing:
> titel, Beobachteten-beat en brongetrouwe lezingen bevestigd)

Als sich das Wasser an diesem Morgen bei Domburg zurückzog, lag Michael Harlan am Strand.

Tom Jansen stand einige Meter von der Leiche entfernt. Die Polizei hatte den Strand weiträumig abgesperrt. Weiter hinten, am Dünenübergang, wartete ein Forensikteam neben einem Transporter mit geöffneten Hecktüren.

Niemand kam näher als nötig.

Es war noch früh. Nebel hing tief über den Dünen und nahm dem Strand seine Weite. Jansen stellte den Kragen auf. Der Wind fand trotzdem einen Weg hinein. Die Kälte stieg aus dem Sand durch seine Schuhe auf.

Vor fünf Jahren hatte er den aktiven Dienst verlassen. Gestern Abend hatte Henk Maaskant angerufen.

Für einen einzigen Fall hatte man Jansen vorübergehend als Ermittler und Hafenspezialisten zurückgeholt. Nicht in seiner alten Funktion und nicht auf unbestimmte Zeit.

Ein junger Polizist stand bei der Leiche. Seine Wangen waren rot vom Wind. Ab und zu stampfte er mit den Füßen in den Sand.

„Kugel hinter dem linken Ohr“, sagte er. „Keine Spuren eines Kampfes. Die Uhr ist noch dran.“

Jansen sah auf das Handgelenk.

„Läuft auch noch.“

Der Polizist zeigte darauf und zog die Hand wieder in den Ärmel zurück.

Am Dünenübergang stand ein Streifenwagen mit offener Tür. Aus dem Funk kamen Meldungen, die nichts mit Michael Harlan zu tun hatten. Eine Festnahme in Oostkapelle. Eine Straßensperrung bei Westkapelle. Ein Kennzeichen, das überprüft werden musste.

Jansen ging in die Hocke.

Es war ein teures Stück, vermutlich Schweizer. Unter dem Glas sah er den Sekundenzeiger kriechen, gleichmäßig, ohne Eile.

Ein Automatikwerk lebte von Bewegung. Wenn Harlan im Wasser gelegen hatte, konnten die Wellen es in Gang gehalten haben. Die Uhr sagte also nichts über den Zeitpunkt, an dem er gestorben war.

Sie lief nur.

Die Sekunden gingen weiter. Der Mann nicht mehr.

Jansen betrachtete Harlans Gesicht. Blasse Haut, kurzes graues Haar, nass an den Schläfen. Hinter dem linken Ohr saß eine kleine, dunkle Wunde.

Auf seinem Unterarm war eine verblasste Tätowierung zu sehen.

*USMC.*

Adler, Weltkugel, Anker.

Das passte zu dem, was Jansen unterwegs mitbekommen hatte. Ehemaliger US-Marine. Danach Logistik. Rotterdam. Transporte, die auf dem Papier einfacher waren, als sie sich in Wirklichkeit erwiesen. Landmaschinen. Material für die Ukraine. Von Waffen war die Rede gewesen, aber noch ohne eine Akte, die Jansen selbst gesehen hatte.

Papiere, die nie ganz stimmten.

Die Möwen waren vor der Polizei bei Harlan gewesen. Der Rechtsmediziner würde später genau festhalten, was sie getan hatten. Jetzt standen die Vögel weiter oben im Sand. Eine von ihnen ging ein paar Schritte vor, blieb stehen und wartete.

Jansen verstand die Geduld.

Harlan würde bald in einem Sack vom Strand verschwinden.

Sein Telefon klingelte.

Unbekannte Nummer.

Er nahm ab, ohne den Blick von der Leiche zu nehmen.

„Jansen.“

„Freja Larsen. Kriminalpolizei Kopenhagen.“

Die Frauenstimme war ruhig. Ihr Niederländisch war gut; nur an manchen Vokalen hörte er etwas Skandinavisches.

„Wie ich höre, sind Sie mit dem Fall in Domburg befasst.“

„Das stimmt.“

„Das Opfer heißt Michael Harlan. Wir beobachten ihn seit Monaten.“

Jansen sah erneut zur Leiche.

„Beobachteten.“

Am anderen Ende blieb es einen Augenblick still.

„Ja“, sagte Larsen. „Beobachteten.“

„Weshalb?“

„Harlan verschiffte nicht nur Landmaschinen.“

„Was dann?“

„Das bespreche ich nicht am Telefon.“

Jansen richtete sich auf.

„Warum rufen Sie dann mich an?“

„Weil Rotterdam in unserer Ermittlung vorkommt. Und weil Harlan dort Kontakte hatte, die für uns wichtig sind.“

„Das kann Ihnen auch die Dienststelle sagen.“

„Die Dienststelle bekommt ihre Informationen.“

„Das war nicht meine Frage.“

Larsen antwortete erst nach ein paar Sekunden.

„Es gibt eine russische Verbindung“, sagte sie. „Mehr sage ich dazu jetzt nicht. Ich bin unterwegs. Ich will mit Ihnen sprechen, bevor sich andere Interessen in diesen Fall einmischen.“

Jansen blickte über den Strand. Der Horizont war im Nebel verschwunden.

„Sie sind schnell.“

„Nicht schnell genug für Harlan.“

„Wann sind Sie hier?“

„Ich rufe Sie an.“

Die Verbindung brach ab.

Jansen hielt das Telefon noch einen Moment in der Hand.

Eine russische Verbindung. Maaskant hatte davon nichts gesagt.

---

Außerhalb der Absperrung zündete er sich eine Zigarette an.

Der Wind nahm den Rauch sofort mit. Am Horizont war noch immer keine Schifffahrt zu sehen. Er wusste nicht, ob das für Domburg normal war. In Rotterdam konnte er sich kaum an einen Horizont ohne Schiff erinnern.

Hinter ihm rief jemand, dass der Rechtsmediziner komme.

Jansen rauchte weiter.

Maaskant hatte ihn am Abend zuvor angerufen, ohne Hallo. Auch daran hatte sich nichts geändert.

„In Zeeland liegt eine Leiche mit Hafenvergangenheit.“

Jansen hatte gewartet.

„Wir brauchen jemanden, der die Container kennt.“

„Ich bin im Ruhestand.“

Zwei Sekunden Stille.

„Ich weiß.“

Noch zwei.

„Vorübergehend. Dieser Fall.“

„Warum ich?“

Maaskant hatte den Namen genannt.

„Michael Harlan.“

Der Name genügte.

Fünf Jahre zuvor hatte Harlan bereits in einer Akte gestanden, die nie wirklich geschlossen worden war.

Jansen erinnerte sich an eine Rückbank in Katendrecht. An einen Abend, an dem er beschlossen hatte, dass Schluss war.

Er hatte danach den Dienst verlassen und fünf Jahre lang nicht nach einem Grund gesucht, zurückzukehren.

Maaskant hatte ihm einen gegeben.

Jansen sah zum Strand.

Inzwischen hockte der Rechtsmediziner neben Harlan. Einer der Kriminaltechniker fotografierte die Wunde. Der junge Polizist stand etwas abseits, die Hände tief in den Jackentaschen.

Die Uhr lief noch immer.

Jansen dachte an die Akte von vor fünf Jahren. An das, was sie damals gewusst hatten, und vor allem an das, was sie nicht hatten beweisen können.

Er sah noch einmal auf die Uhr.

Der Sekundenzeiger kroch weiter. Bald würde das Uhrwerk mitfahren, auf der Trage, im Wagen, über jede Schwelle und durch jede Kurve. Solange es Bewegung gab, würde es weiterlaufen.

Erst irgendwo auf einem Regal, in einem stillen Raum, würde es schließlich stehen bleiben.

Niemand würde wissen, in welchem Moment.

Jansen drehte sich zu den Dünen um.

Dahinter, jenseits des Nebels und gut eine Stunde Asphalt entfernt, lag der Hafen und wartete.

Er hatte dort ungefähr zwanzig Jahre gearbeitet.

Nicht ungeduldig. Häfen sind nie ungeduldig.

Aber sie vergessen auch nichts.

Jansen ließ seine Zigarette in den nassen Sand fallen, trat sie mit dem Absatz aus und ging zum Auto.`;

const sources: Record<Locale, string> = {
  nl: NL_SOURCE,
  en: EN_SOURCE,
  de: DE_SOURCE,
};

const bookTitles: Record<Locale, string> = {
  nl: "Schaduwen over Domburg",
  en: "Shadows over Domburg",
  de: "Schatten über Domburg",
};

export function getChapter1(locale: Locale): Chapter1Edition {
  const parsed = parseChapterMarkdown(sources[locale]);

  return {
    locale,
    title: parsed.title,
    bookTitle: bookTitles[locale],
    path: CHAPTER_1_PATHS[locale],
    bookPath: CHAPTER_1_BOOK_PATHS[locale],
    blocks: parsed.blocks,
  };
}
