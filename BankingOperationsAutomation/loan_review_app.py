import sqlite3
import json
import streamlit as st
from pathlib import Path

st.title("AI Loan Document Review")

result = json.loads(
    Path("loan_result.json").read_text()
)

data = result["extracted_data"]

st.subheader("AI-Extracted Loan Information")

reviewed_data = {}

for field, value in data.items():
    reviewed_data[field] = st.text_input(
        field.replace("_", " ").title(),
        value="" if value is None else str(value)
    )

if result["human_review_required"]:
    st.warning(
        "Human review required: "
        + ", ".join(result["review_fields"])
    )

st.subheader("Review Decision")
def save_decision(decision):
    with sqlite3.connect("loan_reviews.db") as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS loan_reviews (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                applicant_name TEXT,
                decision TEXT,
                reviewed_data TEXT
            )
        """)
        conn.execute(
            """INSERT INTO loan_reviews
               (applicant_name, decision, reviewed_data)
               VALUES (?, ?, ?)""",
            (
                reviewed_data["applicant_name"],
                decision,
                json.dumps(reviewed_data)
            )
        )

if st.button("Approve"):
    if any(not value.strip() for value in reviewed_data.values()):
        st.error("Complete all missing fields before approval.")
    else:
        save_decision("Approved")
        st.success("Review approved and saved to SQLite.")

if st.button("Reject"):
    save_decision("Rejected")
    st.error("Review rejected and saved to SQLite.")