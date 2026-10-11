# GitGalaxy v1.0.0

GitGalaxy v1.0.0 is the first public release: an interactive 3D universe for discovering remarkable open-source projects on GitHub.

## Highlights

- Explores curated GitHub repositories as a navigable 3D star field built with React, TypeScript, Three.js, and React Three Fiber.
- Maps real repository stars, forks, primary languages, and metadata to each star's visual appearance.
- Includes repository search, keyboard shortcuts, camera focus, detail previews, and direct GitHub links.
- Ships a GitHub API Collector that gathers, scores, de-duplicates, validates, and publishes `universe.json`.
- Provides low, medium, and high quality modes, plus graceful WebGL fallback states.
- Includes GitHub Actions workflows for continuous integration, GitHub Pages deployment, and weekly Universe-data refreshes.

## Data and privacy

GitGalaxy uses only public GitHub API data. Tokens remain in local `.env` files or GitHub Actions secrets; the repository contains only `.env.example`.

## Verification

- The 5,000-repository Universe dataset passed data-quality and release validation.
- Visual output and frame rate can vary by browser, GPU, and device performance.

## Links

- Live Demo: https://lllirunze.github.io/GitGalaxy/
- Development Plan: [development-plan.md](development-plan.md)
- Contribution Guide: [CONTRIBUTING.md](../../CONTRIBUTING.md)
