import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SoilDetection() {
  const [formData, setFormData] = useState({
    ph: "", 
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temp: "",
    hum: "",
    rain: "",
  });

  const [errors, setErrors] = useState({});
  const [npk, setNpk] = useState(null);
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  // ✅ Input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // ✅ Validation
  const validateForm = () => {
    let newErrors = {};
    if (!formData.ph || formData.ph < 4.5 || formData.ph > 9.0)
      newErrors.ph = "pH must be between 4.5 and 9.0";
    if (!formData.temp || formData.temp < 5 || formData.temp > 50)
      newErrors.temp = "Temperature must be between 5 and 50 °C";
    if (!formData.hum || formData.hum < 10 || formData.hum > 100)
      newErrors.hum = "Humidity must be between 10 and 100 %";
    if (!formData.rain || formData.rain < 50 || formData.rain > 3000)
      newErrors.rain = "Rainfall must be between 50 and 3000 mm";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ IoT Data Fetch
  const handleFetchIoTData = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/iot/soil-test");
      if (res.status === 200) {
        const data = res.data.data || {};
        setFormData((prev) => ({
          ...prev,
          temp: data.temperature || prev.temp,
          hum: data.humidity || prev.hum,
          rain: data.water_level || prev.rain, 
        }));
      }
    } catch (err) {
      console.error("Error fetching IoT data:", err);
    }
  };

  // ✅ Get Recommendation (NPK + Crop)
  const handleGetRecommendation = async () => {
    if (!validateForm()) return;

    try {
      // 1. Get NPK prediction
      const npkRes = await axios.post("http://127.0.0.1:8000/soil/npk", {
        ph: formData.ph,
        temperature: formData.temp,
        humidity: formData.hum,
        rainfall: formData.rain,
      });

      const { N, P, K } = npkRes.data;
      setNpk({ N, P, K });

      // ✅ Update formData with NPK
      setFormData((prev) => ({
        ...prev,
        nitrogen: N,
        phosphorus: P,
        potassium: K,
      }));

      // 2. Get Crop Recommendation
      const cropRes = await axios.post("http://127.0.0.1:8000/ai/soil/crop/recommendation", {
        N,
        P,
        K,
        ph: formData.ph,
        temp: formData.temp,
        hum: formData.hum,
        rain: formData.rain,
      });

      if (cropRes.status === 200) {
        let reco = cropRes.data.response;
        if (typeof reco === "string") {
          try {
            reco = JSON.parse(reco);
          } catch {
            console.error("Invalid JSON format from backend:", reco);
          }
        }
        setResult(JSON.stringify(reco, null, 2));

        // ✅ Console log before navigate
        console.log("Form Data before navigate:", {
          ...formData,
          nitrogen: N,
          phosphorus: P,
          potassium: K,
        });

        navigate("/result", {
          state: {
            recoCrop: reco,
            formData: { ...formData, nitrogen: N, phosphorus: P, potassium: K },
          },
        });
      }
    } catch (err) {
      console.error("Error fetching recommendation:", err);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center pt-20 px-4">
      <h1 className="text-3xl font-bold text-green-700 mb-8">
        Soil Detection
      </h1>

      <div className="w-full max-w-3xl bg-white border border-green-600 shadow-lg rounded-xl p-8">
        {/* Inputs */}
        <form className="space-y-4 text-left">
          <input
            type="number"
            name="ph"
            value={formData.ph}
            onChange={handleChange}
            placeholder="pH (4.5 - 9.0)"
            min="4.5"
            max="9.0"
            step="0.1"
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.ph && <p className="text-red-600 text-sm">{errors.ph}</p>}

          <input
            type="number"
            name="temp"
            value={formData.temp}
            onChange={handleChange}
            placeholder="Temperature (5 - 50 °C)"
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.temp && <p className="text-red-600 text-sm">{errors.temp}</p>}

          <input
            type="number"
            name="hum"
            value={formData.hum}
            onChange={handleChange}
            placeholder="Humidity (10 - 100 %)"
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.hum && <p className="text-red-600 text-sm">{errors.hum}</p>}

          <input
            type="number"
            name="rain"
            value={formData.rain}
            onChange={handleChange}
            placeholder="Rainfall (50 - 3000 mm)"
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.rain && <p className="text-red-600 text-sm">{errors.rain}</p>}
        </form>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleFetchIoTData}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition"
          >
            Get Data from IoT
          </button>

          <button
            onClick={handleGetRecommendation}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition"
          >
            Get Recommendation
          </button>
        </div>
      </div>

      {/* Show Predicted NPK preview */}
      {npk && (
        <div className="mt-8 bg-blue-50 text-blue-800 px-6 py-4 rounded-lg shadow max-w-3xl">
          <h3 className="font-bold">Predicted NPK</h3>
          <p>Nitrogen: {npk.N.toFixed(2)}</p>
          <p>Phosphorus: {npk.P.toFixed(2)}</p>
          <p>Potassium: {npk.K.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
