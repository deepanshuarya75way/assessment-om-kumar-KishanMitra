import React, { useState } from "react";

export default function InputForm({ onSubmit }) {
  const [data, setData] = useState({
    soil: "",
    environment: "",
    weather: "",
    cropHealth: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(data);
      }}
      className="bg-white shadow-lg rounded-lg p-6 space-y-4"
    >
      <h2 className="text-xl font-semibold text-green-700">Enter Farm Details</h2>

      <input
        type="text"
        name="soil"
        placeholder="Soil Condition"
        value={data.soil}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="environment"
        placeholder="Local Environment"
        value={data.environment}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="weather"
        placeholder="Weather Report"
        value={data.weather}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="cropHealth"
        placeholder="Crop Health"
        value={data.cropHealth}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Submit
      </button>
    </form>
  );
}
