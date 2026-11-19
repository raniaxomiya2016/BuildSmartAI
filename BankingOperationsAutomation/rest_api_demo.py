import requests

url = "https://jsonplaceholder.typicode.com/users/1"

try:
    response = requests.get(url, timeout=10)
    

    if response.status_code == 200:
        data = response.json()
        print("Success! API data received:")
        print("Customer Name:", data["name"])
        print("Email:", data["email"])

    elif response.status_code == 404:
        print("Error: Record not found")

    elif response.status_code == 429:
        print("Error: Too many requests. Try again later.")

    else:
        print("Unexpected HTTP status:", response.status_code)

except requests.exceptions.RequestException as e:
    print("API connection error:", e)