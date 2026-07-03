
# Maestro — Multi-Agent AI Productivity Assistant

> One command. Three agents. Zero app-switching.

## Problem
Professionals waste hours every day switching between Gmail, 
Google Calendar, and meeting tools. Every task lives in a 
different app and there is no single place to manage it all.

## Solution
Maestro is a multi-agent AI assistant built on n8n that handles 
email, calendar, and meeting tasks through one conversational 
chat interface. A Master Agent receives the user's message, 
identifies the intent, and routes it to one of three specialized 
sub-agents — each connected to its own live API.

## Agents
- **Master Agent** — reads user intent and routes to the right sub-agent
- **Email Agent** — reads, drafts, sends, replies, deletes Gmail messages
- **Calendar Agent** — gets, creates, updates, deletes Google Calendar events
- **Meetings Agent** — fetches and summarizes Fireflies.ai transcripts

## Tech Stack
- n8n (workflow automation)
- OpenAI GPT (AI reasoning engine)
- Gmail API
- Google Calendar API
- Fireflies.ai API
- Simple Memory (conversation context)

## Architecture
Master Agent (OpenAI + Memory)
├── Email Agent → Gmail API
├── Calendar Agent → Google Calendar API
└── Meetings Agent → Fireflies.ai API

## Key Decisions
- Hierarchical multi-agent architecture over monolithic AI
- Each sub-agent has its own OpenAI model and memory
- API limits tuned to 5 records per call to prevent timeouts
- n8n Chat Trigger used as the live public chat interface

## Results
- 3 specialized AI agents live in production
- 12 API actions integrated across 3 platforms
- 90% reduction in timeout errors after optimization
- One chat interface replacing 3 separate tools

## Demo
Live demo available on request.
Book a session: https://calendly.com/raniaxomiya/30min

## Portfolio
https://buildsmartai.app
