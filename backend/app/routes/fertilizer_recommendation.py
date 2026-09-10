# app/routes/fertilizer_recommendation.py
from fastapi import APIRouter, HTTPException
from app.schemas.fert_schema import FertilizerRequest
from app.services.fert_service import recommend_fertilizer

router = APIRouter()

@router.post("/predict-fertilizer")
async def predict_fertilizer(req: FertilizerRequest):
    try:
        result = recommend_fertilizer(req.dict())
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
