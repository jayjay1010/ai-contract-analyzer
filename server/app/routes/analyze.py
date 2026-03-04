from fastapi import APIRouter, HTTPException
from app.schemas.analyze import AnalyzeRequest, ContractAnalysis
from app.services.analyzer import analyze_contract

router = APIRouter()

@router.get("/health")
def health():
    return {"ok": True}

@router.post("/analyze", response_model=ContractAnalysis)
def analyze(payload: AnalyzeRequest):
    try:
        result = analyze_contract(payload.text)
        return result
    except Exception as e:
        # Keep errors simple for now
        raise HTTPException(status_code=500, detail=str(e))

    