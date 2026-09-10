from fastapi import APIRouter, HTTPException
from app.entity.soil_entity import SoilInput
from app.services.soil_service import analyze_soil

router = APIRouter()

@router.post("/test/crop-suggest")
async def analyze_soil_route(soil_data: SoilInput):
    try:
        result = await analyze_soil(soil_data)
        return {"status": "success", "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
