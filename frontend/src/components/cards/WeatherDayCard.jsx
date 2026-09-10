import React from "react";
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudLightning, 
  CloudSnow, 
  Droplets, 
  Wind, 
  Sunrise, 
  Sunset,
  Thermometer
} from "lucide-react";
import { motion } from "framer-motion";

function WeatherDayCard({
  day,
  temp,
  humidity,
  wind,
  sunrise,
  sunset,
  condition,
  isHistorical = false
}) {
  const renderWeatherIcon = (cond) => {
    if (!cond) return <Cloud className="w-10 h-10 text-sky-400" />;
    const lower = cond.toLowerCase();
    if (lower.includes("rain")) return <CloudRain className="w-10 h-10 text-blue-500 animate-bounce" />;
    if (lower.includes("storm") || lower.includes("thunder")) return <CloudLightning className="w-10 h-10 text-amber-500 animate-pulse" />;
    if (lower.includes("snow")) return <CloudSnow className="w-10 h-10 text-indigo-300" />;
    if (lower.includes("sun") || lower.includes("clear")) return <Sun className="w-10 h-10 text-amber-400 animate-spin-slow" />;
    return <Cloud className="w-10 h-10 text-sky-400" />;
  };

  const isToday = day === "Today";

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative overflow-hidden rounded-2xl p-5 backdrop-blur-md transition-all duration-300 ${
        isToday
          ? "bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white shadow-xl ring-2 ring-emerald-400/50"
          : isHistorical
          ? "bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-800 dark:text-slate-100 shadow-md hover:shadow-lg"
          : "bg-white/90 dark:bg-slate-800/90 border border-emerald-100 dark:border-slate-700 text-slate-800 dark:text-slate-100 shadow-md hover:shadow-xl hover:border-emerald-300"
      }`}
    >
      {/* Background Accent glow for today */}
      {isToday && (
        <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
      )}

      {/* Header Badge */}
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs uppercase tracking-wider font-bold px-2.5 py-1 rounded-full ${
          isToday 
            ? "bg-white/20 text-white backdrop-blur-sm" 
            : isHistorical
            ? "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
            : "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300"
        }`}>
          {day}
        </span>
        {condition && (
          <span className={`text-xs font-medium truncate max-w-[90px] ${isToday ? "text-emerald-100" : "text-slate-500 dark:text-slate-400"}`}>
            {condition}
          </span>
        )}
      </div>

      {/* Main Weather Visual */}
      <div className="flex items-center justify-between my-2">
        <div className="flex items-center space-x-1">
          <Thermometer className={`w-5 h-5 ${isToday ? "text-amber-300" : "text-emerald-600"}`} />
          <span className="text-3xl font-extrabold tracking-tight">
            {temp !== undefined && temp !== null ? `${temp}°` : "N/A"}
          </span>
        </div>
        <div className="p-2 rounded-xl bg-slate-50/10 backdrop-blur-sm">
          {renderWeatherIcon(condition)}
        </div>
      </div>

      {/* Metrics Row */}
      <div className={`mt-4 pt-3 border-t grid grid-cols-2 gap-2 text-xs font-medium ${
        isToday ? "border-white/20 text-emerald-50" : "border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300"
      }`}>
        {humidity !== undefined && (
          <div className="flex items-center space-x-1.5">
            <Droplets className={`w-3.5 h-3.5 ${isToday ? "text-cyan-200" : "text-blue-500"}`} />
            <span>Hum: <strong className="font-semibold">{humidity}%</strong></span>
          </div>
        )}
        {wind !== undefined && (
          <div className="flex items-center space-x-1.5">
            <Wind className={`w-3.5 h-3.5 ${isToday ? "text-emerald-200" : "text-teal-500"}`} />
            <span>Wind: <strong className="font-semibold">{wind} km/h</strong></span>
          </div>
        )}
      </div>

      {/* Sun Times */}
      {(sunrise || sunset) && (
        <div className={`mt-2 pt-2 border-t flex justify-between text-[11px] ${
          isToday ? "border-white/10 text-emerald-100" : "border-slate-100 dark:border-slate-700/50 text-slate-500 dark:text-slate-400"
        }`}>
          {sunrise && (
            <div className="flex items-center space-x-1">
              <Sunrise className="w-3 h-3 text-amber-400" />
              <span>{sunrise}</span>
            </div>
          )}
          {sunset && (
            <div className="flex items-center space-x-1">
              <Sunset className="w-3 h-3 text-orange-400" />
              <span>{sunset}</span>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default WeatherDayCard;
