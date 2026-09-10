from pydantic import BaseModel, Field

class SoilInput(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float
    NPK: float
    THI: float
    rainfall_level: float
    ph_category: float
    temp_rain_interaction: float
    ph_rain_interaction: float
