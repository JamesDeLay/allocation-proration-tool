from http.client import HTTPException
from fastapi import FastAPI
from utils.response import CalculateResponsePayload
from utils.request import CalculateRequestPayload
from utils.calculator import AllocationCalculator

app = FastAPI()


@app.get("/api/test")
async def root():
    return {"message": "Hello World"}


@app.post("/api/calculate")
async def calculate(payload: CalculateRequestPayload) -> CalculateResponsePayload:
    investor_breakdown = payload.dict()
    try:
        c = AllocationCalculator(investor_breakdown)
        result = c.calculate()
        return {
            "status": "SUCCESS",
            "results": result
        }
    except:
        raise HTTPException(
            status_code=500, detail="An internal server error occured...")
