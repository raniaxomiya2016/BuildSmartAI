# VisionCheck AI
### One photo. Instant safety report. Zero manual inspection.

![Live](https://img.shields.io/badge/Status-Live-brightgreen)
![AWS](https://img.shields.io/badge/AWS-Bedrock-orange)
![Serverless](https://img.shields.io/badge/Architecture-Serverless-blue)

**Live Product:** https://visioncheck.buildsmartai.app  
**Portfolio:** https://buildsmartai.app  
**Category:** Visual AI — Computer Vision

---

## The Problem

Workplace PPE violations go undetected between manual 
inspections. Human safety inspectors visit sites 
periodically, leaving critical violations unaddressed 
for days or weeks. OSHA fines reach $15,625 per 
violation. Workers get hurt.

---

## The Solution

VisionCheck AI analyzes any workplace photo and generates 
a full PPE compliance report in under 30 seconds — 
automatically detecting violations, rating risk level, 
and recommending corrective actions.

No human inspector needed. No waiting. Just a photo 
and an instant answer.

---

## How It Works
User uploads photo (Netlify)

↓

AWS API Gateway (HTTP POST)

↓

AWS Lambda (Python 3.12)

validates input + orchestrates AI call

↓

Amazon Bedrock — Claude Sonnet 4.5

analyzes image for PPE violations

↓

Safety report returned in under 30 seconds
---

## Tech Stack

| Service | Purpose |
|---|---|
| Amazon Bedrock (Claude Sonnet 4.5) | Vision AI — analyzes images for PPE |
| AWS Lambda (Python 3.12) | Serverless compute — validates + orchestrates |
| AWS API Gateway (HTTP API) | Public endpoint — receives image uploads |
| Amazon S3 | Encrypted temp storage — auto-deletes 24hrs |
| AWS IAM | Least privilege security — 3 permissions only |
| CloudWatch | Error-level logging only |
| Netlify | Frontend hosting |
| Custom Domain | visioncheck.buildsmartai.app via Namecheap CNAME |

---

## What The AI Detects

**PPE Compliance Check:**
- Hard hat / helmet
- High-visibility safety vest
- Protective gloves
- Safety boots / footwear
- Eye protection / goggles
- Fall protection harness

**Risk Classification:**
- LOW / MEDIUM / HIGH / CRITICAL

---

## Security Implementation

- IAM least privilege — Lambda has exactly 3 permissions
- S3 server-side encryption (SSE-S3)
- Automated image deletion after 24 hours (lifecycle rule)
- Input validation — file type, size, format checked before AI call
- CORS policy locked to authorized domain
- AWS Budget alert at $15/month

---

## Key Architectural Decision

Originally planned to use Amazon Rekognition's PPE 
Detection API. Discovered AWS was moving Rekognition 
features into maintenance mode in 2026 — directing new 
deployments toward Amazon Bedrock with multimodal 
foundation models.

Pivoted to Bedrock with Claude Sonnet 4.5 immediately.
Building for where AWS is heading — not where it has been.

---

## Cost

| Service | Monthly Cost |
|---|---|
| Lambda | Free (1M requests permanent) |
| API Gateway | ~$0.00 |
| Amazon Bedrock | ~$0.03–0.08 per analysis |
| S3 | ~$0.01 |
| **Total** | **$1–5/month** |

Zero idle cost. Scales to zero when not in use.

---

## Files

| File | Description |
|---|---|
| `lambda_function.py` | Complete Lambda function with error handling |
| `index.html` | Frontend — upload form + results display |
| `README.md` | This file |

---

## Built By

** Rani Neog Adhikary** | BuildSmart AI  
AI Automation Engineer | AWS Certified Solutions Architect  
https://buildsmartai.app



















