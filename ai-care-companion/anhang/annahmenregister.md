# Annahmenregister

Jede Zahl in dieser Dokumentation ist entweder **belegt** (Quelle verlinkt) oder steht hier als **Annahme**. Annahmen sind als Fakten getarnt gefährlich — deshalb dieses Register.

**Status-Legende:** 🟢 belegt · 🟡 begründete Schätzung · 🔴 ungeprüft, muss validiert werden

| ID | Annahme | Wert | Status | Grundlage / nötige Validierung | Wirkt auf |
|---|---|---|---|---|---|
| A-01 | Menschen 65+ in DE, die allein leben | 34,0 % | 🟢 | Destatis | Kap. 4, 27 |
| A-02 | Menschen 85+ in DE, die allein leben | 56,0 % | 🟢 | Destatis | Kap. 4, 27 |
| A-03 | Einsamkeitsprävalenz 80+ | 12,1 % | 🟢 | D80+-Studie, BMFSFJ | Kap. 1, 4, 23 |
| A-04 | Einsamkeitsprävalenz 80+ in Privathaushalten | 9,5 % | 🟢 | D80+-Studie | Kap. 1, 4 |
| A-05 | Pflegebedürftige in DE (Dez. 2023) | 5,69 Mio. | 🟢 | Destatis | Kap. 4, 27 |
| A-06 | davon zu Hause versorgt | 86 % (4,89 Mio.) | 🟢 | Destatis | Kap. 4, 26 |
| A-07 | davon ausschließlich Pflegegeld (ohne Pflegedienst) | ~3,1 Mio. | 🟢 | Destatis | Kap. 4, 26 |
| A-08 | Hausnotruf-Pauschale § 40 SGB XI | 27,00 €/Monat ab 01.04.2026 | 🟢 | mehrere Fachportale; **vor Finanzplan gegen GKV-Spitzenverband prüfen** | Kap. 25, 27 |
| A-09 | Installationspauschale Hausnotruf | 10,49 € einmalig | 🟢 | Fachportale | Kap. 27 |
| A-10 | DiPA-Erstattungsdeckel § 40a SGB XI | bis 50,00 €/Monat | 🟢 | BfArM, SGB XI | Kap. 25, 27 |
| A-11 | Anzahl gelisteter DiPA im BfArM-Verzeichnis | 0 (Stand Jan. 2025) | 🟢 | BfArM; **Stand 2026 direkt beim BfArM verifizieren** | Kap. 25, 28 |
| A-12 | STT-Kosten pro Minute (Streaming, multilingual) | ~$0,006 | 🟢 | Deepgram Nova-3 Listenpreis | Kap. 11, 27 |
| A-13 | TTS-Kosten pro Minute (Mittelklasse) | ~$0,015 | 🟢 | Anbietervergleich 2026 | Kap. 11, 27 |
| A-14 | LLM-Kosten pro Gesprächsminute | ~$0,010 | 🟡 | Abhängig von Kontextlänge und Kaskadenanteil. **Muss mit echtem Dialogkorpus gemessen werden** | Kap. 11, 27 |
| A-15 | Telefonie ausgehend dt. Festnetz | ~€0,010/Min | 🟡 | Marktüblich, SIP-Trunk. Volumenrabatte nicht eingerechnet | Kap. 27 |
| A-16 | **Gesamt-COGS pro Gesprächsminute (kaskadiert)** | **~€0,04** | 🟡 | Summe A-12 bis A-15. **Zentrale Planungsgröße — Messung im ersten Piloten hat höchste Priorität** | Kap. 2, 8, 9, 11, 27 |
| A-17 | COGS pro Minute bei fertiger Realtime-Plattform | €0,10–0,14 | 🟢 | Marktvergleich 2026 | Kap. 11, 27 |
| A-18 | Angesetzter Abopreis Familien-Selbstzahler | 34,90 €/Monat | 🔴 | **Reine Setzung. Zahlungsbereitschaft ist ungeprüft und muss vor dem Finanzplan getestet werden** | Kap. 25, 27 |
| A-19 | Ziel-Bruttomarge | 60 % | 🟡 | Branchenüblich für Hardware-freie SaaS mit hohen variablen Kosten | Kap. 27 |
| A-20 | Daraus abgeleitetes Gesprächsbudget | ~390 Min./Monat ≈ 13 Min./Tag | 🟡 | Rechnerisch aus A-16, A-18, A-19. Ändert sich mit jedem dieser drei Werte | Kap. 8, 9, 11, 18 |
| A-21 | CapEx eigene Hardwareentwicklung bis Serienreife | 250k–600k € | 🔴 | **Grobschätzung. Bei Verfolgung von E2-Phase-3 durch ODM-Angebote zu ersetzen** | Kap. 16, 27 |
| A-22 | Kosten MDR-Klasse-IIa-Zulassung | 400k–1,2 Mio. € | 🔴 | **Grobschätzung inkl. QMS ISO 13485, IEC 62304, klinische Bewertung, Benannte Stelle. Angebot einholen** | Kap. 28, 32 |
| A-23 | Time-to-Market eigene Hardware | 18–24 Monate | 🟡 | Erfahrungswert Consumer-Hardware mit CE/Funk | Kap. 16, 22 |
| A-24 | STT-Erkennungsrate bei Zielkohorte 75+ | unbekannt | 🔴 | **Größtes ungeprüftes technisches Risiko.** Schwerhörigkeit, Dialekt, Sprechtempo, Prothesen, Aphasie. Muss im ersten Piloten gemessen werden | Kap. 11, 34 |
| A-25 | Anteil Gespräche, die das große Modell erreichen | 15–25 % | 🔴 | **Setzung. Wichtigster einzelner P&L-Treiber nach A-16** | Kap. 11, 27 |
| A-26 | Verkaufszyklus B2B-Pflegedienst | 9–18 Monate | 🟡 | Branchenerfahrung Gesundheits-/Pflegevertrieb | Kap. 26, 27 |
| A-27 | ElliQ-Programmteilnehmer NY (Mai 2025) | 834 von 3.500+ Bewerbern | 🟢 | NYSOFA | Kap. 23 |
| A-28 | Alexa Together eingestellt | Mai 2025 | 🟢 | mehrere Quellen; Amazon nannte keinen offiziellen Grund | Kap. 23, 25 |
| A-29 | Jährliche Sterberate in der Nutzerkohorte | unbekannt | 🔴 | Wirkt direkt auf Churn und LTV. **Muss aus Sterbetafeln nach Alter/Pflegegrad modelliert werden** | Kap. 27, 36 |
| A-30 | Innovationsfonds G-BA, Volumen 2026 neue Versorgungsformen | 80 Mio. € | 🟢 | G-BA; zusätzlich 20 Mio. € Versorgungsforschung und 10 Mio. € kurze Laufzeit | Kap. 27, 37 |
| A-31 | Innovationsfonds, Einreichfristen 2026 | 21.04. (zweistufig), 19.05. (einstufig lang), laufend bis 31.12. (einstufig kurz) | 🟢 | G-BA; **Fristen werden jährlich neu gesetzt, vor Planung prüfen** | Kap. 22, 37 |
| A-32 | Krankenkasse als Konsortialpartner beim Innovationsfonds zwingend | vermutlich ja | 🔴 | **Nicht verifiziert. Entscheidet über die Machbarkeit des größten Einzeltopfes** | Kap. 26, 37 |
| A-33 | Bewilligungsquoten der Förderprogramme | unbekannt | 🔴 | Ohne diese Größe ist keine Erwartungswertrechnung möglich | Kap. 27, 37 |
| A-34 | Aufwand Antragstellung je Programm (Personentage) | unbekannt | 🔴 | Bei einem kleinen Team der eigentliche Engpass, nicht das Geld | Kap. 37 |
| A-35 | Hamburger Zuschussprogramme sind untereinander nicht kombinierbar | trifft auf InnoFounder/InnoRampUp/InnoImpact/InnoFinTech zu | 🟢 | IFB Innovationsstarter | Kap. 37 |
| A-36 | De-minimis-Obergrenze | 300.000 € über 3 Steuerjahre | 🟡 | VO (EU) 2023/2831. **Geltenden Stand verifizieren** | Kap. 27, 37 |

---

## Die vier Zahlen, die zuerst validiert gehören

Nach Hebelwirkung auf den Business Case sortiert:

1. **A-16 — COGS pro Gesprächsminute.** Bestimmt Preis, Produktumfang und Marge gleichzeitig. Messbar im ersten Piloten mit zehn Nutzern.
2. **A-18 — Zahlungsbereitschaft.** Aktuell eine reine Setzung. Ohne Validierung ist der gesamte Finanzplan Fiktion.
3. **A-24 — STT-Erkennungsrate bei 75+.** Wenn die Spracherkennung bei der realen Kohorte nicht trägt, existiert kein Produkt. Testbar mit 20 Aufnahmen in zwei Wochen.
4. **A-11 — DiPA-Realität.** Entscheidet über einen mehrjährigen Arbeitsstrang. Klärbar mit zwei Telefonaten.

Alle vier sind mit geringem Aufwand prüfbar. Keine davon sollte bis zum Finanzplan (Kap. 27) offen bleiben.
