from fastapi import APIRouter
import requests

router = APIRouter()

# ESP32 IP (apke local network me)
ESP32_IP = "http://10.202.197.34"  # yahan aapka ESP32 IP dalein

# ---------- Route 1: Soil Test ----------
@router.get("/soil-test")
def soil_test():
    try:
        response = requests.get(f"{ESP32_IP}/soil-test", timeout=5)
        data = response.json()
        return {"status": "success", "data": data}
    except Exception as e:
        return {"status": "error", "message": str(e)}

# ---------- Route 2: Water Pump ----------
@router.post("/water-pump/{action}")
def water_pump(action: str):
    action = action.upper()
    if action not in ["ON", "OFF"]:
        return {"status": "error", "message": "Action must be ON or OFF"}
    try:
        response = requests.post(
            f"{ESP32_IP}/water-pump",
            data={"action": action},  # ✅ Correct way
            timeout=5
        )
        data = response.json()
        return {"status": "success", "data": data}
    except Exception as e:
        return {"status": "error", "message": str(e)}