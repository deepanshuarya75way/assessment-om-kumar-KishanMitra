import os
from twilio.rest import Client
from dotenv import load_dotenv

load_dotenv()

# Twilio Config
TWILIO_SID = os.getenv("TWILIO_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE = os.getenv("TWILIO_PHONE")
USER_PHONE = os.getenv("USER_PHONE")

client = Client(TWILIO_SID, TWILIO_AUTH_TOKEN) if TWILIO_SID and TWILIO_AUTH_TOKEN else None

def send_sms(msg: str):
    if not client:
        print("⚠️ Twilio credentials missing, skipping SMS.")
        return
    client.messages.create(
        body=msg,
        from_=TWILIO_PHONE,
        to=USER_PHONE
    )
    print(f"📩 SMS sent: {msg}")

