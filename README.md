# 🌾 KishanMitra — AI Farmer Assistant

> An intelligent full-stack platform empowering Indian farmers with AI-driven crop recommendations, disease detection, real-time weather insights, market prices, and IoT-based field monitoring.

![Tech Stack](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue?style=flat-square&logo=react)
![Backend](https://img.shields.io/badge/Backend-FastAPI%20%2B%20Python-green?style=flat-square&logo=fastapi)
![AI](https://img.shields.io/badge/AI-Gemini%20%7C%20TensorFlow-orange?style=flat-square&logo=google)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

---

## 📁 Project Structure

```
KishanMitra/
├── frontend/          # React + Vite Web Application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Application pages
│   │   ├── Auth/         # Authentication (Login/Register)
│   │   ├── config/       # API config & constants
│   │   └── services/     # API service layer
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── backend/           # FastAPI Python Backend
    ├── app/
    │   ├── routes/       # API route handlers
    │   ├── services/     # Business logic & AI integrations
    │   ├── models/       # ML model files
    │   ├── schemas/      # Pydantic data schemas
    │   ├── database/     # DB connection & queries
    │   └── main.py       # App entry point
    ├── requirements.txt
    └── .env.example
```

---

## ✨ Features

| Feature | Description |
|---|---|
| 🌱 **Crop Recommendation** | ML model recommends best crops based on soil NPK, pH, temperature, humidity & rainfall |
| 🍃 **Plant Disease Detection** | Deep Learning (CNN/TensorFlow) model to detect plant diseases from leaf images |
| 🌤️ **Weather Forecast** | Real-time 7-day weather forecast with farming insights |
| 📈 **Market Prices** | Live mandi prices for crops across India |
| 🤖 **AI Chatbot** | Google Gemini powered farming assistant for natural language queries |
| 💧 **IoT Dashboard** | Real-time soil moisture, temperature & field sensor monitoring |
| 📅 **Smart Scheduling** | Automated SMS alerts (Twilio) for irrigation & task scheduling |
| 🧪 **NPK Advisor** | XGBoost models to recommend N, P, K fertilizer values |

---

## 🧑‍💻 My Contributions

This project was built as a team effort. My key contributions include:

- **Complete Frontend Development** — Built the entire React + Vite + Tailwind CSS web application from scratch, including all pages, components, routing, and authentication flow
- **Backend AI Integration** — Integrated Google Gemini API for the AI chatbot (`/ai` & `/nlp` endpoints), handling prompt engineering and response formatting
- **Weather & Market Price Modules** — Designed and implemented the weather forecast and live mandi price API routes and frontend UI
- **Plant Disease AI/ML Model** — Trained and integrated the CNN-based plant disease prediction model using TensorFlow/Keras (`plant_disease_prediction_model.h5`) with 38+ disease classes
- **IoT Dashboard** — Built the real-time IoT sensor monitoring interface and backend route
- **API Architecture** — Structured the FastAPI backend with modular routes, schemas, and services

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- Python >= 3.10
- pip / virtualenv

---

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env     # Fill in your API base URL
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

### Backend Setup

```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt
cp .env.example .env     # Fill in your API keys
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend runs at: `http://localhost:8000`  
API Docs: `http://localhost:8000/docs`

---

## 🤖 ML Models

Large model files are **not included** in this repository due to GitHub's 100MB file size limit.

| Model | Size | Purpose |
|---|---|---|
| `plant_disease_prediction_model.h5` | ~547 MB | CNN model — 38 plant disease classes |
| `random_forest_yield_model.pkl` | ~133 MB | Crop yield prediction |

> **To use these models:** Train them using the scripts in `backend/app/ml_code/` or contact the repository owner for download links.

Small models included in the repo:
- `crop_recomodation_model.joblib` — Crop recommendation
- `npk_model_*.joblib` — NPK fertilizer prediction (XGBoost)

---

## 🔑 Environment Variables

### Backend (`backend/.env`)
```env
PORT=8000
HOST=0.0.0.0
GEMINI_API_KEY=your_gemini_api_key
TWILIO_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE=your_twilio_phone
USER_PHONE=your_target_phone
CORS_ORIGINS=http://localhost:5173
```

### Frontend (`frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_URL=http://localhost:8000
```

---

## 🛠️ Tech Stack

**Frontend:**
- React 18 + Vite
- Tailwind CSS
- React Router DOM
- Axios

**Backend:**
- FastAPI (Python)
- TensorFlow / Keras
- Scikit-learn / XGBoost / Joblib
- Google Generative AI (Gemini)
- Twilio (SMS)
- SQLAlchemy / SQLite

---

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">Made with ❤️ for Indian Farmers 🇮🇳</p>
