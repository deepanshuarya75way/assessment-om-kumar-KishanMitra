# routes/plant_disease.py
import os
from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
from werkzeug.utils import secure_filename
import re
import json

from app.services.plant_disease import allowed_file, predict_image, UPLOAD_FOLDER
from app.services.ai import generate_ai_response
router = APIRouter()


@router.post("/predict_disease")
async def predict_disease(file: UploadFile = File(...)):
    """Upload plant leaf image and get live AI-powered disease prediction"""
    if not allowed_file(file.filename):
        return JSONResponse(content={"error": "Invalid file format"}, status_code=400)

    filename = secure_filename(file.filename)
    file_path = os.path.join(UPLOAD_FOLDER, filename)

    # Save file
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    try:
        # ✅ Local ML model prediction
        prediction = predict_image(file_path)

        # ✅ Live AI insights from Groq
        ai_response = generate_ai_response(prediction)
        # clean_text = re.sub(r"^```json\s*|\s*```$", "", ai_response.strip(), flags=re.MULTILINE)
        # try:
        #     ai_json = json.loads(clean_text)
        # except Exception as e:
        #     print("❌ JSON parsing failed:", e)
        # ai_json = {
        #     "disease": prediction.get("class_name", "Unknown"),
        #     "what_is_this": "",
        #     "causes": [],
        #     "treatment": [],
        #     "prevention": [],
        # }
        return {
            "prediction": prediction,
            "ai_insights": ai_response
        }

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
