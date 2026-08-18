# Kapitel 23 — Wettbewerbsanalyse

> **Status:** Erstfassung aus einer Schnellrecherche (August 2026). Wird in Block 5 vertieft — Preise, Nutzerzahlen und Finanzierungsstände sind noch nicht vollständig primärbelegt.

---

## Kernaussage

**Die Produktidee ist nicht neu.** Der telefonbasierte KI-Begleiter mit Angehörigen-Benachrichtigung ist eine Kategorie mit mindestens **neun aktiven Anbietern**, davon **fünf im deutschsprachigen Raum**. Die Kategorie hat sich 2025/2026 gebildet und wächst gerade schnell.

Das entwertet das Vorhaben nicht — aber es verschiebt die Frage. Sie lautet nicht mehr „Funktioniert die Idee?", sondern **„Warum sollten wir gewinnen, wenn fünf andere dasselbe tun?"**

---

## Der unbequeme Teil: Mein eigener Vorschlag ist bereits Marktstandard

In Block 0 habe ich in K3/E2 empfohlen, auf eigene Hardware zu verzichten und stattdessen das Telefon als Zugangspunkt zu nutzen — mit dem Argument, das sei der schnellere und klügere Weg.

Die Recherche zeigt: **Das machen bereits alle.** Jeder einzelne der gefundenen Anbieter ist telefonbasiert, ohne App, ohne Gerät, ohne Internet beim Senior. Die Argumentation war richtig — genau deshalb sind alle anderen auch dort.

**Telefon-first ist damit kein Wettbewerbsvorteil mehr, sondern Eintrittsvoraussetzung.** Die Empfehlung bleibt gültig (der Weg über eigene Hardware wäre nach wie vor falsch), aber sie darf nicht länger als Differenzierung geführt werden. ADR-002 bleibt bestehen, seine strategische Begründung ändert sich.

---

## Wettbewerber DACH

| Anbieter | Sitz / Träger | Preis | Was bekannt ist |
|---|---|---|---|
| **Helfi-Ruf** | Dresden, gegr. von Julian Schwochert (mit 18 Jahren) | **ab 14,99 €/Monat**, 14 Tage kostenlos | Täglicher Sicherheitsanruf zur Wunschzeit, Befindensabfrage, Medikamentenerinnerung, Wiederwahl nach 10/30/60 Min bei Nichterreichen, automatische Benachrichtigung der Angehörigen. „Made in Germany", DSGVO-konform. |
| **Gisela.ai** | gegr. von Marcus Meyer (30 Jahre Plattformerfahrung, 15 Jahre adviqo) | nicht öffentlich ermittelt | Tägliche oder bedarfsweise Anrufe. Erkennt nach eigener Aussage „ein Zögern in der Stimme oder ein freudiges Lachen". Family App zeigt, ob der Mensch „besonders lebhaft, ungewöhnlich still oder innerlich angespannt" wirkt. |
| **halloHelga** | CareVoice GmbH, Leipzig | nicht öffentlich ermittelt | Anrufe zu festen Zeiten, ohne Smartphone/App/Internet. Zielgruppe ausdrücklich **auch ambulante Pflegedienste**. Server in Deutschland, monatlich kündbar. |
| **Call HelloAgain** | Deutschland | nicht ermittelt | KI-Telefonbegleitung mit ausdrücklichem Fokus auf **Menschen mit Demenz**. |
| **kallyai** | nicht ermittelt | nicht ermittelt | KI-Telefonassistent für Senioren, deutschsprachige Vermarktung. |
| **inTouch** | Prag, gegr. Vassili Le Moigne | **29,90 €/Monat** | Nach eigener Aussage in ~100 Ländern und 40 Sprachen. Biografiearbeit über eine Bibliothek von 1.400+ Fragen zu Familie und Lebensgeschichte. Start Europa 2025, Nordamerika Juli 2025. |

## Wettbewerber USA

| Anbieter | Was bekannt ist |
|---|---|
| **Callie Care** | 500k $ Pre-Seed. „Phone-first AI", tägliche Anrufe, wöchentliche Wellness-Reports mit Stimmungsverlauf, Sofortwarnungen. |
| **Joy Calls** (ONSCREEN) | Landesweiter Start, funktioniert mit Mobil- und Festnetz, nach jedem Anruf kompakte Zusammenfassung an Angehörige. |
| **ElderVoice** | Tägliche Anrufe, Medikamentenerinnerung, Trendauswertung über die Zeit, SMS-Alarm bei Verwirrtheit, Distress oder Sturzhinweisen. Eigene Landingpage für Demenzbegleitung. |
| **CareCall** | Automatisierte tägliche Check-in-Anrufe mit Angehörigen-Benachrichtigung. |

## Angrenzende Kategorien

- **ElliQ / Intuition Robotics** — Gerätebasiert, 25 Mio. $ Finanzierung (Woven Capital/Toyota), Vertrieb über staatliche Aging-Agenturen. Andere Kategorie, aber derselbe Nutzer.
- **Hausnotruf-Verbände** — DRK, Malteser, Johanniter, ASB, Caritas decken **rund 95 % des deutschen Hausnotrufmarktes** ab, mit eigenen 24/7-Zentralen und direkter Abrechnung der 27 €/Monat mit der Pflegekasse. Sie sind der eigentliche Platzhirsch im Erstattungskanal — und potenziell der wichtigste Partner statt Gegner.
- **Alexa Together** — Mai 2025 eingestellt. Der Präzedenzfall gegen das reine Consumer-Abo.

---

## Was die Recherche über den Markt verrät

### 1. Die Preisspanne liegt unter unserer Annahme

Belegt sind **14,99 €** (Helfi-Ruf) bis **29,90 €** (inTouch). Unsere Planungsgröße von 34,90 € (A-18) liegt damit **oberhalb des gesamten sichtbaren Marktes**. Sie ist zu korrigieren oder mit einem erheblich stärkeren Leistungsversprechen zu begründen.

### 2. Die Preise bestätigen die Gesprächsbudget-Rechnung — sogar verschärft

Bei 14,99 € Erlös und 60 % Zielmarge bleiben rund 6 € COGS im Monat. Bei ~0,04 €/Gesprächsminute sind das **150 Minuten im Monat, also etwa 5 Minuten pro Tag**. Helfi-Ruf kann also nur sehr kurze, stark strukturierte Anrufe führen — anders geht die Rechnung nicht auf.

Das bestätigt K2 unabhängig: Niemand in diesem Markt kann sich ausgedehnte Gespräche leisten. Wer „unbegrenzten Dialog" verspricht, subventioniert ihn oder führt ihn nicht.

### 3. Der Erstattungskanal ist frei

**Kein einziger der gefundenen Anbieter wirbt mit einer Kostenübernahme durch die Pflegekasse.** Alle sind reine Selbstzahlerangebote. Weder eine Anerkennung nach § 40 SGB XI noch eine DiPA-Listung nach § 40a war bei irgendeinem Anbieter auffindbar.

Das ist der wichtigste Einzelbefund dieser Recherche. Die Kategorie ist besetzt — **der Erstattungskanal ist es nicht.**

### 4. Es fehlt an Tiefe, nicht an Breite

Alle Anbieter bieten im Kern dieselben vier Funktionen: täglicher Anruf, Befindensabfrage, Medikamentenerinnerung, Benachrichtigung der Angehörigen. Was bei keinem sichtbar wird:

- eine belastbare **longitudinale Baseline** statt Stimmungs-Schlagworten pro Anruf
- **klinische Evidenz** oder Wirkungsstudien
- ein durchdachtes **Einwilligungs- und Datensouveränitätskonzept** für nachlassende Entscheidungsfähigkeit
- **institutionelle Verankerung** bei Pflegediensten und Kassen (halloHelga nennt Pflegedienste als Zielgruppe — Umsetzungstiefe unklar)

---

## Was das für die Positionierung bedeutet

Die drei Burggräben aus K10 waren bisher eine These. Nach dieser Recherche sind sie die **einzig verbliebene Differenzierung**:

| Burggraben | Status im Wettbewerb | Bewertung |
|---|---|---|
| **Erstattungszulassung** (§ 40, § 40a) | von niemandem besetzt | **Jetzt das zentrale strategische Ziel, nicht mehr Stufe 3** |
| **Institutioneller Vertriebszugang** | allenfalls angekündigt | offen, aber Hausnotruf-Verbände sitzen bereits dort |
| **Longitudinale Baseline + Evidenz** | bei niemandem belegt | offen, braucht Zeit und Daten |

Dazu kommt ein vierter, der sich aus Block 0 ergibt und den niemand sonst adressiert: **Datensouveränität des Seniors** — Vorausverfügung, getrennte Onboarding-Sitzung, Ereignisse statt Transkripte, Sichtbarkeitsprotokoll. In einem Markt, in dem alle Anbieter Angehörigen Stimmungsberichte über einen alten Menschen liefern, ist die konsequente Haltung „nicht übereinander, sondern miteinander" tatsächlich unbesetzt.

**Die Reihenfolge aus ADR-007 verschiebt sich.** Der Selbstzahler-Markt ist kein ruhiges Lernfeld mehr, sondern ein Preiskampf mit fünf Wettbewerbern und einer Preisuntergrenze von 14,99 €. Die Erstattung war Stufe 2/3 — sie muss nach vorne.

---

## Offene Fragen für die Vertiefung in Block 5

1. Haben Helfi-Ruf, Gisela oder halloHelga eine Erstattung beantragt oder erhalten? Direkt anfragen.
2. Wie groß sind diese Anbieter tatsächlich? Nutzerzahlen, Finanzierung, Team.
3. Wie lang sind ihre Anrufe wirklich? Testkunde werden und messen — das validiert zugleich A-16.
4. Arbeitet einer der großen Hausnotruf-Verbände bereits an KI-Anrufen? Falls ja, ändert das alles.
5. Wie ist die Spracherkennungsqualität der Wettbewerber bei realen 80-Jährigen? Das ist die praktische Prüfung von A-24.
6. Gibt es in DACH bereits eine DiPA- oder Hilfsmittel-Antragstellung in dieser Kategorie? Beim BfArM erfragen.

---

## Quellen

- [Helfi-Ruf](https://www.helfi-ruf.de/) · [Über uns](https://helfi-ruf.de/ueber-uns) · [Funktionsweise](https://helfi-ruf.de/wie-funktioniert-es) · [SINN Sachsen — Porträt](https://sinn-sachsen.de/helfi-ruf)
- [Gisela.ai](https://gisela.ai/) · [Über uns — Marcus Meyer](https://gisela.ai/ueber-uns)
- [halloHelga (CareVoice GmbH, Leipzig)](https://hallo-helga.com/) · [Pressemitteilung openPR](https://www.openpr.de/news/1313760/Gegen-die-Stille-halloHelga-bringt-KI-Telefonbegleitung-fuer-Senioren-nach-Deutschland.html)
- [Call HelloAgain — KI-Telefonbegleitung für Demenzkranke](https://callhelloagain.de/)
- [kallyai — KI-Telefonassistent für Senioren](https://kallyai.com/de/blog/ki-telefon-assistent-senioren)
- [inTouch](https://intouch.family/en) · [Über uns](https://intouch.family/en/about-us) · [Launch Nordamerika](https://www.prnewswire.com/news-releases/intouch-addresses-6-7-billion-senior-loneliness-crisis-with-launch-of-ai-conversational-companion-for-north-america-302496158.html) · [Silvereco-Porträt](https://www.silvereco.org/en/intouch-an-ai-that-calls-your-parents-for-you/)
- [Callie Care — 500k $ Pre-Seed](https://aijourn.com/callie-care-raises-500k-pre-seed-to-tackle-americas-senior-care-gap-with-phone-first-ai/)
- [Joy Calls (ONSCREEN)](https://joycalls.ai/) · [HomeCare Magazine](https://www.homecaremag.com/news/joy-calls-launches-ai-phone-companion-seniors)
- [ElderVoice](https://www.eldervoice.com/)
- [CareCall](https://www.getcarecall.com/)
- [Hausnotruf-Anbietervergleich 2026 — Marktanteile der Verbände](https://pflegekompass.de/magazin/ratgeber/hausnotruf-anbieter-vergleich-2026)
- [Hausnotruf-Kostenvergleich Johanniter, DRK, Malteser](https://www.hausnotruf-ratgeber.de/hausnotruf-kosten/)
