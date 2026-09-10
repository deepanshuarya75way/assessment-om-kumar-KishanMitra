# ai.py
import os
import json
import time
import hashlib
from google import genai
from google.genai import errors
from dotenv import load_dotenv
from datetime import date, timedelta

load_dotenv()

# Initialize Google GenAI client (new official SDK)
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=GEMINI_API_KEY) if GEMINI_API_KEY else None

# Default model: gemini-3.6-flash (free tier)
DEFAULT_MODEL = "gemini-3.6-flash"

FARMER_SYSTEM_PROMPT = (
    "You are an AI Farmer Assistant. Reply only to farming or agriculture related questions. "
    "Answer briefly (2–4 sentences max), in clear and meaningful language. "
    "Use proper formatting with short paragraphs, bullet points, or numbers if needed. "
    "Do NOT add unnecessary text or disclaimers. "
    "Be polite, simple, and farmer-friendly."
)

# In-memory response cache to prevent duplicate requests from hitting API rate limits
_RESPONSE_CACHE = {}

def _get_cache_key(prompt: str, model: str) -> str:
    return hashlib.md5(f"{model}:{prompt.strip()}".encode('utf-8')).hexdigest()

def get_ai_response(prompt: str, model: str = DEFAULT_MODEL) -> str:
    """Generate response from Google Gemini AI model with caching and 429 rate-limit retries."""
    cache_key = _get_cache_key(prompt, model)
    if cache_key in _RESPONSE_CACHE:
        return _RESPONSE_CACHE[cache_key]

    if not client:
        return "Error: GEMINI_API_KEY is not configured in .env"

    max_retries = 3
    base_delay = 3  # seconds

    for attempt in range(max_retries):
        try:
            response = client.models.generate_content(
                model=model,
                contents=prompt
            )
            result = response.text.strip()
            _RESPONSE_CACHE[cache_key] = result
            return result
        except errors.APIError as e:
            # 429 Resource Exhausted (Rate limit)
            if "429" in str(e) or "RESOURCE_EXHAUSTED" in str(e):
                if attempt < max_retries - 1:
                    time.sleep(base_delay * (attempt + 1))
                    continue
                else:
                    return f"Rate limit reached. Please wait a minute and try again."
            return f"Error: {str(e)}"
        except Exception as e:
            if "429" in str(e) or "RESOURCE_EXHAUSTED" in str(e):
                if attempt < max_retries - 1:
                    time.sleep(base_delay * (attempt + 1))
                    continue
            return f"Error: {str(e)}"

    return "Error: Unable to connect to AI service. Please try again in a few moments."


def chat_response(prompt: str, model: str = DEFAULT_MODEL) -> str:
    """Generate a farmer-friendly chat response from Gemini AI."""
    full_prompt = f"{FARMER_SYSTEM_PROMPT}\n\nUser question: {prompt}"
    return get_ai_response(full_prompt, model=model)


def crop_recommendation(data):
    prompt = (
        f"You are an agricultural AI assistant. "
        f"Based on the following soil report and session, provide only a **list of recommended crops for india**. "
        f"Format strictly as JSON list, e.g., [\"rice\", \"wheat\"]. "
        f"Do not include any explanation or extra text.\n\nSoil report: {data}"
    )
    return get_ai_response(prompt)


def fertilizer_recommendation(data):
    crop = crop_recommendation(data)
    prompt = (
        f"You are an agricultural AI assistant. "
        f"Based on the following soil report, soil type, and crop list, "
        f"provide only a **list of recommended fertilizers** in JSON format. "
        f"Do not include any explanation or extra text.\n\n"
        f"Soil report: {data}\n"
        f"Soil type: {soil_type(data)}\n"
        f"Crop list: {crop}"
    )
    return get_ai_response(prompt)


def yield_recommendation(data):
    crop = crop_recommendation(data)
    prompt = (
        f"You are an agricultural AI assistant. "
        f"Based on the following soil report, soil type, and crop list, "
        f"provide only the **predicted yield value** as a number or JSON object (without extra explanation). "
        f"Do not include units or text.\n\n"
        f"Soil report: {data}\n"
        f"Soil type: {soil_type(data)}\n"
        f"Crop list: {crop}"
    )
    return get_ai_response(prompt)


def crop_rotation(data):
    prompt = (
        f"You are an agricultural AI assistant. "
        f"Based on the following soil report, provide only a **list of crops for rotation** in JSON format. "
        f"Do not include any explanation or extra text.\n\nSoil report: {data}"
    )
    return get_ai_response(prompt)


def seed_recommendation(data):
    prompt = (
        f"You are an agricultural AI assistant. "
        f"Based on the following soil report and soil type, provide only a **list of recommended seeds** in JSON format. "
        f"Do not include any explanation or extra text.\n\n"
        f"Soil report: {data}\n"
        f"Soil type: {soil_type(data)}"
    )
    return get_ai_response(prompt)


def crop_defination(cropName):
    prompt = (
        f"You are an agricultural AI assistant. "
        f"Based on the following crop name, provide only a **definition of the crop name** in 50 words. "
        f"Do not include any explanation or extra text.\n\n"
        f"crop name: {cropName}"
    )
    return get_ai_response(prompt)


def crop_reco(cropName):
    prompt = (
        f"You are an agricultural AI assistant. "
        f"Based on the following crop name, in json format 'Why Recommended' "
        f"and values for pH, Nitrogen (N), Phosphorus (P), Potassium (K), and Moisture. "
        f"Do not include any explanation or extra text.\n\n"
        f"crop name: {cropName}"
    )
    return get_ai_response(prompt)


def crop_grow_process(cropName):
    prompt = (
        f"You are an agricultural AI assistant. "
        f"Based on the following crop name, provide only a **crop grow cycle based on week or months** in JSON format. "
        f"Do not include any explanation or extra text.\n\n"
        f"crop name: {cropName}"
    )
    return get_ai_response(prompt)


def soil_comparison(cropName, data):
    prompt = (
        f"You are an agricultural AI assistant. "
        f"Based on the following crop name and data, provide only a table **parameter, your soil, optimal range, status** 'Soil Parameter Comparison'. "
        f"Include the following keys for each parameter: ph, nitrogen, potassium, phosphorus, temperature, humidity, rainfall. "
        f"Do not add any explanation, notes, or extra text.\n\n"
        f"crop name: {cropName} and data is : {data}"
    )
    return get_ai_response(prompt)


def crop_grow_cycle(cropName):
    prompt = (
        f"You are an agricultural AI assistant. "
        f"Based on the following crop name, provide only a table **date, time, action, amount** "
        f"'crop grow from seed to harvesting timetable with real dates and times'. "
        f"Do not add any explanation, notes, or extra text.\n\n"
        f"crop name: {cropName}"
    )
    return get_ai_response(prompt)


def crop_fertilizer(cropName):
    prompt = (
        f"You are an agricultural AI assistant. "
        f"Based on the following crop name, provide only a fertilizer name and treatment time period table **date, time, amount** "
        f"'fertilizer treatment timetable'. "
        f"Do not add any explanation, notes, or extra text.\n\n"
        f"crop name: {cropName}"
    )
    return get_ai_response(prompt)


def soil_type(data):
    prompt = (
        f"You are an agricultural AI assistant. "
        f"Based on the following soil report, provide only the **soil type** as a single word (e.g., sandy, clay, loamy). "
        f"Do not include any explanation or extra text.\n\nSoil report: {data}"
    )
    return get_ai_response(prompt)


def crop_yield(cropName: str, soil: str, weather: str, variety: str):
    prompt = (
        f"You are an agricultural AI assistant.\n"
        f"Based on the following crop information, provide a predicted yield in Quintals/ha as a single value.\n"
        f"Do not add any explanations, just return the numeric prediction.\n\n"
        f"Crop: {cropName}\n"
        f"Soil: {soil}\n"
        f"Weather: {weather}\n"
        f"Variety: {variety}"
    )
    return get_ai_response(prompt)


def mandi_price(state: str, District: str, Market: str, Commodity: str):
    dates = [(date.today() - timedelta(days=i)).isoformat() for i in range(7)]
    date_str = "\n".join(dates)
    prompt = (
        f"You are an agricultural AI assistant.\n"
        f"Provide a table showing the **last 7 days market prices** for the given commodity.\n"
        f"Include columns: Date, State, District, Market, Commodity, Min Price (₹), Max Price (₹).\n"
        f"Do not provide any extra explanation, just return the table in markdown format.\n\n"
        f"Dates: {date_str}\n"
        f"State: {state}\n"
        f"District: {District}\n"
        f"Market: {Market}\n"
        f"Commodity: {Commodity}"
    )
    return chat_response(prompt)


def mandi_price_graph(state: str, District: str, Market: str, Commodity: str):
    prompt = (
        f"You are an agricultural AI assistant.\n"
        f"Provide structured data for the last 5 years for {Commodity} in {Market}, {District}, {state}.\n"
        f"Include the following:\n"
        f"- Year\n"
        f"- Average Price (₹)\n"
        f"- Total Supply (tons)\n"
        f"- Total Demand (tons)\n"
        f"- Profit/Loss (₹ per ton)\n"
        f"Return only **JSON format** without any extra text."
    )
    return get_ai_response(prompt)


def user_want_crop_grow(cropName: str, data):
    prompt = (
        f"You are an agricultural AI assistant. "
        f"Based on the following crop name and soil report **provide a table on how to prepare the soil for this crop**. "
        f"Table format: date, time, fertilizer, qty. "
        f"Do not include any explanation or extra text.\n\n"
        f"crop name: {cropName}\n"
        f"soil report: {data}"
    )
    return get_ai_response(prompt)


def generate_ai_response(prediction: dict) -> dict:
    """Call Gemini AI to generate live insights for plant disease."""
    class_name = prediction.get("class_name", "Unknown Disease")
    description = prediction.get("description", "No description available.")

    prompt = f"""
You are an Agricultural AI Expert.
The plant leaf disease detected is: {class_name}.
Description: {description}.

Provide the following in JSON format:
{{
  "disease": "{class_name}",
  "what_is_this": "Short explanation of the disease (2-3 sentences)",
  "causes": "Main causes (bullet points, farmer-friendly)",
  "treatment": "Effective treatments (bullet points)",
  "prevention": "Preventive measures (bullet points)"
}}
"""
    try:
        result = get_ai_response(prompt)
        # Clean markdown code fences if present
        result = result.replace("```json", "").replace("```", "").strip()
        if result.startswith("{"):
            return eval(result)
        return {"ai_text": result}
    except Exception as e:
        return {"error": str(e)}