from fastapi import APIRouter
from pydantic import BaseModel
from app.services.ai import get_ai_response, crop_recommendation, fertilizer_recommendation, yield_recommendation, crop_rotation, seed_recommendation, crop_defination, crop_reco, crop_grow_process, soil_comparison, crop_grow_cycle, crop_fertilizer, crop_yield, chat_response , mandi_price, mandi_price_graph, user_want_crop_grow
from app.schemas.crop_schema import SoilInput
from app.schemas.fert_schema import FertilizerRequest
from app.schemas.yield_schema import YieldInput
from app.schemas.Crop_rotation_schema import CropRotationInput
from app.schemas.seed_schema import SeedRecommendationInput
from app.schemas.mandi_schema import mandiInput
router = APIRouter()

# Pydantic model for request body
class PromptRequest(BaseModel):
    prompt: str

soil_report = ""
@router.post("/chat")
def chat_with_ai(request: PromptRequest):
    """
    Endpoint to generate AI response from Groq chat model.
    """
    response = chat_response(request.prompt)
    return {"prompt": request.prompt, "response": response}


@router.post("/soil/crop/recommendation")
def crop_recommendation_route(data: SoilInput):
    response = crop_recommendation(data)
    return {"response": response}

@router.post("/soil/crop/fertilize")
def fertilizer_recommendation_route(data: SoilInput):
    soil_report = data
    response = fertilizer_recommendation(data)
    return {"response": response}

@router.post("/soil/yield/recommendation")
def yield_recommendation_route(data: YieldInput):
    response = yield_recommendation(data)
    return {"response": response}

@router.post("/soil/crop/rotation")
def crop_rotation_route(data: CropRotationInput):
    response = crop_rotation(data)
    return {"response": response}

@router.post("/soil/seed/recommendatation")
def seed_recommendation_route(data: SeedRecommendationInput):
    response = seed_recommendation(data)
    return {"response": response}

@router.get("/crop/details/{cropName}")
def crop_defination_route(cropName):
    response = crop_defination(cropName)
    return {"response": response}


@router.get("/crop/grow/{cropName}")
def crop_defination_route(cropName):
    response = crop_grow_process(cropName)
    return {"response": response}


@router.get("/crop/why/reco/{cropName}")
def crop_defination_route(cropName):
    response = crop_reco(cropName)
    return {"response": response}

@router.post("/crop/soil_comparison/{cropName}")
def soil_comparison_route(cropName: str, data: SoilInput):
    return {"response": soil_comparison(cropName, data)}

@router.get('/crop/grow/cycle/{cropName}')
def crop_grow_route(cropName):
    response = crop_grow_cycle(cropName)
    return {"response" : response}

@router.get('/crop/fertilizer/{cropName}')
def crop_fertilizer_route(cropName):
    response = crop_fertilizer(cropName)
    return {"response" : response}

@router.get("/crop/yield/{cropName}")
def crop_yield_route(cropName: str, soil: str = "", weather: str = "", variety: str = ""):
    response = crop_yield(cropName, soil, weather, variety)
    return {"response": response}
@router.post("/mandi/price")
def mandi_price_route(data: mandiInput):
    return {"response": mandi_price(data.state, data.District, data.Market, data.Commodity)}

@router.post("/mandi/price/graph")
def mandi_price_graph_route(data: mandiInput):
    return {"response": mandi_price_graph(data.state, data.District, data.Market, data.Commodity)}

@router.post("/crop/grow/user_want/{cropName}")
def user_want_crop_grow_route(cropName: str, data: SoilInput):
    return {"response": user_want_crop_grow(cropName, data)}
