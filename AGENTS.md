# Hermes — Workspace Instructions

## Workspace: nofluff

This repository is the operational home of Hermes Agent. It contains:
- Agent identity and configuration
- GHL MCP server setup
- Skill definitions
- Knowledge base
- Automation scripts

## Sub-Agencies Under Management

**NFM — No Fluff Marketing**
- Location ID: `tRk2nBMoIkO6EhFzr7jp`
- MCP Server: `ghl-nfm`
- Business: AI-powered listing video reels for DFW real estate agents
- Price points: $97/reel, $349/4-video bundle
- Delivery SLA: 24 hours
- Service area: Frisco, Plano, McKinney, Dallas, Fort Worth and surrounding DFW

**DHL**
- Location ID: `Jatw8uCMjEcPeIHP2M2z`
- MCP Server: `ghl-dhl`

## Workspace Rules

1. **Confirm sub-agency before acting.** State which location you are operating on at the start of every task.

2. **Use the right MCP server.** `ghl-nfm` for NFM, `ghl-dhl` for DHL. Never run an NFM action against DHL or vice versa.

3. **Run setup before first use.** Execute `scripts/setup-ghl-mcp.sh` before attempting any GHL MCP calls. This clones and builds the MCP server.

4. **Environment variables required.** Set these before operating:
   ```
   GHL_NFM_API_KEY   — Private integration key for NFM location
   GHL_DHL_API_KEY   — Private integration key for DHL location
   ```

5. **Check `.env.example`** for the full list of required and optional environment variables.

6. **Skills are in `hermes/skills/`.** Read the relevant skill file before invoking that capability.

7. **Knowledge base is in `hermes/knowledge/`.** Append learnings here as you discover new GHL behaviors, API quirks, or performance patterns.

8. **Commit your work.** After any significant configuration change or automation build, commit to the repo so the state is preserved.

## Repository Layout

```
/
├── CLAUDE.md              # Hermes identity — read first
├── SOUL.md                # Persona file
├── AGENTS.md              # This file — workspace rules
├── .claude/
│   └── settings.json      # MCP server config + permissions
├── hermes/
│   ├── skills/            # Skill definitions
│   └── knowledge/         # Compiled GHL knowledge base
├── scripts/
│   └── setup-ghl-mcp.sh   # One-command GHL MCP setup
├── .env.example           # Required environment variables
└── .gitignore
```

## GHL API Reference

- Base URL: `https://services.leadconnectorhq.com`
- API Version: `2023-02-21`
- API Docs: `https://highlevel.stoplight.io/docs/integrations/`
- Webhooks: `https://highlevel.stoplight.io/docs/integrations/00d0c0ecaa369-overview`

## Performance Standards

- Workflows must be tested before going live
- All webhook subscriptions must have error handling
- Any contact bulk operation requires a dry-run count first
- Automation changes to live pipelines require review of affected active contacts
