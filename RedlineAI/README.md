# RedlineAI — AI-Powered Contract Risk Analysis

> Know what you're signing before you sign it.

Live product: https://redlineai.buildsmartai.app
Brand: BuildSmart AI | Built by Rani Neog Adhikary

---

## The Problem

Contract review costs $300–$600 per hour. Most small 
businesses, startups, and freelancers cannot afford it. 
Most people sign contracts without fully understanding 
what they are agreeing to.

## The Solution

RedlineAI reads any legal contract, identifies every 
risky clause, explains each one in plain English, assigns 
a risk level of Low, Medium, or High, and delivers a full 
professional risk report to the user's inbox in under 
30 seconds. Under 5 cents per analysis.

---

## Two Modes

### Option A — Automated Pipeline
A user visits the RedlineAI website, uploads their PDF 
contract, and enters their email. The moment they submit, 
an automated n8n workflow fires — the contract is 
downloaded, text is extracted natively inside n8n, and 
the full document is analyzed by GPT-4.1 Mini. The risk 
report is saved to Airtable and emailed to the user 
automatically. Zero human involvement.

### Option B — Agent Mode (Claude MCP)
A user drops a contract file into a local folder. They 
open Claude Desktop and ask it to analyze the contract 
in plain English. Claude uses the Filesystem MCP 
(Model Context Protocol) tool to find and read the file 
autonomously — no uploading, no copy-pasting. The full 
risk report appears directly in the Claude Desktop chat. 
MCP is the pair of hands for Claude.

---

## The n8n Workflow — 6 Nodes

| Node | Role |
|------|------|
| Webhook | Receives form submission from Fillout |
| Download Contract | Downloads PDF as binary data from Fillout storage |
| PDF Text Extractor | Converts PDF to plain text natively inside n8n |
| Risk Analyzer | GPT-4.1 Mini analyzes contract and writes risk report |
| Save to Airtable | Saves full report to database permanently |
| Send a Message | Delivers personalized risk report to user's inbox |

---

## Tech Stack

| Tool | Role |
|------|------|
| n8n | Workflow orchestration |
| GPT-4.1 Mini | AI contract analysis |
| Claude Desktop + MCP | Agent mode with filesystem access |
| Airtable | Database |
| Fillout | Form and file upload |
| Netlify | Website hosting |
| Antigravity AI | Frontend generation |
| HTML / CSS / JavaScript | Frontend code |

---

## Production-Ready Features

- Privacy: contract files never leave n8n
- Cost: under 5 cents per analysis
- Speed: full report delivered in under 30 seconds
- Scale: runs 24/7 automatically in Active mode
- Audit trail: every analysis stored in Airtable permanently
- No account needed: report delivered by email instantly

---

## Project Structure
