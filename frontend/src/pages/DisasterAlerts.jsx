import {
  AlertTriangle,CloudRain,CloudLightning,wind ,Snowflake,Sun,ThermimeterSun,
  Axis3DIcon,
  RefreshCw
} from "lucide-react";
import {motion} from "framer-motion";
import { useEffect, useState } from "react";
import (API_BASE_URL) from "../congfig/apiConfig";

const PRESET_CITIES = [
  "haridwar","Delhi","Jaipur"
];

const getAlertIcon = (type)=>{
  const value =type?.toLowerCase() || "";

  if(value.includes("rain")) return <CloudRain size={24} />;
  if(
    value.includes("thunder") || value.includes("lightning") || value.includes("strom")
  ){
    return <CloudLightning size = {24} /> ;
  }
  if(value.includes("wind")) return <Wind size={24} />;
  if(value.includes("snow")) return <Snowflake size={24} />;
  if(value.includes("heat")) {return <ThermimeterSun size={24} />;}

  return <AlertTriangle size={24}/>;

};

const getSeverityClasses = (severity)=>{
  switch (severity?.toLowerCase()){
    case "red":
      return{
        card : "border-red-300 bg-red-50",
        badge: "bg-red-600 text-white",
        text:"tex-red-800",
      };
      case "orange":
      return{
        card : "border-orange-300 bg-orange-50",
        badge: "bg-orange-600 text-white",
        text:"tex-orange-800",
      };
      case "yellow":
      return{
        card : "border-yellow-300 bg-yellow-50",
        badge: "bg-yellow-600 text-white",
        text:"tex-yellow-800",
      };
      default:
        return{
        card : "border-green-300 bg-green-50",
        badge: "bg-green-600 text-white",
        text:"tex-green-800",
        };
  }
};
const getDayLabel = (day) => {
  if(day===1) return "Today";
  if(day===2) return "Tomorrow";
  return `Day ${day}`;
};

function DistasterAlerts(){
  const savedCity = localStorage.getItem("Kishanmitra_disaster_city");

  const[city,setCity] = useState(savedCity || "Haridwar");
  const[searchInput , setSearchInput] = useState(savedCity || "Haridwar");

  const[alearts , setAlerts] = useState([]);
  const[location , setlocation] = useState(null);
  const[loading , setLoading] = useState(true);
  const[error , setError] = useState("");

  const fetchAlerts = async(targetCity = city) => {
    try {
      setError("");
      setRefreshing(true);


      const responce =await axios.get(`${API_BASE_URL}/disasater-alears`,
        {
        params:{
          city:targetCity,
        },
      }
    );
    setAlerts(responce.data.alearts || []);
    setlocation(responce.data.location || null);
    } catch (err){
      console.error("Disaster alert error :" ,err);
      setAlerts([]);

      setError(
        err.responce?.data?.detail || "Disaster alearts counld not bs loaded."
      );
    }finally{
      setLoading(false);
      setRefreshing(false);
    }
  }
};

useEffect(()=>{
  fetchAlerts(city);
},[city]);

const handleSearch = (e) => {
  e.preventDefault();

  const cleanedCity = searchInput.trim();

  if(!cleanedCity) return;

  localStorage.setItem(
    "kishanmitra_disaster_city",
    cleanedCity
  );

  const handlePresentCity=(selectedCity) => {
    setSearchInput(selectedCity);

    localStorage.setItem(
      "kishanmitra_disaster_city",
      selectedCity
    );
    setCity(selectedCity);
  };
  return(
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        {Header}
        <div className="flex flex-col gap-4 md:flex-row md:item-center md:justify-between">
          <div>
            <h1>
              Area-Specific Disaster Alearts
            </h1>
              <p className="mt-2 text-gray-600">
                Get disaster warning for your selected area.
              </p>
        </div>

        <button onClick={()=> fetchAlerts(city)}
        disabled={refreshing}
        className="flex item-center justify-center gap-2 rounded-lg bg-green-700 py-3 front-semibold text-white transition hover:bg-green-800 disabled:opacity-60"
        >
          <RefreshCw
          size={18}
          className={refreshing? "animate-spin" : ""}
          />
          Refresh

        </button>
      </div>
    </div>

<form onSubmit={searchLocation}
className="mb-6 flex gap-2"
>
  <input value={input}
  onChange={(e)=>setInput(e.target.value)}
  placeholder="Enter your city"
  className="flex-1 round border p-3"
  />
  <button
  type="submit" className="rounded bg-greem-700 px-5 text-white">Search</button>
  </form>
  <p className="mb-5 text-gray-700">
    showing alearts for :<b>{city}</b>
  </p>
  {loading && (<p className="text-gray-600">Loading alearts...</p>)}
  {error && (<div className="mb-4 rounded bg-red-100 p-4 tet-red-700">{error}</div>)}
  (!loading && !error && alearts.length===() && (<div className="rounded bg-white p-6 shadow">Noactive alearts</div>))

  <div className="space-y-4">
    {alearts.map((alert,index)=>(
      <div key={index} className={`rounded p-5 shadow ${alert.severity==="red"?"bg-orange-100":alert.severity==="orange":alert.severity==="yellow"?"bg-yellow-100":"bg-green-100"}`}>
        <div className="flex justify-between">
          <h2>{alert.type}</h2>

          <span>{alert.severity}</span>
        </div>
        <p>{alert.description}</p>
    ))}
  </div>
    </div>
  );
}

export default DisasterAlerts;