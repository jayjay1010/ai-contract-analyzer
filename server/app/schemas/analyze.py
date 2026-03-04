from enum import Enum
from typing import List, Optional
from pydantic import BaseModel, Field


class Severity(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"

class KeyTerms(BaseModel):
    parties: List[str] = Field(default_factory=list)
    effective_date: Optional[str] = None
    term: Optional[str] = None
    payment: Optional[str] = None
    termination: Optional[str] = None
    governing_law: Optional[str] = None

class RiskItem(BaseModel):
    title: str
    severity: Severity
    rationale: str
    suggested_fix: Optional[str] = None


class ContractAnalysis(BaseModel):
    summary: str
    keyTerms: KeyTerms
    risks: List[RiskItem] = Field(default_factory=list)
    questions: List[str] = Field(default_factory=list)
    risk_score: int = Field(ge=0, le=10)
    disclaimer: str


class AnalyzeRequest(BaseModel):
    text: str = Field(min_length=20, description="Raw contract text")