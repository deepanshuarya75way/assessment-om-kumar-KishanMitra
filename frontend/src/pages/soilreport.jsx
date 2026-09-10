import React from "react";
import { useLocation } from "react-router-dom";

function SoilReportDetail() {
  const { state } = useLocation();
  const report = state?.report;

  if (!report) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">No data available</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 pd-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Soil Report Details</h1>
        <div className="text-gray-600 space-y-2">
          <p><strong>Date:</strong> {new Date(report.timestamp).toLocaleString()}</p>
          <p><strong>pH:</strong> {report.ph}</p>
          <p><strong>Nitrogen:</strong> {report.nitrogen} mg/kg</p>
          <p><strong>Phosphorus:</strong> {report.phosphorus} mg/kg</p>
          <p><strong>Potassium:</strong> {report.potassium} mg/kg</p>
          <p><strong>Temperature:</strong> {report.temperature} °C</p>
          <p><strong>Humidity:</strong> {report.humidity} %</p>
          <p><strong>Rainfall:</strong> {report.rainfall} mm</p>
        </div>
        <button
          onClick={() => window.history.back()}
          className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default SoilReportDetail;