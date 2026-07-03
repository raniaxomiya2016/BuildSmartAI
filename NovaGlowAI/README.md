# NovaGlow AI Customer Support Agent
## AI Customer Support Automation

> Built with n8n · Gmail · OpenAI · Supabase RAG · Slack

## Problem
D2C skincare support teams spend 8-12 minutes manually 
drafting policy-based email replies, leading to slow 
response times, inconsistent answers, and agent burnout.

## Solution
Designed and shipped an AI-powered customer support 
workflow using n8n, Gmail, OpenAI, Supabase Vector Store, 
and Slack to automate support email triage, policy 
retrieval, and response drafting — with human review 
before anything reaches the customer.

## Workflow Architecture
New Support Email (Gmail Trigger)
→ Classify Email as CS / NOT_CS (OpenAI)
→ Route Customer Support Emails
   → True: Draft Policy-Based Reply (AI Agent)
          → Search Policy Knowledge Base (Supabase RAG)
          → OpenAI Embeddings - Policy Search
          → Create Gmail Draft
          → Notify Slack Review Channel
   → False: Not a support email — no action

## How It Works
1. Gmail Trigger fires when new support email arrives
2. OpenAI classifies email as customer support 
   or not customer support
3. Router sends only genuine support emails forward
4. AI Agent searches Supabase vector knowledge base 
   using OpenAI Embeddings to find relevant policy
5. OpenAI Chat Model drafts a policy-accurate reply
6. Draft saved to Gmail — not sent automatically
7. Slack review channel notified for human approval
8. Human agent reviews and sends — maintaining 
   full brand control

## Key Decision
Chose Gmail drafts instead of auto-send to protect 
brand trust and keep every customer response 
human-reviewed. This is a human-in-the-loop design — 
AI handles the heavy lifting, humans make the final call.

## RAG Implementation
- Company policy documents embedded using OpenAI Embeddings
- Vectors stored in Supabase Vector Store
- At query time, incoming email is embedded and 
  matched against policy knowledge base
- Most relevant policy chunks passed to OpenAI 
  for reply generation
- Ensures replies are grounded in approved policy 
  — not hallucinated

## Results
- Reduced draft time from 8-12 minutes to 2-4 minutes
- Improved response consistency through policy grounding
- Maintained 100% human review before customer contact
- Increased support capacity without adding headcount

## Tech Stack
- n8n (workflow automation)
- Gmail API (email trigger and draft creation)
- OpenAI Chat Model (email classification and reply writing)
- OpenAI Embeddings (policy vector search)
- Supabase Vector Store (RAG knowledge base)
- Slack (human review notification)
