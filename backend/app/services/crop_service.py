import os, joblib

# Base directory = app/
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Correct path to your model file
MODEL_PATH = os.path.join(BASE_DIR, "models", "crop_recommendation", "crop_recomodation_model.joblib")

print("Loading model from:", MODEL_PATH) 

model = joblib.load(MODEL_PATH)

def predict_crop(input_data: dict) -> str:
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
