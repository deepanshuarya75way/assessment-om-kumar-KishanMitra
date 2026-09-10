import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// FarmerGrowthChart.jsx
// Displays the growth trend (sample data) of beneficiaries/support to farmers over 10 years.

export default function FarmerGrowthChart() {
  // Sample data of farmer beneficiaries over 10 years (replace with real data)
  const data = [
    { year: "2015", beneficiaries: 2500000 },
    { year: "2016", beneficiaries: 3000000 },
    { year: "2017", beneficiaries: 3800000 },
    { year: "2018", beneficiaries: 5000000 },
    { year: "2019", beneficiaries: 6500000 },
    { year: "2020", beneficiaries: 7200000 },
    { year: "2021", beneficiaries: 8200000 },
    { year: "2022", beneficiaries: 9000000 },
    { year: "2023", beneficiaries: 10500000 },
    { year: "2024", beneficiaries: 12000000 },
  ];

  return (
    <section className="py-8 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-green-800">10-Year Farmer Growth Trend</h2>
          <p className="text-sm sm:text-lg text-gray-800 mt-2">Beneficiaries supported under government schemes (2015–2024)</p>
        </div>

        <div className="w-full h-100 bg-green-100 rounded-2xl shadow-sm p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, bottom: 10, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v) => new Intl.NumberFormat("en-IN").format(v)} />
              <Line
                type="monotone"
                dataKey="beneficiaries"
                stroke="#14532d"
                strokeWidth={3}
                dot={{ r: 4, fill: "#4f46e5" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        
      </div>
    </section>
  );
}
