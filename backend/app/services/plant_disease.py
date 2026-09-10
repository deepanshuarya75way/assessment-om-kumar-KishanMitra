import os
import numpy as np
from PIL import Image
from app.services.ai import get_ai_response

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "..", "..", "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "models", "plant_disease_prediction", "plant_disease_prediction_model.h5")

_model = None

def get_model():
    global _model
    if _model is None:
        from tensorflow.keras.models import load_model
        if os.path.exists(MODEL_PATH):
            _model = load_model(MODEL_PATH)
        else:
            raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")
    return _model

classes = [
    'Apple___Apple_scab',
    'Apple___Black_rot',
    'Apple___Cedar_apple_rust',
    'Apple___healthy',
    'Blueberry___healthy',
    'Cherry_(including_sour)___Powdery_mildew',
    'Cherry_(including_sour)___healthy',
    'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
    'Corn_(maize)___Common_rust_',
    'Corn_(maize)___Northern_Leaf_Blight',
    'Corn_(maize)___healthy',
    'Grape___Black_rot',
    'Grape___Esca_(Black_Measles)',
    'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
    'Grape___healthy',
    'Orange___Haunglongbing_(Citrus_greening)',
    'Peach___Bacterial_spot',
    'Peach___healthy',
    'Pepper,_bell___Bacterial_spot',
    'Pepper,_bell___healthy',
    'Potato___Early_blight',
    'Potato___Late_blight',
    'Potato___healthy',
    'Raspberry___healthy',
    'Soybean___healthy',
    'Squash___Powdery_mildew',
    'Strawberry___Leaf_scorch',
    'Strawberry___healthy',
    'Tomato___Bacterial_spot',
    'Tomato___Early_blight',
    'Tomato___Late_blight',
    'Tomato___Leaf_Mold',
    'Tomato___Septoria_leaf_spot',
    'Tomato___Spider_mites Two-spotted_spider_mite',
    'Tomato___Target_Spot',
    'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
    'Tomato___Tomato_mosaic_virus',
    'Tomato___healthy'
]

descriptions = {
    'Apple___Apple_scab': 'Apple scab is a fungal disease that primarily affects apple trees.',
    'Apple___Black_rot': 'Black rot is caused by the fungus Botryosphaeria obtusa.',
    'Apple___Cedar_apple_rust': 'Cedar apple rust is a fungal disease affecting apple trees.',
    'Apple___healthy': 'The apple tree and fruit show no signs of disease.',
    'Blueberry___healthy': 'The blueberry plant is in a healthy state.',
    'Cherry_(including_sour)___Powdery_mildew': 'Powdery mildew is a fungal disease affecting cherry trees.',
    'Cherry_(including_sour)___healthy': 'The cherry tree shows no signs of disease.',
    'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot': 'Cercospora leaf spot affects maize.',
    'Corn_(maize)___Common_rust_': 'Common rust in maize forms red-brown pustules.',
    'Corn_(maize)___Northern_Leaf_Blight': 'Northern Leaf Blight results in grayish lesions on maize.',
    'Corn_(maize)___healthy': 'The maize plant is healthy.',
    'Grape___Black_rot': 'Black rot affects grapevines causing black spots.',
    'Grape___Esca_(Black_Measles)': 'Esca leads to leaf striping and fruit rot.',
    'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)': 'Leaf blight causes dark brown spots on grape leaves.',
    'Grape___healthy': 'The grapevine is in good health.',
    'Orange___Haunglongbing_(Citrus_greening)': 'Citrus Greening causes yellowing of leaves and green fruit.',
    'Peach___Bacterial_spot': 'Bacterial spot creates dark lesions on leaves.',
    'Peach___healthy': 'The peach tree is healthy.',
    'Pepper,_bell___Bacterial_spot': 'Bacterial spot creates dark lesions on bell pepper leaves.',
    'Pepper,_bell___healthy': 'The bell pepper plant is healthy.',
    'Potato___Early_blight': 'Early blight causes brown spots with concentric rings.',
    'Potato___Late_blight': 'Late blight causes dark lesions on potato leaves and tubers.',
    'Potato___healthy': 'The potato plant is healthy.',
    'Raspberry___healthy': 'The raspberry plant is healthy.',
    'Soybean___healthy': 'The soybean plant is healthy.',
    'Squash___Powdery_mildew': 'Powdery mildew causes white powdery spots on squash.',
    'Strawberry___Leaf_scorch': 'Leaf scorch leads to purple spots on strawberry leaves.',
    'Strawberry___healthy': 'The strawberry plant is healthy.',
    'Tomato___Bacterial_spot': 'Bacterial spot creates water-soaked lesions on tomato.',
    'Tomato___Early_blight': 'Early blight creates dark, target-like lesions.',
    'Tomato___Late_blight': 'Late blight causes water-soaked lesions on tomatoes.',
    'Tomato___Leaf_Mold': 'Leaf mold creates yellowish lesions on tomato leaves.',
    'Tomato___Septoria_leaf_spot': 'Septoria leaf spot causes small circular spots.',
    'Tomato___Spider_mites Two-spotted_spider_mite': 'Spider mites cause yellowing and stippling of leaves.',
    'Tomato___Target_Spot': 'Target spot leads to dark concentric lesions on leaves.',
    'Tomato___Tomato_Yellow_Leaf_Curl_Virus': 'TYLCV causes yellowing and curling of leaves.',
    'Tomato___Tomato_mosaic_virus': 'Tomato mosaic virus causes mottling and distortion.',
    'Tomato___healthy': 'The tomato plant is healthy.'
}

def allowed_file(filename):
    return filename.lower().endswith((".png", ".jpg", ".jpeg"))

def preprocess_image(file_path):
    img = Image.open(file_path).convert("RGB")
    img = img.resize((224, 224))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

def predict_image(file_path: str):
    model = get_model()
    preprocessed_image = preprocess_image(file_path)
    prediction = model.predict(preprocessed_image)
    class_idx = np.argmax(prediction)
    class_name = classes[class_idx]
    description = descriptions.get(class_name, "No description available.")
    return {
        "class_name": class_name,
        "description": description
    }