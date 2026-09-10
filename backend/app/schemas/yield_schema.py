from pydantic import BaseModel, Field

class YieldInput(BaseModel):
    # crop_type: str = Field(..., example="wheat", description="Type of crop")
    
    # Soil parameters
    nitrogen: float = Field(..., example=50, description="Nitrogen content in soil (kg/ha or ppm)")
    phosphorus: float = Field(..., example=40, description="Phosphorus content in soil (kg/ha or ppm)")
    potassium: float = Field(..., example=30, description="Potassium content in soil (kg/ha or ppm)")
    ph: float = Field(..., example=6.5, description="Soil pH level")

    # Climate parameters
    temperature: float = Field(..., example=28.5, description="Average temperature (°C)")
    rainfall: float = Field(..., example=120, description="Rainfall (mm)")
    humidity: float = Field(..., example=65, description="Relative humidity (%)")

    # Farming practice (optional)
    # sowing_date: str = Field(..., example="2025-06-15", description="Date of sowing (YYYY-MM-DD)")
