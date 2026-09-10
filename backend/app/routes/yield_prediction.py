# # app/routes/yield_prediction.py
# from fastapi import APIRouter
# from pydantic import BaseModel
# import joblib
# import numpy as np

# router = APIRouter()

# model = joblib.load("app/models/yield_prediction_model.joblib")

# class YieldRequest(BaseModel):
#     N: float
#     P: float
#     K: float
#     ph: float
#     rainfall: float
#     temperature: float
#     humidity: float
#     crop: str

# @router.post("/predict-yield")
# async def predict_yield(data: YieldRequest):
#     features = np.array([[data.N, data.P, data.K, data.ph,
#                           data.rainfall, data.temperature, data.humidity]])
#     prediction = model.predict(features)[0]
#     return {"expected_yield_kg_per_ha": round(float(prediction), 2)}
