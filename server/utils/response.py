from typing import List
from pydantic import BaseModel


class Investor(BaseModel):
    name: str
    prorated_amount: float


class CalculateResponsePayload(BaseModel):
    results: List[Investor]
