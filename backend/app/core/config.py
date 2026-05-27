from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "UK Politics API"
    app_version: str = "0.2.0"
    database_url: str = "sqlite:///./uk_politics.db"
    debug: bool = True
    api_prefix: str = "/api/v1"
    cors_origins: str = "http://localhost:3000,http://localhost:8000"

    @property
    def cors_origins_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",")]

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
