---
tags: [area, tech-stack, integrations]
---

# Tech Stack

> Master overview of every tool and how they connect. [[Home|Back to Home]]

---

## Tools Overview

| Tool | Category | Role | Status |
|---|---|---|---|
| **GHL (GoHighLevel)** | CRM / Marketing | Central hub — funnels, pipelines, automations, client comms | To set up |
| **Instantly** | Outreach | Cold email campaigns and lead gen | To set up |
| **Gmail** | Communication | Email, client communication | Active |
| **Notion** | Project Management | Projects, databases, client portals, SOPs | Active |
| **Obsidian** | Knowledge Base | Thinking space, strategy, linking ideas | Active |
| **Claude Code** | AI / Dev | Code, automations, technical buildout | Active |
| **Grok** | AI / Research | Research, content ideas, analysis | To set up |
| **Manus** | AI Agents | Autonomous task execution, research agents | To set up |
| **Axiom** | Browser Automation | Scraping, repetitive browser tasks, data collection | To set up |
| **Zo** | Outreach / Sales | *Define role* | To set up |

---

## Integration Map

```
┌─────────────────────────────────────────────────────────┐
│                    LEAD GENERATION                       │
│                                                         │
│  Axiom (scrape/collect)                                 │
│       ↓                                                 │
│  Instantly (cold email sequences)                       │
│       ↓ (reply / interested)                            │
│  GHL (CRM pipeline)                                     │
│       ↓                                                 │
│  Gmail (personal follow-up)                             │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  CLIENT MANAGEMENT                       │
│                                                         │
│  GHL (pipeline + automations)                           │
│       ↓                                                 │
│  Notion (project tracking, deliverables)                │
│       ↓                                                 │
│  Gmail (client communication)                           │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                 CONTENT & MARKETING                      │
│                                                         │
│  Obsidian (strategy + ideas)                            │
│       ↓                                                 │
│  Grok / Claude (draft + refine)                         │
│       ↓                                                 │
│  GHL (publish funnels / emails)                         │
│  Notion (content calendar)                              │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    AI LAYER                              │
│                                                         │
│  Claude Code → Dev, automations, technical work         │
│  Grok       → Research, trend analysis, content ideas   │
│  Manus      → Autonomous agents, delegated tasks        │
└─────────────────────────────────────────────────────────┘
```

---

## What Connects What

> This is where automations live. Update as you wire things up.

| From | To | Trigger | Action | Via |
|---|---|---|---|---|
| Axiom | Instantly | List built | Import leads to campaign | CSV / API |
| Instantly | GHL | Lead replies / interested | Create contact in pipeline | Webhook / Zapier |
| GHL | Gmail | New qualified lead | Send personal email | GHL workflow |
| GHL | Notion | New client signed | Create project page | Zapier / Make |
| Notion | Obsidian | — | Manual: link to Notion pages | [[External Tools]] |
| Grok | Obsidian | — | Manual: paste insights into notes | Copy-paste |
| Claude Code | GitHub | Code changes | Push to repo | Git |

---

## Setup Priority

### Phase 1 — Core Pipeline (do first)
- [ ] GHL: Set up pipeline stages (Lead → Qualified → Proposal → Client)
- [ ] Instantly: Set up first cold email campaign
- [ ] Connect Instantly → GHL (webhook on reply/interest)
- [ ] Gmail: Connect to GHL for sending

### Phase 2 — Client & Project Management
- [ ] Notion: Create client project template
- [ ] Connect GHL → Notion (new client triggers project creation)
- [ ] Set up GHL automations for client onboarding sequence

### Phase 3 — Content & Lead Gen Engine
- [ ] Axiom: Set up lead scraping workflows
- [ ] Feed Axiom data → Instantly campaigns
- [ ] Content workflow: Obsidian ideas → draft with AI → publish via GHL

### Phase 4 — AI Agents & Advanced
- [ ] Manus: Set up agents for recurring research/tasks
- [ ] Grok: Integrate into content research workflow
- [ ] Zo: Define role and connect to pipeline

---

## Notes

- **GHL is the operational hub** — most automations should run through it
- **Notion is the project hub** — track work and deliverables
- **Obsidian is the thinking hub** — strategy, ideas, knowledge that feeds everything else
- **Zapier/Make may be needed** as glue for connections GHL can't handle natively
