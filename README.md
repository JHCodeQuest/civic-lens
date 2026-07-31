# Civic Lens — UK Politics App

A web application for learning about UK politics — from Parliament and elections to political parties and key terminology.

## Purpose

Civic Lens makes UK politics accessible by providing clear, educational content about how the British political system works. It covers Parliament, general elections, devolution, political parties across all four nations, and essential political terminology — all in one place.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS v4 |
| Charts / maps | Recharts, Leaflet |
| Backend | FastAPI (Python 3.13), SQLAlchemy, SQLite |
| Deployment | GitHub Pages (static export) |

## How the data layer works

Every data-driven page calls the FastAPI backend first and falls back to
bundled static data if the API is unreachable. That is what lets the same
build run as a full-stack app locally and as a purely static site on GitHub
Pages. When a page is showing fallback data it displays an amber
"demonstration purposes" banner.

Because the deployed site has no backend to talk to, GitHub Pages always
serves the static fallback data.

Constituencies and parties are addressed by **slug** (`/constituencies/worcester`),
not by database id. The backend derives slugs from names with the same rule as
the frontend (`app/utils/helpers.py` and `src/lib/utils.ts`), so a given page has
one stable URL in both modes. The static export pre-builds one page per slug —
linking by database id would 404.

## Getting started

Requires Node 22+ and Python 3.13+.

### Backend

```bash
cd backend && python -m venv .venv && .venv/Scripts/python.exe -m pip install -r requirements.txt
```

Seed the database (idempotent — safe to re-run):

```bash
cd backend && .venv/Scripts/python.exe -m app.database.seed
```

Run the API on port 8000:

```bash
cd backend && .venv/Scripts/python.exe -m uvicorn app.main:app --reload --port 8000
```

Interactive API docs are at `http://localhost:8000/docs`.

> On macOS/Linux use `.venv/bin/python` instead of `.venv/Scripts/python.exe`.

### Frontend

```bash
cd frontend && npm install && npm run dev
```

The site runs at `http://localhost:3000`. It works without the backend running —
pages just fall back to static data.

### Docker

```bash
docker compose up --build
```

Seeds the database, serves the API on port 8000 and the built site on port 3000.

## Configuration

Copy `backend/.env.example` → `backend/.env` and `frontend/.env.example` →
`frontend/.env.local` to override defaults. Note that `NEXT_PUBLIC_API_URL`
must include the `/api/v1` prefix, and is inlined at build time.

## Screenshots

> Screenshots to be added.

## Roadmap

Stage 1 and 2 are complete.

- [x] Home page with hero, featured parties, and learn section
- [x] Parties page grouped by region (England, Scotland, Wales, Northern Ireland)
- [x] Glossary page with searchable cards
- [x] Learn page with educational content
- [x] Navbar with active route highlighting
- [x] Party detail pages with historical data
- [x] Election results visualisation
- [x] Constituency explorer with map, browse, and detail pages
- [x] Polling charts
- [x] Backend API integration
- [x] Cross-site search
- [ ] Prediction engine
- [ ] Swing calculator
- [ ] Data analysis dashboards
- [ ] Interactive quizzes
- [ ] Dark mode
- [ ] Accessibility audit

See [docs/roadmap.md](docs/roadmap.md) for the full breakdown.

## Project Structure

```
civic-lens/
├── frontend/          # Next.js website
│   ├── src/
│   │   ├── app/       # Pages (Home, Learn, Parties, Constituencies,
│   │   │              #        Polling, Elections, Glossary, Search, About)
│   │   ├── components/# Reusable UI components
│   │   ├── data/      # Static fallback data
│   │   ├── hooks/     # Data-fetching hooks (API + fallback)
│   │   ├── services/  # API client
│   │   └── types/
│   └── next.config.js
├── backend/           # FastAPI API (models → repositories → services → routes)
│   └── app/
├── notebooks/         # Jupyter experiments & analysis
├── docs/              # Planning and documentation
└── scripts/           # Utility scripts
```

## Contributing

Contributions are welcome. Open an issue or pull request on [GitHub](https://github.com/JHCodeQuest/civic-lens).

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m "Add my feature"`)
4. Push to your branch (`git push origin feature/my-feature`)
5. Open a pull request

## License

[MIT](LICENSE)
