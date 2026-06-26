---
name: webhook-subscriptions
category: devops/webhook-subscriptions
version: 1.0.0
---

# Webhook Subscriptions — React to GHL Events in Real Time

## Purpose

GHL fires a webhook for almost every event: new lead, contact update, pipeline stage change, appointment booked, call missed, payment received, conversation message. This skill lets Hermes subscribe to those events and react instantly — without polling.

## Why This Matters

Manual GHL operators check dashboards. Hermes reacts at the moment an event occurs. A lead submits a form → Hermes qualifies and routes them in under 60 seconds. A call is missed → Hermes sends an SMS before the contact even hangs up. A payment clears → Hermes moves the pipeline stage and triggers onboarding. This is the speed advantage.

## GHL Webhook Setup

**In GHL UI:**
1. Settings → Integrations → Webhooks
2. Add Endpoint: your webhook receiver URL
3. Select events to subscribe to (see event list below)

**Via API:**
```
POST https://services.leadconnectorhq.com/webhooks
Authorization: Bearer {GHL_API_KEY}
Content-Type: application/json

{
  "locationId": "tRk2nBMoIkO6EhFzr7jp",
  "name": "Hermes Event Stream",
  "url": "https://your-receiver.com/hermes/webhook",
  "events": ["ContactCreate", "ContactDndUpdate", "OpportunityCreate", "AppointmentCreate", "InboundMessage", "CallStatus"]
}
```

## Key Events to Subscribe

| Event | Trigger | Hermes Action |
|-------|---------|---------------|
| `ContactCreate` | New contact added | Qualify, tag, route to pipeline |
| `FormSubmitted` | Lead form submission | Immediate follow-up sequence |
| `OpportunityCreate` | New deal created | Assign stage, notify owner |
| `OpportunityStageUpdate` | Stage changed | Trigger stage-specific automation |
| `AppointmentCreate` | Appointment booked | Send confirmation + reminders |
| `CallStatus` | Call completed/missed | Log outcome, trigger follow-up |
| `InboundMessage` | SMS/email/chat received | Route to appropriate response flow |
| `InvoiceCreate` | Invoice sent | Start payment follow-up sequence |
| `PaymentSuccess` | Payment received | Move pipeline, trigger onboarding |
| `ReviewRequested` | Review request sent | Track and follow up if no response |

## Webhook Receiver

Hermes needs a publicly accessible endpoint to receive events. Options:
- **Local dev**: `ngrok http 3000`
- **Production**: Deploy a lightweight receiver to a VPS, Vercel function, or GHL workflow (using the "Webhook" action to re-route internally)

## Payload Verification

GHL signs webhooks with a shared secret. Always verify the signature before processing:
```
X-GHL-Signature: sha256=<hmac_hex>
```

## GHL API Reference
- Webhooks overview: `https://highlevel.stoplight.io/docs/integrations/00d0c0ecaa369-overview`
- Event types: `https://highlevel.stoplight.io/docs/integrations/ZG9jOjExMTI2NTU4-events`
