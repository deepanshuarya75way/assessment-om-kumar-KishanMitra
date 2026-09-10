from pydantic import BaseModel, Field

class SoilInput(BaseModel):
    N: float = Field(..., description="Nitrogen content in soil (kg/ha or ppm)")
    P: float = Field(..., description="Phosphorus content in soil (kg/ha or ppm)")
    K: float = Field(..., description="Potassium content in soil (kg/ha or ppm)")
    temp: float = Field(..., description="Average temperature (°C)")
    hum: float = Field(..., description="Relative humidity (%)")
    ph: float = Field(..., description="Soil pH level")
    rain: float = Field(..., description="Rainfall (mm)")