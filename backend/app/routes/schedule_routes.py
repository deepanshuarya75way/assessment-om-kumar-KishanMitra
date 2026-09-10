# scheduler_route.py

from fastapi import APIRouter, BackgroundTasks
from datetime import datetime
import asyncio, time

from app.routes.iot_route import soil_test  # IoT route, no changes needed
from app.services.sms_service import send_sms
from app.services.weather_service import get_weather_forecast

router = APIRouter()
schedules = []

# ---------------- Custom Schedule Item ----------------
from pydantic import BaseModel

class ScheduleItem(BaseModel):
    time: str
    activity: str
    field: str = "Field1"
    threshold: int = None
    notes: str = None

# ---------------- Add / Get Custom Schedules ----------------
@router.post("/add-schedule")
def add_schedule(item: ScheduleItem):
    schedules.append(item)
    return {"status": "Schedule added", "item": item}

@router.get("/schedules")
def get_schedules():
    return schedules

# ------------------ Notify Activity ------------------
async def notify_activity(activity: str, field: str, notes: str = None):
    try:
        sensor = soil_test()  # IoT se live data fetch
        weather = get_weather_forecast()
        msg = f"{activity} alert for {field}"

        soil = sensor.get("soil_moisture", 0)
        temp = sensor.get("temperature", 0)
        hum = sensor.get("humidity", 0)
        rain = weather.get("rain", 0)

        if activity.lower() == "irrigation":
            if soil < 30:
                if rain > 0:
                    msg += f" - Soil low, kal barish hogi ({rain} mm), paani kam daalo"
                else:
                    msg += " - Soil low, normal irrigation karo"
            else:
                msg += " - Soil moisture sahi hai, irrigation nahi chahiye"

        elif activity.lower() == "temperature":
            if temp > 35:
                msg += f" - Temperature high! Current: {temp}°C"

        elif activity.lower() == "weather":
            msg += f" - Kal barish: {rain} mm, Temp: {weather.get('temp_max')}°C/{weather.get('temp_min')}°C"

        if notes:
            msg += f" ({notes})"

        send_sms(msg)
        print(f"SMS sent: {msg}")

    except Exception as e:
        print(f"Error in notify_activity: {e}")

# ---------------- Scheduler Loop ----------------
async def scheduler_loop():
    while True:
        now = datetime.now().strftime("%H:%M")
        for item in schedules.copy():
            if item.time == now:
                await notify_activity(item.activity, item.field, item.notes)
                schedules.remove(item)
        await asyncio.sleep(18)

# ---------------- Start Smart Scheduling ----------------
@router.post("/start-schedule")
def start_schedule(background_tasks: BackgroundTasks):
    """
    When frontend clicks "Smart Schedule":
    - Fetch IoT data multiple times
    - Decide which SMS to send
    - Send SMS via send_sms()
    """
    send_sms("🌾 KishanMitra Smart Irrigation Active!")

    def smart_schedule_task():
        try:
            for round_no in range(1, 5):
                time.sleep(30)  # wait 30s between checks
                sensor = soil_test()  # IoT live data
                soil = sensor.get("soil_moisture", 0)
                temp = sensor.get("temperature", 0)
                hum = sensor.get("humidity", 0)
                rain = get_weather_forecast().get("rain", 0)

                if round_no == 1:  # Irrigation Alert
                    if soil < 30:
                        if rain > 0:
                            send_sms("💧 Irrigation Alert: Soil moisture low hai. Kal barish hogi, paani kam daalo.")
                        else:
                            send_sms("💧 Irrigation Alert: Soil moisture low hai. Normal irrigation karo.")
                    else:
                        send_sms("✅ Soil moisture sahi hai. Irrigation ki zarurat nahi.")

                elif round_no == 2:  # Seed Sowing Alert
                    if 20 < temp < 35 and hum > 50:
                        send_sms("🌱 Seed Sowing Alert: Mausam behtareen hai, aaj beej daalne ka sahi samay hai.")
                    else:
                        send_sms("🌱 Seed Sowing Alert: Mausam abhi theek nahi, beej daalne ke liye rukiye.")

                elif round_no == 3:  # Fertilizer Alert
                    if soil < 40:
                        send_sms("🧪 Fertilizer Alert: Soil nutrients kam hain. Aaj fertilizer daalna uchit hai.")
                    else:
                        send_sms("🧪 Fertilizer Alert: Soil condition theek hai, fertilizer ki turant zarurat nahi.")

                elif round_no == 4:  # Weather Update
                    if rain > 0:
                        send_sms(f"🌦 Weather Update: Kal {rain} mm barish hogi. Irrigation aur fertilizer accordingly adjust karein.")
                    else:
                        send_sms("☀ Weather Update: Kal barish ki sambhavna nahi hai. Normal schedule follow karein.")

        except Exception as e:
            print(f"Error in smart_schedule_task: {e}")

    background_tasks.add_task(smart_schedule_task)
    return {"status": "Smart scheduling started. SMS sequence triggered."}
