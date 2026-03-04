# AI Contract Analyzer

AI Contract Analyzer is a backend API that analyzes legal contract text and generates simplified summaries using AI.

The goal of the project is to make complex contracts easier to understand by extracting key clauses and presenting them in plain language.

This project demonstrates backend API development using **Python**, **FastAPI**, and **AI integration**.

---

## Features

- Analyze contract text using an AI-powered API
- Generate simplified summaries of legal documents
- Extract important clauses from contracts
- RESTful API built with FastAPI
- Structured request and response validation using Pydantic
- Modular backend architecture for scalability

---

## Tech Stack

### Backend
- Python
- FastAPI

### AI Integration
- OpenAI API

### API Structure
- REST API
- Pydantic schemas

### Tools
- Git
- GitHub
- VS Code

---

## Project Structure
ai-contract-analyzer
│
├── client
│
├── server
│ └── app
│ ├── core
│ │ └── config.py
│ │
│ ├── routes
│ │ └── analyze.py
│ │
│ ├── schemas
│ │ └── analyze.py
│ │
│ ├── services
│ │ └── ai_service.py
│ │
│ └── main.py
│
├── requirements.txt
├── .gitignore
└── README.md

---

## How It Works

1. The client sends contract text to the API endpoint.
2. FastAPI receives the request and validates the input using Pydantic schemas.
3. The backend service sends the contract text to the OpenAI API.
4. The AI processes the contract and generates a simplified summary.
5. The API returns the summarized contract information as JSON.

---

## API Endpoint

### Analyze Contract

**POST**
/analyze

## Demo

Watch the project demo on YouTube:
https://youtu.be/wcYzDPqzZek

### Request Body

```json
{
  "contract_text": "Paste contract text here..."
}
Response
{
  "summary": "Simplified explanation of the contract"
}
Running the Project Locally
1. Clone the repository
git clone https://github.com/jayjay1010/ai-contract-analyzer.git
2. Navigate to the project folder
cd ai-contract-analyzer
3. Install dependencies
pip install -r requirements.txt
4. Create environment variables
Create a .env file and add:
OPENAI_API_KEY=your_api_key_here
5. Start the server
uvicorn app.main:app --reload
6. Open API documentation
http://127.0.0.1:8000/docs
Future Improvements
Upload and analyze PDF contracts
Highlight important clauses
Risk detection for unfavorable terms
Contract comparison
Frontend interface for easier interaction
Author
Jose Jimenez
Computer Science Student
California State University Northridge
GitHub
https://github.com/jayjay1010