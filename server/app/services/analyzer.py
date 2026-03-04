from openai import OpenAI
from app.core.config import OPENAI_API_KEY, OPENAI_MODEL
from app.schemas.analyze import ContractAnalysis

def _client() -> OpenAI:
    # OpenAI SDK will also read OPENAI_API_KEY from env automatically,
    # but we keep it explicit for clarity.
  return OpenAI(api_key=OPENAI_API_KEY)

SYSTEM_INSTRUCTIONS = """You are an assistant that analyzes contracts.
Return a structured analysis for the user. Be practical and cautious.
If any detail is missing, say "Not specified" instead of guessing.
Avoid legal advice language; provide educational guidance only.
"""
def analyze_contract(text: str) -> ContractAnalysis:
  client = _client()

  # Structured Outputs parsing into a Pydantic model
  response = client.responses.parse(
    model=OPENAI_MODEL,
    input=[{"role": "system", "content" : SYSTEM_INSTRUCTIONS},
    {
                "role": "user",
                "content": (
                    "Analyze this contract text and extract summary, key terms, risks, and questions.\n\n"
                    f"CONTRACT TEXT:\n{text}"
                ),
            },
   ],
    text_format=ContractAnalysis,
  )
  return response.output_parsed

 