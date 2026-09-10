from pydantic import BaseModel, Field

class mandiInput(BaseModel):
    state: str = Field(..., example="uttrakhand")
    District: str = Field(..., example="haridwar")
    Market: str = Field(..., example="haridwar")
    Commodity: str = Field(..., example="rice")