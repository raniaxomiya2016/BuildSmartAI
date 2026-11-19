# Banking Operations Automation

### Python | PowerShell | SQL | REST API | SFTP | n8n | AI Document Processing

## Project Overview

Banking Operations Automation is a hands-on portfolio project demonstrating how different technologies can support common banking and credit union operations.

The project contains seven independently developed and tested automation modules covering secure file transfer, CSV validation, database queries, API integration, workflow orchestration, AI-assisted document extraction, and file monitoring.

**Business objective:** Reduce repetitive manual tasks, improve data accuracy, maintain operational records, and support human oversight in banking workflows.

All banking records used in this project are fictional test data.

## Technologies Used

| Technology | Application |
|---|---|
| Python | CSV validation, SFTP downloads, REST API requests, AI extraction |
| PowerShell 7 | File detection, duplicate prevention, CSV logging |
| SQL / SQLite | Banking member and loan data queries |
| Paramiko / SSH / SFTP | Secure file transfers |
| Docker | Local SFTP test server |
| REST API / JSON | External API requests and response handling |
| n8n | Scheduled workflow automation |
| Gmail / Google Sheets | Error notifications and workflow logging |
| AI / LLM | Loan application data extraction |
| Streamlit | Human review interface |
| Git / GitHub | Version control and project documentation |

## Project Modules

### 1. Python CSV Validation

Developed a Python script to validate sample banking transaction records.

- Read CSV files using `csv.DictReader`.
- Checked required fields and numeric values.
- Separated valid and invalid records.
- Generated `valid.json` and `errors.csv`.

**Test result:** Three valid records and two invalid records correctly identified.

### 2. SQL Banking Database

Created a sample SQLite database containing banking members and loan records.

Practiced `SELECT`, `JOIN`, `WHERE`, `GROUP BY`, `SUM`, `COUNT`, and `ORDER BY`.

**Test result:** Retrieved four active loans totaling $52,000.

### 3. REST API Integration

Developed a Python script using the `requests` library.

- Sent HTTP GET requests.
- Parsed JSON responses.
- Tested successful responses and missing resources.
- Demonstrated handling of HTTP 200, 404, and a simulated 429 response.

### 4. n8n Workflow Automation

Built a scheduled workflow using n8n.

**Workflow:** Schedule Trigger → HTTP Request → Conditional Routing → Google Sheets.

An error branch sends an email notification through Gmail.

Tested the workflow using successful and failed HTTP requests.

### 5. AI Loan Document Extraction and Human Review

Built an AI-assisted loan document processing demonstration.

- Extracted structured information from a fictional loan application.
- Generated JSON output.
- Flagged missing credit score information for human review.
- Built a Streamlit review interface.
- Tested approval and rejection decisions.
- Stored review decisions in SQLite.

**Control:** Human review is required before a decision is recorded through the review application.

### 6. SFTP File Pickup

Built a Python file-transfer script using Paramiko and a local Docker SFTP server.

- Uploaded a fictional loan CSV to the test server.
- Downloaded it using Python.
- Verified the downloaded records.
- Tested missing-file exception handling.

### 7. PowerShell File Monitoring and Logging

Developed a PowerShell script to detect CSV files in an incoming folder.

- Identified files using `Get-ChildItem`.
- Checked existing records using `Import-Csv`.
- Skipped previously logged filenames.
- Recorded new filenames, detection timestamps, and file sizes using `Export-Csv`.

## Testing and Error Handling

The modules were tested with sample banking data and selected failure scenarios, including invalid CSV values, missing SFTP files, failed HTTP requests, missing loan application information, and duplicate file detection.

## Project Structure

```text
BankingOperationsAutomation/
├── process_transactions.py
├── transactions.csv
├── valid.json
├── errors.csv
├── rest_api_demo.py
├── download_sftp.py
├── sftp_loans.csv
├── downloaded_loans.csv
├── extract_loan.py
├── loan_application.txt
├── loan_result.json
├── loan_review_app.py
├── powershell_monitor/
│   ├── monitor_files.ps1
│   ├── incoming/
│   └── logs/
├── project_screenshots/
└── README.md
```

SQLite databases are generated locally and excluded from the public repository.

## Security and Responsible Automation

- Fictional data used throughout the demonstrations.
- Environment variables used for credentials in the portfolio version of the SFTP script.
- `.env` and local database files excluded from Git tracking.
- Human review incorporated into the AI loan-processing demonstration.
- Error handling tested in selected workflows.

## Current Scope and Future Improvements

The seven modules were independently tested and organized within one portfolio project. They are **not yet integrated into a single automated production pipeline**.

Future improvements include connecting the modules, adding automatic scheduling and monitoring, strengthening credential and SSH host-key management, improving exception handling, and implementing automated integration tests.

## Skills Demonstrated

Python scripting • PowerShell • SQL • CSV • JSON • REST APIs • HTTP status codes • SFTP • Docker • n8n • AI document extraction • Human-in-the-loop review • Git • GitHub

---

*Portfolio demonstration project — not connected to a real financial institution or production banking system.*