import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function History() {
  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/activities", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const filteredActivities = response.data.filter(
        (activity) =>
          activity.action === "Added manual soil reading" ||
          activity.action === "Email verified"
      );
      setActivities(filteredActivities);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="flex flex-col gap-6 bg-white shadow-xl rounded-2xl p-6 w-full md:mt-8"
    >
      {/* Activity Log */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">History & Reports</h1>
       
        <h3 className="text-lg font-semibold font-serif text-gray-800">Activity Log</h3>
        <div className="space-y-2 mt-2">
          {activities.map((activity, index) => (
            <motion.button
              key={index}
              className={`w-full text-left text-gray-600 ${
                activity.action === "Added manual soil reading"
                  ? "bg-green-100 hover:bg-green-200"
                  : "bg-gray-100"
              } px-4 py-2 rounded-lg transition-colors`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              • {activity.action} -{" "}
              {new Date(activity.timestamp).toLocaleString()}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Soil Reports Table (Hardcoded for now) */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3 border border-gray-300">Date</th>
              <th className="p-3 border border-gray-300">pH</th>
              <th className="p-3 border border-gray-300">N</th>
              <th className="p-3 border border-gray-300">P</th>
              <th className="p-3 border border-gray-300">K</th>
              <th className="p-3 border border-gray-300">Temp (°C)</th>
              <th className="p-3 border border-gray-300">Humidity (%)</th>
              <th className="p-3 border border-gray-300">Rainfall (mm)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-green-50 transition">
              <td className="p-3 border border-gray-300 font-medium text-gray-700">
                03-Oct-2025, 10:30 AM
              </td>
              <td className="p-3 border border-gray-300">6.5</td>
              <td className="p-3 border border-gray-300">50</td>
              <td className="p-3 border border-gray-300">40</td>
              <td className="p-3 border border-gray-300">70</td>
              <td className="p-3 border border-gray-300">26</td>
              <td className="p-3 border border-gray-300">55</td>
              <td className="p-3 border border-gray-300">12</td>
            </tr>
            <tr className="hover:bg-green-50 transition">
              <td className="p-3 border border-gray-300 font-medium text-gray-700">
                02-Oct-2025, 05:15 PM
              </td>
              <td className="p-3 border border-gray-300">7.0</td>
              <td className="p-3 border border-gray-300">45</td>
              <td className="p-3 border border-gray-300">38</td>
              <td className="p-3 border border-gray-300">65</td>
              <td className="p-3 border border-gray-300">29</td>
              <td className="p-3 border border-gray-300">60</td>
              <td className="p-3 border border-gray-300">8</td>
            </tr>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default History;