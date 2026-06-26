---
name: duckduckgo-search
category: research/duckduckgo-search
version: 1.0.0
---

# DuckDuckGo Search — GHL Research

## Purpose

Research GHL features, changelog updates, community-built automations, API changes, and third-party integrations. This skill is Hermes's external research capability when the knowledge base does not have an answer.

## When to Use

- A GHL feature or endpoint is unfamiliar and not in `hermes/knowledge/`
- Checking if GHL has released a new native capability (e.g., new AI agent type)
- Looking for community-proven workflow patterns before building from scratch
- Verifying whether a reported GHL bug is known and has a workaround
- Researching third-party tools that integrate with GHL (Bland.ai, Vapi, etc.)

## Effective Search Patterns

**GHL-specific:**
```
site:community.gohighlevel.com [topic]
site:help.gohighlevel.com [feature]
gohighlevel [feature] site:reddit.com
"gohighlevel" OR "GHL" [topic] API 2024 OR 2025 OR 2026
```

**API research:**
```
gohighlevel API v2 [endpoint] example
leadconnectorhq [resource] webhook
gohighlevel [topic] workflow automation
```

**Voice AI:**
```
gohighlevel voice AI agent [configuration topic]
bland.ai gohighlevel integration
vapi gohighlevel workflow
```

## Verification Standard

Do not add anything to the knowledge base from search results alone. Verify against:
1. Official GHL API docs: `https://highlevel.stoplight.io/docs/integrations/`
2. Live testing in a sandbox or via API call
3. GHL changelog: `https://ideas.gohighlevel.com/changelog`

Only mark a finding as "Verified: yes" after testing.

## Research Output

After a research session, append verified findings to the relevant file in `hermes/knowledge/` and commit. This converts one-time research into permanent institutional knowledge.
