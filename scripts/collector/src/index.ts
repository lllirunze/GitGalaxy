import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { loadConfig } from "./config.ts";
import { GitHubClient } from "./github/client.ts";
import { buildSearchQueries } from "./github/queries.ts";
import { deduplicate, isEligible, normalizeRepository } from "./filters/repositories.ts";
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
  const raw: GitHubRepository[] = [];
  const desiredCandidates = Math.min(config.target * 3, 15_000);

  console.info(`Collecting candidates for ${config.target} repositories (minimum ${config.minStars} stars)`);
  for (const query of buildSearchQueries(config.minStars)) {
    for (let page = 1; page <= 10; page += 1) {
      const items = await client.searchRepositories(query, page);
      raw.push(...items);
      console.info(`[${raw.length} raw] ${query} · page ${page} · ${items.length} results`);
      if (items.length < 100 || raw.length >= desiredCandidates) break;
    }
    if (raw.length >= desiredCandidates) break;
  }

  const eligible = deduplicate(raw).filter((repository) => isEligible(repository, config.minStars));
  const scored = scoreRepositories(eligible.map(normalizeRepository));
  const selected = selectDiverse(scored, config.target);
  if (selected.length === 0) throw new Error("No eligible repositories were collected; the existing universe file was not changed.");
  if (selected.length < config.target) console.warn(`Only ${selected.length} eligible repositories were available for target ${config.target}`);

  const universe = validateUniverse(generateUniverse(selected, await previousPositions(config.output)));
  await atomicWrite(config.output, universe);
  console.info(`Wrote ${universe.total} repositories to ${config.output}`);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Collector failed: ${message}`);
  process.exitCode = 1;
});
