import os
import pandas as pd
import joblib

MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "models", "crop_yield_prediction", "random_forest_yield_model.pkl")

_model = None

def get_model():
    global _model
    if _model is None:
        if os.path.exists(MODEL_PATH):
            _model = joblib.load(MODEL_PATH)
        else:
            raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")
    return _model

def predict_yield(data: dict):
    model = get_model()
    df = pd.DataFrame([data], columns=[
        "Crop", "Crop_Year", "Season", "State", 
        "Area", "Production", "Annual_Rainfall", 
        "Fertilizer", "Pesticide"
    ])
    predicted = model.predict(df)[0]
    return {"predicted_yield": float(predicted)}
