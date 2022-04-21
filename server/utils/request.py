from typing import List

from pydantic import BaseModel


class Investor(BaseModel):
    name: str
    requested_amount: float
    average_amount: float


class CalculateRequestPayload(BaseModel):
    allocation_amount: str
    investor_amounts: List[Investor]

    class Config:
        schema_extra = {
            "allocation_amount": 100,
            "investor_amounts": [
                {
                    "name": "Investor A",
                    "requested_amount": 100,
                    "average_amount": 95
                },
                {
                    "name": "Investor B",
                    "requested_amount": 1,
                    "average_amount": 1
                },
                {
                    "name": "Investor C",
                    "requested_amount": 1,
                    "average_amount": 4
                }
            ]
        }
