# Database Schema

## parties
| Column | Type    | Description |
|--------|---------|-------------|
| id     | UUID    | Primary key |
| name   | TEXT    | Party name  |
| colour | TEXT    | Hex colour  |

## constituencies
| Column   | Type    | Description       |
|----------|---------|-------------------|
| id       | UUID    | Primary key       |
| name     | TEXT    | Constituency name |
| region   | TEXT    | Region            |

## election_results
| Column          | Type   | Description          |
|-----------------|--------|----------------------|
| id              | UUID   | Primary key          |
| constituency_id | UUID   | FK to constituencies |
| party_id        | UUID   | FK to parties        |
| year            | INT    | Election year        |
| votes           | INT    | Votes cast           |
| share           | FLOAT  | Vote share %         |

## predictions
| Column          | Type    | Description          |
|-----------------|---------|----------------------|
| id              | UUID    | Primary key          |
| constituency_id | UUID    | FK to constituencies |
| predicted_winner| TEXT    | Predicted party      |
| confidence      | FLOAT   | Confidence %         |
| created_at      | DATETIME| Timestamp            |
