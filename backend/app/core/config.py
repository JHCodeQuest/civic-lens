from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "UK Politics API"
    database_url: str = "sqlite:///./uk_politics.db"
    debug: bool = True

    class Config:
        env_file = ".env"

settings = Settings()
