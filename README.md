# Civic Lens — UK Politics App

A web application for learning about UK politics — from Parliament and elections to political parties and key terminology.

## Purpose

Civic Lens makes UK politics accessible by providing clear, educational content about how the British political system works. It covers Parliament, general elections, devolution, political parties across all four nations, and essential political terminology — all in one place.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS v4 |
| Backend | FastAPI (Python) |
| Data | Election & polling datasets |
| Deployment | GitHub Pages (static export) |

## Screenshots

> Screenshots to be added.

## Roadmap

- [x] Home page with hero, featured parties, and learn section
- [x] Parties page grouped by region (England, Scotland, Wales, Northern Ireland)
- [x] Glossary page with searchable cards
- [x] Learn page with educational content
- [x] Tailwind CSS styling
- [x] Navbar with active route highlighting
- [ ] Party detail pages with historical data
- [ ] Election results visualisation
- [ ] Interactive quizzes
- [ ] Backend API integration
- [ ] Dark mode

## Project Structure

```
civic-lens/
├── frontend/          # Next.js website
│   ├── src/
│   │   ├── app/       # Pages (Home, Learn, Parties, Glossary)
│   │   ├── components/# Reusable UI components
│   │   └── data/      # Static data files
│   └── next.config.js
├── backend/           # FastAPI API
├── data/              # Raw election/polling datasets
├── notebooks/         # Jupyter experiments & analysis
├── docs/              # Planning and documentation
├── scripts/           # Utility scripts
└── docker/            # Docker configs
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
