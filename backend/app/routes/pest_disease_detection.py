# app/routes/pest_disease_detection.py
from fastapi import APIRouter, UploadFile, File
import tensorflow as tf
import numpy as np
from PIL import Image

router = APIRouter()

model = tf.keras.models.load_model("app/models/pest_disease_cnn_model.h5")
class_names = ["healthy", "early_blight", "late_blight"]  # update with your dataset classes

@router.post("/detect")
async def detect_disease(file: UploadFile = File(...)):
    image = Image.open(file.file).resize((224, 224))
    img_array = np.array(image) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)
    disease_class = class_names[np.argmax(prediction)]
    confidence = float(np.max(prediction))
    return {"disease": disease_class, "confidence": round(confidence, 3)}
