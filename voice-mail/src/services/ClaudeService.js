import Anthropic from '@anthropic-ai/sdk';
import Constants from 'expo-constants';

let _client = null;

function getClient() {
  if (!_client) {
    _client = new Anthropic({
      apiKey: Constants.expoConfig.extra.ANTHROPIC_API_KEY,
    });
  }
  return _client;
}

const SUMMARIZE_SYSTEM = `Du bist ein präziser E-Mail-Assistent für deutschsprachige Nutzer (österreichisches Deutsch).
Deine Aufgaben:
1. Fasse E-Mails in genau 3 klaren deutschen Sätzen zusammen. Keine Füllwörter.
2. Extrahiere alle Aufgaben und Handlungspunkte als kurze Stichpunkte.
3. Schreibe ausschließlich auf Deutsch. Keine englischen Begriffe außer Eigennamen.
4. Die Zusammenfassung wird vorgelesen — formuliere sie flüssig und natürlich klingend.
5. Format: Erst die 3-Satz-Zusammenfassung, dann "Aufgaben:" mit Stichpunkten. Wenn keine Aufgaben vorhanden: "Keine Aufgaben."`;

const CLEANUP_SYSTEM = `Du bist ein deutschsprachiger Schreibassistent.
Deine Aufgabe: Wandle gesprochene Diktate in professionelle, höfliche E-Mail-Antworten um.

Regeln:
- Entferne alle Füllwörter: ähm, äh, halt, also, ich mein, quasi, sozusagen, gell, na ja, nämlich, eigentlich (wenn bedeutungslos), irgendwie, irgendwas
- Korrigiere Grammatik und Satzstellung
- Verbessere den Stil: professionell aber freundlich
- Behalte den Inhalt und die Aussage zu 100%
- Schreibe in der ersten Person (ich/wir)
- Österreichisches Deutsch: "Ich ersuche" statt "Ich bitte", passende Höflichkeitsformen
- Beginne direkt mit dem Text, keine Betreff-Zeile, keine Erklärungen
- Gib NUR den fertigen E-Mail-Text zurück`;

export async function summarizeEmail(emailBody, emailFrom, emailSubject) {
  const message = await getClient().messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 512,
    system: [
      {
        type: 'text',
        text: SUMMARIZE_SYSTEM,
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages: [
      {
        role: 'user',
        content: `Von: ${emailFrom}\nBetreff: ${emailSubject}\n\nE-Mail-Text:\n${emailBody}`,
      },
    ],
  });

  return message.content[0].text;
}

export async function cleanupDictation(rawText) {
  const message = await getClient().messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: [
      {
        type: 'text',
        text: CLEANUP_SYSTEM,
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages: [
      {
        role: 'user',
        content: `Diktat:\n"${rawText}"\n\nBitte schreibe daraus eine saubere E-Mail-Antwort:`,
      },
    ],
  });

  return message.content[0].text;
}
