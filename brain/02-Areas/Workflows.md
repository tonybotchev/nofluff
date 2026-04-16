---
tags: [area, workflows, sops]
---

# Workflows

> Step-by-step processes for recurring tasks. [[Home|Back to Home]]

---

## Lead Generation Workflow

```
1. FIND leads
   └── Axiom: scrape target lists (LinkedIn, directories, etc.)
   └── Output: CSV with name, email, company, role

2. OUTREACH
   └── Instantly: import leads, run cold email sequence
   └── Sequence: 3-5 emails over 2 weeks
   └── Track: open rates, reply rates

3. QUALIFY
   └── Interested replies land in GHL (via webhook)
   └── GHL: auto-tag as "Interested", assign to pipeline
   └── Manual review: qualify or disqualify

4. CONVERT
   └── Gmail / GHL: personal follow-up
   └── Book call / send proposal
   └── Move to "Client" stage in GHL
```

**Tools involved:** Axiom → Instantly → GHL → Gmail

---

## New Client Onboarding Workflow

```
1. CLIENT SIGNS
   └── GHL: move to "Client" stage
   └── Trigger: automated welcome email sequence

2. PROJECT SETUP
   └── Notion: create project from template (via Zapier or manual)
   └── Includes: deliverables, timeline, client info

3. KICKOFF
   └── Gmail: send kickoff email with next steps
   └── Schedule kickoff call

4. ONGOING
   └── Notion: track deliverables and progress
   └── GHL: automated check-ins and review requests
```

**Tools involved:** GHL → Notion → Gmail

---

## Content Creation Workflow

```
1. IDEATION
   └── Obsidian: capture ideas in Inbox (use Content Idea template)
   └── Grok: research trends, competitor analysis
   └── Manus: deep research on specific topics

2. DRAFT
   └── Claude / Grok: generate first draft
   └── Obsidian: refine and store final version

3. PUBLISH
   └── GHL: publish to funnels, email sequences, landing pages
   └── Social: post to platforms (manually or via scheduler)

4. MEASURE
   └── GHL: track conversions
   └── Notion: log performance in content calendar
```

**Tools involved:** Obsidian → Claude/Grok → GHL → Notion

---

## Daily Operations

```
Morning:
  □ Check GHL dashboard — new leads, pipeline status
  □ Check Instantly — campaign performance, replies to handle
  □ Check Gmail — urgent client communication
  □ Obsidian daily note — set priorities for the day

During day:
  □ Work from Notion — active project deliverables
  □ Capture ideas in Obsidian Inbox as they come
  □ Use Claude Code for any technical/dev work

End of day:
  □ Update GHL pipeline — move deals forward
  □ Update Notion — mark completed tasks
  □ Obsidian daily note — end of day review
```

---

## Add More Workflows

As you build new processes, document them here. Good candidates:
- Reporting workflow
- Invoice / payment workflow
- Client offboarding
- Hiring / contractor onboarding
