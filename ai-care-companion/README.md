# AI Care Companion

**Startup-Dokumentation — Strategie, Produkt, Architektur, Compliance, Business Case**
Markt: DACH · Stand: 4. August 2026

---

## Worum es geht

Ein KI-Begleiter für ältere Menschen, die allein leben. Nicht als Sprachassistent, nicht als Chatbot — sondern als Verbindung zwischen einem Senior, seinen Angehörigen und seiner Pflege.

Diese Dokumentation entwickelt daraus ein vollständiges Unternehmen: von der Vision bis zum Investoren-Pitch, in 36 Kapiteln.

---

## Was das Sparring ergeben hat

Block 0 hat das Ausgangsbriefing gegen Daten geprüft. Vier Befunde verändern das Produkt grundlegend:

**1. Alleinleben ist nicht Einsamkeit.** 34 % der Über-65-Jährigen leben allein — aber nur 9,5 % der Älteren in Privathaushalten fühlen sich einsam. Ein Produkt, das „gegen Einsamkeit" verkauft wird, spricht neun von zehn Menschen der Zielgruppe auf ein Problem an, das sie nicht haben. Das verbreitete, zahlungsrelevante Problem ist die **Sorge der Angehörigen**.

**2. Das Produkt hat ein Budget von 13 Gesprächsminuten pro Tag.** Bei ~€0,04 COGS je Gesprächsminute, 34,90 € Abopreis und 60 % Zielmarge bleiben rund 390 Minuten im Monat. Nicht 90 Minuten am Tag. Dreizehn. Das ist die zentrale Produktbeschränkung und sie steht am Anfang, nicht in einem Kostenkapitel am Ende.

**3. Ökonomie und Ethik zeigen ausnahmsweise in dieselbe Richtung.** Ein Produkt, das Gesprächszeit *nicht* maximiert, ist gleichzeitig das günstigere, das vor Art. 5 KI-VO haltbare und das gegenüber Pflegekassen verkaufbare. Daraus folgt die Nordstern-Metrik: nicht Minuten mit der KI, sondern **ausgelöste Kontakte mit echten Menschen**.

**4. Der Burggraben ist nicht die KI.** Jeder Wettbewerber kauft dieselben Foundation Models. Verteidigbar sind nur die longitudinale Baseline pro Person, der institutionelle Vertriebszugang und die Erstattungszulassung.

Die vollständige Argumentation mit Belegen: **[Kill-Questions](00-sparring/00-kill-questions.md)**

---

## Positionierung

Drei in sich schlüssige Optionen stehen zur Wahl — [ausführlich hier](00-sparring/01-positionierung-optionen.md):

| | A — Der Begleiter | **B — Die Brücke** *(empfohlen)* | C — Pflege-Betriebssystem |
|---|---|---|---|
| Versprechen | KI-Freund gegen Einsamkeit | Sie lebt selbstständig, du weißt Bescheid | Mehr Klienten pro Pflegekraft |
| Käufer | Angehörige | Angehörige → Pflegekassen | Pflegedienste, Kommunen |
| Zugang | Eigenes Gerät | Telefon, später Tablet | Beliebig |
| Erlös | 29–49 €/Monat | 34,90 € → 27 € → 50 € | 15–40 €/Klient |
| Hauptrisiko | Marge, Reputation, Amazon-Präzedenz | Wettbewerb mit Hausnotruf-Anbietern | Verkaufszyklen 9–18 Monate |

**Empfehlung: B als Ausgangspunkt, Erweiterung nach C ab Monat 12–18.**

---

## Aufbau

| Ordner | Inhalt | Status |
|---|---|---|
| [`00-sparring/`](00-sparring/) | Kill-Questions, Positionierungsoptionen, Entscheidungsvorlagen | ✅ fertig |
| [`01-strategie/`](01-strategie/) | Kap. 1–7: Vision, Mission, Product Vision, Zielgruppen, Personas, Customer Journey, User Stories | ⏳ offen |
| [`02-produkt/`](02-produkt/) | Kap. 8–10: PRD, MVP, Feature Backlog | ⏳ offen |
| [`03-technik-compliance/`](03-technik-compliance/) | Kap. 11–16: Systemarchitektur, Datenmodell, Rollen & Rechte, Datenschutz, Sicherheit, Hardware | ⏳ offen |
| [`04-erlebnis-ki/`](04-erlebnis-ki/) | Kap. 17–21: UX, Gesprächsdesign, KI-Memory, Integrationen, API | ⏳ offen |
| [`05-business/`](05-business/) | Kap. 22–27: Roadmap, Wettbewerb, Business Model Canvas, Monetarisierung, GTM, Finanzplanung | ⏳ offen |
| [`06-risiko-kapital/`](06-risiko-kapital/) | Kap. 28–36: Risiken, offene Entscheidungen, Investoren-Pitch + Zusatzkapitel | ⏳ offen |
| [`anhang/`](anhang/) | Entscheidungsregister, Annahmenregister, Quellen, Glossar | 🔄 wächst mit |

---

## Kapitelübersicht

**Strategie & Nutzer** — 1 Vision · 2 Mission · 3 Product Vision · 4 Zielgruppen · 5 Personas · 6 Customer Journey · 7 User Stories

**Produktdefinition** — 8 PRD · 9 MVP · 10 Feature Backlog

**Technik & Compliance** — 11 Systemarchitektur · 12 Datenmodell · 13 Rollen- und Rechtekonzept · 14 Datenschutzkonzept · 15 Sicherheitskonzept · 16 Hardwarekonzept

**Erlebnis & KI** — 17 UX-Konzept · 18 Gesprächsdesign · 19 KI-Memory-Konzept · 20 Integrationen · 21 API-Konzept

**Business** — 22 Roadmap · 23 Wettbewerbsanalyse · 24 Business Model Canvas · 25 Monetarisierung · 26 Go-to-Market · 27 Finanzplanung

**Risiko & Kapital** — 28 Risiken · 29 Offene Produktentscheidungen · 30 Investoren-Pitch

**Ergänzt gegenüber dem Ausgangsbriefing** — 31 Notfall-Eskalation & Haftung · 32 Klinische Evidenz & Studiendesign · 33 Content-Sicherheit & Schutz vor Ausnutzung · 34 Barrierefreiheit & sprachliche Realität · 35 Ethikbeirat & Governance · 36 Sterbefall, Datenerbe & Offboarding

Warum diese sechs fehlten und warum jedes einzelne das Unternehmen beenden kann: [K11 in den Kill-Questions](00-sparring/00-kill-questions.md#k11--kapitel-die-im-briefing-fehlen-und-das-produkt-entscheiden).

---

## Arbeitsweise

Jede Kapiteldatei folgt demselben Muster:

> **Kernaussage** → **Ausarbeitung** → **Was ich anders sehe als das Briefing** → **Offene Entscheidungen** → **Quellen und Annahmen**

Zwei Register halten die Dokumentation ehrlich:

- **[Annahmenregister](anhang/annahmenregister.md)** — jede Zahl ist entweder belegt (🟢), begründet geschätzt (🟡) oder ungeprüft (🔴). Keine Schätzung tarnt sich als Fakt.
- **[Entscheidungsregister](anhang/entscheidungsregister.md)** — jede Festlegung mit den verworfenen Alternativen, damit sie später revidierbar bleibt, ohne dass die Begründung verloren geht.

---

## Die vier Zahlen, die zuerst validiert gehören

Alle vier sind mit geringem Aufwand prüfbar und keine sollte bis zum Finanzplan offen bleiben:

1. **COGS pro Gesprächsminute** — bestimmt Preis, Produktumfang und Marge gleichzeitig. Messbar in einem Piloten mit zehn Nutzern.
2. **Zahlungsbereitschaft der Angehörigen** — aktuell eine reine Setzung. Ohne Validierung ist der Finanzplan Fiktion.
3. **Spracherkennungsrate bei 75+** — Schwerhörigkeit, Dialekt, Sprechtempo, Prothesen. Trägt die Erkennung nicht, existiert kein Produkt. Testbar mit 20 Aufnahmen in zwei Wochen.
4. **Warum das DiPA-Verzeichnis seit 2021 leer ist** — entscheidet über einen mehrjährigen Arbeitsstrang. Klärbar mit zwei Telefonaten.
