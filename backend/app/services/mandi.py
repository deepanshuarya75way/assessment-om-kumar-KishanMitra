import os
import datetime
import pandas as pd
import requests
from bs4 import BeautifulSoup

CSV_FILE = "app\dataset\Agriculture_price_dataset.csv"

def load_csv():
    if os.path.exists(CSV_FILE):
        return pd.read_csv(CSV_FILE)
    else:
        # Return empty DataFrame with expected columns if CSV missing
        return pd.DataFrame(columns=[
            "STATE", "District Name", "Market Name", "Commodity",
            "Variety", "Grade", "Min_Price", "Max_Price",
            "Modal_Price", "Price Date"
        ])

def save_csv(df: pd.DataFrame):
    df.to_csv(CSV_FILE, index=False)

def scrape_price(state: str, district: str, market: str, commodity: str):
    """
    Scrape Agmarknet for price data matching the given parameters.
    Returns a dict of scraped fields, or None if not found.
    """
    url = "https://agmarknet.gov.in/SearchCmmMkt.aspx"
    headers = {"User-Agent": "Mozilla/5.0"}

    try:
        resp = requests.get(url, headers=headers, timeout=15)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "html.parser")
        table = soup.find("table", {"id": "ctl00_cphBody_GridPriceData"})
        if not table:
            return None

        rows = table.find_all("tr")[1:]  # skip header row
        for row in rows:
            cols = [c.text.strip() for c in row.find_all("td")]
            # The table has columns: Sr., State, District, Market, Commodity, Variety, Grade, Min, Max, Modal, Date
            if len(cols) >= 10:
                if (cols[1].lower() == state.lower() and
                    cols[2].lower() == district.lower() and
                    cols[3].lower() == market.lower() and
                    cols[4].lower() == commodity.lower()):
                    return {
                        "State": cols[1],
                        "District": cols[2],
                        "Market": cols[3],
                        "Commodity": cols[4],
                        "Variety": cols[5],
                        "Grade": cols[6],
                        "Min_Price": cols[7],
                        "Max_Price": cols[8],
                        "Modal_Price": cols[9],
                        "Date": cols[10] if len(cols) > 10 else datetime.date.today().isoformat()
                    }
        return None

    except Exception as e:
        print("Error scraping price:", e)
        return None
