import os
import numpy as np
from PIL import Image
from tensorflow.keras.models import load_model
from app.services.ai import get_ai_response

# Config
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ✅ Absolute path for model
MODEL_PATH = r"D:\farmer_backend\Backend\app\models\plant_disease_prediction\plant_disease_prediction_model.h5"

# Load your model
model = load_model(MODEL_PATH)

# Classes and descriptions (as you defined earlier)
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
descriptions = {'Apple___Apple_scab': 'Apple scab is a fungal disease that primarily affects apple trees. It is caused by the fungus Venturia inaequalis and results in dark, sunken lesions on the leaves and fruit. This disease can lead to premature leaf drop and reduce fruit quality.',
    'Apple___Black_rot': 'Black rot is caused by the fungus Botryosphaeria obtusa. It affects apple trees, causing dark, sunken lesions on fruit, stems, and leaves. Fruit infected with black rot often develop concentric rings, making them unusable.',
    'Apple___Cedar_apple_rust': 'Cedar apple rust is a fungal disease that affects both apple trees and Eastern red cedar trees. It causes bright orange spots on apple leaves and fruit, and galls on cedar trees. Severe infections can reduce fruit yield.',
    'Apple___healthy': 'The apple tree and fruit show no signs of disease. It is in good health and free of infections or fungal growth.',
    'Blueberry___healthy': 'The blueberry plant is in a healthy state with no visible signs of disease or damage.',
    'Cherry_(including_sour)___Powdery_mildew': 'Powdery mildew is a fungal disease affecting cherry trees. It causes a white, powdery growth on the leaves, stems, and fruit. In severe cases, it can lead to defoliation and reduced fruit quality.',
    'Cherry_(including_sour)___healthy': 'The cherry tree shows no signs of powdery mildew or other diseases and is in good health.',
    'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot': 'Cercospora leaf spot, also known as Gray leaf spot, is a fungal disease that affects maize. It causes grayish lesions on the leaves, which can coalesce and cause premature leaf death, reducing yield.',
    'Corn_(maize)___Common_rust_': 'Common rust in maize is caused by the fungus Puccinia sorghi. It forms red-brown pustules on the leaves and stems, which can reduce photosynthesis and crop yield if severe.',
    'Corn_(maize)___Northern_Leaf_Blight': 'Northern Leaf Blight is caused by the fungus Exserohilum turcicum. It results in long, elliptical grayish lesions on maize leaves, which can significantly reduce crop yield.',
    'Corn_(maize)___healthy': 'The maize plant is healthy with no signs of fungal infections or leaf damage.',
    'Grape___Black_rot': 'Black rot is a fungal disease caused by Guignardia bidwellii. It affects grapevines, causing black spots on leaves, stems, and fruit. Severe infections can lead to crop loss.',
    'Grape___Esca_(Black_Measles)': 'Esca or Black Measles is a complex disease affecting grapevines, leading to leaf striping, fruit rot, and wood deterioration. It is caused by a combination of fungal pathogens.',
    'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)': 'Leaf blight in grapes is caused by the fungus Isariopsis. It creates dark brown spots on leaves, which can lead to premature leaf drop and reduced fruit yield.',
    'Grape___healthy': 'The grapevine is in good health, with no signs of fungal infections or other diseases.',
    'Orange___Haunglongbing_(Citrus_greening)': 'Huanglongbing, also known as Citrus Greening, is a bacterial disease spread by insects. It causes yellowing of leaves, green, misshapen fruit, and eventually tree death if left unmanaged.',
    'Peach___Bacterial_spot': 'Bacterial spot is a disease caused by the bacterium Xanthomonas campestris. It results in small, dark lesions on leaves, stems, and fruit, leading to reduced fruit quality and tree vigor.',
    'Peach___healthy': 'The peach tree is healthy, with no signs of bacterial infections or other diseases.',
    'Pepper,_bell___Bacterial_spot': 'Bacterial spot is caused by the bacterium Xanthomonas vesicatoria, affecting bell pepper plants. It creates dark, water-soaked lesions on leaves and fruit, reducing quality and yield.',
    'Pepper,_bell___healthy': 'The bell pepper plant is in good health, showing no signs of bacterial or fungal infections.',
    'Potato___Early_blight': 'Early blight is a common fungal disease in potatoes caused by Alternaria solani. It leads to brown spots with concentric rings on leaves, which can reduce yield if left untreated.',
    'Potato___Late_blight': 'Late blight is a severe disease caused by the oomycete Phytophthora infestans. It causes dark lesions on leaves and tubers, leading to widespread crop loss if not managed.',
    'Potato___healthy': 'The potato plant is in good health, free from early or late blight and other diseases.',
    'Raspberry___healthy': 'The raspberry plant is healthy with no signs of disease or damage.',
    'Soybean___healthy': 'The soybean plant is in good health, showing no signs of disease or pest damage.',
    'Squash___Powdery_mildew': 'Powdery mildew is a fungal disease that affects squash plants, causing white, powdery spots on the leaves. If left untreated, it can reduce yield and plant vigor.',
    'Strawberry___Leaf_scorch': 'Leaf scorch in strawberries is caused by the fungus Diplocarpon earlianum. It leads to purple spots on leaves, which can coalesce and cause leaf death, reducing fruit yield.',
    'Strawberry___healthy': 'The strawberry plant is healthy, showing no signs of leaf scorch or other diseases.',
    'Tomato___Bacterial_spot': 'Bacterial spot is caused by Xanthomonas bacteria in tomatoes, creating water-soaked lesions on leaves and fruit. It can significantly reduce yield and fruit quality.',
    'Tomato___Early_blight': 'Early blight is caused by the fungus Alternaria solani in tomatoes. It creates dark, target-like lesions on leaves, reducing the plant’s ability to photosynthesize.',
    'Tomato___Late_blight': 'Late blight is a devastating disease in tomatoes caused by Phytophthora infestans, which causes water-soaked lesions on leaves and fruit, often leading to total crop loss.',
    'Tomato___Leaf_Mold': 'Leaf mold is caused by the fungus Fulvia fulva, which creates yellowish lesions on tomato leaves, reducing photosynthesis and yield.',
    'Tomato___Septoria_leaf_spot': 'Septoria leaf spot is a fungal disease caused by Septoria lycopersici, leading to small, circular spots on leaves that can cause defoliation and reduce fruit yield.',
    'Tomato___Spider_mites Two-spotted_spider_mite': 'Two-spotted spider mites are common pests in tomatoes, causing yellowing and stippling of leaves due to their feeding, which can reduce plant vigor.',
    'Tomato___Target_Spot': 'Target spot is caused by the fungus Corynespora cassiicola in tomatoes, leading to dark, concentric lesions on leaves, which can cause defoliation and reduce yield.',
    'Tomato___Tomato_Yellow_Leaf_Curl_Virus': 'Tomato Yellow Leaf Curl Virus (TYLCV) is spread by whiteflies, causing yellowing, curling, and stunting of tomato leaves. It can drastically reduce fruit yield.',
    'Tomato___Tomato_mosaic_virus': 'Tomato mosaic virus is a highly contagious viral disease that causes mottling and distortion of leaves, reducing plant vigor and fruit quality.',
    'Tomato___healthy': 'The tomato plant is healthy with no signs of bacterial, fungal, or viral infections.'
    }

# Allowed extensions
def allowed_file(filename):
    return filename.lower().endswith((".png", ".jpg", ".jpeg"))

# Preprocess image
def preprocess_image(file_path):
    img = Image.open(file_path).convert("RGB")  # force convert to RGB
    img = img.resize((224, 224))  # apne model ke input size ke hisaab se
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)  # (1, 224, 224, 3)
    return img_array

def predict_image(file_path: str):
    """Run model prediction and return class + description"""
    preprocessed_image = preprocess_image(file_path)
    prediction = model.predict(preprocessed_image)
    class_idx = np.argmax(prediction)
    class_name = classes[class_idx]
    description = descriptions.get(class_name, "No description available.")
    model_responce = {
        "class_name": class_name,
        "description": description
    }
    return model_responce