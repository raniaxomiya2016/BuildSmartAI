import os
import paramiko

host = "127.0.0.1"
port = 2222
username = "demo"
password = os.environ["SFTP_PASSWORD"]

try:
    transport = paramiko.Transport((host, port))
    transport.connect(username=username, password=password)

    sftp = paramiko.SFTPClient.from_transport(transport)

    sftp.get(
        "/upload/sftp_loans.csv",
        "downloaded_loans.csv"
    )

    print("Success! Banking CSV downloaded.")

    sftp.close()
    transport.close()

except Exception as e:
    print("SFTP download failed:", e)
