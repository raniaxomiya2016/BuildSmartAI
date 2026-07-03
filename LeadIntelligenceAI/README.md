# AI Lead Intelligence System
## AI Lead Qualification Automation

> Built with n8n · OpenAI GPT-4.1 Mini · Google Sheets

## Problem
Small businesses waste hours manually reviewing form 
submissions, filtering spam, identifying genuine leads, 
and routing inquiries for follow-up. Delayed responses 
lead to missed opportunities and lost revenue.

## Solution
Built an end-to-end AI lead qualification pipeline using 
n8n, OpenAI GPT-4.1 Mini, and Google Sheets to automate 
lead sorting and ensure sales teams only receive qualified, 
actionable inquiries.

## How It Works
1. Webhook captures incoming form submissions instantly
2. n8n filters empty or incomplete entries automatically
3. GPT-4.1 Mini classifies each submission as spam or genuine
4. Conditional routing discards spam without human involvement
5. Qualified leads stored instantly in Google Sheets
6. Sales team notified with clean, actionable lead data

## Key Decision
Chose LLM-based classification over keyword rules because 
keyword filters are brittle and require constant maintenance. 
GPT-4.1 Mini handles edge cases, changing spam patterns, 
and nuanced customer inquiries more accurately.

## Results
- Eliminated manual lead sorting entirely
- Reduced lead response time from hours to seconds
- Sales teams receive only qualified inquiries
- 24/7 pipeline with minimal ongoing maintenance

## Tech Stack
- n8n (workflow automation)
- OpenAI GPT-4.1 Mini (lead classification)
- Google Sheets (lead storage)
- Webhooks (form capture)
- Conditional routing (spam filtering)
