import assert from "node:assert/strict";
import test from "node:test";
import { scoreRepositories } from "./score.ts";
import type { Repository } from "../types.ts";

const base: Repository = { id: 1, owner: "a", name: "a", fullName: "a/a", description: "a", url: "https://github.com/a/a", stars: 2_000, forks: 100, language: "TypeScript", topics: [], createdAt: "2020-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z", pushedAt: "2025-01-01T00:00:00Z", galaxyScore: 0 };

test("scoreRepositories produces bounded descending scores", () => {
  const result = scoreRepositories([base, { ...base, id: 2, stars: 100_000, forks: 20_000 }], new Date("2025-01-02T00:00:00Z"));
  assert.equal(result[0].id, 2);
  assert.ok(result.every((repository) => repository.galaxyScore >= 0 && repository.galaxyScore <= 100));
});
