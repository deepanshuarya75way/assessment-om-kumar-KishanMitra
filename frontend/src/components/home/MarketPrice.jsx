import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE_URL } from "../../config/apiConfig";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function MarketDashboard() {
  const [state, setState] = useState("Uttrakhand");
  const [district, setDistrict] = useState("Haridwar");
  const [market, setMarket] = useState("Haridwar");
  const [commodity, setCommodity] = useState("Rice");

  const [tableData, setTableData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch last 7 days prices
  const fetchTableData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/ai/mandi/price`, {
        state,
        District: district,
        Market: market,
        Commodity: commodity,
      });

      const tableString = response.data.response;

      const rows = tableString
        .split("\n")
        .slice(2) // skip header
        .map((row) => {
          const cols = row
            .split("|")
            .map((c) => c.trim())
            .filter((c) => c !== "");

          return {
            date: cols[0],
            state: cols[1],
            district: cols[2],
            market: cols[3],
            commodity: cols[4],
            min_price: cols[5],
            max_price: cols[6],
          };
        });

      setTableData(rows);
      setLoading(false);
    } catch (error) {
      console.error("Table fetch error:", error);
      setLoading(false);
    }
  };

  // 🔹 Fetch 5-year graph data
  const fetchGraphData = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/ai/mandi/price/graph`, {
        state,
        District: district,
        Market: market,
        Commodity: commodity,
      });

      console.log("📥 Raw API Response:", response.data);

      // Clean ```json wrappers
      const jsonString = response.data.response.replace(/```json|```/g, "");
      const parsed = JSON.parse(jsonString);
      console.log("✅ Parsed JSON:", parsed);

      // 🔹 Handle multiple key formats
      const dataKeyOptions = [
        `${commodity} Data`,
        `${commodity}_Data`,
        `${commodity}Data`,
      ];
      let rawData = [];
      for (let key of dataKeyOptions) {
        if (parsed[key]) {
          rawData = parsed[key];
          break;
        }
      }
      console.log("📊 Raw Graph Data:", rawData);

      // 🔹 Normalize keys
      const processedData = rawData.map((item) => ({
        Year: item["Year"],
        AveragePrice: item["Average Price"] || item["Average_Price"] || 0,
        ProfitLoss: item["Profit/Loss"] || 0,
      }));

      console.log("📈 Processed Graph Data:", processedData);

      setGraphData(processedData);
    } catch (error) {
      console.error("Graph fetch error:", error);
    }
  };

  // 🔹 Fetch data whenever inputs change
  useEffect(() => {
    fetchTableData();
    fetchGraphData();
  }, [state, district, market, commodity]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
        🌾 Market Dashboard
      </h2>

      {/* Input Fields */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          placeholder="District"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          placeholder="Market"
          value={market}
          onChange={(e) => setMarket(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          placeholder="Commodity"
          value={commodity}
          onChange={(e) => setCommodity(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Table Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-x-auto mb-12"
      >
        <h3 className="text-xl font-semibold mb-4">📊 Last 7 Days Prices</h3>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-green-100">
              <tr>
                <th className="border px-3 py-2">Date</th>
                <th className="border px-3 py-2">State</th>
                <th className="border px-3 py-2">District</th>
                <th className="border px-3 py-2">Market</th>
                <th className="border px-3 py-2">Commodity</th>
                <th className="border px-3 py-2">Min Price (₹)</th>
                <th className="border px-3 py-2">Max Price (₹)</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {tableData.map((item, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="text-center"
                  >
                    <td className="border px-3 py-2">{item.date}</td>
                    <td className="border px-3 py-2">{item.state}</td>
                    <td className="border px-3 py-2">{item.district}</td>
                    <td className="border px-3 py-2">{item.market}</td>
                    <td className="border px-3 py-2">{item.commodity}</td>
                    <td className="border px-3 py-2">{item.min_price}</td>
                    <td className="border px-3 py-2">{item.max_price}</td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        )}
      </motion.div>

      {/* Graph Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold mb-4">📈 5-Year Trend</h3>
        {graphData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={graphData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="AveragePrice" stroke="#82ca9d" />
              <Line type="monotone" dataKey="ProfitLoss" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500">No graph data available</p>
        )}
      </motion.div>
    </div>
  );
}
