# GitGalaxy v1.0.2

## Planned

- Make the initial production render wait for validated Universe data so star colors are correct on first visit.
- Add versioned GPU instance remounting and first-visit production-path regression coverage.
- Replace serial candidate collection with bounded, rate-aware concurrent task scheduling.
- Aggregate every candidate centrally by Repository ID before selection, preserving deterministic, duplicate-free output.
- Report collection requests, duplicates, rate-limit waits, and duration for each run.

## Implemented

- Delayed Canvas mounting until validated live Universe data is available, with the demo Universe used only as an explicit request-failure fallback.
- Recreated scene instances for each Universe version and revalidated the JSON request before rendering.
- Added a bounded worker pool backed by one shared, rate-aware request scheduler and centralized Repository-ID aggregation.
- Added auditable collection statistics and a concurrency test that verifies shared request cadence.

## Safety

The Collector remains constrained by GitHub API rate limits. Concurrency will never use multiple credentials to bypass those limits, and only one final atomic write may replace Universe data.
