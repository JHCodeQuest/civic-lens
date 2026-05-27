from contextlib import asynccontextmanager
from fastapi import FastAPI

from app.core.config import settings
from app.core.security import setup_cors
from app.database.db import init_db
from app.api.routes import parties, elections, polling, predictions, constituencies


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    lifespan=lifespan,
    redirect_slashes=True,
)

setup_cors(app, origins=settings.cors_origins_list)

api_prefix = settings.api_prefix

app.include_router(parties.router, prefix=f"{api_prefix}/parties", tags=["parties"])
app.include_router(elections.router, prefix=f"{api_prefix}/elections", tags=["elections"])
app.include_router(polling.router, prefix=f"{api_prefix}/polling", tags=["polling"])
app.include_router(predictions.router, prefix=f"{api_prefix}/predictions", tags=["predictions"])
app.include_router(constituencies.router, prefix=f"{api_prefix}/constituencies", tags=["constituencies"])


@app.get("/")
def root():
    return {"message": settings.app_name, "version": settings.app_version, "docs": "/docs"}
