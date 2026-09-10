import React, { useState, useEffect } from "react";
import axios from "axios";

function Scheduler() {
  const [tab, setTab] = useState("manual"); // current active tab
  const [msg, setMsg] = useState("");

  // Manual Data
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [soil, setSoil] = useState("");

  // Custom Scheduling
  const [time, setTime] = useState("");
  const [activity, setActivity] = useState("Irrigation");
  const [schedules, setSchedules] = useState([]);

  // Live Sensor + Notifications
  const [messages, setMessages] = useState([]);

  // Fetch schedules
  const fetchSchedules = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/schedule/schedules");
      setSchedules(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  // Poll sensor data every 10s
useEffect(() => {
  const interval = setInterval(async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/iot/soil-test");
      if (res.data.status === "success") {
        const sensor = res.data.data;
        const msg = `🌡 Temp: ${sensor.temperature}°C, 💧 Soil: ${sensor.soil_moisture}%, 💦 Water: ${sensor.water_level}%, 🌬 Humidity: ${sensor.humidity}%`;
        setMessages((prev) => [msg, ...prev.slice(0, 9)]);
      }
    } catch (err) {
      console.error("Error fetching sensor data", err);
    }
  }, 10000); // every 10s

  return () => clearInterval(interval);
}, []);

  // Start Smart Scheduling
  const startSchedule = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/schedule/start-schedule");
      setMsg(res.data?.status || "✅ Smart scheduling started!");
    } catch (err) {
      setMsg("❌ Error starting schedule");
    }
  };

  // Save manual data
  const submitManual = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/set-manual-data", {
        temperature: parseInt(temp),
        humidity: parseInt(humidity),
        soil_moisture: parseInt(soil),
      });
      setMsg("✅ Manual data updated successfully!");
    } catch (err) {
      setMsg("❌ Error updating manual data");
    }
  };

  // Add custom schedule
  const addSchedule = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/schedule/add-schedule", {
        time,
        activity,
        field: "Field1",
        notes: "Demo note",
      });
      fetchSchedules();
      setMsg("✅ Schedule added!");
    } catch (err) {
      setMsg("❌ Error adding schedule");
    }
  };

  return (
    <div className="font-sans p-5 max-w-[1300px] mx-auto">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center mb-6">
        {["manual", "smart", "custom", "live"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 m-1 rounded-md transition ${
              tab === t ? "bg-green-600 text-white" : "bg-gray-300 text-black"
            }`}
          >
            {t === "manual" && "Manual Data"}
            {t === "smart" && "Smart Scheduling"}
            {t === "custom" && "Custom Scheduling"}
            {t === "live" && "Live Data"}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 border border-gray-300 rounded-lg bg-gray-100">
        {/* Manual Data */}
        {tab === "manual" && (
          <form onSubmit={submitManual} className="space-y-3">
            <h3 className="font-semibold">✍ Enter Manual Sensor Data</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="number"
                placeholder="Temperature (°C)"
                value={temp}
                onChange={(e) => setTemp(e.target.value)}
                className="p-2 border rounded-md flex-1"
              />
              <input
                type="number"
                placeholder="Humidity (%)"
                value={humidity}
                onChange={(e) => setHumidity(e.target.value)}
                className="p-2 border rounded-md flex-1"
              />
              <input
                type="number"
                placeholder="Soil Moisture (%)"
                value={soil}
                onChange={(e) => setSoil(e.target.value)}
                className="p-2 border rounded-md flex-1"
              />
            </div>
            <button
              type="submit"
              className="mt-2 px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save Manual Data
            </button>
          </form>
        )}

        {/* Smart Scheduling */}
        {tab === "smart" && (
          <div>
            <h3 className="font-semibold">⚡ Smart Scheduling</h3>
            <p className="mb-3">Start automated smart irrigation + alerts sequence.</p>
            <button
              onClick={startSchedule}
              className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Start Smart Scheduling
            </button>
          </div>
        )}

        {/* Custom Scheduling */}
        {tab === "custom" && (
          <div>
            <h3 className="font-semibold">🛠 Custom Scheduling</h3>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="p-2 border rounded-md"
              />
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="p-2 border rounded-md"
              >
                <option>Irrigation</option>
                <option>Seed</option>
                <option>Fertilizer</option>
                <option>Weather</option>
                <option>Temperature</option>
              </select>
              <button
                onClick={addSchedule}
                className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Add Schedule
              </button>
            </div>

            <h4 className="mt-4 font-medium">📋 Current Schedules</h4>
            <ul className="list-disc list-inside mt-2 space-y-1">
              {schedules.map((s, idx) => (
                <li key={idx} className="text-gray-700">
                  {s.time} - {s.activity} ({s.notes})
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Live Data */}
        {tab === "live" && (
          <div>
            <h3 className="font-semibold">📡 Live Sensor Data & Notifications</h3>
            <ul className="list-disc list-inside mt-2 space-y-1">
              {messages.map((m, idx) => (
                <li key={idx} className="text-gray-700">
                  {m}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Global Messages */}
      <p className="text-center mt-5 font-bold text-green-600">{msg}</p>
    </div>
  );
}

export default Scheduler;
