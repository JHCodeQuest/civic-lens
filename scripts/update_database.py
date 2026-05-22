#!/usr/bin/env python3
"""Run database migrations and seed data."""

from app.database.db import engine, Base
from app.core.config import settings


def main() -> None:
    print(f"Updating database at {settings.database_url}")
    Base.metadata.create_all(engine)
    print("Database updated successfully")


if __name__ == "__main__":
    main()
