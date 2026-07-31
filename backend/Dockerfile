FROM python:3.13-slim

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app

EXPOSE 8000

# Seeding is idempotent (existing rows are skipped), so this is safe on restart.
CMD ["sh", "-c", "python -m app.database.seed && uvicorn app.main:app --host 0.0.0.0 --port 8000"]
