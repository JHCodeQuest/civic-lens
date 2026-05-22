# Contributing to Civic Lens

Thanks for your interest in contributing.

## Getting Started

1. Fork the repository.
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/civic-lens.git
   ```
3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```

## Project Structure

```
frontend/          # Next.js app
├── src/
│   ├── app/       # Pages
│   ├── components/# Reusable components
│   ├── data/      # Static data
│   └── lib/       # Utilities & constants
backend/           # FastAPI API
data/              # Datasets
```

## Making Changes

- Create a branch: `git checkout -b feature/my-feature`
- Keep changes focused on a single concern
- Run `npm run build` in `frontend/` to verify it compiles
- Commit with a clear summary message

## Pull Requests

- Open a PR against the `main` branch
- Describe what the change does and why
- Link any related issues

## Code Style

- TypeScript — strict mode
- Tailwind CSS utility classes for styling
- No CSS modules or inline styles for layout
- Components go in `src/components/<area>/`
- Data files go in `src/data/`
