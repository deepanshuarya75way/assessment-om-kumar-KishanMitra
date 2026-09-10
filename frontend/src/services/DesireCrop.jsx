import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function DesireCrop() {
  const location = useLocation();
  const navigate = useNavigate();
  const { crop, formData } = location.state || {};
  const [data, setData] = useState([]);

  const handleCrop = async () => {
    try {
      const payload = {
        N: Number(formData.nitrogen),
        P: Number(formData.phosphorus),
        K: Number(formData.potassium),
        temp: Number(formData.temp),
        hum: Number(formData.hum),
        ph: Number(formData.ph),
        rain: Number(formData.rain),
      };
      console.log("Payload being sent:", payload);
      const response = await axios.post(`${import.meta.env.VITE_URL}/ai/crop/grow/user_want/${crop}`, payload);
      console.log("Backend response:", response.data);
      setData(response.data.response);
    } catch (error) {
      console.error("Error fetching crop data:", error);
    }
  }

  function parseMarkdownTable(mdString) {
  const lines = mdString.split("\n").filter(line => line.trim() !== "" && !line.startsWith("| ---"));
  const headers = lines[0].replace(/\|/g, "").trim().split(/\s*\|\s*/);
  const rows = lines.slice(1).map(line => line.replace(/^\||\|$/g, "").split(/\s*\|\s*/));
  return { headers, rows };
}
const tableData = parseMarkdownTable(data);

  useEffect(() => {
    handleCrop();
  }, []);

  if (!crop || !formData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 ">
        <h2 className="text-2xl font-bold text-red-700">⚠ No crop data found!</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Ideal soil ranges (example for Wheat & Rice)
  const idealSoil = {
    Wheat: {
      ph: [6.0, 7.0],
      nitrogen: [40, 60],
      phosphorus: [30, 50],
      potassium: [20, 40],
      moisture: [35, 45],
    },
    Rice: {
      ph: [5.5, 6.5],
      nitrogen: [60, 80],
      phosphorus: [40, 60],
      potassium: [30, 50],
      moisture: [50, 70],
    },
  };

  const cropAdvice = {
    Wheat: [
      { month: "November", activity: "Sowing with proper irrigation" },
      { month: "December", activity: "Weed control and fertilizer application (NPK)" },
      { month: "January", activity: "Irrigation at crown root initiation stage" },
      { month: "February", activity: "Pest & disease monitoring" },
      { month: "March", activity: "Harvesting when grains are golden yellow" },
    ],
    Rice: [
      { month: "June", activity: "Transplanting rice seedlings" },
      { month: "July", activity: "Maintain standing water and apply nitrogen" },
      { month: "August", activity: "Pest monitoring and mid-season drainage" },
      { month: "September", activity: "Flowering stage irrigation" },
      { month: "October", activity: "Harvesting" },
    ],
  };

  const recommendations = {
    Wheat: {
      fertilizer: "Apply 120kg N, 60kg P, and 40kg K per hectare.",
      irrigation: "Irrigate every 20–25 days depending on rainfall.",
      precautions: "Watch for rust disease and use resistant varieties.",
    },
    Rice: {
      fertilizer: "Apply 100kg N, 50kg P, and 50kg K per hectare.",
      irrigation: "Maintain 5cm standing water until flowering stage.",
      precautions: "Check for brown planthopper and stem borer.",
    },
  };

  const advice = cropAdvice[crop] || [
    { month: "General", activity: "No specific data available for this crop yet." },
  ];
  const rec = recommendations[crop] || {};

  // Soil suitability check
  const soilCheck = (param, value) => {
    const range = idealSoil[crop]?.[param];
    if (!range) return "ℹ No data";
    if (value >= range[0] && value <= range[1]) return "✅ Suitable";
    return "⚠ Needs Adjustment";
  };

  return (
    <div className="min-h-screen bg-green-50 pt-28 px-6 ">
      {/* Summary */}
      <div className="bg-green-100 p-6 rounded-xl shadow-md max-w-5xl mx-auto mb-8 text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-2">
          {crop} – Growth Plan 🌱
        </h1>
        <p className="text-lg text-gray-700">
          Based on your soil data, here’s the suitability analysis and month-wise plan
          for <strong>{crop}</strong>.
        </p>
      </div>

      {/* Soil parameters with suitability */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Your Soil Parameters</h2>
        <ul className="space-y-2 text-gray-700">
          <li>
            <strong>pH:</strong> {formData.ph}{" "}
            <span className="ml-2">{soilCheck("ph", formData.ph)}</span>
          </li>
          <li>
            <strong>Nitrogen:</strong> {formData.nitrogen}{" "}
            <span className="ml-2">{soilCheck("nitrogen", formData.nitrogen)}</span>
          </li>
          <li>
            <strong>Phosphorus:</strong> {formData.phosphorus}{" "}
            <span className="ml-2">{soilCheck("phosphorus", formData.phosphorus)}</span>
          </li>
          <li>
            <strong>Potassium:</strong> {formData.potassium}{" "}
            <span className="ml-2">{soilCheck("potassium", formData.potassium)}</span>
          </li>
          <li>
            <strong>Moisture:</strong> {formData.moisture}%{" "}
            <span className="ml-2">{soilCheck("moisture", formData.moisture)}</span>
          </li>
        </ul>
      </div>

      {/* Recommendations */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Fertilizer & Irrigation Advice</h2>
        <p><strong>Fertilizer:</strong> {rec.fertilizer || "No data available"}</p>
        <p><strong>Irrigation:</strong> {rec.irrigation || "No data available"}</p>
        <p><strong>Precautions:</strong> {rec.precautions || "No data available"}</p>
      </div>

      {/* Month-wise advice */}
      <div className="bg-white p-6 rounded-xl shadow-md max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Month-wise Advice</h2>
        <table className="min-w-full border border-gray-300">
          <thead className="bg-green-100">
            <tr>
              <th className="border px-4 py-2">Month</th>
              <th className="border px-4 py-2">Activity</th>
            </tr>
          </thead>
          <tbody>
            {advice.map((step, index) => (
              <tr key={index} className="hover:bg-green-50">
                <td className="border px-4 py-2 font-semibold">{step.month}</td>
                <td className="border px-4 py-2">{step.activity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* General Tips */}
      <div className="bg-green-100 p-6 rounded-xl shadow-md max-w-5xl mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">General Farming Tips 🌾</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>✅ Use certified and disease-free seeds.</li>
          <li>✅ Rotate crops to maintain soil fertility.</li>
          <li>✅ Apply organic manure along with chemical fertilizers.</li>
          <li>✅ Regularly monitor for pests and diseases.</li>
          <li>✅ Practice water conservation and efficient irrigation.</li>
        </ul>
      </div>
    </div>
  );
}

export default DesireCrop;