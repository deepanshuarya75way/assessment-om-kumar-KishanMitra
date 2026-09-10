import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function DiseaseDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { prediction, insights } = location.state || {};

  if (!prediction || !insights) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
        <h2 className="text-2xl font-bold text-red-600">⚠️ No result found!</h2>
        <button
          onClick={() => navigate("/disease-detection")}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 mt-10">
        <h2 className="text-2xl font-bold text-green-700 mb-4">
          {prediction.class_name}
        </h2>
        <p className="text-gray-700 mb-4">{prediction.description}</p>

        <h3 className="text-xl font-semibold text-gray-800 mb-2">What is this?</h3>
        <p className="text-gray-700 mb-4">{insights.what_is_this}</p>

        {insights.causes && (
          <>
            <h3 className="text-lg font-semibold text-red-600 mb-2">Causes</h3>
            <ul className="list-disc list-inside mb-4 text-gray-700">
              {insights.causes.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </>
        )}

        {insights.treatment && (
          <>
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Treatment</h3>
            <ul className="list-disc list-inside mb-4 text-gray-700">
              {insights.treatment.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </>
        )}

        {insights.prevention && (
          <>
            <h3 className="text-lg font-semibold text-purple-600 mb-2">Prevention</h3>
            <ul className="list-disc list-inside text-gray-700">
              {insights.prevention.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </>
        )}

        <button
          onClick={() => navigate("/disease-detection")}
          className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          🔙 Back to Detection
        </button>
      </div>
    </div>
  );
}
