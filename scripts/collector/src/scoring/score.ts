import type { Repository } from "../types.ts";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

function logNormalize(value: number, minimum: number, maximum: number) {
  if (maximum <= minimum) return 0.5;
  return clamp((Math.log1p(value) - Math.log1p(minimum)) / (Math.log1p(maximum) - Math.log1p(minimum)));
}

export function scoreRepositories(repositories: Repository[], now = new Date()) {
  if (repositories.length === 0) return [];
  const stars = repositories.map((repository) => repository.stars);
  const forks = repositories.map((repository) => repository.forks);
  const starMin = Math.min(...stars), starMax = Math.max(...stars);
  const forkMin = Math.min(...forks), forkMax = Math.max(...forks);

  return repositories.map((repository) => {
    const activeAt = new Date(repository.pushedAt ?? repository.updatedAt).getTime();
    const daysSinceActivity = Math.max(0, (now.getTime() - activeAt) / 86_400_000);
    const activity = Math.exp(-daysSinceActivity / 365);
    const score = .55 * logNormalize(repository.stars, starMin, starMax)
      + .2 * logNormalize(repository.forks, forkMin, forkMax)
      + .25 * activity;
    return { ...repository, galaxyScore: Number((score * 100).toFixed(4)) };
  }).sort((a, b) => b.galaxyScore - a.galaxyScore || b.stars - a.stars);
}
