import os
import joblib
import numpy as np
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

MODEL_DIR = os.path.join(os.path.dirname(__file__), "..", "models", "npk_models")

_model_n = None
_model_p = None
_model_k = None
_scaler = None

def get_npk_resources():
    global _model_n, _model_p, _model_k, _scaler
    if _model_n is None:
        path_n = os.path.join(MODEL_DIR, "npk_model_N_xgboost.joblib")
        path_p = os.path.join(MODEL_DIR, "npk_model_P_xgboost.joblib")
        path_k = os.path.join(MODEL_DIR, "npk_model_K_xgboost.joblib")
        path_scaler = os.path.join(MODEL_DIR, "npk_scaler.joblib")

        _model_n = joblib.load(path_n)
        _model_p = joblib.load(path_p)
        _model_k = joblib.load(path_k)
        _scaler = joblib.load(path_scaler)

    return _model_n, _model_p, _model_k, _scaler

class SoilInput(BaseModel):
    ph: float
    temperature: float
    humidity: float
    rainfall: float

@router.post("/npk")
def soil_comparison_route(data: SoilInput):
    try:
        model_n, model_p, model_k, scaler = get_npk_resources()
        features = np.array([[data.ph, data.temperature, data.humidity, data.rainfall]])
        features_scaled = scaler.transform(features)
        n_pred = float(model_n.predict(features_scaled)[0])
        p_pred = float(model_p.predict(features_scaled)[0])
        k_pred = float(model_k.predict(features_scaled)[0])
        return {
            "N": n_pred,
            "P": p_pred,
            "K": k_pred
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")