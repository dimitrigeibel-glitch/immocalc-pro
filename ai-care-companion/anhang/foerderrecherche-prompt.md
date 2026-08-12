# Prompt für die Förderrecherche (Deep Research)

**Zweck:** Vollständige Erhebung aller Förderprogramme für das Vorhaben auf den Ebenen Hamburg, Bund, EU, Sozialversicherung und Stiftungen.
**Anwendung:** Unverändert in eine Deep-Research-KI kopieren. Vorher die drei mit `⚠️ AUSFÜLLEN` markierten Felder im Steckbrief ausfüllen — sie entscheiden über die Zulässigkeit ganzer Programmfamilien.
**Stand:** August 2026. Alle genannten Fristen und Beträge sind Stand der Vorrecherche und von der Research-KI gegen die Primärquelle zu prüfen.

---

## Der Prompt

````
# ROLLE

Du bist Fördermittelberater mit fünfzehn Jahren Erfahrung in der Finanzierung von
Health-Tech- und Sozialinnovations-Startups in Deutschland. Du kennst das
Zuwendungsrecht, das EU-Beihilferecht (AGVO, De-minimis) und die Praxis der
Bewilligungsbehörden. Du weißt, dass die meisten Gründer nicht daran scheitern,
das richtige Programm zu finden, sondern an Ausschlusskriterien, die sie zu spät
lesen.

# AUFTRAG

Erstelle eine vollständige, belastbare Übersicht aller Förderprogramme, für die
das unten beschriebene Vorhaben in Frage kommt. Ebenen: Freie und Hansestadt
Hamburg, Bund, Europäische Union, Sozialversicherung (SGB V/XI) und private
Stiftungen.

Ziel ist keine Linksammlung, sondern eine Entscheidungsgrundlage: Welche
Programme werden in welcher Reihenfolge beantragt, was schließt sich gegenseitig
aus, und was muss vorher passieren.

# PROJEKTSTECKBRIEF

**Vorhaben:** KI-gestützter Begleiter für ältere Menschen, die allein zu Hause
leben. Das System führt kurze tägliche Sprachdialoge (zunächst über das
Festnetztelefon, später über ein Tablet-Dock), erinnert an Medikamente und
Termine, hält Tagesstruktur, erkennt Abweichungen vom persönlichen Normalzustand
und informiert — nur bei Freigabe durch den Senior — Angehörige und Pflegedienste
über Ereignisse.

**Ausdrückliche Produktausrichtung:** Das System ersetzt menschlichen Kontakt
nicht, sondern löst ihn aus. Erfolgskennzahl ist die Zahl der angestoßenen
Kontakte mit realen Menschen, nicht die Gesprächsdauer mit der KI.

**Technologie:** Sprachverarbeitung (STT/TTS), große Sprachmodelle in
kaskadierter Architektur, longitudinale Verhaltens-Baseline je Person,
Web-Anwendungen für Angehörige und Pflegedienste.

**Regulatorischer Status:** Bewusst **kein Medizinprodukt**. Enge, nicht-
medizinische Zweckbestimmung, keine Diagnose- oder Früherkennungs-Claims. Eine
spätere MDR-Klasse-IIa-Zulassung wird vorbereitet, ist aber nicht Gegenstand der
ersten drei Jahre. Berücksichtige das: Programme, die eine Medizinprodukte-
Zulassung oder klinische Prüfung nach MDR voraussetzen, scheiden zunächst aus —
kennzeichne sie aber als „später relevant".

**Datenschutz/KI-Recht:** Verarbeitung von Gesundheitsdaten nach Art. 9 DSGVO.
Einstufung nach EU-KI-VO ist zu prüfen; das Produkt ist bewusst so gestaltet,
dass es nicht unter die verbotenen Praktiken nach Art. 5 fällt.

**Markt und Erlösmodell:** DACH, Start Deutschland. Dreistufig — Familien-Abo als
Selbstzahlerleistung, danach Anerkennung als Hausnotrufsystem nach § 40 SGB XI
(27,00 €/Monat), langfristig Listung als digitale Pflegeanwendung nach
§ 40a SGB XI (bis 50 €/Monat). Perspektivisch B2B-Lizenzierung an ambulante
Pflegedienste.

**Standort:** Hamburg.

**⚠️ AUSFÜLLEN — Gründungsstatus:** [noch nicht gegründet / gegründet am TT.MM.JJJJ,
Rechtsform, Anzahl Mitarbeiter, bisheriger Umsatz]
→ Entscheidet über EXIST, InnoFounder und alle Vorgründungsprogramme.

**⚠️ AUSFÜLLEN — Hochschul- oder Forschungsanbindung:** [keine / Kontakt zu
Hochschule X / laufende Kooperation mit Institut Y]
→ Entscheidet über EXIST-Forschungstransfer, KMU-innovativ, Verbundforschung.

**⚠️ AUSFÜLLEN — Eigenmittel und Kofinanzierungsfähigkeit:** [verfügbare
Eigenmittel in €; Vollzeit oder nebenberuflich; bestehende Investoren und deren
Anteil in %]
→ Entscheidet über alle Programme mit Eigenanteil und über den KMU-Status.

# SUCHEBENEN

Arbeite alle fünf Ebenen getrennt ab. Ebene 4 wird regelmäßig übersehen und ist
für dieses Vorhaben potenziell die größte.

**Ebene 1 — Hamburg:** IFB Hamburg, IFB Innovationsstarter GmbH, Hamburg Invest,
Behörde für Wirtschaft und Innovation, Behörde für Arbeit, Gesundheit, Soziales,
Familie und Integration, Hamburgische Investitions- und Förderbank, Cluster Life
Science Nord, EFRE-/ESF+-Landesprogramme Hamburg.

**Ebene 2 — Bund:** BMWE (vormals BMWK), BMFTR (vormals BMBF), BMG, BMFSFJ,
BMAS, KfW, Projektträger (DLR-PT, VDI/VDE-IT, DLR Projektträger Gesundheit).

**Ebene 3 — EU:** Horizon Europe, EIC, EIT Health, Digital Europe Programme,
EU4Health, Eurostars/EUREKA, Interreg, EFRE/ESF+.

**Ebene 4 — Sozialversicherung:** Innovationsfonds beim Gemeinsamen
Bundesausschuss (G-BA), Selektivverträge nach §§ 140a ff. SGB V,
Modellvorhaben nach § 125 SGB XI, Förderung durch einzelne Kranken- und
Pflegekassen. **Prüfe diese Ebene besonders gründlich** — hier liegen die
größten Einzelbeträge und sie taucht in Standard-Förderdatenbanken nicht auf.

**Ebene 5 — Stiftungen und Sonstige:** insbesondere Stiftungen mit den
Schwerpunkten Pflege, Alter, Demografie, Teilhabe und Hamburg.

# PROGRAMME ZUR VERIFIKATION

Die folgende Liste stammt aus einer Vorrecherche (Stand August 2026). Prüfe
**jedes** Programm auf aktuellen Stand, Zutreffen und Fristen — und ergänze,
was fehlt. Behandle die Liste als Ausgangspunkt, nicht als Ergebnis.

**Hamburg**
- IFB Innovationsstarter: InnoFounder (Gründungsphase, personengebundener
  Pauschalzuschuss)
- IFB Innovationsstarter: InnoRampUp (DeepTech, bis 150.000 € Zuschuss)
- IFB Innovationsstarter: InnoImpact (Social Entrepreneurship) — **hoch relevant,
  prüfe die Abgrenzung zu InnoFounder; die vier Programme sind nicht kombinierbar**
- IFB Hamburg: PROFI (Programm zur Förderung von Forschung, Entwicklung und
  Innovation), inkl. PROFI Transfer Plus
- IFB Hamburg: Hamburg Kredit Innovation
- Innovationsstarter Fonds Hamburg (Beteiligungskapital)
- Hamburger Existenzgründungsprogramm
- EFRE Hamburg 2021–2027 und ESF+ Hamburg
- Landesmittel der Sozialbehörde für Pflege und Digitalisierung

**Bund**
- EXIST-Gründungsstipendium (Vorgründungsphase, bis 12 Monate)
- EXIST-Forschungstransfer Phase I und II
- ZIM — Zentrales Innovationsprogramm Mittelstand (Einzel-, Kooperations- und
  Netzwerkprojekte)
- KMU-innovativ (Module Medizintechnik, Gesundheitsforschung, IKT/KI)
- BMFTR-Programm „Zukunft der Pflege" und Pflegeinnovationszentrum
- BMG-Förderrichtlinien zur Digitalisierung der Versorgung
- Hightech Agenda Deutschland, KI-Förderaufrufe
- Gründungswettbewerb Digitale Innovationen
- INVEST — Zuschuss für Wagniskapital (wirkt auf Investorenseite)
- KfW: ERP-Gründerkredit, ERP-Kapital für Gründung
- High-Tech Gründerfonds, DeepTech & Climate Fonds (Beteiligung, kein Zuschuss)
- Mikromezzaninfonds Deutschland

**EU**
- Horizon Europe Cluster 1 „Health", Arbeitsprogramm 2026–2027 (veröffentlicht
  12.12.2025). Prüfe insbesondere die Destination zu selbstbestimmtem Leben,
  Teilhabe und gesundem Altern. Einreichfristen u.a. 16.04.2026 und 15.09.2026,
  weitere Calls öffnen 2027. EU-Beitrag je Projekt überwiegend 1,5–10 Mio. €,
  Förderquote bis 100 %.
- EIC Accelerator (Zuschuss plus Beteiligung), EIC Pathfinder, EIC Transition
- EIT Health (Business Plan Contest, Headstart, weitere Formate)
- Digital Europe Programme, European Digital Innovation Hubs
- EU4Health
- Eurostars/EUREKA (KMU mit F&E und internationalem Partner)
- Interreg Nordsee und Ostsee
- Prüfe, welches Programm die Nachfolge des ausgelaufenen AAL-Programms
  (Active Assisted Living) angetreten hat

**Sozialversicherung**
- **Innovationsfonds beim G-BA** — für 2026 stehen 80 Mio. € für neue
  Versorgungsformen, 20 Mio. € für Versorgungsforschung und 10 Mio. € für neue
  Versorgungsformen mit kurzer Laufzeit zur Verfügung. Verfahren: zweistufig
  (Ideenskizze), einstufig lang, einstufig kurz (laufende Einreichung).
  **Kläre zwingend:** Ist eine Krankenkasse als Konsortialpartner verpflichtend,
  welche Kassen haben in der Vergangenheit vergleichbare Projekte mitgetragen,
  wie lang ist der Vorlauf bis zur Antragsreife, und wie hoch war die
  Bewilligungsquote der letzten Runden?
- Modellvorhaben nach § 125 SGB XI
- Selektivverträge nach §§ 140a ff. SGB V

**Stiftungen und Sonstige**
- Robert Bosch Stiftung (Pflege ist historischer Förderschwerpunkt)
- Körber-Stiftung, Hamburg (Demografischer Wandel und Alter)
- Joachim Herz Stiftung, Hamburg
- Software AG Stiftung
- Aktion Mensch (Teilhabe, Barrierefreiheit)
- Deutsche Stiftung für Engagement und Ehrenamt
- Weitere Stiftungen mit Schwerpunkt Alter, Pflege oder Digitalisierung

# SUCHSTRATEGIE: SIEBEN FRAMINGS

Dasselbe Vorhaben qualifiziert je nach Etikett für völlig verschiedene Töpfe.
Führe für **jedes** der folgenden Framings eine eigene Suche durch, statt nur
nach „KI für Senioren" zu suchen:

1. Pflege und Gesundheitsversorgung
2. Künstliche Intelligenz und Digitalisierung
3. Demografischer Wandel und Alter
4. Social Entrepreneurship und gesellschaftliche Wirkung
5. Barrierefreiheit, Teilhabe und Selbstbestimmung
6. Digital Health, eHealth und Medizintechnik
7. Technologieoffene Gründungs- und Innovationsförderung

# PFLICHTFELDER JE PROGRAMM

Erfasse zu jedem zutreffenden Programm:

1. Name, Förderebene, Fördermittelgeber, ausführende Stelle/Projektträger
2. Förderart (Zuschuss, Darlehen, Beteiligung, Stipendium, Bürgschaft)
3. Maximale Fördersumme
4. Förderquote in Prozent und erforderlicher Eigenanteil in Euro
5. Laufzeit der Förderung
6. Nächste Einreichfrist, Verfahrensstufen, laufende oder Stichtagseinreichung
7. Zeit von Antrag bis Bewilligung
8. Zulässige Zuwendungsempfänger (Person, Unternehmen, Konsortium)
9. Konsortialpflicht — wenn ja: welche Partner, wie viele, aus welchen Ländern
10. Förderfähige Kosten und ausdrücklich nicht förderfähige Kosten
11. Beihilferechtliche Grundlage (AGVO-Artikel, De-minimis, Notifizierung)
12. Kombinierbarkeit mit anderen Programmen dieser Liste
13. Konkrete Ausschlusskriterien für dieses Vorhaben
14. Geschätzter Aufwand für die Antragstellung in Personentagen
15. Bewilligungsquote, sofern öffentlich
16. Passgenauigkeit zum Vorhaben auf einer Skala 1–5, mit Begründung
17. Quelle (Primärquelle mit Datum)

# KNOCK-OUT-PRÜFUNG

Prüfe für jedes Programm explizit und benenne das Ergebnis:

- **Anreizeffekt (Art. 6 AGVO):** Führt ein bereits erfolgter Vorhabenbeginn zum
  Ausschluss? Was gilt bei diesem Programm als Vorhabenbeginn? **Dies ist der
  häufigste und teuerste Fehler — behandle ihn bei jedem Programm vorrangig.**
- **Gründungsstatus:** Setzt das Programm voraus, dass noch nicht gegründet
  wurde, oder umgekehrt ein bestehendes Unternehmen mit Mindestalter?
- **KMU-Status nach EU-Empfehlung 2003/361:** Wird er vorausgesetzt? Prüfe,
  ab welcher Investorenbeteiligung er verloren geht und welche Programme das
  ausschließen würde.
- **Sitzerfordernis:** Betriebsstätte in Hamburg, Deutschland oder der EU?
- **Unternehmen in Schwierigkeiten** im Sinne der AGVO?
- **De-minimis-Obergrenze:** aktuell 300.000 € über drei Steuerjahre nach
  VO (EU) 2023/2831 — verifiziere den geltenden Stand.
- **Doppelförderungsverbot:** Welche Programme schließen einander aus?
- **Medizinprodukte-Voraussetzung:** Setzt das Programm eine MDR-Zulassung oder
  klinische Prüfung voraus?

# KUMULIERUNG UND REIHENFOLGE

Beantworte ausdrücklich:

- Welche Programme lassen sich **gleichzeitig** in Anspruch nehmen?
- Welche schließen einander aus, und für wie lange?
- Welche Reihenfolge maximiert das Gesamtvolumen über drei Jahre?
- **An welcher Stelle zerstört die Aufnahme von Wagniskapital den Zugang zu
  Fördermitteln?** Prüfe insbesondere den Verlust des KMU-Status bei
  Beteiligung durch Nicht-KMU-Investoren und Programme, die eine
  Vorgründungsphase voraussetzen.
- Welche Entscheidungen müssen **jetzt** getroffen werden, weil sie später
  nicht mehr revidierbar sind (Gründungszeitpunkt, Rechtsform,
  Gesellschafterstruktur, Vorhabenbeginn)?

# QUELLENANFORDERUNGEN

- Belege jede Aussage mit einer **Primärquelle**: Förderrichtlinie,
  Bekanntmachung, Programmseite des Fördermittelgebers, amtliches Merkblatt.
- Gib zu jeder Quelle das Veröffentlichungs- oder Abrufdatum an.
- Verwende Beratungsportale, Blogs und Vermittlerseiten **niemals als alleinigen
  Beleg** — dort stehen häufig veraltete Beträge und Fristen.
- Verifiziere die aktuellen Ministeriumsbezeichnungen und Zuständigkeiten. Die
  Ressorts wurden zuletzt umbenannt und neu zugeschnitten; schreibe alte
  Bezeichnungen nicht ungeprüft fort.
- Kennzeichne jede Angabe, die du nicht an der Primärquelle verifizieren
  konntest, ausdrücklich als ungeprüft.

# AUSGABEFORMAT

**Teil 1 — Rangliste.** Alle zutreffenden Programme, sortiert nach erwartetem
Nutzen (Fördersumme × Erfolgswahrscheinlichkeit ÷ Aufwand). Tabellarisch, mit
Fördersumme, Frist, Passgenauigkeit und einer Zeile Begründung.

**Teil 2 — Einzeldossiers.** Für die zehn bestplatzierten Programme jeweils alle
17 Pflichtfelder, dazu eine ehrliche Einschätzung der Erfolgsaussichten und die
größte Hürde.

**Teil 3 — Förderfahrplan.** Zeitlich geordnete Empfehlung über 24 Monate: was
wann beantragt wird, welche Vorarbeiten und Partner dafür nötig sind, welche
Fristen den Takt vorgeben.

**Teil 4 — Ausgeschlossen und warum.** Alle geprüften, aber nicht zutreffenden
Programme mit dem konkreten Ausschlussgrund. Dieser Teil ist ausdrücklich
erwünscht — er verhindert, dass dieselben Programme später erneut geprüft werden.

**Teil 5 — Sofortmaßnahmen.** Was in den nächsten 14 Tagen zu tun ist, damit
keine Frist und kein Anspruch verfällt. Insbesondere alles, was mit dem
Anreizeffekt und dem Gründungszeitpunkt zusammenhängt.

**Teil 6 — Offene Fragen.** Was sich nicht abschließend klären ließ, und bei
welcher Stelle es zu erfragen ist (mit Kontaktweg).

# WAS DU NICHT TUN SOLLST

- **Erfinde keine Programme.** Ein plausibel klingender Programmname, den es
  nicht gibt, ist schlimmer als eine Lücke. Wenn du unsicher bist, schreibe
  „nicht verifiziert" dazu.
- Gib keine Beträge oder Fristen aus dem Gedächtnis an, ohne sie an der
  Primärquelle geprüft zu haben.
- Verschweige keine Ausschlusskriterien, um eine Liste länger wirken zu lassen.
- Empfiehl keine Programme, die inhaltlich passen, aber formal ausgeschlossen
  sind, ohne den Ausschluss deutlich zu benennen.
- Beschränke dich nicht auf die bekannten Gründerprogramme. Der größte Einzeltopf
  für dieses Vorhaben liegt aller Voraussicht nach außerhalb der klassischen
  Startup-Förderung.
````

---

## Hinweise zur Anwendung

**Vor dem Absenden:** Die drei `⚠️ AUSFÜLLEN`-Felder ausfüllen. Ohne sie liefert die Research-KI eine Liste, aus der sich nicht ablesen lässt, was tatsächlich beantragbar ist.

**Der wichtigste Einzelbefund der Vorrecherche:** Der Innovationsfonds beim G-BA vergibt 2026 allein 80 Mio. € für neue Versorgungsformen. Das ist kein Gründerzuschuss, sondern Projektförderung in einer Größenordnung, die eine Seed-Runde übertrifft — und sie erzeugt genau die Versorgungsevidenz, die für den DiPA-Weg ohnehin gebraucht wird. Der Zugang führt über eine Krankenkasse als Konsortialpartner, was zugleich den institutionellen Vertriebszugang eröffnet. Dieser Punkt gehört an den Anfang jeder Bewertung.

**Zeitkritisch:** Der Anreizeffekt nach Art. 6 AGVO. Wer mit dem Vorhaben beginnt, bevor der Antrag gestellt ist, verliert bei vielen Programmen den Anspruch — endgültig. Was als Vorhabenbeginn gilt, ist programmabhängig und sollte geklärt sein, bevor Verträge geschlossen, Geräte beschafft oder Personal eingestellt wird.

**Nach der Recherche:** Die Ergebnisse fließen in Kapitel 37 (Förderstrategie) und wirken zurück auf Kapitel 27 (Finanzplanung) sowie auf ADR-009 im Entscheidungsregister — die Reihenfolge Förderung vor Wagniskapital ist keine Präferenz, sondern eine Einbahnstraße.

---

## Belegte Quellen der Vorrecherche

- [IFB Innovationsstarter — Förderprogramme](https://innovationsstarter.com/)
- [IFB Hamburg — InnoFounder](https://www.ifbhh.de/foerderprogramm/innofounder)
- [IFB Innovationsstarter — InnoRampUp](https://innovationsstarter.com/innorampup/)
- [IFB Hamburg — Innovationen realisieren](https://www.ifbhh.de/programme/gruender-unternehmen/innovationen-realisieren)
- [G-BA Innovationsfonds — Förderbekanntmachungen](https://innovationsfonds.g-ba.de/foerderbekanntmachungen/)
- [G-BA — Vier neue Förderbekanntmachungen für neue Versorgungsformen](https://www.g-ba.de/presse/pressemitteilungen-meldungen/1312/)
- [G-BA Innovationsfonds — FAQ zur Förderung](https://innovationsfonds.g-ba.de/service/faq/foerderung/)
- [EXIST — Handbuch Forschungstransfer 2026 (PDF)](https://exist.de/wp-content/uploads/2024/10/260609_Handbuch_EFT_2026_barrierefrei.pdf)
- [EXIST-Gründungsstipendium — Überblick](https://gruenderplattform.de/finanzierung-und-foerderung/exist-gruendungsstipendium)
- [Horizon Europe — Arbeitsprogramm 2026–2027, Health (PDF)](https://research-and-innovation.ec.europa.eu/document/download/36c7287d-d38f-4a96-94ca-0dfce1375a48_en)
- [Horizon Europe NCP Portal — Übersicht Health Calls 2026/2027](https://horizoneuropencpportal.eu/store/overview-health-calls-2026-and-2027-horizon-europe)
- [FFG — Horizon Europe Cluster 1 Health](https://www.ffg.at/en/europa/heu/cluster1)
- [BMFTR — Bekanntmachung Medizintechnik (06.02.2026)](https://www.bmftr.bund.de/SharedDocs/Bekanntmachungen/DE/2026/02/2026-02-06-bekanntmachung-medizintechnik.html)
- [BMG — Förderrichtlinie Digitalkompetenz in der Versorgung (20.05.2026, PDF)](https://www.bundesgesundheitsministerium.de/fileadmin/Dateien/3_Downloads/B/Bekanntmachungen/2026-05-20_FoeRiLi_Digitalkompetenz_in_der_Versorgung.pdf)
- [BMG — Digitalisierungsstrategie für Gesundheitswesen und Pflege (PDF)](https://www.bundesgesundheitsministerium.de/fileadmin/Dateien/3_Downloads/D/Digitalisierungsstrategie/BMG_Broschuere_Digitalisierungsstrategie_bf.pdf)
