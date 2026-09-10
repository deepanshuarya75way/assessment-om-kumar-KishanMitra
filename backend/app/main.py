import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
import asyncio

from app.routes import weather, ai_routes , price_router ,crop_yield_routes,crop_recommendation,plant_disease,ai_routes,schedule_routes,iot_route,crop

load_dotenv()

app = FastAPI(title="Soil & Crop AI Suite")

cors_origins_env = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173")
origins = [origin.strip() for origin in cors_origins_env.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins if origins else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], 
)


app.include_router(crop_recommendation.router, prefix="/crop", tags=["Crop Recommendation"])
# app.include_router(fertilizer_recommendation.router, prefix="/fertilizer", tags=["Fertilizer Recommendation"])
# app.include_router(yield_prediction.router, prefix="/yield", tags=["Yield Prediction"])
# app.include_router(crop_rotation.router, prefix="/rotation", tags=["Crop Rotation"])
# app.include_router(pest_disease_detection.router, prefix="/pest", tags=["Pest & Disease Detection"])
# app.include_router(seed_recommendation.router, prefix="/seed", tags=["Seed Recommendation"])

app.include_router(weather.router, prefix="/weather")
app.include_router(ai_routes.router, prefix="/ai")
app.include_router(price_router.router, prefix="/get_price", tags=["price"])
# app.include_router(crop_yield_routes.router, prefix="/predict_yield", tags=["yield"])
app.include_router(plant_disease.router, tags=["disease prediction"])
app.include_router(ai_routes.router, prefix="/nlp", tags=["nlp"])
app.include_router(schedule_routes.router, prefix="/schedule", tags=["Schedule"])
app.include_router(iot_route.router, prefix="/iot", tags=["iot"])
app.include_router(crop.router, prefix="/soil", tags=["npk Recommendation"])


@app.on_event("startup")
async def startup_event():
    asyncio.create_task(schedule_routes.scheduler_loop())

