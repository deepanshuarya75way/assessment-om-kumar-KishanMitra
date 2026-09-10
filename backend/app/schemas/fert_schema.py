# app/schemas/fert_schema.py
from pydantic import BaseModel, Field

# class FertilizerRequest(BaseModel):
#     Temperature: float
#     Moisture: float
#     Rainfall: float
#     PH: float
#     Nitrogen: float
#     Phosphorous: float
#     Potassium: float
#     Carbon: float
#     Acidic_Soil: int = Field(..., description="1 if soil is acidic, else 0")
#     Alkaline_Soil: int = Field(..., description="1 if soil is alkaline, else 0")
#     Loamy_Soil: int = Field(..., description="1 if soil is loamy, else 0")
#     Neutral_Soil: int = Field(..., description="1 if soil is neutral, else 0")
#     Peaty_Soil: int = Field(..., description="1 if soil is peaty, else 0")
#     Crops: str = Field(..., description="Crop name (will be encoded)")


class FertilizerRequest(BaseModel):
    nitrogen: float
    phosphorous: float
    potassium: float
    temperature: float
    humidity: float
    # moisture: float = 0   # optional
    # soil_type: str = None # optional
    # crop_type: str        # optional if using crop-based recommendation