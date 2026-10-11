import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { loadConfig } from "./config.ts";
import { GitHubClient } from "./github/client.ts";
import { buildSearchQueries } from "./github/queries.ts";
import { isEligible, normalizeRepository } from "./filters/repositories.ts";
import { scoreRepositories } from "./scoring/score.ts";
import { selectDiverse } from "./scoring/select.ts";
import { generateUniverse } from "./generators/universe.ts";
import { validateUniverse } from "./generators/validate.ts";
import type { GalaxyStar, GitHubRepository, UniverseData } from "./types.ts";

async function previousPositions(path: string) {
  try {
    const previous = JSON.parse(await readFile(path, "utf8")) as UniverseData;
    return new Map<number, GalaxyStar["position"]>(previous.stars.map((star) => [star.id, star.position]));
  } catch { return new Map<number, GalaxyStar["position"]>(); }
}

async function atomicWrite(path: string, data: unknown) {
  await mkdir(dirname(path), { recursive: true });
  const temporary = `${path}.tmp`;
  await writeFile(temporary, `${JSON.stringify(data)}\n`, { encoding: "utf8", mode: 0o644 });
  await rename(temporary, path);
}

async function main() {
  const config = loadConfig();
  const client = new GitHubClient(config.token, config.requestDelayMs, config.maxRetries);
  const candidates = new Map<number, GitHubRepository>();
  const desiredCandidates = Math.min(config.target * 3, 15_000);
  const tasks = buildSearchQueries(config.minStars).map((query) => ({ query, page: 1 }));
  let rawCount = 0;
  let stopScheduling = false;

  console.info(`Collecting candidates for ${config.target} repositories with ${config.concurrency} workers (minimum ${config.minStars} stars)`);
  const worker = async () => {
    while (true) {
      const task = tasks.shift();
      if (!task) return;
      const items = await client.searchRepositories(task.query, task.page);
      rawCount += items.length;
      for (const item of items) if (isEligible(item, config.minStars)) candidates.set(item.id, item);
      console.info(`[${rawCount} raw · ${candidates.size} unique eligible] ${task.query} · page ${task.page} · ${items.length} results`);
      if (candidates.size >= desiredCandidates) stopScheduling = true;
      if (!stopScheduling && items.length === 100 && task.page < 10) tasks.push({ query: task.query, page: task.page + 1 });
    }
  };
  await Promise.all(Array.from({ length: config.concurrency }, worker));

  const eligible = [...candidates.values()].sort((left, right) => left.id - right.id);
  const scored = scoreRepositories(eligible.map(normalizeRepository));
  const selected = selectDiverse(scored, config.target);
  if (selected.length === 0) throw new Error("No eligible repositories were collected; the existing universe file was not changed.");
  if (selected.length < config.target) console.warn(`Only ${selected.length} eligible repositories were available for target ${config.target}`);

  const universe = validateUniverse(generateUniverse(selected, await previousPositions(config.output)));
  await atomicWrite(config.output, universe);
  const stats = client.getStats();
  console.info(`Wrote ${universe.total} repositories to ${config.output}`);
  console.info(`Collector stats: ${stats.requests} requests · ${rawCount} raw · ${candidates.size} unique eligible · ${rawCount - candidates.size} duplicate/ineligible · ${Math.round(stats.rateLimitWaitMs / 1_000)}s rate-limit wait`);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Collector failed: ${message}`);
  process.exitCode = 1;
});
