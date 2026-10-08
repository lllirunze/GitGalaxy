import type { GitHubRepository } from "../types.ts";

const API_ROOT = "https://api.github.com";
const API_VERSION = "2026-03-10";

interface SearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubRepository[];
}

const wait = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export class GitHubClient {
  #lastRequestAt = 0;
  #token: string;
  #delayMs: number;
  #maxRetries: number;

  constructor(token: string, delayMs: number, maxRetries: number) {
    this.#token = token;
    this.#delayMs = delayMs;
    this.#maxRetries = maxRetries;
  }

  async searchRepositories(query: string, page: number, perPage = 100): Promise<GitHubRepository[]> {
    const params = new URLSearchParams({ q: query, sort: "stars", order: "desc", per_page: String(Math.min(perPage, 100)), page: String(page) });
    const response = await this.#request<SearchResponse>(`/search/repositories?${params}`);
    if (response.incomplete_results) console.warn(`GitHub returned incomplete results for query: ${query}`);
    return response.items;
  }

  async #request<T>(path: string): Promise<T> {
    for (let attempt = 0; attempt <= this.#maxRetries; attempt += 1) {
      const elapsed = Date.now() - this.#lastRequestAt;
      if (elapsed < this.#delayMs) await wait(this.#delayMs - elapsed);
      this.#lastRequestAt = Date.now();

      const response = await fetch(`${API_ROOT}${path}`, { headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${this.#token}`,
        "X-GitHub-Api-Version": API_VERSION,
        "User-Agent": "GitGalaxy-Collector/1.0",
      } });

      if (response.ok) return await response.json() as T;
      if (response.status === 401) throw new Error("GitHub rejected GITHUB_TOKEN. Check that it is valid.");

      const retryAfter = Number(response.headers.get("retry-after"));
      const remaining = Number(response.headers.get("x-ratelimit-remaining"));
      const reset = Number(response.headers.get("x-ratelimit-reset"));
      const retryable = response.status === 403 || response.status === 429 || response.status >= 500;
      if (!retryable || attempt === this.#maxRetries) {
        const body = await response.text();
        throw new Error(`GitHub API ${response.status}: ${body.slice(0, 300)}`);
      }

      let delay = Math.max(60_000, 2 ** attempt * 60_000);
      if (Number.isFinite(retryAfter) && retryAfter > 0) delay = retryAfter * 1_000;
      else if (remaining === 0 && Number.isFinite(reset)) delay = Math.max(1_000, reset * 1_000 - Date.now() + 1_000);
      console.warn(`GitHub API ${response.status}; retrying in ${Math.ceil(delay / 1_000)}s`);
      await wait(delay);
    }
    throw new Error("GitHub request retry loop ended unexpectedly");
  }
}
