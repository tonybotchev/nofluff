---
name: llm-wiki
category: research/llm-wiki
version: 1.0.0
---

# LLM Wiki — Permanent GHL Knowledge Base

## Purpose

Hermes builds a permanent, self-compiling knowledge base of GoHighLevel: API behaviors, workflow quirks, undocumented features, performance patterns, what works and what does not. This knowledge persists across sessions and improves over time.

## Knowledge Base Location

`hermes/knowledge/` in this repository. Commit updates after every significant discovery.

## What Gets Documented

- **API behaviors**: Rate limits, pagination quirks, field validation rules, undocumented parameters
- **Workflow patterns**: Which trigger/action combinations work well, known edge cases, timing behaviors
- **Automation performance**: Open rates, conversion rates, drop-off points for specific sequences
- **GHL native AI agents**: Capabilities, limitations, prompt patterns that work
- **Voice AI**: Call flow patterns, transfer logic, voicemail handling
- **Pipeline logic**: Stage transition rules, opportunity scoring, automation triggers per stage
- **Changelog**: New GHL features, deprecated endpoints, breaking changes
- **Community discoveries**: Useful patterns from the GHL community that have been verified

## How to Add an Entry

Add a section to the relevant file in `hermes/knowledge/`, or create a new file if the topic warrants it. Format:

```markdown
## [Topic]

**Discovered**: [date]
**Context**: [what triggered this discovery]

[Knowledge content]

**Verified**: [yes/no] — [how verified]
```

## Current Knowledge Files

- `hermes/knowledge/ghl-overview.md` — GHL architecture and key concepts
- `hermes/knowledge/api-quirks.md` — API-specific behaviors and gotchas
- `hermes/knowledge/workflow-patterns.md` — Proven automation patterns
- `hermes/knowledge/voice-ai.md` — Voice AI agent configuration

## Querying the Knowledge Base

When answering a GHL question or planning an operation, always check the knowledge base first before calling external search. The knowledge base reflects verified, production-tested behaviors specific to NFM and DHL.
