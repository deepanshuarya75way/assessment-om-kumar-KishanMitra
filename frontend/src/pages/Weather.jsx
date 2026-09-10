import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CloudSun, 
  MapPin, 
  Search, 
  RefreshCw, 
  Droplets, 
  Wind, 
  Thermometer, 
  Sparkles,
  Calendar,
  History as HistoryIcon,
  Sun,
  AlertCircle
} from "lucide-react";
import WeatherDayCard from "../components/cards/WeatherDayCard";
import { API_BASE_URL } from "../config/apiConfig";

const PRESET_CITIES = [
  "Haridwar", 
  "Delhi", 
  "Jaipur", 
  "Lucknow", 
  "Patna", 
  "Chandigarh",
  "Bhopal"
];

function Weather({ city: initialCity = "haridwar" }) {
  const [city, setCity] = useState(initialCity);
  const [searchInput, setSearchInput] = useState(initialCity);
  const [next7Days, setNext7Days] = useState([]);
  const [prev7Days, setPrev7Days] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("next"); // 'next' or 'prev'

  const fetchWeatherData = async (targetCity) => {
    try {
      setLoading(true);
      setError(null);

      // Fetch next 7 days
      const response = await axios.get(
        `${API_BASE_URL}/weather/next/7days?city=${encodeURIComponent(targetCity)}`
      );
      if (response.status === 200 && Array.isArray(response.data)) {
        setNext7Days(response.data);
      } else {
        setNext7Days([]);
      }

      // Fetch previous 7 days
      const res = await axios.get(
        `${API_BASE_URL}/weather/previous/7days?city=${encodeURIComponent(targetCity)}`
      );
      if (res.status === 200 && Array.isArray(res.data)) {
        setPrev7Days([...res.data].reverse());
      } else {
        setPrev7Days([]);
      }
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError(`Unable to load weather forecast for "${targetCity}". Please verify city name.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData(city);
    }
  }, [city]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput.trim().toLowerCase());
    }
  };

  const handlePresetClick = (cityName) => {
    setSearchInput(cityName);
    setCity(cityName.toLowerCase());
  };

  const getDayName = (datetime) => {
    const date = new Date(datetime);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffTime = date - today;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays === -1) return "Yesterday";

    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  };

  const todayWeather = next7Days.length > 0 ? next7Days[0] : null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 dark:border-slate-700/60"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Title & Subtitle */}
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                <CloudSun className="w-4 h-4 text-emerald-600" />
                <span>Agricultural Weather Suite</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Live Farm Weather Forecast
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Real-time temperature, humidity, rainfall, and field advisory metrics.
              </p>
            </div>

            {/* City Search Form */}
            <form onSubmit={handleSearchSubmit} className="flex items-center w-full md:w-auto">
              <div className="relative w-full md:w-80">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Enter city (e.g. Haridwar)..."
                  className="w-full pl-11 pr-24 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm font-medium"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all shadow-md flex items-center space-x-1"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search</span>
                </button>
              </div>
            </form>

          </div>

          {/* Quick Preset City Chips */}
          <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-700/60">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 flex items-center space-x-1 mr-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Popular Farming Hubs:</span>
            </span>
            {PRESET_CITIES.map((item) => (
              <button
                key={item}
                onClick={() => handlePresetClick(item)}
                className={`text-xs font-medium px-3 py-1.5 rounded-xl transition-all ${
                  city.toLowerCase() === item.toLowerCase()
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                    : "bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[350px] bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700/60">
            <RefreshCw className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
            <p className="text-slate-600 dark:text-slate-300 font-semibold text-base">Fetching live weather data for <span className="capitalize text-emerald-600">{city}</span>...</p>
            <p className="text-slate-400 text-xs mt-1">Analyzing satellite & weather forecasts...</p>
          </div>
        ) : error ? (
          /* Error State */
          <div className="flex flex-col items-center justify-center min-h-[300px] bg-red-50 dark:bg-red-950/20 rounded-3xl p-8 border border-red-200 dark:border-red-900/50 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mb-3" />
            <h3 className="text-lg font-bold text-red-800 dark:text-red-300">Weather Retrieval Error</h3>
            <p className="text-red-600 dark:text-red-400 text-sm max-w-md my-2">{error}</p>
            <button
              onClick={() => fetchWeatherData(city)}
              className="mt-4 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium text-xs rounded-xl transition-all shadow-md flex items-center space-x-1.5"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry Fetching</span>
            </button>
          </div>
        ) : (
          <>
            {/* Today's Hero Summary Card */}
            {todayWeather && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800 text-white p-6 sm:p-10 shadow-2xl"
              >
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Column: Temperature & City */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center space-x-2 text-emerald-200 text-xs font-semibold uppercase tracking-wider">
                      <MapPin className="w-4 h-4" />
                      <span className="capitalize">{city} Region • Today's Overview</span>
                    </div>

                    <div className="flex items-baseline space-x-4">
                      <span className="text-6xl sm:text-7xl font-black tracking-tight">
                        {todayWeather.temp}°C
                      </span>
                      <span className="text-xl sm:text-2xl font-semibold text-emerald-100 capitalize">
                        {todayWeather.condition || "Clear Sky"}
                      </span>
                    </div>

                    {/* Agricultural Advisory Chip */}
                    <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-medium text-emerald-50 border border-white/20">
                      <Sparkles className="w-4 h-4 text-amber-300 flex-shrink-0" />
                      <span>
                        <strong>Farmer Insight:</strong> Climate is favorable for soil inspection & regular field activities.
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Key Metrics Grid */}
                  <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 space-y-1">
                      <div className="flex items-center space-x-2 text-emerald-200 text-xs font-medium">
                        <Droplets className="w-4 h-4 text-cyan-300" />
                        <span>Humidity</span>
                      </div>
                      <p className="text-2xl font-bold">{todayWeather.humidity || "N/A"}%</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 space-y-1">
                      <div className="flex items-center space-x-2 text-emerald-200 text-xs font-medium">
                        <Wind className="w-4 h-4 text-teal-300" />
                        <span>Wind Speed</span>
                      </div>
                      <p className="text-2xl font-bold">{todayWeather.wind || "N/A"} km/h</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 space-y-1">
                      <div className="flex items-center space-x-2 text-emerald-200 text-xs font-medium">
                        <Sun className="w-4 h-4 text-amber-300" />
                        <span>Sunrise</span>
                      </div>
                      <p className="text-lg font-bold">{todayWeather.sunrise || "6:00 AM"}</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 space-y-1">
                      <div className="flex items-center space-x-2 text-emerald-200 text-xs font-medium">
                        <Thermometer className="w-4 h-4 text-orange-300" />
                        <span>Sunset</span>
                      </div>
                      <p className="text-lg font-bold">{todayWeather.sunset || "6:30 PM"}</p>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* Forecast Navigation Tabs */}
            <div className="flex items-center justify-between pt-4 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setActiveTab("next")}
                  className={`flex items-center space-x-2 pb-3 font-bold text-sm transition-all border-b-2 ${
                    activeTab === "next"
                      ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                      : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400"
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Next 7 Days Forecast</span>
                  <span className="ml-1 px-2 py-0.5 text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-full">
                    {next7Days.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("prev")}
                  className={`flex items-center space-x-2 pb-3 font-bold text-sm transition-all border-b-2 ${
                    activeTab === "prev"
                      ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                      : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400"
                  }`}
                >
                  <HistoryIcon className="w-4 h-4" />
                  <span>Previous 7 Days History</span>
                  <span className="ml-1 px-2 py-0.5 text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full">
                    {prev7Days.length}
                  </span>
                </button>
              </div>
            </div>

            {/* Weather Day Cards Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === "next" ? (
                  next7Days.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
                      {next7Days.map((dayData, idx) => (
                        <WeatherDayCard
                          key={idx}
                          day={getDayName(dayData.date)}
                          temp={dayData.temp}
                          humidity={dayData.humidity}
                          wind={dayData.wind}
                          sunrise={dayData.sunrise}
                          sunset={dayData.sunset}
                          condition={dayData.condition}
                          isHistorical={false}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-10 text-slate-400 text-sm">No forecast data available for next 7 days.</p>
                  )
                ) : (
                  prev7Days.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
                      {prev7Days.map((dayData, idx) => (
                        <WeatherDayCard
                          key={idx}
                          day={getDayName(dayData.date)}
                          temp={dayData.temp}
                          humidity={dayData.humidity}
                          wind={dayData.wind}
                          sunrise={dayData.sunrise}
                          sunset={dayData.sunset}
                          condition={dayData.condition}
                          isHistorical={true}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-10 text-slate-400 text-sm">No history data available for previous 7 days.</p>
                  )
                )}
              </motion.div>
            </AnimatePresence>

          </>
        )}

      </div>
    </div>
  );
}

export default Weather;