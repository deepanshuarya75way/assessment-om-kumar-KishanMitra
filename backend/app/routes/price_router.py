from fastapi import APIRouter, Query, HTTPException
from fastapi.responses import JSONResponse
from app.services.mandi import load_csv, save_csv, scrape_price
import pandas as pd
import datetime

router = APIRouter()

@router.get("/", summary="Get the latest commodity price")
async def get_price(
    state: str = Query(...), 
    district: str = Query(...), 
    market: str = Query(...), 
    commodity: str = Query(...)
):
    df = load_csv()

    # Check for existing data in CSV (case-insensitive match)
    filtered = df[
        (df["STATE"].str.lower() == state.lower()) &
        (df["District Name"].str.lower() == district.lower()) &
        (df["Market Name"].str.lower() == market.lower()) &
        (df["Commodity"].str.lower() == commodity.lower())
    ]

    if not filtered.empty:
        # Keep only rows up to today
        filtered["Price Date"] = pd.to_datetime(filtered["Price Date"], errors='coerce')
        today = pd.to_datetime(datetime.date.today())
        filtered = filtered[filtered["Price Date"] <= today]
        if filtered.empty:
            raise HTTPException(status_code=404, detail="No data found for latest date")

        # Get the rows with the latest date
        latest_date = filtered["Price Date"].max()
        latest_rows = filtered[filtered["Price Date"] == latest_date]

        # Convert date to string for JSON response
        latest_rows["Price Date"] = latest_rows["Price Date"].dt.strftime("%Y-%m-%d")
        data = [row.to_dict() for _, row in latest_rows.iterrows()]
        return {"source": "csv", "data": data}

    # If not in CSV, perform scraping
    scraped_data = scrape_price(state, district, market, commodity)
    if scraped_data:
        scraped_data["Price Date"] = datetime.date.today().strftime("%Y-%m-%d")
        # Append new data to CSV
        new_df = pd.concat([df, pd.DataFrame([scraped_data])], ignore_index=True)
        save_csv(new_df)
        return {"source": "scraped", "data": [scraped_data]}

    # If nothing found
    raise HTTPException(status_code=404, detail="No data found")