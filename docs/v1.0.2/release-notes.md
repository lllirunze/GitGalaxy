# GitGalaxy v1.0.2

## Highlights

- Delayed first rendering until validated Universe data is available, so repository colors appear correctly on first visit.
- Recreated GPU instances for each Universe version and added first-visit production-path coverage.
- Replaced serial candidate collection with bounded, rate-aware concurrent task scheduling.
- Centralized candidate aggregation by Repository ID, preserving deterministic, duplicate-free output.
- Added auditable request, duplicate, rate-limit-wait, and duration statistics for each collection run.

## Safety

The Collector remains constrained by GitHub API rate limits. Concurrency will never use multiple credentials to bypass those limits, and only one final atomic write may replace Universe data.
