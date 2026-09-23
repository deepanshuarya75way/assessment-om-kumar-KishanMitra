from fastapi import APIRouter ,HTTPException
import requests

from app.routes.weather import get_city_coordinates

router=APIRouter()

IMD_URL = "https://mausam.imd.gov.in/api/v1/districtwarning"

DISTRICTS={
  # "Haridwar":14,
}

COLORS ={
  "1":"red",
  "2":"orange",
  "3":"yellow",
  "4":"green",
}

WARNING_NAMES = {
  1:"No Warning"
  2:"Heavy Rain",
  3:"heavy snow",
  4:"thunderstrom/lightinig",
  5:"hailstrom",
  6:"Dust Strom"
  7:"Dust Raising Winds"

}

def advice(name):
  if "Rain" in name :
    return "Protect harvested crops."
  if "Thunder" in name:
    return "Avoid open field."
  if "Heat" in name :
    return "provide water to crops."
  if "Cold" in name :
    return "provide sensitive crops."
  if "wind" in name :
    return "secure farmer equipment."
  if "Hail" in name :
    return "protect standing and harvested crops."
  return "follow local official safety insturction"

@router.get("")
async def disaster_alerts(city:str):
  city=city.strip()

  if not city:
    raise HTTPException(
      status_code=400,
      detail="city is required"
    )
  lat,lon=get_city_coordinates(city)

  if lat is None or lon is None:
    raise HTTPException(
      status_code=404,
      detail="city not found"
    )
  district_id = DISTRICTS.get(city.lower())

  if not district_id:
    return {
      "city":city,
      "location":{
        "latitude":lat,
        "longitude" : lon
      },
      "alerts":[],
      "message":"IMD not configured for this city."
    }

  try:
    response = requests.get(
      IMD_URL,
      params={"id":district_id},
      timeout=10
    )
    response.raise_for_status()
    data = response.json()
  except Exception as e:
    raise HTTPException(
      status_code=502,
      detail="IMD service error :" + {str(e)}
    )
  
  if isinstance(data , list ):
    data = data[0] if data else {}

  alerts=[]

  for day in range(1,6):
    codes = data.get(f"Day_{day}","")
    color = COLORS.get(
      str(data.get(f"Day{day}_color","4")),"green"
    )

    if not codes:
     continue
  
    for code in str(codes).split(","):
      try:
        code = int(code)
      except:
        continue

      if code ==1:
        continue
      name = WARNING_NAMES.get(
        code ,
        f"Weather warning {code}"
      )
      alearts.append({
        "day":day,
        "type":name,
        "severity":f"{name} warning for {city}.",
        "source":"IMD"
      })
  return {
  "city":city,
  "location":{
    "latitude":lat,
    "longitude":lon,
  },
  "alerts":alerts
}