import joblib
import numpy as np

async def analyze_soil(data):
    # Load trained model
    model = joblib.load('app/models/crop_recommendation_model.joblib')

    # Load the LabelEncoder used during training
    label_encoder = joblib.load('app/models/label_encoder.pkl') 

    features = np.array([[ 
        data.N,
        data.P,
        data.K,
        data.temperature,
        data.humidity,
        data.ph,
        data.rainfall,
        data.NPK,
        data.THI,
        data.rainfall_level,
        data.ph_category,
        data.temp_rain_interaction,
        data.ph_rain_interaction
    ]])
    pred_encoded = model.predict(features)[0]
    # Convert encoded label back to crop name
    recommended_crop = label_encoder.inverse_transform([pred_encoded])[0]

    return recommended_crop