---
name: ghl-mcp
category: mcp/native-mcp
version: 1.0.0
source: https://github.com/BusyBee3333/Go-High-Level-MCP-2026-Complete
requires_setup: scripts/setup-ghl-mcp.sh
---

# GHL MCP — Native GoHighLevel Toolset

## Purpose

This skill connects Hermes to GoHighLevel via MCP. It is Hermes's primary interface with GHL — the entire toolset lives here. Every CRM action, workflow operation, conversation management task, and API call flows through this skill.

## MCP Servers

| Server | Sub-Agency | Location ID |
|--------|------------|-------------|
| `ghl-nfm` | NFM | `tRk2nBMoIkO6EhFzr7jp` |
| `ghl-dhl` | DHL | `Jatw8uCMjEcPeIHP2M2z` |

Both servers are configured in `.claude/settings.json` and auto-start with Claude Code.

## Setup

Run once before first use:
```bash
source .env && bash scripts/setup-ghl-mcp.sh
```

## Tool Profiles

The MCP server exposes multiple tool profiles. Default: `curated` (recommended for agents).

| Profile | Tools | Best For |
|---------|-------|----------|
| `curated` | ~8 high-level composites | General agent use — maximizes efficiency |
| `stable` | ~50 stable endpoints | Reliable production operations |
| `full` | ~238 endpoints | Complete API access |
| `raw` | 848 total | Advanced/testing |

Switch profile via `GHL_TOOL_PROFILE` env var (set in `.claude/settings.json`).

## Key Curated Tools

- `crm_location_overview` — Full snapshot of a location's state
- `crm_daily_briefing` — Today's pipeline, appointments, and follow-ups
- `crm_search_everything` — Universal search across contacts, opportunities, conversations
- `crm_next_best_actions` — What should Hermes do right now across the location
- `crm_prepare_contact_followup` — Draft follow-up for a specific contact
- `crm_prepare_lead_reactivation` — Craft reactivation sequence for cold leads
- `crm_prepare_missed_call_response` — Handle missed call scenario
- `crm_prepare_invoice_followup` — Chase unpaid invoices

## Exploring Tools

```bash
cd ~/.hermes/mcp-servers/ghl
npm run tools:list
npm run tools:list -- --search contacts
npm run tools:explorer
```

## Auth Method

GHL Private Integration token via `GHL_API_KEY` env var. Generate at:
GHL → Settings → Integrations → Private Integrations → Create

Scopes required: all read + write scopes for the location.
