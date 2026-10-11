# GitGalaxy v1.0.2

> 发布前草案：实施和验收完成后更新为最终内容。

## Planned

- Make the initial production render wait for validated Universe data so star colors are correct on first visit.
- Add versioned GPU instance remounting and first-visit production-path regression coverage.
- Replace serial candidate collection with bounded, rate-aware concurrent task scheduling.
- Aggregate every candidate centrally by Repository ID before selection, preserving deterministic, duplicate-free output.
- Report collection requests, duplicates, rate-limit waits, and duration for each run.

## Safety

The Collector remains constrained by GitHub API rate limits. Concurrency will never use multiple credentials to bypass those limits, and only one final atomic write may replace Universe data.
