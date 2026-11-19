import csv
import json

valid_rows = []
error_rows = []

with open("transactions.csv", "r") as file:
    reader = csv.DictReader(file)

    for row in reader:
        try:
            if not row["transaction_id"] or not row["account_id"]:
                raise ValueError("Missing ID")

            amount = float(row["amount"])
            if amount <= 0:
                raise ValueError("Invalid amount")

            row["amount"] = amount
            valid_rows.append(row)

        except (ValueError, TypeError) as e:
            row["error"] = str(e)
            error_rows.append(row)
 
with open("valid.json", "w") as file:
    json.dump(valid_rows, file, indent=4)

with open("errors.csv", "w", newline="") as file:
    writer = csv.DictWriter(
        file,
        fieldnames=["transaction_id", "account_id", "amount", "status", "error"]
    )
    writer.writeheader()
    writer.writerows(error_rows)

print("Valid records:", len(valid_rows))
print("Invalid records:", len(error_rows))
