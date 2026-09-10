import os
import joblib

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "models", "crop_recommendation", "crop_recomodation_model.joblib")

_model = None

def get_model():
    global _model
    if _model is None:
        if os.path.exists(MODEL_PATH):
            _model = joblib.load(MODEL_PATH)
        else:
            raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")
    return _model

def predict_crop(input_data: dict) -> str:
    model = get_model()
    features = [
        input_data["N"],
        input_data["P"],
        input_data["K"],
        input_data["temperature"],
        input_data["humidity"],
        input_data["ph"],
        input_data["rainfall"]
    ]
    prediction = model.predict([features])[0]
    return prediction
