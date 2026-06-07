# VoiceMail – Backlog

## Offen

### Senden oder Entwurf (User-Wahl)
Nach der Diktat-Bereinigung und Vorlesung soll der User wählen können:
- „Absenden" → direkt via gmail.send
- „Entwurf" → saveDraft(), User sendet später am Mac

**Voice-Flow:**
> App: „[Text]. Absenden oder als Entwurf speichern?"
> User: „Absenden" / „Entwurf"

**Aufwand:** S  
**Kontext:** Kein CASA-Vorteil, aber bessere UX und geringeres App-Store-Risiko.
Bereits vorbereitet: `saveDraft()` in GmailService.js ist fertig implementiert.

---

### Auto-Resume nach Anruf
AppState-Listener: wenn die App aus dem Hintergrund zurückkommt (Anruf beendet),
soll die State Machine dort weitermachen wo sie war.

**Aufwand:** M

---

### Kontakt-Auflösung (Alias)
„Mails von Peter" scheitert wenn Peters Absenderfeld „P. Müller" oder „peter.mueller@..." lautet.
Contacts-API abfragen, Namen zu E-Mail-Adressen auflösen, dann `from:email@...` als Gmail-Query nutzen.

**Aufwand:** M

---

### Barge-In (echtes Unterbrechen)
Mikro hört mit während TTS läuft. Sobald Sprache erkannt → TTS stoppen, Befehl verarbeiten.
Aktuell: TTS stoppt erst wenn listenOnce() aufgerufen wird (einfaches Barge-In bereits drin).

**Aufwand:** L

---

### App Store / CASA
- CASA Security Assessment beantragen (Pflicht für gmail.send + gmail.modify in öffentlicher App)
- Kosten ca. 5.000–15.000 €, Dauer 2–6 Wochen
- Bis dahin: TestFlight Beta mit manuell eingetragenen Testnutzern (max. 100, kein CASA nötig)
