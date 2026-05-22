from fastapi import FastAPI
from app.api.routes import parties, elections, polling, predictions

app = FastAPI(title="UK Politics API", version="0.1.0")

app.include_router(parties.router, prefix="/parties", tags=["parties"])
app.include_router(elections.router, prefix="/elections", tags=["elections"])
app.include_router(polling.router, prefix="/polling", tags=["polling"])
app.include_router(predictions.router, prefix="/predictions", tags=["predictions"])

@app.get("/")
def root():
    return {"message": "UK Politics API"}
