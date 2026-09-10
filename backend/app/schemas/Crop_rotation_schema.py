from pydantic import BaseModel, Field
from typing import List, Optional

class CropRotationInput(BaseModel):
    current_crop: str = Field(..., example="wheat", description="Current crop planted")
    previous_crops: List[str] = Field(..., example=["rice", "maize"], description="List of previous crops")
    
    # Soil parameters
    N: float = Field(..., example=50, description="Nitrogen content in soil (kg/ha or ppm)")
    P: float = Field(..., example=40, description="Phosphorus content in soil (kg/ha or ppm)")
    K: float = Field(..., example=30, description="Potassium content in soil (kg/ha or ppm)")
    ph: float = Field(..., example=6.5, description="Soil pH level")
    soil_type: str = Field(..., example="loamy", description="Type of soil")

    # Optional climate/season info
    # temperature: Optional[float] = Field(None, example=28.5, description="Average temperature (°C)")
    # rainfall: Optional[float] = Field(None, example=120, description="Rainfall (mm)")
    # humidity: Optional[float] = Field(None, example=65, description="Relative humidity (%)")
    # season: Optional[str] = Field(None, example="Kharif", description="Growing season or region")
