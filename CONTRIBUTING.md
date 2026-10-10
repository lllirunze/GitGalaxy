# Contributing to GitGalaxy

Thanks for helping improve GitGalaxy. The project is a static React application with a Node.js data collector; it does not require a server or database.

## Before you start

- Use Node.js 24 and pnpm 11.
- Create a branch from `master`; do not commit directly to the deployment branch.
- Never commit `.env`, GitHub Tokens, API keys, or generated credentials. Use `.env.example` as the public configuration template.

## Local development

```bash
pnpm install
pnpm dev
```

Run the relevant checks before opening a pull request:

```bash
pnpm test
pnpm collect:test
pnpm lint
pnpm build
pnpm test:e2e
```

## Data changes

`apps/web/public/data/universe.json` is generated data. To refresh it locally, copy `.env.example` to `.env`, add a local GitHub Token, then run:

```bash
pnpm collect
```

Start with a small target while checking collection quality. Do not add a real token to the repository, issues, pull requests, screenshots, or logs.

## Pull requests

- Keep each pull request focused on one change.
- Explain the user-visible behavior and any performance impact.
- Add or update tests when behavior changes.
- For visual changes, include a screenshot or short recording when practical.
- Ensure CI is green before requesting review.

## Reporting issues

Include the browser and operating system, steps to reproduce, expected and actual behavior, and screenshots or console errors where available. Please remove any tokens, private repository names, or other sensitive data first.
