# GitGalaxy

Explore remarkable open-source projects in an interactive 3D universe.

Every star represents a GitHub Repository. Its size, color and glow map to real public data such as Stars, Forks and primary language.

## Current status

GitGalaxy V1.0 is under active development. The checked-in universe currently contains 100 real Repository records; the Collector is designed to grow this gradually to 5,000.

## Getting started

```bash
pnpm install
pnpm dev
```

Open `http://localhost:5173`.

## Commands

```bash
pnpm test          # Web unit tests
pnpm collect:test  # Collector unit tests
pnpm test:e2e      # Browser interaction tests
pnpm build         # Production build
pnpm lint          # Static checks
pnpm collect       # Fetch GitHub data; requires local .env token
```

## Data collection

Copy `.env.example` to `.env`, supply a GitHub Token locally, and run `pnpm collect`. Never commit `.env`; it is ignored by Git. Start with 100 records and increase through 500, 1,000 and 5,000 after checking quality and performance.

## Automation

GitHub Actions runs verification on pushes and pull requests, deploys `master` to GitHub Pages, and refreshes Universe data weekly. Configure the repository Pages source as **GitHub Actions**. Optionally set `GH_COLLECTOR_TOKEN` as a repository secret to give scheduled collection its own least-privilege token.

## License

MIT. See [LICENSE](LICENSE).
