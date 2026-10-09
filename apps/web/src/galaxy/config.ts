export const GALAXY_CONFIG = {
  demoStarCount: 180,
  backgroundStarCount: 3200,
  camera: { initialPosition: [0, 14, 142] as const, minDistance: 18, maxDistance: 240 },
  starFieldRadius: 22,
} as const;

export const LANGUAGE_COLORS = {
  TypeScript: "#6da8ff", JavaScript: "#f6db6d", Python: "#79d6aa",
  Rust: "#e8a47d", Go: "#67d6e5", Other: "#bdc6d7",
} as const;
