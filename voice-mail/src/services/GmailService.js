import { Buffer } from 'buffer';

const GMAIL_BASE = 'https://gmail.googleapis.com/gmail/v1/users/me';
const FETCH_TIMEOUT_MS = 15000;

async function apiFetch(path, accessToken, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(`${GMAIL_BASE}${path}`, {
      ...options,
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Gmail API ${res.status}: ${err}`);
    }
    if (res.status === 204) return null;
    return res.json();
  } catch (err) {
    if (err.name === 'AbortError') throw new Error('Netzwerk-Zeitüberschreitung.');
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

function buildQuery({ timeFilter, sender, keyword, unreadOnly } = {}) {
  const parts = [];
  if (timeFilter === 'heute') parts.push('after:' + getTodayTimestamp());
  if (timeFilter === 'gestern') {
    parts.push('after:' + getYesterdayTimestamp());
    parts.push('before:' + getTodayTimestamp());
  }
  if (unreadOnly) parts.push('is:unread');
  if (sender) parts.push(`from:${sender}`);
  if (keyword) parts.push(keyword);
  return parts.join(' ');
}

// maxResults capped at 50: enough for a drive, not overwhelming
export async function fetchEmails(accessToken, filters = {}, maxResults = 50) {
  const q = buildQuery(filters);
  const listRes = await apiFetch(
    `/messages?q=${encodeURIComponent(q)}&maxResults=${maxResults}`,
    accessToken
  );

  if (!listRes.messages?.length) return [];

  const ids = listRes.messages.map((m) => m.id);
  const batches = chunkArray(ids, 5);
  const emails = [];

  for (const batch of batches) {
    const results = await Promise.all(
      batch.map((id) => apiFetch(`/messages/${id}?format=full`, accessToken))
    );
    emails.push(...results.map(parseGmailMessage));
  }
  return emails;
}

export async function markAsRead(accessToken, messageId) {
  return apiFetch(`/messages/${messageId}/modify`, accessToken, {
    method: 'POST',
    body: JSON.stringify({ removeLabelIds: ['UNREAD'] }),
  });
}

export async function sendReply(accessToken, { threadId, messageId, to, subject, body }) {
  const replySubject = subject.startsWith('Re: ') ? subject : `Re: ${subject}`;
  // RFC 5322: In-Reply-To must be the Message-ID of the parent, not the thread ID
  const inReplyTo = messageId ?? '';

  const rawEmail = [
    `To: ${to}`,
    `Subject: ${replySubject}`,
    inReplyTo ? `In-Reply-To: ${inReplyTo}` : '',
    inReplyTo ? `References: ${inReplyTo}` : '',
    'Content-Type: text/plain; charset=utf-8',
    'MIME-Version: 1.0',
    '',
    body,
  ]
    .filter(Boolean)
    .join('\r\n');

  const encoded = Buffer.from(rawEmail)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  return apiFetch('/messages/send', accessToken, {
    method: 'POST',
    body: JSON.stringify({ raw: encoded, threadId }),
  });
}

export async function saveDraft(accessToken, { threadId, to, subject, body }) {
  const rawEmail = [
    `To: ${to}`,
    `Subject: ${subject}`,
    'Content-Type: text/plain; charset=utf-8',
    'MIME-Version: 1.0',
    '',
    body,
  ].join('\r\n');

  const encoded = Buffer.from(rawEmail)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  return apiFetch('/drafts', accessToken, {
    method: 'POST',
    body: JSON.stringify({ message: { raw: encoded, threadId } }),
  });
}

// ─── Parsing helpers ──────────────────────────────────────────────────────────

function parseGmailMessage(msg) {
  const headers = msg.payload.headers;
  const get = (name) =>
    headers.find((h) => h.name.toLowerCase() === name.toLowerCase())?.value ?? '';

  return {
    id: msg.id,
    threadId: msg.threadId,
    messageId: get('Message-ID') || get('Message-Id'),
    from: get('From'),
    subject: get('Subject'),
    date: get('Date'),
    snippet: msg.snippet,
    body: extractBody(msg.payload),
    attachments: detectAttachments(msg.payload),
    isUnread: msg.labelIds?.includes('UNREAD') ?? false,
  };
}

function extractBody(payload) {
  if (payload.body?.data) {
    return Buffer.from(payload.body.data, 'base64').toString('utf-8');
  }
  if (payload.parts) {
    const plain = payload.parts.find((p) => p.mimeType === 'text/plain');
    if (plain?.body?.data) {
      return Buffer.from(plain.body.data, 'base64').toString('utf-8');
    }
    const html = payload.parts.find((p) => p.mimeType === 'text/html');
    if (html?.body?.data) {
      const raw = Buffer.from(html.body.data, 'base64').toString('utf-8');
      return stripHtml(raw);
    }
    for (const part of payload.parts) {
      const result = extractBody(part);
      if (result) return result;
    }
  }
  return '';
}

function detectAttachments(payload) {
  const attachments = [];
  const scan = (parts = []) => {
    for (const part of parts) {
      if (part.filename && part.filename.length > 0) {
        attachments.push({ name: part.filename, mimeType: part.mimeType });
      }
      if (part.parts) scan(part.parts);
    }
  };
  scan(payload.parts ?? []);
  return attachments;
}

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function getTodayTimestamp() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return Math.floor(d.getTime() / 1000);
}

function getYesterdayTimestamp() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - 1);
  return Math.floor(d.getTime() / 1000);
}

function chunkArray(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export function extractSenderName(fromHeader) {
  const match = fromHeader.match(/^([^<]+)</);
  return match ? match[1].trim() : fromHeader.split('@')[0];
}
