# HerCare Voice — 24/7 AI Voice Receptionist for Women's Health Clinics

> **Live Demo:** [hercare.buildsmartai.app](https://hercare.buildsmartai.app)
> **Call the Agent:** +1 (659) 837-1320 *(available 24/7)*

---

## The Problem

Women's health clinics lose patient bookings after office hours when calls go unanswered. Patients move to competitors, and staff return the next morning to missed calls, incomplete information, and no structured follow-up data.

## The Solution

Built a 24/7 AI inbound voice receptionist using Retell AI and GPT-4.1 Mini that answers every patient call, collects booking details, checks real-time availability, schedules appointments, and logs post-call data automatically — with zero staff involvement.

---

## How It Works

```
Patient Calls → Maya Answers → Collects Details → Checks Cal.com Availability
     → Books into Google Calendar → Logs Data to Google Sheets via n8n
```

1. Patient calls the clinic number
2. **Maya** (the AI voice agent) answers instantly, collects name, date of birth, and service needed
3. Maya checks real-time availability through Cal.com
4. Appointment is booked directly into Google Calendar
5. Post-call data (patient info, service type, booking status) is automatically logged to Google Sheets via an n8n webhook

---

## Key Product Decision

Chose **voice AI over a chatbot or web form** because patients calling a women's health clinic expect warmth, conversation, and reassurance. Voice reduces friction, improves booking completion, and is more appropriate for sensitive healthcare interactions.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Voice Agent Platform | [Retell AI](https://retellai.com) |
| Language Model | GPT-4.1 Mini |
| Voice | Cartesia — Hailey |
| Scheduling | [Cal.com](https://cal.com) |
| Calendar | Google Calendar |
| Automation / Webhook | [n8n](https://n8n.io) |
| Data Logging | Google Sheets |
| Landing Page | Netlify |

---

## Agent Architecture

**Agent Name:** HerCare Voice
**Persona:** Maya — warm, professional, always available

**Call Flow (Retell AI node canvas):**

```
Welcome Node
    ↓
Conversation Node (collect patient details)
    ↓
Check Availability — Cal.com Function Node
    ↓
Book Appointment — Cal.com Function Node
    ↓
Closing Message Node
    ↓
End Call
```

> **Note:** Cal.com functions are wired as explicit flow nodes — not background LLM tools. The Structured Output toggle must be OFF for function calling to work correctly.

---

## Post-Call Data Extraction

The following fields are captured after every call and logged to Google Sheets:

| Field | Description |
|---|---|
| `patient_first_name` | First name |
| `patient_last_name` | Last name |
| `date_of_birth` | Patient DOB |
| `service_type` | Type of appointment requested |
| `appointment_date` | Booked date |
| `appointment_time` | Booked time |
| `appointment_booked` | Boolean — whether booking succeeded |

> **Webhook trigger:** `call_analyzed` event (not `call_ended`) — this is the event that carries structured post-call data from Retell AI.

---

## Outcomes

| Metric | Result |
|---|---|
| Patient calls answered | **100%** |
| Availability | **24/7** — no staff needed |
| Wait time for booking | **0 minutes** |
| Post-call data captured | **100%** |

---

## Key Lessons Learned

- In Retell's flow-based agent, Cal.com functions must be explicit **flow nodes** — they do not fire automatically as background LLM tools from within a Conversation node
- The **Structured Output toggle must be OFF** in Retell's LLM settings for function calling to work
- The Welcome Node's default template text **overrides** the global system prompt and must be cleared
- Use `call_analyzed` (not `call_ended`) to receive Post-Call Data Extraction results in n8n
- Production webhook uses `/webhook/` path; test uses `/webhook-test/`

---

## Project Links

- **Live Site:** [hercare.buildsmartai.app](https://hercare.buildsmartai.app)
- **Portfolio:** [buildsmartai.app](https://buildsmartai.app)
- **Built by:** [Rani Neog Adhikary](https://linkedin.com/in/rani-neog-adhikary-52101b383/)

- ### Project 3 — HerCare Voice
**24/7 AI Voice Receptionist for Women's Health Clinics**

Answers every inbound patient call, collects booking details, checks real-time availability, 
schedules appointments into Google Calendar, and logs post-call data to Google Sheets — automatically.

📁 [`/HerCareVoice`](./HerCareVoice) · 🌐 [hercare.buildsmartai.app](https://hercare.buildsmartai.app) · 📞 +1 (659) 837-1320

