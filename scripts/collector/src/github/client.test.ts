import assert from "node:assert/strict";
import test from "node:test";
import { GitHubClient } from "./client.ts";

test("GitHubClient shares one request cadence across concurrent callers", async () => {
  const originalFetch = globalThis.fetch;
  const requestedAt: number[] = [];
  globalThis.fetch = async () => {
    requestedAt.push(Date.now());
    return new Response(JSON.stringify({ total_count: 0, incomplete_results: false, items: [] }), { headers: { "x-ratelimit-remaining": "29" } });
  };
  try {
    const client = new GitHubClient("test-token", 25, 0);
    await Promise.all([client.searchRepositories("stars:>=1", 1), client.searchRepositories("stars:>=2", 1), client.searchRepositories("stars:>=3", 1)]);
    assert.equal(requestedAt.length, 3);
    assert.ok(requestedAt[1] - requestedAt[0] >= 20);
    assert.ok(requestedAt[2] - requestedAt[1] >= 20);
    assert.equal(client.getStats().requests, 3);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
