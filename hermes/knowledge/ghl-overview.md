# GHL Architecture Overview

## Core Concepts

**Location** — The fundamental unit in GHL. Each sub-agency (NFM, DHL) is a separate location with its own contacts, pipelines, workflows, and settings. All API calls include a `locationId`.

**Agency** — The parent account that owns one or more locations. Agency-level API keys can create new subaccounts.

**Contact** — The central object. Every person is a contact. Contacts have: custom fields, tags, pipeline opportunities, conversations, appointments, notes, tasks.

**Opportunity** — A deal/lead in a pipeline. One contact can have multiple opportunities across multiple pipelines. Opportunities have stages, monetary values, and status.

**Workflow** — GHL's automation builder. Triggered by events, executes a sequence of actions with conditions and waits. The most powerful tool in GHL.

**Conversation** — The unified inbox. All messages (SMS, email, FB, IG, WhatsApp, chat) appear as conversations tied to a contact.

**Calendar** — Appointment booking system. Supports multiple calendars per location, round-robin assignment, buffer times, and booking limits.

## API v2 Fundamentals

**Base URL:** `https://services.leadconnectorhq.com`
**Auth:** `Authorization: Bearer {API_KEY}` or `Authorization: Bearer {OAUTH_TOKEN}`
**Version header:** `Version: 2021-07-28` (contacts/opportunities) or `Version: 2023-02-21` (newer endpoints)

**Pagination:** Most list endpoints use `limit` + `startAfter` or `page` + `limit` cursor pattern.

**Rate Limits:** 
- Location-level: ~100 req/min default
- Use exponential backoff on 429 responses
- Batch operations where available

## Key API Resource Paths

| Resource | Path |
|----------|------|
| Contacts | `/contacts/` |
| Contact by ID | `/contacts/{id}` |
| Contact search | `/contacts/search` |
| Opportunities | `/opportunities/` |
| Pipelines | `/opportunities/pipelines` |
| Conversations | `/conversations/` |
| Messages | `/conversations/messages` |
| Workflows | `/workflows/` |
| Calendars | `/calendars/` |
| Appointments | `/calendars/events` |
| Invoices | `/invoices/` |
| Payments | `/payments/` |
| Locations | `/locations/{id}` |
| Webhooks | `/webhooks/` |
| Custom Fields | `/locations/{id}/customFields` |
| Tags | `/contacts/tags` |

## Workflow Trigger Types (Key)

- `ContactCreate` — New contact added
- `FormSubmitted` — Form submission
- `AppointmentBooked` — New appointment
- `TagAdded` / `TagRemoved` — Tag changes
- `OpportunityStageChanged` — Pipeline movement
- `InboundMessage` — Message received
- `CallStatus` — Call completed, missed, voicemail
- `InvoiceCreated` / `PaymentReceived`
- `Webhook` — External trigger via POST
- `Scheduled` — Time-based trigger

## NFM Business Context

No Fluff Marketing sells AI-powered listing video reels to DFW real estate agents.
- Price: $97/reel single, $349/4-pack bundle
- Delivery SLA: 24 hours
- Input: MLS photos → Output: 30-45 second vertical video reel
- Market: Frisco, Plano, McKinney, Dallas, Fort Worth and surrounding DFW

Key pipeline for NFM: Lead → Interested → Order Placed → In Production → Delivered → Review Requested → Repeat Client

## GHL Native AI Capabilities

- **Conversation AI** — Responds to inbound messages automatically with AI
- **Review AI** — Generates review request responses
- **Content AI** — Generates email/SMS content in the builder
- **Voice AI** — Inbound/outbound call agent (newer feature)
- **Workflow AI Actions** — AI-generated content within workflow steps
