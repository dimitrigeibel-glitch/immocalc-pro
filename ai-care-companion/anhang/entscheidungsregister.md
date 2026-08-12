# Entscheidungsregister (ADR)

Jede Festlegung mit Wirkung über ein Kapitel hinaus steht hier — mit den **verworfenen Alternativen**. Zweck: Eine Entscheidung soll später revidierbar sein, ohne dass die Begründung verloren geht. Wer in zwei Jahren fragt „warum eigentlich kein eigenes Gerät?", findet die Antwort hier statt sie neu zu erfinden.

**Status:** `vorgeschlagen` (wartet auf Bestätigung) · `angenommen` · `revidiert` · `verworfen`

---

## ADR-001 — Positionierung „Die Brücke"

**Status:** vorgeschlagen · **Datum:** 2026-08-04 · **Bezug:** E1

**Entscheidung:** Das Produkt wird als Brücke zwischen Senior und seinem sozialen Umfeld positioniert, nicht als KI-Freund und nicht als Pflegedienst-Software.

**Kontext:** Nur 9,5 % der Älteren in Privathaushalten fühlen sich einsam; das verbreitete und beim Zahlenden liegende Problem ist die Sorge der Angehörigen.

**Verworfen:**
- *Option A „Der Begleiter"* — Gesprächsintensität zerstört die Marge; Amazon hat das Modell 2025 beendet; höchstes Reputations- und Art.-5-Risiko; kein Burggraben.
- *Option C „Pflege-Betriebssystem"* — vermutlich das größere Unternehmen, aber ohne Nutzungs- und Wirkungsdaten nicht verkäuflich. Als Phase-2-Erweiterung vorgesehen.

**Folgen:** Bestimmt Kap. 1–7, 22, 24–27, 30. Nordstern-Metrik wird „ausgelöste menschliche Kontakte", nicht Gesprächsminuten.

---

## ADR-002 — Telefon als erster Zugangspunkt, keine eigene Hardware

**Status:** vorgeschlagen · **Datum:** 2026-08-04 · **Bezug:** E2

**Entscheidung:** Phase 1 über ausgehende Telefonanrufe. Phase 2 White-Label-Tablet im Dock (ODM). Eigene Hardware frühestens ab Serie A.

**Kontext:** Eigene Hardware bedeutet 18–24 Monate und einen sechsstelligen CapEx vor der ersten Nutzungserkenntnis. Das Telefon erreicht die Zielgruppe ohne Onboarding-Hürde und ohne Zertifizierung.

**Verworfen:**
- *Eigener Home Hub ab Start (Briefing)* — Kapitalbindung und Zeitverlust vor Produktvalidierung.
- *Amazon Echo / Google Nest als Träger* — löst Hardware, schafft Plattformabhängigkeit und ein unlösbares Datenschutzversprechen.

**Bewusst in Kauf genommen:** Keine passive Umgebungssensorik in Phase 1, damit keine Sturzerkennung. Schwächt das Hausnotruf-Argument zunächst und muss im GTM offen adressiert werden.

---

## ADR-003 — Budgetierte Gesprächszeit statt unbegrenztem Dialog

**Status:** vorgeschlagen · **Datum:** 2026-08-04 · **Bezug:** E3

**Entscheidung:** Zielgröße 10–15 Gesprächsminuten pro Tag und Nutzer. Dreistufige Modellkaskade: regelbasiert/on-device → kleines Modell → großes Modell nur für Bedeutsames.

**Kontext:** Bei 34,90–39 € Abopreis und 60 % Zielmarge liegt die COGS-Obergrenze bei ~15,60 €/Monat, also rund 390 Minuten (A-16 bis A-20).

**Verworfen:**
- *Unbegrenzter Dialog* — bei 90 Min./Tag COGS von 108–378 €/Monat gegen maximal 50 € Erlös.
- *Hartes Abschneiden bei Budgetende* — würdelos und produktfeindlich. Stattdessen Übergang in günstigere Modi und Weiterleitung an einen Menschen.

**Folgen:** Kap. 8, 9, 11, 18, 27. Vorlesen, Musik und Spiele müssen nicht-generativ gelöst werden oder entfallen.

---

## ADR-004 — Kein Medizinprodukt starten, MDR-Fähigkeit vorbereiten

**Status:** vorgeschlagen · **Datum:** 2026-08-04 · **Bezug:** E5

**Entscheidung:** Enge, nicht-medizinische Zweckbestimmung. Datenmodell, Protokollierung und Einwilligungen jedoch so bauen, dass die Daten später als klinische Evidenz taugen.

**Kontext:** MDR Regel 11 und MDCG 2019-11 stufen Software, die einen Zustand kontinuierlich überwacht oder Entscheidungsgrundlagen liefert, mindestens als Klasse IIa ein. Der Haftungsausschluss ist irrelevant, die Zweckbestimmung entscheidet.

**Verworfen:**
- *Direkter MDR-IIa-Weg* — 18–36 Monate und 400k–1,2 Mio. € vor dem ersten Euro Umsatz.
- *Medizinische Claims ohne Zulassung* — schlicht rechtswidrig.

**Erzwungene Disziplin:** Hinweise werden als beobachtete Ereignisse formuliert, nie als Bewertung. Kein einziger Früherkennungs-Claim im Marketing — auch nicht auf einer Landingpage.

---

## ADR-005 — Ereignisse statt Transkripte an Angehörige

**Status:** vorgeschlagen · **Datum:** 2026-08-04 · **Bezug:** E6

**Entscheidung:** Angehörige und Pflegedienst sehen Ereignisse und Zusammenfassungen. Niemals Wortlaute oder Transkripte. Rohaudio wird nicht persistiert. Der Senior kann jederzeit einsehen, was über ihn geteilt wurde.

**Kontext:** Der Wortlaut eines Gesprächs ist die Grenze zwischen Fürsorge und Überwachung. Dritte (Besucher, Pflegekräfte) willigen nie ein.

**Verworfen:**
- *Volltranskripte für Angehörige* — macht das Produkt zum Überwachungssystem und ist gegenüber Dritten nicht rechtfertigbar.
- *Konfigurierbare Transkriptfreigabe* — die Konfiguration wird faktisch von dem gesetzt, der beim Onboarding daneben sitzt.

**Erwarteter Konflikt:** Zahlende Angehörige werden mehr verlangen. Diese Grenze wird architektonisch erzwungen, nicht per Richtlinie.

---

## ADR-006 — Datenfreigabe-Vorausverfügung

**Status:** vorgeschlagen · **Datum:** 2026-08-04 · **Bezug:** E7

**Entscheidung:** Der Senior legt zu Beginn fest, was gelten soll, wenn er selbst nicht mehr entscheiden kann. Getrennte Onboarding-Sitzung ohne Angehörige für Freigabeentscheidungen. Dokumentierter Betreuungs-/Vollmacht-Workflow.

**Kontext:** Progrediente Einwilligungsunfähigkeit trifft genau die Kohorte mit dem größten Produktnutzen. Art. 9 DSGVO verlangt eine informierte Einwilligung des Betroffenen selbst.

**Verworfen:**
- *Einmalige Einwilligung beim Onboarding (Briefing)* — bricht bei nachlassender Entscheidungsfähigkeit und bei gemeinsamer Einrichtung mit Angehörigen.
- *Delegation an Angehörige ab Pflegegrad X* — ersetzt Selbstbestimmung durch Fremdbestimmung ohne rechtliche Grundlage.

**Chance:** Glaubwürdigstes Differenzierungsmerkmal gegenüber jedem Wettbewerber.

---

## ADR-007 — Dreistufige Erlösreihenfolge

**Status:** vorgeschlagen · **Datum:** 2026-08-04 · **Bezug:** E8

**Entscheidung:** Familien-Abo (Monat 0–12) → § 40 SGB XI Hausnotruf (Monat 9–24) → § 40a SGB XI DiPA (Monat 18–42), mit überlappenden Startpunkten.

**Kontext:** Jede Stufe finanziert und legitimiert die nächste. Ohne Endnutzerdaten kein Wirkungsnachweis, ohne Wirkungsnachweis kein institutioneller Vertrag, ohne institutionellen Vertrag keine Erstattung.

**Verworfen:**
- *Reines Consumer-Abo* — von Amazon getestet und 2025 beendet.
- *DiPA zuerst* — Verzeichnis seit 2021 leer, Zulassungsdauer unkalkulierbar, kein Umsatz in der Zwischenzeit.

**Offenes Risiko:** Warum ist in fünf Jahren keine einzige DiPA gelistet worden? Vor Aufnahme in die Roadmap mit BfArM und GKV-Spitzenverband klären (A-11).

---

## ADR-008 — Dokumentation in eigenem Verzeichnis statt eigenem Repository

**Status:** angenommen · **Datum:** 2026-08-04

**Entscheidung:** Die Dokumentation liegt vorerst unter `ai-care-companion/` im Repository `immocalc-pro`, auf Branch `claude/ai-care-companion-startup-p213mo`.

**Kontext:** Ein eigenes Repository war gewünscht und vorgesehen. Die GitHub-App dieser Session besitzt kein Recht zur Repository-Erstellung (`403 Resource not accessible by integration`).

**Verworfen:** *Warten auf ein neues Repository* — hätte die Arbeit blockiert.

**Migrationspfad:** Sobald ein leeres Repository `ai-care-companion` existiert, lässt sich das Verzeichnis mit vollständiger Historie per `git subtree split` übertragen. Die interne Verlinkung ist relativ und bleibt dabei intakt.

---

## ADR-009 — Öffentliche Förderung vor Wagniskapital

**Status:** vorgeschlagen · **Datum:** 2026-08-04 · **Bezug:** Kap. 27, 37

**Entscheidung:** Der Finanzierungsaufbau beginnt mit öffentlichen Fördermitteln. Wagniskapital wird erst aufgenommen, wenn die förderrechtlichen Weichen gestellt sind.

**Kontext:** Die Reihenfolge ist keine Präferenz, sondern eine Einbahnstraße. Drei Mechanismen wirken nur in eine Richtung:

- **KMU-Status** nach EU-Empfehlung 2003/361 — eine Beteiligung oberhalb der Schwellenwerte durch einen Nicht-KMU-Investor kann ihn kosten und damit ganze Programmfamilien schließen.
- **Vorgründungsprogramme** — EXIST-Gründungsstipendium und InnoFounder setzen voraus, dass noch nicht bzw. erst kürzlich gegründet wurde. Dieses Fenster schließt sich unwiderruflich.
- **Anreizeffekt nach Art. 6 AGVO** — beginnt das Vorhaben vor der Antragstellung, entfällt der Anspruch. Was als Vorhabenbeginn gilt, ist programmabhängig und betrifft bereits Verträge, Beschaffungen und Einstellungen.

**Zusätzlicher Befund:** Der Innovationsfonds beim G-BA vergibt 2026 allein 80 Mio. € für neue Versorgungsformen. Das übertrifft eine typische Seed-Runde und erzeugt zugleich die Versorgungsevidenz, die für den DiPA-Weg (ADR-007) ohnehin gebraucht wird. Der Zugang führt über eine Krankenkasse als Konsortialpartner — und damit über genau den institutionellen Vertriebszugang, der nach K10 einen der drei echten Burggräben bildet.

**Verworfen:**
- *VC-Runde zuerst, Förderung später* — schließt Vorgründungsprogramme dauerhaft aus und gefährdet den KMU-Status.
- *Ausschließlich Förderung* — Fördermittel finanzieren Entwicklung und Evidenz, aber keinen Vertriebsaufbau und keine Marktdurchdringung.

**Nächster Schritt:** Recherche mit dem Prompt in [`foerderrecherche-prompt.md`](foerderrecherche-prompt.md). Bis zum Ergebnis bleibt diese Entscheidung `vorgeschlagen`.
