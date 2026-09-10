from pydantic import BaseModel

class CropYieldInput(BaseModel):
    Crop: str
    Crop_Year: int
    Season: str
    State: str
    Area: float
    Production: float
    Annual_Rainfall: float
    Fertilizer: float
    Pesticide: float
