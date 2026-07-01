/**
 * NoFluff Email Agent — Autonomous multi-account email processor
 *
 * Reads every inbox (Outlook + Gmail), classifies each email, generates a
 * context-aware draft reply, and saves it for human approval before sending.
 *
 * Setup:
 *   1. Copy .env.example → .env and fill in credentials
 *   2. npm install (inside /server)
 *   3. node email-agent.mjs          ← one-time run
 *   4. node email-agent.mjs --watch  ← poll every 5 minutes
 *
 * State is written to ../public/email-state.json so the React dashboard
 * can read it directly without a separate API server.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATE_FILE = path.resolve(__dirname, "../public/email-state.json");
const POLL_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

// ─── Business context (used when generating draft replies) ────────────────────

const BUSINESS = {
  name: "NoFluff Marketing",
  owner: "Tony Botchev",
  email: "tony@nofluffmarketing.onmicrosoft.com",
  phone: "(945) 370-8656",
  website: "https://nofluffmarketing.io",
  nmls: "114198",
  services: [
    "AI voice agents for dead-lead reactivation",
    "CRM with email + SMS campaigns",
    "ListingSentinel — pre-MLS property intelligence",
    "Answer Engine Optimization (AEO)",
  ],
};

// ─── Email classification rules ───────────────────────────────────────────────

/**
 * Returns { category, priority, shouldDraft } based on subject + sender.
 * In production swap with an LLM call (Anthropic Messages API).
 */
function classifyEmail({ subject = "", from = "", body = "" }) {
  const text = `${subject} ${from} ${body}`.toLowerCase();

  if (
    text.includes("mortgage") ||
    text.includes("loan") ||
    text.includes("rate") ||
    text.includes("qualify") ||
    text.includes("pre-approval") ||
    text.includes("refinanc")
  ) {
    return { category: "lead", priority: "high", shouldDraft: true };
  }

  if (
    text.includes("listing") ||
    text.includes("property") ||
    text.includes("home") ||
    text.includes("real estate") ||
    text.includes("sentinel")
  ) {
    return { category: "lead", priority: "high", shouldDraft: true };
  }

  if (
    text.includes("invoice") ||
    text.includes("payment") ||
    text.includes("subscription") ||
    text.includes("renewal") ||
    text.includes("support")
  ) {
    return { category: "support", priority: "medium", shouldDraft: true };
  }

  if (
    text.includes("domain") ||
    text.includes("godaddy") ||
    text.includes("dns") ||
    text.includes("nameserver")
  ) {
    return { category: "domain", priority: "high", shouldDraft: true };
  }

  if (
    from.includes("microsoft") ||
    from.includes("microsoftonline") ||
    from.includes("mssecurity") ||
    from.includes("o365mc") ||
    text.includes("undeliverable") ||
    text.includes("admin center")
  ) {
    return { category: "admin", priority: "medium", shouldDraft: false };
  }

  if (
    text.includes("newsletter") ||
    text.includes("unsubscribe") ||
    text.includes("digest") ||
    text.includes("weekly")
  ) {
    return { category: "newsletter", priority: "low", shouldDraft: false };
  }

  return { category: "other", priority: "low", shouldDraft: false };
}

// ─── Draft generation ─────────────────────────────────────────────────────────

/**
 * Generates a reply draft. In production replace with:
 *   const { Anthropic } = await import("@anthropic-ai/sdk");
 *   const client = new Anthropic();
 *   const msg = await client.messages.create({ model: "claude-sonnet-5", ... });
 */
function generateDraft({ subject, fromName, body, category }) {
  const greeting = `Hi ${fromName.split(" ")[0] || "there"},`;
  const sign = `\n\nBest,\n${BUSINESS.owner}\n${BUSINESS.name}\n${BUSINESS.phone}`;

  const templates = {
    lead: `${greeting}\n\nThank you for reaching out! I'd love to learn more about how we can help you.\n\nOur AI-powered platform specializes in ${BUSINESS.services[0]} and ${BUSINESS.services[1]}. Many DFW real estate professionals have seen significant results within the first 30 days.\n\nWould you have 15 minutes this week for a quick demo? You can book directly at ${BUSINESS.website} or reply to this email with your availability.${sign}`,

    support: `${greeting}\n\nThank you for contacting NoFluff Marketing support. I've received your message regarding "${subject}" and will look into this right away.\n\nYou can expect a full response within 1 business day. If this is urgent, please call us directly at ${BUSINESS.phone}.${sign}`,

    domain: `${greeting}\n\nThank you for reaching out about domain services. I'll review the details and get back to you shortly.\n\nFor domain-related matters, please note our primary domains are nofluffmarketing.io and dfwhome.loans. I'll coordinate with our team to address your inquiry.${sign}`,

    client: `${greeting}\n\nThank you for your message. I appreciate you reaching out and will review the details carefully.\n\nI'll have a full response for you by end of business today. In the meantime, feel free to call us at ${BUSINESS.phone} if you need immediate assistance.${sign}`,
  };

  return (
    templates[category] ||
    `${greeting}\n\nThank you for your email. I'll review your message and respond shortly.\n\nBest regards,\n${BUSINESS.owner}\n${BUSINESS.name}`
  );
}

// ─── State management ─────────────────────────────────────────────────────────

async function loadState() {
  try {
    const raw = await fs.readFile(STATE_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return { emails: [], lastRun: null, accounts: [] };
  }
}

async function saveState(state) {
  await fs.writeFile(STATE_FILE, JSON.stringify(state, null, 2));
}

// ─── Microsoft Graph integration ──────────────────────────────────────────────

async function fetchOutlookEmails({ accessToken, mailbox }) {
  const url = `https://graph.microsoft.com/v1.0/users/${mailbox}/mailFolders/inbox/messages?$top=50&$orderby=receivedDateTime desc&$filter=isRead eq false`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    console.error(`Outlook fetch failed: ${res.status} ${res.statusText}`);
    return [];
  }

  const data = await res.json();
  return (data.value || []).map((msg) => ({
    id: `outlook-${msg.id}`,
    accountId: "outlook",
    provider: "outlook",
    from: msg.from?.emailAddress?.address ?? "",
    fromName: msg.from?.emailAddress?.name ?? "",
    subject: msg.subject ?? "(no subject)",
    snippet: msg.bodyPreview ?? "",
    body: msg.body?.content ?? msg.bodyPreview ?? "",
    receivedAt: msg.receivedDateTime,
    webLink: msg.webLink,
    rawId: msg.id,
  }));
}

// ─── Gmail integration ────────────────────────────────────────────────────────

async function fetchGmailEmails({ accessToken }) {
  const listRes = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages?labelIds=INBOX&q=is:unread&maxResults=50",
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  if (!listRes.ok) {
    console.error(`Gmail list failed: ${listRes.status}`);
    return [];
  }

  const listData = await listRes.json();
  const messages = listData.messages || [];

  const emails = await Promise.all(
    messages.map(async (m) => {
      const msgRes = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${m.id}?format=full`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (!msgRes.ok) return null;
      const msg = await msgRes.json();

      const headers = Object.fromEntries(
        (msg.payload?.headers || []).map((h) => [h.name.toLowerCase(), h.value])
      );

      const snippet = msg.snippet ?? "";
      const body =
        atob((msg.payload?.parts?.[0]?.body?.data ?? msg.payload?.body?.data ?? "").replace(/-/g, "+").replace(/_/g, "/")) || snippet;

      return {
        id: `gmail-${m.id}`,
        accountId: "gmail",
        provider: "gmail",
        from: headers["from"] ?? "",
        fromName: (headers["from"] ?? "").replace(/<.*>/, "").trim(),
        subject: headers["subject"] ?? "(no subject)",
        snippet,
        body,
        receivedAt: new Date(parseInt(msg.internalDate)).toISOString(),
        rawId: m.id,
        threadId: m.threadId,
      };
    })
  );

  return emails.filter(Boolean);
}

// ─── Core agent loop ──────────────────────────────────────────────────────────

async function runAgent() {
  console.log(`\n[${new Date().toISOString()}] NoFluff Email Agent starting…`);

  const state = await loadState();
  const existingIds = new Set(state.emails.map((e) => e.id));

  const rawEmails = [];

  // Pull Outlook
  if (process.env.OUTLOOK_ACCESS_TOKEN && process.env.OUTLOOK_MAILBOX) {
    console.log("  → Fetching Outlook inbox…");
    const outlook = await fetchOutlookEmails({
      accessToken: process.env.OUTLOOK_ACCESS_TOKEN,
      mailbox: process.env.OUTLOOK_MAILBOX,
    });
    rawEmails.push(...outlook);
    console.log(`     ${outlook.length} emails fetched`);
  } else {
    console.log("  ⚠ OUTLOOK_ACCESS_TOKEN not set — skipping Outlook");
  }

  // Pull Gmail
  if (process.env.GMAIL_ACCESS_TOKEN) {
    console.log("  → Fetching Gmail inbox…");
    const gmail = await fetchGmailEmails({
      accessToken: process.env.GMAIL_ACCESS_TOKEN,
    });
    rawEmails.push(...gmail);
    console.log(`     ${gmail.length} emails fetched`);
  } else {
    console.log("  ⚠ GMAIL_ACCESS_TOKEN not set — skipping Gmail");
  }

  // Process new emails
  let newCount = 0;
  let draftCount = 0;

  for (const raw of rawEmails) {
    if (existingIds.has(raw.id)) continue;

    const { category, priority, shouldDraft } = classifyEmail({
      subject: raw.subject,
      from: raw.from,
      body: raw.body ?? raw.snippet,
    });

    const email = {
      ...raw,
      category,
      priority,
      status: shouldDraft ? "draft-ready" : "no-reply",
      draft: shouldDraft
        ? generateDraft({
            subject: raw.subject,
            fromName: raw.fromName,
            body: raw.body ?? raw.snippet,
            category,
          })
        : undefined,
    };

    state.emails.unshift(email);
    existingIds.add(email.id);
    newCount++;
    if (shouldDraft) draftCount++;

    console.log(
      `  ✓ [${category}/${priority}] ${raw.subject.slice(0, 60)} → ${email.status}`
    );
  }

  state.lastRun = new Date().toISOString();
  state.accounts = [
    {
      id: "outlook",
      email: process.env.OUTLOOK_MAILBOX ?? "tony@nofluffmarketing.onmicrosoft.com",
      provider: "outlook",
      connected: !!process.env.OUTLOOK_ACCESS_TOKEN,
    },
    {
      id: "gmail",
      email: "info@dfwhome.loans",
      provider: "gmail",
      connected: !!process.env.GMAIL_ACCESS_TOKEN,
    },
  ];

  await saveState(state);

  console.log(
    `\n  Done. ${newCount} new emails processed, ${draftCount} drafts created.`
  );
  console.log(`  State saved → ${STATE_FILE}\n`);
}

// ─── Entry point ──────────────────────────────────────────────────────────────

const watchMode = process.argv.includes("--watch");

await runAgent();

if (watchMode) {
  console.log(`Watching… polling every ${POLL_INTERVAL_MS / 60000} minutes`);
  setInterval(runAgent, POLL_INTERVAL_MS);
}
