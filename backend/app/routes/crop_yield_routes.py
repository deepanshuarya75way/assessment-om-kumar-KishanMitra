from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services import crop_yield

router = APIRouter() 

# Input schema
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

@router.post("/")
def get_prediction(data: CropYieldInput):
    try:
        result = crop_yield.predict_yield(data.dict())
        return {"predicted_yield": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
