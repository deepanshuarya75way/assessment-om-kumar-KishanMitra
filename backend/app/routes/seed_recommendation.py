# app/routes/seed_recommendation.py
from fastapi import APIRouter
from pydantic import BaseModel
import joblib
import numpy as np

router = APIRouter()

model = joblib.load("app/models/seed_recommendation_model.joblib")

class SeedRequest(BaseModel):
    soil_type: str
    region: str
    rainfall: float
    temperature: float
    humidity: float

@router.post("/recommend-seed")
async def recommend_seed(data: SeedRequest):
    features = np.array([[data.rainfall, data.temperature, data.humidity]])
    prediction = model.predict(features)[0]
    return {"recommended_seed_variety": prediction}
