/**
 * Microsoft Graph API utilities
 * Handles all Outlook email + Calendar operations
 */

const GRAPH = "https://graph.microsoft.com/v1.0";

async function req(path, { method = "GET", body, token } = {}) {
  const t = token || process.env.OUTLOOK_ACCESS_TOKEN;
  const res = await fetch(`${GRAPH}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${t}`,
      "Content-Type": "application/json",
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`Graph ${method} ${path} → ${res.status}: ${text.slice(0, 200)}`);
  }

  if (res.status === 204) return null;
  return res.json();
}

// ── Email ─────────────────────────────────────────────────────────────────────

export async function getInboxEmails(mailbox, top = 50) {
  const select = "id,subject,from,bodyPreview,body,receivedDateTime,webLink,isRead";
  const filter = encodeURIComponent("isRead eq false");
  const data = await req(
    `/users/${mailbox}/mailFolders/inbox/messages?$top=${top}&$orderby=receivedDateTime desc&$filter=${filter}&$select=${select}`
  );
  return (data?.value || []).map((m) => ({
    rawId: m.id,
    from: m.from?.emailAddress?.address ?? "",
    fromName: m.from?.emailAddress?.name ?? "",
    subject: m.subject ?? "(no subject)",
    snippet: m.bodyPreview ?? "",
    body: m.body?.content ?? m.bodyPreview ?? "",
    receivedAt: m.receivedDateTime,
    webLink: m.webLink,
  }));
}

export async function replyToEmail(mailbox, messageId, replyBody) {
  await req(`/users/${mailbox}/messages/${messageId}/reply`, {
    method: "POST",
    body: { comment: replyBody },
  });
}

export async function sendNewEmail(mailbox, { to, subject, body }) {
  await req(`/users/${mailbox}/sendMail`, {
    method: "POST",
    body: {
      message: {
        subject,
        body: { contentType: "Text", content: body },
        toRecipients: [{ emailAddress: { address: to } }],
      },
    },
  });
}

export async function markRead(mailbox, messageId) {
  await req(`/users/${mailbox}/messages/${messageId}`, {
    method: "PATCH",
    body: { isRead: true },
  });
}

// ── Calendar ──────────────────────────────────────────────────────────────────

export async function getCalendarView(mailbox, days = 14) {
  const start = new Date().toISOString();
  const end = new Date(Date.now() + days * 86_400_000).toISOString();
  const select = "id,subject,start,end,location,organizer,attendees,isOnlineMeeting,onlineMeetingUrl,bodyPreview";
  const data = await req(
    `/users/${mailbox}/calendarView?startDateTime=${start}&endDateTime=${end}&$orderby=start/dateTime&$select=${select}`
  );
  return data?.value || [];
}

export async function createCalendarEvent(mailbox, event) {
  return req(`/users/${mailbox}/events`, { method: "POST", body: event });
}

export async function updateCalendarEvent(mailbox, eventId, patch) {
  return req(`/users/${mailbox}/events/${eventId}`, { method: "PATCH", body: patch });
}

export async function deleteCalendarEvent(mailbox, eventId) {
  return req(`/users/${mailbox}/events/${eventId}`, { method: "DELETE" });
}
