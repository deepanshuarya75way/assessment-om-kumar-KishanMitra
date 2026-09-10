# # app/routes/crop_rotation.py
# from fastapi import APIRouter
# from pydantic import BaseModel
# import joblib
# import numpy as np

# router = APIRouter()

# model = joblib.load("app/models/rotation_model.joblib")

# class RotationRequest(BaseModel):
#     last_crop: str
#     N: float
#     P: float
#     K: float

# @router.post("/next-crop")
# async def next_crop(data: RotationRequest):
#     features = np.array([[data.N, data.P, data.K]])
#     prediction = model.predict(features)[0]
#     return {"next_suitable_crop": prediction}
