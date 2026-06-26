---
name: plan
category: software-development/plan
version: 1.0.0
---

# Plan — Design Before Building

## Purpose

Before building any GHL workflow, automation, or configuration, Hermes produces a structured plan. Planning prevents wasted API calls, broken automations, and hard-to-reverse changes in live accounts.

## When This Is Required

- Building any new workflow or automation
- Modifying a workflow that has active contacts in it
- Creating or restructuring a pipeline
- Setting up a new Voice AI agent
- Configuring a new funnel or campaign
- Any operation that affects more than 10 contacts

## Plan Structure

Every plan must include:

### 1. Objective
What is the end state we are trying to achieve? One sentence.

### 2. Sub-Agency & Scope
- Which location: NFM (`tRk2nBMoIkO6EhFzr7jp`) or DHL (`Jatw8uCMjEcPeIHP2M2z`)
- What is in scope / what is explicitly out of scope
- Estimated number of contacts affected

### 3. Current State
Query GHL to understand what exists today. Never plan in a vacuum.
- Relevant pipelines and their stages
- Existing workflows that touch this area
- Active contacts in affected stages

### 4. Proposed Changes
Step-by-step description of what will be built or changed.
- New triggers, actions, conditions
- API calls required
- Order of operations

### 5. Dependencies & Risks
- What must exist before this can work (tags, custom fields, pipelines)
- What could go wrong and how to handle it
- Rollback plan if something breaks

### 6. Test Plan
- How to test in a controlled way before going live
- Test contact(s) to use
- Success criteria (what does "working" look like?)

### 7. Execution Checklist
- [ ] Current state verified
- [ ] Dependencies confirmed to exist
- [ ] Plan reviewed
- [ ] Test run completed
- [ ] Live deployment done
- [ ] Post-deploy check passed

## Example Plan: New Lead Follow-Up Workflow

**Objective:** Automatically follow up within 5 minutes when a new lead submits the NFM contact form.

**Sub-Agency & Scope:** NFM — affects all new form submissions from the NFM website form. ~5-15 leads/week.

**Current State:** No automated follow-up exists. Leads arrive in "New Leads" pipeline stage and are manually followed up.

**Proposed Changes:**
1. Create workflow trigger: Form Submitted → NFM Contact Form
2. Wait 2 minutes (give lead time to check email)
3. Action: Send SMS — "Hey [first_name], this is [owner]. I saw you're interested in listing videos for [address]. Got a quick sec to chat?"
4. Wait 24 hours
5. If no reply: Send email follow-up with listing reel sample
6. Add tag: `follow-up-sequence-active`

**Dependencies:** NFM contact form must be connected to GHL. SMS number must be configured.

**Risks:** If form is not connected, trigger will never fire. Test with a real form submission first.

**Test Plan:** Submit the form with a test contact. Verify SMS fires within 5 minutes. Verify email fires at 24-hour mark if no reply.
