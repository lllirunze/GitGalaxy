import type { GalaxyStar, Repository, UniverseData } from "../types.ts";
import { stablePosition } from "./coordinates.ts";

const COLORS: Record<string, string> = {
  TypeScript: "#3178C6", JavaScript: "#F7DF1E", Python: "#4CAF50", Rust: "#DEA584",
  Go: "#00ADD8", Java: "#E76F51", "C++": "#9B5DE5", "C#": "#68217A",
  Swift: "#FA7343", Kotlin: "#B125EA",
};

function normalizeLog(value: number, min: number, max: number) {
  if (max <= min) return .5;
  return (Math.log1p(value) - Math.log1p(min)) / (Math.log1p(max) - Math.log1p(min));
}

export function generateUniverse(repositories: Repository[], previousPositions = new Map<number, GalaxyStar["position"]>()): UniverseData {
  const starValues = repositories.map((repository) => repository.stars);
  const forkValues = repositories.map((repository) => repository.forks);
  const starMin = Math.min(...starValues), starMax = Math.max(...starValues);
  const forkMin = Math.min(...forkValues), forkMax = Math.max(...forkValues);
  const stars = repositories.map((repository): GalaxyStar => ({
    id: repository.id,
    position: previousPositions.get(repository.id) ?? stablePosition(repository.id),
    appearance: {
      radius: Number((.6 + normalizeLog(repository.stars, starMin, starMax) * 2.9).toFixed(4)),
      color: COLORS[repository.language ?? ""] ?? "#B8C0CC",
      glowIntensity: Number((.25 + normalizeLog(repository.forks, forkMin, forkMax) * .75).toFixed(4)),
    },
    repository: {
      fullName: repository.fullName, description: repository.description, url: repository.url,
      stars: repository.stars, forks: repository.forks, language: repository.language,
      topics: repository.topics, updatedAt: repository.updatedAt, galaxyScore: repository.galaxyScore,
    },
  }));
  return { version: "1.0.0", generatedAt: new Date().toISOString(), total: stars.length, stars };
}
