# Block 0 — Acht Entscheidungen vor Block 1

Diese acht Fragen determinieren alle folgenden 36 Kapitel. Zu jeder gibt es eine Empfehlung mit Begründung. Wo du nicht widersprichst, arbeite ich mit der Empfehlung weiter und dokumentiere sie als ADR im Anhang.

---

### E1 — Positionierung

**Frage:** A „Der Begleiter", B „Die Brücke" oder C „Das Pflege-Betriebssystem"?
**Empfehlung: B**, mit C als Erweiterung ab Monat 12–18.
**Begründung:** Einzige Option, in der Ökonomie, Ethik, Regulatorik und Vertrieb in dieselbe Richtung zeigen. Details in [`01-positionierung-optionen.md`](01-positionierung-optionen.md).
**Was daran hängt:** Kapitel 1–7, 22, 24–27, 30. Praktisch alles.

---

### E2 — Zugangspunkt

**Frage:** Eigene Hardware ab Start, White-Label-Tablet oder Telefon?
**Empfehlung: Telefon zuerst.** Tablet-Dock ab Monat 9–12, eigene Hardware frühestens ab Serie A und nur bei belegtem Bedarf.
**Begründung:** 18–24 Monate und ein sechsstelliger CapEx-Betrag, bevor die erste Nutzungserkenntnis vorliegt (K3). Das Telefon erreicht die Zielgruppe ohne Onboarding-Hürde.
**Preis dieser Entscheidung:** Keine passive Umgebungssensorik in Phase 1. Sturzerkennung ist damit erst ab Phase 2 möglich — das schließt einen Teil des Hausnotruf-Arguments zunächst aus und muss im GTM ehrlich adressiert werden.
**Was daran hängt:** Kapitel 16, 11, 17, 22, 27.

---

### E3 — Gesprächsbudget

**Frage:** Unbegrenzter Dialog oder budgetierte Interaktion?
**Empfehlung: Budgetiert, Zielgröße 10–15 Minuten pro Tag**, kaskadierte Modellarchitektur, Rest über nicht-generative Wege.
**Begründung:** Bei 39 € Abopreis und 60 % Zielmarge liegt die Obergrenze bei ~390 Minuten/Monat (K2). Zusätzlich: Ein Produkt, das Gesprächszeit maximiert, ist genau das Produkt, das vor Ethikbeirat und Kasse nicht bestehen kann.
**Offene Unterfrage:** Was passiert, wenn ein Nutzer das Budget überschreitet? Empfehlung: kein Abschneiden, sondern Übergang in günstigere Modi und — im Kern der Produktidee — Weiterleitung an einen Menschen.
**Was daran hängt:** Kapitel 8, 9, 11, 18, 27.

---

### E4 — Rolle der KI

**Frage:** Freund/Ersatz oder Brücke zu Menschen?
**Empfehlung: Brücke.** Nordstern-Metrik ist „ausgelöste Kontakte mit echten Menschen pro Woche", nicht Gesprächsminuten.
**Begründung:** K9. Und es ist gleichzeitig die günstigere Metrik (K2) sowie die einzige, die gegenüber Kassen, Presse und Ethikbeirat trägt.
**Konsequenz, die wehtut:** Das Produkt optimiert bewusst *gegen* seine eigene Nutzungsdauer. Das muss im Zielsystem des Unternehmens verankert sein, sonst frisst es der erste Wachstums-Sprint auf.
**Was daran hängt:** Kapitel 1–3, 18, 19, 30.

---

### E5 — Regulatorischer Status

**Frage:** Bewusst kein Medizinprodukt oder MDR-Klasse-IIa-Weg?
**Empfehlung: Kein Medizinprodukt starten, MDR-Fähigkeit ab Tag 1 vorbereiten.**
**Begründung:** K6. Der IIa-Weg kostet 18–36 Monate und einen hohen sechsstelligen Betrag, bevor Umsatz möglich ist. Aber Datenmodell, Protokollierung und Einwilligungen müssen so gebaut sein, dass die erhobenen Daten später als klinische Evidenz taugen — das ist nachträglich nicht nachholbar.
**Disziplin, die das erzwingt:** Die Zweckbestimmung muss im gesamten Marketing gehalten werden. Ein einziger Claim wie „erkennt beginnende Demenz" macht das Produkt zum Medizinprodukt — auch wenn er nur auf einer Landingpage steht.
**Was daran hängt:** Kapitel 8, 12, 14, 22, 28, 32.

---

### E6 — Datenweitergabe an Angehörige

**Frage:** Wie granular sehen Angehörige, was besprochen wurde?
**Empfehlung: Ereignisse und Zusammenfassungen, niemals Transkripte oder Wortlaute** — architektonisch erzwungen, nicht policy-basiert. Dazu ein Sichtbarkeitsprotokoll, mit dem der Senior jederzeit erfragen kann, was über ihn geteilt wurde.
**Begründung:** K8. Der Wortlaut eines Gesprächs ist die Grenze zwischen Fürsorge und Überwachung.
**Womit zu rechnen ist:** Zahlende Angehörige werden mehr verlangen. Regelmäßig, laut, und mit nachvollziehbaren Argumenten („Ich mache mir Sorgen"). Diese Grenze ist die Stelle, an der das Unternehmen seinen Charakter beweist oder verliert.
**Was daran hängt:** Kapitel 12, 13, 14, 17, 19.

---

### E7 — Einwilligung bei nachlassender Entscheidungsfähigkeit

**Frage:** Wie geht das Produkt mit progredienter Einwilligungsunfähigkeit um?
**Empfehlung: Datenfreigabe-Vorausverfügung** als Kernfeature — der Senior legt früh fest, was gelten soll, wenn er nicht mehr entscheiden kann. Dazu getrennte Onboarding-Sitzung ohne Angehörige und ein dokumentierter Betreuungs-/Vollmacht-Workflow.
**Begründung:** K7. Art. 9 DSGVO verlangt eine informierte Einwilligung des Betroffenen; die Realität der Zielgruppe stellt sie systematisch in Frage.
**Chance:** Richtig gebaut ist das kein Compliance-Ballast, sondern das glaubwürdigste Differenzierungsmerkmal gegenüber jedem Wettbewerber.
**Was daran hängt:** Kapitel 13, 14, 17, 35.

---

### E8 — Erstmarkt und Erlösreihenfolge

**Frage:** Selbstzahler, Hausnotruf-Erstattung oder DiPA zuerst?
**Empfehlung: Alle drei, in dieser Reihenfolge und mit überlappenden Startpunkten.**

| Stufe | Zeitfenster | Erlös | Zweck |
|---|---|---|---|
| 1. Familien-Abo (Selbstzahler) | Monat 0–12 | 34,90 €/Monat | Lernen, Nutzungsdaten, Wirkungsnachweis |
| 2. § 40 SGB XI Hausnotruf | Monat 9–24 | 27,00 €/Monat | Erste Erstattung, Kassenzugang, Vertriebspartner |
| 3. § 40a SGB XI DiPA | Monat 18–42 | bis 50,00 €/Monat | Burggraben, Skalierung |

**Zu prüfendes Risiko bei Stufe 3:** Das DiPA-Verzeichnis ist seit 2021 leer. Das ist entweder eine offene Flanke oder ein Friedhof — der Unterschied entscheidet über einen mehrjährigen Arbeitsstrang. Vor der Aufnahme dieses Ziels in die Roadmap gehört eine belastbare Klärung mit BfArM und GKV-Spitzenverband, warum bisher niemand durchgekommen ist.
**Was daran hängt:** Kapitel 22, 25, 26, 27, 28.

---

## Was ich ohne Rückmeldung annehme

Wenn du zu einzelnen Punkten nichts sagst, arbeite ich mit **allen Empfehlungen oben** weiter und führe sie als Entscheidung im [Entscheidungsregister](../anhang/entscheidungsregister.md). Jede ist dort mit den verworfenen Alternativen dokumentiert und bleibt damit später revidierbar, ohne dass die Begründung verloren geht.

Am wichtigsten sind **E1 (Positionierung)** und **E3 (Gesprächsbudget)** — die beiden bestimmen zusammen etwa achtzig Prozent aller nachfolgenden Kapitel.
