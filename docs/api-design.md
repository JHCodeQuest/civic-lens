# API Design

## Base URL
`/api/v1`

## Endpoints

### Parties
- `GET /parties` – list all parties
- `GET /parties/{id}` – party details

### Elections
- `GET /elections` – list elections
- `GET /elections/{id}/results` – results by constituency

### Polling
- `GET /polling` – polling time series
- `GET /polling/latest` – latest national figures

### Predictions
- `GET /predictions` – all predictions
- `GET /predictions/{constituency_id}` – prediction for a constituency
