import pandas as pd
import joblib

# Load your trained model (change path if needed)
model = joblib.load(r"app\models\crop_yield_prediction\random_forest_yield_model.pkl")

def predict_yield(data: dict):
    # Convert input dict to DataFrame with all required columns
    df = pd.DataFrame([data], columns=[
        "Crop", "Crop_Year", "Season", "State", 
        "Area", "Production", "Annual_Rainfall", 
        "Fertilizer", "Pesticide"
    ])
    
    # Predict using pipeline (automatically handles encoders + scaler)
    predicted = model.predict(df)[0]
    
    return {"predicted_yield": float(predicted)}
