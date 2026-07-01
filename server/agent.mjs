/**
 * NoFluff Email Agent v2 — AI-powered autonomous email + calendar manager
 *
 * Setup:
 *   1. cp .env.example .env  →  fill in OUTLOOK_ACCESS_TOKEN + ANTHROPIC_API_KEY
 *   2. npm install
 *   3. npm start             →  starts HTTP API on :3001 and polls every 5 min
 *
 * API endpoints (consumed by the React dashboard):
 *   GET  /api/state          →  full state (emails + calendar + lastRun)
 *   POST /api/run            →  trigger manual agent run
 *   POST /api/send           →  approve & send draft  { emailId, draft }
 *   POST /api/skip           →  mark no-reply         { emailId }
 *   POST /api/update-draft   →  save edited draft     { emailId, draft }
 *   POST /api/redraft        →  regenerate AI draft   { emailId }
 *   GET  /api/calendar       →  upcoming events (14 days)
 *   POST /api/calendar/create →  create event         { subject, start, end, … }
 *   DELETE /api/calendar/:id →  delete event
 */

import "dotenv/config";
import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Anthropic from "@anthropic-ai/sdk";
import {
  getInboxEmails,
  replyToEmail,
  markRead,
  getCalendarView,
  createCalendarEvent,
  deleteCalendarEvent,
} from "./graph.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATE_FILE = path.resolve(__dirname, "../public/email-state.json");
const PORT = process.env.AGENT_PORT || 3001;
const POLL_MS = 5 * 60 * 1000;
const MAILBOX = process.env.OUTLOOK_MAILBOX || "tony@nofluffmarketing.onmicrosoft.com";

const ai = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are the AI assistant for Tony Botchev at NoFluff Marketing.
NoFluff Marketing provides AI-powered tools for DFW real estate professionals and mortgage loan officers:
- AI voice agents for dead-lead reactivation
- CRM with email + SMS campaigns
- ListingSentinel — pre-MLS property intelligence
- Answer Engine Optimization (AEO)

Tony's contact: tony@nofluffmarketing.onmicrosoft.com | (945) 370-8656 | NMLS #114198
Website: https://nofluffmarketing.io

Always sign replies: "Best,\nTony Botchev\nNoFluff Marketing\n(945) 370-8656"
Be warm, professional, and concise.`;

// ── State ─────────────────────────────────────────────────────────────────────

let state = { emails: [], calendar: [], lastRun: null, error: null };

async function loadState() {
  try {
    state = JSON.parse(await fs.readFile(STATE_FILE, "utf8"));
  } catch {
    state = { emails: [], calendar: [], lastRun: null, error: null };
  }
}

async function saveState() {
  await fs.mkdir(path.dirname(STATE_FILE), { recursive: true });
  await fs.writeFile(STATE_FILE, JSON.stringify(state, null, 2));
}

// ── AI ────────────────────────────────────────────────────────────────────────

async function classifyEmail(email) {
  const msg = await ai.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 150,
    messages: [
      {
        role: "user",
        content: `Classify this email. Return ONLY valid JSON, nothing else:
{"category":"lead|client|support|domain|admin|newsletter|other","priority":"high|medium|low","shouldDraft":true|false}

From: ${email.fromName} <${email.from}>
Subject: ${email.subject}
Preview: ${email.snippet.slice(0, 400)}`,
      },
    ],
  });

  try {
    const match = msg.content[0].text.match(/\{[\s\S]*?\}/);
    return JSON.parse(match[0]);
  } catch {
    return { category: "other", priority: "low", shouldDraft: false };
  }
}

async function generateDraft(email, category) {
  const msg = await ai.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 700,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `Write a professional reply to this ${category} email. Be warm and concise. Do not use placeholders.

From: ${email.fromName} <${email.from}>
Subject: ${email.subject}
Message:
${(email.body || email.snippet).slice(0, 1500)}`,
      },
    ],
  });

  return msg.content[0].text.trim();
}

// ── Agent loop ────────────────────────────────────────────────────────────────

let agentRunning = false;

async function runAgent() {
  if (agentRunning) return;
  agentRunning = true;
  console.log(`\n[${new Date().toISOString()}] Agent run starting…`);

  await loadState();
  const seen = new Set(state.emails.map((e) => e.rawId));
  let newCount = 0;
  state.error = null;

  // ── Fetch emails
  try {
    const raw = await getInboxEmails(MAILBOX, 50);
    console.log(`  Fetched ${raw.length} unread emails from Outlook`);

    for (const email of raw) {
      if (seen.has(email.rawId)) continue;

      let classification = { category: "other", priority: "low", shouldDraft: false };
      try {
        classification = await classifyEmail(email);
      } catch (err) {
        console.error(`  classify error: ${err.message}`);
      }

      const { category, priority, shouldDraft } = classification;

      let draft;
      if (shouldDraft) {
        try {
          draft = await generateDraft(email, category);
        } catch (err) {
          console.error(`  draft error: ${err.message}`);
          draft = `Hi ${email.fromName.split(" ")[0] || "there"},\n\nThank you for reaching out. I'll review your message and respond shortly.\n\nBest,\nTony Botchev\nNoFluff Marketing\n(945) 370-8656`;
        }
      }

      const entry = {
        id: `outlook-${email.rawId}`,
        accountId: "outlook",
        provider: "outlook",
        ...email,
        category,
        priority,
        status: shouldDraft ? "draft-ready" : "no-reply",
        draft,
        processedAt: new Date().toISOString(),
      };

      state.emails.unshift(entry);
      seen.add(email.rawId);
      newCount++;
      console.log(`  [${category}/${priority}] ${email.subject.slice(0, 55)}`);
    }
  } catch (err) {
    console.error("  Outlook fetch error:", err.message);
    state.error = `Outlook: ${err.message}`;
  }

  // ── Fetch calendar
  try {
    state.calendar = await getCalendarView(MAILBOX, 14);
    console.log(`  Calendar: ${state.calendar.length} events loaded`);
  } catch (err) {
    console.error("  Calendar fetch error:", err.message);
  }

  state.lastRun = new Date().toISOString();
  await saveState();
  agentRunning = false;
  console.log(`  Done. ${newCount} new emails processed.\n`);
}

// ── HTTP API ──────────────────────────────────────────────────────────────────

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function json(res, data, status = 200) {
  cors(res);
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

async function readBody(req) {
  return new Promise((resolve) => {
    let buf = "";
    req.on("data", (c) => (buf += c));
    req.on("end", () => {
      try {
        resolve(JSON.parse(buf || "{}"));
      } catch {
        resolve({});
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  cors(res);
  if (req.method === "OPTIONS") return res.writeHead(204).end();

  const url = new URL(req.url, `http://localhost:${PORT}`);
  const route = `${req.method} ${url.pathname}`;

  try {
    // GET /api/state — full state snapshot
    if (route === "GET /api/state") {
      await loadState();
      return json(res, { ...state, agentRunning });
    }

    // POST /api/run — trigger agent run
    if (route === "POST /api/run") {
      runAgent().catch(console.error);
      return json(res, { started: true });
    }

    // POST /api/send — approve & send a draft
    if (route === "POST /api/send") {
      const { emailId, draft } = await readBody(req);
      await loadState();
      const email = state.emails.find((e) => e.id === emailId);
      if (!email) return json(res, { error: "Email not found" }, 404);

      await replyToEmail(MAILBOX, email.rawId, draft);
      await markRead(MAILBOX, email.rawId);

      email.status = "sent";
      email.draft = draft;
      email.sentAt = new Date().toISOString();
      await saveState();
      return json(res, { ok: true });
    }

    // POST /api/skip — mark no-reply
    if (route === "POST /api/skip") {
      const { emailId } = await readBody(req);
      await loadState();
      const email = state.emails.find((e) => e.id === emailId);
      if (email) {
        email.status = "no-reply";
        await saveState();
      }
      return json(res, { ok: true });
    }

    // POST /api/update-draft — save edited draft without sending
    if (route === "POST /api/update-draft") {
      const { emailId, draft } = await readBody(req);
      await loadState();
      const email = state.emails.find((e) => e.id === emailId);
      if (email) {
        email.draft = draft;
        await saveState();
      }
      return json(res, { ok: true });
    }

    // POST /api/redraft — regenerate AI draft
    if (route === "POST /api/redraft") {
      const { emailId } = await readBody(req);
      await loadState();
      const email = state.emails.find((e) => e.id === emailId);
      if (!email) return json(res, { error: "Not found" }, 404);

      const newDraft = await generateDraft(email, email.category);
      email.draft = newDraft;
      await saveState();
      return json(res, { draft: newDraft });
    }

    // GET /api/calendar — upcoming events
    if (route === "GET /api/calendar") {
      await loadState();
      return json(res, state.calendar || []);
    }

    // POST /api/calendar/create — create event
    if (route === "POST /api/calendar/create") {
      const body = await readBody(req);
      const event = await createCalendarEvent(MAILBOX, body);
      state.calendar = await getCalendarView(MAILBOX, 14);
      await saveState();
      return json(res, event);
    }

    // DELETE /api/calendar/:id — delete event
    if (req.method === "DELETE" && url.pathname.startsWith("/api/calendar/")) {
      const eventId = url.pathname.replace("/api/calendar/", "");
      await deleteCalendarEvent(MAILBOX, eventId);
      state.calendar = (state.calendar || []).filter((e) => e.id !== eventId);
      await saveState();
      return json(res, { ok: true });
    }

    json(res, { error: "Not found" }, 404);
  } catch (err) {
    console.error("API error:", err.message);
    json(res, { error: err.message }, 500);
  }
});

// ── Boot ──────────────────────────────────────────────────────────────────────

await loadState();
server.listen(PORT, () => {
  console.log(`\nNoFluff Email Agent v2`);
  console.log(`API → http://localhost:${PORT}`);
  console.log(`Mailbox: ${MAILBOX}`);
  console.log(`Polling every ${POLL_MS / 60000} minutes\n`);
});

runAgent().catch(console.error);
setInterval(() => runAgent().catch(console.error), POLL_MS);
