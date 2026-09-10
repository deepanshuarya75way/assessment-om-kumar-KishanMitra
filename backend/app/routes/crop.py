import joblib
import os
import numpy as np
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

# Path to models and scaler (relative to routes/crop.py)
# MODEL_DIR = "../models"  # Adjust if subfolder (e.g., "../models/npk_models")
# try:
    # model_n = joblib.load(os.path.join(MODEL_DIR, "npk_model_N_xgboost.joblib"))
    # model_p = joblib.load(os.path.join(MODEL_DIR, "npk_model_P_xgboost.joblib"))
    # model_k = joblib.load(os.path.join(MODEL_DIR, "npk_model_K_xgboost.joblib"))

model_n = joblib.load(r"app\models\npk_models\npk_model_K_xgboost.joblib")
model_p = joblib.load(r"app\models\npk_models\npk_model_P_xgboost.joblib")
model_k = joblib.load(r"app\models\npk_models\npk_model_K_xgboost.joblib")
scaler = joblib.load(r"app\models\npk_models\npk_scaler.joblib")
    # scaler = joblib.load(os.path.join(MODEL_DIR, "npk_scaler.joblib"))
    # print(f"Models loaded from {os.path.abspath(MODEL_DIR)}")
# except FileNotFoundError as e:
#     raise RuntimeError(f"Model or scaler file missing in {os.path.abspath(MODEL_DIR)}: {e}")

# Schema with only required fields, others optional
class SoilInput(BaseModel):
    ph: float
    temperature: float
    humidity: float
    rainfall: float
    # temp: Optional[float] = None
    # hum: Optional[float] = None
    # rain: Optional[float] = None
    # soil_moisture: Optional[float] = None
    # N: Optional[float] = None
    # P: Optional[float] = None
    # K: Optional[float] = None

@router.post("/npk")
def soil_comparison_route(data: SoilInput):
    try:
        # Prepare features in the same order as training
        features = np.array([[data.ph, data.temperature, data.humidity, data.rainfall]])
        # Scale features
        features_scaled = scaler.transform(features)
        # Predict N, P, K
        n_pred = float(model_n.predict(features_scaled)[0])
        p_pred = float(model_p.predict(features_scaled)[0])
        k_pred = float(model_k.predict(features_scaled)[0])
        # Return predictions
        return {
            "N": n_pred,
            "P": p_pred,
            "K": k_pred
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")