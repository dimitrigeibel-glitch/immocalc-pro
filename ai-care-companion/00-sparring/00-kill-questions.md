# Block 0 — Kill-Questions

> Die Fragen, die beantwortet sein müssen, bevor ein einziges Kapitel Sinn ergibt.
> Jede dieser Thesen widerspricht dem Briefing. Jede ist belegt oder als Annahme gekennzeichnet.

---

## K1 — Die Problemstellung des Briefings hält der Datenlage nicht stand

**Das Briefing sagt:** „Millionen ältere Menschen leben alleine. Sie fühlen sich einsam."

**Die Daten sagen:** Der erste Satz stimmt, der zweite folgt nicht aus ihm.

| Kennzahl | Wert | Quelle |
|---|---|---|
| Menschen 65+, die allein leben | 34,0 % | Destatis |
| Menschen 85+, die allein leben | 56,0 % | Destatis |
| Über-80-Jährige, die sich einsam fühlen | **12,1 %** | D80+-Studie (BMFSFJ) |
| davon 80–84 Jahre | 8,7 % | D80+ |
| davon 90+ Jahre | 22,1 % | D80+ |
| Einsame Ältere **in Privathaushalten** | **9,5 %** | D80+ |
| Einsame Ältere **im Heim** | **35,2 %** | D80+ |

Drei Konsequenzen, die das Produkt verändern:

**1. Alleinleben ist nicht Einsamkeit.** Rund 90 % der allein lebenden Älteren in Privathaushalten fühlen sich *nicht* einsam. Ein Produkt, das „gegen Einsamkeit" verkauft wird, spricht neun von zehn Menschen der Zielgruppe auf ein Problem an, das sie nicht haben — und beleidigt sie dabei. Das ist ein Positionierungsfehler mit direkter Wirkung auf die Conversion.

**2. Die Einsamsten sind da, wo das Produkt nicht hin soll.** Einsamkeit ist im Heim fast viermal so hoch wie zu Hause. Das Briefing zielt auf den häuslichen Bereich — den mit der *niedrigsten* Einsamkeitsprävalenz. Wenn Einsamkeit wirklich das Kernproblem wäre, wäre das Heim der Erstmarkt. (Und tatsächlich fährt ElliQ seinen Erfolg über staatliche Aging-Programme ein, nicht über Direktvertrieb an Wohnungen.)

**3. Das eigentliche, breite Problem ist ein anderes.** Nicht die Einsamkeit des Seniors, sondern **die Sorge der Angehörigen**. Die ist nahezu universell, sie ist täglich, sie ist beim zahlungsfähigen Menschen lokalisiert — und sie ist im Briefing nur ein Nebensatz („Angehörige wissen oft nicht, wie es ihnen wirklich geht").

**Was ich vorschlage:** Das Produkt löst *primär* die Informations- und Sorgenlücke der Angehörigen und *sekundär* Struktur, Erinnerung und Ansprache beim Senior. Einsamkeit ist ein Segment, kein Markt. Die Kernbotschaft ist nicht „Du bist einsam", sondern „Es geht ihr gut — und du weißt es, ohne dreimal am Tag anzurufen."

---

## K2 — Die Unit Economics töten das Produkt aus dem Briefing, bevor es startet

Das ist der wichtigste einzelne Befund dieses Dokuments.

Das Briefing beschreibt eine KI, die permanent verfügbar ist, Gespräche beginnt, Smalltalk führt, vorliest, Spiele spielt, Gehirntraining macht und Biografiearbeit leistet. Rechnen wir das durch.

**Kostenmodell (Stand August 2026, kaskadierter Eigenbau):**

| Komponente | Kosten/Gesprächsminute |
|---|---|
| STT (Deepgram Nova-3 Streaming, multilingual) | ~$0,006 |
| TTS (Mittelklasse, z. B. gpt-4o-mini-tts) | ~$0,015 |
| LLM (Dialog + Kontext) | ~$0,010 |
| Telefonie (dt. Festnetz, ausgehend) | ~€0,010 |
| **Summe (kaskadiert, optimiert)** | **≈ €0,04** |
| Zum Vergleich: fertige Realtime-Voice-Plattform, all-in | **€0,10 – €0,14** |

**Was das pro Nutzer und Monat bedeutet:**

| Gesprächszeit/Tag | Minuten/Monat | COGS bei €0,04 | COGS bei €0,14 |
|---|---|---|---|
| 10 min | 300 | 12 € | 42 € |
| 20 min | 600 | 24 € | 84 € |
| 45 min | 1.350 | **54 €** | 189 € |
| 90 min | 2.700 | **108 €** | 378 € |

**Und jetzt die Preisseite:**

| Erlösquelle | Obergrenze |
|---|---|
| Hausnotruf-Pauschale § 40 SGB XI (seit 01.04.2026) | **27,00 €/Monat** |
| DiPA-Deckel § 40a SGB XI (inkl. ergänzender Unterstützungsleistungen) | **50,00 €/Monat** |
| Plausibles Familien-Abo (Annahme, siehe Annahmenregister) | 30–40 €/Monat |

**Die Rechnung, die alles bestimmt:** Bei 39 € Abopreis und einem Ziel von 60 % Bruttomarge liegt die COGS-Obergrenze bei **15,60 €/Monat**. Bei €0,04/Minute sind das 390 Minuten im Monat:

> **Das Produkt hat ein Budget von rund 13 Gesprächsminuten pro Tag und Nutzer.**

Nicht 90. Nicht „immer erreichbar, redet den ganzen Tag". Dreizehn.

Das ist keine Sparmaßnahme, das ist die zentrale Produktbeschränkung — und sie muss ins Design, nicht in ein Kostenkapitel am Ende. Alles, was das Briefing an Dauerbespaßung vorsieht (Vorlesen, Musik, Spiele, offener Smalltalk), muss entweder auf lokale/nicht-generative Wege ausgelagert werden oder es fällt raus.

**Die gute Nachricht:** Diese ökonomische Grenze zeigt in dieselbe Richtung wie die ethische (siehe K7 und K9). Ein Produkt, das Gesprächszeit *nicht* maximiert, ist gleichzeitig das billigere, das ethisch sauberere und das gegenüber Kassen besser verkaufbare. Ökonomie und Ethik ziehen hier ausnahmsweise am selben Strang. Das ist die strategische Achse des gesamten Unternehmens.

**Architektonische Folge (greift in Kap. 11 und 27 vor):** dreistufige Kaskade — (a) On-Device/regelbasiert für Erinnerungen, Uhrzeit, Wetter, Bestätigungen (Kosten ≈ 0), (b) kleines Modell für Alltagsdialog, (c) großes Modell nur für Bedeutsames: Biografie, Sorge, Auffälligkeiten, Eskalation. Der Anteil, der Stufe (c) erreicht, ist die wichtigste Kennzahl der P&L.

---

## K3 — Eigene Hardware ist der wahrscheinlichste Grund, warum dieses Startup stirbt

Das Briefing definiert den „Home Hub" als Produktkomponente: Mikrofon, Lautsprecher, großer Knopf, optional Display.

Was daran hängt: Industriedesign, Elektronikentwicklung, Firmware, CE- und Funkzertifizierung, EMV, Sicherheitsprüfung, Werkzeugkosten, Mindestabnahmemengen, Zoll, Lagerhaltung, Logistik, Retouren, Reparaturprozess, Ersatzteile, Gewährleistung, Firmware-Update-Infrastruktur über die Gerätelebensdauer. Realistischer Zeitraum bis zum ersten verkaufsfähigen Gerät: 18–24 Monate. Und all das **bevor** die erste belastbare Erkenntnis darüber vorliegt, ob jemand das Produkt überhaupt benutzt.

**Der Gegenvorschlag: Das Telefon ist der Hub.**

Die Zielgruppe hat bereits ein Gerät, das sie seit sechzig Jahren bedient, das nie geladen werden muss, das bei Stromausfall funktioniert, das kein WLAN-Passwort braucht und dessen Bedienung niemand erklären muss. Die KI ruft an. Der Senior hebt ab.

| | Eigene Hardware | Telefon-first |
|---|---|---|
| Time-to-Market | 18–24 Monate | 6–10 Wochen |
| CapEx bis erster Nutzer | hoch (Annahme: 250k–600k €) | ~0 |
| Onboarding-Hürde | Gerät aufstellen, WLAN, Erklärung | Rufnummer freigeben |
| Marktabdeckung Zielgruppe | begrenzt durch Vertrieb | ~100 % |
| Ausfallrisiko beim Nutzer | Gerät defekt = Produkt weg | Telefonnetz |
| Nachteil | — | kein Display, keine Umgebungssensorik, nur Pull-Momente |

Der Nachteil ist real: Ohne Gerät in der Wohnung gibt es keine passive Beobachtung — nur das, was im Gespräch sichtbar wird. Aber genau diese passive Beobachtung ist der regulatorisch heikelste Teil (K5, K6, K8). Sie später zu ergänzen, wenn Nutzung, Erstattung und Compliance stehen, ist die deutlich klügere Reihenfolge.

**Empfohlene Hardware-Roadmap:**
1. **Phase 1 (Monat 0–12):** Telefon. Keine Hardware.
2. **Phase 2 (Monat 9–24):** Vorkonfiguriertes White-Label-Tablet im Ladedock mit LTE-SIM, gesperrter Launcher, ODM-Ware. Kein eigenes Hardware-Design, keine eigene Zertifizierung des Geräts.
3. **Phase 3 (ab Serie A, nur bei belegtem Bedarf):** Eigenes Gerät. Und wenn, dann eher radar- als kamerabasiert (Sturz-/Präsenzerkennung ohne Bild — der Weg, den Vayyar gegangen ist).

---

## K4 — Der Nutzer ist nicht der Käufer, und das Consumer-Abo wurde bereits im Markt getestet und beerdigt

**Amazon hat Alexa Together im Mai 2025 eingestellt.** Ein Angebot mit exakt dem Funktionsumfang aus dem Briefing — Aktivitätsfeed für Angehörige, Notruf per Sprache, Fernverwaltung — von einem Anbieter mit unbegrenztem Kapital, bestehender Hardware-Basis in Millionen Haushalten und Nullkosten für die Kundenakquise. Es hat nicht getragen.

**ElliQ (Intuition Robotics)** ist das erfolgreichste Produkt der Kategorie: 25 Mio. $ frisches Kapital, angeführt von Woven Capital (Toyota). Aber der Vertriebsweg ist die eigentliche Lehre — verkauft wird an **staatliche Aging-Agenturen und Gesundheitsorganisationen**, nicht an Familien. Im Programm des Staates New York: 834 aufgenommene Senioren bei über 3.500 Bewerbern (Stand Mai 2025). Ausgezeichnete Wirkungsdaten (94 % fühlen sich weniger einsam), aber über Jahre hinweg Zahlen im niedrigen vierstelligen Bereich — weil der Engpass nicht das Produkt ist, sondern der institutionelle Vertriebskanal.

**Was daraus folgt für DACH:** Der einzige Erlösweg mit struktureller Skalierung ist die Erstattung.

- **§ 40 SGB XI, Hausnotruf:** 27,00 €/Monat seit 01.04.2026, dazu 10,49 € Installationspauschale. Voraussetzung: mindestens Pflegegrad 1, Alleinleben, jederzeit möglicher Notfall. Direktabrechnung zwischen Anbieter und Pflegekasse — der Nutzer zahlt nichts vor. Das ist ein **etablierter, funktionierender Erstattungskanal mit bestehender Abrechnungsinfrastruktur**.
- **§ 40a SGB XI, DiPA:** bis 50 €/Monat. Und hier liegt die eigentliche Chance: Seit Inkrafttreten des DVPMG am 09.06.2021 ist das DiPA-Verzeichnis des BfArM **praktisch leer** — Stand Januar 2025 war keine einzige DiPA aufgenommen. Fünf Jahre offener Rechtsanspruch ohne Angebot.

Ein leeres Verzeichnis ist zweideutig: Es ist entweder eine offene Flanke oder ein Friedhof. Dass in fünf Jahren niemand durchgekommen ist, ist ein Warnsignal, das ernsthaft geprüft gehört (Nachweisanforderungen zum pflegerischen Nutzen, Verhandlungsposition gegenüber dem GKV-Spitzenverband, Vergütungsrisiko). Aber wer als Erster gelistet ist, hat einen Burggraben, den kein Foundation Model repliziert.

**Empfehlung:** Dreistufiger Erlösaufbau — (1) Familien-Selbstzahler-Abo als schneller Start und Lernvehikel, (2) Hausnotruf-Anerkennung nach § 40 als erste Erstattung mit realistischem Zeithorizont, (3) DiPA-Listung als strategisches Ziel mit eigenem Arbeitsstrang ab Tag 1. Der Finanzplan (Kap. 27) muss alle drei getrennt modellieren, weil sie völlig unterschiedliche CAC- und Retentionsprofile haben.

---

## K5 — „Emotionen erkennen" bei alten Menschen berührt Artikel 5 des EU AI Act

Das Briefing listet „Emotionen" als Bestandteil des AI Brain und beschreibt eine KI, die aus eigener Initiative motiviert, tröstet und Verhaltensänderungen adressiert.

**Art. 5 Abs. 1 lit. b KI-VO** verbietet KI-Systeme, die eine Vulnerabilität natürlicher Personen **aufgrund ihres Alters** oder einer Behinderung ausnutzen, mit dem Ziel oder der Wirkung, das Verhalten wesentlich zu verändern und dabei erheblichen Schaden zuzufügen oder zufügen zu können. Diese Verbote gelten **bereits seit dem 2. Februar 2025**; die vollständige Anwendung der Verordnung folgte am 2. August 2026.

Der Tatbestand ist nicht automatisch erfüllt — es braucht Ausnutzung, wesentliche Verhaltensänderung und erheblichen Schaden. Aber ein System, das (a) gezielt auf hochaltrige, teils kognitiv eingeschränkte Menschen ausgelegt ist, (b) deren emotionalen Zustand einschätzt und (c) diese Einschätzung nutzt, um proaktiv Verhalten zu beeinflussen, steht **exakt an dieser Grenze**. Und die Beweislast, auf welcher Seite man steht, liegt beim Anbieter.

Dazu kommt die **Transparenzpflicht nach Art. 50**: Der Mensch muss wissen, dass er mit einer KI interagiert. Bei beginnender Demenz ist ein einmaliger Hinweis im Onboarding wertlos — die Person erinnert sich morgen nicht daran. Der Hinweis muss wiederkehrend und situativ erfolgen, ohne die Beziehung jedes Mal zu zerstören. Das ist eine der schwersten Aufgaben im Gesprächsdesign (Kap. 18) und keine Fußnote im Compliance-Anhang.

**Designkonsequenzen, die ab Kapitel 1 gelten:**
- Keine Persuasionstechniken, die auf kognitiver Einschränkung aufbauen — kein künstlicher Zeitdruck, keine Verlustaversion, keine Reziprozitätsschleifen, keine Streaks, kein „Ich bin traurig, wenn du nicht mit mir sprichst".
- Emotionseinschätzung ausschließlich zur **Anpassung des eigenen Tons und zur Auslösung menschlicher Kontakte** — niemals zur Erhöhung der Nutzungsdauer.
- Wiederkehrende, würdevoll formulierte KI-Kennzeichnung, kalibriert auf den kognitiven Zustand.
- Kein Upselling, keine kommerziellen Angebote und keine Datenerhebung zu Werbezwecken im Gespräch mit dem Senior. Überhaupt keine.
- Nachweisführung: dokumentierte Vulnerable-User-Schutzmaßnahmen, protokollierte Ablehnungsfälle, Red-Teaming gegen manipulative Formulierungen.

---

## K6 — „Wir diagnostizieren nicht" ist ein Satz, kein Rechtsschutz

Das Briefing stellt korrekt klar: keine medizinische Diagnose. Für die Einstufung als Medizinprodukt zählt jedoch die **Zweckbestimmung**, nicht der Haftungsausschluss.

Nach **MDR Anhang VIII Regel 11** und **MDCG 2019-11** ist Software, die Informationen zur Entscheidungsfindung für diagnostische oder therapeutische Zwecke liefert, mindestens Klasse IIa — ebenso Software, die den Zustand eines Patienten **kontinuierlich überwacht**. Genau das beschreibt das Briefing im Abschnitt „Was die KI erkennen soll": zunehmende Verwirrtheit, auffällige Vergesslichkeit, sozialer Rückzug — weitergegeben an Pflegekräfte, die daraus Handlungen ableiten.

Sobald eine Pflegekraft oder ein Arzt auf Basis dieser Hinweise handelt, ist die Zweckbestimmung faktisch medizinisch, egal was in den AGB steht.

**Die Entscheidung, die getroffen werden muss:**

| | Weg A: Kein Medizinprodukt | Weg B: MDR Klasse IIa |
|---|---|---|
| Time-to-Market | Wochen | 18–36 Monate |
| Kosten | gering | hoch (Annahme: 400k–1,2 Mio. €, QMS nach ISO 13485, IEC 62304, klinische Bewertung, Benannte Stelle) |
| Erstattungsfähigkeit | Hausnotruf ja, DiPA fraglich | breit |
| Verteidigbarkeit | niedrig | hoch |
| Zulässige Aussagen | Wohlbefinden, Struktur, Kontakt | Früherkennung, Verlaufsbeobachtung |

**Empfehlung: Weg A starten, Weg B vorbereiten.** Konkret heißt das ab Tag 1:
- Zweckbestimmung schriftlich und diszipliniert eng fassen — und im gesamten Marketing durchhalten. Ein einziger Claim wie „erkennt beginnende Demenz frühzeitig" auf der Website macht das Produkt zum Medizinprodukt.
- Hinweise an Pflegekräfte als **beobachtete Ereignisse** formulieren („hat an drei von sieben Tagen die Medikamentenbestätigung nicht gegeben"), nie als Bewertung („zeigt Anzeichen kognitiven Abbaus").
- Datenmodell, Protokollierung und Einwilligungen so bauen, dass die erhobenen Daten später als **klinische Evidenz** taugen. Das ist ein Architekturentscheid mit Fünfjahreswirkung, der nachträglich nicht nachholbar ist.

---

## K7 — Die Person, die einwilligen soll, ist genau die, die es irgendwann nicht mehr kann

Das Briefing sagt: „Der Senior entscheidet beim Onboarding" und „behält jederzeit die Kontrolle". Das ist die richtige Haltung und es bricht in der Realität an drei Stellen:

1. **Progrediente Einwilligungsunfähigkeit.** Genau bei der Nutzergruppe mit dem größten Produktnutzen schwindet die Fähigkeit zur informierten Einwilligung — schleichend, ohne klaren Stichtag, oft ohne Betreuungsverfahren.
2. **Strukturelle Interessenkollision.** Angehörige wollen systematisch mehr Daten sehen, als der Senior teilen würde. Sie sind zugleich meist diejenigen, die zahlen und die das Onboarding faktisch durchführen. Wer beim Einrichten neben dem Senior sitzt, bestimmt die Freigaben — nicht der, der sie formal erteilt.
3. **Art. 9 DSGVO.** Es geht um Gesundheitsdaten. Die Verarbeitung braucht eine ausdrückliche, informierte, granulare und widerrufliche Einwilligung — vom Betroffenen selbst.

**Was ich vorschlage — und was ein echtes Alleinstellungsmerkmal sein kann:**

**Die Datenfreigabe-Vorausverfügung.** Der Senior legt zu Beginn, solange er voll entscheidungsfähig ist, nicht nur fest, *was heute* geteilt wird, sondern auch, *was gelten soll, wenn er selbst nicht mehr entscheiden kann*. Sein früheres Selbst bindet seine Angehörigen. Formuliert in seiner Sprache, jederzeit änderbar, versioniert und nachweisbar.

Ergänzend:
- **Getrennte Onboarding-Sitzung** für den Senior, ohne anwesende Angehörige, für die Freigabeentscheidungen. Unbequem, aber es ist der Unterschied zwischen Selbstbestimmung und deren Simulation.
- **Regelmäßige Re-Bestätigung** in gesprochener, verständlicher Form statt jährlicher AGB-Mails.
- **Betreuungs-/Vollmacht-Workflow** mit dokumentiertem Nachweis, wenn die Vorausverfügung greift.
- **Sichtbarkeitsprotokoll für den Senior:** Er kann jederzeit fragen „Was weiß meine Tochter über mich?" und bekommt eine ehrliche, vollständige Antwort. Diese Funktion ist unbequem, kostet Umsatz — und ist der Beweis, dass das Versprechen echt ist.

---

## K8 — Ein Always-on-Mikrofon, bei dem Familie und Pflegedienst mitlesen, ist Überwachungsinfrastruktur — außer man baut ausdrücklich dagegen

Zwei Punkte, die das Briefing nicht adressiert:

**Dritte willigen nie ein.** Besucher, Enkel, Nachbarn, die Pflegekraft — alle werden vom Mikrofon erfasst, ohne gefragt worden zu sein. Bei der Pflegekraft kommt hinzu, dass Aufzeichnungen in ihrem Arbeitsumfeld arbeitsrechtlich und mitbestimmungsrechtlich relevant sind und über das Emotionserkennungsverbot am Arbeitsplatz (Art. 5) zusätzlich belastet sein können.

**Die Zweckentfremdung ist immer nur eine Produktentscheidung entfernt.** Ein System, das aufzeichnet, auswertet und an Dritte berichtet, ist technisch identisch mit einem Überwachungssystem. Der einzige Unterschied ist Selbstbeschränkung — und die muss architektonisch erzwungen sein, nicht policy-basiert.

**Nicht verhandelbare Architekturvorgaben (greifen Kap. 14/15 vor):**
- Wakeword-Erkennung **on-device**, kein Streaming vor Aktivierung.
- **Keine Persistenz von Rohaudio.** Audio wird zu Text, Text wird zu Ereignissen, Rohaudio wird verworfen. Nicht „nach 30 Tagen gelöscht" — gar nicht erst geschrieben.
- Angehörige und Pflegedienst sehen **Ereignisse und Zusammenfassungen, niemals Transkripte oder Wortlaute**. Diese Grenze ist die wichtigste Einzelentscheidung des gesamten Datenmodells. Sie muss auch dann gehalten werden, wenn zahlende Kunden lautstark das Gegenteil verlangen — und sie werden es verlangen.
- **Physischer Mute-Schalter** am Gerät (Phase 2+), der die Stromzufuhr zum Mikrofon trennt, nicht nur ein Software-Flag setzt.
- **Sprecherbezogene Verarbeitung:** Wird eine unbekannte Stimme erkannt, wird sie nicht dem Profil zugeordnet und nicht ausgewertet.

---

## K9 — Das „Freund"-Framing ist ein Reputationsrisiko mit Präzedenzfällen

Das Briefing will, dass sich die KI „wie eine vertraute Person anfühlt", ein „Freund" ist und „mit dem Nutzer gemeinsam altert".

Der Markt hat inzwischen gesehen, wohin künstliche Bindung bei verletzlichen Nutzern führen kann — die öffentliche und juristische Auseinandersetzung um Companion-KI und schutzbedürftige Nutzergruppen ist geführt worden, und sie wurde nicht von der Industrie gewonnen. Bei hochaltrigen, teils kognitiv eingeschränkten Menschen ist die Fallhöhe größer, nicht kleiner: Wenn die Presse einmal schreibt „KI-Firma ersetzt einsamen alten Menschen den Besuch der Kinder", ist der Vertrieb an Kassen und Pflegedienste in DACH auf Jahre erledigt.

**Die tragfähige Positionierung ist die entgegengesetzte:**

> Die KI ist nicht der Ersatz für menschlichen Kontakt. Sie ist der Anlass dafür.

Sie merkt sich, dass der Enkel Geburtstag hat — und **stellt die Verbindung her**, statt selbst zu gratulieren. Sie merkt, dass seit fünf Tagen niemand angerufen hat — und **stupst die Tochter an**, statt die Lücke selbst zu füllen.

Das verändert die Nordstern-Metrik fundamental:

| | Falsche Metrik | Richtige Metrik |
|---|---|---|
| Nutzung | Minuten im Gespräch mit der KI | **Ausgelöste Kontakte mit echten Menschen/Woche** |
| Bindung | Tägliche Interaktionen | Wochen ohne Abbruch + Angehörigen-Vertrauen |
| Erfolg | Engagement | Erhaltene Selbstständigkeit, Vermeidung von Notfällen |

Diese Metrik ist gleichzeitig (a) ethisch verteidigbar, (b) die günstigere (siehe K2 — jede an einen Menschen abgegebene Minute ist eine nicht bezahlte KI-Minute), (c) die einzige, die vor einer Pflegekasse, einem Ethikbeirat und einem Journalisten Bestand hat. Wieder zeigen Ökonomie und Ethik in dieselbe Richtung.

---

## K10 — Der Burggraben ist nicht die KI

Das Briefing setzt implizit voraus, dass Persönlichkeit, Humor und Gesprächsqualität den Vorsprung bilden. Das tun sie nicht: Jeder Wettbewerber kauft dieselben Foundation Models ein, und der Abstand zwischen dem besten und dem drittbesten Modell schrumpft mit jedem Release. Ein Prompt ist kein Vermögenswert.

**Verteidigbar sind nur drei Dinge:**

1. **Die longitudinale Baseline pro Person.** Eine Veränderung erkennt man nur, wenn man den Normalzustand kennt. Nach sechs Monaten weiß das System, wie Erika an einem guten Tag spricht — und ein Neueinsteiger weiß das für diese Person nie. Dieser Vorsprung ist personengebunden, wächst monoton mit der Zeit und ist nicht abkürzbar. **Das ist der einzige echte technische Moat und er muss das Datenmodell (Kap. 12) bestimmen.**
2. **Der institutionelle Vertriebszugang.** Verträge mit Pflegediensten, Wohlfahrtsverbänden, Kommunen, Kassen. Langsam aufzubauen, ebenso langsam anzugreifen. Das ist der Grund, warum ElliQ über Aging-Agenturen geht.
3. **Die Erstattungszulassung.** Hausnotruf-Anerkennung, später DiPA-Listung. Regulatorische Zulassung ist der klassischste Burggraben überhaupt.

Nichts davon ist ein KI-Vorsprung. Der Produktplan muss entsprechend priorisieren — was bedeutet, dass Vertrieb und Regulatorik ab Monat 1 Gründerthemen sind, nicht Themen für „später, wenn das Produkt fertig ist".

---

## K11 — Kapitel, die im Briefing fehlen und das Produkt entscheiden

Die 30 vorgegebenen Kapitel lassen sechs Bereiche aus, von denen jeder einzelne das Unternehmen beenden kann. Vorschlag zur Aufnahme als Kap. 31–36:

| # | Kapitel | Warum es existenziell ist |
|---|---|---|
| 31 | **Notfall-Eskalation & Haftung** | Was passiert um 3:14 Uhr, wenn das System einen Sturz vermutet und niemand erreichbar ist? Wer haftet, wenn eskaliert wurde und es nichts war — und wer, wenn nicht eskaliert wurde und es etwas war? Ohne dieses Konzept ist das Produkt weder versicherbar noch verkaufbar. |
| 32 | **Klinische Evidenz & Studiendesign** | Voraussetzung für DiPA, für Kassenvertrieb, für glaubwürdige Wirkungsaussagen und für den späteren MDR-Weg. Muss das Datenmodell ab Tag 1 mitbestimmen. |
| 33 | **Content-Sicherheit & Schutz vor Ausnutzung** | Suizidäußerungen, Hinweise auf Vernachlässigung oder Missbrauch (auch durch Angehörige, die Zugriff auf das System haben), Enkeltrick- und Betrugserkennung. Letzteres ist ein potenziell verkaufsentscheidendes Feature. |
| 34 | **Barrierefreiheit & sprachliche Realität** | Schwerhörigkeit ist bei 75+ der Normalfall, nicht der Sonderfall. Dazu Dialekt, verlangsamtes Sprechen, Sprechpausen, Zahnprothesen, Aphasie nach Schlaganfall. Die STT-Erkennungsrate bei dieser Kohorte ist der wichtigste ungeprüfte technische Risikofaktor des Produkts. |
| 35 | **Ethikbeirat & Governance** | Externe Besetzung mit Geriatrie, Pflegewissenschaft, Ethik und Betroffenenvertretung. Kein Feigenblatt, sondern Vertriebsvoraussetzung gegenüber Wohlfahrtsverbänden und Kassen. |
| 36 | **Sterbefall, Datenerbe & Offboarding** | Ein erheblicher Teil der Kohorte verstirbt während der Vertragslaufzeit. Was passiert mit Biografiedaten, Sprachaufzeichnungen, Erinnerungen? Wer darf sie erhalten? Das ist gleichzeitig eine schwere Pflicht und potenziell das berührendste Produkt, das dieses Unternehmen je bauen wird. |

---

## Zusammenfassung: Was sich gegenüber dem Briefing ändert

| Thema | Briefing | Vorschlag nach Sparring |
|---|---|---|
| Kernproblem | Einsamkeit des Seniors | Sorgenlücke der Angehörigen + Struktur/Sicherheit beim Senior |
| Zugangspunkt | Eigene Hardware („Home Hub") | Telefon zuerst, Tablet später, eigene Hardware ggf. nie |
| Gesprächsumfang | Immer verfügbar, viel Dialog | Budgetiert, ~13 Min./Tag, kaskadierte Architektur |
| Rolle der KI | Freund und Begleiter | Brücke zu echten Menschen |
| Nordstern-Metrik | Engagement | Ausgelöste menschliche Kontakte |
| Erlösmodell | implizit Consumer-Abo | Abo → § 40 Hausnotruf → § 40a DiPA |
| Emotionserkennung | Produktbestandteil | Nur zur Tonanpassung und Kontaktauslösung, nie zur Bindung |
| Einwilligung | Senior entscheidet beim Onboarding | Vorausverfügung + getrennte Sitzung + Sichtbarkeitsprotokoll |
| Datenweitergabe | „freigegebene Informationen" | Ereignisse statt Transkripte, architektonisch erzwungen |
| Burggraben | beste KI | Baseline + Vertriebszugang + Erstattung |
| Kapitelumfang | 30 | 36 |

Die acht Entscheidungen, die daraus folgen und vor Block 1 zu treffen sind, stehen in [`02-entscheidungsvorlagen.md`](02-entscheidungsvorlagen.md). Die drei möglichen Gesamtpositionierungen in [`01-positionierung-optionen.md`](01-positionierung-optionen.md).

---

## Quellen

- [Destatis — 17 Millionen Menschen in Deutschland leben allein (2025)](https://www.destatis.de/DE/Presse/Pressemitteilungen/2025/07/PD25_N036_12.html)
- [Destatis — Fast 6 Millionen ältere Menschen leben allein](https://www.destatis.de/DE/Presse/Pressemitteilungen/2021/09/PD21_N057_12411.html)
- [Destatis — Demografischer Wandel und Pflege](https://www.destatis.de/DE/Themen/Querschnitt/Demografischer-Wandel/Hintergruende-Auswirkungen/demografie-pflege.html)
- [BMFSFJ — Einsamkeit im hohen Alter (D80+-Studie)](https://www.bmbfsfj.bund.de/bmbfsfj/aktuelles/alle-meldungen/gesundheit-miteinander-und-bildung-schuetzen-vor-einsamkeit-im-hohen-alter-192790)
- [BMFSFJ — Einsamkeitsbarometer 2024 (PDF)](https://www.bmbfsfj.bund.de/resource/blob/240528/5a00706c4e1d60528b4fed062e9debcc/einsamkeitsbarometer-2024-data.pdf)
- [BfArM — Wissenswertes zu DiPA](https://www.bfarm.de/DE/Medizinprodukte/Aufgaben/DiGA-und-DiPA/DiPA/Wissenswertes/_artikel.html)
- [BfArM — DiPA-Leitfaden (PDF)](https://www.bfarm.de/SharedDocs/Downloads/DE/Medizinprodukte/dipa_leitfaden.pdf?__blob=publicationFile)
- [Digitale Pflegeanwendungen § 40a SGB XI](https://sozialversicherung-kompetent.de/pflegeversicherung/leistungsrecht-ab-2017/1115-digitale-pflegeanwendungen.html)
- [Hausnotruf-Zuschuss 2026 — 27,00 € nach § 40 SGB XI](https://pflegekompassmagazin.de/magazin/ratgeber/hausnotruf-zuschuss-pflegekasse-2026)
- [Pflegewegweiser NRW — Hausnotruf-Kosten 2026](https://www.pflegewegweiser-nrw.de/hausnotruf-was-hat-sich-bei-den-kosten-2026-geaendert)
- [Bundesnetzagentur — Verbotene Praktiken nach dem AI Act](https://www.bundesnetzagentur.de/DE/Fachthemen/Digitales/KI/8_VerbotenePraktiken/start.html)
- [activeMind.legal — Artikel 5 KI-Verordnung im Volltext](https://www.activemind.legal/de/gesetze/ai-act/artikel-5/)
- [MDCG 2019-11 — Qualifikation und Klassifizierung von Software (PDF)](https://health.ec.europa.eu/system/files/2020-09/md_mdcg_2019_11_guidance_en_0.pdf)
- [Johner Institut — MDR Regel 11](https://blog.johner-institute.com/regulatory-affairs/mdr-rule-11/)
- [Intuition Robotics — 25 Mio. $ Finanzierungsrunde](https://www.intuitionrobotics.com/post/intuition-robotics-raises-25m)
- [NYSOFA — ElliQ-Projektbericht 2026 (PDF)](https://aging.ny.gov/system/files/documents/2026/02/nysofa-elliq-project-update-2026.pdf)
- [NYSOFA — 95 % Reduktion von Einsamkeitsgefühlen](https://aging.ny.gov/news/nysofas-rollout-ai-companion-robot-elliq-shows-95-reduction-loneliness)
- [Alexa Together eingestellt — Übersicht und Alternativen](https://www.besidecare.com/blog/what-to-use-now-that-alexa-together-is-gone/)
- [AssemblyAI — Speech-to-Text-Preisvergleich](https://www.assemblyai.com/blog/speech-to-text-api-pricing)
- [Inworld AI — Voice Agent Cost per Minute 2026](https://inworld.ai/resources/voice-agent-cost-per-minute-2026)
- [camb.ai — TTS-Preisvergleich 2026](https://www.camb.ai/blog-post/text-to-speech-price-comparison)
