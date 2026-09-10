from fastapi import APIRouter
import requests
from datetime import datetime

router = APIRouter()

# Helper: Get city coordinates using Open-Meteo Geocoding (free, no API key)
def get_city_coordinates(city: str):
    url = f"https://geocoding-api.open-meteo.com/v1/search?name={city}&count=1&language=en&format=json"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        if data.get('results'):
            result = data['results'][0]
            return result['latitude'], result['longitude']
    return None, None

# Helper: Map WMO weather code to description
def get_weather_description(code: int):
    mapping = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing rime fog",
        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Dense drizzle",
        56: "Light freezing drizzle",
        57: "Dense freezing drizzle",
        61: "Slight rain",
        63: "Moderate rain",
        65: "Heavy rain",
        66: "Light freezing rain",
        67: "Heavy freezing rain",
        71: "Slight snow fall",
        73: "Moderate snow fall",
        75: "Heavy snow fall",
        77: "Snow grains",
        80: "Slight rain showers",
        81: "Moderate rain showers",
        82: "Violent rain showers",
        85: "Slight snow showers",
        86: "Heavy snow showers",
        95: "Thunderstorm",
        96: "Thunderstorm with slight hail",
        99: "Thunderstorm with heavy hail",
    }
    return mapping.get(code, "Unknown")

@router.get("/next/7days")
async def get_weather_forecast(city: str):
    try:
        lat, lon = get_city_coordinates(city)
        if not lat or not lon:
            return {"error": "City not found. Please check the city name."}
        
        # Open-Meteo Forecast API for next 7 days (daily data)
        url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&daily=temperature_2m_mean,relative_humidity_2m_mean,wind_speed_10m_max,weather_code,sunrise,sunset&forecast_days=7&timezone=auto"
        
        response = requests.get(url)
        if response.status_code != 200:
            return {"error": "Failed to fetch forecast data"}
        
        data = response.json()
        daily = data['daily']
        
        forecast = []
        for i in range(7):
            time_str = daily['time'][i]
            dt = datetime.fromisoformat(time_str)
            
            sunrise_str = daily['sunrise'][i]
            sunset_str = daily['sunset'][i]
            sunrise_time = datetime.fromisoformat(sunrise_str).strftime('%H:%M')
            sunset_time = datetime.fromisoformat(sunset_str).strftime('%H:%M')
            
            forecast.append({
                "date": dt.strftime('%Y-%m-%d'),
                "temp": round(daily['temperature_2m_mean'][i], 1),
                "humidity": round(daily['relative_humidity_2m_mean'][i], 1),
                "wind": round(daily['wind_speed_10m_max'][i], 1),
                "sunrise": sunrise_time,
                "sunset": sunset_time,
                "condition": get_weather_description(daily['weather_code'][i])
            })
        
        return forecast
        
    except Exception as e:
        return {"error": str(e)}

@router.get("/previous/7days")
async def get_previous_7days(city: str):
    try:
        lat, lon = get_city_coordinates(city)
        if not lat or not lon:
            return {"error": "City not found. Please check the city name."}
        
        # Open-Meteo Forecast API for past 7 days (daily data)
        url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&daily=temperature_2m_mean,relative_humidity_2m_mean,wind_speed_10m_max,weather_code,sunrise,sunset&past_days=7&timezone=auto"
        
        response = requests.get(url)
        if response.status_code != 200:
            return {"error": "Failed to fetch historical data"}
        
        data = response.json()
        daily = data['daily']
        
        previous_days = []
        for i in range(7):
            time_str = daily['time'][i]
            dt = datetime.fromisoformat(time_str)
            
            sunrise_str = daily['sunrise'][i]
            sunset_str = daily['sunset'][i]
            sunrise_time = datetime.fromisoformat(sunrise_str).strftime('%H:%M')
            sunset_time = datetime.fromisoformat(sunset_str).strftime('%H:%M')
            
            previous_days.append({
                "date": dt.strftime('%Y-%m-%d'),
                "temp": round(daily['temperature_2m_mean'][i], 1),
                "humidity": round(daily['relative_humidity_2m_mean'][i], 1),
                "wind": round(daily['wind_speed_10m_max'][i], 1),
                "sunrise": sunrise_time,
                "sunset": sunset_time,
                "condition": get_weather_description(daily['weather_code'][i])
            })
        
        # Reverse to show most recent past day first (e.g., Yesterday before 7 days ago)
        previous_days.reverse()
        return previous_days
        
    except Exception as e:
        return {"error": str(e)}