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

### Lazy Loading (Metadata-first)
Aktuell werden bis zu 50 Mails mit `format=full` vorgeladen — Body, HTML und alles.
Besser: erst Header/Snippet holen (`format=metadata`), Body erst bei „Vorlesen".
Reduziert Gmail API-Quota und Datenmenge massiv.

**Aufwand:** M  
**Kontext:** GmailService.fetchEmails + useVoiceFlow._fetchAndIterate müssen aufgeteilt werden.

---

### Voice-Endwort beim Whisper-Diktat
Aktuell: Aufnahme endet nur per Tap oder nach 90s Timeout — nicht wirklich freihändig.
Idee: Silence Detection (Audio-Pegel unter Schwellwert für 2s) oder „Fertig" als Stopwort
parallel zur Whisper-Aufnahme per nativer STT erkennen.

**Aufwand:** M

---

### Sicherheitsregel: Nie direkt an unbekannte Absender
Wenn ein Absender noch nie vom Nutzer beantwortet wurde (kein Thread-History-Check)
oder wenn `replyTo` auf eine No-Reply-Adresse zeigt → immer nur Entwurf, nie direktes Senden.
Erkennung: `no-reply`, `noreply`, `do-not-reply` im Absender-String.

**Aufwand:** S  
**Wert:** Verhindert peinliche Fehlantworten an Newsletter/Spam/Automaten im Auto.

---

### App Store / CASA
- CASA Security Assessment beantragen (Pflicht für gmail.send + gmail.modify in öffentlicher App)
- Kosten ca. 5.000–15.000 €, Dauer 2–6 Wochen
- Bis dahin: TestFlight Beta mit manuell eingetragenen Testnutzern (max. 100, kein CASA nötig)
