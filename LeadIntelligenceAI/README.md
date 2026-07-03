# AI Lead Intelligence System
## AI Lead Qualification Automation

> Built with n8n · OpenAI · Google Sheets

## Problem
Small businesses waste hours manually reviewing form 
submissions, filtering spam, identifying genuine leads, 
and routing inquiries for follow-up. Delayed responses 
lead to missed opportunities and lost revenue.

## Solution
Built an end-to-end AI lead qualification pipeline using 
n8n, an AI Agent powered by OpenAI, and Google Sheets 
to automatically classify incoming leads and route them 
to the correct destination — no human involvement required.

## How It Works
1. Form submission triggers the n8n workflow via webhook
2. Filter node removes empty or incomplete entries instantly
3. AI Agent (powered by OpenAI Chat Model) reads each 
   submission and classifies it as genuine or spam
4. Genuine enquiries automatically appended to 
   Genuine Enquiries Google Sheet
5. Spam enquiries automatically appended to 
   Spam Enquiries Google Sheet
6. Sales team reviews only the Genuine sheet — 
   zero manual sorting required

## Key Decision
Used an AI Agent node instead of simple keyword rules 
because AI handles edge cases, nuanced language, and 
changing spam patterns far more accurately than 
brittle rule-based filters. The agent makes intelligent 
classification decisions the same way a human would — 
but instantly and at scale.

## Workflow Architecture
On Form Submission → Filter → AI Agent (OpenAI)
                                    ↓              ↓
                          Genuine Enquiries   Spam Enquiries
                           (Google Sheets)   (Google Sheets)

## Results
- Eliminated manual lead sorting entirely
- Reduced lead response time from hours to seconds
- Sales teams receive only qualified genuine inquiries
- Spam captured and stored separately for review
- 24/7 automated pipeline with minimal maintenance

## Tech Stack
- n8n (workflow automation)
- OpenAI Chat Model (AI Agent for lead classification)
- Google Sheets (genuine and spam lead storage)
- Webhook trigger (form submission capture)
- Filter node (incomplete entry removal)
