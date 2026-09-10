# # app/services/fert_service.py
# import joblib
# import numpy as np

# # Load artifacts
# scaler = joblib.load("app/models/fertilizer_recommendation/fertilizer_scaler.joblib")
# crop_encoder = joblib.load("app/models/fertilizer_recommendation/crop_encoder.joblib")
# fertilizer_encoder = joblib.load("app/models/fertilizer_recommendation/fertilizer_encoder.joblib")
# feature_names = joblib.load("app/models/fertilizer_recommendation/fertilizer_feature_names.joblib")
# model = joblib.load("app/models/fertilizer_recommendation/fertilizer_recommendation.joblib")

# def recommend_fertilizer(input_data: dict):
#     # Convert crop string into encoded value
#     crop_encoded = crop_encoder.transform([input_data["Crops"]])[0]

#     # Prepare feature vector in the SAME order as feature_names
#     feature_vector = []
#     for col in feature_names:
#         if col == "Crops":
#             feature_vector.append(crop_encoded)
#         else:
#             feature_vector.append(input_data[col])

#     X = np.array([feature_vector])

#     # Scale features
#     X_scaled = scaler.transform(X)

#     # Predict fertilizer
#     y_pred = model.predict(X_scaled)[0]
#     fertilizer = fertilizer_encoder.inverse_transform([y_pred])[0]

#     return {"recommended_fertilizer": fertilizer}
