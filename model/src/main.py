from fastapi import FastAPI
from pydantic import BaseModel
from src.utils import sentiment_analyzer_score
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

model_name = "Team 7"
version = "v1.0.0"

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ouput for data validation
class Input(BaseModel):
    from_: str
    to_: str
    email: str

class Output(BaseModel):
    neg: float
    neu: float
    pos: float
    compound: float


## FASTapi stuff

@app.get("/")

async def main_route():     
    return {"message": "Hey, It is me Goku"}

@app.get('/info')
async def model_info():
    """Return model information, version, how to call"""
    return {
        "name": model_name,
        "version": version
    }

@app.get('/health')
async def service_health():
    """Return service health"""
    return {
        "ok"
    }

@app.post('/predict', response_model=Output)
async def model_predict(input: Input):
    """Predict with input"""
    print(input.email)
    response = sentiment_analyzer_score(input.email)
    return response