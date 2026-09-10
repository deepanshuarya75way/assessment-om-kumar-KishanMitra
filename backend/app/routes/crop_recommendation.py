from fastapi import APIRouter
from pydantic import BaseModel
from app.services.crop_service import predict_crop

router = APIRouter()

# Input Schema
class CropInput(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float
    NPK: float
    THI: float

@router.post("/predict")
def get_crop_recommendation(data: CropInput):
    result = predict_crop(data.dict())
    return {"recommended_crop": result}
