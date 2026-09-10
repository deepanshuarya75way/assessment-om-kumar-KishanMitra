import requests
from datetime import datetime, timedelta

LAT, LON = 28.6139, 77.2090   # Delhi

def get_weather_forecast():
    url = f"https://api.open-meteo.com/v1/forecast?latitude={LAT}&longitude={LON}&daily=precipitation_sum,temperature_2m_max,temperature_2m_min&timezone=auto"
    resp = requests.get(url).json()
    tomorrow = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d")
    forecast = {}
    for i, date in enumerate(resp["daily"]["time"]):
        if date == tomorrow:
            forecast["rain"] = resp["daily"]["precipitation_sum"][i]
            forecast["temp_max"] = resp["daily"]["temperature_2m_max"][i]
            forecast["temp_min"] = resp["daily"]["temperature_2m_min"][i]
    return forecast
