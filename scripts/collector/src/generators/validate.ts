import type { UniverseData } from "../types.ts";

export function validateUniverse(universe: UniverseData) {
  if (universe.version !== "1.0.0") throw new Error("Universe version must be 1.0.0");
  if (universe.total !== universe.stars.length) throw new Error("Universe total does not match stars length");
  const ids = new Set<number>();
  for (const star of universe.stars) {
    if (!Number.isInteger(star.id) || star.id <= 0) throw new Error("Every star must have a positive integer id");
    if (ids.has(star.id)) throw new Error(`Duplicate repository id: ${star.id}`);
    ids.add(star.id);
    if (!/^https:\/\/github\.com\//.test(star.repository.url)) throw new Error(`Invalid GitHub URL: ${star.repository.url}`);
    if (!star.repository.fullName.includes("/")) throw new Error(`Invalid repository name: ${star.repository.fullName}`);
    if (![star.position.x, star.position.y, star.position.z, star.appearance.radius, star.appearance.glowIntensity].every(Number.isFinite)) throw new Error(`Non-finite visual value for ${star.id}`);
  }
  return universe;
}
