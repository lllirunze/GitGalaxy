# GitGalaxy v1.0.1

> Unreleased — 2026-10-11. 本地实现和自动化验证已完成，等待 GitHub Pages 部署验收后发布。

## Changed

- Replaced the default Vite browser-tab icon with a GitGalaxy planet-and-orbit favicon.
- Scaled the Galaxy's world extent with the cube root of the Repository count, so 100, 1,000 and 5,000 repositories retain comparable visual density.
- Adapted the initial camera, zoom limit, far clipping plane, fog, and background environment to the scaled world.
- Increased the visual spread by a further `1.25×` after first-page review, so the initial star field reads more spaciously.
- Replaced the fixed three-language legend with an expandable, responsive legend generated from the loaded Universe data.
- Refined the legend into a compact data card with aligned language counts and an orderly expanded grid.
- Added per-language visibility controls: all languages start selected, and deselecting one hides only its corresponding stars. Search reveals a hidden language again when its repository is selected.
- Added deterministic colors for primary languages not in the curated palette, rather than rendering them as a single gray category.

## Verified

- Web unit tests, Collector unit tests, lint, and production build pass.
- End-to-end flows pass in Chromium, Firefox, and WebKit, including expanding the live language legend.

## Compatibility

This is a V1.0.1 maintenance release. It does not add new product modules or alter the V1.0 discovery workflow.
